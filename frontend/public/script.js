const input_func = document.getElementById('input_func');
const input_deriv = document.getElementById('input_deriv');

const drawGraphic = () => {
    let width = document.getElementById('container_graphic').clientWidth;
    let height = document.getElementById('container_graphic').clientHeight;
    functionPlot({
        title: "Gráfico",
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

input_deriv.addEventListener('change', () => drawGraphic());