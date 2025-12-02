import { InputHTMLAttributes, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

const Input = ({
  className,
  placeholderText = '',
  disabled = false,
  value,
  readOnly,
  errorText,
  register,
  id,
  leftIcon,
  rightIcon,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  placeholderText?: string;
  disabled?: boolean;
  value?: string;
  readOnly?: boolean;
  errorText?: string;
  register?: UseFormRegisterReturn;
  id?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}) => {
  const inputProps = register ? { ...register, ...props } : { value, ...props };
  const inputId = id || inputProps?.name;
  const isIconPresent = leftIcon || rightIcon;

  return (
    <div className="font-dm-sans flex w-full flex-col gap-2 text-left">
      <div
        className={`focus-within:border-primary-400 focus-within:bg-primary-50 relative flex items-center gap-2.5 rounded-md border ${isIconPresent ? 'p-3' : ''} ${errorText ? 'border-red-900!' : 'border-gray-400'} `}
      >
        {leftIcon}
        <input
          type="text"
          id={inputId}
          placeholder={placeholderText}
          disabled={disabled}
          readOnly={readOnly}
          className={`peer bg-background-50 text-light-muted-foreground [&::-moz-appearance]:textfield focus:bg-primary-50 block grow appearance-none rounded-md text-sm leading-[19px] font-medium -tracking-[0.56px] focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${isIconPresent ? 'h-5' : 'h-10 px-4 py-2'} ${className}`}
          {...inputProps}
        />
        {rightIcon}
      </div>
      {errorText && (
        <p className="text-sm leading-[19px] font-medium -tracking-[0.56px] text-red-900">
          {errorText}
        </p>
      )}
    </div>
  );
};

export default Input;
