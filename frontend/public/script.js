import { drawGraphic, postEstrutura } from "/assets/webFunctions.js";
const input_func = document.getElementById('input_func');
const input_deriv = document.getElementById('input_deriv');
const input_interval = document.getElementById('input_interval');
const input_toler = document.getElementById('input_toler');
const input_interac = document.getElementById('input_interac');
// ^^^^^ Opções ^^^^^

// DOM
const methods_select = document.getElementById('methods_select');
const input_calculate = document.getElementById('input_calculate');

// Global variables
let globalOption = '';

// A FAZER
const regexLnBack = /(ln)/gi; // Fazer função ln()
const regexLogBack = /log\(([^)]+)\)/ig;

const regexLnGraf = /(ln)/gi;
const regexLogGraf = /(log)/gi;

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
  let valueCloneBack = input_func.value;
  let valueCloneGraf = input_func.value;

  if (regexLnBack.test(valueCloneBack)) {
    console.log("entrou")
    valueCloneBack = valueCloneBack.replace(regexLnBack, 'log')
  } else if (regexLogBack.test(valueCloneBack)) { // Tive q usar gpt pq pelo amor de deus
      valueCloneBack = valueCloneBack.replace(regexLogBack, function(match, p1) {
      console.log(p1)
      console.log(match)
      return `log(${p1}, 10)`;
    });

    // while (regexLogBack.test(valueCloneBack)) {
    //   valueCloneBack = valueCloneBack.replace(regexLogBack, function(match, p1) {
    //     console.log(p1)
    //     console.log(match)
    //     return `log(${p1}, 10)`;
    //   });
    // }
  }

  const estrutura = {
    tipo: methods_select.value,
    opcoes: {
      funcao: valueCloneBack,
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
  if (regexLnGraf.test(valueCloneGraf)) { // log(x)
      valueCloneGraf = valueCloneGraf.replace(regexLnGraf, 'log')
  }

  if (regexLogGraf.test(valueCloneGraf)) { // log(x)
      valueCloneGraf = valueCloneGraf.replace(regexLogGraf, 'log10');
  }

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