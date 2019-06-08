import { getColumns  } from
'./columns';
import { getCards, removeCard, addCard, drawCards, updateCard } from
'./cards';

Promise.all([getColumns(), getCards()])
  .then(([columns, cards]) => { 
    printColumns(columns, cards)
})

const kanbanContainer = document.getElementById("kanban");

export function printColumns(columns, cards) {
	
	for ( let i=0;i<columns.length;i++ ) {
		const divColumns = document.createElement("div");
		const h2 = document.createElement("h2");
		const containerCards = document.createElement("div");
		const addCardsIcon = document.createElement("span");

		addCardsIcon.classList.add('add-cards');
		divColumns.setAttribute('data-column-id',columns[i].id);
		divColumns.classList.add('kanban-column');

		h2.append(columns[i].title);
		divColumns.append(h2);
		divColumns.append(addCardsIcon);

		kanbanContainer.append(divColumns);

	}

	for ( let i=0;i<cards.length;i++ ) {
		drawCards( cards[i].id, cards[i].title, cards[i].columnId );
	}
	
}

kanbanContainer.addEventListener("click", getElementId);
kanbanContainer.addEventListener('focusout', getElementId);

function getElementId(e) {

	if ( e.target.matches(".delete-cards") ) {

		let cardId = e.target.closest('.kanban-card').getAttribute('data-card-id');
		removeCard(cardId);

	}
	if ( e.target.matches(".add-cards") ) {

		let cartTitle = prompt("Введите текст карточки");
		if (cartTitle && cartTitle != null) {
			let columnId = e.target.closest('.kanban-column').getAttribute('data-column-id');
			addCard(columnId, cartTitle);
		}

	}
	if ( e.target.matches("h3") ) {

		let cardId = e.target.closest('.kanban-card').getAttribute('data-card-id');
		let cardTitle = e.target.innerText;
		updateCard(cardId, cardTitle);

	}

}