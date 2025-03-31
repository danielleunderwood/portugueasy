import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onTap: () => void;
};

function Button({ children, onTap }: ButtonProps) {
  return (
    <view
      className="flex-grow-0 bg-blue-500 px-4 py-2 rounded-sm focus:drop-shadow-sm"
      bindtap={onTap}
    >
      <text>{children}</text>
    </view>
  );
}

export default Button;
