const botaoLogin = document.getElementById("buttom__logar");

if (botaoLogin) {
    botaoLogin.addEventListener("click", (event) => {
        event.preventDefault();
        logarUsuario();
    });
}

function logarUsuario() {
    const emailDigitado = document.getElementById("email").value;
    const senhaDigitada = document.getElementById("senha").value;

    const usuarioSalvo = JSON.parse(localStorage.getItem("usuarioCadastrado"));

    if (!usuarioSalvo) {
        alert("Nenhum usuário cadastrado. Faça o cadastro primeiro.");
        return;
    }

    if (emailDigitado === usuarioSalvo.email && senhaDigitada === usuarioSalvo.senha) {
        alert("Login realizado com sucesso!");
    
       
        const dadosCompletos = JSON.parse(localStorage.getItem("dadosCompletosUsuario"));
    
        localStorage.setItem("usuarioLogado", JSON.stringify(dadosCompletos));
    
        window.location.href = "card.html";
    }
}

const dados = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!dados) {
  alert("Nenhum usuário logado.");
} else {
  document.getElementById("usuarioNome").textContent = dados.nome || "";
  document.getElementById("usuarioCpf").textContent = dados.cpf || "";
  document.getElementById("usuarioEmail").textContent = dados.email || "";
  document.getElementById("usuarioData").textContent = dados.nascimento || "";
  document.getElementById("usuarioTel").textContent = dados.telefone || "";
  document.getElementById("usuarioCep").textContent = dados.cep || "";
  document.getElementById("usuarioRua").textContent = dados.rua || "";
  document.getElementById("usuarioCidade").textContent = dados.cidade || "";
  document.getElementById("usuarioNum").textContent = dados.numero || "";
  document.getElementById("usuarioEstado").textContent = dados.estado || "";
  document.getElementById("usuarioTrilha").textContent = dados.trilha || "";
  document.getElementById("usuarioSexo").textContent = dados.sexo || "";
}