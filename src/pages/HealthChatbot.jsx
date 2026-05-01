import { useState } from "react";



export default function HealthChatbot() {

  const [question, setQuestion] = useState("");

  const [response, setResponse] = useState("");




  const askAI = () => {

    const q = question.toLowerCase();




    if (q.includes("sugar")) {

      setResponse(

        "Avoid sugary drinks and processed foods. Eat more vegetables and protein."

      );

    }

    else if (q.includes("diabetes")) {

      setResponse(

        "Regular exercise, balanced diet, and glucose monitoring help manage diabetes."

      );

    }

    else if (q.includes("exercise")) {

      setResponse(

        "Walking 30 minutes daily can improve glucose control."

      );

    }

    else {

      setResponse(

        "Please consult a healthcare professional for detailed medical advice."

      );

    }

  };




  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-blue-700 mb-8">

          AI Healthcare Assistant

        </h1>




        <textarea
          rows="4"
          placeholder="Ask your health question..."
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          className="w-full p-4 rounded-2xl border"
        />




        <button
          onClick={askAI}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold"
        >

          Ask AI

        </button>




        {response && (

          <div className="mt-8 bg-blue-100 p-6 rounded-2xl">

            <h2 className="font-bold text-blue-700 mb-2">

              AI Response

            </h2>

            <p className="text-gray-700">

              {response}

            </p>

          </div>

        )}

      </div>

    </div>
  );
}