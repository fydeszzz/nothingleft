import { hexToRgba } from '../utils/security';

export default function Badge({ label, color = 'accent', hexColor }) {
  if (hexColor) {
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 3,
        padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 600,
        background: hexToRgba(hexColor, 0.12), color: hexColor,
        border: `1px solid ${hexToRgba(hexColor, 0.35)}`,
        whiteSpace: 'nowrap',
      }}>{label}</span>
    );
  }
  const colors = {
    accent:  { bg: 'var(--accent-light)',  text: 'var(--accent)'  },
    green:   { bg: 'var(--accent2-light)', text: 'var(--accent2)' },
    urgent:  { bg: 'var(--urgent-light)',  text: 'var(--urgent)'  },
    neutral: { bg: 'var(--bg2)',           text: 'var(--text2)'   },
  };
  const c = colors[color] || colors.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 500,
      background: c.bg, color: c.text, whiteSpace: 'nowrap',
    }}>{label}</span>
  );
}
