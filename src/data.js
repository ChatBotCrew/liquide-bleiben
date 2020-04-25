import { writable } from 'svelte/store';

export const initialSelection = writable(null);

/* Dropdowns */
export const bundeslaender = writable(null);
export const gewerbe = writable(null);
// export const rechtsformen = writable(null)

/* Result descriptions */
export const descriptions = writable(null);

/* Links */
export const finanzaemter = {
  "1": "https://finanzamt-bw.fv-bwl.de/,Lde/Startseite/Finanzaemter/Auswahl",
  "2": "https://www.finanzamt.bayern.de/",
  "3": "https://service.berlin.de/standorte/finanzaemter/",
  "4": "https://finanzamt.brandenburg.de/cms/detail.php/lbm1.c.289711.de",
  "5": "https://www.finanzen.bremen.de/steuern/finanzaemter-19710",
  "6": "https://www.hamburg.de/fb/finanzaemter/",
  "7": "https://service.hessen.de/html/8469.htm",
  "8": "https://www.steuerportal-mv.de/Finanzaemter",
  "9": "https://www.lstn.niedersachsen.de/steuer/finanzaemter/66958.html",
  "10": "https://www.finanzverwaltung.nrw.de/de/finanzamtsfinder",
  "11": "https://fm.rlp.de/de/service/behoerdenverzeichnis/finanzaemter/",
  "12": "https://www.saarland.de/finanzaemter.htm",
  "13": "https://www.finanzamt.sachsen.de/",
  "14": "https://finanzamt.sachsen-anhalt.de/finanzaemter-lsa/",
  "15": "https://www.schleswig-holstein.de/DE/Fachinhalte/F/finanzen/finanzaemter.html",
  "16": "https://finanzamt.thueringen.de/",
}

export const steuerstundungen = {
  "1": "https://finanzamt-bw.fv-bwl.de/site/pbs-bw-fa2/get/documents_E2061130658/finanzaemter/Formulare/Steuerzahlung%20Lastschrifteinzug/sonstige/CORONA%20Steuererleichterungen%20aufgrund%20der%20Auswirkungen%20des%20Coronavirus.pdf",
  "2": "https://www.finanzamt.bayern.de/Informationen/Formulare/Steuerzahlung/Steuererleichterungen_aufgrund_der_Auswirkungen_des_Coronavirus.pdf",
  "3": "https://www.berlin.de/sen/finanzen/steuern/informationen-fuer-steuerzahler-/artikel.910208.php",
  "4": "https://mdfe.brandenburg.de/media_fast/4055/Steuererleichterungen_wegen_Auswirkungen_des_Coronavirus_25-03-2020.pdf",
  "5": "https://www.finanzen.bremen.de/detail.php?gsid=bremen53.c.78075.de",
  "6": "https://www.hamburg.de/fb/formulare/",
  "7": "https://finanzen.hessen.de/sites/default/files/media/hmdf/faq_zum_thema_steuern_-_ergaenzende_antragshilfe.pdf",
  "8": "https://www.steuerportal-mv.de/static/Regierungsportal/Finanzministerium/Steuerportal/Inhalte/Formular%20Steuererleichterung%20-%20Steuerportal.pdf",
  "9": "https://www.mf.niedersachsen.de/startseite/themen/steuern/antworten-auf-haufig-gestellte-steuerliche-fragen-faqs-im-zusammenhang-mit-dem-corona-virus-186548.html",
  "10": "https://www.finanzverwaltung.nrw.de/sites/default/files/asset/document/antrag_steuererleichterungen.pdf",
  "11": "https://www.lfst-rlp.de/service/presse/aktuelles/detail/antraege-werden-bevorzugt-bearbeitet-technische-verarbeitung-wurde-beschleunigt",
  "12": "https://www.saarland.de/finanzaemter.htm",
  "13": "https://www.coronavirus.sachsen.de/download/Formular_zur_Beantragung_von_Steuererleichterungen_aufgrund_der_Auswirkungen_des_Corona-Virus.pdf",
  "14": "https://mf.sachsen-anhalt.de/fileadmin/Bibliothek/Politik_und_Verwaltung/MF/Dokumente/Steuer/CORONA/2020-03-30_Corona_-_Antrag_Steuererleichterungen_146051.pdf",
  "15": "https://www.ihk-schleswig-holstein.de/blueprint/servlet/resource/blob/4739144/fec3c7c48434b8c3975017fbe0f5a7ec/antrag-steuerstundung-data.pdf",
  "16": "https://finanzen.thueringen.de/fileadmin/user_upload/Finanzaemter/Vordrucke/Steuererleichterungen_aufgrund_der_Auswirkungen_des_Coronavirus__TH_.pdf",
}

export const weitereInfos = {
  requestForm: "https://finanzamt-bw.fv-bwl.de/site/pbs-bw-fa2/get/documents_E2061130658/finanzaemter/Formulare/Steuerzahlung%20Lastschrifteinzug/sonstige/CORONA%20Steuererleichterungen%20aufgrund%20der%20Auswirkungen%20des%20Coronavirus.pdf",
  source: "https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Themen/Schlaglichter/Corona-Schutzschild/2020-03-19-steuerliche-Massnahmen.html",
}

export const help = {
  Darlehen: {
    link: "https://wir-bleiben-liqui.de/tag/foerderkredit/"
  },
  Zuschuss: {
    link: "https://wir-bleiben-liqui.de/tag/zuschuss/",
  },
  "Bürgschaft": {
    link: "https://wir-bleiben-liqui.de/tag/buergschaft/"
  },
  Kurzarbeit: {
    link: "https://www.arbeitsagentur.de/unternehmen/finanziell/kurzarbeitergeld-bei-entgeltausfall"
  },
  "Sozialbeiträge": {
    link: "https://www.ihk-muenchen.de/de/Service/Recht-und-Steuern/Arbeitsrecht/Bestehende-Arbeitsverh%C3%A4ltnisse-K%C3%BCndigung-und-Sozialversicherung/Corona-Virus-Dienstreisen-Arbeitsausfall-Arbeitsschutz/"
  }
}


async function getDescriptions() {
  descriptions.set(
    await fetch(new URL(location.origin + '/api/descriptions'), { method: 'GET' }).then(res => res.json())
  );
}

async function getSelectValues() {
  const selects = await fetch(new URL(location.origin + '/api/selects'), { method: 'GET' })
    .then(res => res.json())
  selects.forEach(select => {
    if(select.name === 'state') bundeslaender.set(select.options);
    if(select.name === 'trade') gewerbe.set(select.options);
    // Remove legal during rework
    // if(select.name === 'legal') rechtsformen.set(select.options);
  })
  initialSelection.set(Object.assign({}, {
    state: null,
    trade: null,
    age: null,
    // Remove legal during rework
    // legal: null,
    sales: null,
    employees: null,
  }, searchToObject()));
}

function searchToObject() {
  const pairs = window.location.search.substring(1).split("&");
  const obj = {};
  for (let i in pairs) {
    if (pairs[i] === "") continue;
    const [key, value] = pairs[i].split("=").map(decodeURIComponent);
    if(key === "solo" && value === "ja") obj["employees"] = 0;
    else if((key === "state") && !parseInt(value)) {
      bundeslaender.subscribe(states => {
        const state = states.find(b => b.name.toLowerCase() === value.replace("+", " ").toLowerCase())
        if (state) obj[key] = state.id;
      });
    }
    else if((key === "trade") && !parseInt(value)) {
      gewerbe.subscribe(trades => {
        const trade = trades.find(b => b.name === value.replace("+", " "))
        if (trade) obj[key] = trade.id;
      });
    }
    // Remove legal during rework
    // else if((key === "legal") && !parseInt(value)) {
    //   rechtsformen.subscribe(legals => {
    //     const legal = legals.find(b => b.name === value.replace("+", " "));
    //     if (legal) obj[key] = legal.id;
    //   });
    // }
    else if((key === "time") && parseInt(value) === NaN) {
      const time = times.find(b => b.name === value.replace("+", " ")).id
      if (!time) continue;
      obj[key] = times.id;
    }
    else obj[key] = value;
  }
  return obj;
}

function initilizeData() {
  getSelectValues();
  getDescriptions()
}

initilizeData();