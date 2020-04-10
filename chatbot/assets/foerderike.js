
var answers= {};
var current_step = {};
var botui = new BotUI('foerderike');

function auswahlSingle(step) {
    botui.message.add({
        content: step.text,
        human: false
    }).then(() =>
    botui.action.button({
        addMessage: true,
        action: [
            {
                text: step["mögliche antworten"][0],
                value: step["mögliche antworten"][0]
            },
            {
                text: step["mögliche antworten"][1],
                value: step["mögliche antworten"][1]
            }
        ]               
    }).then( (res) => {
        answers[currentStep] = res.value;
        SchrittZeigen(step["weiter zu"][res.value])
    }));
}

function auswahlMultiple(step) {
    auswahlSingle(step);
}

/**
 * Search for first answer with "null"-answer + draw
 */
function SchrittZeigen(stepId) {

    var matchingSteps = foerderike_steps.filter((v) => {return v.id === stepId});

    if(matchingSteps.length > 0)
    {
        currentStep = stepId;
        var step=matchingSteps[0]
        if (step.fragetyp =="auswahl_single") auswahlSingle(step);
        else if (step.fragetyp == "auswahl_multiple") auswahlMultiple(step);
        else console.log("unknown command"+stepId);
    }
    else console.log("nicht gefunden "+stepId);
};

function startBot()
{   
    answers= {} 
    SchrittZeigen(foerderike_steps[0].id);
}
