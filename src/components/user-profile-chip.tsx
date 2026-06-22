"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAvatarUrl } from "@/lib/avatar";
import { cn } from "@/lib/utils";
import { useRoleTheme } from "@/lib/use-role-theme";
import { useUserStore } from "@/store/useUserStore";
import type { Role } from "@/lib/types";

function roleLabel(role: Role) {
  if (role === "brand") return "Brand";
  if (role === "influencer") return "Creator";
  return "Agency";
}

export function UserProfileChip() {
  const pathname = usePathname() ?? "";
  const { name, role } = useUserStore();
  const roleTheme = useRoleTheme();
  const isProfileActive = pathname === "/profile" || pathname.startsWith("/profile/");
  const avatarUrl = getAvatarUrl(name, role);

  return (
    <Link
      href="/profile"
      className={cn(
        "inline-flex items-center gap-2 rounded-2xl px-2 py-1.5 pr-3 shadow-sm transition-colors",
        isProfileActive ? roleTheme.profileChipActive : roleTheme.profileChip
      )}
      aria-current={isProfileActive ? "page" : undefined}
    >
      <img
        src={avatarUrl}
        alt=""
        className={cn(
          "h-8 w-8 rounded-full object-cover",
          isProfileActive ? "border border-white/40" : "border border-black/10"
        )}
      />
      <div className="min-w-0 text-left leading-tight">
        <p className="max-w-[108px] truncate text-xs font-semibold">{name}</p>
        <p className={cn("max-w-[108px] truncate text-[10px] font-medium", isProfileActive ? "text-white/80" : "opacity-70")}>
          {roleLabel(role)}
        </p>
      </div>
    </Link>
  );
}
