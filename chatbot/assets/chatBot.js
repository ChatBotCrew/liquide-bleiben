
var answers= {};
var current_step = {};
var botui = new BotUI('foerderike', {fontawesome: false, searchselect: true, promise:true });
var confirm = false;

function ends_at(step){
    if (step.id=="measures"){ // completed
        foerderike_pdf(answers);
    }
}

function selectSingle(step) {
    var actions = [];
    var known = false;
    step["answers"].forEach(element => {
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
                if (step["next_step"])
                    showStep(step["next_step"][res.value])
                else
                    ends_at(step);
            });
        else
        {
            botui.message.add({
                content: answers[step.id],
                human: true,
            }).then( () => {
                if (step["next_step"])
                    showStep(step["next_step"][answers[step.id]])
                else
                    ends_at(step);
            });
        }
    });
}

function selectMultiple(step) {
    var options = [];
    var candidates = step["answers"];
    candidates.forEach(element => {
        if ((typeof element)=="object"){
            var clause = element["if"];
            if (clause) {
                var condition = true;
                for (var j in clause) {
                    //console.log(j,answers[j],clause[j]);
                    if (answers[j]!=clause[j])
                        condition=false;
                }
                if (condition){
                    var optlist = element["values"];
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
        if (step["next_step"])
            showStep(step["next_step"][0]);
        else
            ends_at(step);
    })}
    else {
        botui.message.add({
            content: answers[step.id],
            human: true,
        }).then( () => {
            if (step["next_step"])
                showStep(step["next_step"][0]);
            else
                ends_at(step);
        });
    }});
}

function info(step) {
    if (step["answers"])
    {
        selectSingle(step);
    }
    else
        botui.message.add({
            content: step.text,
        })
}

function input(step) {
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
            showStep(step["next_step"][0])
        });
    } else {
        botui.message.add({
            content: answers[step.id],
            human: true,
        }).then( () => {
            showStep(step["next_step"][0]);
        });
    }});
}

function showStep(stepId) {

    var entry = foerderike_steps.find(v => v.id == stepId);

    if(entry)
    {
        currentStep = stepId;
        if (entry.ui_type =="selection_single") selectSingle(entry);
        else if (entry.ui_type == "selection_multiple") selectMultiple(entry);
        else if (entry.ui_type == "info") info(entry);
        else if (entry.ui_type == "input") input(entry);
        else console.log("unknown command "+entry.ui_type+" in "+stepId);
    }
    else console.log("not found "+stepId);
};

function initBot() {
    answers= {}
    Vue.component('v-select', VueSelect.VueSelect);
}

function startBot(confirm_arg)
{
    if (confirm_arg) confirm = true;
    else confirm=false;
    showStep(foerderike_steps[0].id);
}
