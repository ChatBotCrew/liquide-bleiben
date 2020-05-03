/** @file generate chat bot elements and handle events */
/** @author Christof Petig <christof.petig@arcor.de> */

/** @typedef {Object} ConditionalAnswers
 * @property {Object.<string,string>} if - key from 'id' of other question, value from 'answers'
 * @property {string[]} values - possible answers (if condition is met)
*/

/** @typedef {Object.<string,string>} NextStep */
// |string[]) would be a nice future extension (select step by position, not asnwer)

/** @typedef {Object} ChatStep 
 * @property {string} id - unique name for this step, index for answers
 * @property {('input'|'selection_single'|'selection_multiple'|'info')} ui_type - type of the question / result
 * @property {string} text - text to display for this question
 * @property {string} [hint] - not yet used, should give more details
 * @property {(string[]|ConditionalAnswers)} [answers] - list of possible selections
 * @property {NextStep} [next_step] - next id to continue at (index is from answers)
*/

/**  @description {collects the answers from the user filling the form, index is id, value is from answers} @type {Object.<string,string>} */
var answers= {};
/** the name of the currently active step (id) @type {string} */
//var currentStep = "";
/* @description {the object managing the user interaction objects} @type {BotUI} */
var botui = new BotUI('foerderike', {fontawesome: false, searchselect: true, promise:true });
/** @description {ask for already provided answers (confirm the answer), when false skips questions with known answers} @type {boolean} */
var confirm = false;

/** called when no next_step is defined 
 *  @param {ChatStep} step */
function ends_at(step){
    if (step.id=="measures"){ // completed
        foerderike_pdf(answers);
    }
}

/** ask for one out of many answers 
 *  @param {ChatStep} step */
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
                answers[step.id] = res.value;
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

/** ask for a set of answers (possibly empty)
 *  @param {ChatStep} step */
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
        answers[step.id] = res.value;
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

/** just display a message (and end)
 *  @param {ChatStep} step */
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

/** ask for a string answer (free text)
 *  @param {ChatStep} step */
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
            answers[step.id] = res.value;
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

/** ask for one out of many answers 
 *  @param {string} stepId - name of the step to show */
function showStep(stepId) {

    var entry = foerderike_steps.find(v => v.id == stepId);

    if(entry)
    {
        //currentStep = stepId;
        if (entry.ui_type =="selection_single") selectSingle(entry);
        else if (entry.ui_type == "selection_multiple") selectMultiple(entry);
        else if (entry.ui_type == "info") info(entry);
        else if (entry.ui_type == "input") input(entry);
        else console.log("unknown command "+entry.ui_type+" in "+stepId);
    }
    else console.log("not found "+stepId);
};

/** initialize the bot at program start: set answers to empty, register vue-select */
function initBot() {
    answers= {}
    Vue.component('v-select', VueSelect.VueSelect);
}

/** start of restart the bot
 * @param {boolean} confirm_arg - whether the bot should confirm (ask again) known answers
 */
function startBot(confirm_arg)
{
    if (confirm_arg) confirm = true;
    else confirm=false;
    showStep(foerderike_steps[0].id);
}
