// judul tab dipakai browser sebagai nama file saat "Save as PDF", jadi diganti sementara
// dengan judul resume lalu dikembalikan setelah dialog print ditutup
export const printResume = (title) => {
  const originalTitle = document.title;
  document.title = title || "Resume";
  window.addEventListener(
    "afterprint",
    () => {
      document.title = originalTitle;
    },
    { once: true },
  );
  window.print();
};
