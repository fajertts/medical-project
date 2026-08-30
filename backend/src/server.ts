import app from "./app";
import path from "path";
import { startAppointmentReminder } from "./jobs/appointmentReminder";
import doctorRouter from "./routes/doctorRoutes"
import statsRoutes from "./routes/statsRoutes";
startAppointmentReminder();
app.use("/api/stats", statsRoutes);
  app.use("/api/doctors", doctorRouter);

const PORT = 3000;
  
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  
});