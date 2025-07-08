import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AppSettings {
  theme: 'light' | 'dark';
  sound: boolean;
  animations: boolean;
  quality: 'low' | 'medium' | 'high' | 'ultra';
  language: 'en' | 'es' | 'fr' | 'de' | 'ja';
  notifications: boolean;
}

const defaultSettings: AppSettings = {
  theme: 'dark',
  sound: true,
  animations: true,
  quality: 'high',
  language: 'en',
  notifications: true
};

interface SettingsContextType {
  settings: AppSettings;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  resetSettings: () => void;
  applySettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('pokemon-explorer-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pokemon-explorer-settings', JSON.stringify(settings));
  }, [settings]);

  // Apply settings to the document
  useEffect(() => {
    applySettingsToDocument(settings);
  }, [settings]);

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const applySettings = () => {
    applySettingsToDocument(settings);
  };

  const applySettingsToDocument = (currentSettings: AppSettings) => {
    // Apply theme
    const root = document.documentElement;
    if (currentSettings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply animations
    if (!currentSettings.animations) {
      root.style.setProperty('--animation-duration', '0s');
      root.style.setProperty('--transition-duration', '0s');
    } else {
      root.style.removeProperty('--animation-duration');
      root.style.removeProperty('--transition-duration');
    }

    // Apply quality settings (for 3D rendering)
    const qualityLevels = {
      low: 'low',
      medium: 'medium', 
      high: 'high',
      ultra: 'ultra'
    };
    root.style.setProperty('--render-quality', qualityLevels[currentSettings.quality]);

    // Apply language (you can implement i18n here)
    root.setAttribute('lang', currentSettings.language);

    // Apply sound settings
    if (currentSettings.sound) {
      // Enable audio context if needed
      console.log('Sound enabled');
    } else {
      console.log('Sound disabled');
    }

    // Apply notification settings
    if (currentSettings.notifications) {
      console.log('Notifications enabled');
    } else {
      console.log('Notifications disabled');
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, resetSettings, applySettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
} 