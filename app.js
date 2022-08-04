const calc = new Calculator();

const buttons = document.getElementsByTagName('button');

function updateDisplay(content) {
    const display = document.getElementById('display');
    display.innerText = content;
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click",
    button => { // send
        type = button.srcElement.classList[0] || button.srcElement.id;
        item = button.srcElement.innerText;
        // console.log(type + ": " + item);
        switch(type){
            case "number":
                calc.number(parseInt(item));
                break;
            case "operator":
                calc.operator(item);
                break;
            case "clear":
                calc.clear();
                break;
            case "equal":
                calc.equal();
                break;
            default:
                console.log("Unknown: " + type + "(" + item + ")");
                //console.log(button);
        }
        // receive
        updateDisplay(calc.getDisplay());
    });
};


