import { motion } from "framer-motion";
import {
  Users,
  Stethoscope,
  Award,
  Clock,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router";

import { useStats } from "../hooks/useStats";

const About = () => {
  const { data: stats, isLoading } = useStats();

  const statistics = [
    {
      icon: Users,
      number: stats?.patients ?? 0,
      title: "مريض",
    },
    {
      icon: Stethoscope,
      number: stats?.doctors ?? 0,
      title: "طبيب متخصص",
    },
    {
      icon: Award,
      number: stats?.services ?? 0,
      title: "خدمة طبية",
    },
    {
      icon: Clock,
      number: stats?.appointments ?? 0,
      title: "موعد محجوز",
    },
  ];

  const features = [
    {
      icon: HeartPulse,
      title: "رعاية تركز على المريض",
      description:
        "نهتم براحة كل مريض ونحرص على تقديم تجربة طبية مريحة وآمنة.",
    },
    {
      icon: ShieldCheck,
      title: "أمان وجودة عالية",
      description:
        "نلتزم بأعلى معايير الجودة والسلامة في جميع خدماتنا الطبية.",
    },
    {
      icon: Sparkles,
      title: "تقنيات حديثة",
      description:
        "نعتمد على أحدث التقنيات والأساليب الحديثة في مجال طب الأسنان.",
    },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-white text-gray-800"
    >
      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background */}

        <div className="absolute inset-0">
          <img
            src="https://wallpapers.com/images/hd/dentist-s-dental-tools-hf5tfhuaco0o9msr.jpg"
            alt="Dental Clinic"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-l from-blue-950/90 via-blue-900/75 to-blue-900/40" />
        </div>

        {/* Decorative circles */}

        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />

        <div className="absolute -bottom-32 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />

        {/* Content */}

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
              <Sparkles size={18} />

              <span className="text-sm font-medium">
                رعاية طبية بأسلوب مختلف
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              نعتني بصحتك
              <span className="block text-blue-300">
                ونصنع ابتسامتك
              </span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 leading-9 max-w-2xl mb-8">
              نحن مركز طبي متخصص في طب الأسنان، نقدم خدمات
              متكاملة بأيدي أطباء متخصصين وباستخدام أحدث
              التقنيات، لنمنحك تجربة علاجية مريحة وآمنة
              وابتسامة تستحقها.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/appointment"
                className="inline-flex items-center justify-center gap-3 bg-white text-blue-700 px-7 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition shadow-lg"
              >
                احجز موعدك الآن

                <ArrowLeft size={20} />
              </Link>

              <a
                href="#about"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md text-white font-semibold hover:bg-white/20 transition"
              >
                اكتشف المزيد
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================= */}
      {/* STATS */}
      {/* ================================================= */}

      <section className="relative -mt-16 z-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.title}
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
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="relative p-6 md:p-8 text-center group"
                >
                  {index !== statistics.length - 1 && (
                    <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gray-200" />
                  )}

                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                    <Icon size={26} />
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
                    {isLoading ? "..." : stat.number}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {stat.title}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* ABOUT */}
      {/* ================================================= */}

      <section
        id="about"
        className="py-24 px-6"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}

          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative"
          >
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-blue-100 rounded-3xl" />

            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
              alt="Dental Clinic"
              className="relative w-full h-[450px] object-cover rounded-3xl shadow-2xl"
            />

            <div className="absolute bottom-6 right-6 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <ShieldCheck size={25} />
              </div>

              <div>
                <p className="font-bold text-gray-800">
                  رعاية موثوقة
                </p>

                <p className="text-sm text-gray-500">
                  راحتك أولويتنا
                </p>
              </div>
            </div>
          </motion.div>

          {/* Text */}

          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <span className="inline-block text-blue-600 font-bold mb-4">
              من نحن؟
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              خبرة طبية
              <span className="text-blue-600">
                {" "}
                واهتمام حقيقي
              </span>
              <br />
              بكل مريض
            </h2>

            <p className="text-gray-600 text-lg leading-9 mb-6">
              نحن مركز طبي متخصص في طب الأسنان، نهدف إلى
              توفير رعاية متكاملة تجمع بين الخبرة الطبية
              والتكنولوجيا الحديثة والاهتمام براحة المريض.
            </p>

            <p className="text-gray-500 leading-8 mb-8">
              يعمل فريقنا على تقديم حلول علاجية مناسبة لكل
              حالة، مع الحرص على شرح الخيارات العلاجية
              للمريض وتوفير بيئة مريحة وآمنة طوال فترة
              العلاج.
            </p>

            <Link
              to="/appointment"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-xl font-semibold transition shadow-lg shadow-blue-600/20"
            >
              احجز موعدًا

              <ArrowLeft size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================================================= */}
      {/* FEATURES */}
      {/* ================================================= */}

      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
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
              duration: 0.6,
            }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="text-blue-600 font-bold">
              لماذا نحن؟
            </span>

            <h2 className="text-4xl font-bold mt-3 mb-5">
              كل ما تحتاجه لصحة أفضل
            </h2>

            <p className="text-gray-500 leading-8">
              نعمل على تقديم تجربة طبية متكاملة تجمع بين
              الجودة والراحة والتكنولوجيا الحديثة.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-7">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
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
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100"
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                    <Icon size={30} />
                  </div>

                  <h3 className="text-xl font-bold mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-gray-500 leading-8">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* CTA */}
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
          transition={{
            duration: 0.6,
          }}
          className="relative max-w-6xl mx-auto overflow-hidden rounded-[2rem] bg-gradient-to-l from-blue-700 to-blue-500 p-10 md:p-16 text-center text-white"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10" />

          <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-white/10" />

          <div className="relative z-10">
            <Sparkles
              size={38}
              className="mx-auto mb-5"
            />

            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              ابتسامتك تستحق الأفضل
            </h2>

            <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-8 mb-8">
              احجز موعدك الآن واحصل على الرعاية التي
              تستحقها مع فريقنا الطبي المتخصص.
            </p>

            <Link
              to="/appointment"
              className="inline-flex items-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition shadow-xl"
            >
              احجز موعدك الآن

              <ArrowLeft size={21} />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;