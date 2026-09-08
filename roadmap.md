# Project roadmap

## 3-tier architectuur
- [x] Publieke site (maximilien.brussels) — eigen shell, geen admin-code in de bundel
- [x] Desktop manager (maximilien.site) — eigen shell + portaalroutes
- [x] Mobiele veld-app (maximilien.app) — eigen shell + /veld-routes
- [x] Modusdetectie: VITE_APP_MODE > hostname > ?mode= > localStorage (SSR-veilig)
- [x] Kruislinks per domein (getPublicUrl / getAdminUrl / getFieldUrl)

## Mobiele veld PWA (maximilien.app)
- [x] manifest.field.json + iconen (192/512/maskable) en apple-touch-icon
- [x] Service worker (vite-plugin-pwa, alleen bij VITE_APP_MODE=field), bewaakte registratie
- [x] Offline-melding in de shell
- [x] Bottomnav: Vandaag, Aanvragen, Scanner (midden), Diensten, Meer
- [x] Vandaag: dagplanning met check-in
- [x] Aanvragen: actieve aanvragen/orders
- [x] Scanner: continue stream, zaklamp, 6-teken fallback, auto-reset 2 s, print
- [x] Diensten: gestroomlijnde lijst
- [x] Meer: profiel, taalkeuze, beheer openen, afmelden
- [x] Geen horizontaal scrollen op 412 px, touchdoelen >= 56 px
- [x] Veld-modus blijft bewaard bij doorsturen naar /auth (preview/dev)
- [ ] Volledige test ingelogd (vereist databank-verbinding)
- [ ] Installatietest op een echte Samsung-telefoon (na publicatie op maximilien.app)

## Unified backend & auth — geblokkeerd op ontbrekende sleutels
- [ ] DATABASE_URL (Neon PostgreSQL)
- [ ] Brevo API-sleutel (inlogcodes, transactionele mail)
- [ ] Scaleway S3-sleutels (mediabibliotheek)
- [ ] Stripe-sleutels (webshop, giften)
- [ ] OAuth-secrets: Google, GitHub, Mastodon, Bluesky
- [ ] PICKUP_QR_SECRET (ondertekening afhaal-QR)
- [ ] Passkeys (WebAuthn) end-to-end testen

## Google-toestemmingen (afgehandeld)
- [x] Aanmelden met Google vraagt enkel openid/e-mail/profiel
- [x] Agenda-toestemming enkel via de koppelknop in Synchronisatie (`?calendar=1`, offline)
- [x] Tokens worden alleen bewaard wanneer agenda-toegang is gegeven

## Mobiel ontwerp veld-app (afgehandeld)
- [x] Gedeelde bouwstenen `src/components/veld/field-ui.tsx`
- [x] Vandaag, Aanvragen, Diensten, Meer op de nieuwe stijl
- [x] Verfijnde onderbalk met zwevende scanknop

## Veld-app afwerking (afgehandeld)
- [x] "Openen in de veld-app" in het accountmenu van het beheer
- [x] Veldtabbladen verborgen volgens rechten van de medewerker
- [x] Discreet installatie-icoon in de voettekst i.p.v. het opdringerige venster
- [x] Losse shells (publiek/beheer/veld) lazy geladen; routes apart gesplitst
