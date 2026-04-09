'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';

function NavigationProgressInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = useMemo(() => {
    const q = searchParams.toString();
    return q ? `${pathname}?${q}` : pathname;
  }, [pathname, searchParams]);

  const [widthPct, setWidthPct] = useState(0);
  const pendingRef = useRef(false);
  const routeRef = useRef<string | null>(null);
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
    if (routeRef.current === null) {
      routeRef.current = routeKey;
      return;
    }
    if (routeRef.current === routeKey) return;
    routeRef.current = routeKey;

    if (pendingRef.current) {
      finishBar();
    } else {
      clearTimers();
      setWidthPct(30);
      requestAnimationFrame(() => setWidthPct(100));
      doneTimerRef.current = setTimeout(() => setWidthPct(0), 320);
    }
  }, [routeKey, finishBar, clearTimers]);

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

/**
 * Suspense required by Next.js when using useSearchParams (query changes must complete the bar, e.g. blog category).
 */
export function NavigationProgress() {
  return (
    <Suspense fallback={null}>
      <NavigationProgressInner />
    </Suspense>
  );
}
