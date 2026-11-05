import { useRef, useMemo, useState, useEffect, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Fallback CSS particles in case WebGL is unavailable or disabled
const STATIC_CSS_PARTICLES = Array.from({ length: 28 }).map((_, i) => ({
  id: i,
  left: `${(i * 3.7 + 5) % 95}%`,
  top: `${(i * 7.1 + 10) % 90}%`,
  size: `${2 + (i % 4) * 1.5}px`,
  delay: `${(i * 0.35) % 4}s`,
  duration: `${4 + (i % 5)}s`
}));

function CSSGoldenParticles() {
  return (
    <div className="snc-css-particles" aria-hidden="true">
      {STATIC_CSS_PARTICLES.map((p) => (
        <span
          key={p.id}
          className="snc-css-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration
          }}
        />
      ))}
    </div>
  );
}

// Pseudo-random generator with fixed seed to satisfy pure render rules
function createParticleData(count) {
  const pos = new Float32Array(count * 3);
  const sp = new Float32Array(count);

  let seed = 42;
  const pseudoRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let i = 0; i < count; i++) {
    pos[i * 3] = (pseudoRandom() - 0.5) * 18;
    pos[i * 3 + 1] = (pseudoRandom() - 0.5) * 12;
    pos[i * 3 + 2] = (pseudoRandom() - 0.5) * 8;
    sp[i] = 0.2 + pseudoRandom() * 0.6;
  }

  return { pos, sp };
}

const PARTICLE_COUNT = 75;
const STATIC_PARTICLE_DATA = createParticleData(PARTICLE_COUNT);

// Three.js Point Cloud for golden ambient motes
function ParticleCloud({ mouseRef }) {
  const pointsRef = useRef();

  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 240, 1)');
    gradient.addColorStop(0.25, 'rgba(248, 228, 165, 0.9)');
    gradient.addColorStop(0.6, 'rgba(212, 175, 55, 0.4)');
    gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    const posArray = geometry.attributes.position.array;
    const speeds = STATIC_PARTICLE_DATA.sp;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Gentle upward drift
      posArray[i * 3 + 1] += speeds[i] * delta * 0.85;

      // Gentle horizontal sway
      posArray[i * 3] += Math.sin(state.clock.elapsedTime + i) * delta * 0.15;

      // Wrap around screen boundaries
      if (posArray[i * 3 + 1] > 6.5) {
        posArray[i * 3 + 1] = -6.5;
      }
    }

    geometry.attributes.position.needsUpdate = true;

    // Subtle parallax response to mouse
    if (mouseRef && mouseRef.current) {
      const targetRotX = mouseRef.current.y * 0.12;
      const targetRotY = mouseRef.current.x * 0.16;
      pointsRef.current.rotation.x += (targetRotX - pointsRef.current.rotation.x) * 0.05;
      pointsRef.current.rotation.y += (targetRotY - pointsRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[STATIC_PARTICLE_DATA.pos, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.22}
        map={particleTexture}
        transparent
        alphaTest={0.001}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#fae5aa"
      />
    </points>
  );
}

// Error Boundary to ensure zero crashes if WebGL is disabled or unsupported
class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn('WebGL fallback activated:', error);
  }

  render() {
    if (this.state.hasError) {
      return <CSSGoldenParticles />;
    }
    return this.props.children;
  }
}

function checkWebGLSupport() {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

export default function GoldenParticles() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const [webGLSupported] = useState(checkWebGLSupport);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!webGLSupported) {
    return <CSSGoldenParticles />;
  }

  return (
    <div className="snc-particles-container" aria-hidden="true">
      <WebGLErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 60 }}
          dpr={[1, 1.6]}
          gl={{
            powerPreference: 'low-power',
            antialias: false,
            alpha: true
          }}
          style={{ pointerEvents: 'none' }}
        >
          <ParticleCloud mouseRef={mouseRef} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
