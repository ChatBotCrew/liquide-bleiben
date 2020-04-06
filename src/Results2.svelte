<script>
  import { fly } from 'svelte/transition';

  import ga from './ga.js';
  import { cookiesAllowed } from './store.js';
  import { send, receive } from './animations/crossfade.js';
  import { bundeslaender, help, finanzaemter, steuerstundungen, weitereInfos } from './data';

  export let selection;

  const UEBERSICHT = 'Übersicht';
  const STEUERSTUNDUNG = 'Steuerstundung';
  const KURZARBEIT = 'Kurzarbeit';
  const SOZIALBEITRAEGE = 'Sozialbeiträge';

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

  let selectedTab = (location.hash && decodeURI(location.hash.substring(1))) || 'Übersicht'

</script>

<div class="container-lg">
  <div class="d-flex flex-column align-items-center">
    <a out:send="{{ duration: 1000, key: 'logo' }}" in:receive="{{ duration: 1000, key: 'logo' }}"
       href="https://wir-bleiben-liqui.de">
      <img class="logo" src="/logo.png" alt="Wir bleiben liquide">
    </a>
    <h3 class="mt-4 mb-4">Ihre Resultate</h3>
    {#if !selection.state}
      <div>Geben Sie mindestens Ihr Bundesland an, um spezifische Förderprogramme zu erhalten.</div>
    {/if}
    {#await data$}
      <div>Angebote werden geladen...</div>
    {:then data}
    {/await}
    <ul class="nav nav-pills sticky-top">
      <li class="nav-item">
        <a class="nav-link" on:click={() => selectedTab = UEBERSICHT}
           class:active={selectedTab === UEBERSICHT} href="{'#' + UEBERSICHT}">{UEBERSICHT}</a>
      </li>
      {#if selection.state}
        {#await data$ then data}
          {#each data as cluster}
            <li class="nav-item">
              <a class="nav-link" on:click={() => selectedTab = cluster.name}
                 class:active="{selectedTab === cluster.name}"
                 href="{'#' + cluster.name}">{cluster.name}</a>
            </li>
          {/each}
        {/await}
      {/if}
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
    </ul>
  </div>
  <div id="tab-content">
    {#if selectedTab === STEUERSTUNDUNG}
      <p>
        Ihr Bundesland <b>{$bundeslaender.find(land => land.id == selection.state).name || ''}</b> bietet
        Steuerstundungen bis zum 31.12.2020 im Rahmen der Corona-Krise an.
        Eine Steuerstundung bezeichnet im abgabenrechtlichen Sinne eine Verschiebung der Fälligkeit eines
        Steueranspruchs in die Zukunft.
        Die Steuerschuld besteht also weiterhin fort.
      </p>
      <p>
        Eine Steuerstundung aufgrund der Corona-Krise ist ganz oder teilweise möglich.
        <i>Stundbar</i> sind fällige oder bis zum 31.12.2020 fällig werdende <i>Einkommensteuer</i>, <i>Körperschaftsteuer</i>
        und <i>Umsatzsteuer</i>.
        Bei Stundungen, die auf die Corona-Krise zurückzuführen sind, werden keine Stundungszinsen festgesetzt.
      </p>
      <p>
        Außerdem können Einkommen- und Körperschaftsteuer-Vorauszahlungen sowie der Gewerbesteuer-Messbetrag im Rahmen
        der Krise herabgesetzt werden.
        Die Bundesländer stellen hierfür geeignete Formulare bereit.
        Diese sind unten verlinkt.
      </p>
      <p>
        Zusätzlich kann auf Antrag Grunderwerbsteuer für vom 1. Januar bis 30. April 2020 verwirklichte Erwerbsvorgänge
        und für Vorgänge,
        für die die Steuer in diesem Zeitraum entsteht, bis längstens 31. Dezember 2020, zinslos gestundet werden.
        Auch kann auf Antrag eine Fristverlängerung für die Abgabe der Lohnsteueranmeldungen, die 10. April 2020
        einzureichen sind (März 2020 oder I. Quartal 2020) um bis zu zwei Monate gewährt werden.
        (Hierfür stehen bislang noch keine Formulare bereit, sodass der Antrag schriftlich zu stellen ist.)
      </p>
      <p>
        Auch können Anträge auf Stundung von Gewerbesteuer und Grundsteuer gestellt werden.
        Diese sind bei der zuständigen Gemeinde zu beantragen.
        Diese sind nicht an die Weisungen des Bundesfinanzministeriums bzw. der Landesfinanzbehörden gebunden, d.h. eine
        Stundung liegt im Ermessen der jeweiligen Gemeinde.
      </p>
      <p>
        <b>Hinweis I:</b> Wenn Sie sowohl einen Stundungsantrag als auch einen Herabsetzungsantrag stellen möchten,
        bitten die Finanzämter um Einreichung des Antrags in zweifacher Ausfertigung,
        da diese Anträge zwar in den meisten Bundesländern über ein und dasselbe Formular eingereicht werden, i.d.R.
        aber in unterschiedliche Zuständigkeitsbereiche fallen.<br>
        <b>Hinweis II:</b> Anträge auf Stundung der Gewerbesteuer sind bei der zuständigen Gemeinde zu stellen.
      </p>
      <p>
        Anträge auf Steuerstundungen und/oder auf Anpassungen von Vorauszahlungen, die nach dem 31.12.2020 eingehen oder
        nur Zeiträume nach dem 31.12.2020 betreffen, sind besonders zu begründen.
      </p>
      <p>

        Antragsformular zur Stundung der Einkommensteuer, Körperschaftsteuer und Umsatzsteuer sowie zur Herabsetzung der
        Vorauszahlungen zur Einkommen- und Körperschaftsteuer und des Gewerbesteuer-Messbetrages:
      </p>
      <div class="d-flex flex-column">
        {#if selection.state}
          <a target="_blank" class="info-link" href={steuerstundungen[selection.state]}>Antragsformular</a>
          <a target="_blank" class="info-link" href={finanzaemter[selection.state]}>Finanzamt</a>
        {/if}
        <a target="_blank" class="info-link" href={weitereInfos.source}>Steuerliche Maßnahmen</a>
      </div>
    {/if}
    {#if selectedTab === KURZARBEIT}
      {@html help["Kurzarbeit"].text}
      <span>Sie wollen mehr wissen?</span>
      <a target="_blank" class="info-link button" href={help["Kurzarbeit"].link}>Weitere Informationen</a>
    {/if}
    {#if selectedTab === SOZIALBEITRAEGE}
      {@html help["Sozialbeiträge"].text}
      <span>Sie wollen mehr wissen?</span>
      <a target="_blank" class="info-link button" href={help["Sozialbeiträge"].link}>Weitere Informationen</a>
    {/if}
  </div>
</div>

<style type="text/scss">
  .container-lg {
    height: calc(100vh - 80px);
    overflow-y: scroll;
  }

  .nav {
    flex-flow: nowrap;
    overflow-x: scroll;
    width: 100%;
  }

  .nav-link.active {
    background-color: $gray-200 !important;
    color: $primary !important;
    border-bottom-right-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }

  #tab-content {
    background-color: $gray-200;
    border-radius: $border-radius;
    width: 100%;
    padding: 0.3rem 0.8rem;
    overflow-y: scroll;

    :global(p) {
      margin-block-start: 0;
    }
  }

</style>
