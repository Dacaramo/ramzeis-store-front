import { MutableRefObject, useEffect, useState } from 'react';

const useElementRect = (
  elementRef: MutableRefObject<HTMLElement | null>
): DOMRect | null => {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(() => {
      const boundingClientRect = element.getBoundingClientRect();
      setRect(boundingClientRect);
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  return rect;
};

export default useElementRect;
