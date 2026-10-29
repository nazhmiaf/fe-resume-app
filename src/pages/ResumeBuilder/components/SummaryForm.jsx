const MAX_LENGTH = 500;

const SummaryForm = ({ data, onChance }) => {
  return (
    <>
      <h3 className="text-lg text-base-content font-bold">Professional Summary</h3>
      <p className="text-gray-500 text-sm">
        Write a short summary about yourself and your career
      </p>
      <div className="flex flex-col gap-1 mt-5">
        <textarea
          rows={7}
          maxLength={MAX_LENGTH}
          value={data || ""}
          onChange={(e) => onChance(e.target.value)}
          placeholder="Passionate frontend developer with 3+ years of experience building responsive web applications..."
          className="textarea w-full resize-none"
        />
        <p className="text-xs text-base-content/50 text-right">
          {(data || "").length}/{MAX_LENGTH}
        </p>
      </div>
    </>
  );
};

export default SummaryForm;
