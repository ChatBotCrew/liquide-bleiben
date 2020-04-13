
// https://stackoverflow.com/questions/9899372/pure-javascript-equivalent-of-jquerys-ready-how-to-call-a-function-when-t
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}
r(function(){
    answers= {}
    startBot();
});

// https://stackoverflow.com/questions/36127648/uploading-a-json-file-and-using-it/36198572
function save(filename, data){

    if(!data) {
        alert('error : No data')
        return;
    }

    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}

// compare https://github.com/phihag/pdfform.js/blob/master/docs/demo.js
var current_buffer;

document.getElementById('export').onclick = function() {
     save("virus.json", answers);
}

function load(confirm) {
    var files = document.getElementById('selectFiles').files;
    console.log(files);
    if (files.length <= 0) {
      return false;
    }
  
    var fr = new FileReader();
  
    fr.onload = function(e) { 
      console.log(e);
      answers = JSON.parse(e.target.result);
      //var formatted = JSON.stringify(result, null, 2);
      //document.getElementById('result').value = formatted;
    }
    fr.readAsText(files.item(0));
    startBot(confirm); // restart the bot (skipping over known values)  
}

document.getElementById('import').onclick = function() {
    load(false);
}

document.getElementById('confirm').onclick = function() {
    load(true); // bearbeiten
}
