import { exportResumePdf } from "../services/resumeService";

// semua CSS halaman (Tailwind + daisyUI + font) jadi satu string.
// @import (Google Fonts) harus di paling atas, kalau tidak browser mengabaikannya
const collectCss = () => {
  const imports = [];
  const rules = [];

  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        (rule instanceof CSSImportRule ? imports : rules).push(rule.cssText);
      }
    } catch {
      // stylesheet beda origin tidak bisa dibaca isinya, cukup di-link ulang
      if (sheet.href) imports.push(`@import url("${sheet.href}");`);
    }
  }

  return [...imports, ...rules].join("\n");
};

const blobToDataUrl = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

// foto yang baru dipilih (belum di-save) berupa blob: URL yang cuma ada di browser ini,
// jadi diubah ke data URL supaya bisa dirender di server
const inlineBlobImages = async (root) => {
  const images = [...root.querySelectorAll('img[src^="blob:"]')];
  await Promise.all(
    images.map(async (img) => {
      const blob = await fetch(img.src).then((res) => res.blob());
      img.src = await blobToDataUrl(blob);
    }),
  );
};

const saveBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

const sanitizeFilename = (name) =>
  (name || "Resume").replace(/[\\/:*?"<>|]+/g, "").trim() || "Resume";

// kertas resume (#resume-preview) + CSS dikirim ke backend, dirender Chromium jadi PDF
// dengan teks asli. Isinya sama persis dengan preview, termasuk edit yang belum di-save
export const downloadResumePdf = async (element, { resumeId, filename }) => {
  const clone = element.cloneNode(true);
  await inlineBlobImages(clone);

  const pdf = await exportResumePdf(resumeId, {
    html: clone.outerHTML,
    css: collectCss(),
  });

  saveBlob(pdf, `${sanitizeFilename(filename)}.pdf`);
};
