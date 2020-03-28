<script>
  import { fly } from 'svelte/transition';

  import ga from './ga.js';
  import { cookiesAllowed } from './store.js';
  import {send, receive} from './animations/crossfade.js';
  import { help, finanzaemter, weitereInfos } from'./data';
  import Table from './Table.svelte';

  export let selection;

  // Remove not set selections (may happen when coming from a link)
  Object.keys(selection).forEach(key => {
    if (selection[key] === null) delete selection[key];
  });

  // Build URL with Query Params
  const dataUrl = new URL(location.origin + '/api/offers');
  const pageUrl = new URL(location.origin);
  const searchParams = new URLSearchParams(Object.assign({}, selection, { lok: $cookiesAllowed })).toString()
  dataUrl.search = searchParams;
  pageUrl.search = searchParams;

  // Query Data which contains columns and offers
  const data$ = fetch(dataUrl, { method: 'GET' })
    .then(res => {
      ga.sendGAEvent('nav', 'load', 'results')
      return res.json()
    });
  
</script>

<div class="results">
  <a out:send="{{ duration: 1000, key: 'logo' }}" in:receive="{{ duration: 1000, key: 'logo' }}" href="https://wir-bleiben-liqui.de">
    <img class="logo" src="/logo.png" alt="Wir bleiben liquide">
  </a>
  <h1>Ihre Resultate</h1>
  <!-- {#each Object.keys(selection) as key}
    <div>
      <span>{key}</span>
      <span>{selection[key]}</span>
    </div>
  {/each} -->
  {#if selection.state}
    {#await data$}
      <div>Angebote werden geladen...</div>
    {:then data}
      {#if data.offers.length}
        {#each data.cluster.names as clusterName}
          {#if !(clusterName === "Zuschuss" && selection.time == "6 Monate")}
            <details>
              <summary>{clusterName}</summary>
              <Table columns={data.columns} offers={data.offers.filter(offer => offer[data.cluster.column] === clusterName)} />
              {#if help[clusterName]}
                <div class="info-title">
                  {@html help[clusterName].text}<br>
                </div>
                <div class="info-link-wrapper">
                  <span>Sie wollen mehr wissen?</span>
                  <a target="_blank" class="info-link button" href={help[clusterName] ? help[clusterName].link : "https://wir-bleiben-liqui.de"}>
                    Direkt zu unserem Blog
                  </a>
                </div>
              {/if}
            </details>
          {/if}
        {/each}
      {:else}
        <div>Leider konnten keine möglichen Förderprogramme gefunden werden.</div>
      {/if}
    {/await}
  {:else}
    <div>Geben Sie mindestens Ihr Bundesland an, um spezifische Förderprogramme zu erhalten.</div>
  {/if}
  <details class="additional-info-wrapper">
    <summary>Steuerstundung</summary>
    <div class="info-title">{@html help['Steuerstundung'].text(selection.state || '')}</div>
    <div class="info-link-wrapper">
      <a target="_blank" class="info-link" href={weitereInfos.requestForm}>Antragsformular</a>
      {#if selection.state}
        <a target="_blank" class="info-link" href={finanzaemter[selection.state]}>Finanzamt</a>
      {/if}
      <a target="_blank" class="info-link" href={weitereInfos.requestForm}>Steuerliche Maßnahmen</a>
    </div>
  </details>
  {#if selection.employees != 0}
    <details class="additional-info-wrapper">
      <summary>Kurzarbeit</summary>
      <div class="info-title">{@html help["Kurzarbeit"].text}</div>
      <div class="info-link-wrapper">
        <span>Sie wollen mehr wissen?</span>
        <a target="_blank" class="info-link button" href={help["Kurzarbeit"].link}>Weitere Informationen</a>
      </div>
    </details>
  {/if}
  {#if selection.employees != 0}
    <details class="additional-info-wrapper">
      <summary>Sozialbeiträge</summary>
      <div class="info-title">{@html help["Sozialbeiträge"].text}</div>
      <div class="info-link-wrapper">
        <span0>Sie wollen mehr wissen?</span0>
        <a target="_blank" class="info-link button" href={help["Sozialbeiträge"].link}>Weitere Informationen</a>
      </div>
    </details>
  {/if}
  <div class="link-text" style="text-align: center;">
    Speichern Sie den Link zu Ihrem persönlichen Ergebnis:<br>
    <a href={pageUrl} style="word-break: break-all;">{pageUrl}</a>
  </div>
</div>

<style>
  .results {
    text-align: center;
    overflow: auto;
    max-width: 100%;
    width: 100%;
    margin-bottom: 75px;
  }

  .info-title {
    margin: 16px auto;
    padding: 0 8px;
    font-size: 0.8rem;
    line-height: 1.5;
    max-width: 880px;
    text-align: justify;
  }

  .info-link-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .info-link {
    height: 50px;
    flex: 1;
    border-radius: 50px;
    margin: 16px;
    line-height: 50px;
    max-width: 500px;
    width: 100%;
  }

  li {
    text-align: left;
  }

  summary {
    font-size: 1.5rem;
    height: 50px;
    background-color: #c5ffdd;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .additional-info-wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  details {
    overflow: auto;
    box-shadow:
      8px 8px 12px 0 #2CFFA2,
      -8px -8px 12px 0 #c5ffdd;
    width: calc(100% - 32px);
    margin: 32px auto;
  }

  .link-text {
    max-width: 100%;
    margin-bottom: 32px;
    text-align: center;
    font-size: 0.8rem;
  }
</style>