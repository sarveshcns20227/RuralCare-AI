import { useState } from "react";

import {
  collection,
  addDoc,
} from "firebase/firestore";

import { db, auth } from "../firebase";



export default function Appointment() {

  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [success, setSuccess] = useState("");




  const bookAppointment = async () => {

    if (!doctor || !date || !time) {

      alert("Please fill all fields");

      return;

    }




    try {

      await addDoc(

        collection(db, "Appointments"),

        {

          doctor,

          date,

          time,

          patientEmail: auth.currentUser.email,

          createdAt: new Date(),

        }

      );

      setSuccess("Appointment Booked!");

      setDoctor("");
      setDate("");
      setTime("");

    } catch (error) {

      console.error(error);

    }
  };




  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-blue-700 mb-8">

          Book Appointment

        </h1>




        <div className="space-y-6">

          <input
            type="text"
            placeholder="Doctor Name"
            value={doctor}
            onChange={(e) =>
              setDoctor(e.target.value)
            }
            className="w-full p-4 rounded-2xl border"
          />




          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="w-full p-4 rounded-2xl border"
          />




          <input
            type="time"
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
            }
            className="w-full p-4 rounded-2xl border"
          />




          <button
            onClick={bookAppointment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold"
          >

            Confirm Appointment

          </button>




          {success && (

            <div className="bg-green-100 text-green-700 p-4 rounded-2xl">

              {success}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}