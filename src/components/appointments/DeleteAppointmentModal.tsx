import { Trash2, X, AlertTriangle } from "lucide-react";

type Props = {
  patientName: string;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
};

const DeleteAppointmentModal = ({
  patientName,
  onClose,
  onConfirm,
  isDeleting = false,
}: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl">

        {/* Header */}

        <div className="flex justify-end p-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}

        <div className="px-6 pb-6 text-center">

          <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-5">
            <AlertTriangle
              size={32}
              className="text-red-600"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Delete Appointment?
          </h2>

          <p className="text-gray-500 mt-3">
            Are you sure you want to delete the appointment
            for:
          </p>

          <p className="font-bold text-gray-800 mt-2">
            {patientName}
          </p>

          <p className="text-sm text-red-500 mt-3">
            This action cannot be undone.
          </p>

          {/* Buttons */}

          <div className="flex justify-center gap-3 mt-7">

            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="px-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition disabled:opacity-50"
            >
              <Trash2 size={18} />

              {isDeleting
                ? "Deleting..."
                : "Delete"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DeleteAppointmentModal;