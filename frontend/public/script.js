const input_func = document.getElementById('input_func');
const input_deriv = document.getElementById('input_deriv');
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
  drawGraphic();
  // Enviar os dado para o backend e receber um array da interação

  // Caso a requesição seja ok
  // Limpar elementos options
  const nodeSpan = document.querySelectorAll('#method_options span');

  Array.from(nodeSpan).forEach((nodes) => nodes.children[1].value = '');

  // -> enviar iterações

  // Verificar se grafico funciona
  // -> enviar grafico
})