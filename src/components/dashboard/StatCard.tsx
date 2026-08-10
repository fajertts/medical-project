import { type ReactNode } from "react";

type Props = {
  title: string;
  value: number;
  icon: ReactNode;
  color: string;
};

const StatCard = ({ title, value, icon, color }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-gray-500">{title}</h3>

          <h1 className="text-4xl font-bold mt-2">
            {value}
          </h1>
        </div>

        <div className={`${color} text-white p-4 rounded-xl text-3xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;