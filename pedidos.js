import {
  lerDoLocalStorage,
  desenharProdutoNoCarrinhoSimples,
} from "./src/utilidades";

function criarPedidoHistorico(pedidoComData) {
  const elementoPedido = `<div class="m-2">
  <p class="text-bold my-2 bg-slate-300 rounded-xl p-3 ">Data: 
  ${new Date(pedidoComData.dataPedido).toLocaleDateString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })}</p>
    <section id="container-pedidos-${
      pedidoComData.dataPedido
    }" class="bg-slate-100 rounded-md p-3"></section>

    </div>`;
  const main = document.getElementById("main");
  main.innerHTML += elementoPedido;

  for (const idProduto in pedidoComData.pedido) {
    desenharProdutoNoCarrinhoSimples(
      idProduto,
      `container-pedidos-${pedidoComData.dataPedido}`,
      pedidoComData.pedido[idProduto]
    );
  }
}

function renderizarHistoricoPedidos() {
  const historico = lerDoLocalStorage("historico") ?? [];
  for (const pedidoComData of historico) {
    criarPedidoHistorico(pedidoComData);
  }
}
renderizarHistoricoPedidos();
