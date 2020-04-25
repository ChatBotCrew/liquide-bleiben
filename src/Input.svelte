<script>
  import { fly } from 'svelte/transition';

  import { lastStep } from './store.js'

  export let value;
  export let title;
  export let helpText;  
  
  const flyDirection = () => 1000 * $lastStep;

  const getTitle = (index) => {
    let stringArr = title.split('/newLine');
    return stringArr[index];
  }
</script>

<div class="input-wrapper"
     in:fly={{ x: flyDirection(), duration: 1500 }} 
     out:fly={{ x: -flyDirection(), duration: 1500 }}>
        {getTitle(0)}
        <input class="main-input"
               bind:value={value}
               style="width: 100px;"
               placeholder="XX"
               type="number"
               min="0"
               max="999" />
        {getTitle(1)}
        <div class="help-text">    
        {helpText}
        </div>
      </div>

<style>
  .input-wrapper {
    text-align: center;
    width: 100%;
    max-width: 880px;
    margin-top: 60px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }
  .input-wrapper::-webkit-scrollbar {
    display: none;
  }
</style>