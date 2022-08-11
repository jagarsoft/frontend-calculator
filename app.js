const calc = new Calculator();

const buttons = document.getElementsByTagName('button');

var _blinkDisplay = false;

var _period = "";

function updateDisplay(content) {
    const display = document.getElementById('display');
    display.innerText = content + _period;
    _period = "";
}

function memDisplayOn() {
    document.getElementById("memDisplay").style.visibility = "visible";
}

function memDisplayOff() {
    document.getElementById("memDisplay").style.visibility = "hidden";
}

function blinkDisplay_v1() {
    updateDisplay("");

    setTimeout( () => {
        updateDisplay(calc.getResult());
    }, 75);
}

function blinkDisplay_v2() {
    document.getElementById("display").style.visibility = "hidden";

    setTimeout( () => {
        document.getElementById("display").style.visibility = "visible";
    }, 75);
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
                if( item === "÷" )
                    item = "/";
                calc.operator(item);
                //blinkDisplay_v1(); return;
                //blinkDisplay_v2;
                break;

            case "clear":
                calc.clear();
                break;

            case "equal":
                calc.equal();
                break;

            case "period":
                if( calc.getPeriod() === false ){
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

            case "memplus":
                calc.memplus();
                break;

            case "memminus":
                calc.memminus();
                break;

            case "memrestore":
                calc.memrestore();
                break;

            case "memclear":
                calc.memclear();
                break;

            default:
                console.log("Unknown: " + type + "(" + item + ")");
                //console.log(button);
        }

        // receive
        updateDisplay(calc.getResult());

        if( calc.getMemory() ){
            memDisplayOn();
        } else {
            memDisplayOff();
        }
    });
};
