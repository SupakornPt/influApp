"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAvatarUrl } from "@/lib/avatar";
import { cn } from "@/lib/utils";
import { useRoleTheme } from "@/lib/use-role-theme";
import { useUserStore } from "@/store/useUserStore";

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
        "inline-flex items-center gap-1.5 rounded-full px-1 py-0.5 pr-2 shadow-sm transition-colors",
        isProfileActive ? roleTheme.profileChipActive : roleTheme.profileChip
      )}
      aria-current={isProfileActive ? "page" : undefined}
    >
      <img
        src={avatarUrl}
        alt=""
        className={cn(
          "h-6 w-6 rounded-full object-cover",
          isProfileActive ? "border border-white/40" : "border border-black/10"
        )}
      />
      <span className="max-w-[96px] truncate text-xs font-semibold">{name}</span>
    </Link>
  );
}
