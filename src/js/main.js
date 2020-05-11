myFunction = (par) => {
  console.log('Please! ', par)
}
const insertDigit = (digit) => {
  document.getElementById('new-cost').innerHTML += digit
}


addToTotal = (id) => {
  const val = parseInt(document.getElementById('cost-input').value, 10) // uzima unetu vrednost u input polje

  const categories = JSON.parse(localStorage.getItem('data')) // cita kategorije iz localStorage
  const index = categories.findIndex(category => category.id === id) // nalazi indeks u nizu trenutne kategorije
  categories[index].totalCost += val // uvecava vrednost troskova trenutne kategorije
  localStorage.setItem('data', JSON.stringify(categories)) // opet upisuje u localStorage kategorije sa izmenama
  document.querySelector('.current-cost').innerHTML = categories[index].totalCost // ispisuje novu totalnu vrednost 

  let history = JSON.parse(localStorage.getItem(`${id}History`)) // trazi u localStorage da li postoji istorija upisa za trenutnu kategoriju

  if (!history) { // ako ne postoji, onda kreira niz jer ce da se u njemu nalaze upisi za svaki unos troskova
    history = []
  }
  const historyItem = { // kreira jednu stavku troskova sa kolicinom novca i vremenom kad je napravljen unos
    amount: val,
    date: new Date().toLocaleString()
  }
  history.push(historyItem) // gura na kraj niza troskova novi element
  localStorage.setItem(`${id}History`, JSON.stringify(history)) // azurira istoriju za trenutnu kategoriju u localStorage


  //setTimeout(function(){location.href="/"} , 3000); 
  window.location = '/'
}

//  deleteItemFromLocalStorage = (id) => {
//   let removeHistory = JSON.parse(localStorage.getItem(`${id}History`))
//   if(removeHistory){
//     localStorage.removeItem(`${id}History`)
//     }
//   }



// addNewCategory = () => {
//   const categories = JSON.parse(localStorage.getItem('data'))
//   var newCat = document.createElement("div");
//   var textnode = document.createTextNode("data");
//   newCat.appendChild(textnode);
//   document.getElementById("myList").appendChild(newCat);
//   newCat.setAttribute("id", "btn_id");
//   newCat.setAttribute("class", "category-card");
//   localStorage.setItem('data', JSON.stringify(categories))
//   window.localStorage = "/create/:id"
//   // newCat.setAttribute("width", "250px");
// }




// backToCategories = () => { 
//   window.location = '/'
// }