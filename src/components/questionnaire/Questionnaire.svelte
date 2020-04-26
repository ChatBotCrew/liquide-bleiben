<script>
  import { createEventDispatcher } from 'svelte';

  import Question from "./question/Question.svelte";
  import Progress from './progress/Progress.svelte';
  
  export let questions;
  export let responses;

  const eventDispatcher = createEventDispatcher();

  let step = 0;

  const onBackClicked = () => {
      onStepChanged(step, step - 1);
  };

  const onNextClicked = () => {
    onStepChanged(step, step + 1);
  };
  
  const onStepChanged = (pstep, nstep) => {
    step = nstep;
    eventDispatcher('stepChanged', {
      pstep: pstep,
      nstep: nstep
    });
  };
</script>

<style>
  .fullpage {
    width: 90%;
    z-index: 5;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

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

  .next-button-wrapper {
    width: 90%;
    max-width: 880px;
    z-index: 10;
    display: flex;
    align-items: stretch;
  }

  .next-button-wrapper > button {
    flex: 1;
    margin: 8px;
    z-index: 10;
  }
</style>

{#if questions[step]}
  <div class="fullpage">
    <div class="input-wrapper">
      {#if questions[step].hasOwnProperty('binding')}
        <Question question={questions[step]} bind:response={responses[questions[step].binding]} />
      {:else}
        <Question question={questions[step]} />
      {/if}
    </div>

    <div class="next-button-wrapper">
      <button class="next" on:click={onBackClicked} disabled={step === 0}>Zurück</button>
      <button class="next" on:click={onNextClicked}>Weiter</button>
    </div>

    <div style="width: 100%; text-align: center;">
      <Progress max={questions.length} value={step} ></Progress>
    </div>
  </div>
{/if}