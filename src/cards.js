export function getCards() {

  return fetch('/api/card')
  .then(res => {
    return res.ok ? res.json() : Promise.reject(res.statusText)
  })

}

export function drawCards(cardsId, cardsTitle, columnsId) {

	const parentColumn = document.querySelector(`div[data-column-id='${columnsId}']`);

	const divCards = document.createElement("div");
	const h3 = document.createElement("h3");
	const deleteCardsIcon = document.createElement("span");

	h3.setAttribute('contenteditable','true');
	deleteCardsIcon.classList.add('delete-cards');
	divCards.setAttribute('data-card-id',cardsId);
	divCards.classList.add('kanban-card');
	
	h3.append(cardsTitle);
	divCards.append(h3);
	divCards.append(deleteCardsIcon);
	parentColumn.append(divCards);
			
}

export function removeCard(elementId) {

	fetch(`/api/card/${elementId}`,{
      mode: 'cors',
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }})
	.then(res => {return res.ok ? res.json() : Promise.reject(res.statusText)})
	.then( removeCardFromUI(elementId) )

}

export function removeCardFromUI(elementId){
	document.querySelector(`[data-card-id='${elementId}']`).remove();
}

export function addCard(columnId, cartTitle) {

    let myBody = {
	  "title": cartTitle,
	  "columnId": columnId
	}
	fetch('/api/card',{
      mode: 'cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, body: JSON.stringify(myBody) })
	.then(res => { return res.ok ? res.json() : Promise.reject(res.statusText) })
	.then(data => { drawCards(data.id, data.title, data.columnId); })

}


export function updateCard(cardId, cartTitle) {

	let myBody = {
	  "title": cartTitle,
	}

	fetch(`/api/card/${cardId}`, {
      mode: 'cors',
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, body: JSON.stringify(myBody) })
	.then(res => { return res.ok ? res.json() : Promise.reject(res.statusText) })
	.then(data => {  })
	
}
