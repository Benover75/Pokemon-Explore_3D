import { use3DMode } from '@/hooks/use-3d-mode';

export default function FloatingElements() {
  const { mode3D } = use3DMode();

  if (!mode3D.isEnabled) {
    return null; // Don't render floating elements when 3D mode is disabled
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Large 3D floating orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-32 h-32 glass rounded-full animate-float card-3d floating-transition"
        style={{ 
          animationDelay: '0s',
          background: `radial-gradient(circle at 30% 30%, var(--primary-color), transparent)`,
          boxShadow: `0 0 60px var(--primary-color), inset 0 0 30px rgba(255, 255, 255, 0.1)`
        }}
      />
      
      <div 
        className="absolute top-3/4 right-1/4 w-24 h-24 glass rounded-full animate-float card-3d floating-transition" 
        style={{ 
          animationDelay: '3s',
          background: `radial-gradient(circle at 30% 30%, var(--accent-color), transparent)`,
          boxShadow: `0 0 40px var(--accent-color), inset 0 0 20px rgba(255, 255, 255, 0.1)`
        }}
      />
      
      <div 
        className="absolute bottom-1/4 left-1/3 w-20 h-20 glass rounded-full animate-float card-3d floating-transition" 
        style={{ 
          animationDelay: '6s',
          background: `radial-gradient(circle at 30% 30%, var(--secondary-color), transparent)`,
          boxShadow: `0 0 35px var(--secondary-color), inset 0 0 20px rgba(255, 255, 255, 0.1)`
        }}
      />

      {/* Medium floating cubes with 3D transform */}
      <div 
        className="absolute top-1/2 right-1/6 w-16 h-16 glass animate-float floating-transition"
        style={{ 
          animationDelay: '2s',
          borderRadius: '8px',
          transform: 'rotateX(15deg) rotateY(25deg)',
          background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`,
          boxShadow: `0 0 30px var(--primary-color), inset 0 0 15px rgba(255, 255, 255, 0.1)`
        }}
      />

      <div 
        className="absolute top-1/6 right-1/3 w-12 h-12 glass animate-float floating-transition"
        style={{ 
          animationDelay: '4s',
          borderRadius: '6px',
          transform: 'rotateX(-10deg) rotateY(-20deg)',
          background: `linear-gradient(135deg, var(--accent-color), var(--primary-color))`,
          boxShadow: `0 0 25px var(--accent-color), inset 0 0 12px rgba(255, 255, 255, 0.1)`
        }}
      />

      {/* Small prismatic elements */}
      <div 
        className="absolute top-2/3 left-1/6 w-8 h-8 glass animate-float floating-transition"
        style={{ 
          animationDelay: '1s',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          background: `linear-gradient(135deg, var(--secondary-color), transparent)`,
          boxShadow: `0 0 20px var(--secondary-color)`
        }}
      />

      <div 
        className="absolute top-1/3 left-2/3 w-10 h-10 glass animate-float floating-transition"
        style={{ 
          animationDelay: '5s',
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          background: `linear-gradient(135deg, var(--primary-color), transparent)`,
          boxShadow: `0 0 20px var(--primary-color)`
        }}
      />

      {/* Rotating ring elements */}
      <div 
        className="absolute top-1/5 left-1/2 w-24 h-24 animate-rotate-slow floating-transition"
        style={{ animationDelay: '0s' }}
      >
        <div 
          className="w-full h-full rounded-full border-2 border-opacity-30"
          style={{ 
            borderColor: 'var(--primary-color)',
            borderStyle: 'dashed',
            boxShadow: `0 0 30px var(--primary-color)`
          }}
        />
      </div>

      <div 
        className="absolute bottom-1/5 right-1/2 w-18 h-18 animate-rotate-slow floating-transition"
        style={{ animationDelay: '3s', animationDirection: 'reverse' }}
      >
        <div 
          className="w-full h-full rounded-full border-2 border-opacity-30"
          style={{ 
            borderColor: 'var(--accent-color)',
            borderStyle: 'dotted',
            boxShadow: `0 0 25px var(--accent-color)`
          }}
        />
      </div>

      {/* Style-specific floating elements */}
      {mode3D.style === 'cyberpunk' && (
        <>
          {/* Cyberpunk data streams */}
          <div 
            className="absolute top-1/4 right-1/4 w-2 h-32 animate-float floating-transition"
            style={{ 
              animationDelay: '1s',
              background: `linear-gradient(to bottom, transparent, var(--primary-color), transparent)`,
              boxShadow: `0 0 10px var(--primary-color)`
            }}
          />
          <div 
            className="absolute bottom-1/4 left-1/4 w-2 h-24 animate-float floating-transition"
            style={{ 
              animationDelay: '4s',
              background: `linear-gradient(to bottom, transparent, var(--accent-color), transparent)`,
              boxShadow: `0 0 10px var(--accent-color)`
            }}
          />
        </>
      )}

      {mode3D.style === 'holographic' && (
        <>
          {/* Holographic interference rings */}
          <div 
            className="absolute top-1/2 left-1/2 w-40 h-40 animate-rotate-slow floating-transition"
            style={{ 
              animationDelay: '2s',
              transform: 'translate(-50%, -50%)',
              background: `
                conic-gradient(from 0deg, transparent, var(--primary-color), transparent, var(--secondary-color), transparent)
              `,
              borderRadius: '50%',
              opacity: 0.3
            }}
          />
        </>
      )}

      {mode3D.style === 'neon' && (
        <>
          {/* Neon flickering elements */}
          <div 
            className="absolute top-1/3 left-1/3 w-6 h-6 animate-float floating-transition"
            style={{ 
              animationDelay: '0.5s',
              background: 'var(--primary-color)',
              borderRadius: '50%',
              boxShadow: `0 0 15px var(--primary-color)`,
              animation: 'glow 1s ease-in-out infinite alternate'
            }}
          />
          <div 
            className="absolute bottom-1/3 right-1/3 w-4 h-4 animate-float floating-transition"
            style={{ 
              animationDelay: '2.5s',
              background: 'var(--secondary-color)',
              borderRadius: '50%',
              boxShadow: `0 0 10px var(--secondary-color)`,
              animation: 'glow 1.5s ease-in-out infinite alternate'
            }}
          />
        </>
      )}
    </div>
  );
}
