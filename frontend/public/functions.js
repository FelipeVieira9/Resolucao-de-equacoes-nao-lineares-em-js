const { create, all } = require('mathjs');
const config = { };
const math = create(all, config);

const formStrMath = require('../../backend/formStrMath.js')

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

        const {funcao: auxExpressao, intervalo, tolerancia, iteracoesM: limite_iteracoes} = this.estrutura.opcoes;
        const inicio_interv = Number(intervalo[0]);
        const fim_interv = Number(intervalo[2]);
        
        const expressao = formStrMath(auxExpressao)
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
            // console.log(`k: ${k}\n\tf(${a}) = ${f_a}\n\tf(${b}) = ${f_b}\n\tf(${x}) = ${f_x}`)

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
        // console.log(`k: ${k}\n\tf(${a}) = ${f_a}\n\tf(${b}) = ${f_b}\n\tf(${x}) = ${f_x}`)
        
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

    falsa_pos() {
        const arr = [
            // {
            //     x: ?,
            //     fx: ?,
            //     mod: ?
            // }
        ];
        
        const {funcao: auxExpressao, intervalo, tolerancia, iteracoesM: limite_iteracoes} = this.estrutura.opcoes;
        const inicio_interv = Number(intervalo[0]);
        const fim_interv = Number(intervalo[2]);
        
        const expressao = formStrMath(auxExpressao) // Esqueceu de botar nessa falsa pos?
        const exp_p = math.parse(expressao)
        const exp_c = exp_p.compile()
    // definindo o intervalo [a, b]
        var a = inicio_interv
        var b = fim_interv

    // aplicando a função para os valores de a e b
        var f_a = exp_c.evaluate({x: a}) // f(a)
        var f_b = exp_c.evaluate({x: b}) // f(b)
    
    // condição para uso do método
        if(f_a*f_b >= 0){
            if(math.abs(f_a) < tolerancia) return a
            if(math.abs(f_b) < tolerancia) return b

            console.log("O intervalo dado eh invalido")
            return 0.0
        }

// falta a restrição da derivada ter um sinal constante...

    // valor de x e f(x)
        var x = (a*f_b - b*f_a)/(f_b - f_a)
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
                x = (a*f_b - b*f_a)/(f_b - f_a)
            // calculando novamente f(x)
                f_x = exp_c.evaluate({x: x})

            // contador de iterações
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

    Newton_Raphson() {
        const arr = [
            // {
            //     x: ?,
            //     fx: ?,
            //     mod: ?
            // }
        ];
        
        const {funcao: auxExpressao, intervalo, tolerancia, iteracoesM: limite_iteracoes} = this.estrutura.opcoes;
        const inicio_interv = Number(intervalo[0]);
        // const fim_interv = Number(intervalo[2]);

        const func = formStrMath(auxExpressao) // Função formatada, adicionei
        const EI = inicio_interv // estimativa inicial
        const T = tolerancia // tolerância
        const LdI = limite_iteracoes // limite de iterações

        // definindo a função e sua derivada
        const f_parse = math.parse(func)
        const d_parse = math.derivative(f_parse, math.parse('x'))
        const f = f_parse.compile()
        const d = d_parse.compile()

        var x = EI
        var fx = f.evaluate({x: x})
        var dx = d.evaluate({x: x})
        let k = 0 // contador de iterações

        if(dx == 0){
            if(math.abs(fx) <= T){
                return x
            }

            console.log("não é possível calcular a raiz por esse método")
        }
        // print k = 0
        console.log(`k: ${k}\n\tx = ${x}\n\tf(x) = ${fx}\n\tf´(x) = ${dx}`)

        while(math.abs(fx) > T && k < LdI){
            const x1 = x;

            // nova iteração
            k++
            // novo valor de x
            x -= fx/dx
            
            // computando novamente f(x) e f'(x)
            fx = f.evaluate({x: x})
            dx = d.evaluate({x: x})
            // print do resultado
            console.log(`k: ${k}\n\tx = ${x}\n\tf(x) = ${fx}\n\tf´(x) = ${dx}`)

            // array resultado
            arr.push(
                {
                        iterac: k,
                        x: x,
                        fx: fx,
                        mod: x - x1
                })
            // finalizando o loop caso f'(x) = 0
            if(dx == 0) break;
        }

        if(math.abs(fx) > T){
            return 'err'
        }

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

    Secante() {
        const arr = [
            // {
            //     x: ?,
            //     fx: ?,
            //     mod: ?
            // }
        ];
        
        const {funcao: auxExpressao, intervalo, tolerancia, iteracoesM: limite_iteracoes} = this.estrutura.opcoes;
        const inicio_interv = Number(intervalo[0]);
        const fim_interv = Number(intervalo[2]);

        const func = formStrMath(auxExpressao) // Função formatada, adicionei
        const A = inicio_interv // inicio do intervalo
        const B = fim_interv // fim do intervalo
        const T = tolerancia // tolerância
        const LdI = limite_iteracoes // limite de iterações

        const f_parse = math.parse(func)
        const f = f_parse.compile()

        var a = A // anterior-> x(k-1)
        var x = B // atual-> x(k)

        var fa = f.evaluate({x: a})
        var fx = f.evaluate({x: x})

        console.log(`k = 0\n\tx0 = ${a}\n\tf(x0) = ${fa}\n\tx1 = ${x}\n\tf(x1) = ${fx}`)
        // if(fa*fx > 0){
        //     return 'err' REMOVI PQ TAVA DANDO ERROR LITERALMENTE
        // }

        var k = 0;

        arr.push(
            {
                    iterac: k,
                    x: x,
                    fx: fx,
                    mod: x - a
            })
        
        var aux1, aux2;

        while(math.abs(fx) > T && k < LdI){
            k++;
            // auxiliares para atribuir o valor anterior ao fim do loop
                aux1 = x; aux2 = fx
            // algoritmo da secante
                x = (a*fx - x*fa)/(fx - fa)
                fx = f.evaluate({x: x})
            // atualizando o valor anterior
                a = aux1; fa = aux2

                arr.push(
                    {
                            iterac: k,
                            x: x,
                            fx: fx,
                            mod: x - a
                    })
            // print resultado
            console.log(`k = ${k}\n\tx${k+1} = ${x}\n\tf(x${k+1}) = ${fx}`)
        }

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
