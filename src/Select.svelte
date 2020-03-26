<script>
  import { fly } from 'svelte/transition';

  import { lastStep } from './store.js'

  export let value;
  export let options;
  export let help;
  export let categoryName;
</script>

<div class="select-wrapper" in:fly={{ x: 1000 * $lastStep, duration: 1500 }} out:fly={{ x: -1000 * $lastStep , duration: 1500 }}>
  <select class="main-input" bind:value>
    <option selected disabled>{categoryName} wählen</option>
    {#each options as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
  <div class="help-text">{help}</div>
</div>

<style>
  .select-wrapper {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>