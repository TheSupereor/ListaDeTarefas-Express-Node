const express = require('express');
var bodyParser = require('body-parser');

const path = require('path');

const app = express();
//para que o express tenha integração com formulários precisa
//do bodyParser

app.use( bodyParser.json());  //to support JSON-encoded bodies
app.use(bodyParser.urlencoded({    // to support URL-encoded bodies
    extended:true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));

var tarefas = ['Arrumar o quarto', 'comprar café'];
//node consegue ter uma permanência de informação
//mesmo abrindo o arquivo de novo o vetor continua vazio após apagar
//os valores só voltarão novamente se reiniciar o programa pelo terminal

//bom para fazer sites e rotas
app.post('/', (req,res) =>{
    //recuperando o nome da tarefa com o body.tarefa
    tarefas.push(req.body.tarefa);
    res.render('index',{tarefasList:tarefas});
})

app.get('/',(req,res)=>{

    res.render('index',{tarefasList:tarefas});

});

app.get('/deletar/:id', (req,res)=>{
    //req é a requisição feita
    //params é o parâmetro recebido, nesse caso, o id
    //console.log(req.params.id);

    //filter retorna o elemento de um vetor se corresponder
    //à uma condição
    tarefas = tarefas.filter(function(val,index){
        if(index != req.params.id){
            return val;
        }
    })
    res.render('index', {tarefasList:tarefas});
})

app.listen(5000,()=>{
    console.log('server rodando!')
});

