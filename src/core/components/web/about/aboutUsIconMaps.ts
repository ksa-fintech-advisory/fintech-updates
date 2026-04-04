import type { AboutExpertiseIconKey, AboutValueIconKey } from '@/core/types/web/aboutUs';
import { FiCpu, FiLayers, FiLock, FiMapPin, FiMessageSquare, FiShield, FiUsers } from 'react-icons/fi';

export const ABOUT_VALUE_ICONS: Record<AboutValueIconKey, typeof FiMessageSquare> = {
  candor: FiMessageSquare,
  lean: FiLayers,
  partner: FiUsers,
  depth: FiLock,
};

export const ABOUT_EXPERTISE_ICONS: Record<AboutExpertiseIconKey, typeof FiShield> = {
  sandbox: FiShield,
  systems: FiCpu,
  local: FiMapPin,
};
