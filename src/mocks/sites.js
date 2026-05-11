// MOCK DATA — used only when Overpass API returns no results (offline / no coverage)
// Do NOT use these for real donation routing.

export const SITE_TEMPLATES = [
  { name: 'Community Food Bank',  address: '248 W Pico Blvd',          accepts: ['food','clothes','household'],                  urgentNeed: ['food','toiletries'],    phone: '(555) 100-0001', website: 'https://feedingamerica.org',    hours: 'Mon–Sat 9am–5pm',  open: true,  capacity: 72 },
  { name: 'Thrift & Give Shop',   address: '1105 N Vermont Ave',        accepts: ['clothes','household','electronics','furniture'], urgentNeed: ['clothes'],              phone: '(555) 100-0002', website: 'https://goodwill.org',          hours: 'Mon–Sun 10am–7pm', open: true,  capacity: 45 },
  { name: 'City Food Pantry',     address: '3417 E Cesar Chavez Ave',   accepts: ['food','toiletries'],                           urgentNeed: ['food','toiletries'],    phone: '(555) 100-0003', website: 'https://feedingamerica.org',    hours: 'Mon–Fri 8am–3pm',  open: false, capacity: 91 },
  { name: 'Salvation Army',       address: '832 S San Pedro St',        accepts: ['food','clothes','household','toys','electronics'], urgentNeed: ['toys','food'],       phone: '(555) 100-0004', website: 'https://salvationarmyusa.org', hours: 'Mon–Sat 9am–6pm',  open: true,  capacity: 38 },
  { name: 'Community Mission',    address: '2612 W Washington Blvd',    accepts: ['food','clothes','toiletries'],                  urgentNeed: ['clothes','toiletries'], phone: '(555) 100-0005', website: 'https://communityaction.org',   hours: 'Daily 7am–9pm',    open: true,  capacity: 60 },
  { name: 'Mobile Food Market',   address: '501 N Maple Ave',           accepts: ['food'],                                        urgentNeed: ['food'],                 phone: '(555) 100-0006', website: 'https://feedingamerica.org',    hours: 'Wed & Sat 10am–2pm', open: false, capacity: 85 },
  { name: 'Toys & Books Drive',   address: '75 N Lake Ave',             accepts: ['toys'],                                        urgentNeed: ['toys'],                 phone: '(555) 100-0007', website: 'https://toysfortots.org',       hours: 'Mon–Fri 10am–4pm', open: true,  capacity: 22 },
];

const LAT_OFFSETS = [0.004, -0.009, 0.013, -0.004, 0.018, -0.015, 0.022];
const LNG_OFFSETS = [-0.008, 0.006, 0.004, -0.015, -0.003, 0.012, 0.018];

export function buildMockSites(center, locationLabel) {
  const locParts = locationLabel.split(',').map(s => s.trim()).filter(Boolean);
  const cityStr = locParts.length >= 3
    ? locParts.slice(1, 3).join(', ')
    : locParts.slice(1).join(', ');

  return SITE_TEMPLATES.map((t, i) => ({
    ...t,
    id: i + 1,
    address: cityStr ? `${t.address}, ${cityStr}` : t.address,
    lat: center.lat + LAT_OFFSETS[i],
    lng: center.lng + LNG_OFFSETS[i],
    distance: parseFloat((0.3 + i * 0.35).toFixed(1)),
  }));
}
