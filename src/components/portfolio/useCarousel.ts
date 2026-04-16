import { useCallback, useEffect, useRef, useState } from "react";

export function useCarousel(totalPages: number, autoPlayMs = 6000) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToPage = useCallback((newPage: number, dir: number) => {
    setDirection(dir);
    setPage(newPage);
  }, []);

  const nextPage = useCallback(() => {
    if (totalPages <= 1) return;
    setDirection(1);
    setPage((p) => (p + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    if (totalPages <= 1) return;
    setDirection(-1);
    setPage((p) => (p - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const startAutoPlay = useCallback(() => {
    if (totalPages <= 1) return;
    autoPlayRef.current = setInterval(nextPage, autoPlayMs);
  }, [nextPage, totalPages, autoPlayMs]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  const resetPage = useCallback(() => {
    setPage(0);
    setDirection(0);
  }, []);

  return {
    page,
    direction,
    goToPage,
    nextPage,
    prevPage,
    pauseAutoPlay: stopAutoPlay,
    resumeAutoPlay: startAutoPlay,
    resetPage,
  };
}
