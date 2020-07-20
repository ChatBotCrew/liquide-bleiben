export default abstract class QuestionRequestService {
  public static getQuestions() {
    return [
      {
        title: "Wo liegt dein Hauptfirmensitz?",
        config: {
          type: "grid-select",
          key: "state",
          options: [
            { key: "Baden-Württemberg", value: 1 },
            { key: "Bayern", value: 2 },
            { key: "Berlin", value: 3 },
            { key: "Brandenburg", value: 4 },
            { key: "Bremen", value: 5 },
            { key: "Hamburg", value: 6 },
            { key: "Hessen", value: 7 },
            { key: "Mecklenburg-Vorpommern", value: 8 },
            { key: "Niedersachsen", value: 9 },
            { key: "Nordrhein-Westfalen", value: 10 },
            { key: "Rheinland-Pfalz", value: 11 },
            { key: "Saarland", value: 12 },
            { key: "Sachsen", value: 13 },
            { key: "Sachsen-Anhalt", value: 14 },
            { key: "Schleswig-Holstein", value: 15 },
            { key: "Thüringen", value: 16 }
          ],
          validators: [
            {
              isValide: (value: any) => {
                return value !== null && value !== undefined && value !== '';
              },
              message: 'bitte das Feld füllen'
            }
          ]
        },
        description: `
          Hiermit können wir dir helfen die Programme aus deinem Bundesland für dich zu finden.
          Bitte wähle das Bundesland aus,
          in dem der Sitz deines Unternehmens ist.
        `
      },
      {
        title: "Zu welcher Branche gehört dein Unternehmen?",
        config: {
          type: "select",
          key: "trade",
          options: [
            {
              key:
                "Land- und Forstwirtschaft<br>(inkl. Aquakultur und Fischerei)",
              value: 1
            },
            { key: "Bergbau und Gewinnung von Steinen und Erden", value: 2 },
            { key: "Handel", value: 3 },
            { key: "Hotel- und Gaststättengewerbe", value: 4 },
            { key: "Handwerk", value: 5 },
            { key: "Garten- und Landschaftsbau", value: 6 },
            { key: "Künstler", value: 7 },
            { key: "Heilberufe", value: 8 },
            { key: "Sonstiges", value: 9 }
          ],
          validators: [
            {
              isValide: (value: any) => {
                return value !== null && value !== undefined && value !== '';
              },
              message: 'bitte das Feld füllen'
            }
          ]
        },
        description: `
          Für einige Branchen gibt es spezielle Förder- und Hilfsprogramme.
          Lass uns wissen in welcher Branche du tätig bist,
          damit wir dir genauere Vorschläge machen können.
        `
      },
      {
        title: "Wie alt ist dein Unternehmen?",
        config: {
          type: "input",
          key: "age",
          unit: "Jahre",
          placeholder: "XX",
          validators: [
            {
              isValide: (value: any) => {
                return value !== null && value !== undefined && value !== '';
              },
              message: 'bitte das Feld füllen'
            }
          ]
        },
        description: `
          Für junge und bereits etablierte Unternehmen gibt es oft unterschiedliche Förderprogramme.
          Lass uns wissen seit wie vielen Jahren es dein Unternehmen bereits gibt
          und wir suchen für dich die passenden Angebote.
        `
      },
      {
        title: "Wieviele Beschäftigte hat dein Unternehmen?",
        config: {
          type: "input",
          key: "employees",
          options: [],
          unit: "Mitarbeiter",
          placeholder: "XX",
          validators: [
            {
              isValide: (value: any) => {
                return value !== null && value !== undefined && value !== '';
              },
              message: 'bitte das Feld füllen'
            }
          ]
        },
        description: `
          Umrechnung von Teilzeitkräften und 450 Euro-Jobs in VZÄ für Mitarbeiter:innen:
          450 Euro-Basis=Faktor 0,3
          bis 20 Stunden=Faktor 0,5
          bis 30 Stunden=Faktor 0,75
          über 30 Stunden=Faktor 1
          Als Solo-Unternehmer:in ohne Mitarbeiter:innen, trage bitte eine "0" ein.
          Bitte das Ergebnis auf die nächsthöhere Zahl aufrunden.
        `
      },
      {
        title: "Wie groß war der Umsatz (2019)?",
        config: {
          type: "select",
          key: "sales",
          options: [
            { key: "0 - 2 Million", value: 0 },
            { key: "2 - 5 Millionen", value: 1 },
            { key: "5 - 10 Millionen", value: 2 },
            { key: "10 - 50 Millionen", value: 3 },
            { key: "50 - 500 Millionen", value: 4 },
            { key: "mehr als 500 Millionen", value: 5 }
          ],
          validators: [
            {
              isValide: (value: any) => {
                return value !== null && value !== undefined && value !== '';
              },
              message: 'bitte das Feld füllen'
            }
          ],
          transform: (value: number) => [
            (0+2)/2,(2+5)/2,(5+10)/2,(10+50)/2,(50+500)/2,600
          ][value] * 1000000
        },
        description: `
          Je nach Umsatz deines Unternehmens gibt es unterschiedliche Förderprogramme,
          lass uns den Umsatz des letzten Jahres wissen,
          damit wir die für dich passensten Programme finden können.
        `
      },
      {
        title: "Wie groß war die Bilanzsumme (2019)?",
        config: {
          type: "select",
          key: "totalAssets",
          options: [
            { key: "0 - 1 Million", value: 0 },
            { key: "1 - 2 Millionen", value: 1 },
            { key: "2 - 10 Millionen", value: 2 },
            { key: "10 - 20 Millionen", value: 3 },
            { key: "20 - 43 Millionen", value: 4 },
            { key: "mehr als 43 Millionen", value: 5 }
          ],
          validators: [
            {
              isValide: (value: any) => {
                return value !== null && value !== undefined && value !== '';
              },
              message: 'bitte das Feld füllen'
            }
          ],
          transform: (value: number) => [
            (0+1)/2,(1+2)/2,(2+10)/2,(10+20)/2,(20+43)/2,44
          ][value] * 1000000
        },
        description: `
          Sollte dein Unternehmen keine Bilanz aufstellen, wähle bitte "0 - 1".
        `
      }
    ];
  }
}