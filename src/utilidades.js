export const catalogo = [
  {
    id: "1",
    nome: "Iphone 11",
    marca: "Apple",
    preco: 3499.99,
    Imagem: "iphone-11.png",
  },

  {
    id: "2",
    nome: "Iphone 12",
    marca: "Apple",
    preco: 4199.99,
    Imagem: "iphone-12.png",
  },

  {
    id: "3",
    nome: "Iphone 13",
    marca: "Apple",
    preco: 5499.99,
    Imagem: "iphone-13.png",
  },
  {
    id: "4",
    nome: "Iphone 14",
    marca: "Apple",
    preco: 5999.99,
    Imagem: "iphone-14.png",
  },
  {
    id: "5",
    nome: "Iphone 14 Max Pro",
    marca: "Apple",
    preco: 6499.99,
    Imagem: "iphone-14-max-pro.png",
  },
  {
    id: "6",
    nome: "Samsung 1",
    marca: "Samsung",
    preco: 1199.99,
    Imagem: "samsung-1.png",
  },
  {
    id: "7",
    nome: "Samsung 2",
    marca: "Samsung",
    preco: 1499.99,
    Imagem: "samsung-2.png",
  },
  {
    id: "8",
    nome: "Samsung 3",
    marca: "Samsung",
    preco: 2199.99,
    Imagem: "samsung-3.png",
  },
  {
    id: "9",
    nome: "Samsung 4",
    marca: "Samsung",
    preco: 2599.99,
    Imagem: "samsung-4.png",
  },
];

export function salvarLocalStorage(chave, informacao) {
  localStorage.setItem(chave, JSON.stringify(informacao));
}

export function lerDoLocalStorage(chave, informacao) {
  return JSON.parse(localStorage.getItem(chave));
}

export function apagarDoLocalStorage(chave) {
  localStorage.removeItem(chave);
}

export function desenharProdutoNoCarrinhoSimples(
  idProduto,
  idContainerHtml,
  quantidadeProduto
) {
  const produto = catalogo.find((p) => p.id === idProduto);

  const containerProdutosCarrinho = document.getElementById(idContainerHtml);

  const elementoArticle = document.createElement("article");
  const articleClasses = [
    "flex",
    "bg-white",
    "rounded-lg",
    "p-2",
    "relative",
    "m-2",
  ];

  for (const articleClass of articleClasses) {
    elementoArticle.classList.add(articleClass);
  }

  const cartaoProdutoCarrinho = `<img
      src="assets/img/${produto.Imagem}"
      alt="Carrnho: ${produto.nome}"
      class="h-24 rounded-lg"
    />
    <div class="p-1 flex flex-col justify-between">
      <p class="text-slate-900 text-xl">${produto.nome}</p>
      <p class="text-slate-400 text-sm">${produto.marca}</p>
      <p class="text-green-700 mt-3">$ ${produto.preco}</p>
    </div>
    <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
      <p id="quantidade-${produto.id}" class="ml-2">${quantidadeProduto}</p>
    </div>`;

  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);
}
