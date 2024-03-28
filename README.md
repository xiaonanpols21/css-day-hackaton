# CSS Day Hackaton

Voor de Hackaton is het de bedoeling dat we in groepjes voor een opdrachtgever een project gaan maken in 4 dagen. Onze groep genaamd "Taam 2" bestaat uit:

-   Hidde
-   Max
-   Xiao nan
-   Stephan

De opdrachtgever is Krijn Hoetmer, een organisator van CSS Day. Hij heeft een json voor ons bruikbaar gemaakt om alle data van CSS Day te kunnen gebruiken. In wat we deze data gaan gebruiken worden we volledig vrijgelaten.

Ons idee is om met de data van alle sprekers van alle jaren een kaart te maken om te zien waar de sprekers vandaan komen in de wereld met extra info over de spreker.

## Schetsen

<img src="media/readme-img/schets.jpg" width="500px" alt="Schets">
<img src="media/readme-img/schets2.jpg" width="500px" alt="Schets">
<img src="media/readme-img/schets3.jpg" width="500px" alt="Schets">
<img src="media/readme-img/schets4.jpg" width="500px" alt="Schets">
<img src="media/readme-img/schets5.jpg" width="500px" alt="Schets">
<img src="media/readme-img/ideegeneratie.png" width="750px" alt="Schets">
<img src="media/readme-img/FinalSchets.png" width="750px" alt="Schets">

Data die wij gebruiken van speakers.json:

-   Name
-   Link
-   Avatar
-   Country

Misschien:

-   Title
-   Video link

Dit zijn de functionaliteiten die we willen en de persoon die hieraan gaat werken:

-   Kaart met zoom en drag mogelijkheden - Hidde
-   Pins op de kaart voor het aantal sprekers per land van dat jaar - Max en Stephan
-   Informatie over de sprekers - Max en Stephan
-   Navigatie met knoppen om het jaar te selecteren - Xiao nan

## Functies

### Hidde

**Kaart met zoom en drag mogelijkheden**

We hebben besloten dat het mooi zou zijn als de gebruiker met de kaart kan zoomen en draggen zoals bij google maps. Hidde kreeg de taak om dit te onderzoeken. Als eerste ging hij op zoek naar manieren om dit te doen, het liefst met alleen html en css. Dit bleek al snel niet mogelijk. Er moest wel javascript bij gebruikt worden. Bij chat GPT heeft hij met de prompt: "How can i make a map zoomable and dragable with only html and css" deze code gekregen:

```css
.map-container {
    overflow: hidden;
    width: 500px; /* Adjust as needed */
    height: 300px; /* Adjust as needed */
}

#map {
    width: 100%;
    transition: transform 0.25s ease;
}

#map.zoomed {
    transform: scale(1.5); /* Adjust the scale factor as needed */
    cursor: grab;
}

#map.zoomed:active {
    cursor: grabbing;
}
```

Dit werkte alleen totaal niet zoals gewenst. Je kon namelijk niet goed draggen en het leek erop dat de zoom en pan gebeurde met hover.
Uiteindelijk is het geprobeerd met js maar dit werkte nog niet goed. Uiteindelijk gaf de Github Copilot de suggestie om de D3.js libary te gebruiken omdat die een makkelijke functie heeft om kaarten te kunnen zoomen en draggen.
Toen kreeg ik met de prompt: "how can i do this with d3.js" deze code:

```javascript
document.addEventListener('DOMContentLoaded', (event) => {
    const svg = d3.select('.mapSection').append('svg').attr('width', '100%').attr('height', '100%');

    const image = svg.append('image').attr('href', 'path_to_your_image').attr('width', '100%').attr('height', '100%');

    const zoom = d3
        .zoom()
        .scaleExtent([0.5, 4]) // This controls the min and max zoom levels
        .on('zoom', function () {
            image.attr('transform', d3.event.transform);
        });

    svg.call(zoom);
});
```

Samen met een beetje styling in de css is het gelukt om de kaart te zoomen en te draggen.

Helaas hebben we uiteindelijk besloten deze functie anders uit te voeren omdat het met geen mogelijkheid wilde werken met onze code die de pins op de kaart genereerd. Die schaalden niet mee met het zoomen en draggen.

**Lijstje met sprekers per land sluiten**

Voor nu hadden we het werkend dat je een lijstje te zien kreeg die de sprekers van dat land en dat jaar liet zien. Het werkte met een radio button dus als je een andere selecteerde sloot de eerste lijst. Dit werkte goed, alleen wilde we ook een manier om de lijst te sluiten zonder een ander land te selecteren. Een close button dus. Ook wilde we dat je overal op de kaart kan klikken om de lijst te sluiten. Hier ben ik mee begonnen. Mijn eerste idee was een Div die over de hele pagina gaat. Wanneer er op de div geklikt wordt worden alle radio buttons unchecked. Omdat ik niet wilde dat het voor andere klikbare elementen stond zette ik de div op een display: none. Zo wilde ik de display op block zetten wanneer een lijst geopend stond. Dit wilde niet goed werken. Toen besefte ik mijn dat ik met z-index natuurlijk gewoon de positionering goed kan zetten. Ik zette de div tussen de kaart en de pins. Zo kan je nog steeds een andere pin selecteren maar ook de div erachter om de lijst te sluiten. 

Hier maak ik met javascript de div .fullPageDiv aan:

```javascript
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
```
Daarvoor heb ik al de function deselectRadioButtons(); aangemaakt:
```javascript
function deselectRadioButtons() {
  // Get all radio buttons with the name "countrySelector"
  const radioButtons = document.querySelectorAll(
    'input[type="radio"][name="countrySelector"]'
  );
  console.log("functie aangeroepen");
  // Deselect all radio buttons
  radioButtons.forEach(function (radioButton) {
    radioButton.checked = false;
  });
}
```

Deze functie kan ik later ook gaan gebruiken voor een close knop in de lijst.

### Stephan

**Tooltips**

Ik heb eraan gewerkt om de pins van elk land te stylen. Terwijl Max bezig was met het maken van de script om per jaar de sprekers in te laden, kon ik alvast beginnen met het plaatsen van elke pin. We willen ook dat de pins de vlag van het land hebben als achtergrond.

Uiteindelijk hoe de HTML wordt ingeladen ziet er zo uit:

```html
<div>
    <label class="NO">
        <input type="radio" name="countrySelector">
    </label>

    <ul class="tooltip NO hidden">
        <ul>
            <li><a target="blank_" href="https://cssday.nl/2018/speakers#ida-aalen">Ida Aalen</a></li>
            <li><img src="https://cssday.nl/_img/2018/speakers/ida.jpg">
            </li>
        </ul>
        <ul>
            <li><a target="blank_" href="https://cssday.nl/2017/programme#howcome">Håkon Wium Lie</a></li>
            <li><img src="https://cssday.nl/_img/2017/speakers/hakon-wium-lie.jpg"></li>
        </ul>
    </ul>
</div>
```

Er wordt dus een div gemaakt met daarin een label en een UL. De ```label``` wordt de pin en de ```ul``` wordt de tooltip. In die tooltip zitten nog meer ```ul``` voor elk persoon die wordt toegevoegd. De class naam ```NO``` is in dit geval de landcode. Deze heb ik nodig om dat via CSS te positioneren. 

```css
.NO {
    left: 900px;
    top: 240px;
    background-image: var(--NO);
    background-size: cover;
}
```

Voor elke landcode class heb ik een left en top toegevoegd om die zo een plek te geven op de kaart. Voor de ```background-image``` zie je dat ik een CSS variable gebruik. Ik heb die eerst gedeclareerd in de ```:root```:

```css
    /* country flags */
    --US: url('../assets/flags/us.svg');
    --ES: url('../assets/flags/es.svg');
    --NL: url('../assets/flags/nl.svg');
    --CA: url('../assets/flags/ca.svg');
    --DE: url('../assets/flags/de.svg');
    --UK: url('../assets/flags/uk.svg');
    --FR: url('../assets/flags/fr.svg');
    --LB: url('../assets/flags/lb.svg');
    --AT: url('../assets/flags/at.svg');
    --PT: url('../assets/flags/pt.svg');
    --IL: url('../assets/flags/il.svg');
    --SE: url('../assets/flags/se.svg');
    --LU: url('../assets/flags/lu.svg');
    --JP: url('../assets/flags/jp.svg');
    --NO: url('../assets/flags/no.svg');
    --NG: url('../assets/flags/ng.svg');
    --GR: url('../assets/flags/gr.svg');
    --RO: url('../assets/flags/ro.svg');
    --SG: url('../assets/flags/sg.svg');
    --BE: url('../assets/flags/be.svg');
```

**Informatietekst**

Om ervoor te zorgen dat mensen die de website gebruiken wel begrijpen wat de bedoeling is, hebben we een introtekst toegevoegd. We willen ook dat je dat weg kan klikken zodat het niet de hele tijd in beeld zit. 

```html
<div class="introContainer">
    <label>
        <input tabindex='1' type="checkbox" checked />
    </label>
    <section class="introText">
        <h2>The speakers and where they're from</h2>
        <p>On this website you can see every speaker of CSS day and where they're from! To see speakers, click on a year using the menu to see the pins. Click on a pin to see each speaker with a link to their CSS day page!</p>
    </section>
</div>
```

In de HTML heb ik een div met een label en een section gemaakt. Ik gebruik een checkbox input zodat je twee states hebt: aan en uit. Hiermee kan ik de section laten zien en verbergen.

```css
.introContainer {
    display: flex;
    flex-wrap: wrap;
    position: fixed;
    right: -21em;
    /* top: 1em; */
    margin: 1em;
    /* align-items: center; */

    transition: 1s;
    z-index: 1;

    input {
        opacity: 0;
    }

    label {
        background-color: white;
        outline: solid 1px black;
        background-image: url(../img/arrow-down.svg);
        background-position: center;
        background-repeat: no-repeat;
        background-size: 50%;
        transform: rotate(90deg);
        color: white;
        display: flex;
        width: 2em;
        height: 2em;
        margin: 0 1em 1em 0;
        border-radius: 100%;
        align-items: center;
        justify-content: center;

        &:hover {
            cursor: pointer;
            background-color: #ccc;
        }

        &:has(input:focus-visible) {
            outline: solid 6px lime;
        }
    }

    &:has(input:checked) {
        right: 0;

        .introText {
            opacity: 1;
        }

        label {
            transform: rotate(-90deg);
        }
    }

    .introText {
        background-color: white;
        max-width: 20em;
        padding: 1em;
        opacity: 0;
        border-radius: 6px;
        outline: solid black 3px;
        transition: 1s;
        z-index: 200;
    }
}
```

Dus standaard staat de ```.introContainer``` op een right van -21em. Dit is buiten beeld. Met has kan ik checken of de checkbox is gecheckt, en als dat zo is: zet de right op 0. Daarnaast heb ik nog een beetje styling toegevoegd voor het pijltje dat dan ook veranderd van richting als je de intro tekst open en dicht klapt.

**Focus states**

Om het nog meer toegankelijk te maken heb ik ook nog focus states aan alle interacteerbare elementen gegeven. Op deze manier kan je de website gebruiken zonder de muis. Omdat de meeste interacteerbare elementen inputs zijn terwijl de label de styling moet krijgen, moet ik dit trucje gebruiken:

```css
label:has(input:focus) {
    outline: solid var(--tooltip-outline-color) 12px;
    z-index: 1;
    scale: 1.2;
}
```

Met ```:has()``` kan ik checken of de input is gefocust en op basis daarvan geef ik een styling aan de label.

### Xiao Nan
**Buttons stylen**
In de HTML hebben we voor de buttons een input gebruikt zodat je makkelijk de active style kan toevoegen:
```html
<ul>
    <li>
        <label>
            <p>Show all</p>
            <input type="radio" name="years" value="Show all" />
        </label>
    </li>
    <li>
        <label>
            <p>2024</p>
            <input type="radio" name="years" value="2024" />
        </label>
    </li>
    <li>
        <label>
            <p>2023</p>
            <input type="radio" name="years" value="2023" />
        </label>
    </li>
</ul>
```

De button background-color komt uit de data van heet jaar. De kleuren wordt opgehaald uit de data en in een variable gezet. Dan worden de kleuren toegevoegd aan de properties in de CSS om de juiste kleur te krijgen. 
```js
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
```

**Intro animatie**
Animatie begin scherm wordt toegevoegd. Dan met JavaScript wordt de animatie verwijdert na 3.5 sec. 

```js
function hideElement() {
  animationContainer.style.display = 'none';
  main.classList.remove("main-animation");

}
setTimeout(hideElement, 3500);
```

**No JavaScript**
Wanneer er geen JavaScript is, dan werkt de hele site niet. Maar dan is het wel mooi om te laten zien dat de JavaScript aan moet staat. Dus dan is er een waat moet je doen lijst voor Chrome, FireFox en Safari. 

```html
<section>
    <h3>Chrome</h3>
    <ol>
        <li>Open Chrome DevTools.</li>
        <li>Depending on your operating system, press one of the following: On Window or Linux, Control + Shift + P. On MacOS, Command + Shift + P. The Command Menu opens.</li>
        <li>Start typing javascript , select Disable JavaScript, and then press Enter to run the command. JavaScript is now disabled.</li>
    </ol>
</section>
```

### Max
**Navigatie met knoppen om het jaar te selecteren**

## Inleiding
Deze code is ontwikkeld om een interactieve webpagina te creëren waarbij gebruikers informatie kunnen bekijken over sprekers van een evenement, gesorteerd op land en jaar van de editie. Het biedt functionaliteiten zoals het filteren van sprekers per land en editiejaar, en het in- en uitzoomen op een wereldkaart.

## Hoofdfunctionaliteiten
1. Selectie van het Jaar
Wat Het Doet: De code begint met het toevoegen van een klik-eventlistener aan elk "jaar selectie"-knop. Wanneer een gebruiker op een van deze knoppen klikt, voert de code verschillende acties uit afhankelijk van de keuze van de gebruiker.
Hoe Het Werkt: Als de gebruiker kiest voor "Toon alles", past de code de stijl van de webpagina aan (zoals de achtergrondkleur) en toont een wereldkaart. Vervolgens genereert het dynamisch een lijst van landen met bijbehorende sprekers. Als een specifiek jaar wordt gekozen, filtert de code de sprekers op basis van dat jaar en past het de kleurstijlen dienovereenkomstig aan.
2. Weergave van Sprekers
Wat Het Doet: Voor elk land worden sprekers weergegeven in een gestructureerde lijst, inclusief hun namen, foto's en links naar meer informatie.
Hoe Het Werkt: De code maakt gebruik van HTML-elementen zoals <div>, <label>, <input>, en <ul> om een overzichtelijke structuur op te bouwen. Sprekers worden gefilterd op land of op jaar en land, afhankelijk van de selectie van de gebruiker.
3. In- en Uitzoomen op de Wereldkaart
Wat Het Doet: Gebruikers kunnen in- en uitzoomen op de wereldkaart om een beter overzicht te krijgen.
Hoe Het Werkt: Twee knoppen, voor inzoomen en uitzoomen, passen de schaal van de wereldkaart aan. De code beperkt de schaalverandering tot een specifiek bereik om te voorkomen dat gebruikers te ver in- of uitzoomen.
## Technische Details
Variabelen en Selectors: De code gebruikt JavaScript-selectors zoals document.querySelector en document.getElementById om specifieke HTML-elementen in de code te vinden en te manipuleren.
Event Listeners: Door het gebruik van event listeners kan de pagina reageren op gebruikersacties zonder de pagina te hoeven herladen.
Dynamische Element Creatie: De code creëert dynamisch HTML-elementen gebaseerd op de data van de sprekers. Dit maakt het makkelijker om de inhoud te updaten of aan te passen.

```
yearSelectorButtons.forEach(button =>{
  button.addEventListener('click', function() {
    const speakerSection = document.querySelector('.speakerSection');
    speakerSection.innerHTML = '<img class="kaart" src="./assets/img/world-map.svg">';

    if (button.innerText == "Show all"){
      document.documentElement.style.setProperty('--tooltip-outline-color', '#000');

      document.documentElement.style.setProperty('--background-color', '#ccc');
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
              <li><a target='blank_' href="${speakerPerCountry.link}">${speakerPerCountry.name}</a></li>
              <li><img src="${speakerPerCountry.avatar}"</li>
              </ul>`
        });
      })
    } else{
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
           <li><a target='blank_' href="${speakerPerCountry.link}">${speakerPerCountry.name}</a></li>
           <li><img src="${speakerPerCountry.avatar}"</li>
           </ul>`
       });
       
       });
    }
  });
});


// ZOOM IN AND OUT FUNCTION
const zoomInButton = document.getElementById('zoomInMap')
const zoomOutButton = document.getElementById('zoomOutMap')
let scale = 1; // Initial scale

zoomInButton.addEventListener('click', function(){
  scale += 0.3; // Increase the scale
  if (scale >= 3){
    document.documentElement.style.setProperty('--zoom-in-button-color', 'rgba(51, 24, 77, 0.5)');
    document.documentElement.style.setProperty('--zoom-in-cursor', 'not-allowed');
    scale = 3;
  } else{
    document.documentElement.style.setProperty('--zoom-out-button-color', 'rgba(51, 24, 77, 1)');
    document.documentElement.style.setProperty('--zoom-out-cursor', 'pointer');
  }
  speakerSection.style.transform = `scale(${scale})`; // Apply the scale
});

zoomOutButton.addEventListener('click', function(){
  scale -= 0.3; // Decrease the scale
  if(scale <= 1){
    scale = 1;
    document.documentElement.style.setProperty('--zoom-out-button-color', 'rgba(51, 24, 77, 0.5)');
    document.documentElement.style.setProperty('--zoom-out-cursor', 'not-allowed');
  } else{
    document.documentElement.style.setProperty('--zoom-in-button-color', 'rgba(51, 24, 77, 1)');
    document.documentElement.style.setProperty('--zoom-in-cursor', 'pointer');
  }
  speakerSection.style.transform = `scale(${scale})`; // Apply the scale
});
```


## Bronnen

-   https://nl.vecteezy.com/vector-kunst/10158602-wereldkaart-achtergrond-grijze-kleur-met-nationale-grenzen
