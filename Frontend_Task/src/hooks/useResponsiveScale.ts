import { useState, useEffect } from 'react';

export function useResponsiveScale() {
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState('100%');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newScale = 1;
      let newWidth = '100%';

      if (width >= 992 && width <= 1600) {
        newScale = 0.9;
        newWidth = `${(width / 0.9)}px`;
      } else if (width >= 700 && width <= 767) {
        newScale = 0.8;
        newWidth = `${(width / 0.8)}px`;
      } else if (width >= 600 && width < 700) {
        newScale = 0.75;
        newWidth = `${(width / 0.75)}px`;
      } else if (width <= 600) {
        newScale = 0.5;
        newWidth = `${(width / 0.5)}px`;
      }

      setScale(newScale);
      setContainerWidth(newWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { scale, containerWidth };
}
