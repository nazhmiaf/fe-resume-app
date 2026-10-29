import { Link, useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa6";

// kertas resume kosong sebagai ilustrasi, garis-garisnya meniru baris teks
const EmptyPaper = () => (
  <div className="relative w-36 h-48 rounded-box border border-base-300 bg-white shadow-sm rotate-[-4deg] p-4">
    <div className="h-2.5 w-2/3 rounded-full bg-base-300" />
    <div className="h-1.5 w-1/2 rounded-full bg-base-200 mt-2" />
    <div className="h-px bg-base-300 my-4" />
    <div className="space-y-2">
      <div className="h-1.5 rounded-full bg-base-200" />
      <div className="h-1.5 w-5/6 rounded-full bg-base-200" />
      <div className="h-1.5 w-4/6 rounded-full bg-base-200" />
    </div>
    <span className="absolute -right-3 -bottom-3 rotate-[4deg] rounded-full bg-primary text-primary-content text-sm font-bold px-3 py-1 shadow-sm">
      404
    </span>
  </div>
);

const NotFoundPage = () => {
  const navigate = useNavigate();

  // kalau halaman ini dibuka langsung (tidak ada riwayat di app), "back" akan keluar dari situs,
  // jadi arahkan ke home. React Router menyimpan posisi riwayat di history.state.idx
  const goBack = () =>
    window.history.state?.idx > 0 ? navigate(-1) : navigate("/");

  return (
    <main className="min-h-dvh flex items-center justify-center px-6 bg-base-100 text-base-content">
      <div className="flex flex-col items-center text-center max-w-md">
        <EmptyPaper />

        <h1 className="mt-10 text-3xl font-bold">This page doesn't exist</h1>
        <p className="mt-3 text-base-content/70">
          The link might be broken, or the page was moved or deleted. If someone
          shared a resume with you, ask them to check that it's set to public.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={goBack}
            className="btn btn-ghost"
          >
            <FaArrowLeft size={12} />
            Go back
          </button>
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
