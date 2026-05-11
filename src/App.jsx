import { useState, useEffect } from 'react';
import { geocodeAddress } from './services/geocoding';
import Landing from './pages/Landing';
import Results from './pages/Results';

// Dev-only: TweaksPanel is tree-shaken out of production builds
let useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle;
if (import.meta.env.DEV) {
  ({ useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle } = await import('./dev/TweaksPanel'));
} else {
  useTweaks = (defaults) => [defaults, () => {}];
  TweaksPanel = () => null;
  TweakSection = () => null;
  TweakRadio = () => null;
  TweakToggle = () => null;
}

const TWEAK_DEFAULTS = {
  theme: 'warm',
  defaultView: 'split',
  showUrgentBanner: true,
};

export default function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [page, setPage] = useState('landing');
  const [location, setLocation] = useState('');
  const [searchCoords, setSearchCoords] = useState(null);
  const [geocodeError, setGeocodeError] = useState('');

  useEffect(() => {
    const root = document.documentElement;
    if (tweaks.theme === 'cool') {
      root.style.setProperty('--bg', '#F0F5F4');
      root.style.setProperty('--bg2', '#E4EDE9');
      root.style.setProperty('--accent', 'oklch(50% 0.14 168)');
      root.style.setProperty('--accent-light', 'oklch(93% 0.06 168)');
      root.style.setProperty('--text', '#0F2920');
      root.style.setProperty('--text2', '#3A6050');
      root.style.setProperty('--border', '#CAD9D3');
    } else if (tweaks.theme === 'dark') {
      root.style.setProperty('--bg', '#1A1510');
      root.style.setProperty('--bg2', '#231E17');
      root.style.setProperty('--surface', '#2A231A');
      root.style.setProperty('--border', '#3D3328');
      root.style.setProperty('--text', '#F5EFE6');
      root.style.setProperty('--text2', '#9E8A74');
      root.style.setProperty('--accent-light', 'oklch(25% 0.08 38)');
      root.style.setProperty('--accent2-light', 'oklch(25% 0.08 148)');
      root.style.setProperty('--urgent-light', 'oklch(22% 0.08 22)');
    } else {
      root.style.setProperty('--bg', '#FAF7F2');
      root.style.setProperty('--bg2', '#F2EDE4');
      root.style.setProperty('--surface', '#FFFCF8');
      root.style.setProperty('--border', '#E8DFD0');
      root.style.setProperty('--text', '#2A1F14');
      root.style.setProperty('--text2', '#6B5744');
      root.style.setProperty('--accent-light', 'oklch(94% 0.05 245)');
      root.style.setProperty('--accent2-light', 'oklch(93% 0.06 148)');
      root.style.setProperty('--urgent-light', 'oklch(94% 0.06 22)');
    }
  }, [tweaks.theme]);

  const handleSearch = async (addr, coords) => {
    setGeocodeError('');
    if (coords) {
      setLocation(addr);
      setSearchCoords(coords);
      setPage('results');
      return;
    }
    try {
      const result = await geocodeAddress(addr);
      if (result) {
        setLocation(result.label);
        setSearchCoords({ lat: result.lat, lng: result.lng });
        setPage('results');
      } else {
        setGeocodeError('Address not found. Please try a different address or zip code.');
      }
    } catch {
      setLocation(addr);
      setSearchCoords(null);
      setPage('results');
    }
  };

  return (
    <>
      {page === 'landing' && <Landing onSearch={handleSearch} geocodeError={geocodeError} />}
      {page === 'results' && (
        <Results location={location} searchCoords={searchCoords}
          onBack={() => setPage('landing')} tweaks={tweaks} onSearch={handleSearch} />
      )}
      {import.meta.env.DEV && (
        <TweaksPanel>
          <TweakSection label="Appearance">
            <TweakRadio label="Color theme" value={tweaks.theme}
              options={['warm', 'cool', 'dark']} onChange={v => setTweak('theme', v)} />
          </TweakSection>
          <TweakSection label="Results View">
            <TweakRadio label="Default layout" value={tweaks.defaultView}
              options={['list', 'split', 'map']} onChange={v => setTweak('defaultView', v)} />
            <TweakToggle label="Show urgent banner" value={tweaks.showUrgentBanner}
              onChange={v => setTweak('showUrgentBanner', v)} />
          </TweakSection>
        </TweaksPanel>
      )}
    </>
  );
}
