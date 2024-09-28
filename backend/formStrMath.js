// módulo para a formatação da string representante da função, para que possa ser utilizada
// pela lib mathjs
function formStrMath(func){ 
    var newStr = func
    
    // exp = expressão
    // log(exp) = log(exp, 10)
    // ln(exp) = log(exp)
    // logA(exp) = log(exp, A), A é uma constante pertencente aos Reais

    // trocando log(exp) e logA(exp) \\
        
        const log = "log"
        var iLog
    
        iLog = newStr.indexOf(log)

        while(iLog !== -1){
            let iParent1 = newStr.indexOf(")", iLog)

            // auxStr1 = "log(exp)" ou "logA(exp)"
                let auxStr1 = newStr.substring(iLog, iParent1+1)
            // indice do '(' em auxStr1
                let iParent2 = auxStr1.indexOf("(")
            // a substring auxStr1 será substituida por auxStr2 ao final
                let auxStr2
            if(iParent2 === log.length){
                // se auxStr1 = "log(exp)"
                    auxStr2 = auxStr1.replace(")", ", 10)")
                // auxStr2 = "log(exp, 10)"
                    
            }else{
                // se auxStr1 = "logA(exp)"
                    let exp = auxStr1.substring(iParent2+1, auxStr1.length-1) // "exp"
                    let A = auxStr1.substring(log.length, iParent2)

                    auxStr2 = `log(${exp}, ${A})`
                // auxStr2 = log(exp, A)
                    
            }
            // substituindo 
            newStr = newStr.replace(auxStr1, auxStr2)
            
            iLog = newStr.indexOf(log, iLog + log.length)
            
        }

     // trocando ln \\
        const ln = /(ln)/g
        newStr = newStr.replace(ln, "log")

        return newStr
}

module.exports = formStrMath