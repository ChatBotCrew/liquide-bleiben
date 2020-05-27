<script>
  import { fly } from 'svelte/transition';

  import ga from './ga.js';
  import { cookiesAllowed } from './store.js';
  import { send, receive } from './animations/crossfade.js';
  import { bundeslaender, descriptions, help, finanzaemter, steuerstundungen, weitereInfos } from './data';
  import Table from './Table.svelte';

  export let selection;

  const UEBERSICHT = 'Übersicht';
  const STEUERSTUNDUNG = 'Steuermaßnahmen';
  const KURZARBEIT = 'Kurzarbeit';
  const SOZIALBEITRAEGE = 'Sozialbeiträge';
  const ZIVILRECHT = 'Zivilrecht';

  // Remove not set selections (may happen when coming from a link)
  Object.keys(selection).forEach(key => {
    if (selection[key] === null) delete selection[key];
  });

  // Build URL with Query Params
  const dataUrl = new URL(location.origin + '/api/offers');
  const pageUrl = new URL(location.origin);
  const searchParams = new URLSearchParams(Object.assign({}, selection, {lok: $cookiesAllowed})).toString();
  dataUrl.search = searchParams;
  pageUrl.search = searchParams;

  // Query Data which contains columns and offers
  const data$ = fetch(dataUrl, {method: 'GET'})
          .then(res => {
            ga.sendGAEvent('nav', 'load', 'results');
            return res.json()
          })
          .then(res => {
            return res.filter(cluster => cluster.offers.length && !(cluster.name === "Zuschuss" && selection.time == "6 Monate"))
          });

  let selectedTab = (location.hash && decodeURI(location.hash.substring(1))) || 'Zuschuss'

</script>

<div class="container-fluid">
  <div class="d-flex flex-column align-items-center">
    <a out:send="{{ duration: 1000, key: 'logo' }}" in:receive="{{ duration: 1000, key: 'logo' }}"
       href="https://datev.de">
      <img class="logo" src="/logo.png" alt="Wir bleiben liquide">
    </a>
    <h3 class="mt-4 mb-4">Ihre Resultate</h3>
    <ul class="nav nav-pills sticky-top">
      <!--<li class="nav-item">
          <a class="nav-link" on:click={() => selectedTab = UEBERSICHT}
             class:active={selectedTab === UEBERSICHT} href="{'#' + UEBERSICHT}">{UEBERSICHT}</a>
        </li>-->
      {#await data$}
        <div>Angebote werden geladen...</div>
      {:then data}
        {#each data as cluster}
          <li class="nav-item">
            <a class="nav-link" on:click={() => selectedTab = cluster.name}
                class:active="{selectedTab === cluster.name}"
                href="{'#' + cluster.name}">{cluster.name}</a>
          </li>
        {/each}
      {/await}
      <li class="nav-item">
        <a class="nav-link" on:click={() => selectedTab = STEUERSTUNDUNG}
           class:active={selectedTab === STEUERSTUNDUNG} href="{'#' + STEUERSTUNDUNG}">{STEUERSTUNDUNG}</a>
      </li>
      {#if selection.employees !== 0}
        <li class="nav-item">
          <a class="nav-link" on:click={() => selectedTab = KURZARBEIT}
             class:active={selectedTab === KURZARBEIT} href="{'#' + KURZARBEIT}">{KURZARBEIT}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" on:click={() => selectedTab = SOZIALBEITRAEGE}
             class:active={selectedTab === SOZIALBEITRAEGE} href="{'#' + SOZIALBEITRAEGE}">{SOZIALBEITRAEGE}</a>
        </li>
      {/if}
      <li class="nav-item">
        <a class="nav-link" on:click={() => selectedTab = ZIVILRECHT}
           class:active={selectedTab === ZIVILRECHT} href="{'#' + ZIVILRECHT}">{ZIVILRECHT}</a>
      </li>
    </ul>
  </div>
  <div id="tab-content" class="mb-3">
    {#await data$ then data}
      {#each data as cluster}
        {#if selectedTab === cluster.name}
          <Table offers={cluster.offers}/>
          {#if help[cluster.name]}
            <div class="info-text">
              {#if $descriptions.find(d => d.name === cluster.name)}
                {@html $descriptions.find(d => d.name === cluster.name).html}<br>
              {/if}
              <a target="_blank" href={help[cluster.name] ? help[cluster.name].link : "https://wir-bleiben-liqui.de"}>
                Sie wollen mehr wissen? Direkt zu unserem Blog
              </a>
              {#if cluster.name === 'Zuschuss'}
                <a target="_blank" href="https://www.datev.de/dnlexom/client/app/index.html#/document/5305736">
                  Weitere Information bei DATEV im Elektronischen Wissen Buchungs-ABC
                </a>
                <a target="_blank" href="https://www.datev.de/dnlexom/client/app/index.html#/document/0382983">
                  Weitere Informationen bei DATEV zu Fördermitteln
                </a>
              {/if}
              {#if cluster.name === 'Darlehen'}
                <a target="_blank" href="https://secure8.datev.de/dnlexom/client/app/index.html#/document/2400104">
                  Weitere Information bei DATEV LEXinform (nur für Abonnenten)
                </a>
                <a target="_blank" href="https://www.datev.de/web/de/aktuelles/informationsseite-zum-coronavirus/unterstuetzungsangebote-der-datev/weitere-unterstuetzungsangebote-von-datev">
                  Weitere Informationen bei DATEV zur Beratung bei Kreditbeantragung für staatliche Förderdarlehen
                </a>
              {/if}
            </div>
          {/if}
        {/if}
      {/each}
    {/await}
    <div class="info-text">
      {#if selectedTab === STEUERSTUNDUNG}
        {@html $descriptions.find(d => d.name === STEUERSTUNDUNG).html.replace('&lt;&lt;state&gt;&gt;', selection.state ? $bundeslaender.find(land => land.id == selection.state).name || '' : '')}<br>
        <div class="row">
          {#if selection.state}
            <a target="_blank" class="info-link col-12 col-md-4" href={steuerstundungen[selection.state]}>Antragsformular</a>
            <a target="_blank" class="info-link col-12 col-md-4" href={finanzaemter[selection.state]}>Finanzamt</a>
          {/if}
          <a target="_blank" class="info-link col-sm-12 col-md-4" href={weitereInfos.source}>Steuerliche Maßnahmen</a>
        </div>
        <br>
        <b>Weitere Information bei DATEV LEXinform (nur für Abonnenten)</b>
        <div class="row">
          <a target="_blank" class="info-link col-12 col-md-6" href="https://secure8.datev.de/dnlexom/client/app/index.html#/document/0631203">Steuerliche Maßnahmen</a>
          <a target="_blank" class="info-link col-12 col-md-6" href="https://secure8.datev.de/dnlexom/client/app/index.html#/document/0382198">Anpassung von Vorauszahlungen</a>
        </div>
        <br>
        <a target="_blank" class="info-link" href="https://www.datev.de/dnlexom/client/app/index.html#/document/1008724">
          Weitere Informationen bei DATEV zur Erstattung der Umsatzsteuer-Sondervorauszahlung 2020 aufgrund der Auswirkungen des Corona-Virus
        </a>
      {/if}
      {#if selectedTab === KURZARBEIT}
        {@html $descriptions.find(d => d.name === KURZARBEIT).html}
        <a target="_blank" href={help["Kurzarbeit"].link}>Sie wollen mehr wissen? Weitere Informationen</a><br>
        <a target="_blank" class="info-link button" href="https://www.datev.de/web/de/aktuelles/informationsseite-zum-coronavirus/sicherheit-bei-kurzarbeit-und-in-der-lohnabrechnung/">Weitere Informationen bei DATEV</a><br>
      {/if}
      {#if selectedTab === SOZIALBEITRAEGE}
        {@html $descriptions.find(d => d.name === SOZIALBEITRAEGE).html}
        <a target="_blank" href={help["Sozialbeiträge"].link}>Sie wollen mehr wissen? Weitere Informationen</a>
      {/if}
      {#if selectedTab === ZIVILRECHT}
        {@html $descriptions.find(d => d.name === ZIVILRECHT).html}
      {/if}
    </div>
  </div>
  <div class="info-text">
    <p class="text-center">
      Speichern Sie den Link zu Ihrem persönlichen Ergebnis:<br>
      <a href={pageUrl} style="word-break: break-all;">{pageUrl}</a><br>
    </p>
  </div>
</div>

<style type="text/scss">
  .container-fluid {
    height: calc(100vh - 75px);
    overflow-y: scroll;
  }

  .logo {
    max-height: 10vh;
    margin-top: 1em;
  }

  .nav {
    flex-flow: nowrap;
    overflow-x: auto;
    width: 100%;
  }

  .nav-link.active {
    background-color: $gray-100 !important;
    border-bottom-right-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }

  #tab-content {
    background-color: $gray-100;
    width: 100%;
    padding: 0.3rem 0.8rem;
    overflow-y: auto;

    :global(p) {
      margin-block-start: 0;
    }
  }

  .info-text {
    margin: 16px auto;
    padding: 0 8px;
    font-size: 0.8rem;
    line-height: 1.5;
    max-width: 880px;
    text-align: justify;
  }

</style>
