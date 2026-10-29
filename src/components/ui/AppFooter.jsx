// footer ringkas untuk halaman di dalam app (/app/*).
// Landing page punya footer sendiri yang lebih lengkap (pages/Home/components/Footer.jsx)
const AppFooter = () => (
  <footer className="print:hidden border-t border-base-300 bg-base-100 text-base-content">
    <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-base-content/60">
      <p>© {new Date().getFullYear()} </p>
      <p>
        Made with <span aria-label="love">❤️</span> by{" "}
        <span className="font-semibold text-base-content">nazhmiaf</span>
      </p>
    </div>
  </footer>
);

export default AppFooter;
