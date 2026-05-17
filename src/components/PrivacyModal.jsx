const SECTIONS = [
  {
    title: '1. Information We Collect',
    subsections: [
      {
        subtitle: 'A. Location Information',
        body: 'To help you find nearby donation opportunities, we may collect approximate location data, including:',
        list: [
          'IP address',
          'Approximate geographic region or city',
          'Browser-based location data (if permission is granted)',
        ],
        after: 'We use this information to recommend nearby donation centers, improve search functionality, and prevent fraudulent activity. We do not continuously track your real-time location.',
      },
      {
        subtitle: 'B. Technical and Usage Information',
        body: 'We may automatically collect:',
        list: [
          'Device information',
          'Browser type and operating system',
          'Pages visited',
          'Cookies and analytics data',
        ],
      },
    ],
  },
  {
    title: '2. How We Use Your Information',
    list: [
      'Provide and operate the Platform',
      'Match donors with nearby organizations',
      'Display relevant local donation opportunities',
      'Improve user experience and website performance',
      'Communicate important service updates',
      'Respond to support requests',
      'Detect fraud, spam, or abuse',
      'Comply with legal obligations',
    ],
  },
  {
    title: '3. Cookies and Analytics',
    body: 'We may use cookies and similar technologies to remember preferences, analyze traffic, and improve performance. Third-party analytics services such as Google Analytics may collect anonymized usage data. You may disable cookies through your browser settings, though some features may not function properly.',
  },
  {
    title: '4. Sharing of Information',
    body: 'We do not sell personal information. We may share information with:',
    list: [
      'Service providers that help operate the Platform',
      'Cloud hosting and analytics providers',
      'Law enforcement or government authorities when legally required',
    ],
  },
  {
    title: '5. Data Retention',
    body: 'We retain personal information only as long as necessary to provide services, maintain platform integrity, resolve disputes, and comply with legal obligations.',
  },
  {
    title: '6. Security',
    body: 'We implement reasonable administrative, technical, and organizational safeguards to protect your information. However, no method of electronic transmission or storage is completely secure.',
  },
  {
    title: '7. Children\'s Privacy',
    body: 'This Platform is not intended for children under 13 years old. We do not knowingly collect personal information from children.',
  },
  {
    title: '8. Your Rights',
    body: 'Depending on your jurisdiction, you may have the right to access, correct, or withdraw consent for your personal information. To exercise these rights, contact us at fydeszzz@gmail.com.',
  },
  {
    title: '9. Third-Party Links',
    body: 'The Platform may contain links to third-party websites. We are not responsible for the privacy practices of those services.',
  },
  {
    title: '10. Changes to This Policy',
    body: 'We may update this Privacy Policy periodically. Changes take effect once posted on this page with an updated "Last updated" date.',
  },
  {
    title: '11. Contact Us',
    body: 'Questions about this Privacy Policy? Reach us at:',
    contact: { email: 'fydeszzz@gmail.com', team: 'NothingLeft' },
  },
];

function Section({ s }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{s.title}</h3>
      {s.body && <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: s.list ? 8 : 0 }}>{s.body}</p>}
      {s.list && (
        <ul style={{ margin: '6px 0 0', paddingLeft: 20 }}>
          {s.list.map((item, i) => (
            <li key={i} style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>{item}</li>
          ))}
        </ul>
      )}
      {s.after && <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginTop: 8 }}>{s.after}</p>}
      {s.subsections && s.subsections.map((sub, i) => (
        <div key={i} style={{ marginTop: 14, paddingLeft: 12, borderLeft: '3px solid var(--border)' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{sub.subtitle}</p>
          {sub.body && <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: sub.list ? 6 : 0 }}>{sub.body}</p>}
          {sub.list && (
            <ul style={{ margin: '4px 0 0', paddingLeft: 20 }}>
              {sub.list.map((item, j) => (
                <li key={j} style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>{item}</li>
              ))}
            </ul>
          )}
          {sub.after && <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginTop: 8 }}>{sub.after}</p>}
        </div>
      ))}
      {s.contact && (
        <div style={{ marginTop: 8 }}>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>
            Email: <a href={`mailto:${s.contact.email}`} style={{ color: 'var(--accent)' }}>{s.contact.email}</a>
          </p>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>Team: {s.contact.team}</p>
        </div>
      )}
    </div>
  );
}

export default function PrivacyModal({ onClose }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 20000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.55)', padding: 16,
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--surface)', borderRadius: 20,
          width: '100%', maxWidth: 580, maxHeight: '88vh',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
          animation: 'fadeScaleIn 0.22s cubic-bezier(0.32,0.72,0,1)',
        }}
      >
        {/* sticky header */}
        <div style={{
          padding: '22px 28px 16px', borderBottom: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0,
        }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, margin: 0 }}>Privacy Notice</h2>
            <p style={{ fontSize: 12, color: 'var(--text2)', marginTop: 4 }}>Last updated: May 16, 2026</p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 99,
              cursor: 'pointer', width: 32, height: 32, fontSize: 18, lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text2)',
            }}
          >×</button>
        </div>

        {/* scrollable content */}
        <div style={{ overflowY: 'auto', padding: '22px 28px 32px', flex: 1 }}>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 24 }}>
            Welcome to NothingLeft. This Privacy Policy explains how we collect, use, store, and protect your information when you use our charitable donation platform. By using the Platform, you agree to the practices described below.
          </p>
          {SECTIONS.map((s, i) => <Section key={i} s={s} />)}
        </div>
      </div>
    </div>
  );
}
