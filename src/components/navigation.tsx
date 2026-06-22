"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  Compass,
  LayoutDashboard,
  LogOut,
  Megaphone,
  MessageSquare,
  Sparkles,
  type LucideIcon
} from "lucide-react";
import { getNavIconActiveClass, getNavIndicatorClass, getNavLinkClass } from "@/lib/nav-theme";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";

type NavLink = { href: string; label: string; icon: LucideIcon };

const brandLinks: NavLink[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/campaigns", label: "Campaign", icon: Megaphone },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/smart-plan", label: "Smart Plan", icon: Sparkles },
  { href: "/messages", label: "Message", icon: MessageSquare },
  { href: "/tracking", label: "Tracking", icon: Activity }
];

const influencerLinks: NavLink[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/campaigns", label: "Campaign", icon: Megaphone },
  { href: "/messages", label: "Message", icon: MessageSquare }
];

function isNavActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function roleLabel(role: string) {
  if (role === "brand") return "Brand";
  if (role === "influencer") return "Creator";
  return "Agency";
}

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { role, logout } = useUserStore();
  const isLandingPage = pathname === "/";
  const isAuthPage = ["/login", "/register", "/forgot-password"].includes(pathname);
  const links = role === "influencer" ? influencerLinks : brandLinks;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (isAuthPage) {
    return null;
  }

  if (isLandingPage) {
    return (
      <nav className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 via-primary to-secondary text-sm text-white shadow-md shadow-indigo-500/20">
            IA
          </span>
          <span>InfluApp</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <Link href="/discover" className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            Discover
          </Link>
          <Link href="/#for-teams" className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            Agencies
          </Link>
          <Link href="/#for-brands" className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            Brands
          </Link>
          <Link href="/#for-creators" className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            Creators
          </Link>
          <Link href="/#how-it-works" className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            How it works
          </Link>
          <Link href="/#pricing" className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/login" className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            Login
          </Link>
          <Link href="/register" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
            Register
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex h-full min-h-0 flex-col">
      <Link
        href="/dashboard"
        className="flex items-center gap-3 border-b border-slate-200/70 px-5 py-5 transition hover:bg-white/50"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-primary to-secondary text-sm font-bold text-white shadow-lg shadow-indigo-500/25">
          IA
        </span>
        <div className="min-w-0">
          <p className="truncate text-base font-bold tracking-tight text-slate-900">InfluApp</p>
          <p className="text-xs font-medium text-slate-500">{roleLabel(role)} workspace</p>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Menu</p>
        {links.map((link) => {
          const active = isNavActive(pathname, link.href);
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                getNavLinkClass(link.href, active),
                active && "shadow-sm"
              )}
            >
              {active ? (
                <span
                  className={cn(
                    "absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full",
                    getNavIndicatorClass(link.href)
                  )}
                />
              ) : null}
              <Icon
                className={cn(
                  "h-[18px] w-[18px] shrink-0 transition-colors",
                  active ? getNavIconActiveClass(link.href) : "text-slate-400 group-hover:text-slate-600"
                )}
                strokeWidth={active ? 2.25 : 2}
              />
              <span className="truncate">{link.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto border-t border-slate-200/70 p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-900"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-hover:bg-slate-200">
            <LogOut className="h-4 w-4" />
          </span>
          Log out
        </button>
      </div>
    </nav>
  );
}
