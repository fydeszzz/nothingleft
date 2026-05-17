import { useState } from 'react';

// TODO: Paste your Google Apps Script Web App URL here after setup
const SHEET_URL = '';

function Field({ label, value, onChange, required, type = 'text', mt = 0 }) {
  return (
    <div style={{ marginTop: mt }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 5 }}>
        {label}
      </label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)} required={required}
        style={{
          width: '100%', borderRadius: 8, border: '1.5px solid var(--border)',
          background: 'var(--bg2)', padding: '9px 12px', fontSize: 14,
          fontFamily: 'var(--font-body)', color: 'var(--text)',
          boxSizing: 'border-box', outline: 'none',
          transition: 'border-color 0.15s',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
        onBlur={e => e.target.style.borderColor = 'var(--border)'}
      />
    </div>
  );
}

export default function JoinListModal({ onClose }) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', organization: '', email: '', website: '', note: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (SHEET_URL) {
        const body = new FormData();
        Object.entries(form).forEach(([k, v]) => body.append(k, v));
        await fetch(SHEET_URL, { method: 'POST', body, mode: 'no-cors' });
      }
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

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
          width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto',
          boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
          animation: 'fadeScaleIn 0.22s cubic-bezier(0.32,0.72,0,1)',
        }}
      >
        {/* Dark header */}
        <div style={{ background: '#111', borderRadius: '20px 20px 0 0', padding: '28px 28px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div>
              <h2 style={{
                color: '#fff', fontFamily: 'var(--font-display)',
                fontSize: 26, fontWeight: 700, margin: 0, lineHeight: 1.2,
              }}>Join Our List</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 10, lineHeight: 1.6 }}>
                Don't see your organization in our search results, or accept donation types we don't cover yet?
                Reach out — we'll get you added.
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                flexShrink: 0, background: 'rgba(255,255,255,0.12)', border: 'none',
                borderRadius: 99, color: '#fff', cursor: 'pointer',
                width: 32, height: 32, fontSize: 20, lineHeight: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >×</button>
          </div>
        </div>

        {/* Form body */}
        <div style={{ padding: '24px 28px 32px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>✅</div>
              <p style={{ fontWeight: 700, fontSize: 17 }}>Thank you!</p>
              <p style={{ color: 'var(--text2)', fontSize: 14, marginTop: 6, lineHeight: 1.5 }}>
                We've received your submission and will be in touch shortly.
              </p>
              <button
                onClick={onClose}
                style={{
                  marginTop: 22, background: '#111', color: '#fff', border: 'none',
                  borderRadius: 10, padding: '11px 28px', fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'var(--font-body)',
                }}
              >Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Field label="First name *" value={form.firstName} onChange={v => set('firstName', v)} required />
                <Field label="Last name *" value={form.lastName} onChange={v => set('lastName', v)} required />
              </div>
              <Field label="Organization" value={form.organization} onChange={v => set('organization', v)} mt={14} />
              <Field label="Email *" type="email" value={form.email} onChange={v => set('email', v)} required mt={14} />
              <Field label="Website" value={form.website} onChange={v => set('website', v)} mt={14} />
              <div style={{ marginTop: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 5 }}>
                  Note
                </label>
                <textarea
                  value={form.note}
                  onChange={e => set('note', e.target.value)}
                  rows={3}
                  placeholder="Tell us about the types of donations you accept, your service area, or anything else we should know..."
                  style={{
                    width: '100%', borderRadius: 8, border: '1.5px solid var(--border)',
                    background: 'var(--bg2)', padding: '9px 12px', fontSize: 14,
                    fontFamily: 'var(--font-body)', color: 'var(--text)',
                    resize: 'vertical', boxSizing: 'border-box', outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  marginTop: 22, width: '100%', background: '#111', color: '#fff',
                  border: 'none', borderRadius: 10, padding: '13px',
                  fontSize: 15, fontWeight: 600, cursor: submitting ? 'wait' : 'pointer',
                  opacity: submitting ? 0.7 : 1, fontFamily: 'var(--font-body)',
                  transition: 'opacity 0.15s',
                }}
              >{submitting ? 'Submitting…' : 'Submit'}</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
