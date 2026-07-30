import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
}: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className={`${color} p-3 rounded-lg text-white`}>
          <Icon size={26} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;