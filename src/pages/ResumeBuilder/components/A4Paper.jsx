import { useEffect, useRef, useState } from "react";

// ukuran A4 (210mm x 297mm) dalam px di 96dpi
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

// kertas selalu dirender di ukuran A4 asli, lalu di-scale supaya muat di lebar container
const A4Paper = ({ id, className = "", children }) => {
  const containerRef = useRef(null);
  const paperRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [paperHeight, setPaperHeight] = useState(A4_HEIGHT);

  useEffect(() => {
    const container = containerRef.current;
    const paper = paperRef.current;
    if (!container || !paper) return;

    const observer = new ResizeObserver(() => {
      setScale(Math.min(container.clientWidth / A4_WIDTH, 1));
      setPaperHeight(paper.offsetHeight);
    });
    observer.observe(container);
    observer.observe(paper);
    return () => observer.disconnect();
  }, []);

  return (
    // tinggi wrapper ikut di-scale, karena transform tidak mengubah ukuran layout
    // saat print: scale & tinggi inline di-override (!) supaya kertas dicetak di ukuran A4 asli
    <div
      ref={containerRef}
      className="w-full print:h-auto!"
      style={{ height: paperHeight * scale }}
    >
      <div
        ref={paperRef}
        id={id}
        className={`bg-white shadow-md border border-base-300 origin-top-left print:shadow-none print:border-none print:transform-none! print:min-h-0! ${className}`}
        style={{
          width: A4_WIDTH,
          minHeight: A4_HEIGHT,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default A4Paper;
