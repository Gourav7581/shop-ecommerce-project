import { useState } from 'react';
import './GlowingDiya.css';

export default function GlowingDiya({ size = 120, label = 'Sacred Akhand Diya', className = '' }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`snc-diya ${isHovered ? 'is-hovered' : ''} ${className}`}
      style={{ width: size, height: size * 1.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={label}
    >
      {/* Radiant Ambient Light Aura */}
      <div className="snc-diya__ambient-glow"></div>
      <div className="snc-diya__ambient-halo"></div>

      {/* Realistic Multi-layered Animated Diya SVG */}
      <svg
        viewBox="0 0 140 145"
        className="snc-diya__svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Antique Brass Diya Gradient */}
          <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff0c2" />
            <stop offset="25%" stopColor="#dfb76c" />
            <stop offset="60%" stopColor="#a3761e" />
            <stop offset="90%" stopColor="#69480b" />
            <stop offset="100%" stopColor="#412904" />
          </linearGradient>

          {/* Diya Rim Highlight */}
          <linearGradient id="rimGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#966a1a" />
            <stop offset="35%" stopColor="#fff2c9" />
            <stop offset="70%" stopColor="#dfb76c" />
            <stop offset="100%" stopColor="#7a5312" />
          </linearGradient>

          {/* Ghee Oil Surface Gradient */}
          <radialGradient id="gheeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffebad" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#cfa030" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#573603" stopOpacity="0.9" />
          </radialGradient>

          {/* Outer Warm Flame Gradient */}
          <radialGradient id="outerFlameGrad" cx="50%" cy="80%" r="70%">
            <stop offset="0%" stopColor="#ff6200" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ff9a00" stopOpacity="0.7" />
            <stop offset="85%" stopColor="#ffc83b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffd868" stopOpacity="0" />
          </radialGradient>

          {/* Core Golden Flame Gradient */}
          <linearGradient id="coreFlameGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#ff4500" />
            <stop offset="30%" stopColor="#ffaa00" />
            <stop offset="75%" stopColor="#fff080" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          {/* Inner Intense White Flame */}
          <linearGradient id="whiteFlameGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#ffe680" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          <filter id="flameBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="auraGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Ambient Flame Aura in SVG */}
        <circle
          cx="70"
          cy="46"
          r="38"
          fill="url(#outerFlameGrad)"
          filter="url(#auraGlow)"
          className="snc-flame__halo-pulse"
        />

        {/* Base Stand & Platter */}
        <g className="snc-diya__base">
          {/* Base bottom ring */}
          <ellipse cx="70" cy="132" rx="34" ry="7" fill="url(#brassGrad)" />
          <ellipse cx="70" cy="131" rx="30" ry="5.5" fill="#462c07" />
          
          {/* Center pillar stem */}
          <path
            d="M58 130 C64 120, 63 108, 62 100 L78 100 C77 108, 76 120, 82 130 Z"
            fill="url(#brassGrad)"
          />
          <ellipse cx="70" cy="100" rx="14" ry="3.5" fill="#2d1c04" />
          
          {/* Ornate middle ring */}
          <ellipse cx="70" cy="115" rx="12" ry="3" fill="url(#rimGrad)" />
        </g>

        {/* Main Diya Cup / Bowl */}
        <g className="snc-diya__bowl">
          {/* Outer Bowl Body */}
          <path
            d="M22 84 C24 114, 116 114, 118 84 C120 74, 98 75, 70 75 C42 75, 20 74, 22 84 Z"
            fill="url(#brassGrad)"
            stroke="#261703"
            strokeWidth="1.2"
          />

          {/* Engraved Floral / Petal Pattern on Brass Cup */}
          <path
            d="M40 92 Q55 106 70 92 Q85 106 100 92"
            stroke="url(#rimGrad)"
            strokeWidth="1.8"
            fill="none"
            opacity="0.85"
          />
          <circle cx="70" cy="98" r="2.2" fill="#fff3cf" />
          <circle cx="55" cy="96" r="1.6" fill="#dfb76c" />
          <circle cx="85" cy="96" r="1.6" fill="#dfb76c" />

          {/* Top Lip / Rim Ellipse */}
          <ellipse cx="70" cy="80" rx="46" ry="11" fill="url(#rimGrad)" stroke="#523608" strokeWidth="1" />

          {/* Oil / Ghee Interior Basin */}
          <ellipse cx="70" cy="81" rx="40" ry="8" fill="url(#gheeGrad)" />
          
          {/* Sacred Wick (Rui Batti / Cotton Baati) */}
          <path
            d="M68 83 Q69 66 70 58 Q71 66 72 83 Z"
            fill="#382109"
            stroke="#1b0f02"
            strokeWidth="0.8"
          />
          {/* Ember Tip of Wick */}
          <ellipse cx="70" cy="58" rx="2.5" ry="3.5" fill="#ff4400" />
          <circle cx="70" cy="57" r="1.5" fill="#ffe28a" />
        </g>

        {/* Living, Flickering Devotional Flame */}
        <g className="snc-flame-group" filter="url(#flameBlur)">
          {/* Flame Layer 1: Outer Warm Glow */}
          <path
            className="snc-flame__outer"
            d="M70 14 C56 34, 52 50, 60 58 C66 64, 74 64, 80 58 C88 50, 84 34, 70 14 Z"
            fill="url(#coreFlameGrad)"
          />

          {/* Flame Layer 2: Core Golden Light */}
          <path
            className="snc-flame__mid"
            d="M70 23 C60 38, 58 48, 64 54 C68 58, 72 58, 76 54 C82 48, 80 38, 70 23 Z"
            fill="url(#coreFlameGrad)"
          />

          {/* Flame Layer 3: Pure White-Hot Center */}
          <path
            className="snc-flame__inner"
            d="M70 33 C64 42, 63 50, 67 54 C69 56, 71 56, 73 54 C77 50, 76 42, 70 33 Z"
            fill="url(#whiteFlameGrad)"
          />
        </g>

        {/* Floating Sparks */}
        <circle cx="68" cy="20" r="1.2" fill="#fff7df" className="snc-spark snc-spark--1" />
        <circle cx="73" cy="16" r="1" fill="#ffe188" className="snc-spark snc-spark--2" />
      </svg>
    </div>
  );
}
