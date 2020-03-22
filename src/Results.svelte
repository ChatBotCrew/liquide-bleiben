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
  const searchParams = new URLSearchParams(selection).toString()
  dataUrl.search = searchParams;

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
</div>

<style>
  .results {
    text-align: center;
    overflow: auto;
    max-width: 100%;
  }
</style>