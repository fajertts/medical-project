import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendAppointmentConfirmation = async (
  email: string,
  patientName: string,
  doctorName: string,
  serviceName: string,
  appointmentDate: string,
  appointmentTime: string
) => {
  await transporter.sendMail({
    from: `"SmileCare" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "SmileCare — Appointment Confirmation",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 30px;
        background-color: #f8fafc;
        border-radius: 15px;
      ">

        <h1 style="color:#2563eb;">
          SmileCare
        </h1>

        <h2>
          Appointment Confirmation
        </h2>

        <p>
          Hello <strong>${patientName}</strong>,
        </p>

        <p>
          Your appointment has been successfully booked.
        </p>

        <div style="
          background:white;
          padding:20px;
          border-radius:12px;
          margin:20px 0;
        ">

          <p>
            👨‍⚕️ <strong>Doctor:</strong>
            Dr. ${doctorName}
          </p>

          <p>
            🦷 <strong>Service:</strong>
            ${serviceName}
          </p>

          <p>
            📅 <strong>Date:</strong>
            ${appointmentDate}
          </p>

          <p>
            🕐 <strong>Time:</strong>
            ${appointmentTime}
          </p>

        </div>

        <p>
          Thank you for choosing <strong>SmileCare</strong>.
        </p>

        <p>
          We look forward to seeing you!
        </p>

      </div>
    `,
  });
};
export const sendAppointmentReminder = async (
  email: string,
  patientName: string,
  doctorName: string,
  serviceName: string,
  appointmentDate: string,
  appointmentTime: string
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,

    subject: "⏰ Appointment Reminder - SmileCare",

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px;">

        <h2 style="color: #2563eb;">
          SmileCare 🦷
        </h2>

        <p>
          Hello <strong>${patientName}</strong>,
        </p>

        <p>
          This is a reminder that you have an appointment
          tomorrow.
        </p>

        <div style="
          background: #f3f4f6;
          padding: 20px;
          border-radius: 10px;
          margin: 20px 0;
        ">

          <p>
            <strong>Doctor:</strong>
            ${doctorName}
          </p>

          <p>
            <strong>Service:</strong>
            ${serviceName}
          </p>

          <p>
            <strong>Date:</strong>
            ${appointmentDate}
          </p>

          <p>
            <strong>Time:</strong>
            ${String(appointmentTime).slice(0, 5)}
          </p>

        </div>

        <p>
          Please arrive a few minutes before your appointment.
        </p>

        <p>
          Thank you for choosing
          <strong>SmileCare</strong> 🦷
        </p>

      </div>
    `,
  });
};