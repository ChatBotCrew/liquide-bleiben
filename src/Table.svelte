<script>
  import { slide } from 'svelte/transition';

  export let offers = [];
  const details = {};

  function onDetailsClick(id) {
    details[id] = !details[id];
    // Set timeout to wait for the transition to finish - default duration 400ms
    setTimeout(() => {
      for(let element of document.getElementsByClassName("external")) {
        element.setAttribute("target", "_blank");
      }
    }, 500)
  }
</script>

<div class="custom-table">
  {#each offers as offer}
    <div class="doc">
      <div class="title">{offer.name}</div>
      <div class="divider"></div>
      <div class="content">
        {#each offer.fields.main as field}
          <p class="text-center">
            <span class="key">{field.name}:</span>
            {#if (field.value.startsWith('http://') || field.value.startsWith('https://'))}
              <a target="_blank" href={field.value}>Mehr erfahren</a>
            {:else if [10002, 10003, 10032].includes(field.id)}
              <br>{@html field.value}
            {:else}
              {field.value}
            {/if}
          </p>
        {/each}
        <button class="button" on:click={() => onDetailsClick(offer.id)}>Details anzeigen</button>
        {#if details[offer.id]}
          <div class="offer-details" transition:slide>
            {#each offer.fields.details as field}
              <p class="text-center">
                <span class="key">{field.name}:</span>
                {#if (field.value.startsWith('http://') || field.value.startsWith('https://'))}
                  <a target="_blank" href={field.value}>Mehr erfahren</a>
                {:else if [10002, 10003, 10032].includes(field.id)}
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

<style type="text/scss">
  .custom-table {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .doc {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(50% - 16px);
    box-sizing: border-box;
    padding: 32px;
    box-shadow: 0 0 6px 0px #999;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .title {
    font-size: 1rem;
    text-align: center;
  }

  .divider {
    border-bottom: #007d8c 2px solid;
    width: 33%;
    margin-top: 0.5rem;
  }

  .content {
    font-size: 0.75rem;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .offer-details {
    margin-top: 0.5rem;

    p:last-of-type {
      margin-block-end: 0;
    }
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
  
  button:focus {
    outline: none;
  }
</style>
