import { TEMPLATES } from "../../ResumeBuilder/components/template";

const PrintableResume = ({ resume, ref }) => {
  if (!resume) return null;
  const Template = TEMPLATES[resume.template] ?? TEMPLATES.classic;

  return (
    <div className="hidden print:block">
      <div
        ref={ref}
        className="bg-white text-black text-[13px] leading-snug wrap-break-word"
        style={{ width: 794 }}
      >
        <Template
          data={resume}
          image={resume.personalInfo?.image || ""}
          accentColor={resume.accentColor}
        />
      </div>
    </div>
  );
};

export default PrintableResume;
