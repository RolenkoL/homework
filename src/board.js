import { getColumns } from
'./columns';
import { getCards } from
'./cards';

const kanbanContainer = document.getElementById("kanban");

export function printColumns() {
	const columns = getColumns();
	const cards = getCards();
	
	for ( let i=0;i<columns.length;i++ ) {
		const divColumns = document.createElement("div");
		const h2 = document.createElement("h2");

		divColumns.setAttribute('data-column-id',columns[i].id);
		h2.append(columns[i].title);
		divColumns.append(h2);

		for ( let j=0;j<cards.length;j++ ) {

			const divCards = document.createElement("div");
			divCards.setAttribute('data-column-id',cards[j].id);
			divCards.setAttribute('class','kanban-card');
			const h3 = document.createElement("h3");

			h3.append(cards[j].title);
			divCards.append(h3);

			if ( cards[j].column === columns[i].id ) {
				divColumns.append(divCards);
			}

		}

		kanbanContainer.append(divColumns);
	}
}
// export function printCards() {
// 	const cards = getCards();

// 	for ( let i=0;i<cards.length;i++ ) {
// 		const divCards = document.createElement("div");
// 		divCards.setAttribute('data-column-id',cards[i].id);
// 		divCards.setAttribute('class','kanban-card');
// 		const h3 = document.createElement("h3");

// 		h3.append(cards[i].title);
// 		divCards.append(h3);
// 		kanbanContainer.append(divCards);
// 	}
// }