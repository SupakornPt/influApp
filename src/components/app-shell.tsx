"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { PageContentLayout, isPageContentLayout } from "@/components/page-content-layout";
import { SiteFooter } from "@/components/site-footer";
import { getRoleTheme } from "@/lib/role-theme";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const { role } = useUserStore();
  const roleTheme = getRoleTheme(role);
  const isLandingPage = pathname === "/";
  const isAuthPage = ["/login", "/register", "/forgot-password"].includes(pathname);
  const isSmartPlanPage = pathname === "/smart-plan" || pathname.startsWith("/smart-plan/");

  if (isAuthPage) {
    if (pathname === "/register") {
      return <main className="min-h-screen w-full">{children}</main>;
    }

    return <main className="mx-auto min-h-screen max-w-6xl px-4 py-6">{children}</main>;
  }

  if (isLandingPage) {
    return (
      <main className="flex min-h-screen flex-col">
        <div className="mx-auto w-full max-w-6xl px-4 pt-6">
          <Navigation />
        </div>
        <div className="flex-1">{children}</div>
        <div className="mx-auto w-full max-w-6xl px-4 pb-6">
          <SiteFooter />
        </div>
      </main>
    );
  }

  if (isSmartPlanPage) {
    return (
      <main className={cn("min-h-screen px-4 pb-6 pt-6 transition-colors duration-300 lg:px-6 lg:pt-8", roleTheme.pageBg)}>
        <div className="mx-auto max-w-6xl">
          {isPageContentLayout(children) ? children : <PageContentLayout>{children}</PageContentLayout>}
        </div>
      </main>
    );
  }

  return (
    <main className={cn("min-h-screen w-full transition-colors duration-300", roleTheme.pageBg)}>
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <aside className="flex w-full shrink-0 flex-col lg:w-[220px] lg:min-h-screen lg:border-r lg:border-slate-200/80 lg:bg-[#F7FAFD]">
          <Navigation />
          <div id="app-sidebar-slot" className="mt-4 px-3 pb-4" />
        </aside>
        <section className="relative min-w-0 flex-1 px-4 pb-6 pt-4 lg:px-6 lg:pt-5">
          {isPageContentLayout(children) ? children : <PageContentLayout>{children}</PageContentLayout>}
        </section>
      </div>
    </main>
  );
}
