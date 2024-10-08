const express = require('express'); // To run localHost
const app = express();
const port = 8080;
const {Metodo} = require('./frontend/public/functions'); // functions
app.use(express.json()); // Parses the incoming JSON requests 

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/frontend/index.html"); // Send index.html file to server
});

app.post('/', (req, res) => { // Send result of iteration
    const {estrutura} = req.body;
    const metodo = new Metodo(estrutura);

    try {
        switch (estrutura.tipo) {
        case 'Bissecao':
            res.status(200).json({x: metodo.bissecao()});
            break;
        case 'FalsaPos':
            res.status(200).json({x: metodo.falsa_pos()});
            break;
        case 'NewtonRaph':
            res.status(200).json({x: metodo.Newton_Raphson()});
            break;
        case 'Secante':
            res.status(200).json({x: metodo.Secante()})
            break;
        }
    } catch (error) {
        res.status(400);
        console.log(error);
    }
})

app.use('/assets', express.static(__dirname + "/frontend/public"));

app.listen(port, () => console.log("Server running on localhost:8080")); // Create server

