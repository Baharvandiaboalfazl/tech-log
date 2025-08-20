const Modal = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md p-6 mx-4 bg-white dark:bg-slate-800 rounded-lg shadow-xl"
        dir="rtl"
      >
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="mt-5 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {children}
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onClose}
            type="button"
            className="px-6 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className="px-6 py-2 rounded-md border border-transparent bg-red-600 text-sm font-medium text-white hover:bg-red-700"
          >
            بله، حذف شود
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
