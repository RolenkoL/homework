export function getColumns() {

  return fetch('/api/column')
  .then(res => {
    // console.log('status', res.status) // -> 200
    // console.log('statusText', res.statusText) // -> OK
    // console.log('ok', res.ok) // -> true

    return res.ok ? res.json() : Promise.reject(res.statusText)
  })

}





