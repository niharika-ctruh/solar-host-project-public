import { InputHTMLAttributes } from 'react';
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
}) => {
  const inputProps = register ? { ...register, ...props } : { value, ...props };
  const inputId = id || inputProps?.name;

  return (
    <div className="font-dm-sans flex w-full flex-col gap-2 text-left">
      <input
        type="text"
        id={inputId}
        placeholder={placeholderText}
        disabled={disabled}
        readOnly={readOnly}
        className={`focus:border-primary-400 focus:bg-primary-50 bg-background-50 text-light-muted-foreground [&::-moz-appearance]:textfield block h-10 appearance-none rounded-md border px-4 py-2 text-sm leading-[19px] font-medium -tracking-[0.56px] focus:border-2 focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${errorText ? 'border-red-900!' : 'border-background-400'} [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${className}`}
        {...inputProps}
      />
      {errorText && (
        <p className="text-sm leading-[19px] font-medium -tracking-[0.56px] text-red-900">
          {errorText}
        </p>
      )}
    </div>
  );
};

export default Input;
