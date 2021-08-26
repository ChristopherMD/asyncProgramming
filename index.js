// URL variable
const urlBase = 'https://api.punkapi.com/v2/beers?page=';

// pages variables
const pageText = document.getElementById('pageNumber');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
let page = 1;

// IBU filter
const filterIBU = document.getElementById('filterIBU');
let optionsIBU = '';

//  IBU filters
filterIBU.addEventListener('change', (e) => {
  const value = e.target.value;

  switch (value) {
    case 'all':
      optionsIBU = '';
      break;
    case 'weak':
      optionsIBU = '&ibu_lt=35';
      break;
    case 'medium':
      optionsIBU = '&ibu_gt=34&ibu_lt=75';
      break;
    case 'strong':
      optionsIBU = '&ibu_gt=74';
      break;
  }
  page = 1;
  getBeers();
});

// ABV filter
const filterABV = document.getElementById('filterABV');
let optionsABV = '';

// ABV filters
filterABV.addEventListener('change', (e) => {
  const value = e.target.value;

  switch (value) {
    case 'all':
      optionsABV = '';
      break;
    case 'weak':
      optionsABV = '&abv_lt=4.6';
      break;
    case 'medium':
      optionsABV = '&abv_gt=4.5&abv_lt=7.6';
      break;
    case 'strong':
      optionsABV = '&abv_gt=7.5';
      break;
  }
  page = 1;
  getBeers();
});

async function getBeers() {
  const url = urlBase + page + optionsABV + optionsIBU; // var + '&' + concantinates filters
  console.log(url);
  // fetch
  const beerPromise = await fetch(url);
  const beers = await beerPromise.json();

  // pagination
  pageText.innerText = page;

  if (page === 1) {
    prevPage.disabled = true;
  } else {
    prevPage.disabled = false;
  }

  if (beers.length < 25) {
    nextPage.disabled = true;
  } else {
    nextPage.disabled = false;
  }

  // render data
  const beersDiv = document.querySelector('.beers');

  let beerHtml = '';

  const genericBottle =
    'https://cdn.pixabay.com/photo/2014/12/22/00/04/bottle-576717_960_720.png'; // generic bottle image incase one doesn't exist.

  // Fill in the blanks with the rest of the data

  beers.forEach((beer) => {
    beerHtml += `
        <div class='beer-wrapper card'>
            <div class='beer'>
                <img class='beer_img' src="${
                  beer.image_url ? beer.image_url : genericBottle
                }">
                <h3>${beer.name}</h3>
                <span class='beer_info'>
                    <span>ABV: ${beer.abv}%</span>
                    <span>IBU: ${beer.ibu}</span>
                </span>
            </div>
            <div class='beer_content'>
                <div class='beer_name'>${beer.name}</div>
                <div class='beer_tagline'>${beer.tagline}</div>
                <div class='beer_description'>${beer.description}</div>
                <div class='beer_food-pairing'>
                    Pair with: ${beer.food_pairing.join(', ')}
                </div>
            </div>
        </div>
       `;
  });

  beersDiv.innerHTML = beerHtml;
}

// pagination
prevPage.addEventListener('click', () => {
  page--;
  getBeers();
});

nextPage.addEventListener('click', () => {
  page++;
  getBeers();
});

// initial get
getBeers();
