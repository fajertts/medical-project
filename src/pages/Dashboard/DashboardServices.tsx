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

const DashboardServices = () => {
  const { data, isLoading, isError } = useServices();

  const deleteService = useDeleteService();

  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [search, setSearch] = useState("");

  const filteredServices = useMemo(() => {
    if (!data) return [];

    return data.filter((service: any) => {
      return (
        service.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        service.description
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [data, search]);

  if (isLoading) {
    return (
      <h1 className="text-center text-2xl mt-20">
        Loading Services...
      </h1>
    );
  }

  if (isError) {
    return (
      <h1 className="text-center text-red-600 mt-20">
        Error Loading Services
      </h1>
    );
  }

  return (
    <div className="p-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-8">

        <h1 className="text-4xl font-bold">
          Services
        </h1>

        <div className="relative w-full lg:w-96">

          <Search
            size={20}
            className="absolute left-4 top-3.5 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Service..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => {
            setSelectedService(null);
            setOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
        >
          <Plus size={20} />

          Add Service
        </button>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

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

            {filteredServices.map(
              (service: any) => (

                <tr
                  key={service.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">

                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-16 h-16 rounded-xl object-cover"
                    />

                  </td>

                  <td className="font-semibold">
                    {service.title}
                  </td>

                  <td className="max-w-md">
                    {service.description}
                  </td>

                  <td className="text-center">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => {
                          setSelectedService(service);
                          setOpen(true);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => {
                          const confirmDelete =
                            window.confirm(
                              `Delete "${service.title}" ?`
                            );

                          if (!confirmDelete) return;

                          deleteService.mutate(
                            service.id,
                            {
                              onSuccess: () => {
                                toast.success(
                                  "Service Deleted Successfully"
                                );
                              },
                            }
                          );
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

      {/* Modal */}

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