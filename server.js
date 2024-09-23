const express = require('express'); // To run localHost
const Mexp = require('math-expression-evaluator'); // To evaluate math expressions
const app = express();
const port = 8080;
const mexp = new Mexp();

// Functions
class Metodo {
    constructor(estrutura) {
        this.estrutura = estrutura;
    }

    binomial() {
        const arr = [];

        const {funcao, intervalo, tolerancia, iteracoesM} = this.estrutura.opcoes;
        const a = intervalo[0];
        const b = intervalo[1];
        // Variável Função: funcao, Intervalo: intervalo, Tolerância: tolerancia, Iterações Max: iteracoesM, Intervalo: [a, b]

        arr.push(funcao)
        return {x: [funcao, intervalo, tolerancia, iteracoesM]};
        // return this.estrutura.opcoes.funcao
    }
}

//
app.use(express.json()); // Parses the incoming JSON requests 

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/frontend/index.html"); // Send index.html file to server
});

app.post('/', (req, res) => {
    const {estrutura} = req.body;
    const metodo = new Metodo(estrutura);

    try {
        switch (estrutura.tipo) {
        case 'Binomial':
            res.status(200).json(metodo.binomial());
        }

    } catch (error) {
        res.status(400);
        console.log(error);
    }
    
    // try {
    //     if (/(x)/.test(estrutura)) {
    //         result = estrutura;
    //         res.status(200).json({result: result});
    //         console.log(`Servidor retornou: ${result}`);

    //     } else {
    //         result = estrutura; // mexp.eval(textFunc)
    //         res.status(200).json({result: result});
    //         console.log(`Servidor retornou: ${result}`);
    //     }

    // } catch (error) {
    //     res.status(400).json({result: "Sintaxe incorreta!"});
    //     console.log(`Sintaxe incorreta!`);
    // }
})



// app.post() -> Handle post requisitions

app.use('/assets', express.static(__dirname + "/frontend/public"));

app.listen(port, () => console.log("Server running on localhost:8080")); // Create server

