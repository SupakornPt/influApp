import type { Role } from "@/lib/types";

export function getAvatarUrl(name: string, role: Role): string {
  const seed = encodeURIComponent(name.trim() || "user");
  const style = role === "influencer" ? "thumbs" : "shapes";
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`;
}
