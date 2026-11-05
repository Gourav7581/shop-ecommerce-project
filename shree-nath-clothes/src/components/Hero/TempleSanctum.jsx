import { useState, useRef } from 'react';
import GlowingDiya from './GlowingDiya';
import { Sparkles } from 'lucide-react';
import './TempleSanctum.css';

export default function TempleSanctum() {
  const containerRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse-tracking 3D parallax
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Limit maximum tilt to 6 degrees for silky luxury elegance
    const rotateY = ((x - centerX) / centerX) * 6;
    const rotateX = -((y - centerY) / centerY) * 6;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className={`snc-sanctum-wrapper ${isHovered ? 'is-active' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Depth Card Container */}
      <div
        className="snc-sanctum-card"
        style={{
          transform: `perspective(1100px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
        }}
      >
        {/* Background Divine Halo / Rotating Sacred Mandala */}
        <div className="snc-sanctum__mandala-layer" aria-hidden="true">
          <svg viewBox="0 0 400 400" className="snc-mandala-svg">
            <circle cx="200" cy="200" r="180" stroke="url(#sanctumGold)" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.45" />
            <circle cx="200" cy="200" r="140" stroke="url(#sanctumGold)" strokeWidth="1" opacity="0.3" />
            {/* 16 Radiating Rays */}
            {Array.from({ length: 16 }).map((_, i) => (
              <line
                key={i}
                x1="200"
                y1="200"
                x2={200 + 175 * Math.cos((i * Math.PI) / 8)}
                y2={200 + 175 * Math.sin((i * Math.PI) / 8)}
                stroke="url(#sanctumGold)"
                strokeWidth="1"
                opacity="0.35"
              />
            ))}
            <defs>
              <linearGradient id="sanctumGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff3cf" />
                <stop offset="50%" stopColor="#dfb76c" />
                <stop offset="100%" stopColor="#9a6e1a" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Ambient Backlight Bloom */}
        <div className="snc-sanctum__glow-bloom"></div>

        {/* Hanging Golden Temple Bells */}
        <div className="snc-temple-bell snc-temple-bell--left">
          <div className="snc-bell-chain"></div>
          <svg viewBox="0 0 24 32" className="snc-bell-svg">
            <path d="M12 2 L12 8 M6 20 C6 14, 18 14, 18 20 L20 25 L4 25 Z" fill="url(#bellGold)" stroke="#60400a" strokeWidth="0.8" />
            <ellipse cx="12" cy="25" rx="8" ry="2.5" fill="#4a2e05" />
            <circle cx="12" cy="28" r="2" fill="#dfb76c" />
            <defs>
              <linearGradient id="bellGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff4d4" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#7a5210" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="snc-temple-bell snc-temple-bell--right">
          <div className="snc-bell-chain"></div>
          <svg viewBox="0 0 24 32" className="snc-bell-svg">
            <path d="M12 2 L12 8 M6 20 C6 14, 18 14, 18 20 L20 25 L4 25 Z" fill="url(#bellGold)" stroke="#60400a" strokeWidth="0.8" />
            <ellipse cx="12" cy="25" rx="8" ry="2.5" fill="#4a2e05" />
            <circle cx="12" cy="28" r="2" fill="#dfb76c" />
          </svg>
        </div>

        {/* Grand Temple Jharokha Archway (Mehraab) */}
        <div className="snc-sanctum__arch">
          <svg
            viewBox="0 0 460 560"
            className="snc-arch-svg"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="archGoldMain" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff8e3" />
                <stop offset="25%" stopColor="#f3d789" />
                <stop offset="55%" stopColor="#cfa135" />
                <stop offset="85%" stopColor="#875d14" />
                <stop offset="100%" stopColor="#ffd875" />
              </linearGradient>

              <linearGradient id="sanctumVelvet" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#4f0a17" />
                <stop offset="45%" stopColor="#32040d" />
                <stop offset="100%" stopColor="#180105" />
              </linearGradient>

              <pattern id="archJaliPattern" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M12 0 L24 12 L12 24 L0 12 Z" fill="none" stroke="#d4af37" strokeWidth="0.7" opacity="0.22" />
                <circle cx="12" cy="12" r="1.5" fill="#d4af37" opacity="0.35" />
              </pattern>

              <filter id="goldShine" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#f4dc94" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* Inner Sanctum Background with Diamond Jaali Lattice */}
            <path
              d="M48 530 L48 210 C48 110, 140 45, 230 45 C320 45, 412 110, 412 210 L412 530 Z"
              fill="url(#sanctumVelvet)"
              stroke="url(#archGoldMain)"
              strokeWidth="2.5"
            />
            {/* Jaali Texture Overlay */}
            <path
              d="M50 530 L50 210 C50 112, 142 48, 230 48 C318 48, 410 112, 410 210 L410 530 Z"
              fill="url(#archJaliPattern)"
            />

            {/* Kalash Top Spire / Finial */}
            <g className="snc-arch-kalash" filter="url(#goldShine)">
              <path d="M230 6 L236 24 L224 24 Z" fill="url(#archGoldMain)" />
              <circle cx="230" cy="27" r="5" fill="url(#archGoldMain)" />
              <path d="M221 34 Q230 29 239 34 L237 45 Q230 42 223 45 Z" fill="url(#archGoldMain)" />
            </g>

            {/* Outer Royal Arch Frame Pillars */}
            <rect x="28" y="190" width="22" height="340" rx="3" fill="url(#archGoldMain)" stroke="#52380c" strokeWidth="1" />
            <rect x="410" y="190" width="22" height="340" rx="3" fill="url(#archGoldMain)" stroke="#52380c" strokeWidth="1" />

            {/* Pillar Engravings & Capitols */}
            <ellipse cx="39" cy="190" rx="16" ry="6" fill="url(#archGoldMain)" />
            <ellipse cx="421" cy="190" rx="16" ry="6" fill="url(#archGoldMain)" />
            <ellipse cx="39" cy="530" rx="18" ry="7" fill="url(#archGoldMain)" />
            <ellipse cx="421" cy="530" rx="18" ry="7" fill="url(#archGoldMain)" />

            {/* Rajputana Multi-Cusp Cusped Arch Border (The Classical Mehraab) */}
            <path
              d="M48 215 
                 C58 175, 95 155, 125 170
                 C150 145, 185 130, 205 145
                 C218 120, 242 120, 255 145
                 C275 130, 310 145, 335 170
                 C365 155, 402 175, 412 215"
              stroke="url(#archGoldMain)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Inner Delicate Filigree Cusps */}
            <path
              d="M58 220 
                 C66 186, 98 168, 124 180
                 C146 158, 178 146, 196 158
                 C208 136, 252 136, 264 158
                 C282 146, 314 158, 336 180
                 C362 168, 394 186, 402 220"
              stroke="url(#archGoldMain)"
              strokeWidth="2"
              fill="none"
              opacity="0.85"
            />

            {/* Archway Golden Rosettes & Pearls */}
            <circle cx="230" cy="128" r="4.5" fill="#ffffff" stroke="url(#archGoldMain)" strokeWidth="1.5" />
            <circle cx="165" cy="148" r="3.5" fill="#f8e5b0" stroke="url(#archGoldMain)" strokeWidth="1" />
            <circle cx="295" cy="148" r="3.5" fill="#f8e5b0" stroke="url(#archGoldMain)" strokeWidth="1" />
            <circle cx="105" cy="172" r="3" fill="#f8e5b0" stroke="url(#archGoldMain)" strokeWidth="1" />
            <circle cx="355" cy="172" r="3" fill="#f8e5b0" stroke="url(#archGoldMain)" strokeWidth="1" />

            {/* Base Altar Step */}
            <path d="M20 530 L440 530 L425 550 L35 550 Z" fill="url(#archGoldMain)" stroke="#52380c" strokeWidth="1" />
          </svg>
        </div>

        {/* Centerpiece Sacred Darshan Visual */}
        <div className="snc-sanctum__centerpiece">
          
          {/* Sacred Shrinathji Tilak */}
          <div className="snc-shrine-tilak">
            <svg viewBox="0 0 100 130" className="snc-tilak-svg">
              <defs>
                <linearGradient id="tilakGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff8e3" />
                  <stop offset="50%" stopColor="#e5bf6c" />
                  <stop offset="100%" stopColor="#9a6e1a" />
                </linearGradient>
                <filter id="chibukGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ffffff" floodOpacity="0.8" />
                </filter>
              </defs>
              {/* Sacred U Tilak */}
              <path
                d="M32 15 C32 68, 68 68, 68 15"
                fill="none"
                stroke="url(#tilakGold)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Vermilion Kumkum Bindi */}
              <ellipse cx="50" cy="38" rx="4.5" ry="11" fill="#c41824" />
              {/* Divine Diamond Chibuk Jewel */}
              <circle cx="50" cy="85" r="4.2" fill="#ffffff" filter="url(#chibukGlow)" />
              <path d="M43 85 L50 78 L57 85 L50 92 Z" fill="#fff9e6" opacity="0.6" />
            </svg>
          </div>

          {/* Majestic Handcrafted Mor Pankh */}
          <div className="snc-shrine-feather">
            <svg viewBox="0 0 160 220" className="snc-feather-svg">
              <defs>
                <linearGradient id="quillGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6e4d0d" />
                  <stop offset="50%" stopColor="#dfb76c" />
                  <stop offset="100%" stopColor="#fff4d1" />
                </linearGradient>
                <linearGradient id="peacockEye" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#021c3b" />
                  <stop offset="40%" stopColor="#0d3b66" />
                  <stop offset="100%" stopColor="#051923" />
                </linearGradient>
                <radialGradient id="turquoiseRing" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00f2fe" />
                  <stop offset="70%" stopColor="#0575e6" />
                  <stop offset="100%" stopColor="#004e92" />
                </radialGradient>
                <linearGradient id="emeraldPlume" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00b09b" />
                  <stop offset="60%" stopColor="#1b5e20" />
                  <stop offset="100%" stopColor="#2e7d32" />
                </linearGradient>
              </defs>

              {/* Feather Plumes and Strands */}
              <g className="snc-feather-strands" stroke="#2e7d32" strokeWidth="1.2" opacity="0.85">
                {Array.from({ length: 18 }).map((_, i) => (
                  <path
                    key={i}
                    d={`M80 ${50 + i * 7} Q${40 - i * 1.5} ${35 + i * 6}, ${25 - i * 0.8} ${42 + i * 8}`}
                  />
                ))}
                {Array.from({ length: 18 }).map((_, i) => (
                  <path
                    key={`r-${i}`}
                    d={`M80 ${50 + i * 7} Q${120 + i * 1.5} ${35 + i * 6}, ${135 + i * 0.8} ${42 + i * 8}`}
                  />
                ))}
              </g>

              {/* Outer Golden Bronze Halo of the Eye */}
              <ellipse cx="80" cy="55" rx="36" ry="46" fill="#a17516" stroke="url(#quillGrad)" strokeWidth="1.5" />
              <ellipse cx="80" cy="55" rx="31" ry="40" fill="url(#emeraldPlume)" />

              {/* Turquoise Radiance */}
              <ellipse cx="80" cy="58" rx="22" ry="28" fill="url(#turquoiseRing)" />

              {/* Deep Sapphire Center Eye */}
              <ellipse cx="80" cy="62" rx="14" ry="17" fill="url(#peacockEye)" />
              <ellipse cx="80" cy="60" rx="9" ry="11" fill="#00091a" />
              
              {/* Eye Light Shimmer */}
              <circle cx="77" cy="57" r="2.5" fill="#ffffff" opacity="0.8" />

              {/* Golden Quill Stem */}
              <path
                d="M80 50 Q79 130 78 215"
                fill="none"
                stroke="url(#quillGrad)"
                strokeWidth="3.2"
                strokeLinecap="round"
              />

              {/* Brooch Jewel */}
              <circle cx="78" cy="180" r="10" fill="url(#quillGrad)" stroke="#4a3006" strokeWidth="1" />
              <circle cx="78" cy="180" r="6" fill="#c41824" />
              <circle cx="78" cy="180" r="2" fill="#ffffff" />
            </svg>
          </div>

          {/* Sacred Golden Bansuri */}
          <div className="snc-shrine-bansuri">
            <svg viewBox="0 0 340 70" className="snc-bansuri-svg">
              <defs>
                <linearGradient id="bansuriGold" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fff8e5" />
                  <stop offset="30%" stopColor="#dfb76c" />
                  <stop offset="70%" stopColor="#ba8b25" />
                  <stop offset="100%" stopColor="#664408" />
                </linearGradient>
              </defs>
              {/* Flute Main Tube */}
              <rect x="25" y="26" width="290" height="15" rx="7.5" fill="url(#bansuriGold)" stroke="#4d3205" strokeWidth="1.2" />

              {/* Embossed Gold Rings */}
              <rect x="45" y="25" width="4" height="17" fill="#fff5d4" />
              <rect x="52" y="25" width="4" height="17" fill="#fff5d4" />
              <rect x="290" y="25" width="4" height="17" fill="#fff5d4" />
              <rect x="297" y="25" width="4" height="17" fill="#fff5d4" />

              {/* Tone Holes with Ruby Inlays */}
              {[120, 150, 175, 200, 225, 250].map((hx, idx) => (
                <g key={idx}>
                  <circle cx={hx} cy="33.5" r="3.2" fill="#2d1c04" />
                  <circle cx={hx} cy="33.5" r="1.8" fill="#c41824" />
                  <circle cx={hx - 0.7} cy="32.5" r="0.7" fill="#ffffff" opacity="0.8" />
                </g>
              ))}

              {/* Blowing Hole */}
              <circle cx="75" cy="33.5" r="3.8" fill="#1b1002" stroke="#dfb76c" strokeWidth="0.8" />

              {/* Hanging Royal Silk Latkan */}
              <path d="M48 42 Q45 55 42 66" stroke="#c41824" strokeWidth="2" fill="none" />
              <circle cx="42" cy="66" r="3.5" fill="#fdfcf8" stroke="#dfb76c" strokeWidth="0.8" />
            </svg>
          </div>

          {/* Royal Poshaak Presentation Layer */}
          <div className="snc-shrine-poshaak">
            <svg viewBox="0 0 360 200" className="snc-poshaak-svg">
              <defs>
                <linearGradient id="poshaakVelvet" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#690e1f" />
                  <stop offset="45%" stopColor="#480713" />
                  <stop offset="85%" stopColor="#2c030a" />
                  <stop offset="100%" stopColor="#1a0105" />
                </linearGradient>

                <linearGradient id="zariBorder" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fff0bd" />
                  <stop offset="50%" stopColor="#dfb76c" />
                  <stop offset="100%" stopColor="#9a6e1a" />
                </linearGradient>

                <filter id="motiShine" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#ffffff" floodOpacity="0.7" />
                </filter>
              </defs>

              {/* Ornate Velvet Ghagra Spread */}
              <path
                d="M130 50 Q180 30 230 50 L285 160 Q180 185 75 160 Z"
                fill="url(#poshaakVelvet)"
                stroke="url(#zariBorder)"
                strokeWidth="2"
              />

              {/* Heavy Golden Zardozi Scalloped Hem */}
              <path
                d="M75 160 Q110 178 145 168 Q180 182 215 168 Q250 178 285 160"
                fill="none"
                stroke="url(#zariBorder)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M75 160 Q110 178 145 168 Q180 182 215 168 Q250 178 285 160"
                fill="none"
                stroke="#664609"
                strokeWidth="1.5"
                strokeDasharray="2 3"
              />

              {/* Hand-embroidered Gold Butis */}
              {[
                { x: 140, y: 90 }, { x: 180, y: 80 }, { x: 220, y: 90 },
                { x: 120, y: 125 }, { x: 160, y: 120 }, { x: 200, y: 120 }, { x: 240, y: 125 }
              ].map((b, i) => (
                <g key={i}>
                  <circle cx={b.x} cy={b.y} r="3" fill="url(#zariBorder)" />
                  <circle cx={b.x} cy={b.y} r="1" fill="#c41824" />
                </g>
              ))}

              {/* Layered Pearl Strands */}
              <g filter="url(#motiShine)">
                <path d="M142 55 Q180 82 218 55" fill="none" stroke="#fffcf2" strokeWidth="2.5" strokeDasharray="3.5 3" />
                <path d="M136 68 Q180 102 224 68" fill="none" stroke="#fffcf2" strokeWidth="3" strokeDasharray="4 3.5" />
                <circle cx="180" cy="102" r="4.5" fill="#c41824" stroke="url(#zariBorder)" strokeWidth="1" />
              </g>

              {/* Golden Lotus Throne */}
              <g className="snc-lotus-throne">
                <path d="M60 170 Q180 160 300 170 Q180 195 60 170 Z" fill="url(#zariBorder)" stroke="#4d3509" strokeWidth="1" />
                {Array.from({ length: 9 }).map((_, pi) => {
                  const px = 85 + pi * 24;
                  return (
                    <path
                      key={pi}
                      d={`M${px - 10} 170 Q${px} 158 ${px + 10} 170 Z`}
                      fill="url(#zariBorder)"
                      stroke="#4a2e05"
                      strokeWidth="0.8"
                    />
                  );
                })}
              </g>
            </svg>
          </div>

        </div>

        {/* Flanking Soft Glowing Diyas */}
        <div className="snc-sanctum__diya snc-sanctum__diya--left">
          <GlowingDiya size={110} label="Akhand Jyoti Diya - Vama Bhag" />
          <span className="snc-diya-pedestal"></span>
        </div>

        <div className="snc-sanctum__diya snc-sanctum__diya--right">
          <GlowingDiya size={110} label="Akhand Jyoti Diya - Dakshina Bhag" />
          <span className="snc-diya-pedestal"></span>
        </div>

        {/* Floating Devotional Badge */}
        <div className="snc-sanctum__floating-badge">
          <Sparkles size={14} className="snc-gold-icon" />
          <span>Sanctified Artisan Crafted • Vrindavan & Nathdwara</span>
        </div>

      </div>
    </div>
  );
}
