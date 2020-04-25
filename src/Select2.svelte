<script>
  import { fly } from 'svelte/transition';

  import { lastStep } from './store.js'

  export let data;

  export let value;
  export let options;
  export let help;
  export let categoryName;
</script>

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

<div class="select-wrapper">
  <select class="main-input">
    {#if data.element.info}
      <option selected disabled>{data.element.info}</option>
    {/if}
    <!-- {#each data.options as option}
      <option>{option}</option>
    {/each} -->
  </select>
</div>