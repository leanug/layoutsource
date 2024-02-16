import { useState } from 'react';

export function useAside() {
  const [isOpen, setIsOpen] = useState(false);
  
  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(prevIsOpen => ! prevIsOpen);
  };

  return {
    isOpen,
    openMenu,
    closeMenu,
    toggleMenu,
  };
}