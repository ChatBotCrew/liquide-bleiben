<script>
  import { fly } from 'svelte/transition';

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
  <h1>Ihre Auswahl</h1>
  <!-- {#each Object.keys(selection) as key}
    <div>
      <span>{key}</span>
      <span>{selection[key]}</span>
    </div>
  {/each} -->
  {#await data$}
    <div>Angebote werden geladen...</div>
  {:then data}
    {#each data.cluster.names as clusterName}
      <details>
        <summary>{clusterName}</summary>
        <div class="help-text">Hier könnte ihr Hilfetext stehen</div>
        <Table columns={data.columns} offers={data.offers.filter(offer => offer[data.cluster.column] === clusterName)} />
      </details>
    {/each}
  {/await}
  <div class="link-text" style="text-align: center;">
    Dein persönlicher Finder-Link:<br>
    <a href={pageUrl}>{pageUrl}</a>
  </div>
</div>

<style>
  .results {
    text-align: center;
    overflow: auto;
    max-width: 100%;
    width: 100%;
  }

  summary {
    font-size: 36px;
    height: 50px;
    background-color: #c5ffdd;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    cursor: pointer;
  }

  details {
    margin-bottom: 32px;
  }

  .link-text {
    max-width: 100%;
    margin-bottom: 32px;
    text-align: center;
    font-size: 0.8em;
  }
</style>