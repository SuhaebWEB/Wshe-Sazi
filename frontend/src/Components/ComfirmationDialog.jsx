import React from "react";

const ConfirmationDialog = ({ isOpen, title, message, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="bg-white p-3 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm sm:text-base text-gray-600 mt-2">{message}</p>
        <div className="mt-4 flex flex-col 1.5xl:flex-row sm:justify-around gap-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
           
          >
            بەڵێ
          </button>
          <button
            className="w-full sm:w-auto px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            onClick={onCancel}
          >
            نەخێر
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
