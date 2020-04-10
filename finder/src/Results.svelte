<script>
  import { fly } from 'svelte/transition';

  import ga from './ga.js';
  import { cookiesAllowed } from './store.js';
  import {send, receive} from './animations/crossfade.js';
  import { bundeslaender, help, finanzaemter, steuerstundungen, weitereInfos } from'./data';
  import Table from './Table.svelte';

  export let selection;

  // Remove not set selections (may happen when coming from a link)
  Object.keys(selection).forEach(key => {
    if (selection[key] === null) delete selection[key];
  });

  // Build URL with Query Params
  const dataUrl = new URL(location.origin + '/api/offers');
  const pageUrl = new URL(location.origin);
  const searchParams = new URLSearchParams(Object.assign({}, selection, { lok: $cookiesAllowed })).toString()
  dataUrl.search = searchParams;
  pageUrl.search = searchParams;

  // Query Data which contains columns and offers
  const data$ = fetch(dataUrl, { method: 'GET' })
    .then(res => {
      ga.sendGAEvent('nav', 'load', 'results')
      return res.json()
    });

</script>

<div class="results">
  <a out:send="{{ duration: 1000, key: 'logo' }}" in:receive="{{ duration: 1000, key: 'logo' }}" href="https://wir-bleiben-liqui.de">
    <img class="logo" src="/logo.png" alt="Wir bleiben liquide">
  </a>
  <h1>Ihre Resultate</h1>
  {#if selection.state}
    {#await data$}
      <div>Angebote werden geladen...</div>
    {:then data}
        {#each data as cluster}
          {#if !(cluster.name === "Zuschuss" && selection.time == "6 Monate")}
            {#if cluster.offers.length}
              <details>
                <summary>{cluster.name}</summary>
                  <Table offers={cluster.offers} />
                {#if help[cluster.name]}
                  <div class="info-title">
                    {@html help[cluster.name].text}<br>
                  </div>
                  <div class="info-link-wrapper">
                    <span>Sie wollen mehr wissen?</span>
                    <a target="_blank" class="info-link button" href={help[cluster.name] ? help[cluster.name].link : "https://wir-bleiben-liqui.de"}>
                      Direkt zu unserem Blog
                    </a>
                  </div>
                {/if}
              </details>
            {/if}
          {/if}
        {/each}
    {/await}
  {:else}
    <div>Geben Sie mindestens Ihr Bundesland an, um spezifische Förderprogramme zu erhalten.</div>
  {/if}
  <details class="additional-info-wrapper">
    <summary>Steuerstundung</summary>
    <div class="info-title">
      <p>
        Ihr Bundesland <b>{$bundeslaender.find(land => land.id == selection.state).name || ''}</b> bietet Steuerstundungen bis zum 31.12.2020 im Rahmen der Corona-Krisean.
        Eine Steuerstundung bezeichnet im abgabenrechtlichen Sinne eine Verschiebung der Fälligkeit eines Steueranspruchs in die Zukunft.
        Die Steuerschuld besteht also weiterhin fort.
      </p>
      <p>
        Eine Steuerstundung aufgrund der Corona-Krise ist ganz oder teilweise möglich.
        <i>Stundbar</i> sind fällige oder bis zum 31.12.2020 fällig werdende <i>Einkommensteuer</i>, <i>Körperschaftsteuer</i> und <i>Umsatzsteuer</i>.
        Bei Stundungen, die auf die Corona-Krise zurückzuführen sind, werden keine Stundungszinsen festgesetzt.
      </p>
      <p>
        Außerdem können Einkommen- und Körperschaftsteuer-Vorauszahlungen sowie der Gewerbesteuer-Messbetrag im Rahmen der Krise herabgesetzt werden.
        Die Bundesländer stellen hierfür geeignete Formulare bereit.
        Diese sind unten verlinkt.
      </p>
      <p>
        Zusätzlich kann auf Antrag Grunderwerbsteuer für vom 1. Januar bis 30. April 2020 verwirklichte Erwerbsvorgänge und für Vorgänge,
        für die die Steuer in diesem Zeitraum entsteht, bis längstens 31. Dezember 2020, zinslos gestundet werden.
        Auch kann auf Antrag eine Fristverlängerung für die Abgabe der Lohnsteueranmeldungen, die 10. April 2020 einzureichen sind (März 2020 oder I. Quartal 2020) um bis zu zwei Monate gewährt werden.
        (Hierfür stehen bislang noch keine Formulare bereit, sodass der Antrag schriftlich zu stellen ist.)
      </p>
      <p>
        Auch können Anträge auf Stundung von Gewerbesteuer und Grundsteuer gestellt werden.
        Diese sind bei der zuständigen Gemeinde zu beantragen.
        Diese sind nicht an die Weisungen des Bundesfinanzministeriums bzw. der Landesfinanzbehörden gebunden, d.h. eine Stundung liegt im Ermessen der jeweiligen Gemeinde.
      </p>
      <p>
        <b>Hinweis I:</b> Wenn Sie sowohl einen Stundungsantrag als auch einen Herabsetzungsantrag stellen möchten, bitten die Finanzämter um Einreichung des Antrags in zweifacher Ausfertigung,
        da diese Anträge zwar in den meisten Bundesländern über ein und dasselbe Formular eingereicht werden, i.d.R. aber in unterschiedliche Zuständigkeitsbereiche fallen.<br>
        <b>Hinweis II:</b> Anträge auf Stundung der Gewerbesteuer sind bei der zuständigen Gemeinde zu stellen.
      </p>
      <p>
        Anträge auf Steuerstundungen und/oder auf Anpassungen von Vorauszahlungen, die nach dem 31.12.2020 eingehen oder nur Zeiträume nach dem 31.12.2020 betreffen, sind besonders zu begründen.
      </p>
      <p>

        Antragsformular zur Stundung der Einkommensteuer, Körperschaftsteuer und Umsatzsteuer sowie zur Herabsetzung der Vorauszahlungen zur Einkommen- und Körperschaftsteuer und des Gewerbesteuer-Messbetrages:
      </p>
    </div>
    <div class="info-link-wrapper">
      {#if selection.state}
        <a target="_blank" class="info-link" href={steuerstundungen[selection.state]}>Antragsformular</a>
        <a target="_blank" class="info-link" href={finanzaemter[selection.state]}>Finanzamt</a>
      {/if}
      <a target="_blank" class="info-link" href={weitereInfos.source}>Steuerliche Maßnahmen</a>
    </div>
  </details>
  {#if selection.employees != 0}
    <details class="additional-info-wrapper">
      <summary>Kurzarbeit</summary>
      <div class="info-title">{@html help["Kurzarbeit"].text}</div>
      <div class="info-link-wrapper">
        <span>Sie wollen mehr wissen?</span>
        <a target="_blank" class="info-link button" href={help["Kurzarbeit"].link}>Weitere Informationen</a>
      </div>
    </details>
  {/if}
  {#if selection.employees != 0}
    <details class="additional-info-wrapper">
      <summary>Sozialbeiträge</summary>
      <div class="info-title">{@html help["Sozialbeiträge"].text}</div>
      <div class="info-link-wrapper">
        <span0>Sie wollen mehr wissen?</span0>
        <a target="_blank" class="info-link button" href={help["Sozialbeiträge"].link}>Weitere Informationen</a>
      </div>
    </details>
  {/if}
  <div class="link-text" style="text-align: center;">
    <p>
      Speichern Sie den Link zu Ihrem persönlichen Ergebnis:<br>
      <a href={pageUrl} style="word-break: break-all;">{pageUrl}</a><br>
    </p>
    <span>Powered by <a target="_blank" href="taxy.io">taxy.io</a> und <a target="_blank" href="wir-bleiben-liqui.de">wir-bleiben-liqui.de</a></span>
  </div>
</div>

<style>
  .logo {
    margin-bottom: 24px;
    max-width: 300px;
  }

  .results {
    text-align: center;
    overflow: auto;
    max-width: 100%;
    width: 100%;
    max-height: 100vh;
  }

  .info-title {
    margin: 16px auto;
    padding: 0 8px;
    font-size: 0.8rem;
    line-height: 1.5;
    max-width: 880px;
    text-align: justify;
  }

  .info-link-wrapper {
    margin: 0 8px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .info-link {
    height: 50px;
    flex: 1;
    border-radius: 50px;
    margin: 16px;
    padding: 8px;
    line-height: 50px;
    max-width: 500px;
    width: 100%;
    white-space: nowrap;
  }

  li {
    text-align: left;
  }

  summary {
    font-size: 1.5rem;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .additional-info-wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  details {
    overflow: auto;
    box-shadow:
      8px 8px 12px 0 #00A992,
      -8px -8px 12px 0 #e9f4f4;
    border: 1px solid #00A992;
    width: calc(100% - 32px);
    margin: 32px auto;
  }

  .link-text {
    max-width: 100%;
    margin: 0 8px 32px 8px;
    text-align: center;
    font-size: 0.8rem;
    margin-bottom: 83px;
  }
</style>
