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

function matchNavRoute(pathname: string): string {
  const match = NAV_ROUTES.find((route) => pathname === route || pathname.startsWith(`${route}/`));
  return match ?? "/dashboard";
}

export function getNavActiveClass(href: string): string {
  return NAV_ACTIVE_CLASSES[href] ?? "bg-slate-300 text-slate-900";
}

export function getNavLinkClass(href: string, isActive: boolean): string {
  return isActive ? getNavActiveClass(href) : "text-slate-700 hover:bg-slate-100";
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
