const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';

export async function geocodeAddress(addr) {
  const res = await fetch(
    `${NOMINATIM_BASE}/search?q=${encodeURIComponent(addr)}&countrycodes=us&format=json&limit=1`,
    { headers: { 'Accept-Language': 'en' } }
  );
  const data = await res.json();
  if (!data || data.length === 0) return null;
  const { lat, lon, display_name } = data[0];
  return {
    lat: parseFloat(lat),
    lng: parseFloat(lon),
    label: display_name.split(',').slice(0, 3).join(','),
  };
}

export async function reverseGeocode(lat, lng) {
  const res = await fetch(
    `${NOMINATIM_BASE}/reverse?lat=${lat}&lon=${lng}&format=json`
  );
  const d = await res.json();
  return d.display_name
    ? d.display_name.split(',').slice(0, 3).join(',')
    : 'Current location';
}
