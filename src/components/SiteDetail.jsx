import { CATEGORIES } from '../constants/categories';
import { safeUrl, safeTel } from '../utils/security';
import Badge from './Badge';
import Pin from './Pin';
import SiteMapPreview from './SiteMapPreview';

export default function SiteDetail({ site, onClose, activeCategory }) {
  if (!site) return null;
  const isUrgent = site.urgentNeed.includes(activeCategory) ||
    (activeCategory === 'all' && site.urgentNeed.length > 0);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(42,31,20,0.45)', padding: '16px',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--surface)', borderRadius: '20px',
        width: '100%', maxWidth: 500,
        boxShadow: '0 24px 80px rgba(42,31,20,0.25)',
        maxHeight: '90vh', overflowY: 'auto',
        animation: 'fadeScaleIn 0.22s cubic-bezier(0.32,0.72,0,1)',
      }}>
        <SiteMapPreview site={site} />

        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 0' }}>
          <div style={{ width: 36, height: 4, borderRadius: 99, background: 'var(--border)' }} />
        </div>
        <div style={{ padding: '14px 24px 32px' }}>
          {isUrgent && (
            <div style={{ background: 'var(--urgent-light)', border: '1px solid var(--urgent)',
              borderRadius: 10, padding: '10px 14px', marginBottom: 14, display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 18 }}>🔥</span>
              <div>
                <p style={{ fontWeight: 600, color: 'var(--urgent)', fontSize: 13 }}>Urgent need right now</p>
                <p style={{ color: 'var(--text2)', fontSize: 12, marginTop: 2 }}>
                  This site especially needs: {site.urgentNeed.map(n => {
                    const c = CATEGORIES.find(cat => cat.id === n);
                    return c ? c.label : n;
                  }).join(', ')}
                </p>
              </div>
            </div>
          )}

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 33, fontWeight: 700, lineHeight: 1.2 }}>{site.name}</h2>

          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 20, color: 'var(--text2)' }}>{site.hours}</span>
          </div>
          {site.address && (
            <p style={{ fontSize: 20, color: 'var(--text2)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
              <Pin size={18} inline /> {site.address}
            </p>
          )}

          <div style={{ marginTop: 18 }}>
            <p style={{ fontSize: 18, color: 'var(--text2)', fontWeight: 600, marginBottom: 8, letterSpacing: '0.06em',
              textTransform: 'uppercase' }}>Accepts</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {site.accepts.map(a => {
                const cat = CATEGORIES.find(c => c.id === a);
                return cat ? <Badge key={a} label={cat.label} hexColor={cat.color || undefined} color={cat.color ? undefined : 'neutral'} /> : null;
              })}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 20 }}>
            {site.phone ? (
              <a href={safeTel(site.phone)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '12px', borderRadius: 10, background: 'var(--bg2)',
                color: 'var(--text)', textDecoration: 'none', fontSize: 20, fontWeight: 500,
                border: '1px solid var(--border)',
              }}>📞 {site.phone}</a>
            ) : (
              <span style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '12px', borderRadius: 10, background: 'var(--bg2)',
                color: 'var(--text2)', fontSize: 20, fontWeight: 500,
                border: '1px solid var(--border)', opacity: 0.45, cursor: 'not-allowed',
              }}>📞 No phone</span>
            )}
            {site.website ? (
              <a href={safeUrl(site.website)} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '12px', borderRadius: 10, background: 'var(--bg2)',
                color: 'var(--text)', textDecoration: 'none', fontSize: 20, fontWeight: 500,
                border: '1px solid var(--border)',
              }}>🌐 Website</a>
            ) : (
              <span style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '12px', borderRadius: 10, background: 'var(--bg2)',
                color: 'var(--text2)', fontSize: 20, fontWeight: 500,
                border: '1px solid var(--border)', opacity: 0.45, cursor: 'not-allowed',
              }}>🌐 Website</span>
            )}
            <a href={`https://maps.google.com/?q=${encodeURIComponent(site.address)}`} target="_blank" rel="noopener"
              style={{
                gridColumn: '1/-1', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '14px', borderRadius: 10, background: 'var(--accent)',
                color: '#fff', textDecoration: 'none', fontSize: 21, fontWeight: 600,
              }}><Pin size={22} light /> Get Directions</a>
          </div>
        </div>
      </div>
    </div>
  );
}
