<script>
  export let offers = [];
  const details = {};
</script>

<div class="custom-table">
  {#each offers as offer}
    <div class="doc">
      <div class="title">{offer.name}</div>
      <div class="divider"></div>
      <div class="content">
        {#each offer.fields.main as field}
          <p>
            <span class="key">{field.name}:</span>
            {#if (field.value.startsWith('http://') || field.value.startsWith('https://'))}
              <a target="_blank" href={field.value}>Mehr erfahren</a>
            {:else}
              {field.value}
            {/if}
          </p>
        {/each}
        <button class="button" on:click={() => details[offer.id] = !details[offer.id]}>Details anzeigen</button>
        {#if details[offer.id]}
          <div class="offer-details">
            {#each offer.fields.details as field}
              <p>
                <span class="key">{field.name}:</span>
                {#if (field.value.startsWith('http://') || field.value.startsWith('https://'))}
                  <a target="_blank" href={field.value}>Mehr erfahren</a>
                {:else if [10002, 10003].includes(field.id)}
                  <br>{@html field.value}
                {:else}
                  {field.value}
                {/if}
              </p>
            {/each}
          </div>
        {/if}
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
