import React from "react";
import { Hammer, Construction, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WorkInProgress = ({ title = "Work in Progress", message }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-300 dark:bg-slate-950">
      
      <div className="bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-gray-100">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-orange-100 p-4 rounded-full">
            <Construction className="text-orange-500 w-8 h-8" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-100N mb-2">
          {title}
        </h1>

        {/* Message */}
        <p className="text-gray-500  dark:text-slate-300 mb-6">
          {message || "This feature is currently under development. We're working hard to bring it to you soon 🚀"}
        </p>

        {/* Extra icons for UI */}
        <div className="flex justify-center gap-4 mb-6 text-gray-400">
          <Hammer className="w-5 h-5" />
          <Construction className="w-5 h-5" />
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition-all"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default WorkInProgress;