import { catalogo, salvarLocalStorage, lerDoLocalStorage } from "./utilidades";

const idsProdutoCarrinhoComQuantidade = lerDoLocalStorage("carrinho") ?? {};

function abrirCarrinho() {
  document.getElementById("carrinho").classList.remove("right-[-360px]");
  document.getElementById("carrinho").classList.add("right-[0px]");
}

function fecharCarrinho() {
  document.getElementById("carrinho").classList.remove("right-[0px]");
  document.getElementById("carrinho").classList.add("right-[-360px]");
}

export function incializarCarrinho() {
  const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
  const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
  const botaoIrParaCheckuot = document.getElementById("ir-para-checkout");

  botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
  botaoFecharCarrinho.addEventListener("click", fecharCarrinho);

  botaoIrParaCheckuot.addEventListener("click", irParaCheckout);
}

function removerDoCarrinho(idProduto) {
  delete idsProdutoCarrinhoComQuantidade[idProduto];
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  renderizarProdutosCarrinho();
}

function incrementarQuantidadeProduto(idProduto) {
  idsProdutoCarrinhoComQuantidade[idProduto]++;
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  atualizarInformacaoQuantidade(idProduto);
  atualizarPrecoCarrinho();
}

function decrementarQuantidadeProduto(idProduto) {
  if (idsProdutoCarrinhoComQuantidade[idProduto] === 1) {
    removerDoCarrinho(idProduto);
    return;
  }

  idsProdutoCarrinhoComQuantidade[idProduto]--;
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  atualizarInformacaoQuantidade(idProduto);
  atualizarPrecoCarrinho();
}

function atualizarInformacaoQuantidade(idProduto) {
  document.getElementById(`quantidade-${idProduto}`).innerText =
    idsProdutoCarrinhoComQuantidade[idProduto];
}

export function adicionarAoCarrinho(idProduto) {
  if (idProduto in idsProdutoCarrinhoComQuantidade) {
    incrementarQuantidadeProduto(idProduto);
    return;
  }
  idsProdutoCarrinhoComQuantidade[idProduto] = 1;
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  desenharProdutoNoCarrinho(idProduto);
  atualizarPrecoCarrinho();
}

export function renderizarProdutosCarrinho(idProduto) {
  const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");
  containerProdutosCarrinho.innerHTML = "";
  for (const idProduto in idsProdutoCarrinhoComQuantidade) {
    desenharProdutoNoCarrinho(idProduto);
  }
}

function desenharProdutoNoCarrinho(idProduto) {
  const produto = catalogo.find((p) => p.id === idProduto);

  const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");

  const elementoArticle = document.createElement("article");
  const articleClasses = [
    "flex",
    "bg-slate-100",
    "rounded-lg",
    "p-2",
    "relative",
    "mr-2",
  ];

  for (const articleClass of articleClasses) {
    elementoArticle.classList.add(articleClass);
  }

  const cartaoProdutoCarrinho = `<button id="remover-item-${produto.id}" class="top-0 absolute right-2">
      <i
        class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-900"
      ></i>
    </button>
    <img
      src="assets/img/${produto.Imagem}"
      alt="Carrnho: ${produto.nome}"
      class="h-24 rounded-lg"
    />
    <div class="p-1 flex flex-col justify-between">
      <p class="text-slate-900 text-xl">${produto.nome}</p>
      <p class="text-slate-400 text-sm">${produto.marca}</p>
      <p class="text-green-700 mt-5">$ ${produto.preco}</p>
    </div>
    <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
      <button id="decrementar-produto-${produto.id}" class="ml-2">-</button>
      <p id="quantidade-${produto.id}" class="ml-2">${idsProdutoCarrinhoComQuantidade[idProduto]}</p>
      <button id="incrementar-produto-${produto.id}" class="ml-2">+</button>
    </div>`;

  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);

  document
    .getElementById(`decrementar-produto-${produto.id}`)
    .addEventListener("click", () => decrementarQuantidadeProduto(produto.id));

  document
    .getElementById(`incrementar-produto-${produto.id}`)
    .addEventListener("click", () => incrementarQuantidadeProduto(produto.id));

  document
    .getElementById(`remover-item-${produto.id}`)
    .addEventListener("click", () => removerDoCarrinho(produto.id));
}

export function atualizarPrecoCarrinho() {
  const precoCarrinho = document.getElementById("preco-total");
  let precoTotalCarrinho = 0;
  for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade) {
    precoTotalCarrinho +=
      catalogo.find((p) => p.id === idProdutoNoCarrinho).preco *
      idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
  }
  precoCarrinho.innerText = `Total $ ${precoTotalCarrinho}`;
}

function irParaCheckout() {
  if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
    return;
  }
  window.location.href = "./checkout.html";
}
