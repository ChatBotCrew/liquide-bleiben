<script>
  import { fly } from 'svelte/transition';
  import { help, finanzaemter, weitereInfos } from'./data';

  import Table from './Table.svelte';

  export let selection;

  // Remove not set selections (should not happen)
  Object.keys(selection).forEach(key => { 
    if (selection[key] === null) delete selection[key];
  });

  // Build URL with Query Params
  const dataUrl = new URL(location.origin + '/api/offers');
  const pageUrl = new URL(location.origin);
  const searchParams = new URLSearchParams(selection).toString()
  dataUrl.search = searchParams;
  pageUrl.search = searchParams;

  // Query Data which contains columns and offers
  const data$ = fetch(dataUrl, { method: 'GET' })
    .then(res => res.json());
</script>

<div class="results">
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
          {#if !(clusterName === "Zuschuss" && selection.time == 1)}
            <details>
              <summary>{clusterName}</summary>
              <div class="info-title">
                {@html help[clusterName].text}<br>
                <a target="_blank" class="info-link" href={help[clusterName] ? help[clusterName].link : "https://wir-bleiben-liqui.de"}>Weitere Informationen</a>
              </div>
              <Table columns={data.columns} offers={data.offers.filter(offer => offer[data.cluster.column] === clusterName)} />
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
        <a target="_blank" class="info-link" href="https://wir-bleiben-liqui.de">Weitere Informationen</a>
      </div>
    </details>
  {/if}
  {#if selection.employees != 0}
    <details class="additional-info-wrapper">
      <summary>Sozialbeiträge</summary>
      <div class="info-title">{@html help["Sozialbeiträge"].text}</div>
      <div class="info-link-wrapper">
        <a target="_blank" class="info-link" href="https://wir-bleiben-liqui.de">Weitere Informationen</a>
      </div>
    </details>
  {/if}
  <div class="link-text" style="text-align: center;">
    Ihr persönlicher Finder-Link:<br>
    <a href={pageUrl}>{pageUrl}</a>
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
    margin: 16px 0;
    padding: 0 8px;
    font-size: 0.8em;
  }

  .info-link-wrapper {
    display: flex;
    justify-content: space-around;
  }

  .info-link {
    height: 50px;
    flex: 1;
  }

  li {
    text-align: left;
  }

  summary {
    font-size: 36px;
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
    font-size: 0.8em;
  }

  @media(max-width: 700px) {
    summary {
      font-size: 24px;
    }
  }
</style>