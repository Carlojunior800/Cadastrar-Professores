var express = require("express");
var mongoose = require("mongoose");

const app = express();
const porta = 8000; //Local host em que a aplicação está rodando;

mongoose.connect("mongodb+srv://carlos_junior:carlos_junior@cluster0.smdgh.mongodb.net/professor?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const Professor = mongoose.model("Professor",{
    nome: String,
    idade: Number,
    materia: String,
    gostaDe: String
});

app.set("view engine", "ejs");
app.set("views", __dirname, "/views");
app.use(express.urlencoded());
app.use(express.json());

app.get("/", (req, res)=> {
    res.send("Página Inicial!");
});

app.get("/listaDeProfessores", (req, res)=> {
    let consultar = Professor.find({}, (err, professor)=>{
        console.log(consultar);
    if(err)
    return res.status(500).send("Erro ao Visualizar Professor...");
    res.render("listaDeProfessores", {professores_add: professor}); //ver se esta certo
    });

});

app.get("/cadastrarProfessor", (req,res)=>{
    res.render("formProfessor");
});

app.post("/cadastrarProfessor", (req,res)=>{
    let professor = new Professor();
    professor.nome = req.body.nome;
    professor.idade = req.body.idade;
    professor.materia = req.body.materia;
    professor.gostaDe = req.body.gostaDe;

    professor.save((err) => {
        if(err)
            return res.status(500).send("Erro ao Cadastrar...");

        return res.redirect("/listaDeProfessores");
        
    });
});
app.listen(porta, () => {
    console.log("Servidor rodando na porta " + porta);
});