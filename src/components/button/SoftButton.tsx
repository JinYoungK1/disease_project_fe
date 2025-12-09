import clsx from 'clsx';

interface Props {
  text: React.ReactNode;  
  type?: 'button' | 'submit' | 'reset';
  styles?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // 이벤트 객체를 받을 수 있도록 수정
  children?: React.ReactNode; // children을 추가하여 자식 요소를 받을 수 있게 합니다.
  disabled?: boolean;
}
function SoftButton({
  text = '',
  onClick = () => null,
  type = 'button',
  styles = '',
  children,
  disabled,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'inline-flex items-center gap-x-2 whitespace-nowrap rounded-lg border border-transparent px-3 py-2 text-md font-semibold disabled:pointer-events-none disabled:opacity-50',
        styles
      )}>
      {children}
      {text}
    </button>
  );
}
export default SoftButton;
