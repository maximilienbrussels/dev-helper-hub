import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Languages, LogOut, Monitor, RefreshCw } from "lucide-react";

import { neonSupabaseCompat as supabase } from "@/lib/neon-auth-compat";
import { usePortal } from "@/lib/portal-store";
import { getAdminUrl } from "@/lib/urls";
import { Button } from "@/components/ui/button";
import { FieldCard, FieldLinkAction, FieldPageHeader } from "@/components/veld/field-ui";
import { cn } from "@/lib/utils";
import { LANGS } from "@/lib/portal-routes";
import type { Lang } from "@/lib/portal-types";

export const Route = createFileRoute("/veld/meer")({
  head: () => ({
    meta: [
      { title: "Meer — Maximilien veld-app" },
      { name: "description", content: "Profiel, taal en afmelden in de veld-app van de stadsboerderij." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Meer — Maximilien veld-app" },
      { property: "og:description", content: "Profiel, taal en afmelden in de veld-app van de stadsboerderij." },
    ],
  }),
  component: FieldMore,
});

function FieldMore() {
  const { currentUser, lang, setLang } = usePortal();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/auth", replace: true });
  }

  const initials = currentUser.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="space-y-4">
      <FieldPageHeader eyebrow="Instellingen" title="Meer" />

      <FieldCard className="flex items-center gap-3.5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--surface-forest)] text-[15px] font-bold text-[#f5f2ea]">
          {initials || "?"}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[17px] font-semibold leading-snug">{currentUser.name}</p>
          <p className="truncate text-sm text-muted-foreground">{currentUser.email}</p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            {currentUser.role === "admin" ? "Beheerder" : "Team"}
          </p>
        </div>
      </FieldCard>

      <FieldCard>
        <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
          <Languages className="h-4 w-4" aria-hidden /> Taal
        </div>
        <div className="mt-3 flex gap-2">
          {LANGS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l as Lang)}
              aria-pressed={lang === l}
              className={cn(
                "min-h-12 flex-1 rounded-xl border text-[15px] font-bold uppercase tracking-wide transition-colors",
                lang === l
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/70 bg-background/60 text-foreground active:bg-secondary",
              )}
            >
              {l}
            </button>
          ))}
        </div>
      </FieldCard>

      <FieldLinkAction
        href={getAdminUrl("/portaal")}
        icon={<Monitor className="h-5 w-5" aria-hidden />}
        className="h-14 w-full bg-card text-base"
      >
        Volledig beheer openen
      </FieldLinkAction>

      <Button
        type="button"
        variant="secondary"
        className="h-14 w-full rounded-xl text-base"
        onClick={() => window.location.reload()}
      >
        <RefreshCw className="mr-2 h-5 w-5" aria-hidden /> Gegevens vernieuwen
      </Button>

      <Button
        type="button"
        variant="destructive"
        className="h-14 w-full rounded-xl text-base"
        onClick={signOut}
      >
        <LogOut className="mr-2 h-5 w-5" aria-hidden /> Afmelden
      </Button>
    </div>
  );
}
