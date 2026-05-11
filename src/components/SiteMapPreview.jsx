import { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function SiteMapPreview({ site }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: [site.lat, site.lng], zoom: 15,
      zoomControl: false, dragging: false, scrollWheelZoom: false,
      doubleClickZoom: false, boxZoom: false, keyboard: false,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
    L.marker([site.lat, site.lng], {
      icon: L.divIcon({
        html: `<div style="width:16px;height:16px;border-radius:50%;background:#3B6FD4;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.35)"></div>`,
        className: '', iconSize: [16, 16], iconAnchor: [8, 8],
      }),
    }).addTo(map);
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [site.lat, site.lng]);

  return (
    <div style={{ width: '100%', height: 140, borderRadius: '20px 20px 0 0', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
