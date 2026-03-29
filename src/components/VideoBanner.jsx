import { useState } from "react";
import "../css/VideoBanner.css"; 

function VideoBanner() {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <section className="video-banner">
      <div className="video-panel">

        {!playVideo ? (
          <button
            className="video-thumb"
            onClick={() => setPlayVideo(true)}
          >
            <img
              src="https://img.youtube.com/vi/x8Jya9I1ZyE/hqdefault.jpg"
              alt="Preview for featured video"
            />
            <span className="play">▶</span>
          </button>
        ) : (
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/x8Jya9I1ZyE?autoplay=1&rel=0"
              title="Featured walkthrough video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="video-text">
          <h2>Want to know the history of Sports Cards?</h2>
          <p>
            Watch this video to learn about the history of sports card and why people collect cards.
          </p>
        </div>

      </div>
    </section>
  );
}

export default VideoBanner;