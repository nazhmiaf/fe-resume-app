const Title = ({ section, title, description }) => {
  return (
    <div className="max-w-xl mx-auto text-center mb-12">
      <p className="inline-flex items-center gap-3 text-base md:text-lg font-semibold text-primary">
        <span className="h-px w-8 bg-primary/60" />
        {section}
        <span className="h-px w-8 bg-primary/60" />
      </p>
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-base-content text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-base-content/70 text-pretty">
          {description}
        </p>
      )}
    </div>
  );
};

export default Title;
