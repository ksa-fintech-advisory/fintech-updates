import type { IconType } from 'react-icons';
import {
  FiAnchor,
  FiBookOpen,
  FiCpu,
  FiCreditCard,
  FiShield,
  FiTarget,
  FiZap,
} from 'react-icons/fi';

/** Visual cue per learner phase (roadmap.sh–style sections). */
export const phaseIcons = {
  'getting-started': FiAnchor,
  foundations: FiBookOpen,
  rails: FiCreditCard,
  regulation: FiShield,
  product: FiTarget,
  systems: FiCpu,
  ship: FiZap,
} as const satisfies Record<string, IconType>;

export type PhaseIconId = keyof typeof phaseIcons;

export function getPhaseIcon(id: string): IconType {
  return phaseIcons[id as PhaseIconId] ?? FiBookOpen;
}
