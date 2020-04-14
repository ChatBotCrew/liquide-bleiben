
var answers= {};
var current_step = {};
var botui = new BotUI('foerderike', {fontawesome: false, searchselect: false, promise:true });
var confirm = false;

function ends_at(step){
    if (step.id=="measures"){ // completed
        foerderike_pdf(answers);
    }
}

function auswahlSingle(step) {
    var actions = [];
    var known = false;
    step["mögliche antworten"].forEach(element => {
        var action = { 
            text: element, 
            value: element,
        };
        if (answers[step.id] && element==answers[step.id]) {
            //action.icon="check";
            action.text = "★ " + action.text;
            if (!confirm) known=true;
        }
        actions.push(action);
    });
    botui.message.add({
        content: step.text,
    }).then(() => {
        if (!known)
            botui.action.button({
                addMessage: true,
                action: actions,
            }).then( (res) => {
                answers[currentStep] = res.value;
                if (step["weiter zu"])
                    SchrittZeigen(step["weiter zu"][res.value])
                else
                    ends_at(step);
            });
        else
        {
            botui.message.add({
                content: answers[step.id],
                human: true,
            }).then( () => {
                if (step["weiter zu"])
                    SchrittZeigen(step["weiter zu"][answers[step.id]])
                else
                    ends_at(step);
            });
        }
    });
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
    }).then(() => { if (!answers[step.id] || confirm) {
    botui.action.select({
        action: {
            multipleselect: true,
            value: answers[step.id],
            options: options,
            button: { icon: 'check', label: 'OK'}
        }
    }).then( (res) => {
        answers[currentStep] = res.value;
        if (step["weiter zu"])
            SchrittZeigen(step["weiter zu"][0]);
        else
            ends_at(step);
    })}
    else {
        botui.message.add({
            content: answers[step.id],
            human: true,
        }).then( () => {
            if (step["weiter zu"])
                SchrittZeigen(step["weiter zu"][0]);
            else
                ends_at(step);
        });
    }});
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
    }).then(() => { if (!answers[step.id] || confirm) {
        botui.action.text({
            action: {
                value: answers[step.id],
            }
        })
        .then((res) => {
            answers[currentStep] = res.value;
            SchrittZeigen(step["weiter zu"][0])
        });
    } else {
        botui.message.add({
            content: answers[step.id],
            human: true,
        }).then( () => {
            SchrittZeigen(step["weiter zu"][0]);
        });
    }});
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

function startBot(confirm_arg)
{
    if (confirm_arg) confirm = true;
    else confirm=false;
    SchrittZeigen(foerderike_steps[0].id);
}
