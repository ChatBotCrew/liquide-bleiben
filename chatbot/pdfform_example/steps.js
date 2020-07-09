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
        "hint": "Du bist eine Kapitalgesellschaft, wenn du die Rechtsform einer GmbH, UG, AG oder KGaA innehaben. Andernfalls bist du den Personengesellschaften zuzuordnen.",
        "answers": ["Kapitalgesellschaft", "Personengesellschaft"],
        "next_step": {"Kapitalgesellschaft": "documents_corporation", "Personengesellschaft": "documents_partnership"}},
        
        {"id": "documents_corporation",
        "ui_type": "selection_multiple",
        "text": "Anbei findest du eine Liste wichtiger Unterlagen, die vor dem Stellen des Kreditantrags bei deiner Bank vorbereitet werden sollten. Welche dieser Dokumente liegen dir bereits vor?",
        "answers": ["Aktuellster Jahresabschluss", "BWA des letzten Geschäftsjahres (inkl. abgestimmter Summen- und Saldenliste)", "BWA des aktuellen Geschäftsjahres", "Liquiditätsplanung für 2020 und 2021", "Rentabilitätsplanung für 2020 und 2021", "Kurze Beschreibung der Auswirkungen der Pandemie auf ihr Unternehmen", "Kurze Situationsbeschreibung eingeleiteter Maßnahmen", "Handelsregisterauszug", "Gesellschafterliste", "Selbstauskunft der geschäftsführenden Gesellschafter (Dokument der Bank)"],
        },
        
        {"id": "documents_partnership",
        "ui_type": "selection_multiple",
        "text": "Anbei findest du eine Liste wichtiger Unterlagen, die vor dem Stellen des Kreditantrags bei deiner Bank vorbereitet werden sollten. Welche dieser Dokumente liegen dir bereits vor?",
        "answers": ["Aktuellster Jahresabschluss", "BWA des letzten Geschäftsjahres (inkl. abgestimmter Summen- und Saldenliste)", "BWA des aktuellen Geschäftsjahres", "Liquiditätsplanung für 2020 und 2021", "Rentabilitätsplanung für 2020 und 2021", "Letzter vorhandener Steuerbescheid und -erklärung (ESt, KSt, GewSt)", "Auflistung Privatentnahmen", "Planung Privatentnahmen", "Kurze Beschreibung der Auswirkungen der Pandemie auf ihr Unternehmen", "Kurze Situationsbeschreibung eingeleiteter Maßnahmen", "Handelsregisterauszug", "Gesellschafterliste", "Selbstauskunft der geschäftsführenden Gesellschafter (Dokument der Bank)"],
        },
];
