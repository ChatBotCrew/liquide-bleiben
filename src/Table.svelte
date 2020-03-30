<script>
  export let columns = [];
  export let offers = [];
</script>

<div class="custom-table">
  {#each offers as doc}
    <div class="doc">
      <div class="title">{doc[columns[0]]}</div>
      <div class="divider"></div>
      <div class="content">
        {#each columns.slice(1) as column}
          {#if doc[column]}
            <p><span class="key">{column}:</span>
              {#if doc[column] && (doc[column].startsWith('http://') || doc[column].startsWith('https://'))}
                <a target="_blank" href={doc[column]}>Mehr erfahren</a>
              {:else if column === "E-Mail-Adresse"}
                <a href={'mailto:' + doc[column]} style="word-break: break-all;">{doc[column]}</a>
              {:else if column === "Telefon-Hotline"}
                <a href={'tel:' + doc[column]} style="word-break: break-all;">{doc[column]}</a>
              {:else}
                {doc[column]}
              {/if}
            </p>
          {/if}
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
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(50% - 16px);
    box-sizing: border-box;
    padding: 32px;
    box-shadow: 0 0 6px 0px #999;
    margin: 8px;
  }

  .title {
    font-size: 1rem;
  }

  .divider {
    border-bottom: #2CFFA2 2px solid;
    width: 33%;
    margin-top: 0.5rem;
  }

  .content {
    font-size: 0.75rem;
  }

  .key {
    font-weight: bold;
  }

  @media(max-width: 1000px) {
    .doc {
      width: 100%;
    }
  }

  @media(max-width: 425px) {
    .key {
      display: block;
    }
  }
</style>
