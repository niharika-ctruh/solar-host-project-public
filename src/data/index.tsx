import {
  CalendarSearch,
  CalendarTick,
  Clock,
  CloseCircle,
  Home2,
  TickCircle,
  User,
} from 'iconsax-reactjs';
import { TFooterData, TRequestStatus, TStatusConfig } from '@/lib/types';

export const FOOTER_DATA: TFooterData[] = [
  { name: 'Home', icon: Home2, path: '/home' },
  { name: 'Requests', icon: CalendarSearch, path: '/requests' },
  { name: 'Visits', icon: CalendarTick, path: '/visits' },
  { name: 'Profile', icon: User, path: '/profile' },
];

export const LOGIN_STAGES = [
  'login',
  'forgotPassword',
  'resetPassword',
  'success',
] as const;

export const REQUEST_STATUS_CONFIG: Record<TRequestStatus, TStatusConfig> = {
  pending: {
    label: 'Waiting',
    bg: 'bg-yellow-400',
    text: 'text-yellow-500',
    icon: <Clock className="text-background-50 h-4 w-4 fill-yellow-500" />,
  },
  visit_scheduled: {
    label: 'Visit Scheduled',
    bg: 'bg-green-500',
    text: 'text-green-success-500',
    icon: (
      <TickCircle className="fill-green-success-500 text-background-50 h-4 w-4" />
    ),
  },
  visit_rescheduled: {
    label: 'Visit Rescheduled',
    bg: 'bg-green-500',
    text: 'text-green-success-500',
    icon: (
      <TickCircle className="fill-green-success-500 text-background-50 h-4 w-4" />
    ),
  },
  completed: {
    label: 'Completed',
    bg: 'bg-green-500',
    text: 'text-green-success-500',
    icon: (
      <TickCircle className="fill-green-success-500 text-background-50 h-4 w-4" />
    ),
  },
  cancelled: {
    label: 'Cancelled',
    bg: 'bg-red-500',
    text: 'text-red-900',
    icon: <CloseCircle className="text-background-50 h-4 w-4 fill-red-900" />,
  },
};

export const ICON_COLORS = {
  // Primary COlors
  'primary-400': 'var(--color-primary-400)',

  // Neutral Colors
  'neutral-50': 'var(--color-neutral-50)',
};

export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour < 20; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push({ value: time, label: time });
    }
  }
  return slots;
};
