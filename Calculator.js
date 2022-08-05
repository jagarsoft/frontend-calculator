class Calculator {
    _result = 0;
    _stack = [];
    _operators = [];
    _firstDigit = true;
    _prec = {
        "+": 1,
        "-": 1,
        'x': 2,
        "/": 2
    };

    constructor (){
        this.clear();
    }

    number(n) {
        let x;
        if( this._firstDigit ) {
            x = n;
        } else {
            x = this.getResult();
            x *= 10;
            x += n;
        }
        this._setResult(x);
        this._firstDigit = false;
    }

    operator(o){
        if( this._operators.length > 0 ){
            const prev_op = this._topOf(this._operators);

            if( this._prec[prev_op] > this._prec[o] ){
                this._reduce();
            }
        }

        this._shift(o);
    
        this._firstDigit = true;
    }

    _shift(o){
        this._stack.push(this.getResult());
        this._operators.push(o);
    }

    _reduce(){
        let   x = this._stack.pop();
        const y = this.getResult();
        const o = this._operators.pop();
        
        if( x === 'E' || y === 'E'){
            this._setResult('E');
            return;
        }

        switch(o){
            case "+":
                x = x + y;
                break;

            case '-':
                x = x - y;
                break;

            case 'x':
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
    
        this._setResult(x);
    }

    equal(){
        while( this._operators.length > 0){
            this._reduce();
        }
        this._firstDigit = true;
    }

    clear(){
        this._setResult(0);
        this._stack = [];
        this._operators = [];
        this._firstDigit = true;
    }

    getResult(){
        return this._result;
    }

    _setResult(n){
        this._result = n;
    }

    _topOf(operators){
        return operators[operators.length-1];
    }
}