import { useEffect } from 'react';

const useOutsideClick = (ref, handleOutsideClick) => {
  useEffect(() => {
    const onClick = (e) => {
      if (!ref.current.contains(e.target)) {
        handleOutsideClick();
      }
    };

    document.addEventListener('mousedown', onClick);

    return () => {
      document.removeEventListener('mousedown', onClick);
    };
  });
};

export default useOutsideClick;
