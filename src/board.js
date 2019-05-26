import { getColumns } from
'./columns';
import { getCards, removeCard, addCard } from
'./cards';

const kanbanContainer = document.getElementById("kanban");

export function printColumns() {
	const columns = getColumns();
	const cards = getCards();
	
	for ( let i=0;i<columns.length;i++ ) {
		const divColumns = document.createElement("div");
		const h2 = document.createElement("h2");
		const containerCards = document.createElement("div");
		const addCardsIcon = document.createElement("span");

		addCardsIcon.classList.add('add-cards');
		divColumns.setAttribute('data-column-id',columns[i].id);
		h2.append(columns[i].title);
		divColumns.append(h2);
		divColumns.append(addCardsIcon);

		for ( let j=0;j<cards.length;j++ ) {

			if ( +cards[j].column === +columns[i].id ) {

				const divCards = document.createElement("div");
				const h3 = document.createElement("h3");
				const deleteCardsIcon = document.createElement("span");

				deleteCardsIcon.classList.add('delete-cards');
				divCards.setAttribute('data-card-id',cards[j].id);
				divCards.classList.add('kanban-card');
				
				h3.append(cards[j].title);
				divCards.append(h3);
				divCards.append(deleteCardsIcon);
				divColumns.append(divCards);
			}

		}

		kanbanContainer.append(divColumns);
	}
}

kanbanContainer.addEventListener("click", removeCard);
kanbanContainer.addEventListener("click", addCard);
