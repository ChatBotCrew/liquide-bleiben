
// https://stackoverflow.com/questions/9899372/pure-javascript-equivalent-of-jquerys-ready-how-to-call-a-function-when-t
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}
r(function(){
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
