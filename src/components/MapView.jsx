import { useEffect, useRef } from 'react';
import L from 'leaflet';

const ACCENT   = '#3B6FD4';
const URGENT   = '#C0392B';
const NEUTRAL  = '#7A8FA6';

function makeIcon(color, selected, label) {
  const size = selected ? 40 : 32;
  const fs = String(label).length > 1 ? 10 : 12;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size * 1.25}" viewBox="0 0 40 50">
    <filter id="s"><feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-opacity="0.3"/></filter>
    <path filter="url(#s)" d="M20 2C11.2 2 4 9.2 4 18c0 12 16 30 16 30S36 30 36 18C36 9.2 28.8 2 20 2z"
      fill="${color}" stroke="white" stroke-width="2"/>
    <circle cx="20" cy="17" r="9" fill="white"/>
    <text x="20" y="21.5" text-anchor="middle" font-size="${fs}" font-weight="800"
      font-family="system-ui,sans-serif" fill="${color}">${label}</text>
    ${selected ? `<circle cx="20" cy="17" r="13" fill="none" stroke="white" stroke-width="2" opacity="0.5"/>` : ''}
  </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [size, size * 1.25],
    iconAnchor: [size / 2, size * 1.25],
    popupAnchor: [0, -(size * 1.25)],
  });
}

export default function MapView({ sites, center, selectedId, onSelect }) {
  const mapRef      = useRef(null);
  const leafletMap  = useRef(null);
  const markersRef  = useRef({});

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;
    const map = L.map(mapRef.current, {
      center: [center ? center.lat : 40.740, center ? center.lng : -73.990],
      zoom: 13,
      zoomControl: true,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);
    leafletMap.current = map;

    const attr = map.getContainer().querySelector('.leaflet-control-attribution');
    if (attr) attr.style.fontSize = '10px';

    return () => { map.remove(); leafletMap.current = null; };
  }, []);

  useEffect(() => {
    const map = leafletMap.current;
    if (!map) return;

    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    if (center) {
      const youIcon = L.divIcon({
        html: `<div style="width:14px;height:14px;border-radius:50%;background:#4A90D9;border:3px solid white;box-shadow:0 0 0 3px rgba(74,144,217,0.3)"></div>`,
        className: '', iconSize: [14, 14], iconAnchor: [7, 7],
      });
      markersRef.current['__you'] = L.marker([center.lat, center.lng], { icon: youIcon, zIndexOffset: 2000 })
        .addTo(map)
        .bindTooltip('Your location', { direction: 'top', offset: [0, -10], opacity: 0.97 });
    }

    sites.forEach((site, i) => {
      const sel = site.id === selectedId;
      const color = sel ? ACCENT : site.urgentNeed.length > 0 ? URGENT : NEUTRAL;
      const marker = L.marker([site.lat, site.lng], {
        icon: makeIcon(color, sel, i + 1),
        zIndexOffset: sel ? 1000 : 0,
      })
        .addTo(map)
        .on('click', () => onSelect(site.id))
        .bindTooltip(`${site.name} · ${site.distance}mi`, { direction: 'top', offset: [0, -30], opacity: 0.97 });
      markersRef.current[site.id] = marker;
    });

    if (selectedId) {
      const site = sites.find(s => s.id === selectedId);
      if (site) map.panTo([site.lat, site.lng], { animate: true, duration: 0.5 });
    } else if (sites.length) {
      const bounds = L.latLngBounds(sites.map(s => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [sites, selectedId, center]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: 'var(--radius)' }} />
    </div>
  );
}
