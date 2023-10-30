// variaveis
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const port = 3000;

// mongo 
mongoose.connect('mongodb://127.0.0.1:27017/revac2mia',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000,
});

const PessoaSchema = new mongoose.Schema({
    nome : {type : String},
    email : {type : String, required: true},
    endereco : {type : String},
    numero : {type : Number},
    cep : {type : String, required : true},
    nascimento : {type : Date, required : true}
})

const Pessoa = mongoose.model("Pessoa", PessoaSchema)


app.post("/cadastropessoa",async(req,res)=>{
    const nome = req.body.nome
    const email = req.body.email
    const endereco = req.body.endereco
    const numero = req.body.numero
    const cep = req.body.cep
    const nascimento = req.body.nascimento

    const pessoas = new Pessoa({
        nome : nome,
        email : email,
        endereco : endereco,
        numero : numero, 
        cep : cep,
        nascimento : nascimento
    })

    try{
        const newPessoa = await pessoas.save();
        req.json({error : null, msg: "Cadastro ok ",pessoaId : newPessoa._id})
    } catch(err) {
        res.status(400).json({err})
    }
})

app.get("/", async(req,ers)=>{
    req.sendFile(__dirname+"/indexs.html")
})

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})