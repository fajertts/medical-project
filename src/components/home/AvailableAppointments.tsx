import { useState } from "react";
import { CalendarDays, Clock } from "lucide-react";

import { useDoctors } from "../../hooks/useDoctors";
import { useAvailableTimes } from "../../hooks/useAvailableTimes";

const AvailableAppointments = () => {
  const { data: doctors, isLoading: doctorsLoading } =
    useDoctors();

  const [doctorId, setDoctorId] =
    useState<number | null>(null);

  const [date, setDate] =
    useState("");

  const {
    data: availableTimes,
    isLoading: timesLoading,
  } = useAvailableTimes(
    doctorId,
    date
  );

  return (
    <section className="py-20 px-6 bg-gray-50">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-12">

          <span className="text-blue-600 font-semibold">

            المواعيد

          </span>

          <h2 className="text-4xl font-bold text-gray-800 mt-3">

            تحقق من الأوقات المتاحة

          </h2>

          <p className="text-gray-500 mt-4">

            اختر الطبيب والتاريخ لمعرفة المواعيد المتوفرة.

          </p>

        </div>


        {/* CARD */}

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">


          <div className="grid md:grid-cols-2 gap-6">


            {/* DOCTOR */}

            <div>

              <label className="block font-semibold text-gray-700 mb-3">

                اختر الطبيب

              </label>


              <select
                value={doctorId ?? ""}
                onChange={(e) => {
                  setDoctorId(
                    e.target.value
                      ? Number(e.target.value)
                      : null
                  );
                }}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                      {doctor.name} -{" "}
                      {doctor.specialization}

                    </option>

                  )
                )}

              </select>

            </div>


            {/* DATE */}

            <div>

              <label className="block font-semibold text-gray-700 mb-3">

                اختر التاريخ

              </label>


              <input
                type="date"
                value={date}
                min={
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }
                onChange={(e) =>
                  setDate(e.target.value)
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          </div>


          {/* AVAILABLE TIMES */}

          {doctorId && date && (

            <div className="mt-10">


              <div className="flex items-center gap-3 mb-6">

                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

                  <Clock className="text-blue-600" />

                </div>


                <div>

                  <h3 className="text-xl font-bold">

                    الأوقات المتاحة

                  </h3>

                  <p className="text-sm text-gray-500">

                    اختر الوقت المناسب لك

                  </p>

                </div>

              </div>


              {timesLoading ? (

                <div className="text-center py-10 text-gray-500">

                  جاري البحث عن الأوقات المتاحة...

                </div>

              ) : availableTimes &&
                availableTimes.length > 0 ? (

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">


                  {availableTimes.map(
                    (time: string) => (

                      <div
                        key={time}
                        className="border border-blue-100 bg-blue-50 rounded-xl py-4 text-center font-semibold text-blue-700 hover:bg-blue-600 hover:text-white transition cursor-default"
                      >

                        {time}

                      </div>

                    )
                  )}


                </div>

              ) : (

                <div className="bg-red-50 text-red-600 rounded-xl p-6 text-center">

                  لا توجد أوقات متاحة لهذا الطبيب في هذا التاريخ.

                </div>

              )}

            </div>

          )}


          {!doctorId || !date ? (

            <div className="mt-10 text-center text-gray-400">

              <CalendarDays
                size={45}
                className="mx-auto mb-3"
              />

              اختر الطبيب والتاريخ لعرض الأوقات المتاحة.

            </div>

          ) : null}

        </div>

      </div>

    </section>
  );
};

export default AvailableAppointments;