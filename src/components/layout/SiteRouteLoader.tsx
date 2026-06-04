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
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const showLoader = () => {
      setIsLoading(true);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setIsLoading(false);
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
        showLoader();
      }
    };

    const handleSubmit = (event: SubmitEvent) => {
      const form = event.target instanceof HTMLFormElement ? event.target : null;
      if (!form) return;

      const action = form.getAttribute("action") || window.location.href;
      if (isInternalUrl(action)) {
        showLoader();
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

  if (!isLoading) return null;

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
