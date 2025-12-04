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

export type TVisitStatus = Exclude<TRequestStatus, 'pending'>;

export type TRequestStatusConfig = {
  label: string;
  bg: string;
  text: string;
  icon: ReactNode;
};

export type TVisitStatusConfig = {
  label: string;
  leftBg: string;
  detailBg: string;
  detailText: string;
  button: string;
  icon: ReactNode;
  className?: string;
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

export type UpdateRequestBody =
  | {
      status: TRequestStatus;
    }
  | {
      date: string;
    }
  | {
      timeSlot: string;
    }
  | {
      date: string;
      timeSlot: string;
    };

export interface RequestsListProps {
  isTodayVisits?: boolean;
  className?: string;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export type TVisitData = {
  _id: string;
  date: string;
  customer: {
    name: string;
    address: string;
    customerId: string;
  };
  acceptedHost: {
    name: string;
    visitHostedCount: number;
    hostSseId: string;
  };
  status: TVisitStatus;
  timeSlot: string;
  createdAt: string;
  consultant?: {
    firstName: string;
    lastName: string;
  };
};

export type TRequestData = Omit<TVisitData, 'acceptedHost' | 'status'> & {
  status: TRequestStatus;
  acceptedHost: TVisitData['acceptedHost'] & {
    address: { cluster: string; fullAddress: string };
  };
};
