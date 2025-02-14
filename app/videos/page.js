"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchVideos = useCallback(async (pageNumber) => {
    if (!hasMore || loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_VIMEO_API_URL}/videos`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_VIMEO_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          params: {
            filter: "featured",
            per_page: 9,
            page: pageNumber,
          },
        }
      );

      const newVideos = response.data.data || [];
      if (newVideos.length > 0) {
        setVideos((prevVideos) => [...prevVideos, ...newVideos]);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Vimeo API Error:", err.response?.data || err.message);
      setError("Failed to fetch public videos. Check API credentials.");
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading]);

  useEffect(() => {
    fetchVideos(page);
  }, [page, fetchVideos]);

  const lastVideoRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="min-h-screen pt-40 bg-gradient-to-r from-[#0E1628] to-[#380643] text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Premium Video Gallery
      </h1>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {videos.map((video, index) => {
          if (videos.length === index + 1) {
            return (
              <div
                ref={lastVideoRef}
                key={video.uri}
                className="bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
              >
                <h2 className="text-lg font-semibold text-center mb-2">{video.name}</h2>
                {video?.player_embed_url ? (
                  <div className="relative overflow-hidden rounded-md">
                    <iframe
                      className="w-full h-56 rounded-md transition-all hover:scale-105"
                      src={video.player_embed_url}
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      title={video.name}
                    ></iframe>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 text-center">No video available</p>
                )}
              </div>
            );
          } else {
            return (
              <div
                key={video.uri}
                className="bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
              >
                <h2 className="text-lg font-semibold text-center mb-2">{video.name}</h2>
                {video?.player_embed_url ? (
                  <div className="relative overflow-hidden rounded-md">
                    <iframe
                      className="w-full h-56 rounded-md transition-all hover:scale-105"
                      src={video.player_embed_url}
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      title={video.name}
                    ></iframe>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 text-center">No video available</p>
                )}
              </div>
            );
          }
        })}
      </div>

      {loading && <p className="mt-4 text-gray-400 animate-pulse">Loading more videos...</p>}
    </div>
  );
};

export default VideosPage;
