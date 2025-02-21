import { useState, useEffect } from "react";

const PlaylistPage = () => {
  const [loading, setLoading] = useState(true);

  // Playlist ID to display
  const playlistId = "PLPSCssPYXhWTTcpNZwYoEQWt8Wc8KO0NV"; // Replace with your playlist ID

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-6 overflow-x-hidden">
      {/* Animated background */}
      <div className="absolute top-0 left-0 w-full h-full z-[-1] pointer-events-none animate-backgroundGradient"></div>

      {/* Main Content */}
      <div className="animate-fadeIn transition-all duration-1000">
        <div className="max-w-7xl mx-auto">
          {/* Playlist Header with Glassmorphism */}
          <div className="text-center mb-12 backdrop-blur-lg bg-opacity-30 rounded-lg p-8 shadow-2xl hover:bg-opacity-80 transition-all duration-300">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 transform transition-all duration-500 hover:scale-110 hover:text-white">
              Playlist: Top Hits
            </h1>
            <p className="mt-4 text-xl text-gray-300 opacity-80 hover:opacity-100 transition-opacity duration-300">
              Enjoy the best hits all in one place
            </p>
          </div>

          {/* Loading or Playlist iframe with hover effects */}
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-pulse space-x-4">
                <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"></div>
                <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"></div>
                <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"></div>
              </div>
              <p className="mt-4 text-gray-400">Loading Playlist...</p>
            </div>
          ) : (
            <div className="flex justify-center mb-12">
              <iframe
                width="100%"
                height="600"
                src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
                title="YouTube Playlist"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg shadow-lg transition-transform duration-500 transform hover:scale-105 hover:shadow-2xl"
              />
            </div>
          )}

          {/* Playlist Footer with Glassmorphism */}
          <div className="text-center mt-8 backdrop-blur-lg bg-opacity-30 rounded-lg p-4 shadow-2xl">
            <p className="text-gray-500 text-sm">
              Powered by YouTube &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
