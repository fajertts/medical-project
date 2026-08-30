import { motion } from "framer-motion";
import {
  ArrowRight,
  Search,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useServices } from "../hooks/useServices";

const Services = () => {
  const {
    data: services,
    isLoading,
    isError,
  } = useServices();

  const [search, setSearch] = useState("");

  const filteredServices = useMemo(() => {
    if (!services) return [];

    return services.filter((service: any) => {
      const searchValue = search.toLowerCase();

      return (
        service.title
          ?.toLowerCase()
          .includes(searchValue) ||
        service.description
          ?.toLowerCase()
          .includes(searchValue)
      );
    });
  }, [services, search]);

  /* ========================= */
  /* LOADING */
  /* ========================= */

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="
            w-14
            h-14
            border-4
            border-blue-100
            border-t-blue-600
            rounded-full
          "
        />

      </div>
    );
  }

  /* ========================= */
  /* ERROR */
  /* ========================= */

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-5">

        <div className="text-center">

          <h1 className="text-3xl font-bold text-gray-800">
            Unable to Load Services
          </h1>

          <p className="text-gray-500 mt-3">
            Please try again later.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ========================= */}
      {/* HERO */}
      {/* ========================= */}

      <section className="relative overflow-hidden">

        {/* Background */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-blue-700
            via-blue-600
            to-cyan-500
          "
        />

        {/* Decorative circles */}

        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -top-20
            -left-20
            w-72
            h-72
            bg-white/10
            rounded-full
            blur-2xl
          "
        />

        <motion.div
          animate={{
            y: [0, -35, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -bottom-24
            right-0
            w-96
            h-96
            bg-cyan-300/20
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            relative
            max-w-7xl
            mx-auto
            px-5
            sm:px-8
            lg:px-10
            py-24
            lg:py-32
            text-center
          "
        >

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              inline-flex
              items-center
              gap-2
              bg-white/15
              border
              border-white/20
              backdrop-blur-md
              px-5
              py-2
              rounded-full
              text-white
              text-sm
              font-medium
              mb-7
            "
          >

            <Sparkles size={17} />

            Professional Dental Care

          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 0.8,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="
              text-4xl
              sm:text-5xl
              lg:text-7xl
              font-bold
              text-white
              tracking-tight
            "
          >

            Our Dental Services

          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 0.9,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="
              max-w-2xl
              mx-auto
              mt-7
              text-blue-50
              text-base
              sm:text-lg
              leading-8
            "
          >

            Discover our professional dental services designed
            to give you a healthier, brighter and more
            confident smile.

          </motion.p>

        </div>

      </section>


      {/* ========================= */}
      {/* SERVICES */}
      {/* ========================= */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-8
          lg:px-10
          py-20
          lg:py-28
        "
      >

        {/* ========================= */}
        {/* SECTION HEADER */}
        {/* ========================= */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-end
            lg:justify-between
            gap-8
            mb-14
          "
        >

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
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
          >

            <div
              className="
                flex
                items-center
                gap-2
                text-blue-600
                font-semibold
                text-sm
                mb-4
              "
            >

              <Stethoscope size={18} />

              WHAT WE OFFER

            </div>

            <h2
              className="
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-bold
                text-gray-900
              "
            >
              Complete Care For Your Smile
            </h2>

          </motion.div>


          {/* SEARCH */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
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
              delay: 0.1,
            }}
            className="
              relative
              w-full
              lg:w-96
            "
          >

            <Search
              size={20}
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                bg-white
                border
                border-gray-200
                rounded-2xl
                pl-13
                pr-5
                py-4
                outline-none
                shadow-sm
                focus:ring-4
                focus:ring-blue-100
                focus:border-blue-400
                transition
              "
            />

          </motion.div>

        </div>


        {/* ========================= */}
        {/* COUNT */}
        {/* ========================= */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          className="
            text-gray-500
            mb-8
          "
        >

          Showing{" "}

          <span className="font-semibold text-gray-800">
            {filteredServices.length}
          </span>

          {" "}services

        </motion.p>


        {/* ========================= */}
        {/* GRID */}
        {/* ========================= */}

        {filteredServices.length === 0 ? (

          <div
            className="
              bg-white
              rounded-3xl
              p-16
              text-center
              border
              border-gray-100
              shadow-sm
            "
          >

            <Search
              size={45}
              className="
                mx-auto
                text-gray-300
                mb-5
              "
            />

            <h3
              className="
                text-2xl
                font-bold
                text-gray-800
              "
            >
              No Services Found
            </h3>

            <p className="text-gray-500 mt-3">
              Try searching for something else.
            </p>

          </div>

        ) : (

          <div
            className="
              grid
              sm:grid-cols-2
              lg:grid-cols-3
              gap-7
            "
          >

            {filteredServices.map(
              (
                service: any,
                index: number
              ) => (

                <motion.div
                  key={service.id}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -10,
                  }}
                  className="
                    group
                    bg-white
                    rounded-3xl
                    overflow-hidden
                    border
                    border-gray-100
                    shadow-sm
                    hover:shadow-2xl
                    transition-shadow
                    duration-300
                  "
                >

                  {/* IMAGE */}

                  <div
                    className="
                      relative
                      h-64
                      overflow-hidden
                      bg-blue-50
                    "
                  >

                    {service.image ? (

                      <img
                        src={service.image}
                        alt={service.title}
                        className="
                          w-full
                          h-full
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-110
                        "
                      />

                    ) : (

                      <div
                        className="
                          w-full
                          h-full
                          flex
                          items-center
                          justify-center
                        "
                      >

                        <Stethoscope
                          size={80}
                          className="text-blue-200"
                        />

                      </div>

                    )}


                    {/* Overlay */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/40
                        via-transparent
                        to-transparent
                        opacity-0
                        group-hover:opacity-100
                        transition
                        duration-500
                      "
                    />

                  </div>


                  {/* CONTENT */}

                  <div className="p-7">

                    <h3
                      className="
                        text-2xl
                        font-bold
                        text-gray-900
                        group-hover:text-blue-600
                        transition
                      "
                    >
                      {service.title}
                    </h3>


                    <p
                      className="
                        text-gray-500
                        leading-7
                        mt-4
                        line-clamp-3
                      "
                    >
                      {service.description}
                    </p>


                    {/* BUTTON */}

                    <Link
                      to="/appointment"
                      className="
                        mt-7
                        inline-flex
                        items-center
                        gap-2
                        text-blue-600
                        font-semibold
                        group/link
                      "
                    >

                      Book This Service

                      <ArrowRight
                        size={19}
                        className="
                          transition-transform
                          group-hover/link:translate-x-2
                        "
                      />

                    </Link>

                  </div>

                </motion.div>

              )
            )}

          </div>

        )}

      </section>


      {/* ========================= */}
      {/* CTA */}
      {/* ========================= */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-8
          lg:px-10
          pb-20
          lg:pb-28
        "
      >

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
          transition={{
            duration: 0.6,
          }}
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-gradient-to-r
            from-blue-700
            to-cyan-500
            px-8
            py-14
            md:px-16
            md:py-20
            text-center
          "
        >

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            className="
              absolute
              w-80
              h-80
              bg-white/10
              rounded-full
              -top-32
              -left-32
            "
          />

          <div className="relative">

            <h2
              className="
                text-3xl
                md:text-5xl
                font-bold
                text-white
              "
            >
              Ready For a Healthier Smile?
            </h2>

            <p
              className="
                max-w-2xl
                mx-auto
                mt-6
                text-blue-100
                leading-7
              "
            >
              Book your appointment today and let our
              professional dental team take care of your smile.
            </p>

            <Link
              to="/appointment"
              className="
                inline-flex
                items-center
                gap-3
                mt-9
                bg-white
                text-blue-600
                px-7
                py-4
                rounded-xl
                font-semibold
                shadow-lg
                hover:scale-105
                transition
              "
            >

              Book Appointment

              <ArrowRight size={20} />

            </Link>

          </div>

        </motion.div>

      </section>

    </div>
  );
};

export default Services;