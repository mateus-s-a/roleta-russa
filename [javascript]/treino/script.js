let soma = 10 + 3;
let multi = 7 * 3;

console.log(`${soma}\n${multi}\n${multi - soma}`);

/* ------------------------------------------------- */

let string = "Olá";
let int = 5;
let float = 0.5;
let bool = true;

console.log((bool) ? string : int);

/* ------------------------------------------------- */

if (bool)
    console.log("Verdade");
else
    console.log("Falsa");

/* ------------------------------------------------- */

let num1 = 5;
let num2 = 7;

function somar() {
    return num1 + num2;
}

console.log(num1, "+", num2, "=", somar());

/* ------------------------------------------------- */

let nome = prompt("Qual seu nome?");

function mostrarNome() {
    (nome) ? console.log("Bem-vindo", nome) : console.log("Por favor, digite seu nome");
}
mostrarNome();

/* ------------------------------------------------- */
// DOM
function mudarTexto() {
    const texto = document.querySelector("#mensagem");

    texto.innerHTML = "Texto alterado."
    texto.style.color = "red";
}

function mudarInput() {
    const input_text = document.querySelector("#input_texto").value;
    const paragrafo = document.querySelector("#paragrafo");

    paragrafo.innerHTML = input_text;
}

function mudarCor() {
    const paragrafo_bg = document.querySelector("#paragrafo");

    paragrafo_bg.style.backgroundColor = "yellow";
}