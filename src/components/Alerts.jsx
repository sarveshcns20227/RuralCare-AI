export default function Alerts() {
  return (
    <div className="px-8 py-10 bg-white">

      <div className="bg-red-100 border-l-8 border-red-500 p-6 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold text-red-600">
          Critical Alert
        </h2>

        <p className="text-gray-700 mt-2">
          Patient glucose level exceeded safe limit.
        </p>

      </div>

    </div>
  );
}