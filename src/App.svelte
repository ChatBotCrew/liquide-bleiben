<script>
  import { tweened } from 'svelte/motion';

  import ga from './ga.js'
  import { cookiesAllowed, lastStep } from './store.js';
  import {send, receive} from './animations/crossfade.js';
  import CookieBanner from './components/cookie-banner.svelte';
  import Select from './Select.svelte';
  import Results from './Results.svelte';
  import Input from './components/questionnaire/question/input/Input.svelte';
  import { bundeslaender, gewerbe, initialSelection } from './data/data.js';

  import Questionnaire from './components/questionnaire/Questionnaire.svelte';
  import questionsDe from './data/questions-de.js';
  import questionsFr from './data/questions-fr.js';

  let currentStep = 0;
  let progress = tweened(currentStep);
  let currentQuestions = null;

  let selection = null;
  let finished = false;

  initialSelection.subscribe(s => { selection = s })

  // setInterval(()=>{
  //   console.log(selection);
  // }, 1000);

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

    if(change.nstep !== currentQuestions.length)
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

    {#if !currentQuestions}
        <div class="fullpage">
          <div class="country-selector">
            <div class="selector-title">I'm looking for information in...</div>
            <div class="selector-content">
              <div class="country">
                <a on:click={() => currentQuestions = questionsDe}>
                  <img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png" alt="Germany" />
                  <span>Germany</span>
                </a>
              </div>
              <div class="country">
                <a on:click={() => currentQuestions = questionsFr}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/62/Flag_of_France.png" alt="France" />
                  <span>France</span>
                </a>
              </div>
            </div>
          </div>
        </div>
    {:else}
      {#if !finished}
        <Questionnaire questions={currentQuestions} responses={selection} on:stepChanged={onStepChanged}></Questionnaire>
      {:else}
        <Results {selection} />
      {/if}
    {/if}

    {#if $cookiesAllowed === null}
      <CookieBanner></CookieBanner>
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
  
  .country-selector .country {
    cursor: pointer;
  }

  .country-selector .selector-title {
    text-align: center;
    margin-bottom: 40px;
  }

  .country-selector .selector-content {
    width:  300px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    display: flex;
  }

  .country-selector .country img {
    width: 100px;
  }

  .country-selector .country span {
    width: 100%;
    display: inline-block;
  }
</style>
