// Enviar grafico
export const drawGraphic = () => {
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

// Enviar dados para iteracao
export const postEstrutura = async (obj, globalOption) => {
    const baseURL = "http://localhost:8080/";
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
  
        switch (globalOption) {
          case 'Bissecao': 
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