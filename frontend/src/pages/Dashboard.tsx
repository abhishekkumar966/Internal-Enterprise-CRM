import { useEffect, useState } from "react";
import { Package, MessageSquare, Globe } from "lucide-react";

import StatCard from "../components/StatCard";

import { getPlans } from "../services/planService";
import { getTemplates } from "../services/templateService";
import { getClientSites } from "../services/clientSiteService";

const Dashboard = () => {
  const [planCount, setPlanCount] = useState(0);
  const [templateCount, setTemplateCount] = useState(0);
  const [siteCount, setSiteCount] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [plans, templates, sites] = await Promise.all([
        getPlans(),
        getTemplates(),
        getClientSites(),
      ]);

      setPlanCount(plans.length);
      setTemplateCount(templates.length);
      setSiteCount(sites.length);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to the Internal Enterprise CRM Platform.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <StatCard
          title="Subscription Plans"
          value={planCount}
          icon={Package}
          color="bg-blue-600"
        />

        <StatCard
          title="Message Templates"
          value={templateCount}
          icon={MessageSquare}
          color="bg-green-600"
        />

        <StatCard
          title="Client Sites"
          value={siteCount}
          icon={Globe}
          color="bg-purple-600"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">
          Recent Activity
        </h2>

        <div className="space-y-3 text-gray-600">
          <div className="border-b pb-2">
            📦 Subscription plans are managed from the Plans module.
          </div>

          <div className="border-b pb-2">
            📨 Message templates are managed from the Templates module.
          </div>

          <div>
            🌐 Client sites are managed from the Client Sites module.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;