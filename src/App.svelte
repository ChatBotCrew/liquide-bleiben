<script>
  import { fade, fly } from "svelte/transition";
  import { tweened } from "svelte/motion";

  import ga from "./ga.js";
  import { cookiesAllowed, lastStep } from "./store.js";
  import { send, receive } from "./animations/crossfade.js";
  import Progress from "./Progress.svelte";
  import Select from "./Select.svelte";
  import Results from "./Results.svelte";
  import { bundeslaender, gewerbe, initialSelection } from "./data.js";

  let currentStep = 0;
  let progress = tweened(currentStep);

  let selection = null;
  let calculatorVisible = false;
  let calculatorContent = [null, null, null, null];
  const nullIs0 = val => (val == null ? 0 : val);
  const changeCalculator = () => {
    selection.employees = Math.ceil(
      nullIs0(calculatorContent[0]) * 0.3 +
        nullIs0(calculatorContent[1]) * 0.5 +
        nullIs0(calculatorContent[2]) * 0.75 +
        nullIs0(calculatorContent[3])
    );
    calculatorVisible = false;
  };

  let salesOptions = [
    { text: "0 - 2", value: 1000000 },
    { text: "2 - 5", value: 3500000 },
    { text: "5 - 10", value: 7500000 },
    { text: "10 - 50", value: 30000000 },
    { text: "50 - 500", value: 275000000 },
    { text: "mehr als 500", value: 6000000 }
  ];
  let totalAssetsOptions = [
    { text: "0 - 1", value: 500000 },
    { text: "1 - 2", value: 1500000 },
    { text: "2 - 10", value: 600000 },
    { text: "10 - 20", value: 15000000 },
    { text: "20 - 43", value: 31500000 },
    { text: "mehr als 43", value: 50000000 }
  ]; //1,2,10,20,43, unendlich
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
</script>

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

  @media (max-width: 600px) {
    .wide-buttons {
      flex-direction: column;
    }

    .logo-link {
      display: none;
    }
  }

  .next-button-wrapper > button {
    flex: 1;
    margin: 8px;
    z-index: 10;
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

  .input-wrapper {
    text-align: center;
    width: 100%;
    max-width: 880px;
    margin-top: 30px;
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
    background-color: #ffffffbb;
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

  header {
    display: flex;
    justify-content: flex-start;
  }
  .logo {
    display: block;
    width: 200px;
    padding: 16px;
  }
  @media (min-width: 660px) AND (min-height: 820px) {
    .logo {
      width: 300px;
      padding: 32px;
    }
    header {
      justify-content: center;
    }
  }
  /* .ol {
    background-color: grey;
  }
  .ol li {
    background-color: green;
  } */
  .calculator {
    position: relative;
    padding: 16px;
    background-color: #e2edef;
    border-radius: 8px;
  }
  .calculator ul {
    list-style: none;
    padding: 0;
  }
  .calculator li.input {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  .calculator input {
    width: 50%;
    margin-bottom: 0;
    margin-right: 16px;
  }
  .calculator button:not(.cancel) {
    width: 100%;
  }
  .calculator button.cancel {
    position: absolute;
    right: 16px;
    top: 16px;
    background: none;
    border: none;
  }
  .calculator button.cancel img {
    height: 24px;
  }
  .calculator li b {
    margin-bottom: 16px;
    display: block;
  }
  .factor-list {
    list-style-type: none;
    padding: 0;
  }
  .factor-list li span.equals {
    width: 20px;
    display: inline-block;
  }
  .factor-list span:first-child {
    width: calc(50% - 16px);
    display: inline-block;
    text-align: right;
  }
  .factor-list span:last-child {
    width: calc(50% - 16px);
    display: inline-block;
    text-align: left;
  }
  .factor-list i {
    display: inline-block;
    width: 30px;
    text-align: center;
    font-style: normal;
  }
  @media (max-width: 659px) {
    .calculator {
      width: 100%;
      padding: 0;
    }
    .calculator li {
      padding-left: 16px;
      padding-right: 16px;
    }
    .calculator input {
      margin-bottom: 0px;
    }
    .calculator span {
      display: block;
      margin: 8px 0 16px 0;
      width: 100%;
    }

    .calculator li b {
      text-align: left;
    }
  }
</style>

<header>
  <a href="https://wir-bleiben-liqui.de" class="logo">
    <img src="/logo.svg" alt="Wir bleiben liquide" />
  </a>
</header>
{#if $initialSelection}
  <main>
    {#if $cookiesAllowed === null}
      <div class="cookies-banner" transition:fly={{ y: 100, duration: 500 }}>
        <div>
          <div>
            Diese Website verwendet Cookies – nähere Informationen dazu und zu
            deinen Rechten als Benutzer findest du in unserer
            <a href="https://wir-bleiben-liqui.de/datenschutz/">
              Datenschutzerklärung
            </a>
            .
          </div>
          <div>
            Klicke auf "Ich stimme zu", um Cookies zu akzeptieren und direkt
            unsere Website besuchen zu können.
          </div>
        </div>
        <button class="ga-optin" on:click={optin}>Ich stimme zu</button>
        <a on:click={optout} class="ga-optout">X</a>
      </div>
    {/if}
    {#if currentStep === 0}
      <div class="fullpage">
        <p
          class="input-wrapper disclaimer"
          in:fly={{ x: flyDirection(), duration: 500 }}
          out:fly={{ x: -flyDirection(), duration: 500 }}>
          <a target="_blank" href="wir-bleiben-liqui.de">
            wir-bleiben-liqui.de
          </a>
          bietet weder Rechts- noch Steuerberatung an.
          <br />
          Bei diesem Angebot handelt es sich lediglich um einen kostenfreien und
          unverbindlichen Informationszugang für alle, die aufgrund (drohender)
          Liquiditätsengpässe finanzielle Unterstützung benötigen.
          <br />
          Die Plattform bietet diese Unterstützung nicht selbst an, hilft aber
          dabei, passende Angebote von Finanzinstituten einzugrenzen.
          <br />
          Bei Fragen rechtlicher, steuerlicher oder finanzplanerischer Natur
          sollten Experten der jeweiligen Themenfelder oder die Finanzinstitute
          selbst konsultiert werden.
          <br />
        </p>
        <div
          class="next-button-wrapper wide-buttons"
          out:send={{ duration: 500, key: 'buttons' }}
          in:receive={{ duration: 500, key: 'buttons' }}>
          {#if Object.entries(selection).filter(([k, v]) => v !== null).length}
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
          help="Hiermit können wir dir helfen die Programme aus deinem
          Bundesland für dich zu finden. Bitte wähle das Bundesland aus, in dem
          der Sitz deines Unternehmens ist." />
        <div
          class="next-button-wrapper"
          out:send={{ duration: 500, key: 'buttons' }}
          in:receive={{ duration: 500, key: 'buttons' }}>
          <button class="next" on:click={back}>Zurück</button>
          <button
            class="next"
            on:click={next}
            disabled={selection.state === null}>
            Weiter
          </button>
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
          help="Für einige Branchen gibt es spezielle Förder- und
          Hilfsprogramme. Lass uns wissen in welcher Branche du tätig bist,
          damit wir dir genauere Vorschläge machen können." />
        <div
          class="next-button-wrapper"
          out:send={{ duration: 500, key: 'buttons' }}
          in:receive={{ duration: 500, key: 'buttons' }}>
          <button class="next" on:click={back}>Zurück</button>
          <button
            class="next"
            on:click={next}
            disabled={selection.trade === null}>
            Weiter
          </button>
        </div>
        <Progress progress={$progress} />
      </div>
    {/if}
    {#if currentStep === 3}
      <div class="fullpage">
        <div
          class="input-wrapper"
          in:fly={{ x: flyDirection(), duration: 500 }}
          out:fly={{ x: -flyDirection(), duration: 500 }}>
          Mein Unternehmen ist
          <input
            class="main-input"
            bind:value={selection.age}
            style="width: 100px;"
            placeholder="XX"
            type="number"
            min="0"
            max="999" />
          Jahre alt
          <div class="help-text">
            Für junge und bereits etablierte Unternehmen gibt es oft
            unterschiedliche Förderprogramme. Lass uns wissen seit wie vielen
            Jahren es dein Unternehmen bereits gibt und wir suchen für dich die
            passenden Angebote.
          </div>
        </div>
        <div
          class="next-button-wrapper"
          out:send={{ duration: 500, key: 'buttons' }}
          in:receive={{ duration: 500, key: 'buttons' }}>
          <button class="next" on:click={back}>Zurück</button>
          <button
            class="next"
            on:click={next}
            disabled={selection.age === null || selection.age < 0 || selection.age > 999}>
            Weiter
          </button>
        </div>
        <Progress progress={$progress} />
      </div>
    {/if}
    {#if currentStep === 4}
      <div class="fullpage">
        <div
          class="input-wrapper"
          in:fly={{ x: flyDirection(), duration: 500 }}
          out:fly={{ x: -flyDirection(), duration: 500 }}>
          {#if !calculatorVisible}
            Mein Unternehmen hat
            <input
              class="main-input"
              bind:value={selection.employees}
              style="width: 150px;"
              placeholder="XX"
              min="0"
              type="number" />
            Beschäftigte (Vollzeitäquivalente, VZÄ)
            <div class="help-text">
              Umrechnung von Teilzeitkräften und 450 Euro-Jobs in VZÄ für
              Mitarbeiter:innen:
              <ol class="factor-list">
                <li>
                  <span>450 Euro-Basis</span>
                  <span class="equals">=</span>
                  <span>
                    Faktor
                    <i>0,3</i>
                  </span>
                </li>
                <li>
                  <span>bis 20 Stunden</span>
                  <span class="equals">=</span>
                  <span>
                    Faktor
                    <i>0,5</i>
                  </span>
                </li>
                <li>
                  <span>bis 30 Stunden</span>
                  <span class="equals">=</span>
                  <span>
                    Faktor
                    <i>0,75</i>
                  </span>
                </li>
                <li>
                  <span>über 30 Stunden</span>
                  <span class="equals">=</span>
                  <span>
                    Faktor
                    <i>1</i>
                  </span>
                </li>
              </ol>
              <b>
                Bitte das Ergebnis auf die nächsthöhere Zahl aufrunden
                <br />
                und als Solo-Unternehmer:in ohne Mitarbeiter:innen 0 eintragen
              </b>
            </div>
            <button
              on:click={() => {
                calculatorVisible = true;
              }}>
              VZÄ-Hilfsrechner öffnen
            </button>
          {/if}
          {#if calculatorVisible}
            <div class="calculator">
              <ul>
                <li>
                  <b>Anzahl der Beschäftigten:</b>
                </li>
                <li class="input">
                  <input
                    class="main-input"
                    min="0"
                    type="number"
                    placeholder="0"
                    bind:value={calculatorContent[0]} />
                  <span>450 Euro-Basis</span>
                </li>
                <li class="input">
                  <input
                    class="main-input"
                    min="0"
                    type="number"
                    placeholder="0"
                    bind:value={calculatorContent[1]} />
                  <span>bis 20 Stunden</span>
                </li>
                <li class="input">
                  <input
                    class="main-input"
                    min="0"
                    type="number"
                    placeholder="0"
                    bind:value={calculatorContent[2]} />
                  <span>bis 30 Stunden</span>
                </li>
                <li class="input">
                  <input
                    class="main-input"
                    min="0"
                    type="number"
                    placeholder="0"
                    bind:value={calculatorContent[3]} />
                  <span>über 30 Stunden</span>
                </li>
                <li>
                  <button on:click={changeCalculator}>Berechnen</button>
                </li>
                <!-- <li><span> 450 Euro-Basis</span><span class="equals">=</span><span>Faktor <i>0,3</i></span></li>
              <li><span> bis 20 Stunden</span><span class="equals">=</span><span>Faktor <i>0,5</i></span></li>
              <li><span> bis 30 Stunden</span><span class="equals">=</span><span>Faktor <i>0,75</i></span></li>
              <li><span>über 30 Stunden</span><span class="equals">=</span><span>Faktor <i>1</i></span></li> -->
              </ul>

              <button
                class="cancel"
                on:click={() => {
                  calculatorVisible = false;
                }}>
                <img src="/close.svg" alt="schließen" />
              </button>
            </div>
          {/if}
        </div>
        <div
          class="next-button-wrapper"
          out:send={{ duration: 500, key: 'buttons' }}
          in:receive={{ duration: 500, key: 'buttons' }}>
          <button class="next" on:click={back}>Zurück</button>
          <button
            class="next"
            on:click={next}
            disabled={selection.employees === null || selection.employees < 0}>
            Weiter
          </button>
        </div>
        <Progress progress={$progress} />
      </div>
    {/if}
    {#if currentStep === 5}
      <div class="fullpage">
        <div
          class="input-wrapper"
          in:fly={{ x: flyDirection(), duration: 500 }}
          out:fly={{ x: -flyDirection(), duration: 500 }}>
          Mein Unternehmen hatte 2019
          <br />
          einen Umsatz von
          <!-- <Select
          categoryName="Branche"
          bind:value={selection.sales}
          options={$gewerbe}
          help="Für einige Branchen gibt es spezielle Förder- und
          Hilfsprogramme. Lassen Sie uns wissen in welcher Branche Sie tätig
          sind, damit wir Ihnen genauere Vorschläge machen können." /> -->
          <select
            class="main-input"
            value={selection.sales}
            on:change={e => {
              selection.sales = +e.target.value;
            }}>
            <option disabled default value={null}>bitte wählen</option>
            {#each salesOptions as salesOption}
              <option value={salesOption.value}>{salesOption.text}</option>
            {/each}
          </select>
          Millionen €
          <!-- <input
            class="main-input"
            bind:value={selection.sales}
            style="width: 300px;"
            placeholder="XXXXXX"
            min="0"
            type="number" /> -->
          <div class="help-text">
            Je nach Umsatz deines Unternehmens gibt es unterschiedliche
            Förderprogramme, lass uns den Umsatz des letzten Jahres wissen,
            damit wir die für dich passensten Programme finden können.
          </div>
        </div>
        <div
          class="next-button-wrapper"
          out:send={{ duration: 500, key: 'buttons' }}
          in:receive={{ duration: 500, key: 'buttons' }}>
          <button class="next" on:click={back}>Zurück</button>
          <button
            class="next"
            on:click={next}
            disabled={selection.sales === null || selection.sales < 0}>
            Weiter
          </button>
        </div>
        <Progress progress={$progress} />
      </div>
    {/if}

    {#if currentStep === 6}
      <div class="fullpage">
        <div
          class="input-wrapper"
          in:fly={{ x: flyDirection(), duration: 500 }}
          out:fly={{ x: -flyDirection(), duration: 500 }}>
          Mein Unternehmen hat eine Bilanzsumme von
          <select
            class="main-input"
            value={selection.totalAssets}
            on:change={e => {
              selection.totalAssets = +e.target.value;
            }}>
            <option
              disabled
              default
              selected={!selection.totalAssets}
              value={null}>
              bitte wählen
            </option>
            {#each totalAssetsOptions as totalAssetsOption}
              <option value={totalAssetsOption.value}>
                {totalAssetsOption.text}
              </option>
            {/each}
          </select>
          Millionen €
          <div class="help-text">
            Sollte dein Unternehmen keine Bilanz aufstellen, wähle bitte "0 -
            1".
          </div>
        </div>
        <div
          class="next-button-wrapper"
          out:send={{ duration: 500, key: 'buttons' }}
          in:receive={{ duration: 500, key: 'buttons' }}>
          <button class="next" on:click={back}>Zurück</button>
          <button
            class="next"
            on:click={next}
            disabled={selection.totalAssets === null || selection.totalAssets < 0}>
            Weiter
          </button>
        </div>
        <Progress progress={$progress} />
      </div>
    {/if}
    {#if currentStep === 7}
      <div
        in:fly={{ x: flyDirection(), duration: 500 }}
        out:fly={{ x: -flyDirection(), duration: 500 }}>
        <Results {selection} />
      </div>
      <button
        class="change-inputs"
        on:click={toFirstStep}
        out:send={{ duration: 500, key: 'buttons' }}
        in:receive={{ duration: 500, key: 'buttons' }}>
        Zurück zum Finder
      </button>
    {/if}
  </main>
{/if}
