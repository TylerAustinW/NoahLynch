'use client';

import React, { useCallback, useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: string | Date;
  className?: string;
}

export default function CountdownTimer({
  targetDate,
  className = '',
}: CountdownTimerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    const clamp = (value: number) => Math.max(0, value);
    return {
      days: clamp(Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: clamp(Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: clamp(Math.floor((difference / 1000 / 60) % 60)),
      seconds: clamp(Math.floor((difference / 1000) % 60)),
    } as const;
  }, [targetDate]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    setTimeLeft(getTimeLeft());

    const intervalId = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isMounted, getTimeLeft]);

  if (!isMounted) {
    return null;
  }

  const { days, hours, minutes, seconds } = timeLeft;

  const Unit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <span className="text-4xl font-bold tabular-nums text-white">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );

  return (
    <div className={`flex items-center justify-baseline gap-6 ${className}`}>
      <Unit value={days} label="Days" />
      <Unit value={hours} label="Hours" />
      <Unit value={minutes} label="Minutes" />
      <Unit value={seconds} label="Seconds" />
    </div>
  );
}
