import { useState } from 'react';
import ColorfulLogo from '../components/ColorfulLogo';
import HeroCarousel from '../components/HeroCarousel';
import Pin from '../components/Pin';
import Footer from '../components/Footer';
import JoinListModal from '../components/JoinListModal';

export default function Landing({ onSearch, geocodeError }) {
  const [addr, setAddr] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showJoinList, setShowJoinList] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!addr.trim()) return;
    setError('');
    setLoading(true);
    Promise.resolve(onSearch(addr, null)).finally(() => setLoading(false));
  };

  const handleGPS = () => {
    setError('');
    if (!navigator.geolocation) {
      setError('Geolocation not supported by your browser.');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const d = await r.json();
          const label = d.display_name
            ? d.display_name.split(',').slice(0, 3).join(',')
            : 'Current location';
          onSearch(label, { lat: latitude, lng: longitude });
        } catch {
          onSearch('Current location', { lat: latitude, lng: longitude });
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Could not get your location. Please enter an address.');
        setLoading(false);
      }
    );
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <nav style={{ padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ColorfulLogo size={26} />
        <button onClick={() => setShowJoinList(true)} style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          fontSize: 13, fontWeight: 600, color: 'var(--text)',
          background: 'transparent', border: '1.5px solid var(--border)', borderRadius: 99,
          padding: '2px 17px', cursor: 'pointer',
        }}>
          <img src="/images/joinlist.png" alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} />
          Join List
        </button>
      </nav>

      <div style={{ position: 'relative', width: '100%', height: 'min(88vh, 960px)', minHeight: 560, overflow: 'hidden', background: '#1a1510' }}>
        <HeroCarousel />
        <div style={{ position: 'absolute', inset: 0, zIndex: 5,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '0 24px', pointerEvents: 'none', textAlign: 'center' }}>
          <ColorfulLogo big />
          <p style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            fontSize: 'clamp(13px, 1.6vw, 18px)', fontWeight: 400,
            color: 'rgba(255,255,255,0.92)', marginTop: 18, maxWidth: 520,
            lineHeight: 1.5, textShadow: '0 2px 12px rgba(0,0,0,0.45)',
          }}>
            Give what you have. Help where it matters.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '56px 24px 80px', textAlign: 'center', gap: 0 }}>
        <p style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: 'var(--text)', maxWidth: 560,
          lineHeight: 1.5, margin: '0 0 14px 0',
          fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 500 }}>
          Your spare today, their smile someday.
        </p>
        <p style={{ fontSize: 'clamp(13px, 1.6vw, 15px)', color: 'var(--text2)', maxWidth: 440,
          lineHeight: 1.6, margin: '0 0 32px 0' }}>
          Find a neighborhood drop-off that needs exactly what you have to give — food, clothes, toys, books
        </p>

        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 480 }}>
          <div style={{ display: 'flex', gap: 8, background: 'var(--surface)',
            border: '1.5px solid var(--border)', borderRadius: 14, padding: '6px 6px 6px 16px',
            boxShadow: 'var(--shadow)', alignItems: 'center' }}>
            <Pin size={20} />
            <input
              value={addr}
              onChange={e => setAddr(e.target.value)}
              placeholder="Enter your address or zip code..."
              style={{ flex: 1, border: 'none', background: 'none', outline: 'none',
                fontSize: 15, color: 'var(--text)', fontFamily: 'var(--font-body)', padding: '8px 0' }}
            />
            <button type="submit" disabled={loading} style={{
              flexShrink: 0, background: 'var(--accent)', color: '#fff',
              border: 'none', borderRadius: 10, padding: '10px 20px',
              fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)',
              opacity: loading ? 0.7 : 1, transition: 'opacity 0.15s',
            }}>
              {loading ? 'Searching…' : 'Find sites'}
            </button>
          </div>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
          <div style={{ height: 1, width: 60, background: 'var(--border)' }} />
          <span style={{ fontSize: 14, color: 'var(--text2)' }}>or</span>
          <div style={{ height: 1, width: 60, background: 'var(--border)' }} />
        </div>

        <button onClick={handleGPS} disabled={loading} style={{
          marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'none', border: '1.5px solid var(--border)', borderRadius: 10,
          padding: '10px 20px', fontSize: 13, fontWeight: 500, cursor: 'pointer',
          color: 'var(--text)', fontFamily: 'var(--font-body)',
        }}>
          Use my current location
        </button>

        {(error || geocodeError) && (
          <p style={{ marginTop: 12, fontSize: 13, color: 'var(--urgent)', fontWeight: 500 }}>
            {error || geocodeError}
          </p>
        )}

        <div style={{ display: 'flex', gap: 32, marginTop: 52, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[['2,400+', 'donation sites'], ['12 types', 'of donations'], ['50 states', 'covered']].map(([n, l]) => (
            <div key={n} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--text)' }}>{n}</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      {showJoinList && <JoinListModal onClose={() => setShowJoinList(false)} />}
    </div>
  );
}
