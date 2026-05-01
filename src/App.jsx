import VideoConsultation from "./pages/VideoConsultation";
import HealthChatbot from "./pages/HealthChatbot";
import Appointment from "./pages/Appointment";
import DoctorDashboard from "./pages/DoctorDashboard";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";

function App() {

  return (

    <Routes>

      <Route
  path="/video"
  element={<VideoConsultation />}
/>

      <Route
  path="/chatbot"
  element={<HealthChatbot />}
/>

      <Route
  path="/appointment"
  element={<Appointment />}
/>

  <Route path="/" element={<Login />} />

  <Route
    path="/dashboard"
    element={<PatientDashboard />}
  />

  <Route
    path="/doctor"
    element={<DoctorDashboard />}
  />

</Routes>

    

  );
}

export default App;