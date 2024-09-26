import { drawGraphic, postEstrutura } from "/assets/webFunctions.js";
//import formStrGraph from "../../backend/formStrGraph.js";
const input_func = document.getElementById('input_func');
const input_deriv = document.getElementById('input_deriv');
const input_interval = document.getElementById('input_interval');
const input_toler = document.getElementById('input_toler');
const input_interac = document.getElementById('input_interac');
// ^^^^^ Opções ^^^^^
function formStrGraph(func){ 
  var newStr = func
  
  // exp = expressão
  // log(exp) = log10(exp)
  // ln(exp) = log(exp)
  // logA(exp) = log(exp)/log(A), A é uma constante pertencente aos Reais

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
                  let exp = auxStr1.substring(iParent2+1, auxStr1.length-1) // "exp"
              // se auxStr1 = "log(exp)"
                  auxStr2 = `log10(${exp})`
              // auxStr2 = "log10(exp)"
              
                  
          }else{
              // se auxStr1 = "logA(exp)"
                  let exp = auxStr1.substring(iParent2+1, auxStr1.length-1) // "exp"
                  let A = auxStr1.substring(log.length, iParent2)

                  auxStr2 = `log(${exp})/log(${A})`
              // auxStr2 = log(exp, A)
                  
          }
          // substituindo 
          newStr = newStr.replace(auxStr1, auxStr2)
          
          iLog = newStr.indexOf(log, iLog + auxStr2.length)
          
      }

   // trocando ln \\
      const ln = /(ln)/g
      newStr = newStr.replace(ln, "log")

      return newStr
}
// DOM
const methods_select = document.getElementById('methods_select');
const input_calculate = document.getElementById('input_calculate');

// Global variables
let globalOption = '';

// A FAZER
// const regexLnBack = //; // Fazer função ln()
// const regexLogBack = //;

// const regexLnGraf = /(ln)/g;
// const regexLogGraf = /(log\()/g;

// Selecionar o método
methods_select.addEventListener('change', (e) => {
  switch (e.target.value) {
    case 'Bissecao':
      document.getElementById('noAllowed').style.display = 'none';
      document.getElementById('input_deriv').setAttribute('placeholder', 'Opcional');
      globalOption = 'Bissecao';
      break;

    default:
      document.getElementById('input_deriv').setAttribute('placeholder', '');
      document.getElementById('noAllowed').style.display = 'block';
  }
})

// Calcular o método escolhido
input_calculate.addEventListener('click', () => {
  document.querySelector('#container_iterations > span').innerHTML = '';

  const estrutura = {
    tipo: methods_select.value,
    opcoes: {
      funcao: input_func.value,
      derivada: input_deriv.value,
      intervalo: input_interval.value.replace(/(\[)|(\])/g, '').split(/(,)/),
      tolerancia: input_toler.value,
      iteracoesM: input_interac.value
    }
  }

  // Enviar os dado e enviar a iteração para tela
  postEstrutura(estrutura, globalOption);
  
  // Liberar a visualização
  document.getElementById('container_iterations').style.display = 'block';
  document.getElementById('container_result').style.display = 'flex';
  
  // Limpar as entradas para o gráfico
  // if (regexLnGraf.test(input_func.value)) { // log(x)
  //     input_func.value = input_func.value.replace(regexLnGraf, 'log')
  // }
  input_func.value = formStrGraph(input_func.value)
  // if (regexLogGraf.test(input_func.value)) { // log(x)
  //     input_func.value = input_func.value.replace(regexLogGraf, 'log10(');
  // }

  // Enviar gráfico
  try {
    drawGraphic();
  } catch (error) {
    document.getElementById('graphic').innerHTML = '<h3>Gráfico: Erro de sintaxe ou sem internet</h3>';
  }

  // Limpar elementos options
  const nodeSpan = document.querySelectorAll('#method_options span');

  Array.from(nodeSpan).forEach((nodes) => nodes.children[1].value = '');
  document.getElementById('noAllowed').style.display = 'block';

  Array.from(methods_select.children).forEach((node) => {
    node.removeAttribute('selected')
  })
  methods_select.children[0].setAttribute('selected' ,true);
})