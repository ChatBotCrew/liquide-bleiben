<script>
  import { tweened } from "svelte/motion";
  import CookieBanner from "./components/cookie-banner.svelte";
  import Select from "./Select.svelte";
  import Results from "./Results.svelte";
  import Input from "./components/questionnaire/question/input/Input.svelte";
  import Questionnaire from "./components/questionnaire/Questionnaire.svelte";
  import httpService from "./services/http.service";

  import ga from "./ga.js";
  import { cookiesAllowed, lastStep } from "./store.js";
  import { send, receive } from "./animations/crossfade.js";
  import { bundeslaender, gewerbe, initialSelection } from "./data/data.js";

  let countries = [];
  httpService.sendGet("/api/countries").then(res => {
    countries = res;
  });

  // load the questions of the selected country
  let loadQuestions = country => {
    httpService.sendGet(`/api/questions/${country}`).then(res => {
      currentQuestions = res;
    });
  };

  let currentStep = 0;
  let progress = tweened(currentStep);
  let currentQuestions = null;

  let selection = null;
  let finished = false;

  initialSelection.subscribe(s => {
    selection = s;
  });

  const next = () => {
    lastStep.set(1);
    currentStep++;
    progress.set(currentStep);
    ga.sendGAEvent("nav", "click", `next ${currentStep}`);
  };
  const back = () => {
    lastStep.set(-1);
    currentStep--;
    progress.set(currentStep);
    ga.sendGAEvent("nav", "click", `back ${currentStep}`);
  };
  const seeResults = () => {
    lastStep.set(1);
    currentStep = 6;
    progress.set(currentStep);
    ga.sendGAEvent("nav", "click", `next ${currentStep}`);
  };
  const toFirstStep = () => {
    lastStep.set(-1);
    currentStep = 1;
    progress.set(currentStep);
    ga.sendGAEvent("nav", "click", "restart");
  };
  const flyDirection = () => 1000 * $lastStep;
  const optin = () => ga.optin();
  const optout = () => ga.optout();

  const onStepChanged = e => {
    const change = e.detail;
    console.log(change);

    if (change.nstep !== currentQuestions.length) return;

    console.log("Finished!");
    finished = true;
  };
</script>

<style>
  .logo-link {
    max-width: 50%;
  }

  @media (max-width: 600px) {
    .logo-link {
      display: none;
    }
  }

  .country-selector .country {
    cursor: pointer;
  }

  .country-selector .selector-title {
    text-align: center;
    margin-bottom: 40px;
  }

  .country-selector .selector-content {
    width: 300px;
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

{#if $initialSelection}
  <main>
    <a
      class="logo-link"
      in:receive={{ duration: 1000, key: 'logo' }}
      out:send={{ duration: 1000, key: 'logo' }}
      href="https://wir-bleiben-liqui.de">
      <img class="logo" src="/logo.png" alt="Wir bleiben liquide" />
    </a>

    {#if !currentQuestions}
      <div class="fullpage">
        <div class="country-selector">
          <div class="selector-title">I'm looking for information in...</div>
          <div class="selector-content">
            {#each countries as country}
              <div class="country">
                <a on:click={loadQuestions(country.questions)}>
                  <img src={country.flag} alt={country.name} />
                  <span>{country.name}</span>
                </a>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {:else if !finished}
      <Questionnaire
        questions={currentQuestions}
        responses={selection}
        on:stepChanged={onStepChanged} />
    {:else}
      <Results {selection} />
    {/if}

    {#if $cookiesAllowed === null}
      <CookieBanner />
    {/if}
  </main>
{/if}
