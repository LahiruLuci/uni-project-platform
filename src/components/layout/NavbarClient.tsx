"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { SafePlatformUser } from "@/lib/auth/current-user";

type NavLink = {
  label: string;
  href: string;
};

type ProfileLink = NavLink & {
  emphasis?: boolean;
};

const guestLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Categories", href: "/categories" },
  { label: "For Students", href: "/for-students" },
  { label: "For Industry & Partners", href: "/for-industry-partners" },
  { label: "How It Works", href: "/how-it-works" },
];

const studentLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Categories", href: "/categories" },
  { label: "For Students", href: "/for-students" },
  { label: "How It Works", href: "/how-it-works" },
];

const industryLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Categories", href: "/categories" },
  { label: "For Industry & Partners", href: "/for-industry-partners" },
  { label: "How It Works", href: "/how-it-works" },
];

const adminLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Admin Dashboard", href: "/admin" },
  { label: "Project Reviews", href: "/admin/projects" },
  { label: "Reports", href: "/admin/reports" },
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "UV";
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase()).join("");
}

function getRoleLabel(user?: SafePlatformUser | null) {
  if (!user) return "";
  if (user.status === "SUSPENDED") return "Account suspended";
  if (user.status === "DELETED") return "Account deleted";
  if (user.userType === "STUDENT") return "Student account";
  if (user.userType === "INDUSTRY_PARTNER") return "Industry Partner account";
  return "Admin account";
}

function getNavConfig(user: SafePlatformUser | null) {
  if (!user) {
    return {
      mainLinks: guestLinks,
      desktopActions: "guest" as const,
      profileLinks: [] as ProfileLink[],
      roleLabel: "",
    };
  }

  if (user.status !== "ACTIVE") {
    return {
      mainLinks: [
        { label: "Home", href: "/" },
        { label: "Explore", href: "/explore" },
      ],
      desktopActions: "limited" as const,
      profileLinks: [] as ProfileLink[],
      roleLabel: getRoleLabel(user),
    };
  }

  if (user.userType === "STUDENT") {
    return {
      mainLinks: studentLinks,
      desktopActions: "student" as const,
      roleLabel: "Student account",
      profileLinks: [
        { label: "Dashboard", href: "/dashboard" },
        { label: "My Projects", href: "/dashboard/projects" },
        { label: "Submit Project", href: "/submit-project", emphasis: true },
        { label: "Profile Settings", href: "/settings/profile" },
      ],
    };
  }

  if (user.userType === "INDUSTRY_PARTNER") {
    return {
      mainLinks: industryLinks,
      desktopActions: "industry" as const,
      roleLabel: "Industry Partner account",
      profileLinks: [
        { label: "Saved Projects", href: "/saved-projects" },
        { label: "Contact Requests", href: "/requests/contact" },
        { label: "Private Access Requests", href: "/requests/private-access" },
        { label: "Profile Settings", href: "/settings/profile" },
      ],
    };
  }

  return {
    mainLinks: adminLinks,
    desktopActions: "admin" as const,
    roleLabel: "Admin account",
    profileLinks: [
      { label: "Dashboard", href: "/admin" },
      { label: "Review Projects", href: "/admin/projects" },
      { label: "Users", href: "/admin/users" },
      { label: "Reports", href: "/admin/reports" },
    ],
  };
}

function isActiveLink(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  if (href === "/explore") return pathname === "/explore" || pathname.startsWith("/projects");
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function desktopLinkVisibility(index: number) {
  if (index < 4) return "inline-flex";
  if (index === 4) return "hidden xl:inline-flex";
  return "hidden 2xl:inline-flex";
}

function overflowLinkVisibility(index: number) {
  if (index < 4) return "lg:hidden";
  if (index === 4) return "xl:hidden";
  return "2xl:hidden";
}

function LogoutButton({
  className,
  onLogout,
}: {
  className: string;
  onLogout?: () => void;
}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function logout() {
    if (isPending) return;
    setIsPending(true);

    try {
      await fetch("/logout", {
        method: "POST",
        credentials: "same-origin",
        cache: "no-store",
      });
    } finally {
      onLogout?.();
      router.replace("/login");
      router.refresh();
      setIsPending(false);
    }
  }

  return (
    <button type="button" disabled={isPending} className={className} onClick={logout}>
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}

function Logo() {
  return (
    <Link href="/" className="group inline-flex min-h-11 items-center gap-3 rounded-xl text-white focus:outline-none focus:ring-4 focus:ring-white/20" aria-label="UniVenture home">
      <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/10 shadow-lg shadow-black/15 backdrop-blur-md transition group-hover:bg-white/15">
        <span className="h-4 w-4 rounded-md bg-gradient-to-br from-white via-blue-100 to-emerald-200 shadow-[0_0_22px_rgba(110,231,183,0.55)]" />
      </span>
      <span className="text-lg font-extrabold leading-none tracking-normal">UniVenture</span>
    </Link>
  );
}

function Avatar({ user, size = "md" }: { user: SafePlatformUser; size?: "sm" | "md" }) {
  const dimensions = size === "sm" ? "h-10 w-10 text-xs" : "h-11 w-11 text-sm";
  if (user.avatarUrl) {
    // Avatar URLs can come from external auth providers before image domains are configured.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={user.avatarUrl} alt="" className={`${dimensions} rounded-full border border-white/15 object-cover`} />;
  }

  return (
    <span className={`${dimensions} grid place-items-center rounded-full border border-white/15 bg-white text-slate-950 font-black shadow-lg shadow-black/15`}>
      {getInitials(user.fullName)}
    </span>
  );
}

function DesktopNavLinks({ links, pathname }: { links: NavLink[]; pathname: string }) {
  return (
    <div className="hidden items-center gap-1 lg:flex">
      {links.map((link, index) => {
        const active = isActiveLink(link.href, pathname);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`${desktopLinkVisibility(index)} rounded-xl px-2 py-2 text-xs font-semibold transition focus:outline-none focus:ring-4 focus:ring-white/15 xl:px-2.5 xl:text-sm 2xl:px-3 ${
              active ? "bg-white/12 text-white" : "text-white/74 hover:bg-white/10 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}

function GuestActions() {
  return (
    <>
      <Link
        href="/signup?role=industry"
        className="hidden rounded-xl px-3 py-2 text-sm font-bold text-white/72 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-white/15 min-[1440px]:inline-flex"
      >
        Join as Company
      </Link>
      <Link href="/login" className="rounded-xl px-3 py-2 text-sm font-bold text-white/78 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-white/15">
        Login
      </Link>
      <Link href="/login?redirect=/submit-project" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-extrabold text-slate-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-white/30">
        Submit Project
      </Link>
    </>
  );
}

function RoleActions({ mode }: { mode: ReturnType<typeof getNavConfig>["desktopActions"] }) {
  if (mode === "student") {
    return (
      <>
        <Link href="/dashboard/projects" className="rounded-xl px-3 py-2 text-sm font-bold text-white/78 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-white/15">
          My Projects
        </Link>
        <Link href="/submit-project" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-extrabold text-slate-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-white/30">
          Submit Project
        </Link>
      </>
    );
  }

  if (mode === "industry") {
    return (
      <>
        <Link href="/saved-projects" className="rounded-xl px-3 py-2 text-sm font-bold text-white/78 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-white/15">
          Saved Projects
        </Link>
        <Link href="/requests" className="rounded-xl px-3 py-2 text-sm font-bold text-white/78 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-white/15">
          Requests
        </Link>
      </>
    );
  }

  return null;
}

function ProfileMenu({
  user,
  roleLabel,
  links,
  pathname,
}: {
  user: SafePlatformUser;
  roleLabel: string;
  links: ProfileLink[];
  pathname: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex min-h-12 items-center gap-3 rounded-2xl border border-white/12 bg-white/10 px-2.5 py-2 text-left text-white shadow-lg shadow-black/15 backdrop-blur-xl transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
        aria-label="Open profile menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <Avatar user={user} />
        <span className="hidden min-w-0 xl:block">
          <span className="block max-w-36 truncate text-sm font-black">{user.fullName}</span>
          <span className="block text-xs font-bold text-white/52">{roleLabel}</span>
        </span>
        <span className={`hidden text-white/60 transition xl:block ${open ? "rotate-180" : ""}`}>v</span>
      </button>

      <div
        className={`absolute right-0 top-[calc(100%+0.75rem)] w-80 overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-950 shadow-2xl shadow-slate-950/20 transition ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="border-b border-slate-100 p-4">
          <div className="flex items-center gap-3">
            <Avatar user={user} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm font-black text-slate-950">{user.fullName}</p>
              <p className="truncate text-xs font-semibold text-slate-500">{user.email}</p>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.13em] text-blue-600">{roleLabel}</p>
            </div>
          </div>
        </div>

        <div className="grid p-2">
          {user.status === "ACTIVE" ? (
            links.map((link) => {
              const active = isActiveLink(link.href, pathname);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-2xl px-4 py-3 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-slate-100 ${
                    active ? "bg-slate-950 text-white" : link.emphasis ? "text-blue-700 hover:bg-blue-50" : "text-slate-700 hover:bg-slate-50"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })
          ) : (
            <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{roleLabel}</div>
          )}
        </div>

        <div className="border-t border-slate-100 p-2">
          <LogoutButton
            className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-black text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-wait disabled:opacity-70"
            onLogout={() => setOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

function MobileMenuButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/14 bg-white/[0.08] text-white shadow-lg shadow-black/15 backdrop-blur-md transition hover:border-white/25 hover:bg-white/14 focus:outline-none focus:ring-4 focus:ring-white/20 2xl:hidden"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
      onClick={onClick}
    >
      <span className="relative h-4 w-5" aria-hidden="true">
        <span className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-white transition ${isOpen ? "translate-y-[7px] rotate-45" : ""}`} />
        <span className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-white transition ${isOpen ? "opacity-0" : ""}`} />
        <span className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-white transition ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
      </span>
    </button>
  );
}

function MobileMenu({
  isOpen,
  onClose,
  user,
  roleLabel,
  mainLinks,
  profileLinks,
  pathname,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: SafePlatformUser | null;
  roleLabel: string;
  mainLinks: NavLink[];
  profileLinks: ProfileLink[];
  pathname: string;
}) {
  const activeUser = user?.status === "ACTIVE";

  return (
    <div
      id="mobile-navigation"
      className={`fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-slate-950/94 px-5 pb-6 pt-24 text-white shadow-2xl backdrop-blur-2xl transition duration-300 lg:inset-auto lg:right-6 lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:w-[390px] lg:rounded-3xl lg:border lg:border-white/10 lg:bg-slate-950/96 lg:p-4 xl:right-8 ${
        isOpen ? "visible translate-x-0 opacity-100" : "invisible translate-x-4 opacity-0"
      }`}
    >
      <div className="mx-auto flex min-h-full max-w-lg flex-col lg:min-h-0">
        {user ? (
          <div className="mb-4 rounded-3xl border border-white/10 bg-white/[0.06] p-4">
            <div className="flex items-center gap-3">
              <Avatar user={user} />
              <div className="min-w-0">
                <p className="truncate text-base font-black">{user.fullName}</p>
                <p className="truncate text-xs font-semibold text-white/55">{user.email}</p>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-emerald-200">{roleLabel}</p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid gap-2">
          {mainLinks.map((link, index) => {
            const active = isActiveLink(link.href, pathname);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`${overflowLinkVisibility(index)} rounded-xl border px-4 py-4 text-base font-bold transition focus:outline-none focus:ring-4 focus:ring-white/15 ${
                  active
                    ? "border-white/20 bg-white/14 text-white shadow-lg shadow-black/10"
                    : "border-white/10 bg-white/[0.04] text-white/84 hover:bg-white/10 hover:text-white"
                }`}
                onClick={onClose}
              >
                <span className="flex items-center justify-between gap-3">
                  {link.label}
                  {active ? <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" aria-hidden="true" /> : null}
                </span>
              </Link>
            );
          })}

          {!user ? (
            <Link
              href="/signup?role=industry"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-base font-bold text-white/84 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-white/15 min-[1440px]:hidden"
              onClick={onClose}
            >
              Join as Company
            </Link>
          ) : null}

          {user && activeUser
            ? profileLinks.map((link) => {
                const active = isActiveLink(link.href, pathname);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-xl border px-4 py-4 text-base font-bold transition focus:outline-none focus:ring-4 focus:ring-white/15 ${
                      active
                        ? "border-white/20 bg-white/14 text-white shadow-lg shadow-black/10"
                        : "border-white/10 bg-white/[0.04] text-white/84 hover:bg-white/10 hover:text-white"
                    }`}
                    onClick={onClose}
                  >
                    <span className="flex items-center justify-between gap-3">
                      {link.label}
                      {active ? <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" aria-hidden="true" /> : null}
                    </span>
                  </Link>
                );
              })
            : null}

          {user && user.status !== "ACTIVE" ? <div className="rounded-xl border border-red-300/20 bg-red-400/10 px-4 py-4 text-base font-bold text-red-100">{roleLabel}</div> : null}

          {!user ? (
            <>
              <Link href="/login" className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-base font-bold text-white/84 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-white/15 lg:hidden" onClick={onClose}>
                Login
              </Link>
            </>
          ) : null}
        </div>

        <div className="mt-auto grid gap-3 pt-8">
          {!user ? (
            <div className="lg:hidden">
              <Link href="/login?redirect=/submit-project" className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-white px-5 text-sm font-extrabold text-slate-950 shadow-xl shadow-black/25 transition hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-white/30 lg:hidden" onClick={onClose}>
                Submit Project
              </Link>
            </div>
          ) : (
            <LogoutButton
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-xl border border-red-300/20 bg-red-400/10 px-5 text-sm font-extrabold text-red-100 transition hover:bg-red-400/15 focus:outline-none focus:ring-4 focus:ring-red-200/20 disabled:cursor-wait disabled:opacity-70"
              onLogout={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function NavbarClient({ user }: { user: SafePlatformUser | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const config = useMemo(() => getNavConfig(user), [user]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/12 bg-slate-950/72 shadow-2xl shadow-black/20 backdrop-blur-2xl transition duration-300" aria-label="Primary navigation">
        <div className="mx-auto flex h-16 w-full max-w-[1680px] items-center gap-3 px-5 sm:h-[70px] sm:px-6 md:px-8 lg:h-20 lg:px-6 xl:gap-4 xl:px-8 2xl:px-12">
          <Logo />
          <div className="min-w-0 flex-1 lg:flex lg:justify-center">
            <DesktopNavLinks links={config.mainLinks} pathname={pathname} />
          </div>
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            {!user ? <GuestActions /> : <RoleActions mode={config.desktopActions} />}
            {user ? <ProfileMenu user={user} roleLabel={config.roleLabel} links={config.profileLinks} pathname={pathname} /> : null}
          </div>
          <MobileMenuButton isOpen={isOpen} onClick={() => setIsOpen((current) => !current)} />
        </div>
      </nav>
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        user={user}
        roleLabel={config.roleLabel}
        mainLinks={config.mainLinks}
        profileLinks={config.profileLinks}
        pathname={pathname}
      />
    </>
  );
}
