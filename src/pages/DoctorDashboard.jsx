import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const fetchPatients = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "HealthRecords"));
      const records = [];

      querySnapshot.forEach((doc) => {
        records.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setPatients(records);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Appointments"));
      const records = [];

      querySnapshot.forEach((doc) => {
        records.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setAppointments(records);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchAppointments();
  }, []);

  const criticalPatients = patients.filter(
    (patient) => patient.status === "Critical"
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        Doctor Dashboard
      </h1>

      {/* Critical Alerts */}
      <div className="mb-10 bg-red-100 border-l-8 border-red-600 rounded-3xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-red-700 mb-2">
          Critical Patients: {criticalPatients.length}
        </h2>
        <p className="text-gray-700">
          Patients with dangerous glucose levels need immediate attention.
        </p>
      </div>

      {/* Patient Records */}
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">Patient Records</h2>

        <table className="w-full">
          <thead>
  <tr className="border-b text-left">
    <th className="pb-4">Patient Email</th>
    <th className="pb-4">Glucose</th>
    <th className="pb-4">Status</th>
    <th className="pb-4">Action</th>
  </tr>
</thead>

          <tbody>

  {patients.map((patient) => (

    <tr key={patient.id} className="border-b">

      <td className="py-4">
        {patient.userEmail}
      </td>

      <td>
        {patient.glucose}
      </td>

      <td
        className={`font-bold ${
          patient.status === "Critical"
            ? "text-red-600"
            : patient.status === "Normal"
            ? "text-green-600"
            : "text-yellow-600"
        }`}
      >
        {patient.status}
      </td>

      {/* 🔥 FIXED BUTTON (INSIDE MAP) */}
      <td>
        {patient.status === "Critical" && (
          <button
            onClick={() => (window.location.href = "/video")}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-xl"
          >
            Call Patient
          </button>
        )}
      </td>

    </tr>

  ))}

</tbody>
        </table>
      </div>

      {/* Appointments */}
      <div className="mt-10 bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">Appointments</h2>
        <table className="w-full">
          <thead>
            <th className="pb-4">Action</th>
            <tr key={patient.id} className="border-b">

  <td className="py-4">
    {patient.userEmail}
  </td>

  <td>
    {patient.glucose}
  </td>

  <td className={`font-bold ${
    patient.status === "Critical"
      ? "text-red-600"
      : patient.status === "Normal"
      ? "text-green-600"
      : "text-yellow-600"
  }`}>
    {patient.status}
  </td>

  {/* 🔥 ADD THIS */}
  <td>
    {patient.status === "Critical" && (
      <button
        onClick={() => window.location.href = "/video"}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-xl"
      >
        Call Patient
      </button>
    )}
  </td>

</tr>
            <tr className="border-b text-left">
              <th className="pb-4">Patient</th>
              <th className="pb-4">Doctor</th>
              <th className="pb-4">Date</th>
              <th className="pb-4">Time</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b">
                <td className="py-4">{appointment.patientEmail}</td>
                <td>{appointment.doctor}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}