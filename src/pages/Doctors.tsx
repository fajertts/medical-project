import { useQuery } from "@tanstack/react-query";
import DoctorCard from "../components/DoctorCard";  

interface Doctor {
  name: string;
  specialty: string;
  experience: string;
  image: string;
}

interface User {
  firstName: string;
  lastName: string;
}

const fetchDoctors = async (): Promise<Doctor[]> => {
  const res = await fetch("https://dummyjson.com/users");
  const data: { users: User[] } = await res.json();

  const doctorImages = [
    "https://img.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg",
    "https://img.freepik.com/free-photo/portrait-smiling-female-doctor_171337-1533.jpg",
    "https://img.freepik.com/free-photo/young-doctor-with-stethoscope_23-2148827774.jpg",
  ];

  return data.users.slice(0, 3).map((user, index) => ({
    name: user.firstName + " " + user.lastName,
    specialty: "Dentist",
    experience: "5 years experience",
    image: doctorImages[index % doctorImages.length],
  }));
};

const DoctorsSection = () => {
  const { data: doctors, isLoading, error } = useQuery<Doctor[]>({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });

  if (isLoading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error loading doctors</p>;
  }

  return (
    <section className="py-20 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-12">
        Our Doctors
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        {doctors?.map((doc) => (
          <DoctorCard key={doc.name} {...doc} />
        ))}
      </div>
    </section>
  );
};

export default DoctorsSection;