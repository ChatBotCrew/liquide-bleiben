<script>
  import { tweened } from 'svelte/motion';

  import ga from './ga.js'
  import { cookiesAllowed, lastStep } from './store.js';
  import {send, receive} from './animations/crossfade.js';
  import Select from './Select.svelte';
  import Results from './Results.svelte';
  import Input from './components/questionnaire/question/input/Input.svelte';
  import { bundeslaender, gewerbe, initialSelection } from './data.js';
  
  import Questionnaire from './components/questionnaire/Questionnaire.svelte';
  import questions from './questions.js';

  let currentStep = 0;
  let progress = tweened(currentStep);

  let selection = null;
  let finished = false;

  initialSelection.subscribe(s => { selection = s })

  setInterval(()=>{
    console.log(selection);
  }, 1000);

  const next = () => { lastStep.set(1); currentStep++; progress.set(currentStep); ga.sendGAEvent('nav', 'click', `next ${currentStep}`) }
  const back = () => { lastStep.set(-1); currentStep--; progress.set(currentStep); ga.sendGAEvent('nav', 'click', `back ${currentStep}`) }
  const seeResults = () => { lastStep.set(1); currentStep = 6; progress.set(currentStep); ga.sendGAEvent('nav', 'click', `next ${currentStep}`) }
  const toFirstStep = () => { lastStep.set(-1); currentStep = 1; progress.set(currentStep); ga.sendGAEvent('nav', 'click', 'restart') }
  const flyDirection = () => 1000 * $lastStep;
  const optin = () => ga.optin();
  const optout = () => ga.optout();

  const onStepChanged = (e) => {
    const change = e.detail;
    console.log(change);

    if(change.nstep !== questions.length)
      return;

    console.log("Finished!");
    finished = true;
  }
</script>

{#if $initialSelection}
  <main>
    <a class="logo-link" in:receive="{{ duration: 1000, key: 'logo' }}" out:send="{{ duration: 1000, key: 'logo' }}" href="https://wir-bleiben-liqui.de">
      <img class="logo" src="/logo.png" alt="Wir bleiben liquide">
    </a>

    {#if !finished}
      <Questionnaire questions={questions} responses={selection} on:stepChanged={onStepChanged}></Questionnaire>
    {:else}
      <Results {selection} />
    {/if}

    {#if $cookiesAllowed === null}
      <div class="cookies-banner" transition:fly="{{ y: 100, duration: 1500 }}">
        <div>
          <div>Diese Website verwendet Cookies – nähere Informationen dazu und zu Ihren Rechten als Benutzer finden Sie in unserer <a href="https://wir-bleiben-liqui.de/datenschutz/">Datenschutzerklärung</a>.</div>
          <div>Klicken Sie auf "Ich stimme zu", um Cookies zu akzeptieren und direkt unsere Website besuchen zu können.</div>
        </div>
        <button class="ga-optin" on:click={optin}>Ich stimme zu</button>
        <a on:click={optout} class="ga-optout">X</a>
      </div>
    {/if}
  </main>
{/if}

<style>
  .logo-link {
    max-width: 50%;
  }

  @media(max-width: 600px) {
    .wide-buttons {
      flex-direction: column;
    }

    .logo-link {
      display: none;
    }
  }

  button.change-inputs {
    height: 50px;
    width: 90%;
    position: absolute;
    bottom: 16px;
    left: 0;
    right: 0;
    z-index: 10;
    margin: auto;
  }

  .disclaimer {
    line-height: 1.25;
  }

  .cookies-banner {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    font-size: 0.75em;
    display: flex;
    padding: 16px 32px;
    box-sizing: border-box;
    align-items: center;
    background-color: #FFFFFFBB;
  }

  .cookies-banner > div {
    flex: 1;
  }

  .cookies-banner > button {
    margin: 0 8px;
  }

  .ga-optin {
    max-width: 300px;
    width: 30%;
  }

  .ga-optout {
    cursor: pointer;
  }
</style>
