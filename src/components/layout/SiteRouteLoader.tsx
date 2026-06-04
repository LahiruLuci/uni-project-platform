"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function isInternalUrl(url: string) {
  try {
    const target = new URL(url, window.location.href);
    return target.origin === window.location.origin;
  } catch {
    return false;
  }
}

function SiteRouteLoaderInner() {
  const [loadingTarget, setLoadingTarget] = useState<"default" | "project" | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const showLoader = (target: "default" | "project") => {
      setLoadingTarget(target);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setLoadingTarget(null);
        timeoutRef.current = null;
      }, 6500);
    };

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const link = (event.target as Element | null)?.closest("a[href]");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || !isInternalUrl(href)) return;

      const target = new URL(href, window.location.href);
      const current = `${window.location.pathname}${window.location.search}`;
      const next = `${target.pathname}${target.search}`;

      if (current !== next) {
        showLoader(target.pathname.startsWith("/projects/") ? "project" : "default");
      }
    };

    const handleSubmit = (event: SubmitEvent) => {
      const form = event.target instanceof HTMLFormElement ? event.target : null;
      if (!form) return;

      const action = form.getAttribute("action") || window.location.href;
      if (isInternalUrl(action)) {
        showLoader("default");
      }
    };

    document.addEventListener("click", handleClick, true);
    document.addEventListener("submit", handleSubmit, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("submit", handleSubmit, true);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!loadingTarget) return null;

  if (loadingTarget === "project") {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-[120] grid place-items-center bg-slate-950/38 px-5 backdrop-blur-md"
        aria-live="polite"
        aria-label="Opening project dossier"
      >
        <div className="relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/16 bg-slate-950/82 p-6 text-center text-white shadow-2xl shadow-black/30 backdrop-blur-2xl">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300" />
          <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-blue-500/25 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />

          <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-[1.75rem] border border-white/15 bg-white/10 shadow-2xl shadow-black/20">
            <div className="absolute h-14 w-14 animate-spin rounded-2xl border border-cyan-300/20 border-t-cyan-300" />
            <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-white via-blue-100 to-emerald-200 shadow-[0_0_30px_rgba(110,231,183,0.7)]" />
          </div>

          <p className="relative mt-6 text-xs font-black uppercase tracking-[0.22em] text-emerald-200">Opening dossier</p>
          <h2 className="relative mt-2 !text-white text-2xl font-black">Preparing project details</h2>
          <p className="relative mt-3 text-sm font-semibold leading-6 text-white/68">
            Loading the project overview, protection details, opportunities, and creator information.
          </p>

          <div className="relative mt-6 grid gap-2">
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-1/2 animate-[route-loader_1.1s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300" />
            </div>
            <div className="mx-auto mt-2 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-white/62">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Secure project view
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[120]" aria-live="polite" aria-label="Loading page">
      <div className="h-1 w-full overflow-hidden bg-slate-950/20">
        <div className="h-full w-1/2 animate-[route-loader_1.1s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300 shadow-[0_0_22px_rgba(56,189,248,0.9)]" />
      </div>
      <div className="mx-auto mt-4 flex w-fit items-center gap-3 rounded-full border border-white/14 bg-slate-950/72 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white shadow-2xl shadow-black/20 backdrop-blur-2xl">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-70" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
        </span>
        Loading UniVenture
      </div>
    </div>
  );
}

export function SiteRouteLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;

  return <SiteRouteLoaderInner key={routeKey} />;
}
