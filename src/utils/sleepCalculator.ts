/**
 * Sleep Calculator utilities for cycle-based sleep timing
 * Based on 90-minute sleep cycles
 */

const SLEEP_CYCLE_MINUTES = 90;
const MINUTES_PER_HOUR = 60;

export interface SleepTime {
  hours: number;
  minutes: number;
  display: string;
}

export interface SleepRecommendation {
  time: SleepTime;
  cycles: number;
  totalSleep: string;
  isRecommended?: boolean;
}

/**
 * Parse time string to hours and minutes
 */
export const parseTime = (timeString: string): { hours: number; minutes: number } => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return { hours, minutes };
};

/**
 * Format time to HH:MM string
 */
export const formatTime = ({ hours, minutes }: { hours: number; minutes: number }): string => {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

/**
 * Convert time to total minutes since midnight
 */
export const timeToMinutes = ({ hours, minutes }: { hours: number; minutes: number }): number => {
  return hours * MINUTES_PER_HOUR + minutes;
};

/**
 * Convert minutes since midnight to time object
 */
export const minutesToTime = (totalMinutes: number): SleepTime => {
  // Handle negative minutes (previous day)
  if (totalMinutes < 0) {
    totalMinutes += 24 * MINUTES_PER_HOUR;
  }
  
  // Handle minutes >= 24 hours (next day)
  totalMinutes = totalMinutes % (24 * MINUTES_PER_HOUR);
  
  const hours = Math.floor(totalMinutes / MINUTES_PER_HOUR);
  const minutes = totalMinutes % MINUTES_PER_HOUR;
  
  return {
    hours,
    minutes,
    display: formatTime({ hours, minutes })
  };
};

/**
 * Calculate bedtime recommendations based on wake time and sleep onset
 */
export const calculateBedtimes = (
  wakeTime: string, 
  onsetMinutes: number = 15
): SleepRecommendation[] => {
  const wake = parseTime(wakeTime);
  const wakeMinutes = timeToMinutes(wake);
  
  const recommendations: SleepRecommendation[] = [];
  
  // Calculate for 4-7 sleep cycles (6-10.5 hours of sleep)
  for (let cycles = 4; cycles <= 7; cycles++) {
    const sleepDuration = cycles * SLEEP_CYCLE_MINUTES;
    const totalTimeNeeded = sleepDuration + onsetMinutes;
    const bedtimeMinutes = wakeMinutes - totalTimeNeeded;
    
    const bedtime = minutesToTime(bedtimeMinutes);
    
    recommendations.push({
      time: bedtime,
      cycles,
      totalSleep: `${Math.floor(sleepDuration / 60)}h ${sleepDuration % 60}m`,
      isRecommended: cycles === 5 // 7.5 hours is typically recommended
    });
  }
  
  return recommendations;
};

/**
 * Calculate wake time recommendations based on bedtime and sleep onset
 */
export const calculateWakeTimes = (
  bedTime: string, 
  onsetMinutes: number = 15
): SleepRecommendation[] => {
  const bed = parseTime(bedTime);
  const bedMinutes = timeToMinutes(bed);
  const sleepStartMinutes = bedMinutes + onsetMinutes;
  
  const recommendations: SleepRecommendation[] = [];
  
  // Calculate for 4-7 sleep cycles
  for (let cycles = 4; cycles <= 7; cycles++) {
    const sleepDuration = cycles * SLEEP_CYCLE_MINUTES;
    const wakeMinutes = sleepStartMinutes + sleepDuration;
    
    const wakeTime = minutesToTime(wakeMinutes);
    
    recommendations.push({
      time: wakeTime,
      cycles,
      totalSleep: `${Math.floor(sleepDuration / 60)}h ${sleepDuration % 60}m`,
      isRecommended: cycles === 5
    });
  }
  
  return recommendations;
};

/**
 * Get current time formatted for time input
 */
export const getCurrentTime = (): string => {
  const now = new Date();
  return formatTime({ 
    hours: now.getHours(), 
    minutes: now.getMinutes() 
  });
};

/**
 * Calculate minutes until a specific time
 */
export const getMinutesUntil = (targetTime: string): number => {
  const now = new Date();
  const target = parseTime(targetTime);
  const nowMinutes = timeToMinutes({ hours: now.getHours(), minutes: now.getMinutes() });
  const targetMinutes = timeToMinutes(target);
  
  let diff = targetMinutes - nowMinutes;
  
  // If target is tomorrow
  if (diff < 0) {
    diff += 24 * MINUTES_PER_HOUR;
  }
  
  return diff;
};