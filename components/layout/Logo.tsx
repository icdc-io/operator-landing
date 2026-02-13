import Image from 'next/image';
import { existsSync } from 'fs';
import { join } from 'path';

interface LogoProps {
  companyName: string;
  nameClassName?: string;
}

export default function Logo({ companyName, nameClassName = 'text-gray-900' }: LogoProps) {
  const hasCustomLogo = existsSync(join(process.cwd(), 'public', 'logo', 'logo.png'));
  const logoSrc = hasCustomLogo ? '/logo/logo.png' : '/logo/logo.default.png';

  return (
    <div className="flex items-center gap-2.5">
      <Image
        src={logoSrc}
        alt={companyName}
        width={36}
        height={36}
        className="h-9 w-auto object-contain flex-shrink-0"
      />
      <span className={`font-bold text-xl tracking-tight ${nameClassName}`}>{companyName}</span>
    </div>
  );
}
