export default function Pin({ size = 18, inline = false, light = false }) {
  return (
    <img src="/images/pin.png" alt="" style={{
      width: size, height: size, objectFit: 'contain',
      display: 'inline-block',
      verticalAlign: 'middle',
      filter: light ? 'brightness(0) invert(1)' : 'none',
      flexShrink: 0,
    }} />
  );
}
