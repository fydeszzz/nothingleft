import { useState } from 'react';
import PrivacyModal from './PrivacyModal';

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '18px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 16, flexWrap: 'wrap',
        background: 'var(--bg2)', fontSize: 13, color: 'var(--text2)',
      }}>
        <button
          onClick={() => setShowPrivacy(true)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text2)', fontSize: 13, padding: 0,
            textDecoration: 'underline',
          }}
        >Privacy Notice</button>
        <span style={{ opacity: 0.4 }}>|</span>
        <span>Copyright © 2026 NothingLeft, All Rights Reserved</span>
      </footer>
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
    </>
  );
}
