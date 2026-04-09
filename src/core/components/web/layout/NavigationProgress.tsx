'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Lightweight route progress bar for App Router.
 * Does not patch history (avoids conflicts with Next.js App Router + Google Analytics).
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [widthPct, setWidthPct] = useState(0);
  const pendingRef = useRef(false);
  const pathRef = useRef<string | null>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const doneTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    if (doneTimerRef.current) {
      clearTimeout(doneTimerRef.current);
      doneTimerRef.current = null;
    }
  }, []);

  const finishBar = useCallback(() => {
    clearTimers();
    pendingRef.current = false;
    setWidthPct(100);
    doneTimerRef.current = setTimeout(() => setWidthPct(0), 280);
  }, [clearTimers]);

  useEffect(() => {
    if (pathRef.current === null) {
      pathRef.current = pathname;
      return;
    }
    if (pathRef.current === pathname) return;
    pathRef.current = pathname;

    if (pendingRef.current) {
      finishBar();
    } else {
      clearTimers();
      // Back/forward without a captured pointerdown: short pulse
      setWidthPct(30);
      requestAnimationFrame(() => setWidthPct(100));
      doneTimerRef.current = setTimeout(() => setWidthPct(0), 320);
    }
  }, [pathname, finishBar, clearTimers]);

  useEffect(() => {
    const shouldHandle = (a: HTMLAnchorElement) => {
      if (a.target === '_blank' || a.download) return false;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#')) return false;
      try {
        const url = new URL(a.href, window.location.href);
        if (url.origin !== window.location.origin) return false;
        const cur = new URL(window.location.href);
        if (url.pathname === cur.pathname && url.search === cur.search) return false;
      } catch {
        return false;
      }
      if (/^(mailto:|tel:|sms:)/i.test(a.href)) return false;
      return true;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest('a');
      if (!a || !(a instanceof HTMLAnchorElement) || !shouldHandle(a)) return;

      clearTimers();
      pendingRef.current = true;
      setWidthPct(12);
      requestAnimationFrame(() => setWidthPct(88));

      fallbackTimerRef.current = setTimeout(() => {
        if (pendingRef.current) {
          pendingRef.current = false;
          setWidthPct(100);
          doneTimerRef.current = setTimeout(() => setWidthPct(0), 280);
        }
      }, 12000);
    };

    document.addEventListener('pointerdown', onPointerDown, true);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      clearTimers();
    };
  }, [clearTimers]);

  const visible = widthPct > 0;

  return (
    <div
      className="pointer-events-none fixed left-0 z-[100000] h-0.5 w-full"
      style={{ top: 'max(0px, env(safe-area-inset-top))' }}
      aria-hidden
    >
      <div
        className="h-full rounded-e-full bg-primary-500 shadow-[0_0_12px_rgba(16,185,129,0.45)] transition-[width,opacity] duration-200 ease-out"
        style={{
          width: `${widthPct}%`,
          opacity: visible ? 1 : 0,
          transitionProperty: 'width, opacity',
        }}
      />
    </div>
  );
}
