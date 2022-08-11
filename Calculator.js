class Calculator {
    _result = 0;
    _stack = [];
    _operators = [];
    _firstDigit = true;
    _period = false;
    _decimals = 1;
    _memory = 0;
    _prec = {
        "+": 1,
        "-": 1,
        'x': 2,
        "/": 2
    };

    constructor (){
        this.clear();
    }

    digit(n) {
        let x;
        if( this._period ){
            /**
             * Algorithm proposed by Fran O'Hara
             * for ZX81's Floating-point Calculator
             * ISBN 0 86759 124 2
             */
            this._decimals /= 10;
            x = this._decimals * n;
            x += this.getResult();
        } else {
            if( this._firstDigit ) {
                x = n;
            } else {
                x = this.getResult();
                x *= 10;
                x += n;
            }
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
        this._period = false;
        this._decimals = 1;
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
                x += y;
                break;

            case '-':
                x -= y;
                break;

            case 'x':
                x *= y;
                break;

            case '/':
                if( y === 0 ){
                    x = "E";
                } else {
                    x /= y;
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
        this._period = false;
        this._decimals = 1;
    }

    changeSign(){
        let x = this.getResult();
        if( x === 'E' ){
            return;
        }
        x *= -1;
        this._setResult(x);
    }

    squareRoot(){
        let x = this.getResult();
        if( x === 'E' ){
            return;
        }
        if( x < 0 ){
            x = "E";
        } else {
            x = Math.sqrt(x);
        }
        this._setResult(x);
    }

    memplus(){
        let x = this._memory;
        x += this.getResult();
        this._memory = x;
    }

    memminus(){
        let x = this._memory;
        x -= this.getResult();
        this._memory = x;
    }

    memrestore(){
        this._setResult(this._memory);
    }

    memclear(){
        this._memory = 0;
    }

    getMemory(){
        return this._memory;
    }

    getResult(){
        return this._result;
    }

    _setResult(n){
        this._result = n;
    }

    getPeriod(){
        return this._period;
    }

    setPeriod(){
        this._period = true;
    }

    _topOf(operators){
        return operators[operators.length-1];
    }
}