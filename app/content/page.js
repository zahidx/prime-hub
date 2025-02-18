import YouTubeEmbed from "../compo/YouTubeEmbed";

export default function VideoPage() {
  const isPremiumUser = false; // Set this based on the user's subscription status

  const videos = [
    { videoId: "dQw4w9WgXcQ", title: "Never Gonna Give You Up", isPremium: false },
    { videoId: "9bZkp7q19f0", title: "Gangnam Style", isPremium: true },
    { videoId: "3JZ_D3ELwOQ", title: "Shake It Off", isPremium: false },
    { videoId: "nfWlot6h_JM", title: "Roar", isPremium: false },
    { videoId: "IcrbM1l_BoI", title: "Baby", isPremium: true },
    { videoId: "fLexgOxsZu0", title: "Uptown Funk", isPremium: false },
    { videoId: "JGwWNGJdvx8", title: "Shape of You", isPremium: false },
    { videoId: "kJQP7kiw5Fk", title: "Despacito", isPremium: false },
    { videoId: "3AtRn4j8u4Y", title: "Blinding Lights", isPremium: false },
    { videoId: "fJ9rUzIMcZQ", title: "We Are The Champions", isPremium: false },
    { videoId: "Lr31V9VJcCg", title: "Despacito", isPremium: false },
    { videoId: "XbGs_qK2P4M", title: "Call Me Maybe", isPremium: false },
    { videoId: "7PCkvCPvDXk", title: "Counting Stars", isPremium: false },
    { videoId: "Zi_XLOBDoYI", title: "Wake Me Up", isPremium: true },
    { videoId: "xfr2P6XL6IY", title: "Toxic", isPremium: false },
    { videoId: "QJO3ROT-A4E", title: "I Gotta Feeling", isPremium: false },
    { videoId: "pcpXjjWytoc", title: "Somebody That I Used To Know", isPremium: false },
    { videoId: "h8tHdoCZx60", title: "Rolling in the Deep", isPremium: true },
    { videoId: "mbzJnb7bbXQ", title: "Radioactive", isPremium: false },
    { videoId: "wmwP3zHS3vY", title: "Stressed Out", isPremium: false },
  ];

  return (
    <div className="space-y-12 p-12 bg-gradient-to-r from-[#2c3e50] to-[#34495e] min-h-screen">
      <div className="text-center text-white mb-12">
        <h2 className="text-5xl mt-12 font-extrabold tracking-tight mb-4">Watch These Popular Videos</h2>
        <p className="text-xl font-light">Check out the latest trending videos from your favorite artists and creators</p>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
        {videos.map((video, index) => (
          <div
            key={index}
            className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:opacity-90 rounded-lg overflow-hidden relative"
          >
            {/* Show premium icon */}
            {video.isPremium && !isPremiumUser && (
              <div className="absolute top-2 right-2 p-2 bg-yellow-500 text-white rounded-full text-xs font-semibold">
                <i className="fas fa-crown"></i> {/* Using FontAwesome for the crown icon */}
              </div>
            )}

            {/* If user is not premium, show thumbnail */}
            {!isPremiumUser && video.isPremium ? (
              <div className="relative">
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`} // Using YouTube thumbnail
                  alt={video.title}
                  className="w-full h-full object-cover opacity-70 cursor-not-allowed"
                />
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white font-semibold text-xl">
                  Premium Content - Upgrade to Watch
                </div>
              </div>
            ) : (
              <YouTubeEmbed videoId={video.videoId} title={video.title} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
