import {
  LuEye,
  LuFileDown,
  LuLayoutTemplate,
  LuPalette,
  LuShare2,
  LuShieldCheck,
} from "react-icons/lu";
import Title from "./Title";

const features = [
  {
    icon: LuLayoutTemplate,
    title: "Professional templates",
    description:
      "Start from clean, recruiter-approved layouts instead of a blank page.",
  },
  {
    icon: LuShieldCheck,
    title: "ATS-friendly",
    description:
      "Every template is structured so applicant tracking systems can read it.",
  },
  {
    icon: LuEye,
    title: "Live preview",
    description:
      "See every change instantly as you fill in your experience and skills.",
  },
  {
    icon: LuPalette,
    title: "Easy customization",
    description:
      "Adjust colors, sections, and order to match your personal style.",
  },
  {
    icon: LuFileDown,
    title: "Instant PDF export",
    description: "Download a polished, print-ready PDF with a single click.",
  },
  {
    icon: LuShare2,
    title: "Shareable link",
    description:
      "Send recruiters a public link to your resume, always up to date.",
  },
];

const Features = () => {
  return (
    <section
      id="feature"
      className="bg-base-200 scroll-mt-20 px-4 md:px-10 lg:px-16 xl:px-20 py-24 md:py-32"
    >
      <Title
        section="Features"
        title="Everything you need to build a standout resume"
        description="From smart templates to instant PDF export, every tool is designed to help you apply faster and get noticed."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group rounded-box border border-base-300 bg-base-100 p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
          >
            <div className="flex size-12 items-center justify-center rounded-box bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-content">
              <Icon className="size-6" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-base-content">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-base-content/70">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
