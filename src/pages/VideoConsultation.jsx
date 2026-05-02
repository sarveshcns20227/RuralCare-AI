import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function VideoConsultation() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [callStatus, setCallStatus] = useState("Connecting");
  const [callEnded, setCallEnded] = useState(false);

  const [searchParams] = useSearchParams();
  const patientEmail = searchParams.get("patient");
  const patientName = searchParams.get("name");
  const patientGlucose = searchParams.get("glucose");
const patientStatus = searchParams.get("status");

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    startVideo();

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
  videoRef.current.srcObject = stream;
  setCallStatus("Live");
}
    } catch (error) {
      console.error("Camera/Mic error:", error);
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  };
  const toggleMute = () => {
  if (videoRef.current && videoRef.current.srcObject) {
    const audioTracks = videoRef.current.srcObject.getAudioTracks();

    audioTracks.forEach((track) => {
      track.enabled = isMuted;
    });

    setIsMuted(!isMuted);
  }
};
const endCall = () => {
  const confirmEnd = window.confirm("Are you sure you want to end the call?");

  if (!confirmEnd) return;

  if (videoRef.current && videoRef.current.srcObject) {
    const tracks = videoRef.current.srcObject.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });
  }

  setCallEnded(true);
};
const doctorName = "Dr. Sarvesh";
const specialization = "Diabetologist";

if (callEnded) {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Call Ended</h1>

      <p className="text-gray-300 mb-8">
        The video consultation has ended successfully.
      </p>

      <button
        onClick={() => navigate("/doctor")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold"
      >
        Back to Doctor Dashboard
      </button>
    </div>
  );
}
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-white mb-2">
  Video Consultation
</h1>

<p className="text-blue-400 mb-4 text-lg">
  {doctorName} • {specialization}
</p>
      <p className="bg-green-600 text-white px-4 py-2 rounded-full mb-4 font-bold">
  ● {callStatus}
</p>

      {patientEmail && (
        <p className="text-gray-300 mb-4 text-lg">
        Calling: {patientName || patientEmail}
        {patientGlucose && (
  <div className="bg-white/10 border border-white/20 rounded-2xl p-4 mb-6 text-white">
    <h2 className="text-lg font-bold mb-2">Patient Health Summary</h2>

    <p>Glucose: {patientGlucose} mg/dL</p>

    <p
      className={`font-bold ${
        patientStatus === "Critical"
          ? "text-red-400"
          : patientStatus === "Normal"
          ? "text-green-400"
          : "text-yellow-400"
      }`}
    >
      Status: {patientStatus}
    </p>
  </div>
)}
        </p>
      )}

      <p className="text-green-400 mb-8 text-lg font-bold">
        Call Time: {formatTime(seconds)}
      </p>

      <div className="bg-black rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-[500px] object-cover"
        />
      </div>

      <div className="mt-8 flex gap-6">
        <button
          onClick={endCall}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-bold"
        >
          End Call
        </button>

        <button
  onClick={toggleMute}
  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold"
>
  {isMuted ? "Unmute" : "Mute"}
</button>
      </div>
    </div>
  );
}