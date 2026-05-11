import { useState, useEffect } from 'react';
import { CATEGORIES } from '../constants/categories';
import { buildMockSites } from '../mocks/sites';
import { fetchSitesFromOverpass, mapOverpassElement } from '../services/overpass';
import ColorfulLogo from '../components/ColorfulLogo';
import CategoryChip from '../components/CategoryChip';
import SiteCard from '../components/SiteCard';
import SiteDetail from '../components/SiteDetail';
import MapView from '../components/MapView';

export default function Results({ location, searchCoords, onBack, tweaks, onSearch }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const [detailSite, setDetailSite] = useState(null);
  const [viewMode, setViewMode] = useState(tweaks.defaultView || 'split');
  const [sortBy, setSortBy] = useState('distance');
  const [distanceFilter, setDistanceFilter] = useState(10);
  const [searchInput, setSearchInput] = useState(location);
  const [sites, setSites] = useState([]);
  const [sitesLoading, setSitesLoading] = useState(true);
  const [isRealData, setIsRealData] = useState(false);

  useEffect(() => { setSearchInput(location); }, [location]);

  const handleInlineSearch = () => {
    if (searchInput.trim() && onSearch) onSearch(searchInput.trim());
  };

  const center = searchCoords || { lat: 40.740, lng: -73.990 };

  useEffect(() => {
    let cancelled = false;
    setSitesLoading(true);
    setIsRealData(false);
    setSites([]);

    const mockSites = buildMockSites(center, location);

    fetchSitesFromOverpass(center.lat, center.lng)
      .then(elements => {
        if (cancelled) return;
        const mapped = elements
          .map(el => mapOverpassElement(el, center))
          .filter(Boolean)
          .filter(s => s.distance < 50)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 25)
          .map((s, i) => ({ ...s, id: i + 1 }));
        const finalSites = mapped.length > 0 ? mapped : mockSites;
        setSites(finalSites);
        setIsRealData(mapped.length > 0);
        // Auto-expand to the tightest radius that has results
        const best = [10, 25, 50].find(d => finalSites.some(s => s.distance < d)) ?? 50;
        setDistanceFilter(best);
      })
      .catch(() => { if (!cancelled) { setSites(mockSites); setIsRealData(false); } })
      .finally(() => { if (!cancelled) setSitesLoading(false); });

    return () => { cancelled = true; };
  }, [center.lat, center.lng]);

  const filtered = sites
    .filter(s => s.distance < distanceFilter)
    .filter(s => activeCategory === 'all' || s.accepts.includes(activeCategory))
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'urgent') return (b.urgentNeed.length - a.urgentNeed.length) || (a.distance - b.distance);
      if (sortBy === 'match' && activeCategory !== 'all')
        return (b.accepts.includes(activeCategory) ? 1 : 0) - (a.accepts.includes(activeCategory) ? 1 : 0) || (a.distance - b.distance);
      return a.distance - b.distance;
    });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <header style={{
        background: 'linear-gradient(180deg, var(--surface) 0%, var(--bg2) 100%)',
        borderBottom: '1px solid var(--border)',
        padding: '0 20px', position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0 10px' }}>
            <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px 6px', color: 'var(--text2)', fontSize: 18, lineHeight: 1 }}>←</button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <ColorfulLogo size={20} />
            </div>
            <div style={{ display: 'flex', background: 'var(--bg2)', borderRadius: 8, padding: 2, gap: 2, flexShrink: 0 }}>
              {[{ v: 'list', icon: '≡' }, { v: 'split', icon: '⊞' }, { v: 'map', icon: '⬡' }].map(({ v, icon }) => (
                <button key={v} onClick={() => setViewMode(v)} style={{
                  background: viewMode === v ? 'var(--surface)' : 'none',
                  border: 'none', borderRadius: 6, padding: '4px 10px',
                  cursor: 'pointer', fontSize: 14, color: viewMode === v ? 'var(--text)' : 'var(--text2)',
                  boxShadow: viewMode === v ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                }}>{icon}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 12 }}>
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center',
              background: 'var(--surface)', border: '1.5px solid var(--border)',
              borderRadius: 99, padding: '5px 5px 5px 14px',
              boxShadow: 'inset 0 1px 4px rgba(42,31,20,0.07)',
            }}>
              <input
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleInlineSearch()}
                style={{ flex: 1, border: 'none', background: 'transparent',
                  fontSize: 16, color: 'var(--text)', fontWeight: 500,
                  fontFamily: 'var(--font-body)', outline: 'none', padding: '2px 10px' }}
                placeholder="Enter address or zip code..."
              />
              <button onClick={handleInlineSearch} style={{
                background: 'var(--accent)', color: '#fff', border: 'none',
                borderRadius: 99, padding: '7px 18px', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'var(--font-body)', flexShrink: 0,
              }}>Search</button>
            </div>
            <span style={{ fontSize: 14, color: 'var(--text2)', whiteSpace: 'nowrap', flexShrink: 0 }}>
              <strong style={{ color: 'var(--text)', fontWeight: 700 }}>{filtered.length}</strong> sites found
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 0, paddingBottom: 13 }}>
            <div style={{ display: 'flex', gap: 6, flex: 1, overflowX: 'auto', scrollbarWidth: 'none' }}>
              {CATEGORIES.map(cat => (
                <CategoryChip key={cat.id} cat={cat} active={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0,
              borderLeft: '1.5px solid var(--border)', paddingLeft: 14, marginLeft: 10 }}>
              <select value={distanceFilter} onChange={e => setDistanceFilter(Number(e.target.value))} style={{
                fontSize: 14, border: '1px solid var(--border)', borderRadius: 8,
                padding: '5px 10px', background: 'var(--bg2)', color: 'var(--text)',
                fontFamily: 'var(--font-body)', cursor: 'pointer',
              }}>
                <option value={10}>Within 10mi</option>
                <option value={25}>Within 25mi</option>
                <option value={50}>Within 50mi</option>
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                fontSize: 14, border: '1px solid var(--border)', borderRadius: 8,
                padding: '5px 10px', background: 'var(--bg2)', color: 'var(--text)',
                fontFamily: 'var(--font-body)', cursor: 'pointer',
              }}>
                <option value="distance">Nearest first</option>
                <option value="urgent">Most urgent</option>
                <option value="match">Best match</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <div style={{ flex: 1, maxWidth: 1100, width: '100%', margin: '0 auto',
        padding: '16px', display: 'flex', gap: 16,
        flexDirection: viewMode === 'map' ? 'column' : 'row' }}>

        {(viewMode === 'list' || viewMode === 'split') && (
          <div style={{
            flex: viewMode === 'split' ? '0 0 380px' : '1',
            display: 'flex', flexDirection: 'column', gap: 10,
            maxHeight: viewMode === 'split' ? 'calc(100vh - 200px)' : 'none',
            overflowY: viewMode === 'split' ? 'auto' : 'visible',
            scrollbarWidth: 'thin',
          }}>
            {!sitesLoading && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px',
                borderRadius: 8, fontSize: 12, fontWeight: 500,
                background: isRealData ? 'oklch(95% 0.04 245)' : 'var(--bg2)',
                color: isRealData ? 'oklch(40% 0.16 245)' : 'var(--text2)',
                border: `1px solid ${isRealData ? 'oklch(85% 0.08 245)' : 'var(--border)'}`,
                alignSelf: 'flex-start',
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                  background: isRealData ? 'oklch(52% 0.19 245)' : 'var(--text2)' }} />
                {isRealData ? 'Live data · OpenStreetMap' : 'Sample data · Connect to internet for live results'}
              </div>
            )}

            {sitesLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)', overflow: 'hidden',
                  animation: 'pulse 1.4s ease-in-out infinite',
                  animationDelay: `${i * 0.15}s`,
                }}>
                  <div style={{ height: 90, background: 'var(--bg2)' }} />
                  <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ height: 18, width: '65%', background: 'var(--bg2)', borderRadius: 6 }} />
                    <div style={{ height: 13, width: '45%', background: 'var(--bg2)', borderRadius: 6 }} />
                    <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                      <div style={{ height: 22, width: 60, background: 'var(--bg2)', borderRadius: 99 }} />
                      <div style={{ height: 22, width: 50, background: 'var(--bg2)', borderRadius: 99 }} />
                    </div>
                  </div>
                </div>
              ))
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text2)' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                <p style={{ fontWeight: 600 }}>No sites found</p>
                <p style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your filters or location.</p>
              </div>
            ) : filtered.map((site, i) => (
              <SiteCard key={site.id} site={site} selected={selectedId === site.id}
                activeCategory={activeCategory}
                compact={viewMode === 'split'}
                index={i + 1}
                onClick={() => { setSelectedId(site.id); setDetailSite(site); }} />
            ))}
          </div>
        )}

        {(viewMode === 'map' || viewMode === 'split') && (
          <div style={{
            flex: 1,
            minHeight: viewMode === 'map' ? 'calc(100vh - 220px)' : 420,
            height: viewMode === 'split' ? 'calc(100vh - 220px)' : undefined,
            borderRadius: 'var(--radius)', overflow: 'hidden',
            border: '1px solid var(--border)',
          }}>
            <MapView sites={filtered} center={center} selectedId={selectedId}
              onSelect={id => { setSelectedId(id); setDetailSite(filtered.find(s => s.id === id) || null); }} />
          </div>
        )}
      </div>

      {detailSite && (
        <SiteDetail site={detailSite} activeCategory={activeCategory}
          onClose={() => { setDetailSite(null); setSelectedId(null); }} />
      )}
    </div>
  );
}
