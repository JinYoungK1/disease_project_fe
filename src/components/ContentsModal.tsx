import clsx from 'clsx';

type Props = {};

const ContentsModal = (props: Props) => {
  const contentsModalState = { 
    show: false, 
    title: '', 
    content: null, 
    size: 'max-w-5xl',
    onCancel: undefined,
    onConfirm: undefined,
    cancelText: '',
    confirmText: ''
  };
  const closeModal = () => {};

  return (
    <div
      className={clsx(
        `fixed start-0 top-0 z-50 block size-full overflow-y-auto overflow-x-hidden bg-gray-800/20 `,
        contentsModalState?.show ? 'block' : 'hidden'
      )}
      data-hs-overlay-keyboard="false">
      <div
        className={clsx(
          'absolute left-3/5 top-1/2 h-screen z-50 m-3 mt-0 flex w-full -translate-x-3/5 -translate-y-1/2 transform transition-all ease-out hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500',
          contentsModalState?.size ? contentsModalState.size : 'max-w-5xl'
          // opacity-0
        )}>
        <div className="pointer-events-auto flex w-full flex-col rounded-xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 className="font-bold text-gray-800">
              {contentsModalState?.title}
            </h3>
            <button
              type="button"
              className="flex size-7 items-center justify-center rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
              onClick={closeModal}>
              <span className="sr-only">Close</span>
              <svg
                className="size-4 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto p-4">
            <div className="mt-1">{contentsModalState?.content}</div>
          </div>
          <div
            className={clsx(
              'flex items-center justify-end gap-x-2 border-t px-4 py-3',
              {
                hidden:
                  !contentsModalState?.onCancel &&
                  !contentsModalState?.onConfirm,
              }
            )}>
            {contentsModalState?.onCancel && (
              <button
                type="button"
                className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
                onClick={closeModal}>
                {contentsModalState?.cancelText}
              </button>
            )}

            {contentsModalState?.onConfirm && (
              <button
                type="button"
                className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
                onClick={contentsModalState?.onConfirm}>
                {contentsModalState?.confirmText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentsModal;
