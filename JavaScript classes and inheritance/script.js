//That's Parent
class Base {
    constructor(numstr) {
        this.numstr = numstr
    }

    get() {
        return this.numstr
    }

    plus(...input) {
        let inputNums = input.reduce((acc, curr) => acc + curr)
        this.numstr += inputNums
        return this
    }


    minus(...input) {
        if (typeof this.numstr === 'number') {
            let inputNums = input.reduce((acc, curr) => acc + curr)
            this.numstr -= inputNums

            return this
        } else if (typeof this.numstr === 'string') {
            const inputNums = this.numstr
            this.numstr = inputNums.slice(0, -input)

            return this
        }
    }

    multiply(num) {
        if (typeof this.numstr === 'string') {
            this.numstr = this.numstr.repeat(num)
        } else {
            this.numstr *= num
        }

        return this
    }

    divide(num) {
        if (typeof this.numstr === 'string') {
            const k = Math.floor(this.numstr.length / num)
            this.numstr = this.numstr.substring(0, k)
        } else {
            this.numstr /= num
        }

        return this
    }
}


//First Child class named IntBuilder

class IntBuilder extends Base {
    constructor(numstr) {
        super(numstr)
    }

    static random(num1, num2) {
        return `${Math.floor(Math.random() * (num2 - num1) + num1)}`
    }

    mod(inputNums) {
        this.numstr %= inputNums
        return this
    }
}

//Second Child class named StringBuilder

function StringBuilder(numstr) {
    this.numstr = numstr
}

StringBuilder.prototype = new Base()

const stringBuilder = new StringBuilder('Hello')

StringBuilder.prototype.remove = function(numstr) {
    const numstrArr = this.numstr.split('')

    this.numstr = numstrArr.filter((piece) => {
        return piece !== numstr
    }).join('')

    return this
}

StringBuilder.prototype.sub = function(from, to) {
    const input = this.numstr
    this.numstr = input.substring(from, to)

    return this
}

stringBuilder
    .plus(" All", "!")
    .minus(4)
    .multiply(4)
    .divide(4)
    .remove("o")
    .sub(1, 2)
    .get()

IntBuilder.random(10, 100)

const intBuilder = new IntBuilder(10)

intBuilder
    .plus(2, 3, 2)
    .minus(3, 2)
    .multiply(3)
    .divide(2)
    .mod(3)
    .get()