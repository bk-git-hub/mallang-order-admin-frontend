'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchWithToken } from '@/utils/fetchWithToken';
import { toast } from 'sonner';

interface StoreInfo {
  email: string;
  adminName: string;
  storeName: string;
}

export default function NavigationBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);

  useEffect(() => {
    fetchStoreInfo();
  }, []);

  const fetchStoreInfo = async () => {
    try {
      const response = await fetchWithToken(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/store-info`
      );
      if (!response.ok) throw new Error('Failed to fetch store info');
      const data = await response.json();
      setStoreInfo(data);
    } catch (error) {
      console.error('Failed to fetch store info:', error);
      toast.error('가게 정보를 불러오는데 실패했습니다');
    }
  };

  const handleLogout = () => {
    // Remove tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Remove tokens from cookies
    document.cookie =
      'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie =
      'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Redirect to login page
    router.push('/login');
  };

  const navItems = [
    { href: '/dashboard', label: '가게 관리', icon: 'Dashboard' },
    { href: '/categories', label: '카테고리 관리', icon: 'Cate' },
    { href: '/menus', label: '메뉴 관리', icon: 'Menu' },
    { href: '/orders', label: '주문 관리', icon: 'Order' },
  ];

  return (
    <div className='w-[18%] rounded-r-[25px] text-white bg-indigo-600 h-full flex flex-col'>
      <div className='p-6 flex flex-col items-center gap-4'>
        {storeInfo && (
          <>
            <div className='w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center'>
              <span className='text-indigo-600 text-xl font-semibold'>
                {storeInfo.adminName.slice(1, 3)}
              </span>
            </div>
            <div className='text-center'>
              <p className='font-semibold'>{storeInfo.adminName}</p>
              <p className='text-sm text-indigo-100'>{storeInfo.email}</p>
            </div>
          </>
        )}
      </div>

      <ul className='flex flex-col gap-2 w-[84%] mx-auto mt-4'>
        {navItems.map(({ href, label, icon }) => {
          const isSelected = pathname === href;
          const imageSrc = `/${icon}${isSelected ? 'S' : ''}.svg`;
          return (
            <li
              key={href}
              className={`w-full p-4 rounded-2xl ${
                isSelected
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'hover:bg-indigo-500'
              }`}
            >
              <Link href={href} className='flex items-center gap-2'>
                <Image src={imageSrc} alt={label} width={18} height={18} />
                <p>{label}</p>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className='mt-auto mb-8 w-[84%] mx-auto flex items-center gap-2 text-sm'>
        <button className='flex flex-1 items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-500 text-white hover:opacity-80 hover:cursor-pointer transition'>
          <Image src='/Delete-admin.svg' alt='탈퇴' width={18} height={18} />
          <span>탈퇴</span>
        </button>
        <button
          onClick={handleLogout}
          className='flex flex-1 items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-indigo-500 text-white hover:opacity-80 hover:cursor-pointer transition'
        >
          <Image src='/Logout.svg' alt='로그아웃' width={18} height={18} />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
}
