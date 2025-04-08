import React from "react";

const AlertDialog = ({ isOpen, title, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-3 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm sm:text-base text-gray-600 mt-2">{message}</p>
        <div className="mt-4 flex justify-center">
          <button
            className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={onClose}
          >
            باش
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
