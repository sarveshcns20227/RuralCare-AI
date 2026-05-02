import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function VideoConsultation() {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const patientEmail = searchParams.get("patient");

  useEffect(() => {
    startVideo();
  }, []);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Camera/Mic error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-white mb-4">
        Video Consultation
      </h1>

      {patientEmail && (
        <p className="text-gray-300 mb-8 text-lg">
          Calling: {patientEmail}
        </p>
      )}

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
  onClick={() => navigate("/doctor")}
  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-bold"
>
  End Call
</button>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold">
          Mute
        </button>
      </div>
    </div>
  );
}