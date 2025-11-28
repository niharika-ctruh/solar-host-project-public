'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ICON_COLORS, FOOTER_DATA } from '@/data';
import Link from 'next/link';
import { clearStorages } from '@/lib/utils';
import toast from 'react-hot-toast';

const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    setTimeout(() => {
      clearStorages();
      toast.success('Logged out successfully!');
      router.replace('/');
    }, 500);
  };

  return (
    <footer className="bg-background-50 pb-1">
      <div className="relative">
        <div className="font-dm-sans flex items-center justify-around">
          {FOOTER_DATA.map((item, idx) => {
            const Icon = item.icon;
            const activePath = pathname.includes(item.path);

            return (
              <Link
                key={idx}
                href={item.path}
                className="flex h-19.5 w-10 flex-col items-center justify-center gap-1"
              >
                <Icon
                  color={`${activePath ? ICON_COLORS['primary-400'] : ICON_COLORS['neutral-50']}`}
                />
                <span
                  className={`text-xs font-semibold ${activePath ? 'text-neutral-500' : 'text-neutral-50'}`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
          <div
            onClick={handleLogout}
            className="flex h-19.5 w-10 cursor-pointer flex-col items-center justify-center gap-1"
          >
            <Image
              src="/images/profile.png"
              alt="Profile"
              width={24}
              height={24}
              className="aspect-square h-6 w-6 rounded-full object-cover"
            />
            <span
              className={`text-xs font-semibold ${pathname.includes('/profile') ? 'text-neutral-500' : 'text-neutral-50'}`}
            >
              Profile
            </span>
          </div>
        </div>
        <div className="absolute inset-x-0 -top-5 h-5 rounded-t-[390px] bg-[#2A2A2A]/15 blur-[20px] filter" />
      </div>
      <div className="mx-auto h-0.5 w-31 rounded-[10px] bg-[#D9D9D9]" />
    </footer>
  );
};

export default Footer;
