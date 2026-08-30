import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  ArrowUpLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";

import { useDoctors } from "../hooks/useDoctors";
import { useServices } from "../hooks/useServices";
import { useAppointments } from "../hooks/useAppointment";
import { useAvailableTimes } from "../hooks/useAvailableTimes";

const Home = () => {
  /* ========================= */
  /* DATABASE */
  /* ========================= */

  const { data: doctors, isLoading: doctorsLoading } =
    useDoctors();

  const { data: services, isLoading: servicesLoading } =
    useServices();

  const { data: appointments } =
    useAppointments();

  /* ========================= */
  /* AVAILABLE APPOINTMENTS */
  /* ========================= */

  const [selectedDoctor, setSelectedDoctor] =
    useState<number | null>(null);

  const [selectedDate, setSelectedDate] =
    useState("");

  const {
    data: availableTimes,
    isLoading: timesLoading,
  } = useAvailableTimes(
    selectedDoctor,
    selectedDate
  );

  /* ========================= */
  /* STATS */
  /* ========================= */

  const doctorsCount =
    doctors?.length || 0;

  const servicesCount =
    services?.length || 0;

  const appointmentsCount =
    appointments?.length || 0;

  /* ========================= */
  /* ANIMATION */
  /* ========================= */

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 40,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
      },
    },
  };

  return (
    <div
      dir="rtl"
      className="bg-white text-gray-800 overflow-hidden"
    >

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative min-h-[90vh] flex items-center overflow-hidden">

        {/* Background */}

        <div className="absolute inset-0">

          <img
            src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
            alt="Dental Clinic"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-blue-950/80" />

        </div>


        {/* Decorative circles */}

        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />


        {/* Content */}

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">

          <div className="grid lg:grid-cols-2 gap-14 items-center">


            {/* TEXT */}

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-white"
            >

              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6">

                <Sparkles
                  size={18}
                  className="text-cyan-300"
                />

                <span className="text-sm">
                  عناية متقدمة لابتسامة مثالية
                </span>

              </div>


              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">

                ابتسامتك تبدأ
                <span className="block text-cyan-300">
                  من هنا
                </span>

              </h1>


              <p className="text-lg md:text-xl text-blue-100 leading-8 max-w-xl mb-8">

                نقدم لك أفضل خدمات طب الأسنان
                بأحدث التقنيات وعلى يد نخبة من
                الأطباء المتخصصين، لنمنحك ابتسامة
                صحية وجميلة بثقة.

              </p>


              {/* Buttons */}

              <div className="flex flex-wrap gap-4">

                <Link to="/appointment">

                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    className="flex items-center gap-3 bg-white text-blue-700 px-7 py-4 rounded-2xl font-bold shadow-xl hover:bg-blue-50 transition"
                  >

                    <CalendarDays size={21} />

                    احجز موعدك الآن

                    <ArrowLeft size={19} />

                  </motion.div>

                </Link>


                <Link to="/doctors">

                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    className="flex items-center gap-3 border border-white/40 bg-white/10 backdrop-blur-md text-white px-7 py-4 rounded-2xl font-bold hover:bg-white/20 transition"
                  >

                    <Stethoscope size={20} />

                    تعرف على أطبائنا

                  </motion.div>

                </Link>

              </div>

            </motion.div>


            {/* HERO CARD */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
              }}
              className="hidden lg:block"
            >

              <div className="relative">

                <div className="absolute -inset-5 bg-cyan-400/20 blur-3xl rounded-full" />

                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 shadow-2xl">

                  <div className="flex items-center gap-5 mb-8">

                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">

                      <HeartPulse
                        size={32}
                        className="text-blue-600"
                      />

                    </div>

                    <div className="text-white">

                      <h3 className="text-xl font-bold">
                        رعاية تثق بها
                      </h3>

                      <p className="text-blue-100 text-sm mt-1">
                        لأن صحتك هي أولويتنا
                      </p>

                    </div>

                  </div>


                  <div className="space-y-5">

                    <div className="flex items-center gap-4 bg-white/10 rounded-2xl p-4">

                      <CheckCircle2
                        className="text-cyan-300"
                        size={23}
                      />

                      <span className="text-white">
                        أطباء متخصصون
                      </span>

                    </div>


                    <div className="flex items-center gap-4 bg-white/10 rounded-2xl p-4">

                      <CheckCircle2
                        className="text-cyan-300"
                        size={23}
                      />

                      <span className="text-white">
                        أحدث تقنيات طب الأسنان
                      </span>

                    </div>


                    <div className="flex items-center gap-4 bg-white/10 rounded-2xl p-4">

                      <CheckCircle2
                        className="text-cyan-300"
                        size={23}
                      />

                      <span className="text-white">
                        حجز إلكتروني سريع
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* STATS */}
      {/* ================================================= */}

      <section className="relative -mt-12 z-20 px-6">

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">

          {/* Doctors */}

          <motion.div
            whileHover={{
              y: -8,
            }}
            className="bg-white rounded-3xl p-7 shadow-xl border border-gray-100 text-center"
          >

            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-100 flex items-center justify-center mb-4">

              <Users
                size={27}
                className="text-blue-600"
              />

            </div>

            <h3 className="text-4xl font-black text-blue-700">

              {doctorsCount}+

            </h3>

            <p className="text-gray-500 mt-2">
              أطباء متخصصون
            </p>

          </motion.div>


          {/* Services */}

          <motion.div
            whileHover={{
              y: -8,
            }}
            className="bg-white rounded-3xl p-7 shadow-xl border border-gray-100 text-center"
          >

            <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-100 flex items-center justify-center mb-4">

              <HeartPulse
                size={27}
                className="text-cyan-600"
              />

            </div>

            <h3 className="text-4xl font-black text-blue-700">

              {servicesCount}+

            </h3>

            <p className="text-gray-500 mt-2">
              خدمات طبية
            </p>

          </motion.div>


          {/* Appointments */}

          <motion.div
            whileHover={{
              y: -8,
            }}
            className="bg-white rounded-3xl p-7 shadow-xl border border-gray-100 text-center"
          >

            <div className="w-14 h-14 mx-auto rounded-2xl bg-green-100 flex items-center justify-center mb-4">

              <CalendarDays
                size={27}
                className="text-green-600"
              />

            </div>

            <h3 className="text-4xl font-black text-blue-700">

              {appointmentsCount}+

            </h3>

            <p className="text-gray-500 mt-2">
              مواعيد محجوزة
            </p>

          </motion.div>

        </div>

      </section>


      {/* ================================================= */}
      {/* SERVICES */}
      {/* ================================================= */}

      <section className="py-24 px-6">

        <div className="max-w-7xl mx-auto">

          {/* Header */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
            className="text-center mb-14"
          >

            <span className="text-blue-600 font-bold">
              خدماتنا
            </span>

            <h2 className="text-4xl md:text-5xl font-black mt-3">
              خدمات طبية متكاملة
            </h2>

            <p className="text-gray-500 max-w-2xl mx-auto mt-5 leading-8">
              نوفر مجموعة واسعة من خدمات طب الأسنان
              لتلبية جميع احتياجاتك بأعلى جودة.
            </p>

          </motion.div>


          {/* Services */}

          {servicesLoading ? (

            <div className="text-center py-16 text-gray-500">
              جاري تحميل الخدمات...
            </div>

          ) : (

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

              {services?.slice(0, 6).map(
                (service: any, index: number) => (

                  <motion.div
                    key={service.id}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    whileHover={{
                      y: -8,
                    }}
                    className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition"
                  >

                    {/* Image */}

                    <div className="relative h-56 overflow-hidden">

                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      <div className="absolute bottom-5 right-5 text-white">

                        <h3 className="text-2xl font-bold">
                          {service.title}
                        </h3>

                      </div>

                    </div>


                    {/* Content */}

                    <div className="p-6">

                      <p className="text-gray-500 leading-7 line-clamp-3">
                        {service.description}
                      </p>


                      <Link
                        to={`/services/${service.id}`}
                        className="inline-flex items-center gap-2 text-blue-600 font-bold mt-5 hover:gap-4 transition-all"
                      >

                        عرض التفاصيل

                        <ArrowLeft size={18} />

                      </Link>

                    </div>

                  </motion.div>

                )
              )}

            </div>

          )}


          {/* All Services */}

          {services &&
            services.length > 6 && (

              <div className="text-center mt-10">

                <Link
                  to="/services"
                  className="inline-flex items-center gap-3 bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                >

                  جميع الخدمات

                  <ArrowLeft size={19} />

                </Link>

              </div>

            )}

        </div>

      </section>


      {/* ================================================= */}
      {/* AVAILABLE APPOINTMENTS */}
      {/* ================================================= */}

      <section className="py-24 px-6 bg-gray-50">

        <div className="max-w-6xl mx-auto">

          {/* Header */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
            className="text-center mb-14"
          >

            <span className="text-blue-600 font-bold">
              المواعيد
            </span>

            <h2 className="text-4xl md:text-5xl font-black mt-3">
              تحقق من الأوقات المتاحة
            </h2>

            <p className="text-gray-500 mt-4">
              اختر الطبيب والتاريخ لمعرفة المواعيد
              المتاحة للحجز.
            </p>

          </motion.div>


          {/* Booking Card */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-7 md:p-10"
          >

            <div className="grid md:grid-cols-2 gap-6">


              {/* DOCTOR */}

              <div>

                <label className="block font-bold mb-3">
                  اختر الطبيب
                </label>

                <select
                  value={selectedDoctor ?? ""}
                  onChange={(e) => {

                    setSelectedDoctor(
                      e.target.value
                        ? Number(e.target.value)
                        : null
                    );

                  }}
                  className="w-full border border-gray-200 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >

                  <option value="">
                    {doctorsLoading
                      ? "جاري تحميل الأطباء..."
                      : "اختر الطبيب"}
                  </option>


                  {doctors?.map(
                    (doctor: any) => (

                      <option
                        key={doctor.id}
                        value={doctor.id}
                      >

                        {doctor.name}
                        {" - "}
                        {doctor.specialization}

                      </option>

                    )
                  )}

                </select>

              </div>


              {/* DATE */}

              <div>

                <label className="block font-bold mb-3">
                  اختر التاريخ
                </label>

                <input
                  type="date"
                  value={selectedDate}
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={(e) =>
                    setSelectedDate(
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-200 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>


            {/* TIMES */}

            {selectedDoctor &&
              selectedDate && (

                <div className="mt-10">

                  <div className="flex items-center gap-3 mb-6">

                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

                      <Clock
                        className="text-blue-600"
                      />

                    </div>

                    <div>

                      <h3 className="text-xl font-bold">
                        الأوقات المتاحة
                      </h3>

                      <p className="text-gray-500 text-sm">
                        اختر الوقت المناسب لك
                      </p>

                    </div>

                  </div>


                  {timesLoading ? (

                    <div className="text-center py-10 text-gray-500">
                      جاري البحث عن المواعيد...
                    </div>

                  ) : availableTimes &&
                    availableTimes.length > 0 ? (

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

                      {availableTimes.map(
                        (time: string) => (

                          <div
                            key={time}
                            className="bg-blue-50 border border-blue-100 text-blue-700 rounded-2xl py-4 text-center font-bold hover:bg-blue-600 hover:text-white transition cursor-default"
                          >

                            {time}

                          </div>

                        )
                      )}

                    </div>

                  ) : (

                    <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl p-6 text-center">
                      لا توجد أوقات متاحة لهذا
                      الطبيب في هذا التاريخ.
                    </div>

                  )}


                  {/* BOOK */}

                  {availableTimes &&
                    availableTimes.length > 0 && (

                      <div className="mt-8 text-center">

                        <Link
                          to="/appointment"
                          className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg"
                        >

                          احجز موعدك الآن

                          <ArrowLeft size={20} />

                        </Link>

                      </div>

                    )}

                </div>

              )}


            {/* EMPTY */}

            {(!selectedDoctor ||
              !selectedDate) && (

              <div className="mt-10 text-center py-10">

                <CalendarDays
                  size={48}
                  className="mx-auto text-blue-500 mb-4"
                />

                <p className="text-gray-500">
                  اختر الطبيب والتاريخ لعرض
                  الأوقات المتاحة
                </p>

              </div>

            )}

          </motion.div>

        </div>

      </section>


      {/* ================================================= */}
      {/* DOCTORS */}
      {/* ================================================= */}

      <section className="py-24 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">

            <span className="text-blue-600 font-bold">
              فريقنا الطبي
            </span>

            <h2 className="text-4xl md:text-5xl font-black mt-3">
              تعرف على أطبائنا
            </h2>

            <p className="text-gray-500 mt-4">
              نخبة من الأطباء المتخصصين لمساعدتك.
            </p>

          </div>


          {doctorsLoading ? (

            <div className="text-center py-10 text-gray-500">
              جاري تحميل الأطباء...
            </div>

          ) : (

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

              {doctors?.slice(0, 3).map(
                (doctor: any, index: number) => (

                  <motion.div
                    key={doctor.id}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    whileHover={{
                      y: -8,
                    }}
                    className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
                  >

                    <div className="h-72 overflow-hidden">

                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />

                    </div>


                    <div className="p-6 text-center">

                      <h3 className="text-2xl font-bold">
                        {doctor.name}
                      </h3>

                      <p className="text-blue-600 font-medium mt-2">
                        {doctor.specialization}
                      </p>


                      <Link
                        to={`/doctors/${doctor.id}`}
                        className="inline-flex items-center gap-2 mt-5 text-blue-600 font-bold hover:gap-4 transition-all"
                      >

                        الملف الشخصي

                        <ArrowLeft size={18} />

                      </Link>

                    </div>

                  </motion.div>

                )
              )}

            </div>

          )}


          {doctors &&
            doctors.length > 3 && (

              <div className="text-center mt-10">

                <Link
                  to="/doctors"
                  className="inline-flex items-center gap-3 bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                >

                  جميع الأطباء

                  <ArrowLeft size={19} />

                </Link>

              </div>

            )}

        </div>

      </section>


      {/* ================================================= */}
      {/* WHY US */}
      {/* ================================================= */}

      <section className="py-24 px-6 bg-blue-950 text-white">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <span className="text-cyan-300 font-bold">
              لماذا نحن؟
            </span>

            <h2 className="text-4xl md:text-5xl font-black mt-4 leading-tight">
              رعاية مختلفة تبدأ من أول زيارة
            </h2>

            <p className="text-blue-100 leading-8 mt-6">
              هدفنا أن نجعل تجربة زيارة طبيب الأسنان
              أكثر راحة وسهولة، مع تقديم رعاية طبية
              عالية الجودة.
            </p>

          </div>


          <div className="grid sm:grid-cols-2 gap-5">

            <div className="bg-white/10 border border-white/10 rounded-3xl p-7">

              <ShieldCheck
                size={35}
                className="text-cyan-300 mb-5"
              />

              <h3 className="text-xl font-bold mb-2">
                أمان وثقة
              </h3>

              <p className="text-blue-100 text-sm leading-7">
                نحرص على أعلى معايير الجودة والسلامة.
              </p>

            </div>


            <div className="bg-white/10 border border-white/10 rounded-3xl p-7">

              <Stethoscope
                size={35}
                className="text-cyan-300 mb-5"
              />

              <h3 className="text-xl font-bold mb-2">
                أطباء متخصصون
              </h3>

              <p className="text-blue-100 text-sm leading-7">
                فريق طبي ذو خبرة وتخصصات متنوعة.
              </p>

            </div>


            <div className="bg-white/10 border border-white/10 rounded-3xl p-7">

              <Clock
                size={35}
                className="text-cyan-300 mb-5"
              />

              <h3 className="text-xl font-bold mb-2">
                حجز سهل
              </h3>

              <p className="text-blue-100 text-sm leading-7">
                احجز موعدك بسهولة من أي مكان.
              </p>

            </div>


            <div className="bg-white/10 border border-white/10 rounded-3xl p-7">

              <HeartPulse
                size={35}
                className="text-cyan-300 mb-5"
              />

              <h3 className="text-xl font-bold mb-2">
                رعاية متكاملة
              </h3>

              <p className="text-blue-100 text-sm leading-7">
                خدمات متنوعة لجميع احتياجات الأسنان.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* FINAL CTA */}
      {/* ================================================= */}

      <section className="py-24 px-6">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          className="max-w-5xl mx-auto relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 to-blue-900 p-10 md:p-16 text-center text-white"
        >

          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-2xl" />

          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-400/20 rounded-full blur-2xl" />


          <div className="relative z-10">

            <Sparkles
              className="mx-auto text-cyan-300 mb-5"
              size={35}
            />

            <h2 className="text-4xl md:text-5xl font-black mb-5">
              جاهز لابتسامتك الجديدة؟
            </h2>

            <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-8 mb-8">
              احجز موعدك الآن ودعنا نهتم بصحة
              وجمال ابتسامتك.
            </p>


            <Link to="/appointment">

              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="inline-flex items-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-2xl font-black shadow-xl"
              >

                احجز موعد الآن

                <ArrowLeft size={21} />

              </motion.div>

            </Link>

          </div>

        </motion.div>

      </section>

    </div>
  );
};

export default Home;