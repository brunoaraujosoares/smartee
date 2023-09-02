import {
  desenharProdutoNoCarrinhoSimples,
  lerDoLocalStorage,
  salvarLocalStorage,
  apagarDoLocalStorage,
} from "./src/utilidades";

function desenharProdutosCheckout() {
  const idsProdutoCarrinhoComQuantidade = lerDoLocalStorage("carrinho") ?? {};
  for (const idProduto in idsProdutoCarrinhoComQuantidade) {
    desenharProdutoNoCarrinhoSimples(
      idProduto,
      "container-produtos-checkout",
      idsProdutoCarrinhoComQuantidade[idProduto]
    );
  }
}

function finalizarCompra(evento) {
  const idsProdutoCarrinhoComQuantidade = lerDoLocalStorage("carrinho") ?? {};
  if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
    return;
  }
  evento.preventDefault();
  const dataAtual = new Date();
  const pedidoFeito = {
    dataPedido: dataAtual,
    pedido: idsProdutoCarrinhoComQuantidade,
  };

  const historicoDePedidos = lerDoLocalStorage("historico") ?? [];
  const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];
  salvarLocalStorage("historico", historicoDePedidosAtualizado);

  apagarDoLocalStorage("carrinho");

  window.location.href = "./pedidos.html";
}
desenharProdutosCheckout();

document.addEventListener("submit", (e) => finalizarCompra(e));
