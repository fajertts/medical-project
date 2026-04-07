import React from "react";

const services = [
  {
    title: "تنظيف الأسنان",
    desc: "تنظيف احترافي للحفاظ على صحة الأسنان",
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
  },
  {
    title: "تبييض الأسنان",
    desc: "ابتسامة ناصعة بأحدث التقنيات",
    img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
  },
  {
    title: "تقويم الأسنان",
    desc: "حلول حديثة لتعديل شكل الأسنان",
    img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09",
  },
  {
    title: "زراعة الأسنان",
    desc: "تعويض دائم للأسنان المفقودة",
    img: "https://images.unsplash.com/photo-1598257006626-48b0c252070d",
  },
  {
    title: "علاج العصب",
    desc: "علاج الألم والحفاظ على السن",
    img: "https://images.unsplash.com/photo-1588774069410-84ae30757c8e",
  },
];

const Services = () => {
  return (
    <section className="bg-gray-100 py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">
        خدماتنا
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">

        {services.map((service, index) => (
          <div
            key={index}
            className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer"
          >
            {/* 🖼️ Image */}
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
            />

            {/* 🔵 Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition"></div>

            {/* 📝 Text */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-lg font-bold">{service.title}</h3>

              <p className="text-sm opacity-0 group-hover:opacity-100 transition duration-300">
                {service.desc}
              </p>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
};

export default Services;