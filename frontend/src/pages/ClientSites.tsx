import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";



import {
  getClientSites,
  deleteClientSite,
} from "../services/clientSiteService";

import type { ClientSite } from "../types/clientSite";
import ClientSiteModal from "../components/ClientSiteModal";

const ClientSites = () => {
  const [sites, setSites] = useState<ClientSite[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [selectedSite, setSelectedSite] =
    useState<ClientSite | null>(null);

  const loadSites = async () => {
    try {
      setLoading(true);

      const data = await getClientSites();

      setSites(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load client sites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSites();
  }, []);

  const handleAdd = () => {
    setSelectedSite(null);
    setOpenModal(true);
  };

  const handleEdit = (site: ClientSite) => {
    setSelectedSite(site);
    setOpenModal(true);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this client site?"
    );

    if (!confirmed) return;

    try {
      await deleteClientSite(id);

      toast.success("Client site deleted successfully");

      loadSites();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete client site");
    }
  };

  return (
    <>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Client Sites
            </h1>

            <p className="text-gray-500 mt-1">
              Manage client websites and API access.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            <Plus size={18} />
            Add Client Site
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-5 py-3 text-left">Domain</th>
                <th className="px-5 py-3 text-left">API Key</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Daily Quota</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-8 text-gray-500"
                  >
                    Loading client sites...
                  </td>
                </tr>
              ) : sites.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-8 text-gray-500"
                  >
                    No client sites found.
                  </td>
                </tr>
              ) : (
                sites.map((site) => (
                  <tr
                    key={site.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 font-medium">
                      {site.domain_name}
                    </td>

                    <td className="px-5 py-4">
                      {site.api_key}
                    </td>

                    <td className="px-5 py-4">
                      {site.status}
                    </td>

                    <td className="px-5 py-4">
                      {site.daily_request_quota}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => handleEdit(site)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(site.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ClientSiteModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedSite(null);
        }}
        onSuccess={loadSites}
        site={selectedSite}
      />
    </>
  );
};

export default ClientSites;