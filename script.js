// FETCHES DATA OF THE CSSDAY SPEAKERS
let cssDaySpeakers;

async function fetchSpeakers() {
  try {
    const response = await fetch("https://cssday.nl/data/speakers.json");
    const data = await response.json();
    cssDaySpeakers = data;
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchSpeakers();

const yearSelectorButtons = document
  .querySelector("nav")
  .querySelectorAll("ul li");

yearSelectorButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const speakerSection = document.querySelector(".speakerSection");
    speakerSection.innerHTML = "";
    let speakersForYear;

    if (button.innerText == "Show all") {
      speakersForYear = cssDaySpeakers;
    } else {
      speakersForYear = cssDaySpeakers.filter(
        (speaker) => speaker.edition.year === parseInt(button.innerText)
      ); // wijzig de waarde van speakersForYear hier
    }

    speakersForYear.forEach((speaker) => {
      speakerSection.innerHTML += `<ul>
        <li><a href="${speaker.link}">${speaker.name}</a></li>
        <li><img src="${speaker.avatar}"</li>
        </ul>
        `;
    });
  });
});

// MAP ZOOM AND DRAG

document.addEventListener("DOMContentLoaded", (event) => {
  const svg = d3
    .select(".mapSection")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

  const image = svg
    .append("image")
    .attr("href", "./assets/img/world-map.svg")
    .attr("width", "100%")
    .attr("height", "100%");

  const zoom = d3
    .zoom()
    .scaleExtent([1, 10]) // This controls the min and max zoom levels
    .on("zoom", function () {
      image.attr("transform", d3.event.transform);
    });

  svg.call(zoom);
});
// ------------------------------------------------------------
