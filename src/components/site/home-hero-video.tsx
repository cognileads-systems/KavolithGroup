import { useEffect, useState } from "react";

const HERO_VIDEO_URL = "/kavolith-home-hero.mp4";
const HERO_POSTER_URL = "/kavolith-home-hero-poster.jpg";

export function HomeHeroVideo() {
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionAllowed(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <img
        src={HERO_POSTER_URL}
        alt=""
        width={1280}
        height={720}
        fetchPriority="high"
        className="h-full w-full object-cover"
      />
      {motionAllowed && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster={HERO_POSTER_URL}
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/65 to-background/15" />
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-b from-transparent via-background/55 to-background" />
    </div>
  );
}
