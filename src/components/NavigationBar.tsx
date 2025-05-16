import Link from 'next/link';
import Image from 'next/image';
export default function NavigationBar() {
  return (
    <div className='w-[18%] rounded-r-[25px] text-white bg-ml-yellow h-full flex flex-col justify-between p-5'>
      <ul className='flex flex-col gap-2 w-[84%] mx-auto mt-24'>
        <li className='w-full py-4 rounded-2xl '>
          <Link href='/dashboard' className='flex items-center gap-2'>
            <Image src='/dashboard.svg' alt='logo' width={18} height={18} />
            <p>가게 관리</p>
          </Link>
        </li>
        <li className='w-full py-4 rounded-2xl '>
          <Link href='/tables' className='flex items-center gap-2'>
            <Image src='/Table.svg' alt='logo' width={18} height={18} />
            <p>가게 관리</p>
          </Link>
        </li>
        <li className='w-full py-4 rounded-2xl '>
          <Link href='/categories' className='flex items-center gap-2'>
            <Image src='/Cate.svg' alt='logo' width={18} height={18} />
            <p>카테고리 관리</p>
          </Link>
        </li>
        <li className='w-full py-4 rounded-2xl '>
          <Link href='/menus' className='flex items-center gap-2'>
            <Image src='/Menu.svg' alt='logo' width={18} height={18} />
            <p>메뉴 관리</p>
          </Link>
        </li>
        <li className='w-full py-4 rounded-2xl '>
          <Link href='/orders' className='flex items-center gap-2'>
            <Image src='/Order.svg' alt='logo' width={18} height={18} />
            <p>주문 관리</p>
          </Link>
        </li>
      </ul>

      <p>Profile Placeholder</p>
    </div>
  );
}
