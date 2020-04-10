
var answers= {};
var current_step = {};
var botui = new BotUI('foerderike');

function ends_at(step){
    if (step.id=="measures"){ // completed
        console.log("create PDF");
    }
}

function auswahlSingle(step) {
    var actions = []
    step["mögliche antworten"].forEach(element => {
        actions.push({ text: element, value: element })
    });
    botui.message.add({
        content: step.text,
    }).then(() =>
    botui.action.button({
        addMessage: true,
        action: actions,
    }).then( (res) => {
        answers[currentStep] = res.value;
        if (step["weiter zu"])
            SchrittZeigen(step["weiter zu"][res.value])
        else
            ends_at(step);
    }));
}

function auswahlMultiple(step) {
    var options = [];
    var candidates = step["mögliche antworten"];
    candidates.forEach(element => {
        if ((typeof element)=="object"){
            var clause = element["Wenn"];
            if (clause) {
                var condition = true;
                for (var j in clause) {
                    //console.log(j,answers[j],clause[j]);
                    if (answers[j]!=clause[j])
                        condition=false;
                }
                if (condition){
                    var optlist = element["Wert"];
                    for (var j in optlist) {
                        //console.log("Res", optlist[j]);
                        options.push({text: optlist[j], value: optlist[j]})
                    }
                }
            }
        }
        else {
            options.push({ text: element, value: element })
        }
    });
    botui.message.add({
        content: step.text,
    }).then(() =>
    botui.action.select({
        action: {
            multipleselect: true,
            options: options,
            button: { icon: 'check', label: 'OK'}
        }
    }).then( (res) => {
        answers[currentStep] = res.value;
        if (step["weiter zu"])
            SchrittZeigen(step["weiter zu"][0])
        else
            ends_at(step);
    }));
}

function info(step) {
    if (step["mögliche antworten"])
    {
        auswahlSingle(step);
    }
    else
        botui.message.add({
            content: step.text,
        })
}

function eingabe(step) {
    botui.message.add({
        content: step.text,
    }).then(() =>
        botui.action.text({
            action: {

            }
        })
    ).then((res) => {
        answers[currentStep] = res.value;
        SchrittZeigen(step["weiter zu"][0])
    });
}

function SchrittZeigen(stepId) {

    var entry = foerderike_steps.find(v => v.id == stepId);

    if(entry)
    {
        currentStep = stepId;
        if (entry.fragetyp =="auswahl_single") auswahlSingle(entry);
        else if (entry.fragetyp == "auswahl_multiple") auswahlMultiple(entry);
        else if (entry.fragetyp == "info") info(entry);
        else if (entry.fragetyp == "eingabe") eingabe(entry);
        else console.log("unknown command "+entry.fragetyp+" in "+stepId);
    }
    else console.log("nicht gefunden "+stepId);
};

function startBot()
{   
    answers= {} 
    SchrittZeigen(foerderike_steps[0].id);
}
