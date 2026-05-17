import { safeUrl } from '../utils/security';

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

export function mapOverpassElement(el, center) {
  const tags = el.tags || {};
  const lat = parseFloat(el.lat ?? el.center?.lat);
  const lng = parseFloat(el.lon ?? el.center?.lon);
  if (!lat || !lng) return null;

  const name = tags.name || tags.operator || 'Donation Site';
  const website = safeUrl(tags.website || tags['contact:website'] || tags.url || '') || '';
  const phone = tags.phone || tags['contact:phone'] || '';
  const hours = tags.opening_hours || 'Call for hours';
  const addrParts = [tags['addr:housenumber'], tags['addr:street']].filter(Boolean);
  const city = tags['addr:city'] || tags['addr:suburb'] || '';
  const address = addrParts.length
    ? `${addrParts.join(' ')}${city ? ', ' + city : ''}`
    : 'Address unavailable';

  const accepts = new Set();
  const amenity = tags.amenity || '', shop = tags.shop || '', sf = tags.social_facility || '';
  if (amenity === 'food_bank' || sf === 'food_bank' || sf === 'soup_kitchen' || sf === 'food_pantry') accepts.add('food');
  if (shop === 'charity') { accepts.add('clothes'); accepts.add('household'); }
  if (amenity === 'clothes_bank' || sf === 'clothing_bank') accepts.add('clothes');
  if (amenity === 'reuse') { accepts.add('household'); accepts.add('electronics'); accepts.add('furniture'); }
  if (amenity === 'social_facility' && accepts.size === 0) accepts.add('household');
  if (accepts.size === 0) accepts.add('household');

  return {
    id: el.id, name, address, website, phone, hours, open: true,
    lat, lng, accepts: [...accepts], urgentNeed: [], capacity: 50,
    distance: Math.round(haversineDistance(center.lat, center.lng, lat, lng) * 10) / 10,
  };
}

export async function fetchSitesFromOverpass(lat, lng, radiusMiles = 50) {
  const r = Math.round(radiusMiles * 1609.34);
  const q = [
    `[out:json][timeout:30];(`,
    `node["shop"="charity"](around:${r},${lat},${lng});`,
    `node["amenity"="food_bank"](around:${r},${lat},${lng});`,
    `node["amenity"="social_facility"](around:${r},${lat},${lng});`,
    `node["amenity"="clothes_bank"](around:${r},${lat},${lng});`,
    `node["amenity"="reuse"](around:${r},${lat},${lng});`,
    `way["shop"="charity"](around:${r},${lat},${lng});`,
    `way["amenity"="food_bank"](around:${r},${lat},${lng});`,
    `);out center;`,
  ].join('');

  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: 'data=' + encodeURIComponent(q),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  if (!res.ok) throw new Error('Overpass error');
  return (await res.json()).elements;
}
