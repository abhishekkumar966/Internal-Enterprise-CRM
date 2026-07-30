import { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import { createPlan, updatePlan } from "../services/planService";
import type { Plan } from "../types/plan";

interface PlanModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  plan?: Plan | null;
}

const PlanModal = ({
  open,
  onClose,
  onSuccess,
  plan,
}: PlanModalProps) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    plan_name: "",
    price: "",
    billing_cycle: "Monthly",
    features: {
      attendance: false,
      reports: false,
      sms: false,
    } as Record<string, any>,
  });

  useEffect(() => {
    if (plan) {
      setForm({
        plan_name: plan.plan_name,
        price: String(plan.price),
        billing_cycle: plan.billing_cycle,
        features: plan.features ?? {
          attendance: false,
          reports: false,
          sms: false,
        },
      });
    } else {
      resetForm();
    }
  }, [plan, open]);

  const resetForm = () => {
    setForm({
      plan_name: "",
      price: "",
      billing_cycle: "Monthly",
      features: {
        attendance: false,
        reports: false,
        sms: false,
      },
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

  const handleFeatureChange = (feature: string) => {
    setForm((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature],
      },
    }));
  };

  const handleSubmit = async () => {
    if (!form.plan_name.trim()) {
      toast.error("Plan name is required");
      return;
    }

    if (!form.price) {
      toast.error("Price is required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        plan_name: form.plan_name,
        price: Number(form.price),
        billing_cycle: form.billing_cycle,
        features: form.features,
      };

      if (plan) {
        await updatePlan(plan.id, payload);
        toast.success("Plan updated successfully");
      } else {
        await createPlan(payload);
        toast.success("Plan created successfully");
      }

      resetForm();
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(plan ? "Failed to update plan" : "Failed to create plan");
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
            {plan ? "Edit Subscription Plan" : "Add Subscription Plan"}
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
            <label className="block text-sm font-medium mb-2">
              Plan Name
            </label>

            <input
              type="text"
              name="plan_name"
              value={form.plan_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Billing Cycle
            </label>

            <select
              name="billing_cycle"
              value={form.billing_cycle}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              Features
            </label>

            <div className="space-y-2">

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.features.attendance}
                  onChange={() => handleFeatureChange("attendance")}
                />
                Attendance
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.features.reports}
                  onChange={() => handleFeatureChange("reports")}
                />
                Reports
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.features.sms}
                  onChange={() => handleFeatureChange("sms")}
                />
                SMS
              </label>

            </div>
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
              ? plan
                ? "Updating..."
                : "Saving..."
              : plan
                ? "Update"
                : "Save"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default PlanModal;