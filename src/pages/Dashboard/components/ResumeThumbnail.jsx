import { useEffect, useRef, useState } from "react";
import { TEMPLATES } from "../../ResumeBuilder/components/template";

// lebar A4 di 96dpi, sama dengan A4Paper
const A4_WIDTH = 794;

// render template resume asli di ukuran A4, lalu di-scale supaya pas lebar card.
// bagian bawah yang tidak muat dipotong (overflow-hidden), jadi yang kelihatan halaman atasnya
const ResumeThumbnail = ({ resume }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() =>
      setScale(container.clientWidth / A4_WIDTH),
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const Template = TEMPLATES[resume.template] ?? TEMPLATES.classic;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="h-full w-full overflow-hidden bg-white"
    >
      {/* tunggu scale terukur dulu supaya tidak sempat tampil ukuran penuh */}
      {scale > 0 && (
        <div
          className="origin-top-left pointer-events-none select-none text-black text-[13px] leading-snug wrap-break-word"
          style={{ width: A4_WIDTH, transform: `scale(${scale})` }}
        >
          <Template
            data={resume}
            image={resume.personalInfo?.image || ""}
            accentColor={resume.accentColor}
          />
        </div>
      )}
    </div>
  );
};

export default ResumeThumbnail;
