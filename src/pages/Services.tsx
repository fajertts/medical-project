import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchServices = async () => {
  const res = await fetch("http://localhost:3001/services");
  if (!res.ok) throw new Error("Error fetching data");
  return res.json();
};

const Services = () => {
  const {
    data: services,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center">Error...</p>;

  return (
    <section className="bg-gray-100 py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">
        خدماتنا
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {services.map((service) => (
          <div
            key={service.id}
            className="p-6 bg-white rounded-xl shadow hover:scale-105 transition"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />

            <h3 className="text-xl font-bold mb-2">
              {service.title}
            </h3>

            <p className="text-sm text-gray-600">
              {service.desc}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Services;