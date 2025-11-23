let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];
 
// Função para filtrar e renderizar os cards
function iniciarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarCards(dadosFiltrados);
}
 
// Função para criar e exibir os cards na tela
function renderizarCards(dadosParaRenderizar) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes
    if (dadosParaRenderizar.length === 0) {
        cardContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
    }

    for (const dado of dadosParaRenderizar) { 
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.data_criacao}</p>
            <p>${dado.descricao}</p> 
            <a href="${dado.link}" target="_blank">Saiba mais</a>`;

        cardContainer.appendChild(article);
    }
}

// Função para buscar os dados do JSON e iniciar a aplicação
async function carregarDados() {
    try { 
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados); // Exibe todos os cards assim que os dados são carregados
    } catch (error) {
        console.error("Falha ao buscar dados:", error);
        cardContainer.innerHTML = "<p>Houve um erro ao carregar as informações.</p>";
    }
}

// Chama a função para carregar os dados quando a página é carregada
carregarDados();
