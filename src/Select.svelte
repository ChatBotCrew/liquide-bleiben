<script>
  export let value;
  export let options;
  export let help;
  export let categoryName;
</script>

<select class="main-input" bind:value>
  <option selected disabled>{categoryName} wählen</option>
  {#each options as option}
    <option value={option}>{option}</option>
  {/each}
</select>
<div class="help-text">{help}</div>

<style>
  .main-input {
    max-width: 90%;
    border-radius: 50px;
    text-align: center;
  }

  .main-input:focus {
    outline: none;
  }
</style>