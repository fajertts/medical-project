import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  Stethoscope,
  UserRound,
} from "lucide-react";

const DoctorProfile = () => {
  const { id } = useParams();

  const {
    data: doctor,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["doctor", id],

    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3000/api/doctors/${id}`
      );

      return response.data;
    },

    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">

          <div className="
            w-14
            h-14
            border-4
            border-blue-200
            border-t-blue-600
            rounded-full
            animate-spin
            mx-auto
          " />

          <p className="mt-5 text-gray-500">
            Loading doctor profile...
          </p>

        </div>
      </div>
    );
  }

  if (isError || !doctor) {
    return (
      <div className="
        min-h-screen
        bg-slate-50
        flex
        items-center
        justify-center
        px-6
      ">

        <div className="
          bg-white
          rounded-3xl
          shadow-lg
          p-10
          text-center
          max-w-md
          w-full
        ">

          <div className="
            w-16
            h-16
            bg-red-100
            rounded-full
            flex
            items-center
            justify-center
            mx-auto
            mb-5
          ">
            <Stethoscope
              size={30}
              className="text-red-500"
            />
          </div>

          <h1 className="
            text-2xl
            font-bold
            text-gray-800
          ">
            Doctor Not Found
          </h1>

          <p className="text-gray-500 mt-2">
            We couldn't find this doctor.
          </p>

          <Link
            to="/doctors"
            className="
              inline-flex
              items-center
              gap-2
              mt-6
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5
              py-3
              rounded-xl
              transition
            "
          >
            <ArrowLeft size={18} />
            Back to Doctors
          </Link>

        </div>

      </div>
    );
  }

  return (
    <section className="
      min-h-screen
      bg-slate-50
      py-12
      md:py-20
    ">

      <div className="
        max-w-6xl
        mx-auto
        px-6
      ">

        {/* BACK BUTTON */}

        <Link
          to="/doctors"
          className="
            inline-flex
            items-center
            gap-2
            text-gray-500
            hover:text-blue-600
            mb-8
            transition
          "
        >
          <ArrowLeft size={18} />
          Back to Doctors
        </Link>

        {/* PROFILE CARD */}

        <div className="
          bg-white
          rounded-[2rem]
          shadow-xl
          overflow-hidden
        ">

          <div className="
            grid
            grid-cols-1
            lg:grid-cols-2
          ">

            {/* IMAGE */}

            <div className="
              relative
              min-h-[400px]
              lg:min-h-[600px]
              bg-blue-50
            ">

              {doctor.image ? (
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                  "
                />
              ) : (
                <div className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                ">
                  <UserRound
                    size={140}
                    className="text-blue-200"
                  />
                </div>
              )}

              <div className="
                absolute
                top-6
                left-6
                bg-white/95
                backdrop-blur
                px-4
                py-2
                rounded-full
                text-blue-600
                text-sm
                font-semibold
                shadow
              ">
                Medical Specialist
              </div>

            </div>

            {/* INFORMATION */}

            <div className="
              p-8
              md:p-12
              lg:p-14
              flex
              flex-col
              justify-center
            ">

              <div className="
                inline-flex
                items-center
                gap-2
                text-blue-600
                font-semibold
                text-sm
                mb-5
              ">
                <Stethoscope size={20} />
                Medical Specialist
              </div>

              <h1 className="
                text-4xl
                md:text-5xl
                font-bold
                text-gray-800
              ">
                Dr. {doctor.name}
              </h1>

              <p className="
                text-blue-600
                text-xl
                font-semibold
                mt-3
              ">
                {doctor.specialization}
              </p>

              <div className="
                h-px
                bg-gray-100
                my-8
              " />

              <h2 className="
                text-2xl
                font-bold
                text-gray-800
                mb-4
              ">
                About Doctor
              </h2>

              <p className="
                text-gray-500
                leading-8
              ">
                Dr. {doctor.name} is a specialized medical
                professional dedicated to providing high-quality
                care and personalized treatment for every patient.
              </p>

              {/* FEATURES */}

              <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
                mt-8
              ">

                <div className="flex items-center gap-3">

                  <div className="
                    w-10
                    h-10
                    bg-blue-100
                    rounded-xl
                    flex
                    items-center
                    justify-center
                  ">
                    <CheckCircle
                      size={20}
                      className="text-blue-600"
                    />
                  </div>

                  <span className="text-gray-600">
                    Professional Care
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <div className="
                    w-10
                    h-10
                    bg-blue-100
                    rounded-xl
                    flex
                    items-center
                    justify-center
                  ">
                    <Stethoscope
                      size={20}
                      className="text-blue-600"
                    />
                  </div>

                  <span className="text-gray-600">
                    Specialized Treatment
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <div className="
                    w-10
                    h-10
                    bg-blue-100
                    rounded-xl
                    flex
                    items-center
                    justify-center
                  ">
                    <CalendarDays
                      size={20}
                      className="text-blue-600"
                    />
                  </div>

                  <span className="text-gray-600">
                    Easy Appointments
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <div className="
                    w-10
                    h-10
                    bg-blue-100
                    rounded-xl
                    flex
                    items-center
                    justify-center
                  ">
                    <UserRound
                      size={20}
                      className="text-blue-600"
                    />
                  </div>

                  <span className="text-gray-600">
                    Patient Focused
                  </span>

                </div>

              </div>

              {/* BOOK APPOINTMENT */}

              <Link
                to={`/appointment?doctorId=${doctor.id}`}
                className="
                  mt-10
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  py-4
                  rounded-2xl
                  font-semibold
                  text-center
                  transition
                  shadow-lg
                  shadow-blue-200
                "
              >
                Book Appointment
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default DoctorProfile;