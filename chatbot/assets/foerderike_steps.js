var foerderike_steps = [
    {"id": "hallo", 
        "fragetyp": "auswahl_single",
        "text": "Hallo, ich bin Förderike. Ich möchte dir helfen, deinen Förderkredit schnellstmöglich zur Auszahlung zu bringen. Es ist sinnvoll, dass du bereits vor dem Termin mit deiner Hausbank einen Großteil der relevanten Dokumente vorbereitest. <br>Soll ich dir bei der Identifikation der wesentlichen Unterlagen für den Kreditantrag behilflich sein und dir die nächsten Schritte auf dem Weg zu deinem Förderkredit erläutern?",
        "mögliche antworten": ["Ich bin bereit.", "Ich habe kein Interesse."],
        "weiter zu": {"Ich bin bereit.": "legal", "Ich habe kein Interesse.": "exit"}},
        
        {"id": "exit",
        "fragetyp": "info",
        "text": "Solltest du doch meine Unterstützung brauchen, kannst du gerne zurück kommen.",
        "mögliche antworten": ["zurück zu wir-bleiben-liqui.de"]},
        
        {"id": "legal",
        "fragetyp": "auswahl_single",
        "text": "Ist dein Unternehmen eine Personen- oder Kapitalgesellschaft?",
        "hinweis": "Sie sind eine Kapitalgesellschaft, wenn Sie die Rechtsform einer GmbH, UG, AG oder KGaA innehaben. Andernfalls sind Sie den Personengesellschaften zuzuordnen.",
        "mögliche antworten": ["Kapitalgesellschaft", "Personengesellschaft"],
        "weiter zu": {"Kapitalgesellschaft": "documents_corporation", "Personengesellschaft": "documents_partnership"}},
        
        {"id": "documents_corporation",
        "fragetyp": "auswahl_multiple",
        "text": "Anbei findest du eine Liste wichtiger Unterlagen, die vor dem Stellen des Kreditantrags bei deiner Bank vorbereitet werden sollten. Welche dieser Dokumente liegen dir bereits vor?",
        "mögliche antworten": ["Aktuellster Jahresabschluss", "BWA des letzten Geschäftsjahres (inkl. abgestimmter Summen- und Saldenliste)", "BWA des aktuellen Geschäftsjahres", "Liquiditätsplanung für 2020 und 2021", "Rentabilitätsplanung für 2020 und 2021", "Kurze Beschreibung der Auswirkungen der Pandemie auf ihr Unternehmen", "Kurze Situationsbeschreibung eingeleiteter Maßnahmen", "Handelsregisterauszug", "Gesellschafterliste", "Selbstauskunft der geschäftsführenden Gesellschafter (Dokument der Bank)"],
        "weiter zu": ["wer_macht_was_buchhaltung"]},
        
        {"id": "documents_partnership",
        "fragetyp": "auswahl_multiple",
        "text": "Anbei findest du eine Liste wichtiger Unterlagen, die vor dem Stellen des Kreditantrags bei deiner Bank vorbereitet werden sollten. Welche dieser Dokumente liegen dir bereits vor?",
        "mögliche antworten": ["Aktuellster Jahresabschluss", "BWA des letzten Geschäftsjahres (inkl. abgestimmter Summen- und Saldenliste)", "BWA des aktuellen Geschäftsjahres", "Liquiditätsplanung für 2020 und 2021", "Rentabilitätsplanung für 2020 und 2021", "Letzter vorhandener Steuerbescheid und -erklärung (ESt, KSt, GewSt)", "Auflistung Privatentnahmen", "Planung Privatentnahmen", "Kurze Beschreibung der Auswirkungen der Pandemie auf ihr Unternehmen", "Kurze Situationsbeschreibung eingeleiteter Maßnahmen", "Handelsregisterauszug", "Gesellschafterliste", "Selbstauskunft der geschäftsführenden Gesellschafter (Dokument der Bank)"],
        "weiter zu": ["wer_macht_was_buchhaltung"]},
        
        
        {"id": "wer_macht_was_buchhaltung",
        "fragetyp": "auswahl_single",
        "text": "Wer ist in deinem Unternehmen für die laufende Buchhaltung zuständig?",
        "mögliche antworten": ["Du selbst oder eine interne Abteilung", "Dein Steuerberater", "Ein anderer Dienstleister"],
        "weiter zu": {"Du selbst oder eine interne Abteilung": "wer_macht_was_steuererklärung", "Dein Steuerberater": "wer_macht_was_steuererklärung", "Ein anderer Dienstleister": "buchhaltung_extern"}},
        
        {"id": "buchhaltung_extern",
        "fragetyp": "eingabe",
        "text": "Wie heißt dieser Dienstleister?",
        "weiter zu": ["wer_macht_was_steuererklärung"]},
        
        {"id": "wer_macht_was_steuererklärung",
        "fragetyp": "auswahl_single",
        "text": "Wer erstellt die Steuererklärung deines Unternehmens?",
        "mögliche antworten": ["Du selbst oder eine interne Abteilung", "Dein Steuerberater", "Ein anderer Dienstleister"],
        "weiter zu": {"Du selbst oder eine interne Abteilung": "wer_macht_was_jahresabschluss", "Dein Steuerberater": "wer_macht_was_jahresabschluss", "Ein anderer Dienstleister": "steuererklärung_extern"}},
        
        {"id": "steuererklärung_extern",
        "fragetyp": "eingabe",
        "text": "Wie heißt dieser Dienstleister?",
        "weiter zu": ["wer_macht_was_lohnabrechnung"]},
        
        {"id": "wer_macht_was_jahresabschluss",
        "fragetyp": "auswahl_single",
        "text": "Wer ist für die Erstellung des Jahresabschlusses deines Unternehmens verantwortlich?",
        "mögliche antworten": ["Du selbst oder eine interne Abteilung", "Dein Steuerberater", "Ein anderer Dienstleister"],
        "weiter zu": {"Du selbst oder eine interne Abteilung": "wer_macht_was_lohnabrechnung", "Dein Steuerberater": "wer_macht_was_lohnabrechnung", "Ein anderer Dienstleister": "jahresabschluss_extern"}},
        
        {"id": "jahresabschluss_extern",
        "fragetyp": "eingabe",
        "text": "Wie heißt dieser Dienstleister?",
        "weiter zu": ["wer_macht_was_lohnabrechnung"]},
        
        {"id": "wer_macht_was_lohnabrechnung",
        "fragetyp": "auswahl_single",
        "text": "Welche Instanz ist für die Lohnbuchhaltung zuständig?",
        "mögliche antworten": ["Du selbst oder eine interne Abteilung", "Dein Steuerberater", "Ein anderer Dienstleister"],
        "weiter zu": {"Du selbst oder eine interne Abteilung": "measures", "Dein Steuerberater": "measures", "Ein anderer Dienstleister": "lohnabrechnung_extern"}},
        
        {"id": "lohnabrechnung_extern",
        "fragetyp": "eingabe",
        "text": "Wie heißt dieser Dienstleister?",
        "weiter zu": ["measures"]},
        
        {"id": "measures",
        "fragetyp": "auswahl_multi",
        "text": "Manchmal ist es sinnvoll, zunächst andere Fördermittel vorzuziehen. Außerdem setzen einige Kreditinstitute für die Kreditvergabe zunächst die Inanspruchnahme anderer Fördermittel voraus. Welche der folgenden Leistungen hast du bereits beantragt?",
        "mögliche Antworten": [ { "Wenn": { "legal": "Personengesellschaft" }, "Wert": ["Beantragung von Kurzarbeitergeld", "Stundung der Sozialversicherungsbeiträge", "Stundung der fälligen Steuerlast (ESt, KSt, USt)", "Herabsetzung von Steuer-Vorauszahlungen (ESt, KSt)", "Beantragung Steuererstattung 1/11", "Beantragung Corona Soforthilfe-Zuschuss", "Gespräch mit Vermieter bzgl. Mietstundung", "Verhandlung der Zahlungsbedingungen mit Lieferanten", "Stundung der KV-Beiträge der Gesellschafter beantragt"] }, { "Wenn": {"legal": "Kapitalgesellschaft"}, "Wert": ["Beantragung von Kurzarbeitergeld", "Stundung der Sozialversicherungsbeiträge", "Stundung der fälligen Steuerlast (ESt, KSt, USt)", "Herabsetzung von Steuer-Vorauszahlungen (ESt, KSt)", "Beantragung Steuererstattung 1/11", "Beantragung Corona Soforthilfe-Zuschuss", "Gespräch mit Vermieter bzgl. Mietstundung", "Verhandlung der Zahlungsbedingungen mit Lieferanten"] } ] }
];
