const Footer = () => {
  return (
    <footer className="border-t border-slate-700/70 py-6 text-slate-500">
      <div className="container flex max-w-6xl flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="leading-6">
          Originally developed as a university Artificial Intelligence course
          project.
        </p>
        <p className="shrink-0 leading-6">
          <span>&copy; {new Date().getFullYear()} </span>
          <a
            href="https://www.linkedin.com/in/theprimeshak/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-slate-300 underline decoration-slate-600 underline-offset-4 transition-colors hover:text-amber-300"
          >
            ThePrimeShak
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
