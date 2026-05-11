import { LOGO_COLORS, LOGO_ROTATIONS, LOGO_SIZES } from '../constants/categories';

function CrayonLetter({ ch, color, rot, sz, fs }) {
  return (
    <span style={{
      display: 'inline-block',
      color,
      transform: `rotate(${rot}deg)`,
      fontSize: typeof fs === 'string' ? `calc(${fs} * ${sz})` : fs * sz,
      lineHeight: 1,
      margin: '0 0.01em',
      textShadow: `0.5px 0 0 ${color},-0.5px 0 0 ${color},0 0.5px 0 ${color},0 -0.5px 0 ${color}`,
      filter: 'drop-shadow(0 2px 0 rgba(0,0,0,0.08))',
    }}>{ch}</span>
  );
}

export default function ColorfulLogo({ size = 24, big = false }) {
  const word1 = 'Nothing', word2 = 'Left';
  const fs = big ? 'clamp(64px, 14vw, 200px)' : size;
  const fontFam = "'Sue Ellen Francisco', 'Gloria Hallelujah', cursive";

  if (big) {
    return (
      <h1 style={{
        fontFamily: fontFam,
        fontSize: fs, fontWeight: 400, lineHeight: 0.95,
        margin: 0, transform: 'rotate(-2deg)',
        textShadow: '0 4px 24px rgba(0,0,0,0.35)',
        textAlign: 'center',
        letterSpacing: '0.02em',
      }}>
        <span style={{ display: 'inline-block' }}>
          {word1.split('').map((c, i) => (
            <CrayonLetter key={'a' + i} ch={c} color={LOGO_COLORS[i]} rot={LOGO_ROTATIONS[i]} sz={LOGO_SIZES[i]} fs={fs} />
          ))}
        </span><br />
        <span style={{ display: 'inline-block' }}>
          {word2.split('').map((c, i) => (
            <CrayonLetter key={'b' + i} ch={c} color={LOGO_COLORS[i + word1.length]} rot={LOGO_ROTATIONS[i + word1.length]} sz={LOGO_SIZES[i + word1.length]} fs={fs} />
          ))}
        </span>
      </h1>
    );
  }
  return (
    <span style={{
      fontFamily: fontFam,
      fontWeight: 400, fontSize: size, lineHeight: 1,
      transform: 'rotate(-2deg)', display: 'inline-block',
      letterSpacing: '0.02em',
    }}>
      <span>{word1.split('').map((c, i) => (
        <CrayonLetter key={'a' + i} ch={c} color={LOGO_COLORS[i]} rot={LOGO_ROTATIONS[i] * 0.5} sz={LOGO_SIZES[i]} fs={size} />
      ))}</span>
      <span style={{ display: 'inline-block', width: '0.3em' }} />
      <span>{word2.split('').map((c, i) => (
        <CrayonLetter key={'b' + i} ch={c} color={LOGO_COLORS[i + word1.length]} rot={LOGO_ROTATIONS[i + word1.length] * 0.5} sz={LOGO_SIZES[i + word1.length]} fs={size} />
      ))}</span>
    </span>
  );
}
