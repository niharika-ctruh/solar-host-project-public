import {
  CalendarSearch,
  CalendarTick,
  Home2,
  Notification,
} from 'iconsax-reactjs';
import { TFooterData } from '@/lib/types';

export const FOOTER_DATA: TFooterData[] = [
  { name: 'Home', icon: Home2, path: '/home' },
  { name: 'Notifications', icon: Notification, path: '/notifications' },
  { name: 'Requests', icon: CalendarSearch, path: '/requests' },
  { name: 'Visits', icon: CalendarTick, path: '/visits' },
];

export const ICON_COLORS = {
  // Primary COlors
  'primary-400': 'var(--color-primary-400)',

  // Neutral Colors
  'neutral-50': 'var(--color-neutral-50)',
};

export const LOGIN_STAGES = [
  'login',
  'forgotPassword',
  'resetPassword',
  'success',
] as const;
