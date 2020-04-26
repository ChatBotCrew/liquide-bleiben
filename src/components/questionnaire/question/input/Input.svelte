<script>
  import { fly } from 'svelte/transition';

  export let data;

  export let value;
  export let title;
  export let helpText;
  
  // const flyDirection = () => 1000 * $lastStep;
    //  in:fly={{ x: flyDirection(), duration: 1500 }} 
    //  out:fly={{ x: -flyDirection(), duration: 1500 }}>

  const mapElement = (input, properties) => {
        if(!properties)
          return;

        if(properties.hasOwnProperty('type'))
          input.type = properties.type;
        if(properties.hasOwnProperty('placeholder'))
          input.placeholder = properties.placeholder;

        if(properties.hasOwnProperty('min'))
          input.min = properties.min;
        if(properties.hasOwnProperty('max'))
          input.max = properties.max;
  }
      
  const getInput = (input, properties) => { //TODO: generalize this
    mapElement(input, properties);

    return {
      update: (p) => mapElement(input, p)
    };
  };

  const getTitle = (index) => {
    return index;
    let stringArr = title.split('/newLine');
    return stringArr[index];
  }
</script>

<div class="input-wrapper">
  <input class="main-input" use:getInput={data.element} />
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