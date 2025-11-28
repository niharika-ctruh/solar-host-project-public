import { Icon } from 'iconsax-reactjs';

export type TFooterData = { name: string; icon: Icon; path: string };

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'disable';

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

export interface LoginUserBody {
  email: string;
  password: string;
}

export interface UserData {
  _id: string;
  token: string;
}

export type THostItemData = {
  name: string;
  id: string;
  totalVisits: number;
  address: string;
};

export type TRequestStatus = 'waiting' | 'confirmed' | 'cancelled';

export type TRequestDetailData = {
  name: string;
  id: string;
  date: string;
  time: string;
  status: TRequestStatus;
  expiryDate?: string;
};
