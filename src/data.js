export const bundeslaender = [
  { id: 1, name: "Baden-Württemberg" },
  { id: 2, name: "Bayern" },
  { id: 3, name: "Berlin" },
  { id: 4, name: "Brandenburg" },
  { id: 5, name: "Bremen" },
  { id: 6, name: "Hamburg" },
  { id: 7, name: "Hessen" },
  { id: 8, name: "Mecklenburg-Vorpommern" },
  { id: 9, name: "Niedersachsen" },
  { id: 10, name: "Nordrhein-Westfalen" },
  { id: 11, name: "Rheinland-Pfalz" },
  { id: 12, name: "Saarland" },
  { id: 13, name: "Sachsen-Anhalt" },
  { id: 14, name: "Sachsen" },
  { id: 15, name: "Schleswig-Holstein" },
  { id: 16, name: "Thüringen" },
]

export const gewerbe = [
  { id: 1, name: "Land- und Forstwirtschaft, Fischerei und Fischzucht" },
  { id: 2, name: "Bergbau und Gewinnung von Steinen und Erden" },
  { id: 3, name: "Verarbeitendes Gewerbe" },
  { id: 4, name: "Energie- und Wasserversorgung" },
  { id: 5, name: "Handel" },
  { id: 6, name: "Baugewerbe" },
  { id: 7, name: "Dienstleistung" },
  { id: 8, name: "Gesundheit / Pflege / Soziales" },
  { id: 9, name: "Gastronomie / Hotel" },
  { id: 10, name: "Sonstige" }
]

export const rechtsformen = [
  { id: 1, name: "GmbH" },
  { id: 2, name: "UG" },
  { id: 3, name: "AG" },
  { id: 4, name: "GBR" },
  { id: 5, name: "E.K." },
  { id: 6, name: "GmbH & Co. KG" },
  { id: 7, name: "OHG" },
  { id: 8, name: "Einzelunternehmer" }
]

export const times = [
  { id: 0, name: "6 Monate" },
  { id: 1, name: "30 Tage" },
]

export const finanzaemter = {
  "Bremen": "https://www.finanzen.bremen.de/steuern/finanzaemter-19710",
  "Berlin": "https://service.berlin.de/standorte/finanzaemter/",
  "Nordrhein-Westfalen": "https://www.finanzverwaltung.nrw.de/de/finanzamtsfinder",
  "Mecklenburg-Vorpommern": "https://www.steuerportal-mv.de/Finanzaemter",
  "Saarland": "https://www.saarland.de/finanzaemter.htm",
  "Sachsen": "https://www.finanzamt.sachsen.de/",
  "Sachsen-Anhalt": "https://finanzamt.sachsen-anhalt.de/finanzaemter-lsa/",
  "Hamburg": "https://www.hamburg.de/fb/finanzaemter/",
  "Schleswig-Holstein": "https://www.schleswig-holstein.de/DE/Fachinhalte/F/finanzen/finanzaemter.html",
  "Niedersachsen": "https://www.lstn.niedersachsen.de/steuer/finanzaemter/66958.html",
  "Hessen": "https://service.hessen.de/html/8469.htm",
  "Rheinland-Pfalz": "https://fm.rlp.de/de/service/behoerdenverzeichnis/finanzaemter/",
  "Bayern": "https://www.finanzamt.bayern.de/",
  "Thüringen": "https://finanzamt.thueringen.de/",
  "Brandenburg": "https://finanzamt.brandenburg.de/cms/detail.php/lbm1.c.289711.de",
  "Baden-Württemberg": "https://finanzamt-bw.fv-bwl.de/,Lde/Startseite/Finanzaemter/Auswahl",
}

export const weitereInfos = {
  requestForm: "https://finanzamt-bw.fv-bwl.de/site/pbs-bw-fa2/get/documents_E2061130658/finanzaemter/Formulare/Steuerzahlung%20Lastschrifteinzug/sonstige/CORONA%20Steuererleichterungen%20aufgrund%20der%20Auswirkungen%20des%20Coronavirus.pdf",
  source: "https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Themen/Schlaglichter/Corona-Schutzschild/2020-03-19-steuerliche-Massnahmen.html",
}

export const help = {
  Darlehen: {
    text: "<p>Bei einem Darlehen wird dem Unternehmen ein Geldbetrag zur Verfügung gestellt. Das Unternehmen verpflichtet sich, das Darlehen über die Laufzeit hinweg zurückzubezahlen. Die Rückzahlungsraten setzen sich aus Zins und Tilgung zusammen.</p><p>Für einen Antrag benötigen Sie in den meisten Fällen folgende Dokumente:</p><ul><li>Handelsregister Auszug</li><li>Jahresabschlüsse</li><li>Liquiditätsplanung</li><li>Beschreibung der Auswirkung der Pandemie auf Ihr Unternehmen</li><li>Betriebswirtschaftliche Auswertung 2019 (inkl. Summen-und Saldenliste)</li><li>Selbstauskunft</li><li>Vorschlag für den Eigenbeitrag des Gesellschafters</li><li>Junge Unternehmen (<5 Jahre) Business Plan</li></ul>",
    link: "https://wir-bleiben-liqui.de/tag/foerderkredit/"
  },
  Zuschuss: {
    text: "<p>Ein Zuschuss soll Unternehmen in der Corona-Krise bei der Deckung ihrer laufenden Kosten unterstützen. Er muss nicht zurückgezahlt werden und erfordert keine Gegenleistung. Entsprechend ist ein Zuschuss eine beliebte Förderung bei Unternehmen</p><p>Zuschüsse für die Corona-Krise können von gewerblichen Unternehmen, Selbstständigen und Angehörigen der Freien Berufe beantragt werden. Als Voraussetzung gilt in den meisten Fällen ein bestehender Liquiditätsengpass.</p><p>Liquiditätsengpass bedeutet, dass keine (ausreichende) Liquidität vorhanden ist, um z. B.laufende Kosten zu zahlen. Bevor ein Zuschuss beantragt wird, ist zu prüfen, ob verfügbares Privatvermögen einzusetzen ist.</p><p>Die Anforderung an Dokumente für Zuschüsse ist deutlich geringer, jedoch auch die zu erwartenden Mittel.</p>",
    link: "https://wir-bleiben-liqui.de/tag/zuschuss/",
  },
  "Bürgschaft": {
    text: "<p>Bei einer Bürgschaft, verpflichtet sich ein Bürge, z.B. der Staat, für die Verbindlichkeiten des Unternehmens gegenüber dessen Gläubiger einzustehen.</p><p>Für einen Antrag brauchen Sie in den meisten Fällen die folgenden Dokumente:</p><ul><li>Handelsregister Auszug</li><li>Jahresabschlüsse</li><li>Liquiditätsplanung</li><li>Beschreibung der Auswirkung der Pandemie</li><li>Betriebswirtschaftliche Auswertung 2019 (inkl. Summen-und Saldenliste)</li><li>Ermittlung des Kreditbedarfs</li><li>Selbstauskunft.</li></ul>",
    link: "https://wir-bleiben-liqui.de/tag/buergschaft/"
  },
  Steuerstundung: {
    text: (state) => "<p>Ihr Bundesland " + state + " bietet Steuerstundungen im Rahmen der Corona-Krise an. Eine Steuerstundung bezeichnet im abgabenrechtlichen Sinne eine Verschiebung der Fälligkeit eines Steueranspruchs in die Zukunft. Eine Steuerstundung ist ganz oder teilweise möglich. Stundbar sind im Rahmen der Corona-Krise Einkommensteuer, Körperschaftsteuer und Umsatzsteuer (zinslos). Einkommen- und Körperschaftsteuer Vorauszahlungen können im Rahmen der Krise herabgesetzt werden.</p>",
  },
  Kurzarbeit: {
    text: "<p>Das Unternehmen zahlt anteiligen Lohn basierend auf tatsächlich gearbeiteten Stunden. Der Lohn wird durch die Bundesagentur für Arbeit mit 60 % (für MA mit Kind 67 %) des ausgefallenen pauschalierten Nettoentgelts aufgestockt.</p><p>Die Regel-Bezugsdauer beträgt maximal 12 Monate. Eine Unterbrechung von bis zu 3 Monaten bei Wiederaufnahme des Geschäfts ist möglich.</p><p>Kurzarbeitergeld kann über das Portal der Bundesagentur für Arbeit beantragt werden:</p><ul><li>Antragstellung an die zuständige Agentur für Arbeit</li><li>Prüfung der Daten und Entscheidung</li><li>Kurzarbeitergeld kann bereits rückwirkend ab 01.03.2020 beantragt werden</li></ul><p>Das Unternehmen trägt die bisherigen Sozialversicherungsbeiträge zu 80 %. Dazu ist allerdings eine Gesetzesänderung geplant</p><p>Wichtig: Das Kurzarbeitergeld wird erst nach Zahlung des Lohns/Gehalts durch das Unternehmen erstattet.</p>",
    link: "https://www.arbeitsagentur.de/unternehmen/finanziell/kurzarbeitergeld-bei-entgeltausfall"
  },
  "Sozialbeiträge": {
    text: "<p>Eine Stundung der Sozialversicherungsbeiträge kann erfolgen, wenn ein Unternehmen aufgrundder aktuellen Krise in erhebliche finanzielle Schwierigkeiten gerät.</p><p>Voraussetzung ist eine erhebliche Härte für das Unternehmen:</p><ul><li>Ernsthafte Zahlungsschwierigkeiten aufgrund ungünstiger wirtschaftlicher Verhältnisse, oder</li><li>wenn diese nach Einzug der Sozialversicherungsabgaben eintreten würden.</li></ul><p>Wichtig: Eine Stundung der Sozialbeiträge ist nur bei situativer Überschuldung möglich</p><p>Beantragung: Das Unternehmen muss den Antrag bei der zuständigen Krankenkasse stellen, bei der das Vorliegen der Voraussetzungen zu belegen ist.</p>",
    link: "https://www.ihk-muenchen.de/de/Service/Recht-und-Steuern/Arbeitsrecht/Bestehende-Arbeitsverh%C3%A4ltnisse-K%C3%BCndigung-und-Sozialversicherung/Corona-Virus-Dienstreisen-Arbeitsausfall-Arbeitsschutz/"
  }
}