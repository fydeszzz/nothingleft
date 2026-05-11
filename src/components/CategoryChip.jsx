import { hexToRgba } from '../utils/security';

export default function CategoryChip({ cat, active, onClick }) {
  const col = cat.color;
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '7px 16px', borderRadius: 99, border: '1.5px solid',
      borderColor: active ? (col || 'var(--accent)') : col ? hexToRgba(col, 0.35) : 'var(--border)',
      background: active ? (col || 'var(--accent)') : col ? hexToRgba(col, 0.1) : 'var(--surface)',
      color: active ? '#fff' : (col || 'var(--text)'),
      fontSize: 15, fontWeight: 700, cursor: 'pointer',
      transition: 'all 0.15s', whiteSpace: 'nowrap',
      fontFamily: 'var(--font-body)',
    }}>
      {cat.label}
    </button>
  );
}
