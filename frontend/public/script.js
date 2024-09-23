const input_func = document.getElementById('input_func');
const input_deriv = document.getElementById('input_deriv');
const input_interval = document.getElementById('input_interval');
const input_toler = document.getElementById('input_toler');
const input_interac = document.getElementById('input_interac');
// ^^^^^ Opções ^^^^^
const methods_select = document.getElementById('methods_select');
const input_calculate = document.getElementById('input_calculate');

// Function to draw the graph
const drawGraphic = () => {
    let width = document.getElementById('container_graphic').clientWidth;
    let height = document.getElementById('container_graphic').clientHeight;
    
    functionPlot({
        title: "Função: "+input_func.value,
        target: "#graphic",
        width,
        height,
        yAxis: { domain: [-1, 9] },
        grid: true,
        data: [
          {
            fn: input_func.value,
            derivative: {
              fn: input_deriv.value,
              updateOnMouseMove: true
            }
          }
        ]
      });

}
const baseURL = "http://localhost:8080/";

// post function
const postEstrutura = async (obj) => {
  try {
      const res = await fetch(baseURL, 
      {
          method: 'POST',
          headers: {
              "Content-Type": 'application/json'
          },
          body: JSON.stringify({
              estrutura: obj
          })
      })
      console.log('Requisição bem-sucedida');
      const data = await res.json();
      console.log(data.x);

  } catch (error) {
      console.log("Error na requisição:" + error);
  }
}
//
methods_select.addEventListener('change', (e) => {
  switch (e.target.value) {
    case 'Binomial':
      document.getElementById('noAllowed').style.display = 'none';
      // document.getElementById('input_deriv').parentNode.style.display = 'none';
      document.getElementById('input_deriv').setAttribute('placeholder', 'Opcional');
      break;

    default:
      // const nodeElements = document.getElementById('method_options').children;
      // for (let x = 0; x < 5; x++) {

      //   nodeElements[x].style.display = 'inline-block';
      //   console.log(`Node ${x+1} sucesso`)
      // }

      document.getElementById('input_deriv').setAttribute('placeholder', '');
      document.getElementById('noAllowed').style.display = 'block';
  }
})

input_calculate.addEventListener('click', () => {
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
  // Enviar os dado para o backend e receber um array da interação
  postEstrutura(estrutura);

  // Caso a requesição seja ok
  // Mostrar tabela iteração
  document.getElementById('container_iterations').style.display = 'block';
  document.getElementById('container_result').style.display = 'flex';

  // Tentar gerar o gráfico
  drawGraphic();

  // Limpar elementos options
  const nodeSpan = document.querySelectorAll('#method_options span');

  Array.from(nodeSpan).forEach((nodes) => nodes.children[1].value = '');
  document.getElementById('noAllowed').style.display = 'block';

  // -> enviar iterações

  // Verificar se grafico funciona
  // -> enviar grafico
})