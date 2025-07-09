import { useEffect, useState } from 'react';

const timeEnd = {
  days: 'Días',
  hours: 'Horas',
  minutes: 'Minutos',
  seconds: 'Segundos',
} as const;

type TimeEndKeys = keyof typeof timeEnd;

type CountdownValues = Record<TimeEndKeys, string>;

function formatTimeUnit(value: number): string {
  return value.toString().padStart(2, '0');
}

export function useCountdown(targetDate: string | Date) {
  const getTimeRemaining = (): CountdownValues => {
    const now = new Date();
    const end = new Date(targetDate);

    if (isNaN(end.getTime()) || end <= now) {
      return {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      };
    }

    const diff = end.getTime() - now.getTime();

    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    return {
      days: formatTimeUnit(days),
      hours: formatTimeUnit(hours),
      minutes: formatTimeUnit(minutes),
      seconds: formatTimeUnit(seconds),
    };
  };

  const [countdown, setCountdown] = useState<CountdownValues>(getTimeRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  return { countdown, timeEnd };
}
