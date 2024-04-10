const ArrowIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
      fill="currentColor"
    />
  </svg>
);

export const Footer = () => (
  <footer className="mb-16">
    <ul className="font-sm mt-8 flex flex-col space-y-2 space-x-0 text-neutral-600 md:flex-row md:space-y-0 md:space-x-4 dark:text-neutral-300">
      {[
        {
          href: "https://github.com/iliassjabali",
          title: "Github",
        },
        {
          href: "https://cal.com/iliassjabali",
          title: "Let's chat",
        },
      ].map(({ href, title }) => (
        <li key={href}>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href={href}
          >
            <ArrowIcon />
            <p className="ml-2 h-7">{title}</p>
          </a>
        </li>
      ))}
    </ul>
    <p className="mt-8 text-neutral-600 dark:text-neutral-300">
      Made with ❤️ in my basement
    </p>
  </footer>
);
