import { useState } from 'react';
import { ChevronDown, Palette } from 'lucide-react';
import { use3DMode } from '@/hooks/use-3d-mode';
import SettingsModal from './SettingsModal';

export default function Navigation() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [isStyleMenuOpen, setIsStyleMenuOpen] = useState(false);
  const { mode3D, toggle3DMode, setStyle, resetToDefault } = use3DMode();

  const handle3DToggle = () => {
    if (isToggling) return; // Prevent rapid clicking
    
    setIsToggling(true);
    toggle3DMode();
    
    // Reset toggle state after animation completes
    setTimeout(() => {
      setIsToggling(false);
    }, 300);
  };

  const handleStyleChange = (style: 'cosmic' | 'cyberpunk' | 'holographic' | 'neon') => {
    setStyle(style);
    setIsStyleMenuOpen(false);
  };

  const getStyleColor = () => {
    switch (mode3D.style) {
      case 'cosmic': return 'from-[hsl(193,100%,50%)] to-[hsl(280,50%,60%)]';
      case 'cyberpunk': return 'from-[hsl(120,100%,50%)] to-[hsl(300,100%,50%)]';
      case 'holographic': return 'from-[hsl(180,100%,50%)] to-[hsl(240,100%,50%)]';
      case 'neon': return 'from-[hsl(0,100%,70%)] to-[hsl(120,100%,70%)]';
      default: return 'from-[hsl(193,100%,50%)] to-[hsl(280,50%,60%)]';
    }
  };

  const getStyleName = () => {
    switch (mode3D.style) {
      case 'cosmic': return 'Cosmic';
      case 'cyberpunk': return 'Cyberpunk';
      case 'holographic': return 'Holographic';
      case 'neon': return 'Neon';
      default: return 'Cosmic';
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="glass rounded-2xl px-6 py-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getStyleColor()} flex items-center justify-center`}>
                <span className="text-white font-bold">3D</span>
              </div>
              <h1 className="font-orbitron font-bold text-2xl text-white">Pokémon Explorer</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* 3D Style Selector */}
              <div className="relative">
                <button 
                  onClick={() => setIsStyleMenuOpen(!isStyleMenuOpen)}
                  className="glass-dark rounded-lg px-4 py-2 text-white hover:bg-white hover:bg-opacity-20 transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Palette className="w-4 h-4" />
                  <span className="text-sm font-medium">{getStyleName()}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isStyleMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isStyleMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 glass-dark rounded-lg py-2 min-w-[160px] shadow-xl">
                    <button
                      onClick={() => handleStyleChange('cosmic')}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-white hover:bg-opacity-20 transition-all ${
                        mode3D.style === 'cosmic' ? 'text-[hsl(193,100%,50%)]' : 'text-white'
                      }`}
                    >
                      🌌 Cosmic
                    </button>
                    <button
                      onClick={() => handleStyleChange('cyberpunk')}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-white hover:bg-opacity-20 transition-all ${
                        mode3D.style === 'cyberpunk' ? 'text-[hsl(120,100%,50%)]' : 'text-white'
                      }`}
                    >
                      🤖 Cyberpunk
                    </button>
                    <button
                      onClick={() => handleStyleChange('holographic')}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-white hover:bg-opacity-20 transition-all ${
                        mode3D.style === 'holographic' ? 'text-[hsl(180,100%,50%)]' : 'text-white'
                      }`}
                    >
                      💎 Holographic
                    </button>
                    <button
                      onClick={() => handleStyleChange('neon')}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-white hover:bg-opacity-20 transition-all ${
                        mode3D.style === 'neon' ? 'text-[hsl(0,100%,70%)]' : 'text-white'
                      }`}
                    >
                      ⚡ Neon
                    </button>
                  </div>
                )}
              </div>

              <button 
                onClick={handle3DToggle}
                disabled={isToggling}
                className={`glass-dark rounded-lg px-4 py-2 text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300 flex items-center gap-2 ${
                  mode3D.isEnabled ? 'bg-[hsl(193,100%,50%)] bg-opacity-20' : ''
                } ${isToggling ? 'scale-95 opacity-75' : 'hover:scale-105'}`}
              >
                <span className={`w-2 h-2 rounded-full bg-current transition-all duration-300 ${
                  mode3D.isEnabled ? 'animate-pulse' : ''
                } ${isToggling ? 'animate-spin' : ''}`}></span>
                3D Mode {mode3D.isEnabled ? 'ON' : 'OFF'}
              </button>
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="glass-dark rounded-lg px-4 py-2 text-white hover:bg-white hover:bg-opacity-20 transition-all hover:scale-105"
              >
                Settings
              </button>
              <button 
                onClick={resetToDefault}
                className="glass-dark rounded-lg px-4 py-2 text-white hover:bg-white hover:bg-opacity-20 transition-all hover:scale-105"
                title="Reset to default theme"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
}
