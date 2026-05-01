import { Users, Activity, Bell } from "lucide-react";

export default function Stats() {
  const data = [
    {
      title: "Patients",
      value: "120",
      icon: <Users />,
      color: "bg-blue-500",
    },
    {
      title: "Consultations",
      value: "45",
      icon: <Activity />,
      color: "bg-green-500",
    },
    {
      title: "Critical Alerts",
      value: "8",
      icon: <Bell />,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 px-8 py-12 bg-gray-50">

      {data.map((item, index) => (
        <div
          key={index}
          className={`${item.color} text-white p-8 rounded-3xl shadow-2xl`}
        >
          <div className="flex justify-between items-center">
            
            <div>
              <h2 className="text-xl">{item.title}</h2>
              <p className="text-4xl font-bold mt-2">{item.value}</p>
            </div>

            <div className="bg-white/20 p-4 rounded-full">
              {item.icon}
            </div>

          </div>
        </div>
      ))}

    </div>
  );
}