import { useState, useEffect } from 'react';

const HERO_PHOTOS = [
  { src: '/images/hero-1.jpg' },
  { src: '/images/hero-2.jpg' },
  { src: '/images/hero-3.jpg' },
  { src: '/images/hero-4.jpg' },
  { src: '/images/hero-5.jpg' },
  { src: '/images/hero-6.jpg' },
];

const FALLBACK_GRADIENTS = [
  'linear-gradient(135deg, #FFB703 0%, #FB8500 50%, #E63946 100%)',
  'linear-gradient(135deg, #43AA8B 0%, #06A77D 50%, #118AB2 100%)',
  'linear-gradient(135deg, #F15BB5 0%, #E63946 50%, #FFB703 100%)',
  'linear-gradient(135deg, #8338EC 0%, #3A86FF 50%, #06A77D 100%)',
  'linear-gradient(135deg, #FFD23F 0%, #F77F00 50%, #E63946 100%)',
  'linear-gradient(135deg, #06A77D 0%, #FFB703 50%, #F15BB5 100%)',
];

export default function HeroCarousel() {
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState({});

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_PHOTOS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#1a1510' }}>
      {HERO_PHOTOS.map((photo, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          opacity: i === idx ? 1 : 0,
          transition: 'opacity 1.4s ease',
          pointerEvents: 'none',
        }}>
          {!failed[i] ? (
            <img src={photo.src} alt=""
              onError={() => setFailed(s => ({ ...s, [i]: true }))}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                transform: i === idx ? 'scale(1.06)' : 'scale(1)',
                transition: 'transform 6.5s ease-out',
                transformOrigin: i % 2 === 0 ? 'center 40%' : '30% center',
              }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: FALLBACK_GRADIENTS[i % FALLBACK_GRADIENTS.length] }} />
          )}
        </div>
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,0.10) 0%,rgba(0,0,0,0.05) 50%,rgba(0,0,0,0.20) 100%)', pointerEvents: 'none' }} />
    </div>
  );
}
