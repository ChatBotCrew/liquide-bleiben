<script>
  import { fly } from 'svelte/transition';

  import { lastStep } from './store.js'

  export let value;
  export let options;
  export let help;
  export let categoryName;
</script>

<div class="select-wrapper" in:fly={{ x: 1000 * $lastStep, duration: 500 }} out:fly={{ x: -1000 * $lastStep , duration: 500 }}>
  <select class="main-input" bind:value>
    <option disabled selected={!value} value={null}>{categoryName} wählen</option>
    {#each options as option}
      <option selected={value === option.id} value={option.id}>{option.name}</option>
    {/each}
  </select>
  <div class="help-text">{help}</div>
</div>

<style>
  .select-wrapper {
    width: 100%;
    max-width: 880px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>