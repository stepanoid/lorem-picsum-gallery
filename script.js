const container = document.getElementById('container');
const addBtn = document.getElementById('addBtn');
const removeBtn = document.getElementById('removeBtn');
const resetBtn = document.getElementById('resetBtn');
const sortName = document.getElementById('sortNameBtn');
const add100 = document.getElementById('add100Btn');

// download database
let items = downloadData();

// check for null local storage
if(!items) {
  let emptyArray = [];
  uploadData(emptyArray);
  items = downloadData();
}

function initialList() {
  if(container.innerHTML === '') {
    addCard(50);
    // console.log('List was Empty!');
  }
}

// show previous list of cards
updateList();

// generate initial list of cards
initialList();

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

function createCard(item) {
  let card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <img src="${item.image}" alt="">
    <div class="title">${item.name} ${item.code}</div>
  `;

  createUploadMenu(card);

  container.append(card);
}

function createUploadMenu(parentElement) {
  tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');

  tooltip.innerHTML = `
    <div class="inputsGroup">
      <label>
        width:
        <input type="number" class="inputW" value="400">
      </label>
      <label>
        height:
        <input type="number" class="inputH" value="400">
      </label>
    </div>
    <button>copy image</button>
  `;

  parentElement.append(tooltip);
  // button event
  parentElement.querySelector('button').addEventListener('click', (e)=>copyUrl(e.currentTarget));
}

//////////////////////////////
//////////////////////////////

function updateList() {
  // reset old list
  container.innerHTML = '';

  // create list of cards
  for (let i = 0; i < items.length; i++) {
    createCard(items[i]);
  }
}

//////////////////////////////
//////////////////////////////

// copy url
function copyUrl(element) {
  let currentCard = element.closest('.card');
  let imgSrc = currentCard.querySelector('img').src;
  let imgSrcUpload = `${imgSrc.slice(0, -3)}${currentCard.querySelector('.inputW').value}/${currentCard.querySelector('.inputH').value}`;
  navigator.clipboard.writeText(imgSrcUpload).then(function() {
    currentCard.querySelector('.tooltip').textContent = 'URL copied!';
    // console.log('copied!');
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
