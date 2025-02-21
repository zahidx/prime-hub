import { useEffect, useState } from "react";

const SongCard = ({ song, index, onClick, isFavorite, toggleFavorite }) => (
  <div className="relative group cursor-pointer bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-transform transform hover:shadow-2xl hover:scale-105">
    <div onClick={() => onClick(song.id)} className="relative pb-[56.25%]">
      <img
        src={`https://img.youtube.com/vi/${song.id}/hqdefault.jpg`}
        alt={song.title}
        className="absolute top-0 left-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300">
        <svg
          className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          fill="currentColor"
          viewBox="0 0 84 84"
        >
          <circle cx="42" cy="42" r="42" fill="blue" className="opacity-75" />
          <path d="M33 30l22 12-22 12V30z" fill="red" />
        </svg>
      </div>
    </div>
    <div className="p-4 flex justify-between items-center">
      <p className="text-sm font-medium text-white">{song.title}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(song.id);
        }}
        className="focus:outline-none transition-colors duration-300"
      >
        {isFavorite ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-red-500" viewBox="0 0 20 20">
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.657l-6.828-6.829a4 4 0 010-5.656z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
        )}
      </button>
    </div>
  </div>
);

const Modal = ({ videoId, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm transition-opacity duration-300"
    onClick={onClose}
  >
    <div
      className="relative w-full max-w-3xl mx-4 transform transition-all duration-300 scale-100"
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-2 right-2 text-white text-3xl font-bold z-10 hover:text-red-400 transition-colors duration-300">
        &times;
      </button>
      <div className="relative pb-[56.25%] rounded-lg overflow-hidden shadow-xl">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
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

const SongsPage = () => {
  const [loading, setLoading] = useState(true);
  const [modalVideoId, setModalVideoId] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const songs = [
    { id: "dQw4w9WgXcQ", title: "Never Gonna Give You Up" },
    { id: "kJQP7kiw5Fk", title: "Despacito" },
    { id: "3JZ_D3ELwOQ", title: "Shape of You" },
    { id: "ISzELygBywM", title: "Song Title 4" },
    { id: "ROrqvuJ23zE", title: "Song Title 5" },
    { id: "FV8McKeKcYg", title: "Song Title 6" },
    { id: "QJg4AsDElMk", title: "Song Title 7" },
    { id: "7gC5vYaIkO4", title: "Song Title 8" },
    { id: "TRiVJzC3Kjs", title: "Song Title 9" },
    { id: "lEPXlQgH7Ck", title: "Song Title 10" },
    { id: "orJSJGHjL0Y", title: "Song Title 11" },
    { id: "kTJczUeE5LY", title: "Song Title 12" },
    { id: "YT05j5c9j2Y", title: "Song Title 13" },
    { id: "_d_c9koE0c", title: "Song Title 14" },
    { id: "kJQPc9FKj2U", title: "Song Title 15" },
    { id: "dQw4w9WgXcQ", title: "Never Gonna Give You Up (Again)" },
    { id: "hLQlStSQi2Q", title: "Song Title 17" },
    { id: "OPk9x_0i-40", title: "Song Title 18" },
    { id: "rYEDA3JcQro", title: "Song Title 19" },
    { id: "lp-EOl_zJSE", title: "Song Title 20" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (videoId) => {
    setModalVideoId(videoId);
  };

  const handleCloseModal = () => {
    setModalVideoId(null);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-6">
      <h1 className="text-5xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">
        Top 20 Songs
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {songs.map((song, index) => (
            <SongCard
              key={song.id + index}
              song={song}
              index={index}
              onClick={handleCardClick}
              isFavorite={favorites.includes(song.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}

      {modalVideoId && <Modal videoId={modalVideoId} onClose={handleCloseModal} />}
    </div>
  );
};

export default SongsPage;
