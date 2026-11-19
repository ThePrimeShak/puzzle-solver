const Header = () => {
  return (
    <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="container flex max-w-6xl flex-wrap items-center justify-between gap-3 py-4">
        <a
          href="./"
          className="group flex min-w-0 items-center gap-3"
          aria-label="8-Puzzle State Explorer home"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center border border-amber-300/50 bg-amber-300 font-mono text-base font-bold text-slate-950 transition-colors group-hover:bg-amber-200">
            8P
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-bold tracking-tight text-white sm:text-lg">
              8-Puzzle State Explorer
            </span>
            <span className="hidden text-xs text-slate-400 sm:block">
              Artificial Intelligence course project
            </span>
          </span>
        </a>

        <nav
          className="ml-auto flex shrink-0 items-center gap-2"
          aria-label="Project links"
        >
          <a
            href="https://github.com/ThePrimeShak/puzzle-solver"
            target="_blank"
            rel="noreferrer"
            className="header-link"
            aria-label="View the 8-Puzzle State Explorer repository on GitHub"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4 fill-current"
            >
              <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.58-.29-5.29-1.29-5.29-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.16 1.18a10.96 10.96 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.41-2.72 5.38-5.31 5.67.42.36.79 1.07.79 2.16v3.23c0 .31.21.67.8.55A11.5 11.5 0 0 0 12 .7Z" />
            </svg>
            <span className="hidden sm:inline">Source code</span>
          </a>

          <a
            href="https://www.linkedin.com/in/theprimeshak/"
            target="_blank"
            rel="noreferrer"
            className="header-link header-link-primary"
            aria-label="Visit ThePrimeShak on LinkedIn"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4 fill-current"
            >
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.04H3.54V8.98H7.1v11.47Z" />
            </svg>
            <span>ThePrimeShak</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
