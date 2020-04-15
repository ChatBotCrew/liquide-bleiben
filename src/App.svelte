<script>
  import { fade, fly } from 'svelte/transition';
  import { tweened } from 'svelte/motion';

  import ga from './ga.js'
  import { lastStep } from './store.js';
  import {send, receive} from './animations/crossfade.js';
  import CookieBanner from './CookieBanner.svelte';
  import Progress from './Progress.svelte';
  import Select from './Select.svelte';
  import Results from './Results.svelte';
  import { bundeslaender, gewerbe, initialSelection, times } from './data.js';

  let chatbotActive = false;
  let currentStep = 0;
  let progress = tweened(currentStep);

  let selection = null;

  initialSelection.subscribe(s => { selection = s })

  const next = () => { lastStep.set(1); currentStep++; progress.set(currentStep); ga.sendGAEvent('nav', 'click', `next ${currentStep}`) }
  const back = () => { lastStep.set(-1); currentStep--; progress.set(currentStep); ga.sendGAEvent('nav', 'click', `back ${currentStep}`) }
  const seeResults = () => { lastStep.set(1); currentStep = 6; progress.set(currentStep); ga.sendGAEvent('nav', 'click', `next ${currentStep}`) }
  const toFirstStep = () => { lastStep.set(-1); currentStep = 1; progress.set(currentStep); ga.sendGAEvent('nav', 'click', 'restart') }
  const flyDirection = () => 1000 * $lastStep;
</script>

{#if $initialSelection}
<main>
  <CookieBanner></CookieBanner>
  {#if currentStep !== 6}
    <a class="logo-link" out:send="{{ duration: 1000, key: 'logo' }}" in:receive="{{ duration: 1000, key: 'logo' }}" href="https://wir-bleiben-liqui.de">
      <img class="logo" src="/logo.png" alt="Wir bleiben liquide">
    </a>
  {/if}
  {#if currentStep === 0}
    <div class="fullpage">
      <p class="input-wrapper disclaimer" in:fly={{ x: flyDirection(), duration: 1500 }} out:fly={{ x: -flyDirection(), duration: 1500 }}>
        <a target="_blank" href="wir-bleiben-liqui.de">wir-bleiben-liqui.de</a> bietet weder Rechts- noch Steuerberatung an.<br>
        Bei diesem Angebot handelt es sich lediglich um einen kostenfreien und unverbindlichen Informationszugang für alle, die aufgrund (drohender) Liquiditätsengpässe finanzielle Unterstützung benötigen.<br>
        Die Plattform bietet diese Unterstützung nicht selbst an, hilft aber dabei, passende Angebote von Finanzinstituten einzugrenzen.<br>
        Bei Fragen rechtlicher, steuerlicher oder finanzplanerischer Natur sollten Experten der jeweiligen Themenfelder oder die Finanzinstitute selbst konsultiert werden.<br>
      </p>
      <div class="next-button-wrapper wide-buttons" out:send="{{ duration: 1000, key: 'buttons' }}" in:receive="{{ duration: 1000, key: 'buttons' }}">
        {#if Object.entries(selection).filter(([k,v]) => v !== null).length}
          <button on:click={seeResults}>Akzeptieren</button>
          <button on:click={next}>Akzeptieren & Kriterien anpassen</button>
        {:else}
          <button on:click={next}>Akzeptieren</button>
        {/if}
      </div>
    </div>
  {/if}
  {#if currentStep === 1}
    <div class="fullpage">
      <Select
        categoryName="Bundesland"
        bind:value={selection.state}
        options={$bundeslaender}
        help="Hiermit können wir Ihnen helfen die Programme aus Ihrem Bundesland für Sie zu finden. Bitte wählen Sie das Bundesland aus, in dem der Sitz Ihres Unternehmens ist."
      />
      <div class="next-button-wrapper" out:send="{{ duration: 1000, key: 'buttons' }}" in:receive="{{ duration: 1000, key: 'buttons' }}">
        <button class="next" on:click={back}>Zurück</button>
        <button class="next" on:click={next} disabled={selection.state === null}>Weiter</button>
      </div>
      <Progress progress={$progress} />
    </div>
  {/if}
  {#if currentStep === 2}
    <div class="fullpage">
      <Select
        categoryName="Branche"
        bind:value={selection.trade}
        options={$gewerbe}
        help="Für einige Branchen gibt es spezielle Förder- und Hilfsprogramme. Lassen Sie uns wissen in welcher Branche Sie tätig sind, damit wir Ihnen genauere Vorschläge machen können."
      />
      <div class="next-button-wrapper" out:send="{{ duration: 1000, key: 'buttons' }}" in:receive="{{ duration: 1000, key: 'buttons' }}">
        <button class="next" on:click={back}>Zurück</button>
        <button class="next" on:click={next} disabled={selection.trade === null}>Weiter</button>
      </div>
      <Progress progress={$progress} />
    </div>
  {/if}
  {#if currentStep === 3}
    <div class="fullpage">
      <div class="input-wrapper" in:fly={{ x: flyDirection(), duration: 1500 }} out:fly={{ x: -flyDirection(), duration: 1500 }}>
        Mein Unternehmen ist
        <input class="main-input" bind:value={selection.age} style="width: 100px;" placeholder="XX" type="number" min="0" max="999" />
        Jahre alt
        <div class="help-text">
          Für junge und bereits etablierte Unternehmen gibt es oft unterschiedliche Förderprogramme. Lassen Sie uns wissen seit wievielen Jahren es Ihr Unternehmen bereits gibt und wir suchen für Sie die passenden Angebote.
        </div>
      </div>
      <div class="next-button-wrapper" out:send="{{ duration: 1000, key: 'buttons' }}" in:receive="{{ duration: 1000, key: 'buttons' }}">
        <button class="next" on:click={back}>Zurück</button>
        <button class="next" on:click={next} disabled={selection.age === null || selection.age < 0 || selection.age > 999}>Weiter</button>
      </div>
      <Progress progress={$progress} />
    </div>
  {/if}
  <!-- Temporarily remove legal question during rework -->
  <!-- {#if currentStep === 4}
    <div class="fullpage">
      <Select
        categoryName="Rechtsform"
        bind:value={selection.legal}
        options={$rechtsformen}
        help="Je nach Rechtsform Ihres Unternehmen werden Sie unterschiedliche Unterlagen benötigen. Sollten Sie sich nicht sicher sein, sind Sie wahrscheinlich ein:e Einzelunternehmer:in oder wenn Sie mit mehreren Personen ein Unternehmen gegründet haben, sind Sie wahrscheinlich eine GbR."
      />
      <div class="next-button-wrapper" out:send="{{ duration: 1000, key: 'buttons' }}" in:receive="{{ duration: 1000, key: 'buttons' }}">
        <button class="next" on:click={back}>Zurück</button>
        <button class="next" on:click={next} disabled={!selection.legal}>Weiter</button>
      </div>
      <Progress progress={$progress} />
    </div>
  {/if} -->
  {#if currentStep === 4}
    <div class="fullpage">
      <div class="input-wrapper" in:fly={{ x: flyDirection(), duration: 1500 }} out:fly={{ x: -flyDirection(), duration: 1500 }}>
        Mein Unternehmen hatte 2019 einen <br>
        Umsatz von <input class="main-input" bind:value={selection.sales} style="width: 300px;" placeholder="XXXXXX" min="0" type="number" /> €
        <div class="help-text">
          Je nach Umsatz Ihres Unternehmens gibt es unterschiedliche Förderprogramme, lassen Sie uns den Umsatz des letzten Jahres wissen, damit wir die für Sie passenden Programme finden können.
        </div>
      </div>
      <div class="next-button-wrapper" out:send="{{ duration: 1000, key: 'buttons' }}" in:receive="{{ duration: 1000, key: 'buttons' }}">
        <button class="next" on:click={back}>Zurück</button>
        <button class="next" on:click={next} disabled={selection.sales === null || selection.sales < 0}>Weiter</button>
      </div>
      <Progress progress={$progress} />
    </div>
  {/if}
  {#if currentStep === 5}
    <div class="fullpage">
      <div class="input-wrapper" in:fly={{ x: flyDirection(), duration: 1500 }} out:fly={{ x: -flyDirection(), duration: 1500 }}>
        Mein Unternehmen hat <input class="main-input" bind:value={selection.employees} style="width: 150px;" placeholder="XX" min="0" type="number" /> Mitarbeiter:innen
        <div class="help-text">
          Je nach Anzahl der Mitarbeiter:innen in Ihrem Unternehmen gibt es unterschiedliche Förderprogramme und Hilfen, lassen Sie uns die Anzahl Ihrer Mitarbeiter:innen wissen, damit wir die für Sie passenden Programmen finden können. Sollten Sie keine Mitarbeiter:innen haben und ein:e Solo-Unternehmer:in sein, tragen Sie bitte eine "0" ein.
        </div>
      </div>
      <div class="next-button-wrapper" out:send="{{ duration: 1000, key: 'buttons' }}" in:receive="{{ duration: 1000, key: 'buttons' }}">
        <button class="next" on:click={back}>Zurück</button>
        <button class="next" on:click={next} disabled={selection.employees === null || selection.employees < 0}>Weiter</button>
      </div>
      <Progress progress={$progress} />
    </div>
  {/if}
  {#if currentStep === 6}
    <div in:fly={{ x: flyDirection(), duration: 1500 }} out:fly={{ x: -flyDirection(), duration: 1500 }}>
      <Results {selection} />
    </div>
    <div class="results-buttons" out:send="{{ duration: 1000, key: 'buttons' }}" in:receive="{{ duration: 1000, key: 'buttons' }}">
      <button on:click={toFirstStep}>Zurück zum Finder</button>
      <button on:click={() => chatbotActive = !chatbotActive}>{chatbotActive ? "Förderike ausblenden" : "Zur Antragshelferin Förderike"}</button>
    </div>
  {/if}
  {#if chatbotActive}
    <div class="chatbot-wrapper" transition:fly={{ y: 1000 }}>
      <iframe src="/foerderike" title="Förderike"></iframe>
    </div>
  {/if}
</main>
{/if}

<style>

  .logo-link {
    position: absolute;
    max-width: 50%;
  }

  .fullpage {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5;
    margin: auto;
    height: 100%;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .next-button-wrapper {
    width: 90%;
    max-width: 880px;
    z-index: 10;
    display: flex;
    align-items: stretch;
  }

  @media(max-width: 600px) {
    .wide-buttons {
      flex-direction: column;
    }

    .logo-link {
      display: none;
    }
  }

  .next-button-wrapper > button, .results-buttons > button, .results-buttons > .button {
    flex: 1;
    margin: 8px;
    z-index: 10;
  }

  .results-buttons {
    z-index: 10;
    padding: 0 5%;
    display: flex;
    align-items: stretch;
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

  .disclaimer {
    line-height: 1.25;
  }

  .chatbot-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    max-height: 500px;
    max-width: 700px;
    margin: auto;
    display: flex;
    flex-direction: column;
  }

  .chatbot-wrapper > iframe {
    border: none;
    height: 100%;
    width: 100%;
  }
</style>
