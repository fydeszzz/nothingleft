// Hero Carousel — joyful children with donations/food (concept matches good photos)
const HERO_PHOTOS = [
  { src: "images/hero-1.jpg" },
  { src: "images/hero-2.jpg" },
  { src: "images/hero-3.jpg" },
  { src: "images/hero-4.jpg" },
  { src: "images/hero-5.jpg" },
  { src: "images/hero-6.jpg" },
];

// Joyful fallback gradients (warm, not dystopian)
const FALLBACK_GRADIENTS = [
  "linear-gradient(135deg, #FFB703 0%, #FB8500 50%, #E63946 100%)",
  "linear-gradient(135deg, #43AA8B 0%, #06A77D 50%, #118AB2 100%)",
  "linear-gradient(135deg, #F15BB5 0%, #E63946 50%, #FFB703 100%)",
  "linear-gradient(135deg, #8338EC 0%, #3A86FF 50%, #06A77D 100%)",
  "linear-gradient(135deg, #FFD23F 0%, #F77F00 50%, #E63946 100%)",
  "linear-gradient(135deg, #06A77D 0%, #FFB703 50%, #F15BB5 100%)",
];

function HeroCarousel() {
  const [idx, setIdx] = React.useState(0);
  const [failed, setFailed] = React.useState({});
  React.useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_PHOTOS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#1a1510" }}>
      {HERO_PHOTOS.map((photo, i) => {
        const active = i === idx;
        const isFailed = failed[i];
        return (
          <div key={i} style={{
            position: "absolute", inset: 0,
            opacity: active ? 1 : 0,
            transition: "opacity 1.4s ease",
            pointerEvents: "none",
          }}>
            {!isFailed ? (
              <img src={photo.src} alt=""
                onError={() => setFailed(s => ({ ...s, [i]: true }))}
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  transform: active ? "scale(1.06)" : "scale(1)",
                  transition: "transform 6.5s ease-out",
                  transformOrigin: i % 2 === 0 ? "center 40%" : "30% center",
                }}
              />
            ) : (
              <div style={{
                width: "100%", height: "100%",
                background: FALLBACK_GRADIENTS[i % FALLBACK_GRADIENTS.length],
              }}></div>
            )}
          </div>
        );
      })}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.20) 100%)",
        pointerEvents: "none",
      }}></div>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        opacity: 0.05, mixBlendMode: "overlay",
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
      }}></div>
    </div>
  );
}
window.HeroCarousel = HeroCarousel;
