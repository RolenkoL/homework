import { getColumns  } from
'./columns';
import { getCards, removeCard, addCard, drawCard, updateCard } from
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
		drawCard( cards[i].id, cards[i].title, cards[i].columnId );
	}
}

kanbanContainer.addEventListener("click", getElementId);
kanbanContainer.addEventListener("focusout", getElementEdit);
kanbanContainer.addEventListener("dragstart", onDragStart);
kanbanContainer.addEventListener('dragover', onDragover);
kanbanContainer.addEventListener('drop', onDrop);


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
}

function getElementEdit(e) {
	if ( e.target.matches("h3") ) {
		let cardId = e.target.closest('.kanban-card').getAttribute('data-card-id');
		let cardTitle = e.target.innerText;
		updateCard(cardId, cardTitle);
	}
}

function onDrop(ev) {
	if ( ev.target.matches(".kanban-column") ) {
		console.log('drop');
		let cardId = ev.dataTransfer.getData("cardId");
		let card = document.querySelector(`[data-card-id='${cardId}']`);

		ev.preventDefault();
		ev.target.append(card);
		updateCard(cardId, '', ev.target.dataset.columnId)
	}
}

function onDragover(ev) {
    ev.preventDefault();
}

function onDragStart(ev) {
	ev.dataTransfer.setData("cardId", ev.target.dataset.cardId);
}

