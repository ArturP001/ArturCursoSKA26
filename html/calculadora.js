let saida = document.getElementById("calcjava");
function adicionar(valor){

    let saida = document.getElementById("calcjava");
    saida.value += valor;

}

function calcular(){
    let saida = document.getElementById("calcjava");
    saida.value = eval(saida.value);

}

function limpar(){
    let saida = document.getElementById("calcjava");
    saida.value = "";

}