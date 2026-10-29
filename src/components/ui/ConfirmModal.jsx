import { FaXmark } from "react-icons/fa6";

const variantClass = {
  primary: "btn-primary",
  error: "btn-error",
  warning: "btn-warning",
};

const ConfirmModal = ({
  isOpen,
  title = "Are you sure?",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "primary",
  isLoading = false,
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    if (!isLoading) onClose();
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-box border border-base-300 bg-base-100 p-6 shadow-lg"
      >
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        {message && <p className="text-base-content/70 mb-6">{message}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="btn btn-ghost rounded-button"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`btn ${variantClass[variant] ?? variantClass.primary} rounded-button`}
          >
            {isLoading && <span className="loading loading-spinner loading-sm" />}
            {confirmText}
          </button>
        </div>

        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-base-content/60 hover:text-base-content cursor-pointer"
        >
          <FaXmark size={18} />
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
