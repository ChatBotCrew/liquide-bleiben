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
        {#if column === "Link" }
          <th><a href={row[column]}>Mehr erfahren</a></th>
        {:else if column === "E-Mail-Adresse"}
          <th><a href={'mailto:' + row[column]}>Kontakt aufnehmen</a></th>
        {:else}
          <th>{row[column]}</th>
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
  }

  tr {
    height: 50px;
  }

  thead {
    background-color: #c5ffdd;
  }
</style>