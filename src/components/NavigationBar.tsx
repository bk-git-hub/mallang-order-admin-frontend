'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function NavigationBar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: '가게 관리', icon: 'dashboard' },

    { href: '/categories', label: '카테고리 관리', icon: 'Cate' },
    { href: '/menus', label: '메뉴 관리', icon: 'Menu' },
    { href: '/orders', label: '주문 관리', icon: 'Order' },
  ];

  return (
    <div className='w-[18%] rounded-r-[25px] text-white bg-indigo-600 h-full flex flex-col  '>
      <p className='p-4 mx-auto'>Profile Placeholder</p>

      <ul className='flex flex-col gap-2 w-[84%] mx-auto mt-14'>
        {navItems.map(({ href, label, icon }) => {
          const isSelected = pathname === href;
          const imageSrc = `/${icon}${isSelected ? 'S' : ''}.svg`;
          return (
            <li
              key={href}
              className={`w-full p-4 rounded-2xl ${
                isSelected ? 'bg-indigo-100 text-indigo-600' : ''
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
    </div>
  );
}
