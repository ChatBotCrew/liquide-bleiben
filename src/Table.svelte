<script>
  import { fly } from 'svelte/transition';

  export let selection;

  // Remove not set selections (should not happen)
  Object.keys(selection).forEach(key => { 
    if (selection[key] === null) delete selection[key];
  });

  // Build URL with Query Params
  const dataUrl = new URL(location.href + 'api/offers');
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
    <table>
      <thead>
        <tr>
          {#each data.columns as column}
            <th>{column}</th>
          {/each}
        </tr>
      </thead>
      {#each data.offers as row}
        <tr>
          {#each data.columns as column}
            {#if column === "Link" }
              <th><a href={row[column]}>Mehr erfahren</a></th>
            {:else}
              <th>{row[column]}</th>
            {/if}
          {/each}
        </tr>
      {/each}
    </table>
  {/await}
</div>

<style>

  .results {
    text-align: center;
    overflow: auto;
    max-width: 100%;
  }

  table {
    width: 100%;
    font-size: 16px;
    overflow: auto;
  }

  tr {
    height: 50px;
  }

  thead {
    background-color: #2CFFA299;
  }
</style>