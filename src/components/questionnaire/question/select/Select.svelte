<script>
  import { fly } from 'svelte/transition';
  import httpService from '../../../../http.service';  

  export let data;
  export let selects;

  export let value;
  export let options;
  export let help;
  export let categoryName;

  export let elements = httpService.sendGet('/api/selects');  
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
    {#await elements then value}
      {#each value[0].options as option}
        <option>{option.name}</option>
      {/each}
    {/await}      
    {/if}    
        
    <!-- {#each data.options as option}
      <option>{option}</option>
    {/each} -->
  </select>
</div>