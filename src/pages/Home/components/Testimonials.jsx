import { LuQuote, LuStar } from "react-icons/lu";
import Title from "./Title";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    quote:
      "I rebuilt my resume in under 20 minutes and landed three interviews the following week. The templates look genuinely professional.",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    quote:
      "The live preview is a game changer. I could tweak the layout and see exactly how the final PDF would look.",
  },
  {
    name: "David Miller",
    role: "Marketing Specialist",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    quote:
      "Sharing a link instead of attaching files made applying so much easier. Recruiters always see my latest version.",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testi"
      className="scroll-mt-20 px-4 md:px-10 lg:px-16 xl:px-20 py-24 md:py-32"
    >
      <Title
        section="Testimonials"
        title="Loved by job seekers everywhere"
        description="Thousands of people have used our builder to create resumes that get them hired."
      />

      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map(({ name, role, image, quote }) => (
          <figure
            key={name}
            className="relative flex flex-col rounded-box border border-base-300 bg-base-100 p-6 transition hover:shadow-lg"
          >
            <LuQuote className="absolute right-6 top-6 size-8 text-primary/15" />
            <div className="flex gap-0.5">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <LuStar key={i} className="size-4 fill-accent text-accent" />
                ))}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-base-content/80">
              "{quote}"
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-base-300 pt-4">
              <img
                src={image}
                alt={name}
                className="size-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-base-content">{name}</p>
                <p className="text-xs text-base-content/60">{role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
