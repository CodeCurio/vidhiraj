import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Vidhiraj Global Impex — Indian Handicraft Exporter';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1C1C1C 0%, #3a1a06 50%, #1C1C1C 100%)',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Gold accent bar top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: '#D4AF37', display: 'flex' }} />

        {/* Tagline */}
        <div style={{ color: '#D4AF37', fontSize: '18px', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '20px', display: 'flex' }}>
          Exporting Dreams
        </div>

        {/* Company name */}
        <div style={{ color: '#FFF8F0', fontSize: '58px', fontWeight: 'bold', textAlign: 'center', lineHeight: 1.15, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          Vidhiraj Global Impex
        </div>

        {/* Group attribution */}
        <div style={{ color: '#aaa', fontSize: '17px', fontStyle: 'italic', marginTop: '10px', display: 'flex' }}>
          A Venture of Vidhiraj Group of Companies
        </div>

        {/* Divider */}
        <div style={{ width: '80px', height: '3px', background: '#8B4513', margin: '24px 0', display: 'flex' }} />

        {/* Description */}
        <div style={{ color: '#e0c8b0', fontSize: '24px', textAlign: 'center', maxWidth: '800px', lineHeight: 1.5, display: 'flex' }}>
          Handmade Wooden Artifacts · Brass Figurines · Coconut Handicrafts
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '60px', marginTop: '36px' }}>
          {[['30+', 'Countries'], ['10K+', 'Orders'], ['200+', 'Products']].map(([val, label]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ color: '#D4AF37', fontSize: '32px', fontWeight: 'bold' }}>{val}</span>
              <span style={{ color: '#aaa', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{ position: 'absolute', bottom: '28px', color: '#666', fontSize: '16px', letterSpacing: '2px', display: 'flex' }}>
          vidhirajglobalimpex.com
        </div>

        {/* Gold accent bar bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '6px', background: '#D4AF37', display: 'flex' }} />
      </div>
    ),
    { ...size }
  );
}
