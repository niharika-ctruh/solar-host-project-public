'use client';
import Footer from '@/components/layout/Footer';
import { getUser } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const MainLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const router = useRouter();
  const pathname = usePathname();

  const hideFooterRoutes = ['/', '/requests/new'];
  const shouldHideFooter = hideFooterRoutes.includes(pathname);

  useEffect(() => {
    const user = getUser();

    if (!user) {
      router.replace('/');
      return;
    }
  }, []);

  return (
    <div className="mx-auto flex h-full max-w-lg flex-col antialiased">
      <div className="grow overflow-hidden">{children}</div>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
