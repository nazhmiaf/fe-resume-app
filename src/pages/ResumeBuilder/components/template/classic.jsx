import { formatRange, getContacts, toBullets } from "./helpers";

const Bullets = ({ text }) => {
  const items = toBullets(text);
  if (items.length === 0) return null;
  return (
    <ul className="list-disc pl-5 mt-1 space-y-0.5">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

const Section = ({ title, accentColor, children }) => (
  <section className="mt-5">
    <h2
      className="text-lg font-bold px-1 pb-0.5 mb-2 border-b-2"
      style={{ color: accentColor, borderColor: accentColor }}
    >
      {title}
    </h2>
    <div className="flex flex-col gap-3">{children}</div>
  </section>
);

// baris judul item: kiri judul (+ keterangan abu-abu), kanan tanggal
const ItemHeader = ({ title, subtitle, date }) => (
  <div className="flex justify-between items-start gap-4">
    <p>
      <span className="font-bold">{title}</span>
      {subtitle && (
        <span className="font-semibold text-gray-500"> - {subtitle}</span>
      )}
    </p>
    {date && <p className="whitespace-nowrap">{date}</p>}
  </div>
);

// layout satu kolom, formal, ATS-friendly
const ClassicTemplate = ({ data, image, accentColor }) => {
  const personalInfo = data?.personalInfo || {};
  const experience = data?.experience || [];
  const projects = data?.projects || [];
  const education = data?.education || [];
  const organization = data?.organization || [];
  const skills = data?.skills || [];
  const contacts = getContacts(personalInfo);

  return (
    <div className="p-10">
      <header className="flex gap-6 items-start">
        {image && (
          <img
            src={image}
            alt="Profile"
            className="w-28 h-32 object-cover shrink-0"
          />
        )}
        <div className="min-w-0">
          <h1
            className="text-3xl font-bold uppercase"
            style={{ color: accentColor }}
          >
            {personalInfo.fullname || "Your Name"}
          </h1>
          {personalInfo.jobtitle && (
            <p className="font-semibold mt-0.5">{personalInfo.jobtitle}</p>
          )}
          {contacts.length > 0 && (
            <p className="text-gray-500 mt-1 break-all">
              {contacts.map((item, index) => (
                <span key={item}>
                  {index > 0 && (
                    <span className="font-bold" style={{ color: accentColor }}>
                      {" "}
                      |{" "}
                    </span>
                  )}
                  {item}
                </span>
              ))}
            </p>
          )}
          {personalInfo.address && (
            <p className="text-gray-500">{personalInfo.address}</p>
          )}
          {/* di BE summary terpisah, tapi di preview digabung dengan personal info */}
          {data?.summary && (
            <p className="mt-1 text-sm text-justify whitespace-pre-line">
              {data.summary}
            </p>
          )}
        </div>
      </header>

      {experience.length > 0 && (
        <Section title="Work Experiences" accentColor={accentColor}>
          {experience.map((exp, index) => (
            <div key={exp._id || index}>
              <ItemHeader
                title={exp.company}
                date={formatRange(exp.startDate, exp.endDate, exp.isCurrent)}
              />
              {exp.potition && <p className="italic">{exp.potition}</p>}
              <Bullets text={exp.description} />
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education Level" accentColor={accentColor}>
          {education.map((edu, index) => (
            <div key={edu._id || index}>
              <ItemHeader
                title={edu.intituteName}
                date={formatRange(edu.startDate, edu.endDate)}
              />
              {(edu.degree || edu.fieldOfStudy || edu.gpa) && (
                <p className="italic">
                  {[edu.degree, edu.fieldOfStudy].filter(Boolean).join(" ")}
                  {edu.gpa && `, ${edu.gpa}`}
                </p>
              )}
            </div>
          ))}
        </Section>
      )}

      {organization.length > 0 && (
        <Section title="organizational experience " accentColor={accentColor}>
          {organization.map((org, index) => (
            <div key={org._id || index}>
              <ItemHeader
                title={org.organizationName}
                date={formatRange(org.startDate, org.endDate, org.isCurrent)}
              />
              {org.position && <p className="italic">{org.position}</p>}
              <Bullets text={org.description} />
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects" accentColor={accentColor}>
          {projects.map((project, index) => (
            <div key={project._id || index}>
              <ItemHeader title={project.name} subtitle={project.type} />
              <Bullets text={project.description} />
            </div>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills" accentColor={accentColor}>
          <ul className="list-disc pl-5">
            <li>{skills.join(", ")}</li>
          </ul>
        </Section>
      )}
    </div>
  );
};

export default ClassicTemplate;
