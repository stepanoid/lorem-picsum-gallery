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
  items = downloadData();
}

function initialList() {
  if(container.innerHTML === '') {
    addCard(50);
    console.log('List is Empty!');
  }
}

// generate initial list of cards
initialList();

// show previous list of cards
updateList();

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

  // card upload menu:
  createUploadMenu(card);

  container.append(card);
}

function createUploadMenu(parentElement) {
  tooltip = document.createElement('div');
  tooltip.setAttribute('class', 'tooltip');
  // --resolution group
  let inputsGroup = document.createElement('div');
  inputsGroup.setAttribute('class', 'inputsGroup');
  // --W
  let labelW = document.createElement('label');
  let inputW = document.createElement('input');
  inputW.setAttribute('type', 'number');
  inputW.setAttribute('class', 'inputW');
  labelW.textContent = 'width:';
  inputW.value = 400;
  labelW.append(inputW);
  inputsGroup.append(labelW);
  // --H
  let labelH = document.createElement('label');
  let inputH = document.createElement('input');
  inputH.setAttribute('type', 'number');
  inputH.setAttribute('class', 'inputH');
  labelH.textContent = 'height:';
  inputH.value = 400;
  labelH.append(inputH);
  inputsGroup.append(labelH);
  //
  tooltip.append(inputsGroup);
  // --button
  uploadBtn = document.createElement('button');
  uploadBtn.textContent = 'copy image'
  tooltip.append(uploadBtn);

  parentElement.append(tooltip);
  // setup
  uploadBtn.addEventListener('click', (e)=>copyUrl(e.currentTarget));
}

//////////////////////////////
//////////////////////////////

function updateList() {
  items = downloadData();

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
  let currentCard = element.parentElement.parentElement;
  let imgSrc = currentCard.querySelector('img').src;
  let imgSrcUpload = `${imgSrc.slice(0, -3)}${currentCard.querySelector('.inputW').value}/${currentCard.querySelector('.inputH').value}`;
  navigator.clipboard.writeText(imgSrcUpload).then(function() {
    currentCard.querySelector('.tooltip').textContent = 'URL copied!';
    console.log('copied!');
  }).catch(function(err) {
    console.error('Could not copy text: ', err);
  });
  // revert tooltip
  setTimeout(() => {
    currentCard.querySelector('.tooltip').remove();
    createUploadMenu(currentCard);
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

add100.addEventListener('click', ()=>addCard(100));
addBtn.addEventListener('click', ()=>addCard(1));
removeBtn.addEventListener('click', removeCard);
resetBtn.addEventListener('click', resetCards);
sortName.addEventListener('click', sortCards);
