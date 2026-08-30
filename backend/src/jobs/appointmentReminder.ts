import cron from "node-cron";
import pool from "../config/db";
import { sendAppointmentReminder } from "../services/emailService";

export const startAppointmentReminder = () => {
  // يعمل كل ساعة
  cron.schedule("0 * * * *", async () => {
    try {
      console.log("🔍 Checking appointments for reminders...");

      const result = await pool.query(`
        SELECT
          a.id,
          a.patient_name,
          a.email,
          a.appointment_date,
          a.appointment_time,
          d.name AS doctor_name,
          s.title AS service_title
        FROM appointments a

        LEFT JOIN doctors d
          ON a.doctor_id = d.id

        LEFT JOIN services s
          ON a.service_id = s.id

        WHERE
          (
            (a.appointment_date + a.appointment_time)
            BETWEEN NOW() + INTERVAL '23 hours'
            AND NOW() + INTERVAL '25 hours'
          )
          AND COALESCE(a.reminder_sent, false) = false
      `);

      for (const appointment of result.rows) {
        try {
          await sendAppointmentReminder(
            appointment.email,
            appointment.patient_name,
            appointment.doctor_name,
            appointment.service_title,
            appointment.appointment_date,
            appointment.appointment_time
          );

          await pool.query(
            `
            UPDATE appointments
            SET reminder_sent = true
            WHERE id = $1
            `,
            [appointment.id]
          );

          console.log(
            `✅ Reminder sent for appointment #${appointment.id}`
          );

        } catch (error) {
          console.error(
            `❌ Failed to send reminder for appointment #${appointment.id}`,
            error
          );
        }
      }

    } catch (error) {
      console.error(
        "❌ Appointment reminder job failed:",
        error
      );
    }
  });

  console.log("⏰ Appointment reminder job started");
};