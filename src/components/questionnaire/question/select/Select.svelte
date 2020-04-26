<script>
  import { fly } from 'svelte/transition';

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
    {#if data.element.placeholder}
      <option selected disabled>{data.element.placeholder}</option>
    {/if}
    <!-- {#each data.options as option}
      <option>{option}</option>
    {/each} -->
  </select>
</div>