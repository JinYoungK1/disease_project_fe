import clsx from 'clsx';

interface Props {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  styles?: string;
  onClick?(): void;
}
function TextButton({
  text = '',
  onClick = () => null,
  type = 'button',
  styles = '',
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        'inline-flex items-center gap-x-2 rounded-lg border border-transparent px-4 py-3 font-bold disabled:pointer-events-none disabled:opacity-50',
        styles
      )}>
      {text}
    </button>
  );
}
export default TextButton;
