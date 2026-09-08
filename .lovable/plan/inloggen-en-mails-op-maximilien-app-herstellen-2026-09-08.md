# Inloggen en mails op maximilien.app herstellen

Op maximilien.site werkt alles (wachtwoord + code per mail). Op maximilien.app lukt inloggen met wachtwoord niet en komt de code-mail niet aan. Beide sites draaien uit dezelfde code, maar als aparte installatie met eigen instellingen.

## Wat we verwachten dat er speelt

De inlogcontrole zoekt het account in de databank en de code-mail vertrekt via de mailkoppeling. Ontbreekt op de .app-installatie de databank- of mailsleutel, dan gebeurt precies wat je ziet: het wachtwoord wordt "fout" genoemd (het account wordt niet gevonden) en er vertrekt geen mail. Dit is nog niet bevestigd — stap 1 bevestigt of ontkracht het voordat er iets gewijzigd wordt.

## Stap 1 — Vaststellen (geen codewijziging)

- De ingebouwde controlepagina op maximilien.app opvragen; die toont per sleutel enkel of hij bestaat en of de databank antwoordt (nooit de waarde zelf).
- Uitkomst vergelijken met dezelfde controle op maximilien.site.
- Serverlogboek van de .app-installatie nakijken op de meldingen rond mailverzending en databankverbinding.

## Stap 2 — Instellingen gelijktrekken

De .app-installatie moet exact dezelfde sleutels krijgen als .site:

| Doel | Sleutel |
| --- | --- |
| Databank (accounts, codes, rechten) | `DATABASE_URL` / `NEON_DATABASE_URL` |
| Sessies ondertekenen | `AUTH_JWT_SECRET` (of `JWT_SECRET`) |
| Mailverzending | `BREVO_API_KEY` (met terugval `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`) |
| Afzender | `BREVO_SENDER_EMAIL` |
| Overige koppelingen | Google/Stripe/opslag, zoals op .site |

Belangrijk: dezelfde sessiesleutel op beide adressen, anders blijven links uit oudere mails ongeldig. Deze waarden moeten door jou (of via de projectinstellingen) aangeleverd worden — ik kan ze niet zelf verzinnen.

## Stap 3 — Verbeteringen in de code

1. **Eerlijke foutmelding bij inloggen.** Nu krijgt iedereen "E-mailadres of wachtwoord klopt niet", ook wanneer de databank onbereikbaar is. Dat wordt gesplitst: bij een onbereikbare databank verschijnt "Aanmelden is tijdelijk niet beschikbaar", zodat een storing niet meer op een verkeerd wachtwoord lijkt.
2. **Duidelijke melding bij de mailcode.** Wanneer de mail niet vertrekt door een ontbrekende koppeling, toont het scherm dat expliciet in plaats van een algemene fout.
3. **Zelfcontrole per omgeving.** De bestaande controlepagina uitbreiden met een regel "mailverzending: ingesteld / niet ingesteld" en "databank: bereikbaar / niet bereikbaar", zodat dit verschil tussen .site en .app in één oogopslag zichtbaar is.
4. **Links in mails.** Nakijken dat de link in de mail het adres gebruikt waar de aanvraag vandaan kwam (dus .app-aanvragen leiden naar de veld-app, .site-aanvragen naar het beheerportaal) en dat dit ook achter de proxy klopt.

## Stap 4 — Nakijken

- Op .app: aanmelden met wachtwoord, code per mail aanvragen, inloglink uit de mail volgen, wachtwoord vergeten, e-mailadres bevestigen.
- Op .site: dezelfde vijf stappen opnieuw doorlopen zodat er niets stukging.

## Technische noot

Betrokken bestanden: `src/lib/local-auth.functions.ts` (inlogfout), `src/lib/local-auth.server.ts` (databankstatus), `src/lib/auth-email.server.ts` (code + link), `src/routes/auth.index.tsx` (meldingen), `src/routes/api/auth/config-check.ts` (zelfcontrole). Geen wijzigingen aan de databankstructuur.
