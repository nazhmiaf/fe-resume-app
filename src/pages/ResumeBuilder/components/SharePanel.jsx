import { useEffect, useState } from "react";
import { FaCheck, FaGlobe, FaLock, FaRegCopy } from "react-icons/fa6";

// isi panel share: toggle visibility + link publik.
// Dipakai di SharePopover (Builder) dan ShareModal (Dashboard).
// Link /view cuma bisa dibuka orang lain kalau resume-nya public, jadi toggle-nya ditaruh di sini juga
const SharePanel = ({ resumeId, title, isPublic, isUpdating, onTogglePublic }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/view/${resumeId}`;
  const canNativeShare = typeof navigator.share === "function";

  // label "Copied" balik lagi setelah 2 detik
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
  };

  const handleNativeShare = () => {
    // user batal share juga reject, jadi error-nya sengaja diabaikan
    navigator.share({ title, url: shareUrl }).catch(() => {});
  };

  return (
    <>
      {/* visibility */}
      <label className="mt-3 flex items-center gap-3 cursor-pointer">
        <span
          className={`size-9 shrink-0 rounded-full flex items-center justify-center ${
            isPublic ? "bg-primary/10 text-primary" : "bg-base-200 text-base-content/50"
          }`}
        >
          {isPublic ? <FaGlobe size={14} /> : <FaLock size={13} />}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-sm font-medium">
            {isPublic ? "Anyone with the link" : "Only you"}
          </span>
          <span className="block text-xs text-base-content/60">
            {isPublic
              ? "People with the link can view, not edit"
              : "Turn on to share a view-only link"}
          </span>
        </span>
        {isUpdating ? (
          <span className="loading loading-spinner loading-sm text-primary" />
        ) : (
          <input
            type="checkbox"
            className="toggle toggle-primary toggle-sm"
            checked={isPublic}
            onChange={onTogglePublic}
            aria-label="Public link"
          />
        )}
      </label>

      {/* link */}
      <div className={`mt-4 transition-opacity ${isPublic ? "" : "opacity-40 pointer-events-none"}`}>
        <div className="join w-full">
          <input
            type="text"
            readOnly
            value={shareUrl}
            onFocus={(e) => e.target.select()}
            className="input input-sm join-item flex-1 min-w-0 text-xs"
            aria-label="Resume link"
            tabIndex={isPublic ? 0 : -1}
          />
          <button
            type="button"
            onClick={handleCopy}
            className="btn btn-sm join-item w-24"
            tabIndex={isPublic ? 0 : -1}
          >
            {copied ? (
              <>
                <FaCheck size={12} className="text-primary" />
                Copied
              </>
            ) : (
              <>
                <FaRegCopy size={12} />
                Copy
              </>
            )}
          </button>
        </div>

        {/* share sheet bawaan HP (WhatsApp, email, dll), cuma muncul kalau browser support */}
        {canNativeShare && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="btn btn-sm btn-ghost w-full mt-2"
            tabIndex={isPublic ? 0 : -1}
          >
            More sharing options
          </button>
        )}
      </div>
    </>
  );
};

export default SharePanel;
