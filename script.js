// FETCHES DATA OF THE CSSDAY SPEAKERS
let cssDaySpeakers;

// CREATE A SET TO ADD UNIQUE COUNTRIES
let uniqueCountries = new Set()

async function fetchSpeakers() {
  try {
    const response = await fetch('https://cssday.nl/data/speakers.json');
    const data = await response.json();
    cssDaySpeakers = data;

    // ADD COUNTRIES TO THE SET
    cssDaySpeakers.forEach(speaker => uniqueCountries.add(speaker.country));

  } catch (error) {
    console.error('Error:', error);
  }
}

fetchSpeakers();

const yearSelectorButtons = document.querySelector('nav').querySelectorAll('ul li');

yearSelectorButtons.forEach(button =>{
  button.addEventListener('click', function() {
    const speakerSection = document.querySelector('.speakerSection');
    speakerSection.innerHTML = '';

    if (button.innerText == "Show all"){
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
      const speakersForYear = cssDaySpeakers.filter(speaker => speaker.edition.year === parseInt(button.innerText));
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
