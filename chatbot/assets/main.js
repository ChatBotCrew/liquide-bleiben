// call this function at program start to initialize and start the chat
// https://stackoverflow.com/questions/9899372/pure-javascript-equivalent-of-jquerys-ready-how-to-call-a-function-when-t
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}
r(function(){
    initBot();
    startBot();
});

// https://stackoverflow.com/questions/36127648/uploading-a-json-file-and-using-it/36198572
/** download object as json
 * @param {string} filename - default filename
 * @param {Object.<string,string>} data - data dictionary
 */
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

// call save function on when export button is clicked
document.getElementById('export').onclick = function() {
    save("virus.json", answers);
}

//var current_buffer;

/** upload answers as json and restart the chat bot
 * @param {boolean} confirm - whether to confirm known results in the chat bot
 */
function load(confirm) {
    var files = document.getElementById('selectFiles').files;
    if (files.length <= 0) {
      return;
    }
    var fr = new FileReader();
    fr.onload = function(e) { 
      answers = JSON.parse(e.target.result);
    }
    fr.readAsText(files.item(0));
    startBot(confirm); // restart the bot (skipping over known values)  
}

// load and skip known answers in the chat bot
document.getElementById('import').onclick = function() {
    load(false);
}

// load and confirm known answers in the chat bot
document.getElementById('confirm').onclick = function() {
    load(true); // bearbeiten
}
