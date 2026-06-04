import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const footerColumns: FooterColumn[] = [
  {
    title: "Platform",
    links: [
      { label: "Explore Projects", href: "/projects" },
      { label: "Featured Projects", href: "/projects/featured" },
      { label: "Categories", href: "/categories" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Trust & Safety", href: "/trust-safety" },
    ],
  },
  {
    title: "For Users",
    links: [
      { label: "For Students", href: "/students" },
      { label: "Submit Project", href: "/submit" },
      { label: "For Industry & Partners", href: "/partners" },
      { label: "Join as Partner", href: "/partners/join" },
      { label: "Contact Requests", href: "/requests" },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Technology", href: "/categories/technology" },
      { label: "Engineering", href: "/categories/engineering" },
      { label: "Business", href: "/categories/business" },
      { label: "Health", href: "/categories/health" },
      { label: "Agriculture", href: "/categories/agriculture" },
      { label: "Tourism", href: "/categories/tourism" },
      { label: "Education", href: "/categories/education" },
      { label: "Creative / Design", href: "/categories/creative-design" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Help Center", href: "/help" },
    ],
  },
];

const socialLinks: FooterLink[] = [
  { label: "LinkedIn", href: "/linkedin" },
  { label: "Facebook", href: "/facebook" },
  { label: "Instagram", href: "/instagram" },
  { label: "Email", href: "mailto:hello@univenture.lk" },
];

function FooterBrand() {
  return (
    <div className="max-w-md">
      <Link
        href="/"
        className="inline-flex items-center gap-3 rounded-xl text-white focus:outline-none focus:ring-4 focus:ring-white/20"
        aria-label="UniVenture home"
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/14 bg-white/10">
          <span className="h-4 w-4 rounded-md bg-gradient-to-br from-white via-blue-100 to-emerald-200" />
        </span>
        <span className="text-xl font-extrabold">UniVenture</span>
      </Link>
      <p className="mt-5 text-sm leading-7 text-white/62">
        A Sri Lankan university innovation marketplace connecting student projects, research, prototypes, and creative
        work with real-world opportunities.
      </p>
    </div>
  );
}

function FooterColumnLinks({ column }: { column: FooterColumn }) {
  return (
    <div>
      <h3 className="text-sm font-extrabold text-white">{column.title}</h3>
      <ul className="mt-4 grid gap-3">
        {column.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="inline-flex rounded-lg text-sm font-semibold text-white/62 transition hover:text-white focus:outline-none focus:ring-4 focus:ring-white/15"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterBottom() {
  return (
    <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-semibold text-white/55">&copy; 2026 UniVenture. All rights reserved.</p>
      <div className="flex flex-wrap gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="rounded-lg text-sm font-bold text-white/62 transition hover:text-white focus:outline-none focus:ring-4 focus:ring-white/15"
            aria-label={link.label}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950 pt-16 pb-8 text-white lg:pt-20 lg:pb-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(37,99,235,0.16),transparent_28%),radial-gradient(circle_at_88%_80%,rgba(16,185,129,0.12),transparent_30%)]" />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-12">
          <FooterBrand />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <FooterColumnLinks key={column.title} column={column} />
            ))}
          </div>
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}
