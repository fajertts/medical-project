import {
  Stethoscope,
  BriefcaseMedical,
  CalendarCheck,
  Users,
} from "lucide-react";
import StatCard from "./StatCard";

type Props = {
  doctors: number;
  services: number;
  appointments: number;
  patients: number;
};

const StatsCards = ({
  doctors,
  services,
  appointments,
  patients,
}: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Doctors"
        value={doctors}
        icon={<Stethoscope size={30} />}
        color="bg-blue-500"
      />

      <StatCard
        title="Services"
        value={services}
        icon={<BriefcaseMedical size={30} />}
        color="bg-green-500"
      />

      <StatCard
        title="Appointments"
        value={appointments}
        icon={<CalendarCheck size={30} />}
        color="bg-purple-500"
      />

      <StatCard
        title="Patients"
        value={patients}
        icon={<Users size={30} />}
        color="bg-orange-500"
      />
    </div>
  );
};

export default StatsCards;