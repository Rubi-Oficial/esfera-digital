import { useState, useEffect } from "react";

export const useCountdown = () => {
  const getTarget = () => {
    const stored = localStorage.getItem("promo_end");
    if (stored) return new Date(stored).getTime();
    const end = new Date();
    end.setHours(end.getHours() + 48);
    localStorage.setItem("promo_end", end.toISOString());
    return end.getTime();
  };

  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = getTarget() - Date.now();
    return diff > 0 ? diff : 0;
  });

  useEffect(() => {
    const id = setInterval(() => {
      const diff = getTarget() - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const hours = Math.floor(timeLeft / 3600000);
  const minutes = Math.floor((timeLeft % 3600000) / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return { hours, minutes, seconds, expired: timeLeft <= 0 };
};
