<script>
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';

  export let data;
  export let value;

  const eventDispatcher = createEventDispatcher();

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

  const onFieldValid = (e) => {
    eventDispatcher('validation', {
      valid: true,
      value: e.input.value
    });
  };
  const onFieldInvalid = (e) => {
    eventDispatcher('validation', {
      valid: false,
      value: e.input.value
    });
  };
</script>

<div class="input-wrapper">
  <input class="main-input" use:getInput={data.element} bind:value={value} on:valid={onFieldValid} on:invalid={onFieldInvalid} />
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