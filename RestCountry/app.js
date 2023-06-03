const API = "https://restcountries.com/v3.1/all";
const cards = document.querySelector(".cards");
const body = document.querySelector('body')
const btn = document.querySelector('.btn')
const icon = document.querySelector('.btn-icon')
const select = document.querySelector('.select')
const optionList = document.querySelector('.options-list')
const options = document.querySelectorAll('.option')
const search = document.querySelector('.search')
const countryModal = document.querySelector('.country-modal')

let newData = []
async function getCountry() {
  const url = await fetch(API);
  const data = await url.json();
  newData = data
  data.forEach((item) => {
    console.log(item);
    showCountry(item)
  })
}

getCountry();

function showCountry(data) {
  const card = document.createElement('div')
  card.classList.add('card')
  card.innerHTML = `<img src="${data.flags.svg}" alt="${data.flags.alt}" />
  <div class="card-info">
    <h5 class = "countryName">${data.name.common}</h5>
    <p><strong>Population: </strong>${data.population}</p>
    <p class = "regionName"><strong>Region: </strong>${data.region}</p>
    <p><strong>Capital: </strong>${data.capital}</p>
  </div>`
  cards.appendChild(card)
  card.addEventListener('click', () => {
    showCountryDetails(data)
  })
}

function showCountryDetails(data) {
  countryModal.classList.toggle('show')

  countryModal.innerHTML = ` <div class="main-btn container">
   <button class="back">Back</button>
 </div>
 <div class="modal container">
   <div class="left-modal">
     <img src="${data.flags.svg}" alt="${data.flags.alt}">
   </div>
   <div class="right-modal">
     <h1>${data.name.common}</h1>
     <div class="right-info">
       <div class="inner-left inner">
         <p><strong>Native Name: </strong>${Object.values(data.name.nativeName)[0].common}</p>
         <p><strong>Population: </strong>${data.population}</p>
         <p><strong>Region: </strong>${data.region}</p>
         <p><strong>Sub-region: </strong>${data.subregion}</p>
       </div>
       <div class="inner-right inner">
         <p><strong>Capital: </strong>${data.capital}</p>
         <p><strong>Area: </strong>${data.area}</p>
         <p><strong>Currencies: </strong>${Object.values(data.currencies)[0].name}</p>
         <p><strong>Languages: </strong>${Object.values(data.languages)}</p>
       </div>
     </div>
   </div>
 </div>`
  const back = countryModal.querySelector('.back')
  back.addEventListener('click', () => {
    countryModal.classList.toggle('show')
  })
}


// Select Option
select.addEventListener('click', () => {
  optionList.classList.toggle('active')
  select.querySelector('.fa-angle-down').classList.toggle('fa-angle-up')
})

const regionName = document.getElementsByClassName('regionName')
options.forEach((option) => {
  option.addEventListener('click', (e) => {
    console.log(option.innerText);
    Array.from(regionName).forEach((region) => {
      if (region.innerText.includes(option.innerText) || option.innerText == 'All') {
        region.parentElement.parentElement.style.display = 'grid'
      } else {
        region.parentElement.parentElement.style.display = 'none'
      }
    })
    document.querySelector('.selected').classList.remove('selected')
    e.target.classList.add('selected')
    select.querySelector('span').innerHTML = option.innerHTML
    optionList.classList.toggle('active')
    select.querySelector('.fa-angle-down').classList.toggle('fa-angle-up')
  })
})
// Select Option

// Search Input
const countryName = document.getElementsByClassName('countryName')
search.addEventListener('input', () => {
  Array.from(countryName).forEach((name) => {
    if (name.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      name.parentElement.parentElement.style.display = 'grid'
    } else {
      name.parentElement.parentElement.style.display = 'none'
    }
  })
})
// Search Input

// Night Mode 
function store(value) {
  localStorage.setItem('darkmode', value)
}

function load() {
  const darkmode = localStorage.getItem('darkmode')
  if (darkmode == 'true') {
    body.classList.add('darkmode')
    icon.classList.add('fa-moon')
  } else if (darkmode == 'false') {
    icon.classList.add('fa-sun')
  }
}

load()

btn.addEventListener('click', () => {
  body.classList.toggle('darkmode')
  icon.classList.add('animated')

  store(body.classList.contains('darkmode'))

  if (body.classList.contains('darkmode')) {
    icon.classList.remove('fa-sun')
    icon.classList.add('fa-moon')
  } else {
    icon.classList.add('fa-sun')
    icon.classList.remove('fa-moon')
  }

  setTimeout(() => {
    icon.classList.remove('animated')
  }, 500)
})
// Night Mode
