// compare https://github.com/phihag/pdfform.js/blob/master/docs/demo.js

/** fill the PDF form with the elements of answers (key,value) */
function fill_form() {
    sourcePDF = "/pdfform_example/Testform.pdf";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', sourcePDF, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function() {
        if (this.status == 200) {
            var current_buffer= this.response;
            var fields = {};
            for (var key in answers) {
                fields[key]=[];
                fields[key][0] = answers[key];
            }
            var filled_pdf; // Uint8Array
            try {
                filled_pdf = pdfform().transform(current_buffer, fields);
            } catch (e) {
                return on_error(e);
            }

            var blob = new Blob([filled_pdf], {type: 'application/pdf'});
            saveAs(blob, 'generated.pdf');
        } else {
            on_error('failed to load URL (code: ' + this.status + ')');
        }
    };

    xhr.send();
}

/** handle clicks on the pdf button */
document.getElementById('pdf').onclick = fill_form;

/** called when the last question was answered by the chat bot */
function foerderike_pdf(answers) {
    fill_form();
}

/** set some elements to default values for quick pdf creation test */
document.getElementById('default').onclick = function() {
    answers["hallo"]="Ich bin bereit.";
    answers["legal"]="Kapitalgesellschaft";
    answers["documents_corporation"]="Aktuellster Jahresabschluss";
}
