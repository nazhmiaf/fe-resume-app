import { LuArrowRight, LuMail } from "react-icons/lu";
import { Link } from "react-router";

const CallToAction = () => {
  return (
    <section
      id="cta"
      className="scroll-mt-20 px-4 md:px-10 lg:px-16 xl:px-20 pb-24 md:pb-32"
    >
      <div className="relative overflow-hidden max-w-6xl mx-auto rounded-box bg-linear-to-r from-primary to-secondary px-6 py-16 md:px-16 text-center text-primary-content">
        <div className="absolute -top-24 -left-24 size-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 -right-24 size-64 rounded-full bg-accent/20 blur-2xl" />

        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance max-w-2xl mx-auto">
            Ready to land your next job?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-base text-primary-content/80 text-pretty">
            Create your resume for free today, or reach out if you have any
            questions. We're happy to help.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="btn btn-accent btn-lg rounded-full px-8"
            >
              Get started
              <LuArrowRight className="size-5" />
            </Link>
            <a
              href="mailto:support@resumeapp.com"
              className="btn btn-outline btn-lg rounded-full px-8 border-primary-content/40 text-primary-content hover:bg-primary-content hover:text-primary"
            >
              <LuMail className="size-5" />
              Contact us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
