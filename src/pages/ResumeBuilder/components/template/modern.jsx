import {
  FaBriefcase,
  FaEnvelope,
  FaFolderOpen,
  FaGlobe,
  FaGraduationCap,
  FaLinkedin,
  FaLocationDot,
  FaPhone,
  FaUser,
  FaUsers,
} from "react-icons/fa6";
import { formatRange, toBullets } from "./helpers";

// judul section: teks uppercase + garis bawah, warnanya ikut accent color
const SectionTitle = ({ title, accentColor }) => (
  <h2
    className="text-[15px] font-bold uppercase tracking-[0.15em] pb-1 mb-3 border-b"
    style={{ color: accentColor, borderColor: accentColor }}
  >
    {title}
  </h2>
);

// section di kolom kanan: ikon bulat menempel di garis timeline
const TimelineSection = ({ title, icon: Icon, accentColor, children }) => (
  <section className="relative">
    <span
      className="absolute -left-10 top-0 size-6 rounded-full flex items-center justify-center text-white"
      style={{ backgroundColor: accentColor }}
    >
      <Icon size={11} />
    </span>
    <SectionTitle title={title} accentColor={accentColor} />
    <div className="flex flex-col gap-3">{children}</div>
  </section>
);

const Bullets = ({ text }) => {
  const items = toBullets(text);
  if (items.length === 0) return null;
  return (
    <ul className="list-disc pl-4 mt-1.5 space-y-0.5 text-gray-700 text-justify">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

// item: judul tebal + tanggal di kanan, keterangan di bawahnya
const Item = ({ title, subtitle, date, children }) => (
  <div>
    <div className="flex justify-between items-baseline gap-4">
      <p className="font-bold text-gray-900">{title}</p>
      {date && (
        <p className="text-[11px] uppercase whitespace-nowrap text-gray-700">
          {date}
        </p>
      )}
    </div>
    {subtitle && <p className="text-gray-700">{subtitle}</p>}
    {children}
  </div>
);

const ModernTemplate = ({ data, image, accentColor }) => {
  const personalInfo = data?.personalInfo || {};
  const experience = data?.experience || [];
  const projects = data?.projects || [];
  const education = data?.education || [];
  const organization = data?.organization || [];
  const skills = data?.skills || [];

  const contacts = [
    { icon: FaPhone, value: personalInfo.phone },
    { icon: FaEnvelope, value: personalInfo.email },
    { icon: FaLocationDot, value: personalInfo.address },
    { icon: FaLinkedin, value: personalInfo.linkedinUrl },
    { icon: FaGlobe, value: personalInfo.portofolioUrl },
  ].filter((item) => item.value);

  return (
    <div className="px-10 py-10 text-gray-800">
      {/* header */}
      <header className="flex items-center justify-between gap-6 pb-5 border-b-2 border-gray-800">
        <div className="min-w-0">
          <h1 className="text-[38px] font-extrabold uppercase tracking-wide leading-none text-gray-900">
            {personalInfo.fullname || "Your Name"}
          </h1>
          {personalInfo.jobtitle && (
            <p className="mt-3 text-base uppercase tracking-[0.2em] text-gray-700">
              {personalInfo.jobtitle}
            </p>
          )}
        </div>
        {image && (
          <img
            src={image}
            alt="Profile"
            className="size-24 rounded-full object-cover shrink-0"
          />
        )}
      </header>

      <div className="flex gap-8 mt-7">
        {/* kolom kiri */}
        <aside className="w-50 shrink-0 flex flex-col gap-7">
          {contacts.length > 0 && (
            <section>
              <SectionTitle title="Contact" accentColor={accentColor} />
              <ul className="flex flex-col gap-2.5 text-[12px]">
                {contacts.map(({ icon: Icon, value }) => (
                  <li key={value} className="flex items-start gap-2.5 break-all">
                    <Icon size={12} className="shrink-0 mt-0.5 text-gray-800" />
                    {value}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <SectionTitle title="Skills" accentColor={accentColor} />
              <ul className="list-disc pl-4 flex flex-col gap-1.5 text-[12px]">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* kolom kanan: timeline, garis vertikal di kiri */}
        <main className="relative flex-1 min-w-0 pl-10 flex flex-col gap-7">
          <div className="absolute left-3 top-3 bottom-0 w-px bg-gray-400" />

          {data?.summary && (
            <TimelineSection title="Profile" icon={FaUser} accentColor={accentColor}>
              <p className="text-justify whitespace-pre-line text-gray-700">
                {data.summary}
              </p>
            </TimelineSection>
          )}

          {experience.length > 0 && (
            <TimelineSection
              title="Work Experience"
              icon={FaBriefcase}
              accentColor={accentColor}
            >
              {experience.map((exp, index) => (
                <Item
                  key={exp._id || index}
                  title={exp.company}
                  subtitle={exp.potition}
                  date={formatRange(exp.startDate, exp.endDate, exp.isCurrent)}
                >
                  <Bullets text={exp.description} />
                </Item>
              ))}
            </TimelineSection>
          )}

          {organization.length > 0 && (
            <TimelineSection
              title="Organization"
              icon={FaUsers}
              accentColor={accentColor}
            >
              {organization.map((org, index) => (
                <Item
                  key={org._id || index}
                  title={org.organizationName}
                  subtitle={org.position}
                  date={formatRange(org.startDate, org.endDate, org.isCurrent)}
                >
                  <Bullets text={org.description} />
                </Item>
              ))}
            </TimelineSection>
          )}

          {projects.length > 0 && (
            <TimelineSection
              title="Projects"
              icon={FaFolderOpen}
              accentColor={accentColor}
            >
              {projects.map((project, index) => (
                <Item
                  key={project._id || index}
                  title={project.name}
                  subtitle={project.type}
                >
                  <Bullets text={project.description} />
                </Item>
              ))}
            </TimelineSection>
          )}

          {education.length > 0 && (
            <TimelineSection
              title="Education"
              icon={FaGraduationCap}
              accentColor={accentColor}
            >
              {education.map((edu, index) => (
                <Item
                  key={edu._id || index}
                  title={[edu.degree, edu.fieldOfStudy].filter(Boolean).join(" ") || edu.intituteName}
                  subtitle={
                    [
                      (edu.degree || edu.fieldOfStudy) && edu.intituteName,
                      edu.gpa && `GPA ${edu.gpa}`,
                    ]
                      .filter(Boolean)
                      .join(" | ")
                  }
                  date={formatRange(edu.startDate, edu.endDate)}
                />
              ))}
            </TimelineSection>
          )}
        </main>
      </div>
    </div>
  );
};

export default ModernTemplate;
