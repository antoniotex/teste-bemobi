const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const shortUrl = require('./models/shortUrl');
app.use(bodyParser.json());
app.use(cors());

//Conecta Banco de Dados
mongoose.connect('mongodb://localhost/shortUrls');

//Permite encontrar conteúdo estático
app.use(express.static(__dirname + '/public'));

//Cria entrada do banco de dados
app.get('/new/:urlToShorten(*)', (req, res, next) => {
    var { urlToShorten } = req.params;

    //Regex
    var expression =/[-a-z-A-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-z-A-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = expression;

    if(regex.test(urlToShorten)===true){
        var short = Math.floor(Math.random()*100000).toString();
        var data = new shortUrl(
            {
                originalUrl: urlToShorten,
                shorterUrl: short
            }
        );

        data.save(err => {
           if(err){
               return res.send('Erro ao salvar no banco de dados');
           }
        });

        return res.json({data});
    }
    var data = new shortUrl(
        {
            originalUrl: urlToShorten,
            shorterUrl: 'URL Invalida'
        }
    );
    return res.json({data});
});





//Listen to see if everything os working
//Process is for if Heroku
app.listen(process.env.PORT || 3000, () =>{
    console.log('Tudo normal :)')
});