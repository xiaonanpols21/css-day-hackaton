// Animation Set Time Out
const animationContainer = document.querySelector('.container');

function hideElement() {
  animationContainer.style.display = 'none';
  main.classList.remove("main-animation");

}
setTimeout(hideElement, 5500);

// FETCHES DATA OF THE CSSDAY SPEAKERS
let cssDaySpeakers;

// CREATE A SET TO ADD UNIQUE COUNTRIES
let uniqueCountries = new Set()

// GETS THE SPEAKERSECTION
const speakerSection = document.querySelector('.speakerSection');


async function fetchSpeakers() {
  try {
    const response = await fetch('https://cssday.nl/data/speakers.json');
    const data = await response.json();
    cssDaySpeakers = data;

    // ADD COUNTRIES TO THE SET
    cssDaySpeakers.forEach(speaker => uniqueCountries.add(speaker.country));
    // Get the colors of the years
    const colorsByYear = {};
    data.forEach(speaker => {
      const colorHex = speaker.edition.color.hex;
      const year = speaker.edition.year;

      if (!colorsByYear[year]) {
        colorsByYear[year] = colorHex;
      }
    });

    // Set background colors for each year
    for (const [year, colorHex] of Object.entries(colorsByYear)) {
      const property = `--btn-${year}`;
      document.documentElement.style.setProperty(property, colorHex);
    }


  } catch (error) {
    console.error('Error:', error);
  }
}
fetchSpeakers();

const yearSelectorButtons = document.querySelector('nav').querySelectorAll('ul li');
const body = document.querySelector("body");
const main = document.querySelector("main");
main.classList.add("main-animation");

yearSelectorButtons.forEach(button =>{
  button.addEventListener('click', function() {
    const speakerSection = document.querySelector('.speakerSection');
    speakerSection.innerHTML = '<img class="kaart" src="./assets/img/world-map.svg">';

    if (button.innerText == "Show all"){
      document.documentElement.style.setProperty('--tooltip-outline-color', '#000');

      body.classList.add("bg-color")
      main.classList.remove("main-animation");

      uniqueCountries.forEach(country => {
        // CREATES DIV FOR THE COUNTRY
        const countryDiv = document.createElement('div');

        // ADDS THE COUNTRY DIV TO THE SPEAKERSECTION
        speakerSection.appendChild(countryDiv);

        // CREATES A LABEL FOR THE COUNTRY
        const countrylabel = document.createElement('label');

        // ADDS THE CLASS OF THE COUNTRY TO THE LABEL
        countrylabel.classList.add(country);

        // CREATES INPUT FOR INSIDE THE LABEL WILL BE SET TO CHECKBOX
        const countryInput = document.createElement('input');
        countryInput.setAttribute('type', 'radio');
        countryInput.setAttribute('name', 'countrySelector');

        // ADDS INPUT TO THE LABEL
        countrylabel.appendChild(countryInput);

        // ADDS THE LABEL TO THE DIV
        countryDiv.appendChild(countrylabel);

        // CREATES UL FOR THE SPEAKERS AND ADS A CLASS
        const countryUl = document.createElement('ul');
        countryUl.classList.add(`tooltip`, `${country}`, `hidden`);

        // ADDS UL TO THE COUNTRY DIV
        countryDiv.appendChild(countryUl);

        cssDaySpeakers.filter(speaker => speaker.country === country).forEach(speakerPerCountry => {
          countryUl.innerHTML +=
              `<ul>
              <li><a href="${speakerPerCountry.link}">${speakerPerCountry.name}</a></li>
              <li><img src="${speakerPerCountry.avatar}"</li>
              </ul>`
        });
      })
    } else{
      body.classList.remove('bg-color')
      const speakersForYear = cssDaySpeakers.filter(speaker => speaker.edition.year === parseInt(button.innerText));

      // console.log(speakersForYear[0].edition.color.hex)
      document.documentElement.style.setProperty('--background-color', speakersForYear[0].edition.color.hex);
      document.documentElement.style.setProperty('--tooltip-outline-color', speakersForYear[0].edition.color.hex);
      // MAKES A LIST WITH ONLY THE COUNTRIES THAT HAVE SPEAKERS
      const countriesWithSpeakers = [...new Set(speakersForYear.map(speaker => speaker.country))];

      countriesWithSpeakers.forEach(country => {
        // CREATES DIV FOR THE COUNTRY
        const countryDiv = document.createElement('div');

        // ADDS THE COUNTRY DIV TO THE SPEAKERSECTION
        speakerSection.appendChild(countryDiv);

        // CREATES A LABEL FOR THE COUNTRY
        const countrylabel = document.createElement('label');

        // ADDS THE CLASS OF THE COUNTRY TO THE LABEL
        countrylabel.classList.add(country);

        // CREATES INPUT FOR INSIDE THE LABEL WILL BE SET TO CHECKBOX
        const countryInput = document.createElement('input');
        countryInput.setAttribute('type', 'radio');
        countryInput.setAttribute('name', 'countrySelector');

        // ADDS INPUT TO THE LABEL
        countrylabel.appendChild(countryInput);

        // ADDS THE LABEL TO THE DIV
        countryDiv.appendChild(countrylabel);

        // CREATES UL FOR THE SPEAKERS AND ADS A CLASS
        const countryUl = document.createElement('ul');
        countryUl.classList.add(`tooltip`, `${country}`, `hidden`);

        // ADDS UL TO THE COUNTRY DIV
        countryDiv.appendChild(countryUl);
    
        cssDaySpeakers.filter(speaker => speaker.edition.year === parseInt(button.textContent) && speaker.country === country).forEach(speakerPerCountry => {
           countryUl.innerHTML +=
           `<ul>
           <li><a href="${speakerPerCountry.link}">${speakerPerCountry.name}</a></li>
           <li><img src="${speakerPerCountry.avatar}"</li>
           </ul>`
       });
       
       });
    }
  });
});

// FUNCTION FOR THE SCROLLING AND ZOOMING
let initialTouchPos = null;
let initialScale = 1;

speakerSection.addEventListener('touchstart', function(e) {
    if (e.touches.length === 2) { // Check if two fingers are touching the screen
        // Calculate the initial distance between the two fingers
        initialTouchPos = getDistanceBetweenTouches(e);
        e.preventDefault();
    }
});

speakerSection.addEventListener('touchmove', function(e) {
    if (e.touches.length === 2) { // Check if two fingers are touching the screen
        // Calculate the current distance between the two fingers
        let currentTouchPos = getDistanceBetweenTouches(e);

        // Calculate the scale factor based on the initial and current distance
        let scaleChange = currentTouchPos / initialTouchPos;
        scale = initialScale * scaleChange;

        // Apply the scale factor to the section
        speakerSection.style.transform = `scale(${scale})`;
        e.preventDefault();
    }
});

speakerSection.addEventListener('touchend', function(e) {
    if (e.touches.length === 0 && initialTouchPos !== null) { // Check if no fingers are touching the screen and a zoom gesture was performed
        // Update the initial scale to the current scale
        initialScale = scale;
        initialTouchPos = null;
    }
});

function getDistanceBetweenTouches(e) {
    // Calculate the distance between the two fingers
    let xDiff = e.touches[0].clientX - e.touches[1].clientX;
    let yDiff = e.touches[0].clientY - e.touches[1].clientY;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}