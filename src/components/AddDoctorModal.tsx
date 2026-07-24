import { useState } from "react";
import { useAddDoctor } from "../hooks/useAddDoctor";

type Props = {
  onClose: () => void;
};

const AddDoctorModal = ({ onClose }: Props) => {
  const { mutate, isPending } = useAddDoctor();

  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      {
        name,
        specialization,
        image,
        days: [],
        times: [],
      },
      {
        onSuccess: () => {
          alert("Doctor Added Successfully");
          onClose();
        },
        onError: (error) => {
          console.error(error);
          alert("Failed To Add Doctor");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-[450px] shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6">
          Add Doctor
        </h2>

        <input
          type="text"
          placeholder="Doctor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded mb-4"
          required
        />

        <input
          type="text"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="w-full border p-3 rounded mb-4"
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border p-3 rounded mb-6"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctorModal;