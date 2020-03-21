<script>
  import { fade, fly } from 'svelte/transition';
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

  const tableData = [
    {
      name: 'Akutkredit LfA',
      land: 'NRW',
      summe: 10000,
      mitarbeiter: 500,
      jahresabschluss: 0,
    },
    {
      name: 'L-Bank',
      land: 'Hessen',
      summe: 25000,
      mitarbeiter: 100,
      jahresabschluss: 2,
    },
    {
      name: 'Bayernfonds',
      land: 'Bayern',
      summe: 10000,
      mitarbeiter: 5,
      jahresabschluss: 1,
    },
  ]

  const next = () => {
    currentStep++;
    document.getElementById("step-" + currentStep).scrollIntoView("step-{currentStep}");
  }
</script>

<main>
  {#if currentStep === 0}
    <div class="fullpage">
      <div in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }}>
        <select class="main-input" bind:value={selection.land}>
          <option selected disabled>Bundesland wählen</option>
          {#each bundeslaender as land}
            <option value={land}>{land}</option>
          {/each}
        </select>
        <div class="help-text">
          Hiermit können wir Dir helfen die Programme aus deinem Bundesland für Dich zu finden. Bitte wähle das Bundesland aus in dem der Sitz Deiner Betriebsstätte ist.
        </div>
      </div>
      <button disabled={!selection.land} transition:fade|local class="next" on:click={next}>Weiter</button>
    </div>
  {/if}
  {#if currentStep === 1}
    <div class="fullpage">
      <div in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }}>
        <select class="main-input" bind:value={selection.gewerbe}>
          <option selected disabled>Gewerbe wählen</option>
          {#each gewerbe as g}
            <option value={g}>{g}</option>
          {/each}
        </select>
        <div class="help-text">
          Für einige Branchen gibt es spezielle Förder- und Hilfsprogramme, lass uns wissen in welcher Branche Du tätig bist damit wir Dir genauere Vorschläge machen können.
        </div>
      </div>
      <button disabled={!selection.gewerbe} transition:fade|local class="next" on:click={next}>Weiter</button>
    </div>
  {/if}
  {#if currentStep === 2}
    <div class="fullpage">
      <div in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }} >
        <div class="main-input">
          Mein Unternehmen ist
          <input class="main-input" bind:value={selection.alter} style="width: 100px;" placeholder="XX" type="number" max="999" />
          Jahre alt
        </div>
        <div class="help-text">
          Für junge und bereits etablierte Unternehmen gibt es oft unterschiedliche Förderprogramme, lass uns wissen seit wievielen Jahren es Dein Unternehmen bereits gibt und wir suchen für Dich die passenden Angebote.
        </div>
      </div>
      <button disabled={!selection.alter} transition:fade|local class="next" on:click={next}>Weiter</button>
    </div>
  {/if}
  {#if currentStep === 3}
    <div class="fullpage">
      <div in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }}>
        <select class="main-input" bind:value={selection.rechtsform}>
          <option selected disabled>Rechtsform wählen</option>
          {#each rechtsformen as rechtsform}
            <option value={rechtsform}>{rechtsform}</option>
          {/each}
        </select>
        <div class="help-text">
          Je nachdem welche Rechtsform Dein Unternehmen hat wirst Du für verschiedene Fördermittel unterschiedliche Unterlagen benötigen, lass uns wissen was für eine Rechtsform Dein Unternehmen hat. Solltest Du Dir nicht sicher sein welche Rechtsform Dein Unternehmen hat kannst Du davon ausgehen, dass wenn Du alleine ein Unternehmen gegründet hast Du wahrscheinlich ein Einzelunternehmer bist. Wenn Du mit mehreren Personen ein Unternehmen gegründet hast und bisher keine Reigistierung vorgenommen hast, seid ihr wahrscheinlich eine GBR.
        </div>
      </div>
      <button disabled={!selection.rechtsform} transition:fade|local class="next" on:click={next}>Weiter</button>
    </div>
  {/if}
  {#if currentStep === 4}
    <div class="fullpage">
      <div in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }} >
        <div class="main-input">
          Mein Unternehmen hatte 2019 einen <br>
          Umsatz von <input class="main-input" bind:value={selection.umsatz} style="width: 300px;" placeholder="XXXXXX" type="number" /> €
        </div>
        <div class="help-text"></div>
      </div>
      <button disabled={!selection.umsatz} transition:fade|local class="next" on:click={next}>Weiter</button>
    </div>
  {/if}
  {#if currentStep === 5}
    <div class="fullpage">
      <div in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }} >
        <div class="main-input">
          Mein Unternehmen hat <input class="main-input" bind:value={selection.mitarbeiter} style="width: 150px;" placeholder="XX" type="number" /> Mitarbeiter
        </div>
        <div class="help-text"></div>
      </div>
      <button disabled={!selection.mitarbeiter} transition:fade|local class="next" on:click={next}>Weiter</button>
    </div>
  {/if}
  {#if currentStep === 6}
    <div class="fullpage">
      <div in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }} >
        <div class="main-input">
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
    </div>
  {/if}
  {#if currentStep === 7}
    <div class="fullpage">
      {#each Object.keys(selection) as key}
        <div>
          <span>{key}</span>
          <span>{selection[key]}</span>
        </div>
      {/each}
      <table in:fly={{ x: 1000, duration: 1500 }} out:fly={{ x: -1000, duration: 1500 }}>
        <tr class="theader">
          <th>Name</th>
          <th>Land</th>
          <th>Fördersumme</th>
          <th>Mitarbeiter</th>
          <th>Jahresabschluss</th>
          <th></th>
        </tr>
        {#each tableData as row}
          {#if row.mitarbeiter < selection.mitarbeiter}
            <tr>
              <td>{row.name}</td>
              <td>{row.land}</td>
              <td>{row.summe}</td>
              <td>{row.mitarbeiter}</td>
              <td>{row.jahresabschluss}</td>
              <td><a href="#">Zur Ansicht →</a></td>
            </tr>
          {/if}
        {/each}
      </table>
    </div>
  {/if}
</main>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  main {
    text-align: center;
    height: 100%;
    width: 100%;
  }

  button {
    height: 100px;
    width: 100%;
    border-radius: 50px;
    background-color: green;
    color: white;
  }

  button:disabled {
    background-color: grey;
  }

  button.next {
    position: absolute;
    bottom: 0;
  }

  .help-text {
    width: 500px;
    margin-bottom: 32px;
  }

  .main-input {
    border-radius: 50px;
    text-align: center;
    font-size: 25px;
  }

  .main-input:focus {
    outline: none;
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

  .radio-group {
    display: flex;
    justify-content: space-around;
  }

  table {
    width: 100%;
  }

  tr {
    height: 50px;
  }

  table > tr:first-child {
    background-color: hsl(15, 100%, 90%);
  }
</style>