import type { Role } from "@/lib/types";

/** Role-based colors for profile pages and the profile chip (not sidebar nav colors). */
export interface RoleTheme {
  pageBg: string;
  profileChip: string;
  profileChipActive: string;
  cardBg: string;
  profileHeader: string;
  profileAccent: string;
  profileHeaderButton: string;
  profileOutlineButton: string;
  profileNotice: string;
}

const ROLE_THEMES: Record<Role, RoleTheme> = {
  brand: {
    pageBg: "bg-role-navy-50",
    profileChip: "bg-role-navy/10 text-role-navy hover:bg-role-navy/15",
    profileChipActive: "bg-role-navy text-white shadow-md",
    cardBg: "bg-role-navy/10 border border-role-navy/20",
    profileHeader: "bg-role-navy",
    profileAccent: "text-role-navy",
    profileHeaderButton: "bg-white text-role-navy hover:bg-role-navy-50",
    profileOutlineButton: "border border-role-navy/25 bg-white text-role-navy hover:bg-role-navy-50",
    profileNotice: "border border-role-navy/20 bg-role-navy-50 text-role-navy"
  },
  agency: {
    pageBg: "bg-emerald-50",
    profileChip: "bg-emerald-100 text-emerald-900 hover:bg-emerald-200",
    profileChipActive: "bg-emerald-600 text-white shadow-md",
    cardBg: "bg-emerald-100 border border-emerald-200",
    profileHeader: "bg-emerald-600",
    profileAccent: "text-emerald-800",
    profileHeaderButton: "bg-white text-emerald-800 hover:bg-emerald-50",
    profileOutlineButton: "border border-emerald-300 bg-white text-emerald-800 hover:bg-emerald-50",
    profileNotice: "border border-emerald-200 bg-emerald-50 text-emerald-900"
  },
  influencer: {
    pageBg: "bg-role-coral-50",
    profileChip: "bg-role-coral/15 text-slate-900 hover:bg-role-coral/25",
    profileChipActive: "bg-role-coral text-white shadow-md",
    cardBg: "bg-role-coral/15 border border-role-coral/25",
    profileHeader: "bg-role-coral",
    profileAccent: "text-role-coral",
    profileHeaderButton: "bg-white text-slate-900 hover:bg-role-coral-50",
    profileOutlineButton: "border border-role-coral/30 bg-white text-slate-900 hover:bg-role-coral-50",
    profileNotice: "border border-role-coral/25 bg-role-coral-50 text-slate-900"
  }
};

export function getRoleTheme(role: Role | null | undefined): RoleTheme {
  return ROLE_THEMES[role ?? "agency"];
}
