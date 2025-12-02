import { Icon } from 'iconsax-reactjs';
import { ReactNode, SVGProps } from 'react';

export interface TQueryParams {
  [key: string]: string;
}

export type TFooterData = { name: string; icon: Icon; path: string };

export type IconProps = SVGProps<SVGSVGElement>;

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'disable';

export type TRequestStatus =
  | 'pending'
  | 'visit_scheduled'
  | 'visit_rescheduled'
  | 'completed'
  | 'cancelled';

export type TStatusConfig = {
  label: string;
  bg: string;
  text: string;
  icon: ReactNode;
};

export interface LoginUserBody {
  email: string;
  password: string;
}

export interface UserData {
  _id: string;
  token: string;
  email: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ButtonProps {
  variant?: ButtonVariant;
  content?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface SendRequestBody {
  customerId: string;
  name: string;
  coordinates: [number, number];
  address: string;
  date: string;
  timeSlot: string;
}

export interface DateItem {
  date: number;
  day: string;
}

export interface TRequestData {
  _id: string;
  date: string;
  timeSlot: string;
  status: TRequestStatus;
  customer: {
    customerId: string;
    name: string;
    consultantId: string;
    address: string;
  };
  acceptedHost: {
    address: { cluster: string; fullAddress: string };
    hostSseId: string;
    name: string;
    visitHostedCount: number;
  };
}

export type THostItemData = {
  name: string;
  id: string;
  totalVisits: number;
  address: string;
};

export type TRequestDetailData = {
  name: string;
  id: string;
  date: string;
  time: string;
  status: TRequestStatus;
};

export interface SendRequestFormType {
  customerName: string;
  customerId: string;
  dateOfVisit: Date | null;
  timeOfVisit: string;
  address: string;
}

// export interface UpdateRequestBody {
//   status: TRequestStatus;
// }

export interface RequestsListProps {
  isTodayVisits?: boolean;
  className?: string;
}
