export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white/80 py-4 text-sm text-slate-500 backdrop-blur">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 md:flex-row md:px-6">
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} MyIMDB. All rights reserved.
        </p>
        <p className="text-center text-xs text-slate-400 md:text-right">
          Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};
