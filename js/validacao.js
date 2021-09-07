function validarNome(nome){
    if(isNaN(nome) || nome == ""){
    alert("Nome invalido!");
    document.getElementById("nome").style.border = "red solid";
    } else {
        document.getElementById("nome").style.border = "green solid";
    }
}