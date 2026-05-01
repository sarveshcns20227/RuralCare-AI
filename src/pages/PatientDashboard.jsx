import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

import { useState, useEffect } from "react";

import {
  Activity,
  AlertTriangle,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



export default function PatientDashboard() {

  const [glucose, setGlucose] = useState("");
  const [status, setStatus] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [emergencyAlert, setEmergencyAlert] = useState(false);
  const [readings, setReadings] = useState([]);




  // CHART DATA
  const chartData = readings.map((reading, index) => ({

    glucose: Number(reading.glucose),

    date: `Reading ${index + 1}`,

  }));




  // SAVE READING
  const saveReading = async (currentStatus) => {

    try {

      const docRef = await addDoc(

        collection(db, "HealthRecords"),

        {

          glucose: glucose,

          status: currentStatus,

          createdAt: new Date(),

          userId: auth.currentUser.uid,

          userEmail: auth.currentUser.email,

        }

      );

      console.log("Reading Saved!");

      return docRef;

    } catch (error) {

      console.error("Error saving reading:", error);

    }
  };




  // FETCH READINGS
  const fetchReadings = async (user) => {

    try {

      const q = query(

        collection(db, "HealthRecords"),

        where("userId", "==", user.uid)

      );

      const querySnapshot = await getDocs(q);

      const records = [];

      querySnapshot.forEach((doc) => {

        records.push({

          id: doc.id,

          ...doc.data(),

        });

      });

      setReadings([...records]);
      console.log("Fetched Records:", records);

    } catch (error) {

      console.error("Error fetching readings:", error);

    }
  };




  // LOAD DATA
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(

      auth,

      (user) => {

        if (user) {

          fetchReadings(user);

        }

      }

    );

    return () => unsubscribe();

  }, []);




  // CHECK GLUCOSE
  const checkGlucose = async () => {

    let currentStatus = "";



    if (glucose > 180) {

      currentStatus = "Critical";
      setEmergencyAlert(true);

    }

    else if (

      glucose >= 70 &&

      glucose <= 140

    ) {

      currentStatus = "Normal";
      setEmergencyAlert(false);

    }

    else {

      currentStatus = "Warning";
      setEmergencyAlert(false);

    }



    setStatus(currentStatus);




    // AI MESSAGE
    if (currentStatus === "Critical") {

      setAiMessage(

        "High diabetes risk detected. Consult a doctor immediately."

      );

    }

    else if (currentStatus === "Normal") {

      setAiMessage(

        "Glucose level looks healthy. Maintain your routine."

      );

    }

    else {

      setAiMessage(

        "Glucose slightly abnormal. Monitor carefully."

      );

    }




    // SAVE + REFRESH
    const saved = await saveReading(currentStatus);

    if (saved) {

      await fetchReadings(auth.currentUser);

    }

  };
  const downloadReport = () => {

  const doc = new jsPDF();




  doc.setFontSize(22);

  doc.text("RuralCare AI Medical Report", 20, 20);




  doc.setFontSize(12);

  doc.text(

    `Patient: ${auth.currentUser.email}`,

    20,

    35

  );




  const tableData = readings.map((reading) => [

    reading.createdAt
      ?.toDate()
      .toLocaleDateString(),

    reading.glucose,

    reading.status,

  ]);




  autoTable(doc, {

    startY: 50,

    head: [["Date", "Glucose", "Status"]],

    body: tableData,

  });




  doc.save("medical-report.pdf");

};




  return (

    <div className="min-h-screen bg-gray-100 p-8">




      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-blue-700">

          Patient Dashboard

        </h1>

        <p className="text-gray-600 mt-2">

          Monitor your diabetes health easily.

        </p>

      </div>
      <div className="flex gap-4 mt-6 flex-wrap">

  <a href="/chatbot">
    <button className="bg-purple-600 text-white px-4 py-2 rounded-xl">
      Chatbot
    </button>
  </a>

  <a href="/appointment">
    <button className="bg-green-600 text-white px-4 py-2 rounded-xl">
      Book Appointment
    </button>
  </a>

  <a href="/video">
    <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
      Video Call
    </button>
  </a>

  <a href="/doctor">
    <button className="bg-red-600 text-white px-4 py-2 rounded-xl">
      Doctor Dashboard
    </button>
  </a>

</div>
{emergencyAlert && (

  <div className="mb-8 bg-red-600 text-white p-6 rounded-3xl shadow-2xl">

    <h2 className="text-3xl font-bold">

      🚨 Emergency Alert

    </h2>

    <p className="mt-2 text-lg">

      Critical glucose level detected.
      Immediate medical attention recommended.

    </p>

  </div>

)}



      {/* Main Grid */}
      <div className="grid md:grid-cols-2 gap-8">




        {/* Input Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">

          <div className="flex items-center gap-3 mb-6">

            <Activity
              className="text-blue-600"
              size={30}
            />

            <h2 className="text-2xl font-bold">

              Enter Blood Sugar

            </h2>

          </div>




          <input
            type="number"
            placeholder="Enter glucose level"
            value={glucose}
            onChange={(e) =>
              setGlucose(e.target.value)
            }
            className="w-full p-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />




          <button
            onClick={checkGlucose}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-xl transition"
          >

            Check Status

          </button>

        </div>




        {/* Status Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">

          <div className="flex items-center gap-3 mb-6">

            <AlertTriangle
              className="text-red-500"
              size={30}
            />

            <h2 className="text-2xl font-bold">

              Health Status

            </h2>

          </div>




          {status && (

            <div
              className={`p-6 rounded-2xl text-white text-2xl font-bold ${
                status === "Critical"
                  ? "bg-red-500"
                  : status === "Normal"
                  ? "bg-green-500"
                  : "bg-yellow-500"
              }`}
            >

              {status}

            </div>

          )}




          {aiMessage && (

            <div className="mt-6 p-4 bg-blue-100 rounded-2xl">

              <h3 className="font-bold text-blue-700 mb-2">

                AI Health Insight

              </h3>

              <p className="text-gray-700">

                {aiMessage}

              </p>

            </div>

          )}

        </div>

      </div>




      {/* Recent Readings */}
      <div className="mt-10 bg-white rounded-3xl shadow-2xl p-8">

        <h2 className="text-2xl font-bold mb-6">

          Recent Readings

        </h2>




        <table className="w-full">

          <thead>

            <tr className="text-left border-b">

              <th className="pb-4">Date</th>

              <th className="pb-4">Glucose</th>

              <th className="pb-4">Status</th>

            </tr>

          </thead>




          <tbody>

            {readings.map((reading) => (

              <tr
                key={reading.id}
                className="border-b"
              >

                <td className="py-4">

                  {reading.createdAt
                    ?.toDate()
                    .toLocaleDateString()}

                </td>

                <td>

                  {reading.glucose}

                </td>

                <td
                  className={`font-bold ${
                    reading.status === "Critical"
                      ? "text-red-600"
                      : reading.status === "Normal"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >

                  {reading.status}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>




      {/* Analytics */}
      <div className="mt-10 bg-white rounded-3xl shadow-2xl p-8">

        <h2 className="text-2xl font-bold mb-6">

          Glucose Analytics

        </h2>




        <p className="mb-4 text-gray-600">

          Total Readings: {chartData.length}

        </p>




        <div className="h-[350px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart data={chartData}>

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="glucose"
                stroke="#2563eb"
                strokeWidth={4}
                dot={{ r: 5 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>




      {/* Consultation */}
      <div className="mt-10 text-center">

        <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-10 py-4 rounded-3xl shadow-2xl hover:scale-105 transition text-xl font-bold">

          Consult Doctor

        </button>
        <button
  onClick={downloadReport}
  className="ml-4 bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-3xl shadow-2xl transition text-xl font-bold"
>

  Download Report

</button>

      </div>

    </div>
  );
}