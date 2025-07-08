import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Mode3DState {
  isEnabled: boolean;
  style: 'cosmic' | 'cyberpunk' | 'holographic' | 'neon';
  depth: 'low' | 'medium' | 'high';
  enhancedAnimations: boolean;
  particleDensity: 'low' | 'medium' | 'high';
  perspective: boolean;
  neonIntensity: 'low' | 'medium' | 'high';
}

interface Mode3DContextType {
  mode3D: Mode3DState;
  toggle3DMode: () => void;
  setStyle: (style: Mode3DState['style']) => void;
  setDepth: (depth: Mode3DState['depth']) => void;
  setEnhancedAnimations: (enabled: boolean) => void;
  setParticleDensity: (density: Mode3DState['particleDensity']) => void;
  setPerspective: (enabled: boolean) => void;
  setNeonIntensity: (intensity: Mode3DState['neonIntensity']) => void;
  resetToDefault: () => void;
}

const Mode3DContext = createContext<Mode3DContextType | undefined>(undefined);

const defaultMode3D: Mode3DState = {
  isEnabled: true,
  style: 'cosmic',
  depth: 'medium',
  enhancedAnimations: true,
  particleDensity: 'medium',
  perspective: true,
  neonIntensity: 'medium'
};

export function Mode3DProvider({ children }: { children: ReactNode }) {
  const [mode3D, setMode3D] = useState<Mode3DState>(() => {
    // Clear any old localStorage data and start fresh
    localStorage.removeItem('pokemon-explorer-3d-mode');
    return defaultMode3D;
  });

  useEffect(() => {
    localStorage.setItem('pokemon-explorer-3d-mode', JSON.stringify(mode3D));
    apply3DEffects(mode3D);
  }, [mode3D]);

  const apply3DEffects = (state: Mode3DState) => {
    const root = document.documentElement;
    
    if (state.isEnabled) {
      // Apply 3D perspective
      if (state.perspective) {
        root.style.setProperty('--perspective', '1000px');
        root.style.setProperty('--transform-style', 'preserve-3d');
      } else {
        root.style.setProperty('--perspective', 'none');
        root.style.setProperty('--transform-style', 'flat');
      }

      // Apply depth effects
      const depthValues = {
        low: { '--depth-intensity': '0.1', '--shadow-blur': '10px' },
        medium: { '--depth-intensity': '0.3', '--shadow-blur': '20px' },
        high: { '--depth-intensity': '0.5', '--shadow-blur': '30px' }
      };
      
      const depth = depthValues[state.depth];
      Object.entries(depth).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });

      // Apply animation speed
      const animationSpeed = state.enhancedAnimations ? '1s' : '0.5s';
      root.style.setProperty('--animation-duration', animationSpeed);
      root.style.setProperty('--transition-duration', animationSpeed);

      // Apply particle density
      const particleCounts = {
        low: '25',
        medium: '50',
        high: '100'
      };
      root.style.setProperty('--particle-count', particleCounts[state.particleDensity]);

      // Apply neon intensity
      const neonValues = {
        low: { '--neon-glow': '0 0 10px', '--neon-intensity': '0.3' },
        medium: { '--neon-glow': '0 0 20px', '--neon-intensity': '0.6' },
        high: { '--neon-glow': '0 0 30px', '--neon-intensity': '1.0' }
      };
      
      const neon = neonValues[state.neonIntensity];
      if (neon) {
        Object.entries(neon).forEach(([key, value]) => {
          root.style.setProperty(key, value);
        });
      }

      // Apply style-specific effects
      const styleEffects = {
        cosmic: {
          '--primary-color': 'hsl(193, 100%, 50%)',
          '--secondary-color': 'hsl(280, 50%, 60%)',
          '--accent-color': 'hsl(348, 83%, 60%)',
          '--bg-gradient': 'linear-gradient(135deg, hsl(240,20%,10%) 0%, hsl(221,39%,16%) 25%, hsl(221,71%,20%) 50%, hsl(280,23%,35%) 100%)',
          '--particle-color': 'hsl(193, 100%, 50%)',
          '--glow-effect': '0 0 20px rgba(0, 212, 255, 0.5)'
        },
        cyberpunk: {
          '--primary-color': 'hsl(120, 100%, 50%)',
          '--secondary-color': 'hsl(300, 100%, 50%)',
          '--accent-color': 'hsl(0, 100%, 50%)',
          '--bg-gradient': 'linear-gradient(135deg, hsl(0,0%,5%) 0%, hsl(0,0%,10%) 25%, hsl(0,0%,15%) 50%, hsl(0,0%,20%) 100%)',
          '--particle-color': 'hsl(120, 100%, 50%)',
          '--glow-effect': '0 0 25px rgba(0, 255, 0, 0.7)'
        },
        holographic: {
          '--primary-color': 'hsl(180, 100%, 50%)',
          '--secondary-color': 'hsl(240, 100%, 50%)',
          '--accent-color': 'hsl(60, 100%, 50%)',
          '--bg-gradient': 'linear-gradient(135deg, hsl(200,20%,5%) 0%, hsl(220,30%,10%) 25%, hsl(240,40%,15%) 50%, hsl(260,50%,20%) 100%)',
          '--particle-color': 'hsl(180, 100%, 50%)',
          '--glow-effect': '0 0 30px rgba(0, 255, 255, 0.8)'
        },
        neon: {
          '--primary-color': 'hsl(0, 100%, 70%)',
          '--secondary-color': 'hsl(120, 100%, 70%)',
          '--accent-color': 'hsl(240, 100%, 70%)',
          '--bg-gradient': 'linear-gradient(135deg, hsl(0,0%,2%) 0%, hsl(0,0%,5%) 25%, hsl(0,0%,8%) 50%, hsl(0,0%,12%) 100%)',
          '--particle-color': 'hsl(0, 100%, 70%)',
          '--glow-effect': '0 0 35px rgba(255, 0, 0, 0.9)'
        }
      };

      const style = styleEffects[state.style] || styleEffects['cosmic'];
      if (style && typeof style === 'object') {
        Object.entries(style).forEach(([key, value]) => {
          root.style.setProperty(key, value);
        });
      }

      // Add style class to body and apply background
      document.body.className = document.body.className.replace(/style-\w+/g, '');
      document.body.classList.add(`style-${state.style}`);
      document.body.style.background = style['--bg-gradient'];
      
    } else {
      // Disable 3D effects
      root.style.setProperty('--perspective', 'none');
      root.style.setProperty('--transform-style', 'flat');
      root.style.setProperty('--depth-intensity', '0');
      root.style.setProperty('--shadow-blur', '0px');
      root.style.setProperty('--animation-duration', '0.3s');
      root.style.setProperty('--transition-duration', '0.3s');
      root.style.setProperty('--particle-count', '0');
      root.style.setProperty('--neon-glow', 'none');
      root.style.setProperty('--neon-intensity', '0');
      
      // Remove style classes and reset background
      document.body.className = document.body.className.replace(/style-\w+/g, '');
      document.body.style.background = 'var(--bg-gradient)';
    }
  };

  const toggle3DMode = () => {
    // Add a small delay for better UX
    setTimeout(() => {
      setMode3D(prev => {
        const newState = { ...prev, isEnabled: !prev.isEnabled };
        apply3DEffects(newState);
        return newState;
      });
    }, 150); // 150ms delay for smooth transition
  };

  const setStyle = (style: Mode3DState['style']) => {
    setMode3D(prev => ({ ...prev, style }));
  };

  const setDepth = (depth: Mode3DState['depth']) => {
    setMode3D(prev => ({ ...prev, depth }));
  };

  const setEnhancedAnimations = (enabled: boolean) => {
    setMode3D(prev => ({ ...prev, enhancedAnimations: enabled }));
  };

  const setParticleDensity = (density: Mode3DState['particleDensity']) => {
    setMode3D(prev => ({ ...prev, particleDensity: density }));
  };

  const setPerspective = (enabled: boolean) => {
    setMode3D(prev => ({ ...prev, perspective: enabled }));
  };

  const setNeonIntensity = (intensity: Mode3DState['neonIntensity']) => {
    setMode3D(prev => ({ ...prev, neonIntensity: intensity }));
  };

  const resetToDefault = () => {
    localStorage.removeItem('pokemon-explorer-3d-mode');
    setMode3D(defaultMode3D);
  };

  return (
    <Mode3DContext.Provider value={{
      mode3D,
      toggle3DMode,
      setStyle,
      setDepth,
      setEnhancedAnimations,
      setParticleDensity,
      setPerspective,
      setNeonIntensity,
      resetToDefault
    }}>
      {children}
    </Mode3DContext.Provider>
  );
}

export function use3DMode() {
  const context = useContext(Mode3DContext);
  if (context === undefined) {
    throw new Error('use3DMode must be used within a Mode3DProvider');
  }
  return context;
} 