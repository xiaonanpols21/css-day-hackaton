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
<img src="media/readme-img/ideegeneratie.png" width="500px" alt="Schets">
<img src="media/readme-img/FinalSchets.png" width="500px" alt="Schets">

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

**Navigatie met knoppen om het jaar te selecteren**

### Max

## Bronnen

-   https://nl.vecteezy.com/vector-kunst/10158602-wereldkaart-achtergrond-grijze-kleur-met-nationale-grenzen
