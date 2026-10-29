import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { FaPlus } from "react-icons/fa";
import {
  FaDownload,
  FaEllipsis,
  FaPrint,
  FaShareNodes,
  FaXmark,
} from "react-icons/fa6";
import { toast } from "sonner";
import {
  createResume,
  deleteResume,
  getResumes as fetchResumes,
  updateResume,
} from "../../services/resumeService";
import { MdEdit, MdDelete } from "react-icons/md";
import ConfirmModal from "../../components/ui/ConfirmModal";
import ResumeThumbnail from "./components/ResumeThumbnail";
import PrintableResume from "./components/PrintableResume";
import ShareModal from "./components/ShareModal";
import { downloadResumePdf } from "../../utils/downloadResumePdf";
import { printResume } from "../../utils/printResume";
import { useNavigate } from "react-router";

const DashboardPage = () => {
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);
  const [paperResume, setPaperResume] = useState(null);
  const [shareResume, setShareResume] = useState(null);
  const [isUpdatingVisibility, setIsUpdatingVisibility] = useState(false);
  const paperRef = useRef(null);

  const navigate = useNavigate()

  const getResumes = useCallback(
    () =>
      fetchResumes()
        .then((res) => setResumes(res.data.resume))
        .catch((error) =>
          toast.error(
            error.response?.data?.message ?? "Couldn't load your resumes",
          ),
        )
        .finally(() => setIsLoading(false)),
    [],
  );

  useEffect(() => {
    getResumes();
  }, [getResumes]);

  const handleCreateResume = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setIsSubmitting(true);
    try {
      await createResume({ title });
      toast.success("Resume created", {
        description: `"${title.trim()}" is ready to edit.`,
      });
      closeShowCreateResume();
      getResumes();
    } catch (error) {
      setErrMsg(
        error.response?.data?.message ?? "Something went wrong. Try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  //open
  const openShowCreateResume = () => {
    setShowCreateResume(true);
  };

  //close
  const closeShowCreateResume = () => {
    setShowCreateResume(false);
    setTitle("");
    setErrMsg("");
  };

  // tutup dropdown menu titik tiga (daisyUI dropdown terbuka karena focus)
  const closeMenu = () => document.activeElement?.blur();

  // render kertas ukuran penuh untuk resume ini secara sinkron, supaya DOM-nya
  // langsung bisa dipakai di baris berikutnya (download / print)
  const renderPaper = (resume) => {
    flushSync(() => setPaperResume(resume));
    return paperRef.current;
  };

  const handleDownload = async (resume) => {
    setDownloadingId(resume._id);
    try {
      await downloadResumePdf(renderPaper(resume), {
        resumeId: resume._id,
        filename: resume.title,
      });
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Couldn't create the PDF");
    } finally {
      setDownloadingId(null);
    }
  };

  const handlePrint = async (resume) => {
    closeMenu();
    const paper = renderPaper(resume);
    // tunggu foto selesai di-load, kalau tidak bisa kosong di hasil print
    await Promise.all(
      [...paper.querySelectorAll("img")].map((img) => img.decode().catch(() => {})),
    );
    printResume(resume.title);
  };

  // simpan visibility saja, lalu update list + modal supaya toggle langsung berubah
  const handleTogglePublic = async () => {
    const next = !shareResume.public;
    setIsUpdatingVisibility(true);
    try {
      await updateResume(shareResume._id, { public: next });
      const update = (item) =>
        item._id === shareResume._id ? { ...item, public: next } : item;
      setResumes((prev) => prev.map(update));
      setShareResume(update);
      toast.success(next ? "Link sharing is on" : "Resume is private again");
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Couldn't change visibility");
    } finally {
      setIsUpdatingVisibility(false);
    }
  };

  const handleDeleteResume = async () => {
    setIsDeleting(true);
    try {
      await deleteResume(resumeToDelete._id);
      toast.success("Resume deleted", {
        description: `"${resumeToDelete.title}" has been removed.`,
      });
      setResumeToDelete(null);
      getResumes();
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Couldn't delete resume");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* print:hidden: saat print yang tercetak cuma PrintableResume */}
      <div className="max-w-7xl mx-auto px-4 py-8 print:hidden">
        {/* grid sama dengan list resume supaya ukurannya sama di semua layar */}
        <div className="grid grid-cols-2 sm:flex">
          <button
            onClick={openShowCreateResume}
            className="group w-full sm:w-48 h-80 flex flex-col items-center justify-center gap-2 rounded-box bg-base-100 text-base-content border-2 border-dashed border-base-content/30 cursor-pointer transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-lg"
          >
            <FaPlus
              size={16}
              className="text-primary transition-transform duration-300 group-hover:scale-125"
            />
            Create Resume
          </button>
        </div>

        <div className="border-t border-base-300 my-10">
          <h2 className="my-5 text-xl font-semibold">My Resumes</h2>
          {isLoading ? (
            <div className="flex justify-center py-6">
              <span className="loading loading-spinner text-primary" />
            </div>
          ) : !resumes.length ? (
            <p className="text-base-content/50 text-center">No resumes yet</p>
          ) : (
            <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
              {resumes.map((item) => (
                // div role="button", bukan <button>: isi thumbnail (h1, section, ul) tidak valid di dalam <button>
                <div
                  key={item._id}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/app/builder/${item._id}`)}
                  onKeyDown={(e) =>
                    // cek target supaya Enter di tombol dalam card tidak ikut membuka builder
                    e.key === "Enter" &&
                    e.target === e.currentTarget &&
                    navigate(`/app/builder/${item._id}`)
                  }
                  // tanpa overflow-hidden supaya dropdown menu tidak terpotong
                  className="w-full sm:w-48 h-80 flex flex-col rounded-box bg-white border border-base-300 cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-md"
                >
                  {/* thumbnail: kertas putih di atas latar abu, terpotong di bawah */}
                  <div className="flex-1 min-h-0 bg-base-200 px-3 pt-3 rounded-t-box overflow-hidden">
                    <div className="h-full rounded-t shadow-sm overflow-hidden">
                      <ResumeThumbnail resume={item} />
                    </div>
                  </div>

                  <div className="p-2.5 border-t border-base-300">
                    <p className="text-sm font-semibold truncate">{item.title}</p>
                    <p className="text-[11px] text-base-content/50">
                      Last update {new Date(item.updatedAt).toLocaleDateString()}
                    </p>

                    {/* aksi: stopPropagation supaya klik di sini tidak membuka builder */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 mt-2.5"
                    >
                      <button
                        type="button"
                        onClick={() => handleDownload(item)}
                        disabled={downloadingId === item._id}
                        className="btn btn-primary btn-sm flex-1"
                      >
                        {downloadingId === item._id ? (
                          <span className="loading loading-spinner loading-xs" />
                        ) : (
                          <FaDownload size={12} />
                        )}
                        {downloadingId === item._id ? "Preparing..." : "Download"}
                      </button>

                      <div className="dropdown dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          aria-label="More actions"
                          className="btn btn-outline btn-primary btn-sm btn-square"
                        >
                          <FaEllipsis size={14} />
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu bg-white rounded-box border border-base-300 shadow-md z-10 w-36 p-1 mt-1"
                        >
                          <li>
                            <button
                              type="button"
                              onClick={() => navigate(`/app/builder/${item._id}`)}
                            >
                              <MdEdit size={16} />
                              Edit
                            </button>
                          </li>
                          <li>
                            <button type="button" onClick={() => handlePrint(item)}>
                              <FaPrint size={14} />
                              Print
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              onClick={() => {
                                closeMenu();
                                setShareResume(item);
                              }}
                            >
                              <FaShareNodes size={14} />
                              Share
                            </button>
                          </li>
                          {/* delete dipisah garis supaya tidak kepencet */}
                          <li className="border-t border-base-300 mt-1 pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                closeMenu();
                                setResumeToDelete(item);
                              }}
                              className="text-error"
                            >
                              <MdDelete size={16} />
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showCreateResume && (
        <form
          onClick={closeShowCreateResume}
          onSubmit={handleCreateResume}
          className="fixed inset-0 z-200 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-box border border-base-300 bg-white p-6 shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4">Create a resume</h2>
            {errMsg && <p className="text-error text-center p-3">{errMsg}</p>}
            <input
              type="text"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="input focus:border-none rounded-field focus:ring-slate-700 w-full mb-4"
              placeholder="Enter resume title"
              required
            />
            <button
              type="submit"
              disabled={!title.trim() || isSubmitting}
              className="btn btn-primary rounded-button w-full"
            >
              {isSubmitting && (
                <span className="loading loading-spinner loading-sm" />
              )}
              Create Resume
            </button>
            <button
              type="button"
              onClick={closeShowCreateResume}
              aria-label="Close"
              className="absolute top-4 right-4 text-base-content/60 hover:text-base-content cursor-pointer"
            >
              <FaXmark size={18} />
            </button>
          </div>
        </form>
      )}

      <ConfirmModal
        isOpen={!!resumeToDelete}
        title="Delete resume?"
        message={`"${resumeToDelete?.title}" will be permanently deleted. This can't be undone.`}
        confirmText="Delete"
        variant="error"
        isLoading={isDeleting}
        onConfirm={handleDeleteResume}
        onClose={() => setResumeToDelete(null)}
      />

      <ShareModal
        resume={shareResume}
        isUpdating={isUpdatingVisibility}
        onTogglePublic={handleTogglePublic}
        onClose={() => setShareResume(null)}
      />

      <PrintableResume ref={paperRef} resume={paperResume} />
    </>
  );
};

export default DashboardPage;
