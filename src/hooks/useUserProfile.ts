import { useEffect, useState } from 'react';

export interface UserPreferences {
  name?: string;
  city?: string;
  state?: string;
  deity?: string;
  reminderTime?: string;
}

const STATE_BY_CITY: Record<string, string> = {
  Agra: 'Uttar Pradesh',
  'New Delhi': 'Delhi',
  Delhi: 'Delhi',
  Mumbai: 'Maharashtra',
  Bangalore: 'Karnataka',
  Jaipur: 'Rajasthan',
  Varanasi: 'Uttar Pradesh',
};

export function getUserPreferences(): UserPreferences {
  try {
    return JSON.parse(localStorage.getItem('userPreferences') || '{}');
  } catch {
    return {};
  }
}

export function saveUserPreferences(prefs: UserPreferences) {
  localStorage.setItem('userPreferences', JSON.stringify({ ...getUserPreferences(), ...prefs }));
}

function buildProfile() {
  const prefs = getUserPreferences();
  const city = prefs.city?.trim() || 'Agra';
  const state = prefs.state?.trim() || STATE_BY_CITY[city] || '';
  const location = state ? `${city}, ${state}` : city;
  const name = prefs.name?.trim() || 'Kshitij';
  return { name, city, state, location, deity: prefs.deity || 'Shiva', prefs };
}

export function useUserProfile() {
  const [profile, setProfile] = useState(buildProfile);

  useEffect(() => {
    const refresh = () => setProfile(buildProfile());
    window.addEventListener('user-prefs-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('user-prefs-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  return profile;
}

/** Call after prefs update to refresh — simple window event */
export function notifyProfileUpdate() {
  window.dispatchEvent(new Event('user-prefs-updated'));
}
