import { useState, useCallback } from 'react';

const useModal = () => {
  const wait = (seconds) =>
    new Promise((resolve) => {
      setTimeout(resolve, seconds * 1000);
    });
  const [isOpen, setIsOpen] = useState(false);
  const [isScale, setIsScale] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const openModal = useCallback(async () => {
    document.body.style.overflow = 'hidden';
    setIsOpen(true);
    await wait(0.1);
    setIsScale(true);
    await wait(0.25);
    setIsShow(true);
  }, []);
  const closeModal = useCallback(async () => {
    document.body.style.overflow = 'auto';
    setIsShow(false);
    setIsScale(false);
    await wait(0.35);
    setIsOpen(false);
  }, []);

  return { isOpen, isScale, isShow, openModal, closeModal };
};

export default useModal;
