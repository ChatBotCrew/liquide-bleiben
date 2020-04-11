
const pageWidth = 8.5, // inch
    lineHeight = 1.2,
    margin = 0.5,
    maxLineWidth = pageWidth - margin * 2,
    fontSize = 24,
    ptsPerInch = 72,
    oneLineHeight = (fontSize * lineHeight) / ptsPerInch;

const abschnitt1 = "Liebe Nutzerin, lieber Nutzer,\n"
    +"\n"
    +"mithilfe deiner Angaben habe ich dir eine individuelle Übersicht erstellt, welche du zur Vorbereitung des Termins mit deiner Hausbank heranziehen kannst.\n"
    +"Ich empfehle dir die aufgeführten Unterlagen bereits vor dem Termin mit der Bank zusammenzustellen, sodass die Auszahlung der Fördermittel möglichst reibungslos erfolgen kann.\n"
    +"\n"
    +"Beachte bitte, dass diese Liste keinesfalls vollumfänglich ist. Sprich deshalb bestenfalls auch nochmal mit der für dich zuständigen Person in deiner Bank und lass dieser die angehängte Übersicht zukommen.\n"
    +"\n";

const vorliegend = "Folgende Unterlagen hast du bereits vorbereitet:\n";

const benoetigt = "Folgende Unterlagen solltest du in Vorbereitung auf den Termin mit deiner Bank noch vorbereiten:\n";
const benoetigt1 = "In deinen eigenen Unterlagen findest du:\n";
const benoetigt2 = "Dein Steuerbüro hilft dir bei:\n";
const benoetigt3a = "Dein ";
const benoetigt3b = " hilft dir bei:\n";

const disclaimer = "\n\nwir-bleiben-liqui.de bietet weder Rechts- noch Steuerberatung an.\n"
    +"Bei diesem Angebot handelt es sich lediglich um einen kostenfreien und unverbindlichen Informationszugang für alle, die aufgrund (drohender) Liquiditätsengpässe finanzielle Unterstützung benötigen.\n"
    +"Die Plattform bietet diese Unterstützung nicht selbst an, hilft aber dabei, passende Angebote von Finanzinstituten einzugrenzen.\n"
    +"Bei Fragen rechtlicher, steuerlicher oder finanzplanerischer Natur sollten Experten der jeweiligen Themenfelder oder die Finanzinstitute selbst konsultiert werden.\n";

function combine_text(answers) {
    return abschnitt1 + vorliegend + benoetigt + disclaimer;
}

function foerderike_pdf(answers) {
    var text = combine_text(answers);
    var doc = new jsPDF({
        unit: "in",
        lineHeight: lineHeight,
    });
    doc.setProperties({ title: "Förderike"});
    var textlines = doc.setFont("helvetica", "neue")
        .setFontSize(12)
        .splitTextToSize(text, maxLineWidth);
    doc.text(textlines, margin, margin+2*oneLineHeight);
    doc.save("förderike.pdf");
}

document.getElementById('pdf').onclick = foerderike_pdf;
