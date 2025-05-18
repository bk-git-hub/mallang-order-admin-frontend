'use client';

import { Category } from '@/types/Category';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu';
import Image from 'next/image';
import { useState } from 'react';
import { fetchWithToken } from '@/utils/fetchWithToken';
import { toast } from 'sonner';

interface CategoryDropdownProps {
  categories: Category[];
  onDelete?: () => void; // 삭제 후 목록 새로고침을 위한 콜백
}

export default function CategoryDeleter({
  categories,
  onDelete,
}: CategoryDropdownProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!selectedCategory) {
      toast.error('삭제할 카테고리를 선택해주세요');
      return;
    }

    try {
      setLoading(true);
      const response = await fetchWithToken(
        `${process.env.NEXT_PUBLIC_API_URL}/api/category/${selectedCategory.category_id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) throw new Error('Failed to delete category');

      toast.success('카테고리가 삭제되었습니다');
      setSelectedCategory(null);
      onDelete?.(); // 목록 새로고침
    } catch (error) {
      console.error('Failed to delete category:', error);
      toast.error('카테고리 삭제에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex w-full gap-8'>
      <div className='flex flex-col gap-2'>
        <DropdownMenu>
          <span className='inter-semibold'>삭제할 카테고리</span>
          <div className='flex gap-8 w-full'>
            <DropdownMenuTrigger
              className='outline-0 w-[400px] border border-ml-gray-dark text-black rounded-2xl flex'
              disabled={loading}
            >
              <span className='inter-regular w-full p-4 text-left'>
                {selectedCategory?.category_name || '카테고리 선택'}
              </span>
              <Image
                src='/DownArrow.svg'
                alt='arrow-down'
                width={16}
                height={16}
                className='mx-4'
              />
            </DropdownMenuTrigger>
            <button
              onClick={handleDelete}
              disabled={!selectedCategory || loading}
              className='flex items-center justify-center gap-2 rounded-2xl hover:cursor-pointer bg-ml-yellow text-white p-4 w-[200px] disabled:opacity-50'
            >
              <Image src='/Submit.svg' alt='add' width={16} height={16} />
              <span className='inter-regular'>
                {loading ? '처리중...' : '카테고리 삭제'}
              </span>
            </button>
          </div>

          <DropdownMenuContent className='w-[400px] left-0'>
            <DropdownMenuSeparator />
            {categories.map((category) => (
              <DropdownMenuItem
                className='w-[400px]'
                key={category.category_id}
                onSelect={() => setSelectedCategory(category)}
              >
                {category.category_name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
