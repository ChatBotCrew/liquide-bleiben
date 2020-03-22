<script>
  export let columns = [];
  export let offers = [];
</script>

<table>
  <thead>
    <tr>
      {#each columns as column}
        <th>{column}</th>
      {/each}
    </tr>
  </thead>
  {#each offers as row}
    <tr>
      {#each columns as column}
        {#if row[column] && (row[column].startsWith('http://') || row[column].startsWith('https://'))}
          <td><a target="_blank" href={row[column]}>Mehr erfahren</a></td>
        {:else if column === "E-Mail-Adresse"}
          <td><a href={'mailto:' + row[column]}>{row[column]}</a></td>
        {:else if column === "Telefon-Hotline"}
          <td><a href={'tel:' + row[column]}>{row[column]}</a></td>
        {:else}
          <td>{row[column]}</td>
        {/if}
      {/each}
    </tr>
  {/each}
</table>

<style>
  table {
    width: 100%;
    font-size: 16px;
    overflow: auto;
    border-top: 2px solid #333;
    border-bottom: 2px solid #333;
    text-align: left;
  }

  th {
    padding: 8px 0;
  }
  tr {
    height: 50px;
    font-weight: 500;
  }
</style>