var foerderike_steps = [
    {"id": "hallo", 
        "ui_type": "selection_single",
        "text": "Hallo, ich bin Förderike. Ich möchte dir helfen, deinen Förderkredit schnellstmöglich zur Auszahlung zu bringen. Es ist sinnvoll, dass du bereits vor dem Termin mit deiner Hausbank einen Großteil der relevanten Dokumente vorbereitest. <br>Soll ich dir bei der Identifikation der wesentlichen Unterlagen für den Kreditantrag behilflich sein und dir die nächsten Schritte auf dem Weg zu deinem Förderkredit erläutern?",
        "answers": ["Ich bin bereit.", "Ich habe kein Interesse."],
        "next_step": {"Ich bin bereit.": "legal", "Ich habe kein Interesse.": "exit"}},
        
        {"id": "exit",
        "ui_type": "info",
        "text": "Solltest du doch meine Unterstützung brauchen, kannst du gerne zurück kommen.",
        "answers": ["zurück zu wir-bleiben-liqui.de"]},
        
        {"id": "legal",
        "ui_type": "selection_single",
        "text": "Ist dein Unternehmen eine Personen- oder Kapitalgesellschaft?",
        "hint": "Sie sind eine Kapitalgesellschaft, wenn Sie die Rechtsform einer GmbH, UG, AG oder KGaA innehaben. Andernfalls sind Sie den Personengesellschaften zuzuordnen.",
        "answers": ["Kapitalgesellschaft", "Personengesellschaft"],
        "next_step": {"Kapitalgesellschaft": "documents_corporation", "Personengesellschaft": "documents_partnership"}},
        
        {"id": "documents_corporation",
        "ui_type": "selection_multiple",
        "text": "Anbei findest du eine Liste wichtiger Unterlagen, die vor dem Stellen des Kreditantrags bei deiner Bank vorbereitet werden sollten. Welche dieser Dokumente liegen dir bereits vor?",
        "answers": ["Aktuellster Jahresabschluss", "BWA des letzten Geschäftsjahres (inkl. abgestimmter Summen- und Saldenliste)", "BWA des aktuellen Geschäftsjahres", "Liquiditätsplanung für 2020 und 2021", "Rentabilitätsplanung für 2020 und 2021", "Kurze Beschreibung der Auswirkungen der Pandemie auf ihr Unternehmen", "Kurze Situationsbeschreibung eingeleiteter Maßnahmen", "Handelsregisterauszug", "Gesellschafterliste", "Selbstauskunft der geschäftsführenden Gesellschafter (Dokument der Bank)"],
        "next_step": ["wer_macht_was_buchhaltung"]},
        
        {"id": "documents_partnership",
        "ui_type": "selection_multiple",
        "text": "Anbei findest du eine Liste wichtiger Unterlagen, die vor dem Stellen des Kreditantrags bei deiner Bank vorbereitet werden sollten. Welche dieser Dokumente liegen dir bereits vor?",
        "answers": ["Aktuellster Jahresabschluss", "BWA des letzten Geschäftsjahres (inkl. abgestimmter Summen- und Saldenliste)", "BWA des aktuellen Geschäftsjahres", "Liquiditätsplanung für 2020 und 2021", "Rentabilitätsplanung für 2020 und 2021", "Letzter vorhandener Steuerbescheid und -erklärung (ESt, KSt, GewSt)", "Auflistung Privatentnahmen", "Planung Privatentnahmen", "Kurze Beschreibung der Auswirkungen der Pandemie auf ihr Unternehmen", "Kurze Situationsbeschreibung eingeleiteter Maßnahmen", "Handelsregisterauszug", "Gesellschafterliste", "Selbstauskunft der geschäftsführenden Gesellschafter (Dokument der Bank)"],
        "next_step": ["wer_macht_was_buchhaltung"]},

        
        {"id": "wer_macht_was_buchhaltung",
        "ui_type": "selection_single",
        "text": "Wer ist in deinem Unternehmen für die laufende Buchhaltung zuständig?",
        "answers": ["Du selbst oder eine interne Abteilung", "Dein Steuerberater", "Ein anderer Dienstleister"],
        "next_step": {"Du selbst oder eine interne Abteilung": "wer_macht_was_steuererklärung", "Dein Steuerberater": "wer_macht_was_steuererklärung", "Ein anderer Dienstleister": "buchhaltung_extern"}},
        
        {"id": "buchhaltung_extern",
        "ui_type": "input",
        "text": "Wie heißt dieser Dienstleister?",
        "next_step": ["wer_macht_was_steuererklärung"]},
        
        {"id": "wer_macht_was_steuererklärung",
        "ui_type": "selection_single",
        "text": "Wer erstellt die Steuererklärung deines Unternehmens?",
        "answers": ["Du selbst oder eine interne Abteilung", "Dein Steuerberater", "Ein anderer Dienstleister"],
        "next_step": {"Du selbst oder eine interne Abteilung": "wer_macht_was_jahresabschluss", "Dein Steuerberater": "wer_macht_was_jahresabschluss", "Ein anderer Dienstleister": "steuererklärung_extern"}},
        
        {"id": "steuererklärung_extern",
        "ui_type": "input",
        "text": "Wie heißt dieser Dienstleister?",
        "next_step": ["wer_macht_was_lohnabrechnung"]},
        
        {"id": "wer_macht_was_jahresabschluss",
        "ui_type": "selection_single",
        "text": "Wer ist für die Erstellung des Jahresabschlusses deines Unternehmens verantwortlich?",
        "answers": ["Du selbst oder eine interne Abteilung", "Dein Steuerberater", "Ein anderer Dienstleister"],
        "next_step": {"Du selbst oder eine interne Abteilung": "wer_macht_was_lohnabrechnung", "Dein Steuerberater": "wer_macht_was_lohnabrechnung", "Ein anderer Dienstleister": "jahresabschluss_extern"}},
        
        {"id": "jahresabschluss_extern",
        "ui_type": "input",
        "text": "Wie heißt dieser Dienstleister?",
        "next_step": ["wer_macht_was_lohnabrechnung"]},
        
        {"id": "wer_macht_was_lohnabrechnung",
        "ui_type": "selection_single",
        "text": "Welche Instanz ist für die Lohnbuchhaltung zuständig?",
        "answers": ["Du selbst oder eine interne Abteilung", "Dein Steuerberater", "Ein anderer Dienstleister"],
        "next_step": {"Du selbst oder eine interne Abteilung": "measures", "Dein Steuerberater": "measures", "Ein anderer Dienstleister": "lohnabrechnung_extern"}},
        
        {"id": "lohnabrechnung_extern",
        "ui_type": "input",
        "text": "Wie heißt dieser Dienstleister?",
        "next_step": ["measures"]},
        
        {"id": "measures",
        "ui_type": "selection_multiple",
        "text": "Manchmal ist es sinnvoll, zunächst andere Fördermittel vorzuziehen. Außerdem setzen einige Kreditinstitute für die Kreditvergabe zunächst die Inanspruchnahme anderer Fördermittel voraus. Welche der folgenden Leistungen hast du bereits beantragt?",
        "answers": [ { "if": { "legal": "Personengesellschaft" }, "values": ["Beantragung von Kurzarbeitergeld", "Stundung der Sozialversicherungsbeiträge", "Stundung der fälligen Steuerlast (ESt, KSt, USt)", "Herabsetzung von Steuer-Vorauszahlungen (ESt, KSt)", "Beantragung Steuererstattung 1/11", "Beantragung Corona Soforthilfe-Zuschuss", "Gespräch mit Vermieter bzgl. Mietstundung", "Verhandlung der Zahlungsbedingungen mit Lieferanten", "Stundung der KV-Beiträge der Gesellschafter beantragt"] }, 
            { "if": {"legal": "Kapitalgesellschaft"}, "values": ["Beantragung von Kurzarbeitergeld", "Stundung der Sozialversicherungsbeiträge", "Stundung der fälligen Steuerlast (ESt, KSt, USt)", "Herabsetzung von Steuer-Vorauszahlungen (ESt, KSt)", "Beantragung Steuererstattung 1/11", "Beantragung Corona Soforthilfe-Zuschuss", "Gespräch mit Vermieter bzgl. Mietstundung", "Verhandlung der Zahlungsbedingungen mit Lieferanten"] } ] }
];
