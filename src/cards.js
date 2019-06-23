export function getCards() {

  return fetch('/api/card')
  .then(res => {
    return res.ok ? res.json() : Promise.reject(res.statusText)
  })

}

export function drawCard(cardId, cardTitle, columnId) {

	const parentColumn = document.querySelector(`div[data-column-id='${columnId}']`);

	const divCards = document.createElement("div");
	const h3 = document.createElement("h3");
	const deleteCardIcon = document.createElement("span");

	h3.setAttribute('contenteditable','true');
	deleteCardIcon.classList.add('delete-cards');
	divCards.setAttribute('data-card-id',cardId);
	divCards.classList.add('kanban-card');
	divCards.setAttribute('draggable','true');
	
	h3.append(cardTitle);
	divCards.append(h3);
	divCards.append(deleteCardIcon);
	parentColumn.append(divCards);
			
}

export function removeCard(elementId) {

	fetch(`/api/card/${elementId}`,{
      method: 'DELETE'})
	.then(res => {return res.ok})
	.then(() => { removeCardFromUI(elementId) })

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
	.then(data => { drawCard(data.id, data.title, data.columnId); })

}


export function updateCard(cardId, cartTitle, columnId) {
	let myBody;

	if (cartTitle) {
		myBody = {
		  "title": cartTitle
		}
	} else {
		myBody = {
		  "columnId": columnId
		}
	}
	

	fetch(`/api/card/${cardId}`, {
      mode: 'cors',
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, body: JSON.stringify(myBody) })
	.then(res => { return res.ok ? res.json() : Promise.reject(res.statusText) })
	
}

