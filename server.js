const express = require('express'); // To run localHost
const Mexp = require('math-expression-evaluator'); // To evaluate math expressions
const app = express();
const port = 8080;

const mexp = new Mexp();

app.use(express.json()); // Parses the incoming JSON requests 

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/frontend/index.html"); // Send index.html file to server
});

// app.post() -> Handle post requisitions

app.use('/assets', express.static(__dirname + "/frontend/public"));

app.listen(port, () => console.log("Server running on localhost:8080")); // Create server

