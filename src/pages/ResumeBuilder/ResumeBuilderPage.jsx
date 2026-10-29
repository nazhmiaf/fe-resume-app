import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { getResumeById, updateResume } from "../../services/resumeService";
import {
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaPrint,
} from "react-icons/fa6";
import PersonalinfoForm from "./components/PersonalinfoForm";
import SummaryForm from "./components/SummaryForm";
import ExperienceForm from "./components/ExperienceForm";
import EducationForm from "./components/EducationForm";
import OrganizationForm from "./components/OrganizationForm";
import ProjectsForm from "./components/ProjectsForm";
import SkillForm from "./components/SkillForm";
import SettingForm from "./components/SettingForm";
import ResumePreview from "./components/ResumePreview";
import SharePopover from "./components/SharePopover";
import useDebounce from "../../hooks/useDebounce";
import { downloadResumePdf } from "../../utils/downloadResumePdf";
import { printResume } from "../../utils/printResume";
import ConfirmModal from "../../components/ui/ConfirmModal";

const ResumeBuilderPage = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const [resumeData, setResumeData] = useState({
    _id: "",
    userId: "",
    title: "",
    public: false,
    template: "classic",
    accentColor: "darkblue",
    summary: "",
    skills: [],
    personalInfo: {
      image: "",
      imageId: "",
      fullname: "",
      jobtitle: "",
      email: "",
      phone: "",
      address: "",
      linkedinUrl: "",
      portofolioUrl: "",
    },
    experience: [],
    projects: [],
    education: [],
    organization: [],
    createdAt: "",
    updatedAt: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBg, setRemoveBg] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingVisibility, setIsUpdatingVisibility] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const debouncedResumeData = useDebounce(resumeData, 500);

  const section = [
    { id: "personal", name: "Personal Info" },
    { id: "summary", name: "Summary" },
    { id: "experience", name: "Experience" },
    { id: "education", name: "Education" },
    { id: "organization", name: "Organization" },
    { id: "projects", name: "Projects" },
    { id: "skills", name: "Skills" },
    { id: "settings", name: "Settings" },
  ];

  const activeSection = section[activeSectionIndex];
  const isFirstStep = activeSectionIndex === 0;
  const isLastStep = activeSectionIndex === section.length - 1;
  const progress = ((activeSectionIndex + 1) / section.length) * 100;

  const goPrev = () => setActiveSectionIndex((prev) => Math.max(prev - 1, 0));
  const goNext = () =>
    setActiveSectionIndex((prev) => Math.min(prev + 1, section.length - 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSaveConfirm(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const image =
        resumeData.personalInfo.image instanceof File
          ? resumeData.personalInfo.image
          : undefined;

      await updateResume(resumeId, resumeData, {
        image,
        removeBackground: removeBg,
      });
      toast.success("Resume saved");
      navigate("/app");
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Couldn't save resume");
      setIsSaving(false);
    }
  };

  const handleTogglePublic = async () => {
    const next = !resumeData.public;
    setIsUpdatingVisibility(true);
    try {
      await updateResume(resumeId, { public: next });
      setResumeData((prev) => ({ ...prev, public: next }));
      toast.success(next ? "Link sharing is on" : "Resume is private again");
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Couldn't change visibility");
    } finally {
      setIsUpdatingVisibility(false);
    }
  };

  const handlePrint = () => printResume(resumeData.title);

  const handleDownload = async () => {
    const paper = document.getElementById("resume-preview");
    if (!paper) return;

    setIsDownloading(true);
    try {
      await downloadResumePdf(paper, { resumeId, filename: resumeData.title });
    } catch (error) {
      toast.error(
        error.response?.data?.message ??
          "Couldn't create the PDF. Try Print → Save as PDF instead.",
      );
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    getResumeById(resumeId)
      .then((res) => setResumeData(res.data.resume))
      .catch((error) =>
        toast.error(error.response?.data?.message ?? "Couldn't load resume"),
      )
      .finally(() => setIsLoading(false));
  }, [resumeId]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner text-primary" />
      </div>
    );
  }

  // console.log(resumeData);

  if (!resumeData._id) {
    return (
      <p className="text-center py-10 text-base-content/50">Resume not found</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto print:max-w-none">
      {/* print:hidden di semua bagian selain kertas resume, supaya yang tercetak cuma resume-nya */}
      <div className="px-4 py-7 flex items-center justify-between gap-4 print:hidden">
        <Link
          to={"/app"}
          className="flex hover:-translate-x-1 hover:text-primary transition-all duration-300 gap-2 items-center"
        >
          <FaArrowLeft />
          <p>Back to Dashboard</p>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="btn btn-sm btn-ghost"
            title="Print or save as PDF"
          >
            <FaPrint size={13} />
            Print
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="btn btn-sm btn-outline btn-primary"
          >
            {isDownloading ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <FaDownload size={12} />
            )}
            {isDownloading ? "Preparing..." : "Download PDF"}
          </button>
          <SharePopover
            resumeId={resumeId}
            title={resumeData.title}
            isPublic={Boolean(resumeData.public)}
            isUpdating={isUpdatingVisibility}
            onTogglePublic={handleTogglePublic}
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-12 gap-8 px-4 pb-10 print:block print:p-0">
        <div className="lg:col-span-6 min-w-0 print:hidden">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-box shadow-sm border border-base-300 overflow-hidden"
          >
            {/* progress bar */}
            <div className="h-1.5 bg-base-200">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="p-6">
              {/* header: step info */}
              <div className="mb-4">
                <p className="text-xs text-base-content/50">
                  Step {activeSectionIndex + 1} of {section.length}
                </p>
                <h2 className="text-lg font-semibold">
                  {/* {activeSection.name} */}
                </h2>
              </div>

              {/* step indicator, bisa diklik untuk lompat ke section */}
              <div className="flex gap-1.5 mb-6">
                {section.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSectionIndex(index)}
                    title={item.name}
                    aria-label={item.name}
                    className={`h-1.5 flex-1 rounded-full cursor-pointer transition-colors duration-300 ${
                      index <= activeSectionIndex
                        ? "bg-primary"
                        : "bg-base-300 hover:bg-base-content/30"
                    }`}
                  />
                ))}
              </div>

              {/* isi form per section */}
              <div className="min-h-64">
                {activeSection.id === "personal" && (
                  <PersonalinfoForm
                    data={resumeData.personalInfo}
                    onChance={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personalInfo: data,
                      }))
                    }
                    removeBg={removeBg}
                    setRemoveBg={setRemoveBg}
                  />
                )}
                {activeSection.id === "summary" && (
                  <SummaryForm
                    data={resumeData.summary}
                    onChance={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        summary: data,
                      }))
                    }
                  />
                )}
                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                  />
                )}
                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                  />
                )}
                {activeSection.id === "organization" && (
                  <OrganizationForm
                    data={resumeData.organization}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        organization: data,
                      }))
                    }
                  />
                )}
                {activeSection.id === "projects" && (
                  <ProjectsForm
                    data={resumeData.projects}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        projects: data,
                      }))
                    }
                  />
                )}
                {activeSection.id === "skills" && (
                  <SkillForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        skills: data,
                      }))
                    }
                  />
                )}
                {activeSection.id === "settings" && (
                  <SettingForm data={resumeData} onChange={setResumeData} />
                )}
              </div>

              {/* navigasi: prev di kiri, next / save di kanan */}
              <div className="flex justify-between items-center gap-2 mt-6 pt-4 border-t border-base-300">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={isFirstStep}
                  className={`btn btn-ghost ${isFirstStep ? "invisible" : ""}`}
                >
                  <FaChevronLeft size={12} />
                  Prev: {section[activeSectionIndex - 1]?.name}
                </button>
                {/* key beda supaya React bikin elemen baru, bukan ganti type tombol yang sama.
                    Tanpa ini, klik Next di step terakhir-1 ikut men-submit form */}
                {isLastStep ? (
                  <button key="save" type="submit" className="btn btn-primary">
                    Save Resume
                  </button>
                ) : (
                  <button
                    key="next"
                    type="button"
                    onClick={goNext}
                    className="btn btn-primary"
                  >
                    Next: {section[activeSectionIndex + 1].name}
                    <FaChevronRight size={12} />
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="lg:col-span-6 min-w-0">
          <ResumePreview
            data={debouncedResumeData}
            template={debouncedResumeData.template}
            accentColor={debouncedResumeData.accentColor}
          />
        </div>
      </div>

      <ConfirmModal
        isOpen={showSaveConfirm}
        title="Save resume?"
        message="Your changes will be saved and you'll be redirected to the dashboard."
        confirmText={isSaving ? "Saving..." : "Save"}
        isLoading={isSaving}
        onConfirm={handleSave}
        onClose={() => setShowSaveConfirm(false)}
      />
    </div>
  );
};

export default ResumeBuilderPage;
