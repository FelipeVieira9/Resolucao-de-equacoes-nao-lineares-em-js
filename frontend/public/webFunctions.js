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

// Enviar grafico
export const drawGraphic = () => {
    let width = document.getElementById('container_graphic').clientWidth;
    let height = document.getElementById('container_graphic').clientHeight;
    
    document.getElementById('graphic').innerHTML = '';

    let formatfunc = formStrGraph(input_func.value)
    console.log(`Valor Recebido pelo gráfico: ${formatfunc}`);

    functionPlot({
        title: "Função: " + input_func.value,
        target: "#graphic",
        width,
        height,
        yAxis: { domain: [-1, 9] },
        grid: true,
        data: [
          {
            fn: formatfunc,
            derivative: {
              fn: input_deriv.value.length === 0 ? '0': input_deriv.value,
              updateOnMouseMove: true
            }
          }
        ]
      });
      console.log(`Gráfico Desenhado`);
}

// Enviar dados para iteracao
export const postEstrutura = async (obj, globalOption, func) => {
    const baseURL = "http://localhost:8080/";
    console.log(`Envio dos dados para o backend...`);
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
        const data = await res.json();
        
        console.log(`Valor Recebido pelo backend: ${JSON.stringify(data.x)}`)
        console.log('Requisição bem-sucedida, enviando nodes do resultado');
  
        switch (globalOption) {
          case 'Bissecao': 
          document.getElementById('tipo_metodo').textContent = "Bisseção - Iteração";
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
          case 'FalsaPos':
            document.getElementById('tipo_metodo').textContent = "Falsa Pos - Iteração";
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

            case 'NewtonRaph':
              document.getElementById('tipo_metodo').textContent = "Newton - Iteração";
              if (data.x === 'err') {
                document.querySelector('#container_iterations > span').innerHTML = '';
                document.querySelector('#container_iterations > span').insertAdjacentHTML('afterbegin', `<div>Não Convergiu!!</div>`);
              } else if (data.x === 'inf') {
                document.querySelector('#container_iterations > span').innerHTML = '';
                document.querySelector('#container_iterations > span').insertAdjacentHTML('afterbegin', `<div>Não Convergiu!!, INFINITO</div>`);
              } else {
                // console.log(data.x);
                data.x.forEach(({iterac, x, fx, mod}) => {
                  let HTML = `<div class="iterations"><span>x${iterac}</span> <span>${Number(x).toFixed(8)}</span> <span>${Number(fx).toFixed(8)}</span> <span>${Number(mod).toFixed(8)}</span></div>`;
                  
                  document.querySelector('#container_iterations > span').insertAdjacentHTML('afterbegin', HTML);
                }) 
              }
              break;

              case 'Secante':
              document.getElementById('tipo_metodo').textContent = "Secante - Iteração";
              if (data.x === 'err') {
                document.querySelector('#container_iterations > span').innerHTML = '';
                document.querySelector('#container_iterations > span').insertAdjacentHTML('afterbegin', `<div>Não Convergiu!!</div>`);
              } else if (data.x === 'inf') {
                document.querySelector('#container_iterations > span').innerHTML = '';
                document.querySelector('#container_iterations > span').insertAdjacentHTML('afterbegin', `<div>Não Convergiu!!, INFINITO</div>`);
              } else {
                // console.log(data.x);
                data.x.forEach(({iterac, x, fx, mod}) => {
                  let HTML = `<div class="iterations"><span>x${iterac}</span> <span>${Number(x).toFixed(8)}</span> <span>${Number(fx).toFixed(8)}</span> <span>${Number(mod).toFixed(8)}</span></div>`;
                  
                  document.querySelector('#container_iterations > span').insertAdjacentHTML('afterbegin', HTML);
                }) 
              }
              break;
        }
        const {iterac, x, fx, mod, a, b} = data.x[data.x.length - 1];
       
        let HTML = `<div id="iterations">${globalOption} - (${func}) - [${Number(a).toFixed(3)}, ${Number(b).toFixed(3)}] = ${Number(x).toFixed(3)}</div><hr>`
        document.querySelector('#history_itens').insertAdjacentHTML('beforeend', HTML);
        console.log('Nodes enviados, função terminou');
    } catch (error) {
        document.getElementById('container_iterations').style.display = 'block';
        document.getElementById('container_result').style.display = 'flex';
        document.querySelector('#container_iterations > span').innerHTML = '';
        document.querySelector('#container_iterations > span').insertAdjacentHTML('afterbegin', `<div>Não Convergiu!!</div>`);
  
        console.log("Error na requisição:" + error);
    }
  }