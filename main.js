import { inicializarFiltros } from "./src/filtrosCatalogo";
import { renderizarCatalogo } from "./src/cartaoProduto";
import {
  incializarCarrinho,
  atualizarPrecoCarrinho,
  renderizarProdutosCarrinho,
} from "./src/menuCarrinho";

renderizarCatalogo();
incializarCarrinho();
renderizarProdutosCarrinho();
atualizarPrecoCarrinho();
inicializarFiltros();
