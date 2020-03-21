<script>
  import { fly } from 'svelte/transition';

  export let selection;

  const data$ = fetch('/api/offers?', {
    method: 'GET'
  })
  .then(res => res.json());
</script>

<h1>Ihre Auswahl</h1>
{#each Object.keys(selection) as key}
  <div>
    <span>{key}</span>
    <span>{selection[key]}</span>
  </div>
{/each}
{#await data$}
  <div>Angebote werden geladen...</div>
{:then data}
  <table>
    <thead>
      <tr>
        {#each data.columnNames as column}
          <th>{column}</th>
        {/each}
        <th></th>
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