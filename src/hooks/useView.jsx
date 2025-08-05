import { useEffect, useRef, useState } from 'react';

const useView = (onIntersect, options = { threshold: 0.1 }) => {
  const [element, setElement] = useState(null);
  const observer = useRef();

  useEffect(() => {
    if (!element) return;

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    }, options);

    observer.current.observe(element);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [element, onIntersect, options]);

  return [setElement];
};

export default useView;