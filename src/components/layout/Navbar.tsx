"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Categories", href: "/categories" },
  { label: "For Students", href: "/students" },
  { label: "For Companies", href: "/companies" },
  { label: "How It Works", href: "/how-it-works" },
];

function Logo() {
  return (
    <Link
      href="/"
      className="group inline-flex min-h-11 items-center gap-3 rounded-xl text-white focus:outline-none focus:ring-4 focus:ring-white/20"
      aria-label="UniVenture home"
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/10 shadow-lg shadow-black/15 backdrop-blur-md transition group-hover:bg-white/15">
        <span className="h-4 w-4 rounded-md bg-gradient-to-br from-white via-blue-100 to-emerald-200 shadow-[0_0_22px_rgba(110,231,183,0.55)]" />
      </span>
      <span className="text-lg font-extrabold leading-none tracking-normal">UniVenture</span>
    </Link>
  );
}

function DesktopNavLinks() {
  return (
    <div className="hidden items-center gap-1 lg:flex">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-xl px-3 py-2 text-sm font-semibold text-white/74 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-white/15 xl:px-4"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

function NavbarActions() {
  return (
    <div className="hidden items-center gap-3 lg:flex">
      <Link
        href="/companies"
        className="hidden rounded-xl px-3 py-2 text-sm font-bold text-white/72 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-white/15 xl:inline-flex"
      >
        Join as Company
      </Link>
      <Link
        href="/login"
        className="rounded-xl px-3 py-2 text-sm font-bold text-white/78 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-white/15"
      >
        Login
      </Link>
      <Link
        href="/submit"
        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-extrabold text-slate-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-white/30"
      >
        Submit Project
      </Link>
    </div>
  );
}

function MobileMenuButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/14 bg-white/10 text-white shadow-lg shadow-black/15 backdrop-blur-md transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20 lg:hidden"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
      onClick={onClick}
    >
      <span className="relative h-4 w-5" aria-hidden="true">
        <span
          className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-white transition ${isOpen ? "translate-y-[7px] rotate-45" : ""}`}
        />
        <span
          className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-white transition ${isOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-white transition ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
        />
      </span>
    </button>
  );
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <div
      id="mobile-navigation"
      className={`fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-slate-950/92 px-5 pb-6 pt-24 text-white shadow-2xl backdrop-blur-2xl transition duration-300 lg:hidden ${
        isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0"
      }`}
    >
      <div className="mx-auto flex min-h-full max-w-lg flex-col">
        <div className="grid gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-base font-bold text-white/84 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-white/15"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-base font-bold text-white/84 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-white/15"
            onClick={onClose}
          >
            Login
          </Link>
        </div>

        <div className="mt-auto grid gap-3 pt-8">
          <Link
            href="/submit"
            className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-white px-5 text-sm font-extrabold text-slate-950 shadow-xl shadow-black/25 transition hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-white/30"
            onClick={onClose}
          >
            Submit Project
          </Link>
          <Link
            href="/companies"
            className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-white/18 bg-white/10 px-5 text-sm font-extrabold text-white transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
            onClick={onClose}
          >
            Join as Company
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-50 border-b border-white/12 bg-slate-950/72 shadow-2xl shadow-black/20 backdrop-blur-2xl transition duration-300"
        aria-label="Primary navigation"
      >
        <div className="mx-auto flex h-16 w-full max-w-[1680px] items-center justify-between px-5 sm:h-[70px] sm:px-6 md:px-8 lg:h-20 lg:px-12 xl:px-16 2xl:px-20">
          <Logo />
          <DesktopNavLinks />
          <NavbarActions />
          <MobileMenuButton isOpen={isOpen} onClick={() => setIsOpen((current) => !current)} />
        </div>
      </nav>
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
