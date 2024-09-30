# Projeto de métodos de resolução de equações não lineares
Esse projeto foi criado como avaliação de Cálculo Numérico e foi criado por: [Felipe Vieira de Oliveira](https://github.com/FelipeVieira9) (Criou o site) e [Pedro Giovanni Ventura](https://github.com/PedroVentura21) (Responsável pelos metodos das equações não lineares e auxiliou na criação do site). 

## Apresentação do projeto
![Imagem de como é o site](/imagens_readme/imagem1.png)

É disponibilizado 4 métodos: Bisseção, Falsa Posição, Newton-Raphson e Secante. As entradas devem ser na forma como é apresentado nos placeholders.

Foi utilizado o ambiente node.js com os módulos express, para a criação do servidor local e mathjs para calcular as expressões, exigindo que as entradas sejam como: sin(x), cos(x), log(x) para ln(x), entre outros. Foi utilizado regex para a parte de log(x) para que seja do formato brasileiro, então agora a entrada entende ln(x) como ln(x) e log(x) como log(x).

## Processo para rodar o site:
É necessário a instalação do [node.js](https://nodejs.org/pt), após instalado, escolha uma pasta e faça em um terminal ```git clone``` desse repositório, depois na mesma pasta faça ```node server.js``` para criar um servidor local na porta 8080, agora escolha um navegador qualquer e coloque na barra de pesquisa http://localhost:8080/