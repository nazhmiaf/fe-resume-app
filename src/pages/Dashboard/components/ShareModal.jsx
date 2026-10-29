import { FaXmark } from "react-icons/fa6";
import SharePanel from "../../ResumeBuilder/components/SharePanel";

const ShareModal = ({ resume, isUpdating, onTogglePublic, onClose }) => {
  if (!resume) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 print:hidden"
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-box border border-base-300 bg-white p-6 shadow-lg"
      >
        <h2 className="text-xl font-bold">Share resume</h2>
        <p className="text-sm text-base-content/60 truncate pr-6">{resume.title}</p>

        <SharePanel
          resumeId={resume._id}
          title={resume.title}
          isPublic={Boolean(resume.public)}
          isUpdating={isUpdating}
          onTogglePublic={onTogglePublic}
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-base-content/60 hover:text-base-content cursor-pointer"
        >
          <FaXmark size={18} />
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
