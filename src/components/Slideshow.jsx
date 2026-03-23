import { useEffect, useRef, useState } from "react";
import "../css/Slideshow.css";

const slides = [
  { src: "/images/Michael.jpeg", caption: "Michael Jordan — 1987 Fleer" },
  { src: "/images/Wayne.jpeg", caption: "Wayne Gretzky — 1979 OPC" },
  { src: "/images/Tom.jpeg", caption: "Tom Brady — 2000 Playoff Contenders" },
  { src: "/images/Kobe.jpeg", caption: "Kobe Bryant — 1996 Oberto" },
  { src: "/images/Messi.jpeg", caption: "Lionel Messi — 2011 Tops" },
  { src: "/images/derek.jpeg", caption: "Derek Jeter — 1993 SP Foil" },
];

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!playing) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [playing]);

  useEffect(() => {
    const track = trackRef.current;
    const slide = track?.children[currentIndex];

    if (track && slide) {
      track.scrollTo({
        left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div className="slideshow" tabIndex={0}>
      <button
        className="slideshow-btn prev"
        onClick={() => {
          setPlaying(false);
          setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
        }}
        aria-label="Previous slide"
      >
        ‹
      </button>

      <div className="slides-track" ref={trackRef}>
        {slides.map((slide) => (
          <div className="slide" key={slide.caption}>
            <img src={slide.src} alt={slide.caption} />
            <div className="caption">{slide.caption}</div>
          </div>
        ))}
      </div>

      <button
        className="slideshow-btn next"
        onClick={() => {
          setPlaying(false);
          setCurrentIndex((prev) => (prev + 1) % slides.length);
        }}
        aria-label="Next slide"
      >
        ›
      </button>

      <div className="slideshow-controls">
        <button
          className="play-pause"
          onClick={() => setPlaying((prev) => !prev)}
          aria-pressed={!playing}
          aria-label={playing ? "Pause slideshow" : "Play slideshow"}
        >
          {playing ? "❚❚" : "▶"}
        </button>
      </div>

      <div className="thumbnails">
        {slides.map((slide, index) => (
          <button
            key={slide.caption}
            className={`thumb ${index === currentIndex ? "active" : ""}`}
            onClick={() => {
              setPlaying(false);
              setCurrentIndex(index);
            }}
            aria-label={`Show ${slide.caption}`}
          >
            <img src={slide.src} alt={slide.caption} />
          </button>
        ))}
      </div>
    </div>
  );
}