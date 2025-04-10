//Botões interativos
const botao = document.getElementById("inscrever");

//Variaveis coletadas de texto ou numero 
const nome = document.getElementById("campname");
const cpf = document.getElementById("campcpf");
const email = document.getElementById("campemail");
const nascimento = document.getElementById("campdata");
const telefone = document.getElementById("campfone");
const senha = document.getElementById("campsenha");

//Validação automática por cep
const cep = document.getElementById("campcep");
const rua = document.getElementById("camprua");
const cidade = document.getElementById("campcidade");
const numero = document.getElementById("campnumerocasa");
const estado = document.getElementById("campestado");

//variaveis de selecionar
const sexo = document.getElementById("campsexo");
const checkterms = document.getElementById("termos");


cep.addEventListener("blur", () => {
    buscaCEP(cep.value);
});


botao.addEventListener("click", (event) => {
    event.preventDefault();

    if (nome.value === "") {
        alert("Por favor, preencha o seu nome.");
        return;
    }

    if (email.value === "" || !validarEmail(email.value)) {
        alert("Por favor, preencha um e-mail válido.");
        return;
    }

    if (sexo.value === "") {
        alert("Por favor, selecione uma opção de gênero");
        return;
    }

    if (cpf.value === "") {
        alert("Preencha o campo de CPF!");
        return;
    } else if (!validarCpf(cpf.value)) {
        alert("CPF inválido! Por favor, digite apenas números com 11 dígitos.");
        return;
    } else if (cpf.length < 11) {
        alert("Tamanho de CPF inválido! Por favor digite corretamente.");
        return;
    }

    if (nascimento.value === "") {
        alert("Por favor, insira sua data de nascimento!");
        return;
    } else if (!validarNascimento(nascimento.value)) {
        alert("É necessário que o candidato tenha pelo menos 16 anos de idade!");
        return;
    }

    if (telefone.value === "") {
        alert("Por favor, preencha o campo de número");
        return;
    } else if (!validarTelefone(telefone.value)) {
        alert("Número de telefone inválido. Por favor digite um número válido!")
        return;
    }

    if (cep.value === "" || !validarCep(cep.value)) {
        alert("Insira um endereço de CEP válido!");
        return;
    }

    if (estado.value === "") {
        alert("Por favor, preencha o campo de Estado");
        return;
    } else if (!validarEstado(estado.value)) {
        alert("Estado inválido! Programa trilhas somente para maranhenses");
        return;
    }

    if (cidade.value === "" || rua.value === "" || numero.value === "") {
        alert("Por favor, preencha os campos de endereço corretamente");
        return;
    }

    if (!validarTrilha()) {
        alert("Selecione uma trilha!");
        return;
    }

    if (!checkterms.checked) {
        alert("Você deve aceitar os termos de privacidade.");
        return;
    }

    if (senha.value === "") {
        alert("Por favor, insira uma senha.");
        return;
    } else if (!validarSenha(senha.value)) {
        alert("Por favor, digite uma senha de cinco a 15 caracteres sem espaços.");
        return;
    }

    alert("Formulário validado!");

    const trilhaSelecionada = document.querySelector('input[name="trilha"]:checked');
    const valorTrilha = trilhaSelecionada ? trilhaSelecionada.value : null;

    const usuarioArmazenado = {
        nome: nome.value,
        cpf: cpf.value,
        email: email.value,
        nascimento: nascimento.value,
        telefone: telefone.value,
        senha: senha.value,
        cep: cep.value,
        rua: rua.value,
        cidade: cidade.value,
        numero: numero.value,
        estado: estado.value,
        sexo: sexo.value,
        trilha: valorTrilha
    };

    const dadosLogin = {
        email: email.value,
        senha: senha.value
    };

    localStorage.setItem("dadosCompletosUsuario", JSON.stringify(usuarioArmazenado));
    localStorage.setItem("usuarioCadastrado", JSON.stringify(dadosLogin));

    //Permite que o usuário após confirmar a inscrição seja levado diretamente para a página de login
    window.location.href = "login.html";


});

//Funções de validação do intem 
function validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
        return true;
    }

    return false;
}


function validarCpf(cpf) {
    const apenasNumeros = /^[0-9]+$/;

    if (apenasNumeros.test(cpf)) {
        return true;
    }

    return false;
}

function validarNascimento(data) {

    const dataLimite = new Date('2009-12-31');
    const dataNascimento = new Date(data);

    if (dataNascimento <= dataLimite) {
        return true;
    }

    return false;
}

function validarTelefone(fone) {
    const apenasnumerostelefone = /^[0-9]+$/;

    if (apenasnumerostelefone.test(fone)) {
        return true;
    }

    return false;
}

function validarCep(cod) {
    const apenasNumerosCep = /^[0-9]+$/;

    if (apenasNumerosCep.test(cod)) {
        return true;
    }

    return false;
}

function validarEstado(states) {
    if (states.toUpperCase() === 'MA') {
        return true;
    }

    return false;
}

function validarTrilha() {
    const trilhaselecionada = document.querySelector('input[name="trilha"]:checked');

    if (trilhaselecionada !== null) {
        return true;
    }
    return false;
}

function validarSenha(senhaTexto) {
    const temEspaco = /\s/.test(senhaTexto);

    if (senhaTexto.length < 5 || senhaTexto.length > 15 || temEspaco) {
        return false;
    }

    return true;
}

//logica de preenchimento do cep de forma automatica utiliando o BrasilApi 
function buscaCEP(cepValue) {
    if (validarCep(cepValue)) {
        let url = `https://brasilapi.com.br/api/cep/v1/${cepValue}`;
        let req = new XMLHttpRequest();
        req.open("GET", url);
        req.send();

        req.onload = function () {
            if (req.status === 200) {
                let endereco = JSON.parse(req.response);
                rua.value = endereco.street || "";
                cidade.value = endereco.city || "";
                estado.value = endereco.state || "";
            } else {
                alert('CEP inválido ou não encontrado!');
            }
        };
    }
}



