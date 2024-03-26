// Animation Set Time Out
const myElement = document.querySelector('.container');

function hideElement() {
  myElement.style.display = 'none';
}
setTimeout(hideElement, 5500);

// FETCHES DATA OF THE CSSDAY SPEAKERS
let cssDaySpeakers;

async function fetchSpeakers() {
  try {
    const response = await fetch('https://cssday.nl/data/speakers.json');
    const data = await response.json();
    cssDaySpeakers = data;

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
      console.log(`Set ${property} to ${colorHex}`);
    }


  } catch (error) {
    console.error('Error:', error);
  }
}
fetchSpeakers();

const yearSelectorButtons = document.querySelector('nav').querySelectorAll('ul li');
const body = document.querySelector("body");

yearSelectorButtons.forEach(button =>{
  button.addEventListener('click', function() {
    const speakerSection = document.querySelector('.speakerSection');
    speakerSection.innerHTML = '';
    let speakersForYear;
    
    if (button.innerText == "Show all"){
      speakersForYear = cssDaySpeakers;
      body.classList.add("bg-color")

    } else {
      speakersForYear = cssDaySpeakers.filter(speaker => speaker.edition.year === parseInt(button.innerText)); // wijzig de waarde van speakersForYear hier
    }
    
    speakersForYear.forEach(speaker => {
      speakerSection.innerHTML += 
        `<ul>
        <li><a href="${speaker.link}">${speaker.name}</a></li>
        <li><img src="${speaker.avatar}"</li>
        </ul>
        `
    });
  });
});
