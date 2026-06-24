import type { Role } from "@/lib/types";

/** User-facing role name shown in sidebar, profile chip, and auth flows. */
export function getRoleLabel(role: Role | string): string {
  if (role === "brand") return "Brand";
  if (role === "influencer") return "Creator";
  return "Agency";
}

/** Sidebar section heading — makes the active role obvious while browsing nav. */
export function getSidebarMenuHeading(role: Role | string): string {
  return `${getRoleLabel(role)} menu`;
}

/** Subtitle under the app logo in the sidebar. */
export function getSidebarWorkspaceLabel(role: Role | string): string {
  return `${getRoleLabel(role)} workspace`;
}
