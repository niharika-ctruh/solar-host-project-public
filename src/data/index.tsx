import {
  CalendarRemove,
  CalendarSearch,
  CalendarTick,
  Clock,
  CloseCircle,
  Home2,
  TickCircle,
  User,
  Verify,
} from 'iconsax-reactjs';
import {
  TFooterData,
  TRequestStatus,
  TRequestStatusConfig,
  TVisitStatus,
  TVisitStatusConfig,
} from '@/lib/types';

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

export const REQUEST_STATUS_CONFIG: Record<
  TRequestStatus,
  TRequestStatusConfig
> = {
  pending: {
    label: 'Waiting',
    bg: 'bg-yellow-400',
    text: 'text-yellow-500',
    icon: <Clock size="16" className="text-background-50 fill-yellow-500" />,
  },
  visit_scheduled: {
    label: 'Visit Scheduled',
    bg: 'bg-green-500',
    text: 'text-green-success-500',
    icon: (
      <TickCircle
        size="16"
        className="fill-green-success-500 text-background-50"
      />
    ),
  },
  visit_rescheduled: {
    label: 'Visit Rescheduled',
    bg: 'bg-green-500',
    text: 'text-green-success-500',
    icon: (
      <TickCircle
        size="16"
        className="fill-green-success-500 text-background-50"
      />
    ),
  },
  completed: {
    label: 'Completed',
    bg: 'bg-green-500',
    text: 'text-green-success-500',
    icon: (
      <TickCircle
        size="16"
        className="fill-green-success-500 text-background-50"
      />
    ),
  },
  cancelled: {
    label: 'Cancelled',
    bg: 'bg-red-500',
    text: 'text-red-900',
    icon: <CloseCircle size="16" className="text-background-50 fill-red-900" />,
  },
};

export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push({ value: time, label: time });
    }
  }
  return slots;
};

export const VISIT_STATUS_CONFIG: Record<TVisitStatus, TVisitStatusConfig> = {
  visit_rescheduled: {
    label: 'Visit Rescheduled',
    leftBg: 'bg-blue-50',
    detailBg: 'bg-primary-400',
    detailText: 'text-primary-400',
    button: 'bg-blue-100 text-blue-600',
    icon: (
      <CalendarTick size="16" variant="Bold" className="text-primary-400" />
    ),
  },
  visit_scheduled: {
    label: 'Visit Scheduled',
    leftBg: 'bg-blue-50',
    detailBg: 'bg-primary-400',
    detailText: 'text-primary-400',
    button: 'bg-blue-100 text-blue-600',
    icon: (
      <CalendarTick size="16" variant="Bold" className="text-primary-400" />
    ),
  },
  completed: {
    label: 'Completed',
    leftBg: 'bg-green-600',
    detailBg: 'bg-green-success-500',
    detailText: 'text-green-success-500',
    button: 'bg-green-600 text-green-success-500!',
    icon: (
      <Verify size="16" variant="Bold" className="text-green-success-500" />
    ),
  },
  cancelled: {
    label: 'Cancelled',
    leftBg: 'bg-red-500',
    detailBg: 'bg-red-900',
    detailText: 'text-red-900',
    button: 'bg-red-600 text-red-900',
    icon: <CalendarRemove size="16" variant="Bold" className="text-red-900" />,
    className: 'line-through',
  },
};

export const VISIT_TABS_DATA = [
  { label: 'All', key: 'all' },
  { label: 'Upcoming', key: 'upcoming' },
  { label: 'Past', key: 'past' },
];
