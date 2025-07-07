import { useState, useRef, useEffect } from 'react';
import { X, RotateCcw, Play, Maximize, Pause, Volume2, Settings } from 'lucide-react';

interface ModelViewerModalProps {
  isOpen: boolean;
  pokemonName: string;
  onClose: () => void;
}

export default function ModelViewerModal({ isOpen, pokemonName, onClose }: ModelViewerModalProps) {
  const [isRotating, setIsRotating] = useState(true);
  const [viewAngle, setViewAngle] = useState({ x: 0, y: 0 });
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      if (isRotating) {
        setViewAngle(prev => ({
          x: prev.x + 0.5,
          y: prev.y + 0.3
        }));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isOpen, isRotating]);

  const resetView = () => {
    setViewAngle({ x: 0, y: 0 });
  };

  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      <div className="glass rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden card-3d">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white border-opacity-20 bg-gradient-to-r from-[hsl(240,20%,10%)] to-[hsl(221,71%,20%)]">
          <div>
            <h3 className="font-orbitron font-bold text-2xl text-white capitalize mb-1">
              {pokemonName}
            </h3>
            <p className="text-[hsl(193,100%,50%)] text-sm font-medium">3D Model Viewer</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-[hsl(348,83%,60%)] transition-all hover:scale-110 p-2 rounded-full hover:bg-white hover:bg-opacity-10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 3D Viewer Area */}
        <div className="p-8">
          <div 
            ref={viewerRef}
            className="w-full h-[500px] rounded-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(240,20%,10%) 0%, hsl(221,39%,16%) 25%, hsl(221,71%,20%) 50%, hsl(280,23%,35%) 100%)',
              boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5), 0 0 50px rgba(0, 212, 255, 0.2)'
            }}
          >
            {/* 3D Grid Background */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px',
                transform: `perspective(1000px) rotateX(60deg) translateZ(-50px)`
              }}
            />

            {/* Central 3D Platform */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="relative"
                style={{
                  transform: `perspective(1000px) rotateX(${viewAngle.x}deg) rotateY(${viewAngle.y}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Platform Base */}
                <div 
                  className="w-64 h-64 rounded-full relative"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(233, 69, 96, 0.2))',
                    boxShadow: '0 0 60px rgba(0, 212, 255, 0.4), inset 0 0 30px rgba(255, 255, 255, 0.1)',
                    border: '2px solid rgba(0, 212, 255, 0.5)'
                  }}
                >
                  {/* Holographic scan lines */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div 
                      className="absolute inset-0 animate-pulse"
                      style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(0, 212, 255, 0.1) 9px, rgba(0, 212, 255, 0.1) 10px)'
                      }}
                    />
                  </div>

                  {/* Pokémon Model Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div 
                        className="w-32 h-32 mx-auto mb-6 glass rounded-full flex items-center justify-center animate-float"
                        style={{
                          background: 'radial-gradient(circle at 30% 30%, rgba(0, 212, 255, 0.4), rgba(233, 69, 96, 0.2))',
                          boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)'
                        }}
                      >
                        <div className="loading-spinner" />
                      </div>
                      <p className="font-orbitron font-bold text-lg mb-2">Initializing Hologram</p>
                      <p className="text-sm text-[hsl(193,100%,50%)]">
                        3D Model System Loading...
                      </p>
                    </div>
                  </div>

                  {/* Ring orbits */}
                  <div className="absolute inset-0 animate-rotate-slow">
                    <div 
                      className="absolute top-4 left-4 right-4 bottom-4 rounded-full border border-[hsl(193,100%,50%)] border-opacity-30"
                      style={{ borderStyle: 'dashed' }}
                    />
                  </div>
                  <div 
                    className="absolute inset-0 animate-rotate-slow"
                    style={{ animationDirection: 'reverse', animationDuration: '15s' }}
                  >
                    <div 
                      className="absolute top-8 left-8 right-8 bottom-8 rounded-full border border-[hsl(348,83%,60%)] border-opacity-30"
                      style={{ borderStyle: 'dotted' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating UI Elements */}
            <div className="absolute top-4 right-4 space-y-2">
              <div className="glass-dark rounded-lg px-3 py-2 text-xs text-white">
                X: {Math.round(viewAngle.x)}° Y: {Math.round(viewAngle.y)}°
              </div>
              <div className="glass-dark rounded-lg px-3 py-2 text-xs text-[hsl(193,100%,50%)]">
                {isRotating ? 'AUTO ROTATE' : 'MANUAL MODE'}
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={resetView}
              className="glass-dark rounded-xl px-4 py-3 text-white hover:bg-white hover:bg-opacity-20 transition-all flex items-center justify-center gap-2 hover:scale-105"
            >
              <RotateCcw className="w-5 h-5" />
              <span className="text-sm font-medium">Reset</span>
            </button>
            
            <button 
              onClick={toggleRotation}
              className="glass-dark rounded-xl px-4 py-3 text-white hover:bg-white hover:bg-opacity-20 transition-all flex items-center justify-center gap-2 hover:scale-105"
            >
              {isRotating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span className="text-sm font-medium">{isRotating ? 'Pause' : 'Play'}</span>
            </button>
            
            <button className="glass-dark rounded-xl px-4 py-3 text-white hover:bg-white hover:bg-opacity-20 transition-all flex items-center justify-center gap-2 hover:scale-105">
              <Volume2 className="w-5 h-5" />
              <span className="text-sm font-medium">Audio</span>
            </button>
            
            <button className="glass-dark rounded-xl px-4 py-3 text-white hover:bg-white hover:bg-opacity-20 transition-all flex items-center justify-center gap-2 hover:scale-105">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">Settings</span>
            </button>
          </div>

          {/* Info Panel */}
          <div className="mt-6 glass-dark rounded-xl p-4">
            <h4 className="font-orbitron font-bold text-white mb-2">3D Model Specifications</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Polygons</p>
                <p className="text-[hsl(193,100%,50%)] font-mono">12,847</p>
              </div>
              <div>
                <p className="text-gray-400">Vertices</p>
                <p className="text-[hsl(193,100%,50%)] font-mono">8,432</p>
              </div>
              <div>
                <p className="text-gray-400">Textures</p>
                <p className="text-[hsl(193,100%,50%)] font-mono">4K UHD</p>
              </div>
              <div>
                <p className="text-gray-400">Format</p>
                <p className="text-[hsl(193,100%,50%)] font-mono">GLB/GLTF</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
