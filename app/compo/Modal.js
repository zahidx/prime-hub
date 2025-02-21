import React from "react";

const Modal = ({ videoId, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm transition-opacity duration-500 ease-in-out"
    onClick={onClose}
    role="dialog"
    aria-labelledby="modal-title"
    aria-hidden={!videoId}
  >
    <div
      className="relative w-full max-w-3xl mx-4 transform transition-all duration-700 ease-in-out hover:rotate-3d perspective-1000"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white text-4xl font-bold z-10 hover:text-red-400 transition-colors duration-300"
        aria-label="Close video modal"
      >
        &times;
      </button>
      <div className="relative pb-[56.25%] rounded-lg overflow-hidden shadow-xl transition-all duration-500 transform hover:rotate-[10deg] hover:translate-y-4">
        <iframe
          className="absolute top-0 left-0 w-full h-full transition-transform duration-500 transform"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  </div>
);

export default Modal;
