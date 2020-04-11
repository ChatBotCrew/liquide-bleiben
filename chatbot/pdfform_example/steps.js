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
        },
        
        {"id": "documents_partnership",
        "fragetyp": "auswahl_multiple",
        "text": "Anbei findest du eine Liste wichtiger Unterlagen, die vor dem Stellen des Kreditantrags bei deiner Bank vorbereitet werden sollten. Welche dieser Dokumente liegen dir bereits vor?",
        "mögliche antworten": ["Aktuellster Jahresabschluss", "BWA des letzten Geschäftsjahres (inkl. abgestimmter Summen- und Saldenliste)", "BWA des aktuellen Geschäftsjahres", "Liquiditätsplanung für 2020 und 2021", "Rentabilitätsplanung für 2020 und 2021", "Letzter vorhandener Steuerbescheid und -erklärung (ESt, KSt, GewSt)", "Auflistung Privatentnahmen", "Planung Privatentnahmen", "Kurze Beschreibung der Auswirkungen der Pandemie auf ihr Unternehmen", "Kurze Situationsbeschreibung eingeleiteter Maßnahmen", "Handelsregisterauszug", "Gesellschafterliste", "Selbstauskunft der geschäftsführenden Gesellschafter (Dokument der Bank)"],
        },
];
