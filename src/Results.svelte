<script>
  import { fly } from 'svelte/transition';
  import { finanzaemter, weitereInfos } from'./data';

  import Table from './Table.svelte';

  export let selection;

  const HELP = {
    Kredit: "Bei einem Darlehen wird dem Schuldner (dem Unternehmen) ein Geldbetrag zur Verfügung gestellt. Dieses muss in einem vorher vereinbarten Zeitraum zurückgezahlt werden. Die Rückzahlungen setzen sich aus Zins und Tilgung zusammensetzen.\nFür einen Antrag brauchen Sie in den meisten Fällen die folgenden Dokumente:\nHandelsregister Auszug, Jahresabschlüsse, Liquiditätsplanung, Beschreibung der Auswirkung der Pandemie, Betriebswirtschaftliche Auswertung 2019 (inkl. Summen-und Saldenliste), Ermittlung des Kreditbedarfs, Selbstauskunft, Vorschlag für den Eigenbeitrag des Gesellschafters, junge Unternehmen Business Plan.\nWir haben für Sie einen Überblick über die wichtigsten Dokumente erstellt und auch einige Beispiele vorbereitet:",
    Zuschuss: "Ein Zuschuss ist ein finanzielles Fördermittel und soll bei der Finanzierung von Investitionen und Kosten helfen. Er muss nicht zurückgezahlt werdenund erfordert keine Gegenleistung. Entsprechend ist ein Zuschuss die beliebteste Förderung bei Unternehmen.\nBei den Zuschüssen für die Corona-Krise können Anträge können von gewerblichen Unternehmen und selbstständigen Angehörigen der Freien Berufegestellt werden. Als Voraussetzung gilt in den meisten Fällen ein bestehender Liquiditätsengpass.\nLiquiditätsengpass bedeutet, dass keine (ausreichende) Liquidität vorhanden ist, um z. B. laufende Verpflichtungen zu zahlen. Vor Inanspruchnahme der Soforthilfe ist meistens verfügbares liquides Privatvermögen einzusetzen.\nDie Anforderung an Dokumente für Zuschüsse ist deutlich geringer, jedoch auch die zu erwartenden Mittel.",
    "Bürgschaft": "Bei einer Bürgschaft, verpflichtet sich ein Bürge, z.B. der Staat, für die Verbindlichkeiten eines Dritten gegenüber dem Gläubiger einzustehen.\nFür einen Antrag brauchen Sie in den meisten Fällen die folgenden Dokumente:\nHandelsregister Auszug, Jahresabschlüsse, Liquiditätsplanung, Beschreibung der Auswirkung der Pandemie, Betriebswirtschaftliche Auswertung 2019 (inkl. Summen-und Saldenliste), Ermittlung des Kreditbedarfs, Selbstauskunft.\nWir haben für Sie einen Überblick über die wichtigsten Dokumente erstellt und auch einige Beispiele vorbereitet:",
    Steuerstundung: "Ihr Bundesland {selection.state} bietet Steuerstundungen imRahmen der Corona-Krise an. Eine Steuerstundung bezeichnet im abgabenrechtlichen Sinne eine Verschiebung der Fälligkeit eines Steueranspruchs in die Zukunft. Eine Steuerstundung ist ganz oder teilweise möglich. Stundbar sind im Rahmen der Corona-Krise Einkommensteuer, Körperschaftsteuer und Umsatzsteuer (zinslos). Einkommen- und Körperschaftsteuer Vorauszahlungen können im Rahmen der Krise herabgesetzt werden.",
    Kurzarbeit: "Das Unternehmen zahlt anteiligen Lohn basierend auf tatsächlich gearbeiteten Stunden. Der Lohn wird durch die Bundesagentur für Arbeit mit 60 % (für MA mit Kind 67 %) des ausgefallenen pauschalierten Nettoentgelts aufgestockt.\nRegel-Bezugsdauer max.12 Monate (Unterbrechung bis zu 3 Monate bei Wiederaufnahme des Geschäfts möglich)\nBeantragung über Portal der Bundesagentur für Arbeit- Antragstellung an zuständige Agentur für Arbeit- Prüfung der Daten und Entscheidung Details hier- Kurzarbeitergeld kann bereits rückwirkend ab 01.03.2020 beantragt werden\nUnternehmen trägt die bisherigen Sozialversicherungsbeiträge zu 80 % → Gesetzesänderung ist geplant\nWichtig: - Kurzarbeitergeld wird erst nach Zahlung durch Unternehmen erstattet",
    "Sozialbeiträge": "Stundung der Sozialversicherungsbeiträge kann erfolgen, wenn ein Unternehmen aufgrund der aktuellen Krise in erhebliche finanzielle Schwierigkeiten gerät.\nVoraussetzung ist eine erhebliche Härte für das Unternehmen:\n- Ernsthafte Zahlungsschwierigkeiten aufgrund ungünstiger wirtschaftlicher Verhältnisse oder wenn diese nach Einzug der Sozialversicherungsabgaben eintreten würden.\nWichtig: Nur möglich bei situativer ÜberschuldungBeantragung:\nAntrag des Unternehmens bei der zuständigen Krankenkasse, bei der das Vorliegen der Voraussetzungen zu belegen ist.",
  }

  // Remove not set selections (should not happen)
  Object.keys(selection).forEach(key => { 
    if (selection[key] === null) delete selection[key];
  });

  // Build URL with Query Params
  const dataUrl = new URL(location.origin + '/api/offers');
  const pageUrl = new URL(location.origin);
  const searchParams = new URLSearchParams(selection).toString()
  dataUrl.search = searchParams;
  pageUrl.search = searchParams;

  // Query Data which contains columns and offers
  const data$ = fetch(dataUrl, { method: 'GET' })
    .then(res => res.json());
</script>

<div class="results">
  <h1>Ihre Resultate</h1>
  <!-- {#each Object.keys(selection) as key}
    <div>
      <span>{key}</span>
      <span>{selection[key]}</span>
    </div>
  {/each} -->
  {#await data$}
    <div>Angebote werden geladen...</div>
  {:then data}
    {#if data.offers.length}
      {#each data.cluster.names as clusterName}
        <details>
          <summary>{clusterName}</summary>
          <div class="info-title">
            {HELP[clusterName]}<br>
            <a target="_blank" class="info-link" href="https://wir-bleiben-liqui.de">Weitere Informationen</a>
          </div>
          <Table columns={data.columns} offers={data.offers.filter(offer => offer[data.cluster.column] === clusterName)} />
        </details>
      {/each}
    {:else}
      <div>Leider konnten keine möglichen Förderprogramme gefunden werden.</div>
    {/if}
  {/await}
  {#if selection.state}
    <details class="additional-info-wrapper">
      <summary>Steuerstundung</summary>
      <div class="info-title">{HELP['Steuerstundung']}</div>
      <div class="info-link-wrapper">
        <a target="_blank" class="info-link" href={weitereInfos.requestForm}>Antragsformular</a>
        <a target="_blank" class="info-link" href={finanzaemter[selection.state]}>Finanzamt</a>
        <a target="_blank" class="info-link" href={weitereInfos.requestForm}>Steuerliche Maßnahmen</a>
      </div>
    </details>
  {/if}
  {#if selection.employees}
    <details class="additional-info-wrapper">
      <summary>Kurzarbeit</summary>
      <div class="info-title">{HELP["Kurzarbeit"]}</div>
      <div class="info-link-wrapper">
        <a target="_blank" class="info-link" href="https://wir-bleiben-liqui.de">Weitere Informationen</a>
      </div>
    </details>
  {/if}
  {#if selection.employees}
    <details class="additional-info-wrapper">
      <summary>Sozialbeiträge</summary>
      <div class="info-title">{HELP["Sozialbeiträge"]}</div>
      <div class="info-link-wrapper">
        <a target="_blank" class="info-link" href="https://wir-bleiben-liqui.de">Weitere Informationen</a>
      </div>
    </details>
  {/if}
  <div class="link-text" style="text-align: center;">
    Ihr persönlicher Finder-Link:<br>
    <a href={pageUrl}>{pageUrl}</a>
  </div>
</div>

<style>
  .results {
    text-align: center;
    overflow: auto;
    max-width: 100%;
    width: 100%;
    margin-bottom: 150px; 
  }

  .info-title {
    margin: 16px 0;
    font-size: 0.8em;
  }

  .info-link-wrapper {
    display: flex;
    justify-content: space-around;
  }

  .info-link {
    height: 50px;
  }

  summary {
    font-size: 36px;
    height: 50px;
    background-color: #c5ffdd;
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
      8px 8px 12px 0 #2CFFA2,
      -8px -8px 12px 0 #c5ffdd;
    width: calc(100% - 32px);
    margin: 32px auto;
  }

  .link-text {
    max-width: 100%;
    margin-bottom: 32px;
    text-align: center;
    font-size: 0.8em;
  }

  @media(max-width: 700px) {
    summary {
      font-size: 24px;
    }
  }
</style>