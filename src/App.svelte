<script>
  import { fade, fly } from 'svelte/transition';

  import Select from './Select.svelte';
  import Results from './Results.svelte';
  import { bundeslaender, gewerbe, rechtsformen } from './data.js';

  function searchToObject() {
    const pairs = window.location.search.substring(1).split("&");
    const obj = {};
    for (let i in pairs) {
      if (pairs[i] === "") continue;
      const pair = pairs[i].split("=");
      if(decodeURIComponent(pair[0]) === "solo" && pair[1] === "ja") obj[employees] = 0;
      else obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return obj;
  }

  let currentStep = 0;
  let selection = {
    state: null,
    trade: null,
    age: null,
    legal: null,
    sales: null,
    employees: null,
    time: null,
    ...searchToObject()
  }

  const next = () => currentStep++;
  const seeResults = () => currentStep = 8;
</script>

<main>
  {#if currentStep === 0}
    <div class="fullpage" in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }}>
      <p class="input-wrapper disclaimer">
        <a href="wir-bleiben-liqui.de">wir-bleiben-liqui.de</a> bietet weder Rechts- noch Steuerberatung an.<br>
        Bei diesem Angebot handelt es sich lediglich um einen kostenfreien und unverbindlichen Informationszugang für alle, die aufgrund (drohender) Liquiditätsengpässe finanzielle Unterstützung benötigen.<br>
        Die Plattform bietet diese Unterstützung nicht selbst an, hilft aber dabei, passende Angebote von Finanzinstituten einzugrenzen.<br>
        Bei Fragen rechtlicher, steuerlicher oder finanzplanerischer Natur sollten Experten der jeweiligen Themenfelder oder die Finanzinstitute selbst konsultiert werden.<br>
      </p>
    </div>
    <div class="next-button-wrapper" transition:fade|local>
      <button on:click={next}>Verstanden</button>
      {#if Object.entries(selection).filter(([k,v]) => !!v).length}
        <button on:click={seeResults}>Verstanden & direkt zu den Ergebnissen</button>
      {/if}
    </div>
  {/if}
  {#if currentStep === 1}
    <div class="fullpage" in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }}>
      <Select categoryName="Bundesland" bind:value={selection.state} options={bundeslaender} help="Hiermit können wir Dir helfen die Programme aus deinem Bundesland für Dich zu finden. Bitte wähle das Bundesland aus in dem der Sitz Deiner Betriebsstätte ist." />
    </div>
    <button disabled={!selection.state} transition:fade|local class="next" on:click={next}>Weiter</button>
  {/if}
  {#if currentStep === 2}
    <div class="fullpage" in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }}>
      <Select categoryName="Gewerbe" bind:value={selection.trade} options={gewerbe} help="Für einige Branchen gibt es spezielle Förder- und Hilfsprogramme, lass uns wissen in welcher Branche Du tätig bist damit wir Dir genauere Vorschläge machen können." />
    </div>
    <button disabled={!selection.trade} transition:fade|local class="next" on:click={next}>Weiter</button>
  {/if}
  {#if currentStep === 3}
    <div class="fullpage" in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }} >
      <div class="input-wrapper">
        Mein Unternehmen ist
        <input class="main-input" bind:value={selection.age} style="width: 100px;" placeholder="XX" type="number" max="999" />
        Jahre alt
      </div>
      <div class="help-text">
        Für junge und bereits etablierte Unternehmen gibt es oft unterschiedliche Förderprogramme, lass uns wissen seit wievielen Jahren es Dein Unternehmen bereits gibt und wir suchen für Dich die passenden Angebote.
      </div>
    </div>
    <button disabled={!selection.age} transition:fade|local class="next" on:click={next}>Weiter</button>
  {/if}
  {#if currentStep === 4}
    <div class="fullpage" in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }}>
      <Select categoryName="Rechtsform" bind:value={selection.legal} options={rechtsformen} help="Je nachdem welche Rechtsform Dein Unternehmen hat wirst Du für verschiedene Fördermittel unterschiedliche Unterlagen benötigen, lass uns wissen was für eine Rechtsform Dein Unternehmen hat. Solltest Du Dir nicht sicher sein welche Rechtsform Dein Unternehmen hat kannst Du davon ausgehen, dass wenn Du alleine ein Unternehmen gegründet hast Du wahrscheinlich ein Einzelunternehmer bist. Wenn Du mit mehreren Personen ein Unternehmen gegründet hast und bisher keine Reigistierung vorgenommen hast, seid ihr wahrscheinlich eine GBR." />
    </div>
    <button disabled={!selection.legal} transition:fade|local class="next" on:click={next}>Weiter</button>
  {/if}
  {#if currentStep === 5}
    <div class="fullpage" in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }}>
      <div class="input-wrapper">
        Mein Unternehmen hatte 2019 einen <br>
        Umsatz von <input class="main-input" bind:value={selection.sales} style="width: 300px;" placeholder="XXXXXX" type="number" /> €
      </div>
    </div>
    <button disabled={!selection.sales} transition:fade|local class="next" on:click={next}>Weiter</button>
  {/if}
  {#if currentStep === 6}
    <div class="fullpage" in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }}>
      <div class="input-wrapper">
        Mein Unternehmen hat <input class="main-input" bind:value={selection.employees} style="width: 150px;" placeholder="XX" type="number" /> Mitarbeiter
      </div>
    </div>
    <button disabled={!selection.employees} transition:fade|local class="next" on:click={next}>Weiter</button>
  {/if}
  {#if currentStep === 7}
    <div class="fullpage" in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }}>
      <div class="input-wrapper">
        Ich brauche Liquidität innerhalb der nächsten
      </div>
    </div>
    <div class="next-button-wrapper" transition:fade|local>
      <button on:click={() => { selection.time = 0; next(); }}>30 Tage</button>
      <button on:click={() => { selection.time = 1; next(); }}>6 Monate</button>
    </div>
  {/if}
  {#if currentStep === 8}
    <div class="fullpage" in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }}>
      <Results {selection} />
    </div>
  {/if}
</main>

<style>
  .fullpage {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .disclaimer {
    max-width: 700px;
  }

  .next-button-wrapper {
    height: 100px;
    width: 90%;
    position: absolute;
    bottom: 16px;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    align-items: stretch;
  }

  .next-button-wrapper > button {
    flex: 1;
    border-radius: 50px;
  }

  button.next {
    height: 100px;
    width: 90%;
    border-radius: 50px;
    position: absolute;
    bottom: 16px;
    left: 0;
    right: 0;
    margin: auto;
  }

  .input-wrapper {
    text-align: center;
    margin-bottom: 16px;
  }

  .main-input {
    border-radius: 50px;
    text-align: center;
  }

  .main-input:focus {
    outline: none;
  }
</style>