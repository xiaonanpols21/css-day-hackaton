// FETCHES DATA OF THE CSSDAY SPEAKERS
let cssDaySpeakers;

async function fetchSpeakers() {
  try {
    const response = await fetch('https://cssday.nl/data/speakers.json');
    const data = await response.json();
    cssDaySpeakers = data;
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchSpeakers().then(() => {
    cssDaySpeakers.forEach(element => {
        // console.log(element.name);
        // console.log(element.link);
        // console.log(element.avatar);
        console.log(element.country);
    });
});

const yearSelectorButtons = document.querySelector('nav').querySelectorAll('ul li');

yearSelectorButtons.forEach(button =>{
  button.addEventListener('click', function() {
    const speakerSection = document.querySelector('.speakerSection');
    speakerSection.innerHTML = '';
    let speakersForYear;
    
    if (button.innerText == "Show all"){
      speakersForYear = cssDaySpeakers;
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
