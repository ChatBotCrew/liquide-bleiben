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
  .help-text {
    width: 500px;
    margin-bottom: 32px;
    text-align: center;
  }

  .main-input {
    border-radius: 50px;
    text-align: center;
    font-size: 25px;
  }

  .main-input:focus {
    outline: none;
  }
</style>