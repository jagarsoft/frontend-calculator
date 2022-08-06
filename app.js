const calc = new Calculator();

const buttons = document.getElementsByTagName('button');

var _blinkDisplay = false;

var _period = "";

function updateDisplay(content) {
    const display = document.getElementById('display');
    display.innerText = content;
}

function blinkDisplay() {
    // https://attacomsian.com/blog/javascript-dom-add-a-css-class-to-an-element
    /*const display = document.getElementById('display');
    display.classList.add("blink");
    return;*/

    console.log("comienza parpadeo");
    updateDisplay(""); // turn it off
    setTimeout(turnOn, 1);
    
    /*
    while( ! _blinkDisplay ) // var is not volatile
        ;
    */
    // turn it on
    console.log("terminada");
}

function turnOn() {
    sleep(1000);
    _blinkDisplay = true;
}

/*
 * @link https://www.sitepoint.com/delay-sleep-pause-wait/
 */
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click",
    button => { // send
        type = button.srcElement.classList[0] || button.srcElement.id;
        item = button.srcElement.innerText;
        // console.log(type + ": " + item);
        switch(type){
            case "digit":
                calc.digit(parseInt(item));
                break;

            case "operator":
                calc.operator(item);
                //blinkDisplay();
                break;

            case "clear":
                calc.clear();
                break;

            case "equal":
                calc.equal();
                break;

            case "period":
                if( calc.getPunto() === false ){
                    calc.setPeriod();
                    _period = ".";
                }
                break;

            case "sgn":
                calc.changeSign();
                break;

            case "sqr":
                calc.squareRoot();
                break;

            default:
                console.log("Unknown: " + type + "(" + item + ")");
                //console.log(button);
        }

        // receive
        updateDisplay(calc.getResult() + _period);
        _period = "";
    });
};
