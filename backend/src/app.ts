import express from "express";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes";
import doctorRoutes from "./routes/doctorRoutes";
import serviceRoutes from "./routes/serviceRoute";
import appointmentRoutes from "./routes/appointmentRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import path from "path";

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
app.use("/api/dashboard", dashboardRoutes);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

export default app;