const input_func = document.getElementById('input_func');
const input_deriv = document.getElementById('input_deriv');
const input_interval = document.getElementById('input_interval');
const input_toler = document.getElementById('input_toler');
const input_interac = document.getElementById('input_interac');
// ^^^^^ Opções ^^^^^
const methods_select = document.getElementById('methods_select');
const input_calculate = document.getElementById('input_calculate');

let globalOption;

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
              fn: input_deriv.value.length === 0 ? '0': input_deriv.value,
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
      // {
      //   iterac: k,
      //   x: x,
      //   fx: f_x,
      //   mod: b - a
      // }

      switch (globalOption) {
        case 'Binomial': 
        if (data.x === 'err') {
          document.querySelector('#container_iterations > span').innerHTML = '';
          document.querySelector('#container_iterations > span').insertAdjacentHTML('afterbegin', `<div>Não Convergiu!!</div>`);
        } else if (data.x === 'inf') {
          document.querySelector('#container_iterations > span').innerHTML = '';
          document.querySelector('#container_iterations > span').insertAdjacentHTML('afterbegin', `<div>Não Convergiu!!, INFINITO</div>`);
        } else {
          data.x.forEach(({iterac, x, fx, mod}) => {
            let HTML = `<div class="iterations"><span>x${iterac}</span> <span>${Number(x).toFixed(8)}</span> <span>${Number(fx).toFixed(8)}</span> <span>${Number(mod).toFixed(8)}</span></div>`;
  
            document.querySelector('#container_iterations > span').insertAdjacentHTML('afterbegin', HTML);
          }) 
  
        }
          break;
      }
  } catch (error) {
      document.getElementById('container_iterations').style.display = 'block';
      document.getElementById('container_result').style.display = 'flex';
      document.querySelector('#container_iterations > span').innerHTML = '';
      document.querySelector('#container_iterations > span').insertAdjacentHTML('afterbegin', `<div>Não Convergiu!!</div>`);

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
      globalOption = 'Binomial';
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
  // Enviar os dado para o backend e receber um array da interação
  postEstrutura(estrutura);
  drawGraphic();

  // Caso a requesição seja ok
  // Mostrar tabela iteração
  document.getElementById('container_iterations').style.display = 'block';
  document.getElementById('container_result').style.display = 'flex';

  // Limpar elementos options
  const nodeSpan = document.querySelectorAll('#method_options span');

  Array.from(nodeSpan).forEach((nodes) => nodes.children[1].value = '');
  document.getElementById('noAllowed').style.display = 'block';

  Array.from(methods_select.children).forEach((node) => {
    node.removeAttribute('selected')
  })
  methods_select.children[0].setAttribute('selected' ,true);
})