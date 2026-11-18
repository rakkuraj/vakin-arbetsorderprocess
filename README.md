# Vakin arbetsorderprocessen för utvärdering

Test för utvärdering. Detta är inte en skarp webbplats eller Vakins beslutade verksamhetssystem.

Klickbar prototyp med sju processteg och en HUKI-plan för ansvar och mandat.

Innehållet är ett arbetsförslag för granskning och förankring inom Vakin. Det är inte anslutet till IDUS eller andra interna system.

## Innehåll

- `index.html` visar arbetsorderprocessen med ingång till ansvarsfördelningen från varje steg.
- `huki.html` visar 34 aktiviteter, rollbeskrivningar och teckenförklaring. Välj processteg, roll eller sök efter en aktivitet.
- Direktlänkar använder exempelvis `huki.html?steg=3` och `huki.html?roll=ber`. Länken tillbaka öppnar ursprungssteget.

## Publicering med GitHub Pages

Välj Settings → Pages → Deploy from a branch → main → / (root). Spara. Sidans publicerade adress visas därefter av GitHub.

Sidorna använder inbäddad CSS och JavaScript och kräver inget byggsteg eller externa bibliotek.

## Redigering

Processtexterna ligger i `steps` och kompletteringarna i `index.html`. HUKI-aktiviteter, rollbeskrivningar och kopplingar till processtegen ligger i `data`, `stepRows` och `stepNames` i `huki.html`. Behåll en huvudansvarig roll per aktivitet.
