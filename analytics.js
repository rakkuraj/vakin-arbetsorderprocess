// Gemensam besöksmätning för processguiden och ansvarsvyn.
(() => {
  'use strict';

  // Kontots publika mätadress kopplar båda vyerna till samma statistik.
  // Detta är ingen hemlig nyckel. Lösenord ska aldrig finnas i webbplatsens kod.
  const endpoint = 'https://rakkuraj.goatcounter.com/count';

  // En tom inställning stänger av all mätning, även hämtning av tredjepartsskript.
  if (!endpoint) return;
  if (!/^https:\/\/[a-z0-9][a-z0-9-]*\.goatcounter\.com\/count$/.test(endpoint)) return;

  // Mät bara den publicerade prototypen, aldrig lokala förhandsvisningar.
  if (location.hostname !== 'rakkuraj.github.io') return;
  if (!location.pathname.startsWith('/vakin-arbetsorderprocess/')) return;

  // Slå ihop startsidans två adresser. Stegval, rollfilter, söktext och
  // andra adressparametrar skickas inte till statistiktjänsten.
  const isHuki = location.pathname.endsWith('/huki.html');
  window.goatcounter = {
    path: '/vakin-arbetsorderprocess/' + (isHuki ? 'huki.html' : ''),
    title: isHuki ? 'Ansvar och roller' : 'Arbetsorderprocessen',
    referrer: '',
    no_events: true,
    no_onload: true
  };

  // Asynkron laddning låter guiden fungera även om statistiken blockeras.
  const counter = document.createElement('script');
  counter.async = true;
  counter.src = 'https://gc.zgo.at/count.js';
  counter.setAttribute('data-goatcounter', endpoint);
  counter.onload = () => {
    const gc = window.goatcounter;
    if (typeof gc.get_data !== 'function' || typeof gc.count !== 'function') return;
    // Standardskriptet lägger även till adressparametrar i ett separat fält.
    // Rensa detta fält före sändning, även när en fast sidväg redan används.
    const getData = gc.get_data;
    gc.get_data = vars => {
      const data = getData(vars);
      delete data.q;
      data.r = '';
      return data;
    };
    // Räkna en gång när sidan visas, även om den först öppnades i en bakgrundsflik.
    const countOnce = () => {
      if (document.visibilityState === 'hidden' || document.visibilityState === 'prerender') return;
      document.removeEventListener('visibilitychange', countOnce);
      gc.count();
    };
    document.addEventListener('visibilitychange', countOnce);
    countOnce();
  };
  document.head.appendChild(counter);

  // En diskret upplysning beskriver den externa mätningen för besökaren.
  const notice = document.createElement('p');
  notice.style.cssText = 'font:13px system-ui;color:#52676a;padding:12px 24px;margin:0';
  notice.append('Besöksstatistik samlas med GoatCounter utan kakor. ');
  const link = document.createElement('a');
  link.href = 'https://www.goatcounter.com/help/privacy';
  link.textContent = 'Om besöksmätningen';
  notice.append(link);
  document.body.appendChild(notice);
})();

