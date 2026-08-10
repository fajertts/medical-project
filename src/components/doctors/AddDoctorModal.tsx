import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAddDoctor } from "../../hooks/useAddDoctor";
import { useUpdateDoctor } from "../../hooks/useUpdateDoctor";

type Props = {
  onClose: () => void;
  doctor?: any;
};

const AddDoctorModal = ({ onClose, doctor }: Props) => {
  const {
    mutate: addDoctor,
    isPending: isAdding,
  } = useAddDoctor();

  const {
    mutate: updateDoctor,
    isPending: isUpdating,
  } = useUpdateDoctor();

  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (doctor) {
      setName(doctor.name);
      setSpecialization(doctor.specialization);
      setPreview(doctor.image);
    }
  }, [doctor]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (doctor) {
      updateDoctor(
        {
          id: doctor.id,
          name,
          specialization,
          image,
        },
        {
          onSuccess: () => {
            toast.success("Doctor Updated Successfully");
            onClose();
          },
          onError: () => {
            toast.error("Failed To Update Doctor");
          },
        }
      );

      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("specialization", specialization);

    if (image) {
      formData.append("image", image);
    }

    addDoctor(formData, {
      onSuccess: () => {
        toast.success("Doctor Added Successfully");
        onClose();
      },
      onError: () => {
        toast.error("Failed To Add Doctor");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 w-[450px]"
      >
        <h2 className="text-2xl font-bold mb-6">
          {doctor ? "Edit Doctor" : "Add Doctor"}
        </h2>

        <input
          type="text"
          placeholder="Doctor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
          required
        />

        <input
          type="text"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
          required
        />

        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Doctor Image
          </label>

          <input
            type="file"
            accept="image/*"
            className="w-full border rounded-lg p-3"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-xl border mx-auto mt-5"
            />
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isAdding || isUpdating}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            {isAdding || isUpdating
              ? doctor
                ? "Updating..."
                : "Saving..."
              : doctor
                ? "Update"
                : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctorModal;