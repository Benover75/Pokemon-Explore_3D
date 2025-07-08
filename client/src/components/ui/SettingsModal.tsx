import { useState } from 'react';
import { X, Monitor, Smartphone, Volume2, VolumeX, Sun, Moon, Palette, Globe, Info, Box, Zap } from 'lucide-react';
import { useSettings } from '@/hooks/use-settings';
import { use3DMode } from '@/hooks/use-3d-mode';
import { useToast } from '@/hooks/use-toast';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { settings, updateSetting, resetSettings } = useSettings();
  const { mode3D, setStyle, setDepth, setEnhancedAnimations, setParticleDensity, setNeonIntensity } = use3DMode();
  const { toast } = useToast();
  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = <K extends keyof typeof settings>(key: K, value: typeof settings[K]) => {
    updateSetting(key, value);
    setHasChanges(true);
  };

  const handle3DSettingChange = (setting: string, value: string | boolean) => {
    switch (setting) {
      case 'style':
        setStyle(value as 'cosmic' | 'cyberpunk' | 'holographic' | 'neon');
        break;
      case 'depth':
        setDepth(value as 'low' | 'medium' | 'high');
        break;
      case 'enhancedAnimations':
        setEnhancedAnimations(value as boolean);
        break;
      case 'particleDensity':
        setParticleDensity(value as 'low' | 'medium' | 'high');
        break;
      case 'neonIntensity':
        setNeonIntensity(value as 'low' | 'medium' | 'high');
        break;
    }
    setHasChanges(true);
  };

  const handleSave = () => {
    setHasChanges(false);
    toast({
      title: "Settings Saved",
      description: "Your settings have been applied successfully!",
    });
    onClose();
  };

  const handleReset = () => {
    resetSettings();
    setHasChanges(false);
    toast({
      title: "Settings Reset",
      description: "Settings have been reset to defaults.",
    });
  };

  const handleCancel = () => {
    if (hasChanges) {
      // Reset to saved settings
      const savedSettings = localStorage.getItem('pokemon-explorer-settings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          Object.entries(parsed).forEach(([key, value]) => {
            updateSetting(key as keyof typeof settings, value as typeof settings[keyof typeof settings]);
          });
        } catch (error) {
          console.error('Failed to restore settings:', error);
        }
      }
    }
    setHasChanges(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      <div className="glass rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden card-3d">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white border-opacity-20 glass-dark">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[hsl(193,100%,50%)] to-[hsl(280,50%,60%)] flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-2xl text-white">Settings</h3>
              <p className="text-[hsl(193,100%,50%)] text-sm font-medium">
                {hasChanges ? 'You have unsaved changes' : 'Configure your experience'}
              </p>
            </div>
          </div>
          <button
            onClick={handleCancel}
            className="text-white hover:text-[hsl(348,83%,60%)] transition-all hover:scale-110 p-2 rounded-full hover:bg-white hover:bg-opacity-10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Settings Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* 3D Style Settings */}
          <div className="space-y-4">
            <h4 className="font-orbitron font-bold text-lg text-white flex items-center space-x-2">
              <Box className="w-5 h-5" />
              <span>3D Style</span>
            </h4>
            <div className="glass-dark rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Visual Style</span>
                <select
                  value={mode3D.style}
                  onChange={(e) => handle3DSettingChange('style', e.target.value)}
                  className="bg-white bg-opacity-10 text-white rounded-lg px-3 py-2 border border-white border-opacity-20 focus:outline-none focus:border-[hsl(193,100%,50%)]"
                >
                  <option value="cosmic">🌌 Cosmic</option>
                  <option value="cyberpunk">🤖 Cyberpunk</option>
                  <option value="holographic">💎 Holographic</option>
                  <option value="neon">⚡ Neon</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">3D Depth</span>
                <select
                  value={mode3D.depth}
                  onChange={(e) => handle3DSettingChange('depth', e.target.value)}
                  className="bg-white bg-opacity-10 text-white rounded-lg px-3 py-2 border border-white border-opacity-20 focus:outline-none focus:border-[hsl(193,100%,50%)]"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Enhanced Animations</span>
                <button
                  onClick={() => handle3DSettingChange('enhancedAnimations', !mode3D.enhancedAnimations)}
                  className={`w-12 h-6 rounded-full transition-all ${
                    mode3D.enhancedAnimations
                      ? 'bg-[hsl(193,100%,50%)]'
                      : 'bg-white bg-opacity-20'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-all ${
                      mode3D.enhancedAnimations ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Particle Density</span>
                <select
                  value={mode3D.particleDensity}
                  onChange={(e) => handle3DSettingChange('particleDensity', e.target.value)}
                  className="bg-white bg-opacity-10 text-white rounded-lg px-3 py-2 border border-white border-opacity-20 focus:outline-none focus:border-[hsl(193,100%,50%)]"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Neon Intensity</span>
                <select
                  value={mode3D.neonIntensity}
                  onChange={(e) => handle3DSettingChange('neonIntensity', e.target.value)}
                  className="bg-white bg-opacity-10 text-white rounded-lg px-3 py-2 border border-white border-opacity-20 focus:outline-none focus:border-[hsl(193,100%,50%)]"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="space-y-4">
            <h4 className="font-orbitron font-bold text-lg text-white flex items-center space-x-2">
              <Sun className="w-5 h-5" />
              <span>Appearance</span>
            </h4>
            <div className="glass-dark rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Theme</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSettingChange('theme', 'light')}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      settings.theme === 'light'
                        ? 'bg-[hsl(193,100%,50%)] text-white'
                        : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleSettingChange('theme', 'dark')}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      settings.theme === 'dark'
                        ? 'bg-[hsl(193,100%,50%)] text-white'
                        : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Animations</span>
                <button
                  onClick={() => handleSettingChange('animations', !settings.animations)}
                  className={`w-12 h-6 rounded-full transition-all ${
                    settings.animations
                      ? 'bg-[hsl(193,100%,50%)]'
                      : 'bg-white bg-opacity-20'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-all ${
                      settings.animations ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Audio Settings */}
          <div className="space-y-4">
            <h4 className="font-orbitron font-bold text-lg text-white flex items-center space-x-2">
              <Volume2 className="w-5 h-5" />
              <span>Audio</span>
            </h4>
            <div className="glass-dark rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Sound Effects</span>
                <button
                  onClick={() => handleSettingChange('sound', !settings.sound)}
                  className={`w-12 h-6 rounded-full transition-all ${
                    settings.sound
                      ? 'bg-[hsl(193,100%,50%)]'
                      : 'bg-white bg-opacity-20'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-all ${
                      settings.sound ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Performance Settings */}
          <div className="space-y-4">
            <h4 className="font-orbitron font-bold text-lg text-white flex items-center space-x-2">
              <Monitor className="w-5 h-5" />
              <span>Performance</span>
            </h4>
            <div className="glass-dark rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">3D Quality</span>
                <select
                  value={settings.quality}
                  onChange={(e) => handleSettingChange('quality', e.target.value as typeof settings.quality)}
                  className="bg-white bg-opacity-10 text-white rounded-lg px-3 py-2 border border-white border-opacity-20 focus:outline-none focus:border-[hsl(193,100%,50%)]"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="ultra">Ultra</option>
                </select>
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div className="space-y-4">
            <h4 className="font-orbitron font-bold text-lg text-white flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Language</span>
            </h4>
            <div className="glass-dark rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Interface Language</span>
                <select
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value as typeof settings.language)}
                  className="bg-white bg-opacity-10 text-white rounded-lg px-3 py-2 border border-white border-opacity-20 focus:outline-none focus:border-[hsl(193,100%,50%)]"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="ja">日本語</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications Settings */}
          <div className="space-y-4">
            <h4 className="font-orbitron font-bold text-lg text-white flex items-center space-x-2">
              <Info className="w-5 h-5" />
              <span>Notifications</span>
            </h4>
            <div className="glass-dark rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Enable Notifications</span>
                <button
                  onClick={() => handleSettingChange('notifications', !settings.notifications)}
                  className={`w-12 h-6 rounded-full transition-all ${
                    settings.notifications
                      ? 'bg-[hsl(193,100%,50%)]'
                      : 'bg-white bg-opacity-20'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-all ${
                      settings.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-white border-opacity-20 glass-dark">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-white hover:text-[hsl(348,83%,60%)] transition-all hover:scale-105"
          >
            Reset to Defaults
          </button>
          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-white bg-opacity-10 text-white rounded-lg hover:bg-opacity-20 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-gradient-to-r from-[hsl(193,100%,50%)] to-[hsl(280,50%,60%)] text-white rounded-lg hover:shadow-lg transition-all"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 