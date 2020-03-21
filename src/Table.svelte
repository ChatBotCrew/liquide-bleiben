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

<h1>Ihre Auswahl</h1>
{#await data$}
  <div>Angebote werden geladen...</div>
{:then data}
  <table>
    <thead>
      <tr>
        {#each data.columns as column}
          <th>{column.name}</th>
        {/each}
      </tr>
    </thead>
    {#each data.offers as row}
      <tr>
        <td>{row.name}</td>
        <td>{row.land}</td>
        <td>{row.summe}</td>
        <td>{row.mitarbeiter}</td>
        <td>{row.jahresabschluss}</td>
        <td><a href="#">Zur Ansicht →</a></td>
      </tr>
    {/each}
  </table>
{/await}

<style>
  table {
    width: 100%;
  }

  tr {
    height: 50px;
  }

  thead {
    background-color: #2CFFA299;
  }
</style>