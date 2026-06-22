export const SIDEBAR_SURFACE_CLASS = "bg-gradient-to-b from-white via-slate-50/80 to-slate-100/60";

const NAV_ROUTES = [
  "/smart-plan",
  "/dashboard",
  "/campaigns",
  "/messages",
  "/discover",
  "/tracking"
] as const;

const NAV_ACTIVE_CLASSES: Record<string, string> = {
  "/dashboard": "bg-slate-300 text-slate-900",
  "/campaigns": "bg-nav-bronze-200 text-nav-bronze-900",
  "/messages": "bg-nav-teal-200 text-nav-teal-900",
  "/discover": "bg-nav-ocean-200 text-nav-ocean-900",
  "/smart-plan": "bg-nav-burnt-200 text-nav-burnt-900",
  "/tracking": "bg-nav-forest-200 text-nav-forest-900"
};

const NAV_BUTTON_CLASSES: Record<string, string> = {
  "/dashboard": "bg-slate-600 text-white hover:bg-slate-700",
  "/campaigns": "bg-nav-bronze-900 text-white hover:bg-nav-bronze-800",
  "/messages": "bg-nav-teal-900 text-white hover:bg-nav-teal-800",
  "/discover": "bg-nav-ocean-900 text-white hover:bg-nav-ocean-800",
  "/smart-plan": "bg-nav-burnt-900 text-white hover:bg-nav-burnt-800",
  "/tracking": "bg-nav-forest-900 text-white hover:bg-nav-forest-800"
};

const NAV_SOLID_CLASSES: Record<string, string> = {
  "/dashboard": "bg-slate-600",
  "/campaigns": "bg-nav-bronze-900",
  "/messages": "bg-nav-teal-900",
  "/discover": "bg-nav-ocean-900",
  "/smart-plan": "bg-nav-burnt-900",
  "/tracking": "bg-nav-forest-900"
};

const NAV_ACCENT_TEXT_CLASSES: Record<string, string> = {
  "/dashboard": "text-slate-700",
  "/campaigns": "text-nav-bronze-900",
  "/messages": "text-nav-teal-900",
  "/discover": "text-nav-ocean-900",
  "/smart-plan": "text-nav-burnt-900",
  "/tracking": "text-nav-forest-900"
};

const NAV_INDICATOR_CLASSES: Record<string, string> = {
  "/dashboard": "bg-slate-600",
  "/campaigns": "bg-nav-bronze-900",
  "/messages": "bg-nav-teal-900",
  "/discover": "bg-nav-ocean-900",
  "/smart-plan": "bg-nav-burnt-900",
  "/tracking": "bg-nav-forest-900"
};

const NAV_ICON_ACTIVE_CLASSES: Record<string, string> = {
  "/dashboard": "text-slate-800",
  "/campaigns": "text-nav-bronze-900",
  "/messages": "text-nav-teal-900",
  "/discover": "text-nav-ocean-900",
  "/smart-plan": "text-nav-burnt-900",
  "/tracking": "text-nav-forest-900"
};

const NAV_PAGE_BG_CLASSES: Record<string, string> = {
  "/dashboard": "bg-slate-100",
  "/campaigns": "bg-nav-bronze-100",
  "/messages": "bg-nav-teal-100",
  "/discover": "bg-nav-ocean-100",
  "/smart-plan": "bg-nav-burnt-100",
  "/tracking": "bg-nav-forest-100"
};

function matchNavRoute(pathname: string): string {
  const match = NAV_ROUTES.find((route) => pathname === route || pathname.startsWith(`${route}/`));
  return match ?? "/dashboard";
}

export function getNavActiveClass(href: string): string {
  return NAV_ACTIVE_CLASSES[href] ?? "bg-slate-300 text-slate-900";
}

export function getNavLinkClass(href: string, isActive: boolean): string {
  return isActive ? getNavActiveClass(href) : "text-slate-600 hover:bg-white/70 hover:text-slate-900";
}

export function getNavIndicatorClass(href: string): string {
  return NAV_INDICATOR_CLASSES[href] ?? NAV_INDICATOR_CLASSES["/dashboard"];
}

export function getNavIconActiveClass(href: string): string {
  return NAV_ICON_ACTIVE_CLASSES[href] ?? NAV_ICON_ACTIVE_CLASSES["/dashboard"];
}

export function getPageButtonClass(pathname: string): string {
  return NAV_BUTTON_CLASSES[matchNavRoute(pathname)];
}

export function getPageButtonClassForRoute(route: string): string {
  return NAV_BUTTON_CLASSES[route] ?? NAV_BUTTON_CLASSES["/dashboard"];
}

export function getPageSolidClassForRoute(route: string): string {
  return NAV_SOLID_CLASSES[route] ?? NAV_SOLID_CLASSES["/dashboard"];
}

export function getPageAccentTextClassForRoute(route: string): string {
  return NAV_ACCENT_TEXT_CLASSES[route] ?? NAV_ACCENT_TEXT_CLASSES["/dashboard"];
}

export function getPageBgClass(pathname: string): string {
  return NAV_PAGE_BG_CLASSES[matchNavRoute(pathname)];
}
