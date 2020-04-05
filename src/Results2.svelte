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

<div class="container">
  <a out:send="{{ duration: 1000, key: 'logo' }}" in:receive="{{ duration: 1000, key: 'logo' }}"
     href="https://wir-bleiben-liqui.de">
    <img class="logo" src="/logo.png" alt="Wir bleiben liquide">
  </a>
  <h1>Ihre Resultate</h1>
  {#if !selection.state}
    <div>Geben Sie mindestens Ihr Bundesland an, um spezifische Förderprogramme zu erhalten.</div>
  {/if}
  {#await data$}
    <div>Angebote werden geladen...</div>
  {:then data}
  {/await}
  <ul class="nav nav-pills">
    <li class="nav-item">
      <a class="nav-link" on:click={() => selectedTab = UEBERSICHT}
         class:active={selectedTab === UEBERSICHT} href="{'#' + UEBERSICHT}">{UEBERSICHT}</a>
    </li>
    {#if selection.state}
      {#await data$}
      {:then data}
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

<style type="text/scss">
  .nav {
    flex-flow: nowrap;
    overflow-x: scroll;
  }
</style>
