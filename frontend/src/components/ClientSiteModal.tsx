import { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import {
    createClientSite,
    updateClientSite,
} from "../services/clientSiteService";

import type { ClientSite } from "../types/clientSite";

interface ClientSiteModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    site?: ClientSite | null;
}

const ClientSiteModal = ({
    open,
    onClose,
    onSuccess,
    site,
}: ClientSiteModalProps) => {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        domain_name: "",
        api_key: "",
        status: "Active",
        daily_request_quota: "",
    });

    useEffect(() => {
        if (site) {
            setForm({
                domain_name: site.domain_name,
                api_key: site.api_key,
                status: site.status,
                daily_request_quota: String(site.daily_request_quota),
            });
        } else {
            resetForm();
        }
    }, [site, open]);

    const resetForm = () => {
        setForm({
            domain_name: "",
            api_key: "",
            status: "Active",
            daily_request_quota: "",
        });
    };

    if (!open) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        if (!form.domain_name.trim()) {
            toast.error("Domain name is required");
            return;
        }

        if (!form.api_key.trim()) {
            toast.error("API Key is required");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                domain_name: form.domain_name,
                api_key: form.api_key,
                status: form.status,
                daily_request_quota: Number(form.daily_request_quota),
            };

            if (site) {
                await updateClientSite(site.id, payload);
                toast.success("Client site updated successfully");
            } else {
                await createClientSite(payload);
                toast.success("Client site created successfully");
            }

            resetForm();
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(site ? "Failed to update client site" : "Failed to create client site");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">

                <div className="flex justify-between items-center p-5 border-b">
                    <h2 className="text-xl font-semibold">
                        {site ? "Edit Client Site" : "Add Client Site"}
                    </h2>

                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-black"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-5 space-y-4">

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Domain Name
                        </label>

                        <input
                            type="text"
                            name="domain_name"
                            value={form.domain_name}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            placeholder="example.com"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            API Key
                        </label>

                        <input
                            type="text"
                            name="api_key"
                            value={form.api_key}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Status
                        </label>

                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Daily Request Quota
                        </label>

                        <input
                            type="number"
                            name="daily_request_quota"
                            value={form.daily_request_quota}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                        />
                    </div>

                </div>

                <div className="flex justify-end gap-3 p-5 border-t">

                    <button
                        onClick={handleClose}
                        className="px-5 py-2 border rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        {loading
                            ? "Saving..."
                            : site
                                ? "Update"
                                : "Save"}
                    </button>

                </div>

            </div>
        </div>
    );
};

export default ClientSiteModal;