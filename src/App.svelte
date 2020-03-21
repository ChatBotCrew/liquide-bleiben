<script>
  import { fade, fly } from 'svelte/transition';

  import Select from './Select.svelte';
  import Table from './Table.svelte';
  import { bundeslaender, gewerbe, rechtsformen } from './data.js';

  let currentStep = 0;
  let selection = {
    land: null,
    gewerbe: null,
    alter: null,
    rechtsform: null,
    umsatz: null,
    mitarbeiter: null,
    zeit: null,
  }

  const next = () => currentStep++;
</script>

<main>
  {#if currentStep === 0}
    <div class="fullpage" in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }}>
      <Select categoryName="Bundesland" bind:value={selection.land} options={bundeslaender} help="Hiermit können wir Dir helfen die Programme aus deinem Bundesland für Dich zu finden. Bitte wähle das Bundesland aus in dem der Sitz Deiner Betriebsstätte ist." />
    </div>
    <button disabled={!selection.land} transition:fade|local class="next" on:click={next}>Weiter</button>
  {/if}
  {#if currentStep === 1}
    <div class="fullpage" in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }}>
      <Select categoryName="Gewerbe" bind:value={selection.gewerbe} options={gewerbe} help="Für einige Branchen gibt es spezielle Förder- und Hilfsprogramme, lass uns wissen in welcher Branche Du tätig bist damit wir Dir genauere Vorschläge machen können." />
    </div>
    <button disabled={!selection.gewerbe} transition:fade|local class="next" on:click={next}>Weiter</button>
  {/if}
  {#if currentStep === 2}
    <div class="fullpage" in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }} >
      <div class="input-wrapper">
        Mein Unternehmen ist
        <input class="main-input" bind:value={selection.alter} style="width: 100px;" placeholder="XX" type="number" max="999" />
        Jahre alt
      </div>
      <div class="help-text">
        Für junge und bereits etablierte Unternehmen gibt es oft unterschiedliche Förderprogramme, lass uns wissen seit wievielen Jahren es Dein Unternehmen bereits gibt und wir suchen für Dich die passenden Angebote.
      </div>
    </div>
    <button disabled={!selection.alter} transition:fade|local class="next" on:click={next}>Weiter</button>
  {/if}
  {#if currentStep === 3}
    <div class="fullpage" in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }}>
      <Select categoryName="Rechtsform" bind:value={selection.rechtsform} options={rechtsformen} help="Je nachdem welche Rechtsform Dein Unternehmen hat wirst Du für verschiedene Fördermittel unterschiedliche Unterlagen benötigen, lass uns wissen was für eine Rechtsform Dein Unternehmen hat. Solltest Du Dir nicht sicher sein welche Rechtsform Dein Unternehmen hat kannst Du davon ausgehen, dass wenn Du alleine ein Unternehmen gegründet hast Du wahrscheinlich ein Einzelunternehmer bist. Wenn Du mit mehreren Personen ein Unternehmen gegründet hast und bisher keine Reigistierung vorgenommen hast, seid ihr wahrscheinlich eine GBR." />
    </div>
    <button disabled={!selection.rechtsform} transition:fade|local class="next" on:click={next}>Weiter</button>
  {/if}
  {#if currentStep === 4}
    <div class="fullpage" in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }}>
      <div class="input-wrapper">
        Mein Unternehmen hatte 2019 einen <br>
        Umsatz von <input class="main-input" bind:value={selection.umsatz} style="width: 300px;" placeholder="XXXXXX" type="number" /> €
      </div>
      <div class="help-text"></div>
    </div>
    <button disabled={!selection.umsatz} transition:fade|local class="next" on:click={next}>Weiter</button>
  {/if}
  {#if currentStep === 5}
    <div class="fullpage" in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }}>
      <div class="input-wrapper">
        Mein Unternehmen hat <input class="main-input" bind:value={selection.mitarbeiter} style="width: 150px;" placeholder="XX" type="number" /> Mitarbeiter
      </div>
      <div class="help-text"></div>
    </div>
    <button disabled={!selection.mitarbeiter} transition:fade|local class="next" on:click={next}>Weiter</button>
  {/if}
  {#if currentStep === 6}
    <div class="fullpage" in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }}>
      <div class="input-wrapper">
        Ich brauche Liquidität innerhalb der nächsten <br>
        <div class="radio-group">
          <label class="radio-field">
            <input type="radio" id="zeit-0" bind:group={selection.zeit} name="zeit" value="0">
            <span class="checkmark"></span>
            30 Tage
          </label>
          <label class="radio-field">
            <input type="radio" id="zeit-1" bind:group={selection.zeit} name="zeit" value="1">
            <span class="checkmark"></span>
            6 Monate
          </label>
        </div>
      </div>
      <div class="help-text"></div>
    </div>
    <button disabled={!selection.zeit} transition:fade|local class="next" on:click={next}>Weiter</button>
  {/if}
  {#if currentStep === 7}
    <div class="fullpage" in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }}>
      <Table {selection} />
    </div>
  {/if}
</main>

<style>
  main {
    text-align: center;
    height: 100%;
    width: 100%;
  }

  .fullpage {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  button.next {
    height: 100px;
    width: 100%;
    border-radius: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 24px;
  }

  .help-text {
    width: 500px;
    margin-bottom: 32px;
  }

  .input-wrapper {
    font-size: 25px;
    text-align: center;
  }

  .main-input {
    border-radius: 50px;
    text-align: center;
  }

  .main-input:focus {
    outline: none;
  }

  .radio-group {
    display: flex;
    justify-content: space-around;
  }
</style>