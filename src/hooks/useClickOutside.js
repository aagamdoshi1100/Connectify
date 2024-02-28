import { useEffect } from "react";

export default function useClickOutside(ref, onOutsideClick) {
  useEffect(() => {
    const outSideClickHandler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    };
    document.addEventListener("mousedown", outSideClickHandler);
    return () => {
      document.removeEventListener("mousedown", outSideClickHandler);
    };
  }, [ref, onOutsideClick]);
}
