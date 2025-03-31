import classNames from 'classnames';
import type { ReactNode, SetStateAction } from 'react';

type InputProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  /** Good for buttons, etc. */
  suffix?: ReactNode;
};

function Input({ value, placeholder, onChange, suffix }: InputProps) {
  const onChangeInput = (event: {
    detail: { value: SetStateAction<string> };
  }) => onChange(event.detail.value.toString());

  // TODO: does Lynx support focus?

  return (
    <>
      <input
        className={classNames(
          'flex-grow p-2 h-full bg-white border border-slate-300 rounded-sm',
          { 'border-r-0 rounded-r-none': suffix },
        )}
        value={value}
        placeholder={placeholder}
        // @ts-ignore
        bindinput={onChangeInput}
      />
      {suffix}
    </>
  );
}

export default Input;
