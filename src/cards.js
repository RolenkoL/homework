export function getCards() {
	const cards = [
	  {
	    id: 15,
	    title: 'Зробити домашку',
	    column: 7,
	  },
	  {
	    id: 9,
	    title: 'Встановити Node.js',
	    column: 8,
	  },
	  {
	    id: 10,
	    title: 'Покормить кошку',
	    column: 5,
	  },
	  {
	    id: 4,
	    title: 'Полить цветы',
	    column: 8,
	  },
	  {
	    id: 11,
	    title: 'Приготовить вкусняшку',
	    column: 5,
	  },
	];


	let localStorageCards = localStorage.getItem('cards');

	if ( localStorageCards === null ) {
		let serialObj = JSON.stringify(cards);
		localStorage.setItem("cards", serialObj);
	}

	let returnObj = JSON.parse(localStorage.getItem("cards"))

	//localStorage.removeItem("cards");

	return returnObj;
}


export function removeCard(e) {
	if ( e.target.matches(".delete-cards") ) {

		let elementId = e.target.parentElement.dataset.cardId;
		e.target.parentElement.remove();
		
		let cards = getCards();

		for ( let i=0; i<cards.length; i++ ) {
			if (cards[i].id == elementId) {
				cards.splice(i, 1)
			}
		}

		let serialObj = JSON.stringify(cards);
		localStorage.setItem("cards", serialObj);
	}
}


export function addCard(e) {
	if ( e.target.matches(".add-cards") ) {

		let newCartTitle = prompt("Введите текст карточки");
		if (newCartTitle && newCartTitle != null) {

			const divCards = document.createElement("div");
			const h3 = document.createElement("h3");
			const deleteCardsIcon = document.createElement("span");

			let newCardColumnId = e.target.parentElement.dataset.columnId;

			deleteCardsIcon.classList.add('delete-cards');
			divCards.classList.add('kanban-card');
			
			h3.append(newCartTitle);
			divCards.append(h3);
			divCards.append(deleteCardsIcon);
			e.target.parentElement.append(divCards);


			let cards = getCards();
			let newCardObj = {
				id: Math.round(Math.random()*100),
				title: newCartTitle,
				column: newCardColumnId
			}
			cards.push(newCardObj);

			let serialObj = JSON.stringify(cards);
			localStorage.setItem("cards", serialObj);
		}

	}
}