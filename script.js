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
        const countryUl = document.createElement('ul');
        countryUl.classList.add(country);
        speakerSection.appendChild(countryUl);
    
        cssDaySpeakers.filter(speaker => speaker.country === country).forEach(speakerPerCountry => {
          countryUl.innerHTML +=
              `<ul>
              <li><a href="${speakerPerCountry.link}">${speakerPerCountry.name}</a></li>
              <li><img src="${speakerPerCountry.avatar}"</li>
              <li>${speakerPerCountry.country}</li>
              </ul>`
        });
      })
    } else{
      const speakersForYear = cssDaySpeakers.filter(speaker => speaker.edition.year === parseInt(button.innerText));
      // MAKES A LIST WITH ONLY THE COUNTRIES THAT HAVE SPEAKERS
      const countriesWithSpeakers = [...new Set(speakersForYear.map(speaker => speaker.country))]
      countriesWithSpeakers.forEach(country => {
       const countryUl = document.createElement('ul');
       countryUl.classList.add(country);
       speakerSection.appendChild(countryUl);
    
       cssDaySpeakers.filter(speaker => speaker.edition.year === parseInt(button.innerText)).forEach(speakerPerCountry => {
           countryUl.innerHTML +=
           `<ul>
           <li><a href="${speakerPerCountry.link}">${speakerPerCountry.name}</a></li>
           <li><img src="${speakerPerCountry.avatar}"</li>
           <li>${speakerPerCountry.country}</li>
           </ul>`
       });
       
       });
    }
  });
});
