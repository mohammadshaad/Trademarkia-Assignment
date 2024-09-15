import React from 'react';

interface ErrorPopupProps {
  message: string;
  onClose: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className='flex items-center justify-end'>

          <button
            onClick={onClose}
            className=" text-white px-2 py-1 rounded-full hover:bg-gray-200"
          >
            ✖
          </button>
        </div>

        <h2 className="text-lg font-bold text-red-600">Error</h2>
        <p className="mt-2 text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default ErrorPopup;
