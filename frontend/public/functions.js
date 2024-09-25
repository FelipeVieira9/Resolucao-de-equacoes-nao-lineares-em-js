const { create, all } = require('mathjs');
const config = { };
const math = create(all, config);

class Metodo {
    constructor(estrutura) {
        this.estrutura = estrutura;
    }

    bissecao() {
        const arr = [
            // {
            //     x: ?,
            //     fx: ?,
            //     mod: ?
            // }
        ];

        const {funcao: expressao, intervalo, tolerancia, iteracoesM: limite_iteracoes} = this.estrutura.opcoes;
        const inicio_interv = Number(intervalo[0]);
        const fim_interv = Number(intervalo[2]);
        
        const exp_p = math.parse(expressao)
        const exp_c = exp_p.compile() 
    // definindo o intervalo [a, b]
        var a = inicio_interv
        var b = fim_interv

    // calculando f(a) e f(b)
        var f_a = exp_c.evaluate({x: a})
        var f_b = exp_c.evaluate({x: b})

    // condição para uso do método
        if(f_a*f_b >= 0){
            if(math.abs(f_a) < tolerancia) return a
            if(math.abs(f_b) < tolerancia) return b

            console.log("O intervalo dado eh invalido")
            return 'err'
        }
    // x: ponto medio entre 'a' e 'b'
        var x = (a + b)/2
    // f(x)
        var f_x = exp_c.evaluate({x: x})

    // k: contador de iterações
        var k = 1

        arr.push(
            {
                    iterac: k,
                    x: x,
                    fx: f_x,
                    mod: b - a
            }
        )
    
    // |f(x)| > tolerancia
        while(math.abs(f_x) > tolerancia && k < limite_iteracoes){
            console.log(`k: ${k}\n\tf(${a}) = ${f_a}\n\tf(${b}) = ${f_b}\n\tf(${x}) = ${f_x}`)

            if((f_a*f_x) < 0){
                // novo intervalo [a, x]
                b = x
                f_b = f_x
            }else{
                // novo intervalo [x, b]
                a = x
                f_a = f_x
            }
            
            // novo valor de x
                x = (a + b)/2
            // calculando novamente f(x)
                f_x = exp_c.evaluate({x: x})

            // contagem de iterações
                k++

            // Loops

            arr.push(
                {
                        iterac: k,
                        x: x,
                        fx: f_x,
                        mod: b - a
                })
        }
        console.log(`k: ${k}\n\tf(${a}) = ${f_a}\n\tf(${b}) = ${f_b}\n\tf(${x}) = ${f_x}`)
        
        // resultado final
        let str = '';
        arr.forEach(({iterac, x, fx, mod}) => {
            if (str.length > 0) {
                if (isNaN(iterac) || isNaN(x) || isNaN(fx) || isNaN(mod)) {
                    return 'err'
                } else if (!isFinite(fx)) {
                    return 'inf'
                }
            }
        })

        if (k === limite_iteracoes) {
            return 'err'
        } else {
            return arr;
        }
    }
}

module.exports = { Metodo }
