import { CATEGORIES } from '../constants/categories';
import Badge from './Badge';

export default function SiteCard({ site, selected, onClick, activeCategory, compact, index }) {
  const isUrgent = site.urgentNeed.includes(activeCategory) ||
    (activeCategory === 'all' && site.urgentNeed.length > 0);
  const matchScore = activeCategory !== 'all' && site.accepts.includes(activeCategory)
    ? 'Best match' : null;

  return (
    <div onClick={onClick} style={{
      background: 'var(--surface)',
      border: `1.5px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
      borderRadius: 'var(--radius)', padding: compact ? '11px 14px' : '16px',
      cursor: 'pointer', transition: 'all 0.18s',
      boxShadow: selected ? 'var(--shadow-md)' : 'var(--shadow)',
      outline: selected ? '3px solid var(--accent-light)' : 'none',
      display: 'flex', alignItems: 'flex-start', gap: 12,
    }}>
      <div style={{
        flexShrink: 0, width: 30, height: 30, borderRadius: 99,
        background: selected ? 'var(--accent)' : 'var(--accent-light)',
        color: selected ? '#fff' : 'var(--accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 800, fontFamily: 'var(--font-body)',
        border: `1.5px solid ${selected ? 'var(--accent)' : 'rgba(59,111,212,0.3)'}`,
        marginTop: 1, letterSpacing: '-0.02em',
      }}>{index}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: compact ? 15 : 18, fontWeight: 700, fontFamily: 'var(--font-display)',
              color: 'var(--text)', lineHeight: 1.25, display: 'block' }}>{site.name}</span>
            {site.address && (
              <p style={{ fontSize: 12, color: 'var(--text2)', marginTop: 3, lineHeight: 1.3,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{site.address}</p>
            )}
            {isUrgent && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 5,
                background: 'var(--urgent-light)', color: 'var(--urgent)',
                border: '1px solid var(--urgent)', borderRadius: 99,
                fontSize: 11, fontWeight: 700, padding: '2px 9px', letterSpacing: '0.03em',
              }}>Urgent need</span>
            )}
          </div>
          <div style={{ flexShrink: 0, textAlign: 'right' }}>
            <span style={{ display: 'block', fontSize: 16, fontWeight: 700, color: 'var(--accent)',
              fontFamily: 'var(--font-display)' }}>{site.distance}mi</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
          {matchScore && <Badge label={`✓ ${matchScore}`} color="green" />}
          {site.accepts.slice(0, 3).map(a => {
            const cat = CATEGORIES.find(c => c.id === a);
            return cat ? <Badge key={a} label={cat.label} hexColor={cat.color || undefined} color={cat.color ? undefined : 'neutral'} /> : null;
          })}
          {site.accepts.length > 3 && <Badge label={`+${site.accepts.length - 3} more`} color="neutral" />}
        </div>
        {!compact && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <span style={{ fontSize: 11, color: 'var(--text2)' }}>{site.hours}</span>
          </div>
        )}
      </div>
    </div>
  );
}
