import type { Doctor } from "../types/doctor";

interface Props {
  doctor?: Doctor;
}

export default function DoctorCard({
  doctor,
}: Props) {
  if (!doctor) return null;

  return (
    <div className="rounded-3xl bg-white shadow-lg p-6">

      <img
        src={doctor.image}
        alt={doctor.name}
        className="w-48 h-48 rounded-full object-cover mx-auto"
      />

      <h2 className="text-center text-2xl font-bold mt-5">

        {doctor.name}

      </h2>

      <p className="text-center text-blue-600 mt-2">

        {doctor.specialty}

      </p>

    </div>
  );
}