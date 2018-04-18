const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(cors());

//Permite encontrar conteúdo estático
app.use(express.static(__dirname + '/public'));

//Cria entrada do banco de dados
app.get('/new/:urlToShorten(*)', (req, res, next) => {
    var { urlToShorten } = req.params;
    console.log(urlToShorten);
    return res.json({ urlToShorten });
});





//Listen to see if everything os working
//Process is for if Heroku
app.listen(process.env.PORT || 3000, () =>{
    console.log('Tudo normal :)')
});