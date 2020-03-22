<script>
  export let columns = [];
  export let offers = [];
</script>

<!-- <table>
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
        {#if !row[column]}
          <td>k.A.</td>
        {:else if row[column] && (row[column].startsWith('http://') || row[column].startsWith('https://'))}
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
</table> -->

<div class="custom-table">
  {#each offers as doc}
    <div class="doc">
      <div class="title">{doc[columns[0]]}</div>
      <div class="content">
        {#each columns.slice(1) as column}
          <div class="entry">
            <div class="key">{column}</div>
            <div class="name">
              {#if !doc[column]}
                keine Angabe
              {:else if doc[column] && (doc[column].startsWith('http://') || doc[column].startsWith('https://'))}
                <a target="_blank" href={doc[column]}>Mehr erfahren</a>
              {:else if column === "E-Mail-Adresse"}
                <a href={'mailto:' + doc[column]}>{doc[column]}</a>
              {:else if column === "Telefon-Hotline"}
                <a href={'tel:' + doc[column]}>{doc[column]}</a>
              {:else}
                {doc[column]}
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .custom-table {
    display: flex;
    flex-wrap: wrap;
  }

  .doc {
    width: calc(50% - 16px);
    box-sizing: border-box;
    padding: 32px;
    box-shadow: 0 0 6px 0px #999;
    margin: 8px;
  }

  .title {
    font-size: 24px;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 16px;
  }

  .entry {
    display: flex;
    flex-direction: column;
    width: 25%;
    padding: 16px;
    box-sizing: border-box;
  }

  .key {
    font-weight: bold;
    margin-bottom: 4px;
  }

  @media(max-width: 1000px) {
    .doc {
      width: 100%;
    }

    .entry {
      display: flex;
      flex-direction: column;
      width: calc(25% - 16px);
      margin: 8px;
    } 
  }

  @media(max-width: 880px) {
    .entry {
      width: calc(33% - 16px);
      margin: 8px;
    }

    .doc {
      padding: 8px;
    }
  }

  @media(max-width: 680px) {
    .entry {
      width: calc(50% - 16px);
      margin: 8px;
    }
  }

  /* table {
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
  } */
</style>