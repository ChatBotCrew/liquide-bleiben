<script>
  import {send, receive} from './animations/crossfade.js';

  import Question from "./Question.svelte";

  import questions from './questions.js';

  let step = 0;

  const onBackClicked = () => {
      step--;
  };
  const onNextClicked = () => {
      step++;
  };

  let animModifier = 100;

  const flyDirection = () => { 
      animModifier; 
    }
</script>

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

<div class="fullpage">
  <div class="input-wrapper" in:fly={{ x: flyDirection(), duration: 1500 }} out:fly={{ x: -flyDirection(), duration: 1500 }}>
    <Question question={questions[step]} />
  </div>

  <div class="next-button-wrapper" in:receive="{{ duration: animModifier, key: 'buttons' }}" out:send="{{ duration: animModifier, key: 'buttons' }}">
    <button class="next" on:click={onBackClicked} disabled={step === 0}>Zurück</button>
    <button class="next" on:click={onNextClicked} disabled={step === questions.length-1}>Weiter</button>
  </div>
</div>