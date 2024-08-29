
let container = document.querySelector('.container');
let addBtn = document.querySelector('.addBtn');
let removeBtn = document.querySelector('.removeBtn');
let resetBtn = document.querySelector('.resetBtn');
let sortName = document.querySelector('.sortNameBtn');
let add100 = document.querySelector('.add100Btn');

// localStorage.clear();

// download database
let items = downloadData();

// check for cleared local storage
if(!items) {
  let emptyArray = [];
  uploadData(emptyArray);
}

//////////////////////////////
//////////////////////////////

function downloadData() {
  return JSON.parse(localStorage.getItem('items'));
}

function uploadData(data) {
  localStorage.setItem('items', JSON.stringify(data));
}

//////////////////////////////
//////////////////////////////

function randMinMax(min, max) {
  return ( Math.floor(Math.random()*(max-min+1)+min) );
}

function addItem() {
  let randomNumber = randMinMax(1, 10000);

  let newItem = {
    name: 'photo',
    code: randomNumber,
    image: `https://picsum.photos/seed/${randomNumber}/400`,
    date: `${randMinMax(1997, 2024)}.${randMinMax(1, 12)}.${randMinMax(1, 31)}`
  }
  items.unshift(newItem);

  uploadData(items);
}

function removeItem() {
  // delete last item
  items.pop();
  uploadData(items);
}

function resetItems() {
  // delete all items
  items = [];
  uploadData(items);
}

function sortItems() {
  // sort 123
  items.sort((a, b) => a.code - b.code);
  uploadData(items);
}

//////////////////////////////
//////////////////////////////

function createCard(i) {
  // create card
  let card = document.createElement('div');
  card.setAttribute('class', 'card');

  let newImg = document.createElement('img');
  newImg.setAttribute('src', items[i].image);
  card.append(newImg);

  let header = document.createElement('div');
  header.textContent = `${items[i].name} ${items[i].code}`;
  header.setAttribute('class', 'title');
  card.append(header);

  let tooltip = document.createElement('div');
  tooltip.setAttribute('class', 'tooltip');
  tooltip.textContent = newImg.src;
  card.append(tooltip);

  card.addEventListener('click', (e)=>copyUrl(e.currentTarget));
  container.append(card);
}

//////////////////////////////
//////////////////////////////

function updateList() {
  // reset old list
  container.innerHTML = '';

  // create list of cards
  for (let i = 0; i < items.length; i++) {
    createCard(i);
  }
}

//////////////////////////////
//////////////////////////////

// copy url
function copyUrl(element) {
  let imgSrc = element.querySelector('img').src;
  navigator.clipboard.writeText(imgSrc).then(function() {
    element.querySelector('.tooltip').textContent = 'URL copied!';
    console.log('copied!');
  }).catch(function(err) {
    console.error('Could not copy text: ', err);
  });
  // revert tooltip
  setTimeout(() => {
    element.querySelector('.tooltip').textContent = imgSrc;
  }, 1000);
}

function addCard(n) {
  for(let i = 0; i < n; i++) {
    addItem();
  }
  updateList();
}

function removeCard() {
  removeItem();
  updateList();
}

function resetCards() {
  resetItems();
  updateList();
}

function sortCards() {
  sortItems();
  updateList();
}

function initialList() {
  if(container.innerHTML === '') {
    addCard(50);
    console.log('List is Empty!');
  }
}

window.onload = function(){
  // show previous list of cards
  updateList();

  // generate initial list of cards
  initialList();
}

add100.addEventListener('click', ()=>addCard(100));
addBtn.addEventListener('click', ()=>addCard(1));
removeBtn.addEventListener('click', removeCard);
resetBtn.addEventListener('click', resetCards);
sortName.addEventListener('click', sortCards);