import express from "express";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes";
import doctorRoutes from "./routes/doctorRoutes";
import serviceRoutes from "./routes/serviceRoute";
import appointmentRoutes from "./routes/appointmentRoutes";

const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

// Routes
app.use("/api/doctors", doctorRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);

export default app;