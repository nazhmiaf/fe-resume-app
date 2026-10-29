import { memo, useEffect, useMemo } from "react";
import A4Paper from "./A4Paper";
import { TEMPLATES } from "./template";

const ResumePreview = ({ data, template, accentColor }) => {
  const personalImage = data?.personalInfo?.image;

  // object URL cuma dibuat ulang kalau file-nya ganti, dan yang lama di-revoke
  const image = useMemo(() => {
    if (!personalImage) return "";
    if (typeof personalImage === "string") return personalImage;
    return URL.createObjectURL(personalImage);
  }, [personalImage]);

  useEffect(() => {
    if (!image.startsWith("blob:")) return;
    return () => URL.revokeObjectURL(image);
  }, [image]);

  const Template = TEMPLATES[template] ?? TEMPLATES.classic;

  // warna sengaja hard-coded (bukan token tema) karena ini "kertas" resume,
  // satu-satunya warna yang berubah adalah accentColor dari Settings
  return (
    <div className="w-full lg:sticky lg:top-24 print:static" data-template={template}>
      <A4Paper
        id="resume-preview"
        className="text-black text-[13px] leading-snug wrap-break-word"
      >
        <Template data={data} image={image} accentColor={accentColor} />
      </A4Paper>
    </div>
  );
};

// skip render ulang kalau props sama (misal saat ngetik tapi debounce belum selesai)
export default memo(ResumePreview);
