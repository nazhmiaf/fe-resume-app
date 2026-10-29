import { FaShareNodes } from "react-icons/fa6";
import SharePanel from "./SharePanel";

// tombol Share di Builder: buka SharePanel sebagai dropdown
const SharePopover = (props) => (
  <div className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-sm btn-primary">
      <FaShareNodes size={13} />
      Share
    </div>

    <div
      tabIndex={0}
      className="dropdown-content z-50 mt-2 w-80 rounded-box border border-base-300 bg-white p-4 shadow-lg"
    >
      <p className="font-semibold">Share resume</p>
      <SharePanel {...props} />
    </div>
  </div>
);

export default SharePopover;
