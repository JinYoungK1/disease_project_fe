import { useRef } from 'react';

type ClickHandler = (
  event: React.MouseEvent,
  product_code_sub?: string
) => void;

const useSingleAndDoubleClick = (
  actionSingleClick: ClickHandler,
  actionDoubleClick: ClickHandler,
  delay = 250
) => {
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = (event: React.MouseEvent, product_code_sub?: string) => {
    if (!clickTimeout.current) {
      clickTimeout.current = setTimeout(() => {
        actionSingleClick(event, product_code_sub);
        clickTimeout.current = null;
      }, delay);
    } else {
      clearTimeout(clickTimeout.current);
      actionDoubleClick(event, product_code_sub);
      clickTimeout.current = null;
    }
  };

  return handleClick;
};

export default useSingleAndDoubleClick;
