import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import PlanModal from "../components/PlanModal";
import {
  getPlans,
  deletePlan,
} from "../services/planService";

import type { Plan } from "../types/plan";

const Plans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const loadPlans = async () => {
    try {
      setLoading(true);

      const data = await getPlans();

      setPlans(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load subscription plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleAdd = () => {
    setSelectedPlan(null);
    setOpenModal(true);
  };

  const handleEdit = (plan: Plan) => {
    setSelectedPlan(plan);
    setOpenModal(true);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this plan?"
    );

    if (!confirmed) return;

    try {
      await deletePlan(id);

      toast.success("Plan deleted successfully");

      loadPlans();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete plan");
    }
  };

  return (
    <>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Subscription Plans
            </h1>

            <p className="text-gray-500 mt-1">
              Manage EduPulse subscription plans.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            <Plus size={18} />
            Add Plan
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-5 py-3 text-left">Plan Name</th>
                <th className="px-5 py-3 text-left">Price</th>
                <th className="px-5 py-3 text-left">Billing Cycle</th>
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
                    Loading plans...
                  </td>
                </tr>
              ) : plans.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-8 text-gray-500"
                  >
                    No subscription plans found.
                  </td>
                </tr>
              ) : (
                plans.map((plan) => (
                  <tr
                    key={plan.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 font-medium">
                      {plan.plan_name}
                    </td>

                    <td className="px-5 py-4">
                      ${plan.price}
                    </td>

                    <td className="px-5 py-4">
                      {plan.billing_cycle}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-4">

                        <button
                          onClick={() => handleEdit(plan)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(plan.id)}
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

      <PlanModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedPlan(null);
        }}
        onSuccess={loadPlans}
        plan={selectedPlan}
      />
    </>
  );
};

export default Plans;