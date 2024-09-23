// lib 'mathjs'
    const { create, all } = require('mathjs')
    const config = { }
    const math = create(all, config)

//////////////////////////////////////////

function falsa_posicao(expressao, inicio_interv, fim_interv, tolerancia, limite_iteracoes){
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
        var k = 0
    
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
        }

    console.log(`k: ${k}\n\tf(${a}) = ${f_a}\n\tf(${b}) = ${f_b}\n\tf(${x}) = ${f_x}`)
    // resultado final
        return x
}

// teste da função
console.log(falsa_posicao("x^3 - x - 1", 1, 2, 0.002, 50))