import { use3DMode } from '@/hooks/use-3d-mode';

export default function ParticleBackground() {
  const { mode3D } = use3DMode();
  
  // Get particle count from 3D mode settings
  const getParticleCount = () => {
    if (!mode3D.isEnabled) return 0;
    switch (mode3D.particleDensity) {
      case 'low': return 25;
      case 'medium': return 50;
      case 'high': return 100;
      default: return 50;
    }
  };

  const particleCount = getParticleCount();
  
  // Generate particles with random positions and delays
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 25,
    size: 2 + Math.random() * 4,
  }));

  if (particleCount === 0) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Animated background gradient only */}
        <div className="absolute inset-0 animate-pulse-glow mode-3d-transition" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 animate-pulse-glow mode-3d-transition" />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-60 animate-float particle-transition"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            filter: 'blur(1px)',
            background: `var(--particle-color)`,
            boxShadow: `0 0 ${particle.size * 2}px var(--particle-color)`,
          }}
        />
      ))}

      {/* Moving light beams */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-current to-transparent opacity-30 animate-pulse particle-transition"
          style={{ 
            animationDelay: '0s', 
            animationDuration: '4s',
            color: 'var(--primary-color)'
          }}
        />
        <div 
          className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-current to-transparent opacity-30 animate-pulse particle-transition"
          style={{ 
            animationDelay: '2s', 
            animationDuration: '4s',
            color: 'var(--accent-color)'
          }}
        />
        <div 
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-20 animate-pulse particle-transition"
          style={{ 
            animationDelay: '1s', 
            animationDuration: '6s',
            color: 'var(--secondary-color)'
          }}
        />
      </div>

      {/* Large floating orbs */}
      <div 
        className="absolute top-1/4 left-1/6 w-32 h-32 rounded-full animate-float particle-transition"
        style={{ 
          animationDelay: '0s', 
          animationDuration: '20s',
          background: `radial-gradient(circle, var(--primary-color) 0%, transparent 70%)`,
          opacity: 0.1
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/6 w-24 h-24 rounded-full animate-float particle-transition"
        style={{ 
          animationDelay: '10s', 
          animationDuration: '25s',
          background: `radial-gradient(circle, var(--accent-color) 0%, transparent 70%)`,
          opacity: 0.1
        }}
      />
      <div 
        className="absolute top-3/4 left-2/3 w-20 h-20 rounded-full animate-float particle-transition"
        style={{ 
          animationDelay: '5s', 
          animationDuration: '18s',
          background: `radial-gradient(circle, var(--secondary-color) 0%, transparent 70%)`,
          opacity: 0.1
        }}
      />

      {/* Style-specific effects */}
      {mode3D.style === 'cyberpunk' && (
        <>
          {/* Cyberpunk grid lines */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(var(--primary-color) 1px, transparent 1px),
                  linear-gradient(90deg, var(--primary-color) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                animation: 'pulse 4s ease-in-out infinite'
              }}
            />
          </div>
          {/* Cyberpunk scan lines */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, var(--primary-color) 3px, var(--primary-color) 4px)',
              animation: 'float 10s ease-in-out infinite'
            }}
          />
        </>
      )}

      {mode3D.style === 'holographic' && (
        <>
          {/* Holographic interference patterns */}
          <div className="absolute inset-0 opacity-15">
            <div 
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(circle at 20% 80%, var(--primary-color) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, var(--secondary-color) 0%, transparent 50%),
                  radial-gradient(circle at 40% 40%, var(--accent-color) 0%, transparent 50%)
                `,
                animation: 'pulse-glow 6s ease-in-out infinite'
              }}
            />
          </div>
        </>
      )}

      {mode3D.style === 'neon' && (
        <>
          {/* Neon flicker effect */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, var(--primary-color) 0%, transparent 30%),
                  radial-gradient(circle at 70% 70%, var(--secondary-color) 0%, transparent 30%)
                `,
                animation: 'glow 2s ease-in-out infinite alternate'
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
