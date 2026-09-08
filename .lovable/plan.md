# README verder uitbouwen (GitHub)

De huidige README is al een sterk architectuurdocument. Het voorstel van de andere AI voegt vier dingen toe die er nu écht ontbreken: klikbare navigatieknoppen, een functiematrix per omgeving, de offline-strategie van de veld-app, en de afspraken voor links tussen de drie domeinen. Die worden toegevoegd — maar met de cijfers en namen die met de code kloppen, niet met de verzonnen details uit het voorstel.

## Wat wordt toegevoegd

1. **Klikbare navigatieknoppen** bovenaan: drie badges die effectief doorlinken naar maximilien.brussels, maximilien.site en maximilien.app, in de huisstijlkleuren (bosgroen, terracotta, warm zand) in plaats van de standaard felle badge-kleuren.
2. **Functiematrix per omgeving** — welke module in welke omgeving actief is (publieke site / beheerportaal / veld-app): boerderijkaart, webshop en giften, boekingen, CRM en planning, media-opslag, mailinstellingen, QR-scanner, dagtakenlijst, offline-werking.
3. **Offline- en installatiestrategie van de veld-app**, beschreven zoals hij echt is ingesteld: alleen scripts, stijlen, lettertypes en pictogrammen worden vooraf bewaard; pagina's werken volgens "eerst het netwerk, na vier seconden de bewaarde versie"; de servicewerker draait uitsluitend op de echte productiesite (nooit in voorvertoning of in een ingebed venster) en `?sw=off` is de noodrem; installeren gebeurt via de discrete knop in de voettekst, niet via een opdringerige banner.
4. **Afspraken voor links tussen de domeinen**: waar de doorsteek naar het beheerportaal staat, waar de veld-app vandaan te bereiken is, en dat één gedeelde aanmelding met dezelfde rechten over de drie heen geldt.
5. **Kwaliteitsparagraaf**: hoe je controleert dat een wijziging klopt (bouwen, typecontrole, tests, lint) en wat de zelfcontrolepagina van de aanmelding meldt.

## Wat wordt gecorrigeerd

- Het aantal databankmigraties: **38**, niet 37 (op twee plekken in de tekst).
- Geen `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` in de sleutellijst: dit project gebruikt een eigen aanmelding op Neon Postgres. Wel `DATABASE_URL`, `AUTH_JWT_SECRET`, `BREVO_API_KEY` met SMTP-terugval.
- De omgevingsnamen blijven `public` / `admin` / `field` — het voorstel schreef "manager", wat in de code niet bestaat.
- Mailbeschrijving: verzending loopt via Brevo zodra de API-sleutel bestaat, anders via SMTP; het verzendadres staat op een apart subdomein.

## Stijl

Rustige, warme aardetinten in de badges en tabellen, minder emoji dan het voorstel (alleen als sectie-anker), één ritme in de tabellen, en Engelstalig zoals de huidige README.

## Technisch

Alleen `README.md` wordt gewijzigd. Geen code, geen databank, geen instellingen. De ASCII-schema's blijven in ```text-blokken. Feiten worden overgenomen uit `src/lib/app-mode.ts`, `vite.config.ts` (servicewerker), `src/lib/pwa.ts`, `package.json` en de map `neon/migrations/`.

Het ontwerpwerk aan de schermen (zachtere aardetinten) blijft voor een volgende beurt — dat is bewust niet in deze plan opgenomen.
