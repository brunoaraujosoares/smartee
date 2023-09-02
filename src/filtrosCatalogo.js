const catalogoProdutos = document.getElementById("container-produto");

function esconderApple() {
  exibirTodos();
  const produtosMasculinos = Array.from(
    catalogoProdutos.getElementsByClassName("Apple")
  );

  for (const produto of produtosMasculinos) {
    produto.classList.add("hidden");
  }
}

function esconderSamsung() {
  exibirTodos();
  const produtosMasculinos = Array.from(
    catalogoProdutos.getElementsByClassName("Samsung")
  );

  for (const produto of produtosMasculinos) {
    produto.classList.add("hidden");
  }
}

function exibirTodos() {
  const produtosEscondidos = Array.from(
    catalogoProdutos.getElementsByClassName("hidden")
  );

  for (const produto of produtosEscondidos) {
    produto.classList.remove("hidden");
  }
}

export function inicializarFiltros() {
  document
    .getElementById("exibir-Samsung")
    .addEventListener("click", esconderApple);
  document
    .getElementById("exibir-Apple")
    .addEventListener("click", esconderSamsung);
  document
    .getElementById("exibir-todos")
    .addEventListener("click", exibirTodos);
}
