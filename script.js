// HAALT DE DATA OP VAN DE CSSDAY SPREKERS
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
        console.log(element.name);
        console.log(element.link);
        console.log(element.avatar);
        console.log(element.country);
    });
//   console.log(cssDaySpeakers);
});