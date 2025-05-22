'use client';

import { Dialog, DialogBackdrop } from '@headlessui/react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export default function AlertModal({
  isOpen,
  onClose,
  onConfirm,
  message,
}: AlertModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className='fixed z-50 inset-0 flex items-center justify-center'
    >
      <DialogBackdrop className='fixed inset-0 bg-black/30' />
      <div className='bg-white rounded-xl p-6 z-50 shadow-xl w-[90%] max-w-md'>
        <Dialog.Title className='text-lg font-semibold mb-4'>확인</Dialog.Title>
        <p className='mb-6'>{message}</p>
        <div className='flex justify-end gap-4'>
          <button
            onClick={onClose}
            className='px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 hover:cursor-pointer'
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600 hover:cursor-pointer'
          >
            확인
          </button>
        </div>
      </div>
    </Dialog>
  );
}
