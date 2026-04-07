interface Doctor {
  name: string;
  specialty: string;
  experience: string;
  image: string;
}

const DoctorCard = ({ name, specialty, experience, image }: Doctor) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      {/* Image */}
      <div className="h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 text-center">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-blue-600 font-medium">{specialty}</p>
        <p className="text-gray-500 text-sm mt-2">{experience}</p>

        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition cursor-pointer">
          احجز موعد
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;