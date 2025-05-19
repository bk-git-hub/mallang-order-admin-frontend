'use client';

import { useState, useEffect } from 'react';
import { fetchWithToken } from '@/utils/fetchWithToken';
import Image from 'next/image';
import { toast } from 'sonner';

interface OrderItem {
  menuId: number;
  menuName: string;
  menuPrice: number;
  quantity: number;
  totalPrice: number;
  createdAt: string;
}

interface TableOrder {
  kioskNumber: number;
  Order: OrderItem[];
}

interface StoreInfo {
  email: string;
  adminName: string;
  storeName: string;
  kioskCount: number;
}

// Mock data for testing UI
const mockOrders: TableOrder[] = [
  {
    kioskNumber: 1,
    Order: [
      {
        menuId: 1,
        menuName: '아메리카노',
        menuPrice: 4500,
        quantity: 2,
        totalPrice: 9000,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30분 전
      },
      {
        menuId: 2,
        menuName: '카페라떼',
        menuPrice: 5000,
        quantity: 1,
        totalPrice: 5000,
        createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15분 전
      },
    ],
  },
  {
    kioskNumber: 3,
    Order: [
      {
        menuId: 3,
        menuName: '치즈케이크',
        menuPrice: 6500,
        quantity: 1,
        totalPrice: 6500,
        createdAt: new Date().toISOString(), // 현재
      },
    ],
  },
];

export default function Orders() {
  const [orders, setOrders] = useState<TableOrder[]>(mockOrders);
  const [tableCount, setTableCount] = useState<number>(16);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true); // 로딩 시작

      // 가게 정보 가져오기 (테이블 수)
      const storeResponse = await fetchWithToken(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/store-info`
      );
      if (!storeResponse.ok) throw new Error('Failed to fetch store info');
      const storeData: StoreInfo = await storeResponse.json();
      setTableCount(storeData.kioskCount);

      // 주문 정보 가져오기 (현재는 mock data 사용)
      // const orderResponse = await fetchWithToken(
      //   `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders`
      // );
      // if (!orderResponse.ok) throw new Error('Failed to fetch orders');
      // const orderData = await orderResponse.json();
      // setOrders(orderData);

      // Mock data refresh
      setOrders([...mockOrders]);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error('데이터를 불러오는데 실패했습니다');
    } finally {
      setLoading(false); // 로딩 종료 (성공/실패 상관없이)
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='h-full flex-1 p-8 flex flex-col gap-[30px] overflow-y-scroll'>
      <div className='flex flex-col'>
        <h1 className='text-[32px] inter-semibold'>주문 관리</h1>
        <h2 className='text-[16px] inter-medium text-ml-gray-dark'>
          Order Management
        </h2>
      </div>

      <div className='bg-white rounded-3xl p-6 flex flex-col gap-8'>
        <div className='flex justify-between items-center'>
          <h3 className='text-[18px] inter-semibold'>테이블별 주문 현황</h3>
          <button
            onClick={fetchInitialData}
            disabled={loading}
            className='flex items-center justify-center gap-2 rounded-2xl bg-ml-yellow text-white px-4 py-2 disabled:opacity-50 hover:cursor-pointer'
          >
            <Image src='/Refresh.svg' alt='refresh' width={16} height={16} />
            <span className='inter-regular'>
              {loading ? '로딩중...' : '새로고침'}
            </span>
          </button>
        </div>

        {loading ? (
          <div className='flex justify-center items-center h-40'>
            <span className='text-ml-gray-dark'>
              주문 정보를 불러오는 중...
            </span>
          </div>
        ) : (
          <div className='grid grid-cols-4 gap-4'>
            {Array.from({ length: tableCount }, (_, i) => i + 1).map(
              (tableNum) => {
                const tableOrder = orders.find(
                  (order) => order.kioskNumber === tableNum
                );
                const hasActiveOrders =
                  tableOrder && tableOrder.Order.length > 0;

                return (
                  <div
                    key={tableNum}
                    className={`p-4 rounded-xl border shadow-md ${
                      hasActiveOrders
                        ? 'border-ml-yellow bg-white'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className='flex gap-20 justify-center items-center bg-[#F2F2F7] p-4 w-full'>
                      <div className='flex gap-2'>
                        <Image
                          src='/ForkKnife.svg'
                          alt='fork-knife'
                          width={30}
                          height={30}
                        />
                        <span className='text-2xl'>{tableNum}</span>
                      </div>

                      <span
                        className={`p-4 rounded-2xl whitespace-nowrap ${
                          hasActiveOrders
                            ? 'bg-[#FFE3BC] text-[#FF9500]'
                            : 'bg-[#D0E8FF] text-[#007BFF]'
                        }`}
                      >
                        {hasActiveOrders ? '사용중' : '빈테이블'}
                      </span>
                    </div>

                    <div className='mt-4'>
                      {hasActiveOrders ? (
                        <div className='space-y-4'>
                          {tableOrder.Order.map((item, index) => (
                            <div key={index} className='border-t pt-4'>
                              <div className='flex justify-between items-center mb-2'>
                                <div className='text-sm text-gray-500'>
                                  {formatDate(item.createdAt)}
                                </div>
                              </div>
                              <div className='space-y-2'>
                                <div className='flex justify-between text-sm'>
                                  <span>
                                    {item.menuName} x {item.quantity}
                                  </span>
                                  <span>
                                    {item.totalPrice.toLocaleString()}원
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className='flex justify-between font-semibold pt-2 border-t'>
                            <span>총 금액</span>
                            <span>
                              {tableOrder.Order.reduce(
                                (sum, item) => sum + item.totalPrice,
                                0
                              ).toLocaleString()}
                              원
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className='text-center text-gray-500 py-4 w-full border border-ml-yellow'>
                          주문 없음
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/*
{
  kioskNumber: number,
  Order: [
    {
      menuId: number,
      menuName: string,
      menuPrice: number,
      quantity: number,
      totalPrice: number,
      createdAt: string,
    }
  ]
}

*/
