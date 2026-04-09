/** Use for scrollIntoView / programmatic scroll — respects prefers-reduced-motion. */
export function getScrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined') return 'auto';
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}
