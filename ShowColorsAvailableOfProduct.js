class SlideColorSpecificationSelection {
	
	constructor () {
		this._elementoDataId = []
	}

	// pega as informações do produto na api da vtex
	informacoesAPI (productId) {

		// caso receber um valor falso ou algo diferente de um numero inteiro, retorna
		if (!productId && !Number.isInteger(productId)) return

		return new Promise((resolve, reject) => {

			// protocol opening
			let http = new XMLHttpRequest()
			http.open('GET', 'http://{{nome_da_loja}}.vtexcommercestable.com.br/api/catalog_system/pub/products/search?fq=productId:'+productId)

			// set headers
			http.setRequestHeader('Content-type', 'application/json')
			http.setRequestHeader('Accept', 'application/json')

			// received return data
			http.onload = () => {
				resolve(JSON.parse(http.responseText))
			}

			// send request
			http.send()

		})

	}

	// retorna as cores disponiveis do produto
	coresDisponiveis (items) {

		// array de cores capturadas para controle de cores
		let coresCapturadas = []

		// modifico e filtro o array de cores
		return items.map(item => {

			// modifico o item do array
			return item.Cor[0]

		}).filter(item => {

			// caso a cord capturada for repetida remove
			if (coresCapturadas.includes(item)) return

			// coloca no array de cores capturadas a nova cor disponivel
			coresCapturadas.push(item)
			return item // retorna a cor

		})
	}

	// monta o elemento com as imagens das cores para aplicar no elemento atual
	montaCores (cores) {

		if (!cores.length) return

		return cores.map(cor => {
			let imagemCor = new Image(30, 9)
			imagemCor.src = '/arquivos/' + cor + '.jpg'
			imagemCor.title = cor
			return imagemCor
		})
	}

	aplicaSelecaoCor (coresMontadas, elemento) {

		let divCores = document.createElement('div')
		divCores.classList.add('area-cores-produto')
		
		coresMontadas.forEach(corMontada => divCores.appendChild(corMontada))

		elemento.appendChild(divCores)
	}

	adaptaCorParaListaProdutos (referenciaElemento) {

		// pega todos os elementos do slide com [data-id]
		this._elementoDataId = document.querySelectorAll(referenciaElemento)

		if (!this._elementoDataId.length) return

		// passa em cada elemento encontrado
		this._elementoDataId.forEach(item => {

			this.informacoesAPI(item.dataset.id)
				.then(data => {
					let coresMontadas = this.montaCores(this.coresDisponiveis(data[0].items))
					this.aplicaSelecaoCor(coresMontadas, item)
				})
		})

	}

}


window.addEventListener('load', () => {
	const slideColorSpecificationSelection = new SlideColorSpecificationSelection()
	slideColorSpecificationSelection.adaptaCorParaListaProdutos('div[data-id].product')	
})
