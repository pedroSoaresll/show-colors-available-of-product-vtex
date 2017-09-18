# Mostra cores disponíveis na prateleira dos produtos | VTEX
Captura as cores disponíveis e exibe na prateleira do produto.

# Como usar
1. No método "informacoesAPI(productId)" configure o nome da sua loja na url
  1.1 http://{{nome_da_loja}}.vtexcommercestable.com.br/api/catalog_system/pub/products/search?fq=productId:'+productId
2. Aplique na elemento pai da prateleira um [data-id] com o id do produto
3. No método "adaptaCorParaListaProdutos(referenciaElemento)" passe a referencia do elemento da prateleira que contém o atributo [data-id]
4. Ainda no método "adaptaCorParaListaProdutos(referenciaElemento)" no parametro (referenciaElemento) passe a query do elemento ex: slideColorSpecificationSelection.adaptaCorParaListaProdutos('div[data-id].product')	

# Inicialização
window.addEventListener('load', () => {
  const slideColorSpecificationSelection = new SlideColorSpecificationSelection()
  slideColorSpecificationSelection.adaptaCorParaListaProdutos('div[data-id].product')	
})

# Observação
A classe irá capturar o nome das cores e buscar a imagem no path /arquivos/ correspondente. É importante que você tenha em seu "file manager" essas cores com extensão .jpg. Método responspável por esta ação é: "montaCores (cores)"
