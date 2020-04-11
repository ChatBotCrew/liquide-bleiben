
const pageWidth = 8.5, // inch
    lineHeight = 1.2,
    margin = 0.5,
    maxLineWidth = pageWidth - margin * 2,
    fontSize = 24,
    ptsPerInch = 72,
    oneLineHeight = (fontSize * lineHeight) / ptsPerInch;

function foerderike_pdf(answers) {
    var text = "Hello World!";
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
//    console.log("create PDF");
}

document.getElementById('pdf').onclick = foerderike_pdf;
