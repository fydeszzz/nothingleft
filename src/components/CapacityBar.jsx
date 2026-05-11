export default function CapacityBar({ pct, urgent }) {
  const color = urgent ? 'var(--urgent)' : pct > 70 ? 'var(--accent2)' : 'var(--accent)';
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: 'var(--text2)', fontWeight: 500 }}>
          {urgent ? 'Urgently needed' : 'Capacity'}
        </span>
        <span style={{ fontSize: 11, color, fontWeight: 600 }}>{pct}%</span>
      </div>
      <div style={{ height: 5, borderRadius: 99, background: 'var(--border)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 99, transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
}
