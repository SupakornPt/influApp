"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useState, type ComponentType } from "react";
import { useSearchParams } from "next/navigation";
import {
  Activity,
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Eye,
  FileText,
  Globe,
  Heart,
  Image as ImageIcon,
  LayoutGrid,
  Link2,
  Lock,
  Search,
  Share2,
  Table2,
  Target,
  TrendingUp,
  Users,
  Video,
  X
} from "lucide-react";
import type { IconType } from "react-icons";
import { SiInstagram, SiTiktok, SiYoutube } from "react-icons/si";
import { getPageAccentTextClassForRoute, getPageButtonClassForRoute, getPageSolidClassForRoute } from "@/lib/nav-theme";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import { brandCampaigns, trackingByCampaign, type BrandCampaignListItem, type TrackingInfluencerRow } from "@/mock/brand-campaigns";
import { exportRowsToExcel } from "@/lib/excel";

const pageBtn = getPageButtonClassForRoute("/tracking");
const pageSolid = getPageSolidClassForRoute("/tracking");
const pageAccent = getPageAccentTextClassForRoute("/tracking");
const CAMPAIGNS_PER_PAGE = 3;
type DetailViewMode = "card" | "table";

function getInitials(name: string) {
  return name
    .split(/[\s.]+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatCompact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function formatDeadline(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function platformBadge(platform: BrandCampaignListItem["platform"]) {
  const map: Record<BrandCampaignListItem["platform"], { Icon: IconType; className: string }> = {
    TikTok: { Icon: SiTiktok, className: "text-black" },
    Instagram: { Icon: SiInstagram, className: "text-[#E4405F]" },
    YouTube: { Icon: SiYoutube, className: "text-[#FF0000]" }
  };
  const { Icon, className } = map[platform];
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
      <Icon className={cn("h-3 w-3", className)} />
      {platform}
    </span>
  );
}

function statusIcon(status: string) {
  if (status === "active") return <Activity className="h-3.5 w-3.5 text-emerald-400" />;
  if (status === "completed") return <CheckCircle2 className="h-3.5 w-3.5 text-slate-300" />;
  return <Clock className="h-3.5 w-3.5 text-amber-400" />;
}

function CampaignTrait({
  icon: Icon,
  label,
  value
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1 text-[10px] text-slate-600">
      <Icon className="h-3 w-3 shrink-0 text-slate-400" aria-hidden />
      <span className="truncate">
        <span className="sr-only">{label}: </span>
        {value}
      </span>
    </span>
  );
}

function CampaignCard({
  campaign: c,
  views,
  er,
  rows,
  isSelected,
  onSelect
}: {
  campaign: BrandCampaignListItem;
  views: number;
  er: number;
  rows: { id: string }[];
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border text-left transition hover:shadow-md",
        isSelected ? "border-nav-forest-300 ring-2 ring-nav-forest-200" : "border-slate-100"
      )}
    >
      <div className="relative h-28 w-full overflow-hidden bg-slate-100">
        <Image
          src={c.coverImage}
          alt={c.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute left-2 top-2">{platformBadge(c.platform)}</div>
        <div className="absolute bottom-2 left-2 flex items-center gap-1">
          {statusIcon(c.status)}
          <span className="text-[10px] font-semibold capitalize text-white drop-shadow">{c.status}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3">
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900">{c.name}</p>

        <div className="mt-2 grid grid-cols-2 gap-1.5">
          <CampaignTrait icon={Target} label="Objective" value={c.objective} />
          <CampaignTrait
            icon={c.visibility === "private" ? Lock : Globe}
            label="Visibility"
            value={c.visibility}
          />
          <CampaignTrait icon={Users} label="Creators" value={String(c.influencersJoined)} />
          <CampaignTrait icon={Calendar} label="Deadline" value={formatDeadline(c.deadline)} />
        </div>

        <div className="mt-2.5 flex flex-wrap gap-1.5 border-t border-slate-100 pt-2.5">
          <span className="inline-flex items-center gap-1 rounded-md bg-sky-50 px-2 py-0.5 text-[10px] font-medium text-sky-700">
            <Eye className="h-3 w-3" />
            {views > 0 ? formatCompact(views) : "—"}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
            <TrendingUp className="h-3 w-3" />
            {rows.length ? `${er.toFixed(1)}%` : "—"}
          </span>
        </div>
      </div>
    </button>
  );
}

function contentTypeIcon(type: string) {
  if (type === "video") return <Video className="h-4 w-4" />;
  if (type === "image") return <ImageIcon className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
}

function MetricGauge({
  label,
  value,
  max,
  icon: Icon,
  colorClass = "bg-nav-forest-900"
}: {
  label: string;
  value: number;
  max: number;
  icon: ComponentType<{ className?: string }>;
  colorClass?: string;
}) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
          <Icon className="h-3 w-3" />
          {label}
        </span>
        <span className="text-xs font-semibold tabular-nums text-slate-700">
          {label === "ER" ? `${value}%` : formatCompact(value)}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className={cn("h-full rounded-full transition-all", colorClass)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function DetailViewToggle({
  mode,
  onChange,
  disabled
}: {
  mode: DetailViewMode;
  onChange: (mode: DetailViewMode) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
      <button
        type="button"
        onClick={() => onChange("card")}
        disabled={disabled}
        title="Card view"
        aria-pressed={mode === "card"}
        className={cn(
          "rounded-md p-1.5 transition disabled:cursor-not-allowed disabled:opacity-40",
          mode === "card" ? cn(pageBtn, "shadow-sm") : "text-slate-500 hover:text-slate-700"
        )}
      >
        <LayoutGrid className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onChange("table")}
        disabled={disabled}
        title="Table view"
        aria-pressed={mode === "table"}
        className={cn(
          "rounded-md p-1.5 transition disabled:cursor-not-allowed disabled:opacity-40",
          mode === "table" ? cn(pageBtn, "shadow-sm") : "text-slate-500 hover:text-slate-700"
        )}
      >
        <Table2 className="h-4 w-4" />
      </button>
    </div>
  );
}

function DetailInfluencerCard({
  row: r,
  maxViews,
  maxEr
}: {
  row: TrackingInfluencerRow;
  maxViews: number;
  maxEr: number;
}) {
  return (
    <article className="rounded-xl border border-slate-100 bg-gradient-to-b from-white to-slate-50/80 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-nav-forest-200 to-nav-forest-400 text-xs font-bold text-nav-forest-900">
          {getInitials(r.influencerName)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">{r.influencerName}</p>
          <p className="flex items-center gap-1 truncate text-[11px] text-slate-500">
            {contentTypeIcon(r.contentType)}
            <span className="truncate">{r.contentLabel}</span>
          </p>
        </div>
        <span className="flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
          <TrendingUp className="h-3 w-3" />
          +{r.growthRate}%
        </span>
      </div>

      <div className="mt-4 space-y-2.5">
        <MetricGauge label="Views" value={r.views} max={maxViews} icon={Eye} />
        <MetricGauge label="ER" value={r.engagementRate} max={maxEr} icon={Heart} colorClass="bg-rose-500" />
      </div>

      <div className="mt-3 flex gap-2">
        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
          <Heart className="h-3 w-3 text-rose-400" />
          {formatCompact(r.likes)}
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
          <FileText className="h-3 w-3 text-slate-400" />
          {formatCompact(r.comments)}
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
          <Share2 className="h-3 w-3 text-sky-400" />
          {formatCompact(r.shares)}
        </span>
      </div>
    </article>
  );
}

function DetailInfluencerTable({ rows }: { rows: TrackingInfluencerRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide">Influencer</th>
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide">Content</th>
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide">
              <span className="sr-only">Type</span>
              <Video className="h-3.5 w-3.5" aria-hidden />
            </th>
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide">
              <Eye className="mx-auto h-3.5 w-3.5" aria-label="Views" />
            </th>
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide">
              <Heart className="mx-auto h-3.5 w-3.5" aria-label="Likes" />
            </th>
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide">
              <FileText className="mx-auto h-3.5 w-3.5" aria-label="Comments" />
            </th>
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide">
              <Share2 className="mx-auto h-3.5 w-3.5" aria-label="Shares" />
            </th>
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide">ER%</th>
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide">Growth</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50/80">
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-nav-forest-100 text-[10px] font-bold text-nav-forest-800">
                    {getInitials(r.influencerName)}
                  </div>
                  <span className="font-medium text-slate-900">{r.influencerName}</span>
                </div>
              </td>
              <td className="max-w-[180px] truncate px-4 py-2.5 text-slate-600">{r.contentLabel}</td>
              <td className="px-4 py-2.5 text-slate-500">{contentTypeIcon(r.contentType)}</td>
              <td className="px-4 py-2.5 tabular-nums text-slate-700">{formatCompact(r.views)}</td>
              <td className="px-4 py-2.5 tabular-nums text-slate-700">{formatCompact(r.likes)}</td>
              <td className="px-4 py-2.5 tabular-nums text-slate-700">{formatCompact(r.comments)}</td>
              <td className="px-4 py-2.5 tabular-nums text-slate-700">{formatCompact(r.shares)}</td>
              <td className="px-4 py-2.5 tabular-nums font-medium text-slate-800">{r.engagementRate}%</td>
              <td className="px-4 py-2.5 tabular-nums font-medium text-emerald-600">+{r.growthRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KpiCard({
  icon: Icon,
  value,
  label,
  tint
}: {
  icon: ComponentType<{ className?: string }>;
  value: string;
  label: string;
  tint: string;
}) {
  return (
    <article className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
      <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", tint)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xl font-bold tabular-nums text-slate-900">{value}</p>
        <p className="truncate text-[11px] font-medium text-slate-500">{label}</p>
      </div>
    </article>
  );
}

function TrackingPageContent() {
  const { role } = useUserStore();
  const searchParams = useSearchParams();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [shareMessage, setShareMessage] = useState("");
  const [campaignSearch, setCampaignSearch] = useState("");
  const [campaignPage, setCampaignPage] = useState(1);
  const [detailViewMode, setDetailViewMode] = useState<DetailViewMode>("card");

  const selectedCampaign = useMemo(
    () => (selectedId ? brandCampaigns.find((c) => c.id === selectedId) : null),
    [selectedId]
  );
  const detailRows = selectedId ? trackingByCampaign[selectedId] ?? [] : [];

  const campaignStats = useMemo(
    () =>
      brandCampaigns.map((c) => {
        const rows = trackingByCampaign[c.id] ?? [];
        const views = rows.reduce((s, r) => s + r.views, 0);
        const engagement = rows.reduce((s, r) => s + r.likes + r.comments + r.shares, 0);
        const er = rows.length > 0 ? rows.reduce((s, r) => s + r.engagementRate, 0) / rows.length : 0;
        return { campaign: c, rows, views, engagement, er };
      }),
    []
  );

  const totals = useMemo(() => {
    const allRows = Object.values(trackingByCampaign).flat();
    const views = allRows.reduce((s, r) => s + r.views, 0);
    const engagement = allRows.reduce((s, r) => s + r.likes + r.comments + r.shares, 0);
    const avgEr = allRows.length ? allRows.reduce((s, r) => s + r.engagementRate, 0) / allRows.length : 0;
    const active = brandCampaigns.filter((c) => c.status === "active").length;
    return { views, engagement, avgEr, active };
  }, []);

  const maxDetailViews = useMemo(() => Math.max(...detailRows.map((r) => r.views), 1), [detailRows]);
  const maxDetailEr = useMemo(() => Math.max(...detailRows.map((r) => r.engagementRate), 1), [detailRows]);

  const filteredCampaignStats = useMemo(() => {
    const q = campaignSearch.trim().toLowerCase();
    if (!q) return campaignStats;
    return campaignStats.filter(({ campaign: c }) =>
      [c.name, c.platform, c.objective, c.status, c.visibility]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [campaignStats, campaignSearch]);

  const totalCampaignPages = Math.max(1, Math.ceil(filteredCampaignStats.length / CAMPAIGNS_PER_PAGE));

  const paginatedCampaignStats = useMemo(() => {
    const start = (campaignPage - 1) * CAMPAIGNS_PER_PAGE;
    return filteredCampaignStats.slice(start, start + CAMPAIGNS_PER_PAGE);
  }, [filteredCampaignStats, campaignPage]);

  useEffect(() => {
    setCampaignPage(1);
  }, [campaignSearch]);

  useEffect(() => {
    if (campaignPage > totalCampaignPages) {
      setCampaignPage(totalCampaignPages);
    }
  }, [campaignPage, totalCampaignPages]);

  useEffect(() => {
    const campaignFromQuery = searchParams.get("campaign");
    if (!campaignFromQuery) return;
    const exists = brandCampaigns.some((campaign) => campaign.id === campaignFromQuery);
    if (exists) setSelectedId(campaignFromQuery);
  }, [searchParams]);

  if (role !== "brand" && role !== "agency") {
    return (
      <section className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
          <BarChart3 className="h-8 w-8 text-slate-400" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">Tracking</h1>
        <Link href="/dashboard" className={cn("text-sm font-semibold hover:underline", pageAccent)}>
          ← Dashboard
        </Link>
      </section>
    );
  }

  const shareTrackingLink = async () => {
    if (!selectedId || typeof window === "undefined") return;
    const detailUrl = `${window.location.origin}/tracking?campaign=${selectedId}`;
    try {
      await navigator.clipboard.writeText(detailUrl);
      setShareMessage("Copied");
    } catch {
      setShareMessage("Copy URL manually");
    }
  };

  const exportExcel = () => {
    if (!selectedId || detailRows.length === 0) return;
    exportRowsToExcel({
      filename: `tracking-${selectedId}.xls`,
      sheetName: "Tracking Detail",
      headers: ["Campaign", "Influencer", "Content", "Type", "Views", "Likes", "Comments", "Shares", "ER%", "Growth%"],
      rows: detailRows.map((r) => [
        selectedCampaign?.name ?? "",
        r.influencerName,
        r.contentLabel,
        r.contentType,
        r.views,
        r.likes,
        r.comments,
        r.shares,
        r.engagementRate,
        r.growthRate
      ])
    });
    setShareMessage("Exported");
  };

  return (
    <section className="space-y-5">
      {/* Header */}
      <div className={cn("flex items-center justify-between gap-4 rounded-2xl px-5 py-4 text-white shadow-sm", pageSolid)}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Tracking</h1>
            <span className="flex items-center gap-1.5 text-xs text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Live
            </span>
          </div>
        </div>
        <div className="hidden items-center gap-1 sm:flex">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div
              key={i}
              className="w-1.5 rounded-full bg-white/30"
              style={{ height: `${h * 0.28}px` }}
            />
          ))}
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={Eye} value={formatCompact(totals.views)} label="Total views" tint="bg-sky-100 text-sky-600" />
        <KpiCard icon={Heart} value={formatCompact(totals.engagement)} label="Engagements" tint="bg-rose-100 text-rose-600" />
        <KpiCard icon={TrendingUp} value={`${totals.avgEr.toFixed(1)}%`} label="Avg ER" tint="bg-emerald-100 text-emerald-600" />
        <KpiCard icon={Activity} value={String(totals.active)} label="Active campaigns" tint="bg-nav-forest-100 text-nav-forest-900" />
      </div>

      <article className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Eye className={cn("h-4 w-4", pageAccent)} />
            <h2 className="text-sm font-semibold text-slate-900">Campaigns</h2>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
              {filteredCampaignStats.length}
            </span>
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={campaignSearch}
              onChange={(e) => setCampaignSearch(e.target.value)}
              placeholder="Search campaigns..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-nav-forest-300 focus:bg-white focus:ring-2 focus:ring-nav-forest-100"
            />
          </div>
        </div>

        {paginatedCampaignStats.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-12 text-slate-400">
            <Search className="h-8 w-8 opacity-40" />
            <p className="text-xs">No campaigns match your search</p>
          </div>
        ) : (
          <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedCampaignStats.map(({ campaign: c, views, er, rows }) => (
              <CampaignCard
                key={c.id}
                campaign={c}
                views={views}
                er={er}
                rows={rows}
                isSelected={selectedId === c.id}
                onSelect={() => setSelectedId(c.id)}
              />
            ))}
          </div>
        )}

        {filteredCampaignStats.length > CAMPAIGNS_PER_PAGE && (
          <div className="flex flex-col gap-2 border-t border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              {(campaignPage - 1) * CAMPAIGNS_PER_PAGE + 1}–
              {Math.min(campaignPage * CAMPAIGNS_PER_PAGE, filteredCampaignStats.length)} of{" "}
              {filteredCampaignStats.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCampaignPage((p) => Math.max(1, p - 1))}
                disabled={campaignPage === 1}
                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalCampaignPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCampaignPage(page)}
                  className={cn(
                    "min-w-8 rounded-lg px-2 py-1 text-xs font-semibold transition",
                    page === campaignPage
                      ? cn(pageBtn, "shadow-sm")
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCampaignPage((p) => Math.min(totalCampaignPages, p + 1))}
                disabled={campaignPage === totalCampaignPages}
                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </article>

      {/* Detail panel */}
      {selectedCampaign && (
        <article className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-nav-forest-100">
                <Activity className="h-4 w-4 text-nav-forest-800" />
              </div>
              <h2 className="truncate text-sm font-semibold text-slate-900">{selectedCampaign.name}</h2>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <DetailViewToggle
                mode={detailViewMode}
                onChange={setDetailViewMode}
                disabled={detailRows.length === 0}
              />
              <button
                type="button"
                onClick={shareTrackingLink}
                disabled={detailRows.length === 0}
                title="Share link"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-40"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={exportExcel}
                disabled={detailRows.length === 0}
                title="Export Excel"
                className={cn("rounded-lg p-2 disabled:opacity-40", pageAccent, "hover:bg-nav-forest-50")}
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                title="Close"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {shareMessage ? (
            <div className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-emerald-700">
              <Link2 className="h-3.5 w-3.5" />
              {shareMessage}
            </div>
          ) : null}

          {detailRows.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-10 text-slate-400">
              <BarChart3 className="h-10 w-10 opacity-40" />
              <p className="text-xs">No data yet</p>
            </div>
          ) : detailViewMode === "table" ? (
            <DetailInfluencerTable rows={detailRows} />
          ) : (
            <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
              {detailRows.map((r) => (
                <DetailInfluencerCard key={r.id} row={r} maxViews={maxDetailViews} maxEr={maxDetailEr} />
              ))}
            </div>
          )}
        </article>
      )}
    </section>
  );
}

export default function TrackingPage() {
  return (
    <Suspense
      fallback={
        <section className="flex items-center justify-center gap-2 py-16 text-slate-400">
          <BarChart3 className="h-5 w-5 animate-pulse" />
        </section>
      }
    >
      <TrackingPageContent />
    </Suspense>
  );
}
