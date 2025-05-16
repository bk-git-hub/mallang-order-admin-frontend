import Image from 'next/image';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-screen h-screen relative flex'>
      <h1 className='absolute top-[22px] left-[44px] barlow-600 font-semibold text-[28px] '>
        Mallang Order
      </h1>
      <div className='px-[360px] py-[165px] flex gap-[431px]'>
        {children}
        <div className='w-[483px] h-[483px] relative mt-[67px]'>
          <Image src='/logoT.png' alt='mallang order logo' fill />
        </div>
      </div>
    </div>
  );
}
