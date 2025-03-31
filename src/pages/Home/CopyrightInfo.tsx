import type { ReactNode } from 'react';
import Link from '../../components/Link.jsx';

type CopyrightInfoProps = {
  description: string;
  link: string;
};

function CopyrightInfo({ description, link }: CopyrightInfoProps) {
  return (
    <view className="flex flex-col w-full px-2 py-1 rounded-sm bg-blue-200">
      <text className="text-xs text-blue-600">{description}:</text>
      <Link path={link}>{link}</Link>
    </view>
  );
}

export default CopyrightInfo;
