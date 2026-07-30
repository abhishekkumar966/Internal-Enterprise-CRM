import { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import {
  createTemplate,
  updateTemplate,
} from "../services/templateService";

import type { MessageTemplate } from "../types/template";

interface TemplateModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  template?: MessageTemplate | null;
}

const TemplateModal = ({
  open,
  onClose,
  onSuccess,
  template,
}: TemplateModalProps) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    template_name: "",
    delivery_channel: "Email",
    subject: "",
    body: "",
  });

  useEffect(() => {
    if (template) {
      setForm({
        template_name: template.template_name,
        delivery_channel: template.delivery_channel,
        subject: template.message_configuration?.subject ?? "",
        body: template.message_configuration?.body ?? "",
      });
    } else {
      resetForm();
    }
  }, [template, open]);

  const resetForm = () => {
    setForm({
      template_name: "",
      delivery_channel: "Email",
      subject: "",
      body: "",
    });
  };

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.template_name.trim()) {
      toast.error("Template name is required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        template_name: form.template_name,
        delivery_channel: form.delivery_channel,
        message_configuration: {
          subject: form.subject,
          body: form.body,
        },
      };

      if (template) {
        await updateTemplate(template.id, payload);
        toast.success("Template updated successfully");
      } else {
        await createTemplate(payload);
        toast.success("Template created successfully");
      }

      resetForm();
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl">

        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold">
            {template ? "Edit Template" : "Add Template"}
          </h2>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4">

          <div>
            <label className="block mb-2 text-sm font-medium">
              Template Name
            </label>

            <input
              name="template_name"
              value={form.template_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Delivery Channel
            </label>

            <select
              name="delivery_channel"
              value={form.delivery_channel}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option>Email</option>
              <option>SMS</option>
              <option>WhatsApp</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Subject
            </label>

            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Message Body
            </label>

            <textarea
              rows={5}
              name="body"
              value={form.body}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

        </div>

        <div className="flex justify-end gap-3 p-5 border-t">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            {loading
              ? "Saving..."
              : template
              ? "Update"
              : "Save"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default TemplateModal;