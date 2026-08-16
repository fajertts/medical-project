import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Pencil,
  Trash2,
  Plus,
  Search,
} from "lucide-react";

import { useServices } from "../../hooks/useServices";
import { useDeleteService } from "../../hooks/useDeleteServices";

import AddServiceModal from "../../components/services/AddServiceModal";
import StatsCards from "../../components/dashboard/StatCard";

type Service = {
  id: number;
  title: string;
  description: string;
  image?: string;
};

const DashboardServices = () => {
  const {
    data,
    isLoading,
    isError,
  } = useServices();

  const deleteService = useDeleteService();

  const [open, setOpen] = useState(false);

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const [search, setSearch] = useState("");

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredServices = useMemo(() => {
    if (!data) return [];

    const services = data as Service[];

    const searchValue =
      search.toLowerCase().trim();

    if (!searchValue) {
      return services;
    }

    return services.filter((service) => {
      return (
        service.title
          ?.toLowerCase()
          .includes(searchValue) ||
        service.description
          ?.toLowerCase()
          .includes(searchValue)
      );
    });
  }, [data, search]);

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <h1 className="text-2xl font-semibold text-gray-600">
          Loading Services...
        </h1>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <h1 className="text-xl font-semibold text-red-600">
          Error Loading Services
        </h1>
      </div>
    );
  }

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = (service: Service) => {
    const confirmDelete = window.confirm(
      `Delete "${service.title}"?`
    );

    if (!confirmDelete) return;

    deleteService.mutate(service.id, {
      onSuccess: () => {
        toast.success(
          "Service Deleted Successfully"
        );
      },

      onError: (error: any) => {
        console.error(
          "DELETE SERVICE ERROR:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed To Delete Service"
        );
      },
    });
  };

  // ==========================================
  // ADD
  // ==========================================

  const handleAdd = () => {
    setSelectedService(null);
    setOpen(true);
  };

  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setOpen(true);
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="p-4 md:p-6 lg:p-8">

      {/* ======================================
          STATS
      ====================================== */}

     

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        {/* TITLE */}

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Services
          </h1>

          <p className="text-gray-500 mt-1">
            Manage SmileCare services
          </p>
        </div>

        {/* SEARCH */}

        <div className="relative w-full lg:w-96">

          <Search
            size={20}
            className="absolute left-4 top-3.5 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search service..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

        </div>

        {/* ADD BUTTON */}

        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition shadow-sm"
        >
          <Plus size={20} />

          Add Service
        </button>

      </div>

      {/* ======================================
          TABLE
      ====================================== */}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* TABLE HEADER */}

        <div className="px-6 py-4 border-b flex justify-between items-center">

          <div>
            <h2 className="text-lg font-bold text-gray-800">
              All Services
            </h2>

            <p className="text-sm text-gray-500">
              {filteredServices.length} services found
            </p>
          </div>

        </div>

        {/* DESKTOP TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-5 text-left">
                  Image
                </th>

                <th className="text-left">
                  Title
                </th>

                <th className="text-left">
                  Description
                </th>

                <th className="text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredServices.length > 0 ? (
                filteredServices.map(
                  (service) => (
                    <tr
                      key={service.id}
                      className="border-t hover:bg-gray-50 transition"
                    >

                      {/* IMAGE */}

                      <td className="p-4">

                        {service.image ? (
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-16 h-16 rounded-xl object-cover border"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                            No Image
                          </div>
                        )}

                      </td>

                      {/* TITLE */}

                      <td className="font-semibold text-gray-800">
                        {service.title}
                      </td>

                      {/* DESCRIPTION */}

                      <td className="max-w-md">

                        <p className="text-gray-600 line-clamp-2">
                          {service.description}
                        </p>

                      </td>

                      {/* ACTIONS */}

                      <td className="text-center">

                        <div className="flex justify-center gap-3">

                          {/* EDIT */}

                          <button
                            onClick={() =>
                              handleEdit(service)
                            }
                            title="Edit Service"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition"
                          >
                            <Pencil size={18} />
                          </button>

                          {/* DELETE */}

                          <button
                            onClick={() =>
                              handleDelete(service)
                            }
                            title="Delete Service"
                            disabled={
                              deleteService.isPending
                            }
                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition disabled:opacity-50"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )
              ) : (
                <tr>

                  <td
                    colSpan={4}
                    className="text-center py-16"
                  >

                    <div className="flex flex-col items-center">

                      <Search
                        size={40}
                        className="text-gray-300 mb-3"
                      />

                      <h3 className="text-lg font-semibold text-gray-500">
                        No services found
                      </h3>

                      <p className="text-sm text-gray-400 mt-1">
                        Try another search
                      </p>

                    </div>

                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ======================================
          MODAL
      ====================================== */}

      {open && (
        <AddServiceModal
          service={selectedService}
          onClose={() => {
            setOpen(false);
            setSelectedService(null);
          }}
        />
      )}

    </div>
  );
};

export default DashboardServices;