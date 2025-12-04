import { ModalProps } from '@/lib/types';
import { useEffect, useRef } from 'react';

const Modal = ({ open, onClose, children, className = '' }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (open) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.body.style.overflow = ''; // Make sure to enable scroll on unmount
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-black/30 backdrop-blur-sm ${className}`}
    >
      <div
        ref={modalRef}
        className="border-background-400 max-h-[90vh] overflow-y-scroll rounded-lg border bg-white shadow-md backdrop-blur-lg"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
