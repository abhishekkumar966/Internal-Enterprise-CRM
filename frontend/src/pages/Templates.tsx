import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import {
  getTemplates,
  deleteTemplate,
} from "../services/templateService";

import type { MessageTemplate } from "../types/template";
import TemplateModal from "../components/TemplateModal";

const Templates = () => {
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<MessageTemplate | null>(null);

  const loadTemplates = async () => {
    try {
      setLoading(true);

      const data = await getTemplates();

      setTemplates(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load message templates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const handleAdd = () => {
    setSelectedTemplate(null);
    setOpenModal(true);
  };

  const handleEdit = (template: MessageTemplate) => {
    setSelectedTemplate(template);
    setOpenModal(true);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this template?"
    );

    if (!confirmed) return;

    try {
      await deleteTemplate(id);

      toast.success("Template deleted successfully");

      loadTemplates();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete template");
    }
  };

  return (
    <>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Message Templates
            </h1>

            <p className="text-gray-500 mt-1">
              Manage reusable message templates.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            <Plus size={18} />
            Add Template
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-5 py-3 text-left">Template Name</th>
                <th className="px-5 py-3 text-left">Channel</th>
                <th className="px-5 py-3 text-left">Subject</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-8 text-gray-500"
                  >
                    Loading templates...
                  </td>
                </tr>
              ) : templates.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-8 text-gray-500"
                  >
                    No templates found.
                  </td>
                </tr>
              ) : (
                templates.map((template) => (
                  <tr
                    key={template.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 font-medium">
                      {template.template_name}
                    </td>

                    <td className="px-5 py-4">
                      {template.delivery_channel}
                    </td>

                    <td className="px-5 py-4">
                      {template.message_configuration?.subject ?? "-"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => handleEdit(template)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(template.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
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

      <TemplateModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedTemplate(null);
        }}
        onSuccess={loadTemplates}
        template={selectedTemplate}
      />
    </>
  );
};

export default Templates;