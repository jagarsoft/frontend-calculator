class Calculator {
    _display = 0;
    _stack = [];
    _operators = [];
    _operatorSeen = false;

    constructor (){
        this.clear();
    }

    number(n) {
        let x;
        if( this._operatorSeen ) {
            x = n;
        } else {
            x = this.getDisplay();
            x *= 10;
            x += n;
        }
        this._setDisplay(x);
        this._operatorSeen = false;
    }

    operator(o){
        this._stack.push(this.getDisplay());
        this._operators.push(o);
        this._operatorSeen = true;
    }

    clear(){
        this._setDisplay(0);
        this._stack = [];
        this._operators = [];
        this._operatorSeen = false;
    }

    equal(){
        let   x = this._stack.pop();
        const y = this.getDisplay();
        const o = this._operators.pop();
        
        switch(o){
            case "+":
                x = x + y;
                break;
            case '-':
                x = x - y;
                break;
            case '*':
                x = x * y;
                break;
            case '/':
                if( y === 0 ){
                    x = "E";
                } else {
                    x = x / y;
                }
                break;
            default:
                x = "E";
        }
        this.clear();
        this._setDisplay(x);
        this._operatorSeen = true;
    }

    getDisplay(){
        return this._display;
    }

    _setDisplay(n){
        this._display = n;
    }
}