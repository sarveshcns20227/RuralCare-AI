import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase";



export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



  const handleSignup = async () => {

    try {

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    navigate("/dashboard");

    } catch (error) {

      alert(error.message);

    }
  };



  const handleLogin = async () => {

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/dashboard");

    } catch (error) {

      alert(error.message);

    }
  };



  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-500">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[400px]">

        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          RuralCare AI
        </h1>



        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 border rounded-2xl mb-4"
        />



        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 border rounded-2xl mb-6"
        />



        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-2xl mb-4 hover:bg-blue-700"
        >
          Login
        </button>



        <button
          onClick={handleSignup}
          className="w-full bg-green-600 text-white py-3 rounded-2xl hover:bg-green-700"
        >
          Create Account
        </button>

      </div>

    </div>
  );
}