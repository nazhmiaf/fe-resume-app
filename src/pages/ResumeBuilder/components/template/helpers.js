// helper yang dipakai bareng oleh semua template resume

// "2024-03" -> "Mar 2024", selain format itu ditampilkan apa adanya
export const formatDate = (value) => {
  if (!value) return "";
  const [year, month] = value.split("-");
  if (!year || !month) return value;
  return new Date(year, month - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

export const formatRange = (start, end, isCurrent = false) =>
  [formatDate(start), isCurrent ? "Present" : formatDate(end)]
    .filter(Boolean)
    .join(" - ");

// description dari textarea dipecah per baris jadi bullet, "-" / "•" / "*" di depan dibuang
export const toBullets = (text) =>
  (text || "")
    .split("\n")
    .map((line) => line.replace(/^\s*[-•*]\s*/, "").trim())
    .filter(Boolean);

export const getContacts = (personalInfo) =>
  [
    personalInfo.phone,
    personalInfo.email,
    personalInfo.linkedinUrl,
    personalInfo.portofolioUrl,
  ].filter(Boolean);
