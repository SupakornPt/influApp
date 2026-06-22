"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { PageContentLayout, isPageContentLayout } from "@/components/page-content-layout";
import { SidebarProvider, useSidebar } from "@/components/sidebar-context";
import { SiteFooter } from "@/components/site-footer";
import { getPageBgClass } from "@/lib/nav-theme";
import { cn } from "@/lib/utils";

function AppSidebarLayout({ children, pageBg }: { children: React.ReactNode; pageBg: string }) {
  const { collapsed } = useSidebar();

  return (
    <main className={cn("min-h-screen w-full transition-colors duration-300", pageBg)}>
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <aside
          className={cn(
            "flex w-full shrink-0 flex-col border-b border-slate-200/70 bg-gradient-to-b from-white via-slate-50/80 to-slate-100/60 transition-[width] duration-300 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r",
            collapsed ? "lg:w-16" : "lg:w-[calc(260px-1cm)]"
          )}
        >
          <Navigation />
          <div
            id="app-sidebar-slot"
            className={cn(
              "min-h-0 flex-1 overflow-y-auto px-3 pb-4 lg:px-4",
              collapsed && "hidden lg:hidden"
            )}
          />
        </aside>
        <section className="relative min-w-0 flex-1 px-4 pb-6 pt-4 lg:px-6 lg:pt-5">
          {isPageContentLayout(children) ? children : <PageContentLayout>{children}</PageContentLayout>}
        </section>
      </div>
    </main>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const pageBg = getPageBgClass(pathname);
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
      <main className={cn("min-h-screen px-4 pb-6 pt-6 transition-colors duration-300 lg:px-6 lg:pt-8", pageBg)}>
        <div className="mx-auto max-w-6xl">
          {isPageContentLayout(children) ? children : <PageContentLayout>{children}</PageContentLayout>}
        </div>
      </main>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebarLayout pageBg={pageBg}>{children}</AppSidebarLayout>
    </SidebarProvider>
  );
}
