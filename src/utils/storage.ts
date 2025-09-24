/**
 * Local storage utilities for Sleep Reminder PWA
 * Temporary solution before Supabase integration
 */

export interface Reminder {
  id: string;
  target_time: string;
  lead_minutes: number;
  sent: boolean;
  created_at: string;
  user_id?: string;
}

export interface SleepLog {
  id: string;
  date: string;
  bedtime?: string;
  wake_time?: string;
  sleep_quality?: number; // 1-5 scale
  notes?: string;
  routine_done?: boolean;
  routine_duration?: number;
  user_id?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlocked_at?: string;
  user_id?: string;
}

export interface RoutineStep {
  id: string;
  name: string;
  duration: number;
  icon: string;
  description: string;
}

// Storage keys
const STORAGE_KEYS = {
  REMINDERS: 'sleep-reminders',
  LOGS: 'sleep-logs',
  ACHIEVEMENTS: 'sleep-achievements',
  SETTINGS: 'sleep-settings',
  STREAK: 'sleep-streak'
} as const;

// Generic storage functions
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

// Reminder functions
export const getReminders = (): Reminder[] => {
  return getFromStorage(STORAGE_KEYS.REMINDERS, []);
};

export const addReminder = (reminder: Omit<Reminder, 'id' | 'created_at'>): Reminder => {
  const newReminder: Reminder = {
    ...reminder,
    id: `reminder-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date().toISOString(),
  };
  
  const reminders = getReminders();
  reminders.push(newReminder);
  setToStorage(STORAGE_KEYS.REMINDERS, reminders);
  
  return newReminder;
};

export const updateReminder = (id: string, updates: Partial<Reminder>): void => {
  const reminders = getReminders();
  const index = reminders.findIndex(r => r.id === id);
  if (index !== -1) {
    reminders[index] = { ...reminders[index], ...updates };
    setToStorage(STORAGE_KEYS.REMINDERS, reminders);
  }
};

// Sleep log functions
export const getSleepLogs = (): SleepLog[] => {
  return getFromStorage(STORAGE_KEYS.LOGS, []);
};

export const addSleepLog = (log: Omit<SleepLog, 'id'>): SleepLog => {
  const newLog: SleepLog = {
    ...log,
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
  
  const logs = getSleepLogs();
  logs.push(newLog);
  setToStorage(STORAGE_KEYS.LOGS, logs);
  
  return newLog;
};

export const getRecentLogs = (days: number = 7): SleepLog[] => {
  const logs = getSleepLogs();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  
  return logs
    .filter(log => new Date(log.date) >= cutoff)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Achievement functions
export const getAchievements = (): Achievement[] => {
  const defaultAchievements: Achievement[] = [
    {
      id: 'first-routine',
      name: 'First Steps',
      description: 'Complete your first bedtime routine',
      icon: '🌙',
      unlocked: false,
    },
    {
      id: 'three-day-streak',
      name: 'Getting Started',
      description: 'Complete routines for 3 consecutive days',
      icon: '🔥',
      unlocked: false,
    },
    {
      id: 'seven-day-streak',
      name: 'Week Warrior',
      description: 'Complete routines for 7 consecutive days',
      icon: '⭐',
      unlocked: false,
    },
    {
      id: 'perfect-week',
      name: 'Sleep Master',
      description: 'Log sleep data every day for a week',
      icon: '🏆',
      unlocked: false,
    },
    {
      id: 'early-bird',
      name: 'Early Bird',
      description: 'Wake up before 7 AM for 5 consecutive days',
      icon: '🐦',
      unlocked: false,
    },
  ];
  
  return getFromStorage(STORAGE_KEYS.ACHIEVEMENTS, defaultAchievements);
};

export const unlockAchievement = (achievementId: string): void => {
  const achievements = getAchievements();
  const index = achievements.findIndex(a => a.id === achievementId);
  if (index !== -1 && !achievements[index].unlocked) {
    achievements[index].unlocked = true;
    achievements[index].unlocked_at = new Date().toISOString();
    setToStorage(STORAGE_KEYS.ACHIEVEMENTS, achievements);
  }
};

// Streak calculation
export const getCurrentStreak = (): number => {
  const logs = getSleepLogs();
  const today = new Date();
  let streak = 0;
  let currentDate = new Date(today);
  
  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayLog = logs.find(log => log.date === dateStr && log.routine_done);
    
    if (!dayLog) {
      break;
    }
    
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  return streak;
};

// Settings
export interface AppSettings {
  notifications_enabled: boolean;
  default_onset_minutes: number;
  reminder_lead_time: number;
  dark_mode: boolean;
}

export const getSettings = (): AppSettings => {
  return getFromStorage(STORAGE_KEYS.SETTINGS, {
    notifications_enabled: true,
    default_onset_minutes: 15,
    reminder_lead_time: 30,
    dark_mode: true,
  });
};

export const updateSettings = (updates: Partial<AppSettings>): void => {
  const settings = getSettings();
  const newSettings = { ...settings, ...updates };
  setToStorage(STORAGE_KEYS.SETTINGS, newSettings);
};

// Default routine steps
export const getRoutineSteps = (): RoutineStep[] => {
  return [
    {
      id: 'breathing',
      name: 'Deep Breathing',
      duration: 180, // 3 minutes
      icon: '🫁',
      description: 'Take slow, deep breaths to relax your body and mind'
    },
    {
      id: 'stretching',
      name: 'Gentle Stretching',
      duration: 240, // 4 minutes
      icon: '🧘',
      description: 'Light stretches to release tension from the day'
    },
    {
      id: 'reading',
      name: 'Light Reading',
      duration: 120, // 2 minutes
      icon: '📖',
      description: 'Read something calming to prepare your mind for sleep'
    },
    {
      id: 'meditation',
      name: 'Meditation',
      duration: 60, // 1 minute
      icon: '🧠',
      description: 'Brief mindfulness meditation to center yourself'
    }
  ];
};