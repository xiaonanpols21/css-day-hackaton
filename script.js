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
        // console.log(element.country);
    });
});


const yearSelectorButtons = document.querySelector('nav').querySelectorAll('ul li');

yearSelectorButtons.forEach(button =>{
  button.addEventListener('click', function() {
    console.log(button.innerText);
  });
});

console.log(yearSelectorButtons);