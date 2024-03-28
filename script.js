// Animation Set Time Out
const myElement = document.querySelector(".container");

function hideElement() {
  myElement.style.display = "none";
  main.classList.remove("main-animation");
}
setTimeout(hideElement, 5500);

// FETCHES DATA OF THE CSSDAY SPEAKERS
let cssDaySpeakers;

// CREATE A SET TO ADD UNIQUE COUNTRIES
let uniqueCountries = new Set();

async function fetchSpeakers() {
  try {
    const response = await fetch("https://cssday.nl/data/speakers.json");
    const data = await response.json();
    cssDaySpeakers = data;

    // ADD COUNTRIES TO THE SET
    cssDaySpeakers.forEach((speaker) => uniqueCountries.add(speaker.country));
    // Get the colors of the years
    const colorsByYear = {};
    data.forEach((speaker) => {
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
    console.error("Error:", error);
  }
}
fetchSpeakers();

const yearSelectorButtons = document
  .querySelector("nav")
  .querySelectorAll("ul li");
const body = document.querySelector("body");
const main = document.querySelector("main");
main.classList.add("main-animation");

yearSelectorButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const speakerSection = document.querySelector(".speakerSection");
    speakerSection.innerHTML = '<img class="kaart" src="./assets/img/world-map.svg">';

    if (button.innerText == "Show all") {
      document.documentElement.style.setProperty("--tooltip-outline-color", "#000");

      body.classList.add("bg-color");
      main.classList.remove("main-animation");

      uniqueCountries.forEach((country, index) => {
        // CREATES DIV FOR THE COUNTRY
        const countryDiv = document.createElement("div");

        // ADDS THE COUNTRY DIV TO THE SPEAKERSECTION
        speakerSection.appendChild(countryDiv);

        // CREATES A LABEL FOR THE COUNTRY
        const countrylabel = document.createElement("label");

        // ADDS THE CLASS OF THE COUNTRY TO THE LABEL
        countrylabel.classList.add(country);

        // CREATES INPUT FOR INSIDE THE LABEL WILL BE SET TO CHECKBOX
        const countryInput = document.createElement("input");
        countryInput.setAttribute("type", "radio");
        countryInput.setAttribute("name", "countrySelector");

        // ADDS INPUT TO THE LABEL
        countrylabel.appendChild(countryInput);

        // ADDS THE LABEL TO THE DIV
        countryDiv.appendChild(countrylabel);

        // CREATES UL FOR THE SPEAKERS AND ADS A CLASS
        const countryUl = document.createElement("ul");
        countryUl.classList.add(`tooltip`, `${country}`, `hidden`);
        
        
        // ADDS UL TO THE COUNTRY DIV
        countryDiv.appendChild(countryUl);

      
        cssDaySpeakers
          .filter((speaker) => speaker.country === country)
          .forEach((speakerPerCountry) => {
            countryUl.innerHTML += `<ul>
              <li><a href="${speakerPerCountry.link}">${speakerPerCountry.name}</a></li>
              <li><img src="${speakerPerCountry.avatar}"</li>
              </ul>`;
          });
        
      });

    } else {
      body.classList.remove("bg-color");
      const speakersForYear = cssDaySpeakers.filter(
        (speaker) => speaker.edition.year === parseInt(button.innerText)
      );

      document.documentElement.style.setProperty(
        "--background-color",
        speakersForYear[0].edition.color.hex
      );
      document.documentElement.style.setProperty(
        "--tooltip-outline-color",
        speakersForYear[0].edition.color.hex
      );
      // MAKES A LIST WITH ONLY THE COUNTRIES THAT HAVE SPEAKERS
      const countriesWithSpeakers = [
        ...new Set(speakersForYear.map((speaker) => speaker.country)),
      ];

      countriesWithSpeakers.forEach((country) => {
        // CREATES DIV FOR THE COUNTRY
        const countryDiv = document.createElement("div");

        // ADDS THE COUNTRY DIV TO THE SPEAKERSECTION
        speakerSection.appendChild(countryDiv);

        // CREATES A LABEL FOR THE COUNTRY
        const countrylabel = document.createElement("label");

        // ADDS THE CLASS OF THE COUNTRY TO THE LABEL
        countrylabel.classList.add(country);

        // CREATES INPUT FOR INSIDE THE LABEL WILL BE SET TO CHECKBOX
        const countryInput = document.createElement("input");
        countryInput.setAttribute("type", "radio");
        countryInput.setAttribute("name", "countrySelector");

        // ADDS INPUT TO THE LABEL
        countrylabel.appendChild(countryInput);

        // ADDS THE LABEL TO THE DIV
        countryDiv.appendChild(countrylabel);


        // ADDS UL TO THE COUNTRY DIV
        countryDiv.appendChild(countryUl);

        cssDaySpeakers
          .filter(
            (speaker) =>
              speaker.edition.year === parseInt(button.textContent) &&
              speaker.country === country
          )
          .forEach((speakerPerCountry) => {
            countryUl.innerHTML += `<ul>
           <li><a href="${speakerPerCountry.link}">${speakerPerCountry.name}</a></li>
           <li><img src="${speakerPerCountry.avatar}"</li>
           </ul>`;
          });
      });
    }
  });

});

// CLOSE ALL SPEAKERLISTS
function deselectRadioButtons() {
  // Get all radio buttons with the name "countrySelector"
  const radioButtons = document.querySelectorAll(
    'input[type="radio"][name="countrySelector"]'
  );
  // Deselect all radio buttons
  radioButtons.forEach(function (radioButton) {
    radioButton.checked = false;
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  // Create a new div
  const fullPageDiv = document.createElement("div");
  fullPageDiv.setAttribute("class", "fullPageDiv");

  // Add a click event listener to the div
  fullPageDiv.addEventListener("click", function () {
    deselectRadioButtons();
  });

  // Append the div to the body
  document.body.appendChild(fullPageDiv);

  
});

