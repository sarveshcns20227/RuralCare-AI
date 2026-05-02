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
      console.error("Error fetching patients:", error);
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
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
  fetchPatients();
  fetchAppointments();

  const interval = setInterval(() => {
    fetchPatients();
    fetchAppointments();
  }, 5000); // every 5 seconds

  return () => clearInterval(interval);
}, []);
  const criticalPatients = patients.filter(
    (patient) => patient.status === "Critical"
  );

  const sortedPatients = [...patients].sort((a, b) => {
    if (a.status === "Critical" && b.status !== "Critical") return -1;
    if (a.status !== "Critical" && b.status === "Critical") return 1;
    return 0;
  });

  const handleCallPatient = (patient) => {
    const email =
      patient.userEmail ||
      patient.patientEmail ||
      patient.email ||
      "";

    if (!email) {
      alert("Patient email not found. Check Firestore field name.");
      console.log("Patient data:", patient);
      return;
    }

    window.location.href = `/video?patient=${encodeURIComponent(email)}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex items-center gap-4 mb-8">
  <h1 className="text-4xl font-bold text-blue-700">
    Doctor Dashboard
  </h1>

  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
    ● Live
  </span>
</div>>

      <div className="mb-10 bg-red-100 border-l-8 border-red-600 rounded-3xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-red-700 mb-2">
          Critical Patients: {criticalPatients.length}
        </h2>
        <p className="text-gray-700">
          Patients with dangerous glucose levels need immediate attention.
        </p>
      </div>

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
            {sortedPatients.map((patient) => (
              <tr
                key={patient.id}
                className={`border-b ${
                  patient.status === "Critical" ? "bg-red-100" : ""
                }`}
              >
                <td className="py-4">
                  {patient.userEmail ||
                    patient.patientEmail ||
                    patient.email ||
                    "No email"}
                </td>

                <td>{patient.glucose}</td>

                <td
                  className={`font-bold ${
                    patient.status === "Critical"
                      ? "text-red-600"
                      : patient.status === "Normal"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {patient.status || "Unknown"}
                </td>

                <td>
                  {patient.status === "Critical" ? (
                    <button
                      onClick={() => handleCallPatient(patient)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-xl"
                    >
                      Call Patient
                    </button>
                  ) : (
                    <span className="text-gray-400">No action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">Appointments</h2>

        <table className="w-full">
          <thead>
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
                <td className="py-4">
                  {appointment.patientEmail || "No patient email"}
                </td>
                <td>{appointment.doctor || "No doctor"}</td>
                <td>{appointment.date || "No date"}</td>
                <td>{appointment.time || "No time"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}