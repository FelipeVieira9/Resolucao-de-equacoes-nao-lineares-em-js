// lib 'mathjs'
    const { create, all } = require('mathjs')
    const config = { }
    const math = create(all, config)
// dados preenchidos pelo usuário
    const func = "x^3 - x - 1" // a função que deverá ser calculada
    const EI = 1.5 // estimativa inicial
    const T = 2e-12 // tolerância
    const LdI = 50 // limite de iterações

function Newton_Raphson(){
    // definindo a função e sua derivada
    const f_parse = math.parse(func)
    const d_parse = math.derivative(f_parse, math.parse('x'))
    const f = f_parse.compile()
    const d = d_parse.compile()

    var x = EI
    var fx = f.evaluate({x: x})
    var dx = d.evaluate({x: x})
    k = 0 // contador de iterações

    if(dx == 0){
        if(math.abs(fx) <= T){
            return x
        }

        console.log("não é possível calcular a raiz por esse método")
    }
    // print k = 0
    console.log(`k: ${k}\n\tx = ${x}\n\tf(x) = ${fx}\n\tf´(x) = ${dx}`)

    while(math.abs(fx) > T && k < LdI){
        // nova iteração
            k++
        // novo valor de x
            x -= fx/dx
        // computando novamente f(x) e f'(x)
            fx = f.evaluate({x: x})
            dx = d.evaluate({x: x})
        // print do resultado
            console.log(`k: ${k}\n\tx = ${x}\n\tf(x) = ${fx}\n\tf´(x) = ${dx}`)
        // finalizando o loop caso f'(x) = 0
            if(dx == 0) break;
    }

    if(math.abs(fx) > T){
        console.log("raiz não encontrada!")    
    }

    return x
}

console.log(`Raiz = ${Newton_Raphson()}`)