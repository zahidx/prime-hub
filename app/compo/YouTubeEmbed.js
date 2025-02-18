// components/YouTubeEmbed.js
import React from 'react';

const YouTubeEmbed = ({ videoId, title }) => {
  return (
    <div className="max-w-sm w-full bg-gray-800 rounded-lg shadow-xl transform transition-transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
      <div className="relative overflow-hidden rounded-t-lg">
        <iframe
          className="w-full h-56 object-cover"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-4 text-center">
        <h3 className="text-xl text-white font-semibold">{title}</h3>
      </div>
    </div>
  );
};

export default YouTubeEmbed;
