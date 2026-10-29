import { LuGithub, LuInstagram, LuLinkedin, LuTwitter } from "react-icons/lu";

const links = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#feature" },
  { label: "Testimonials", href: "#testi" },
  { label: "Contact", href: "#cta" },
];

const socials = [
  { icon: LuGithub, href: "#", label: "GitHub" },
  { icon: LuLinkedin, href: "#", label: "LinkedIn" },
  { icon: LuTwitter, href: "#", label: "Twitter" },
  { icon: LuInstagram, href: "#", label: "Instagram" },
];

const Footer = () => {
  return (
    <footer className="border-t border-base-300 bg-base-200 px-6 md:px-10 lg:px-16 xl:px-20 py-10 text-base-content">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-wrap justify-center gap-6 text-sm [&>a]:transition [&>a:hover]:text-primary">
          {links.map(({ label, href }) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-base-content/60 transition hover:text-primary"
            >
              <Icon className="size-5" />
            </a>
          ))}
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-base-content/60">
        © {new Date().getFullYear()} ResumeApp. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
