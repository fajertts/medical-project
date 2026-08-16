import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { X, UploadCloud } from "lucide-react";

import { useAddService } from "../../hooks/useAddServices";
import { useUpdateService } from "../../hooks/useUpdateServices";

type Service = {
  id: number;
  title: string;
  description: string;
  image?: string;
};

type Props = {
  onClose: () => void;
  service?: Service | null;
};

const AddServiceModal = ({
  onClose,
  service,
}: Props) => {
  const { mutate, isPending } = useAddService();
  const updateService = useUpdateService();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  // =========================
  // LOAD SERVICE DATA
  // =========================

  useEffect(() => {
    if (service) {
      setTitle(service.title || "");
      setDescription(service.description || "");
      setPreview(service.image || "");
      setImage(null);
    } else {
      setTitle("");
      setDescription("");
      setPreview("");
      setImage(null);
    }
  }, [service]);

  // =========================
  // IMAGE CHANGE
  // =========================

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image");
      return;
    }

    setImage(file);

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Service title is required");
      return;
    }

    if (!description.trim()) {
      toast.error("Service description is required");
      return;
    }

    // =========================
    // UPDATE
    // =========================

    if (service) {
      updateService.mutate(
        {
          id: service.id,
          title: title.trim(),
          description: description.trim(),
          image,
        },
        {
          onSuccess: () => {
            toast.success(
              "Service Updated Successfully"
            );

            onClose();
          },

          onError: (error: any) => {
            console.error(
              "UPDATE SERVICE ERROR:",
              error
            );

            toast.error(
              error?.response?.data?.message ||
                "Failed To Update Service"
            );
          },
        }
      );

      return;
    }

    // =========================
    // ADD
    // =========================

    const formData = new FormData();

    formData.append(
      "title",
      title.trim()
    );

    formData.append(
      "description",
      description.trim()
    );

    if (image) {
      formData.append("image", image);
    }

    mutate(formData, {
      onSuccess: () => {
        toast.success(
          "Service Added Successfully"
        );

        onClose();
      },

      onError: (error: any) => {
        console.error(
          "ADD SERVICE ERROR:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed To Add Service"
        );
      },
    });
  };

  const saving =
    isPending || updateService.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      {/* MODAL */}

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER */}

        <div className="flex items-center justify-between px-7 py-5 border-b">

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {service
                ? "Edit Service"
                : "Add New Service"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {service
                ? "Update service information"
                : "Add a new service to SmileCare"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="p-2 rounded-full hover:bg-gray-100 transition disabled:opacity-50"
          >
            <X size={22} />
          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="p-7"
        >

          {/* TITLE */}

          <div className="mb-5">

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Service Title
            </label>

            <input
              type="text"
              placeholder="e.g. Teeth Whitening"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              disabled={saving}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              required
            />

          </div>

          {/* DESCRIPTION */}

          <div className="mb-5">

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>

            <textarea
              rows={5}
              placeholder="Describe the service..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              disabled={saving}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              required
            />

          </div>

          {/* IMAGE UPLOAD */}

          <div className="mb-5">

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Service Image
            </label>

            <label
              htmlFor="service-image"
              className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
            >

              <UploadCloud
                size={32}
                className="text-gray-400 mb-2"
              />

              <span className="text-sm text-gray-500">
                Click to upload image
              </span>

              <span className="text-xs text-gray-400 mt-1">
                PNG, JPG, JPEG, WEBP
              </span>

            </label>

            <input
              id="service-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={saving}
              className="hidden"
            />

          </div>

          {/* PREVIEW */}

          {preview && (
            <div className="mb-6">

              <p className="text-sm font-semibold text-gray-700 mb-2">
                Image Preview
              </p>

              <div className="relative w-full h-48 rounded-2xl overflow-hidden border bg-gray-100">

                <img
                  src={preview}
                  alt="Service Preview"
                  className="w-full h-full object-cover"
                />

              </div>

            </div>
          )}

          {/* BUTTONS */}

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving
                ? "Saving..."
                : service
                  ? "Update Service"
                  : "Add Service"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;