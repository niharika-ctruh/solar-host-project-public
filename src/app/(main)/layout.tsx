'use client';
import Footer from '@/components/layout/Footer';
import { getUser } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const MainLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();

    if (!user) {
      router.replace('/');
      return;
    }
  }, []);

  return (
    <div className="flex h-full flex-col antialiased">
      <div className="min-h-20 border border-[red]">Header</div>
      <div className="grow overflow-hidden overflow-y-scroll">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
