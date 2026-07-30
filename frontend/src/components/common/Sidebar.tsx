import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Globe,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Subscription Plans",
    icon: Package,
    path: "/plans",
  },
  {
    title: "Message Templates",
    icon: MessageSquare,
    path: "/templates",
  },
  {
    title: "Client Sites",
    icon: Globe,
    path: "/sites",
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-slate-700">
        <h1 className="text-xl font-bold">Enterprise CRM</h1>
      </div>

      {/* Menu */}
      <nav className="mt-6 px-3">
        <p className="text-xs uppercase text-slate-400 mb-3 px-3 tracking-wider">
          Main Menu
        </p>

        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;