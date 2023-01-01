import { useEffect } from "react";

export function useDisableNavScroll() {
  useEffect(() => {
    document.body.classList.toggle("no-nav-scroll", true);
    return () => {
      document.body.classList.toggle("no-nav-scroll", false);
    };
  }, []);
}
