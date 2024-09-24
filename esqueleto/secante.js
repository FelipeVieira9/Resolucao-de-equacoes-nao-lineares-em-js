// lib 'mathjs'
    const { create, all } = require('mathjs')
    const config = { }
    const math = create(all, config)
// dados preenchidos pelo usuário
    const func = "x^2 + x - 6" // a função que deverá ser calculada
    const A = 1.5 // inicio do intervalo
    const B = 1.7 // fim do intervalo
    const T = 2e-3 // tolerância
    const LdI = 50 // limite de iterações

function secante(){
    const f_parse = math.parse(func)
    const f = f_parse.compile()

    var a = A // anterior-> x(k-1)
    var x = B // atual-> x(k)

    var fa = f.evaluate({x: a})
    var fx = f.evaluate({x: x})

    console.log(`k = 0\n\tx0 = ${a}\n\tf(x0) = ${fa}\n\tx1 = ${x}\n\tf(x1) = ${fx}`)
    if(fa*fx > 0){
        // return erro
    }

    var k = 0;
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
        // print resultado
        console.log(`k = ${k}\n\tx${k+1} = ${x}\n\tf(x${k+1}) = ${fx}`)
    }
}

secante()