
// Esconder y aparecer sección de botones de tema de seccion "inactiva"
const chooseThemeButton = document.getElementById("theme-button")
console.log(chooseThemeButton)

const ghostSection = document.getElementById("inactive-buttons-container")
console.log(ghostSection);

chooseThemeButton.addEventListener("click", () => {
    if (ghostSection.style.display == "none") {
        ghostSection.style.display = "flex"
    } else {
        ghostSection.style.display = "none"
    }
})

// cambiar los temas al dar clic en cada uno de los botones de la seccion "inactiva"
const theme = document.querySelector("[data-theme]")
console.log(theme)

buttonThemeNight = document.getElementById("sailor-night");
buttonThemeNight.addEventListener("click", () => {
    theme.setAttribute("data-theme", "sailor-night")
    localStorage.setItem("[data-theme]", "sailor-night" )
})

buttonThemeDay = document.getElementById("sailor-day");
buttonThemeDay.addEventListener("click", () => {
    theme.setAttribute("data-theme", "sailor-day")
    localStorage.setItem("[data-theme]", "sailor-day" )
})
//localStorage.getItem('themes') == 'sNight' ? sailorNightMode() : sailorDayMode();


// Generar palabras sugeridas en la barra de busqueda (AUTOCOMPLETE)

searchBarAutocomplete = () => {
    const url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apikey}&q=${search.value}`;
    console.log(url);
    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((searchOptions) => {
            console.log(searchOptions)
            autoCompleteContainer = document.getElementById("search-autocomplete");
            autoCompleteContainer.innerHTML = "";
            if (searchOptions.data.length >= 3) {
                for (let index = 0; index < 3; index++) {
                    suggestionBox = document.createElement("div");
                    suggestion = document.createElement("h2");
                    suggestion.innerHTML = searchOptions.data[index].name;
                    suggestion.addEventListener("click", (event) => {
                        search.value = event.target.innerHTML;
                        autoCompleteContainer.innerHTML = "";
                    });
                    suggestionBox.appendChild(suggestion);
                    autoCompleteContainer.appendChild(suggestionBox);
                }
            } else {
                for (let index = 0; index < searchOptions.data.length - 1; index++) {
                    suggestionBox = document.createElement("div");
                    suggestion = document.createElement("h2");
                    suggestion.innerHTML = searchOptions.data[index].name;
                    suggestion.addEventListener("click", (event) => {
                        search.value = event.target.innerHTML;
                        autoCompleteContainer.innerHTML = "";
                    });
                    suggestionBox.appendChild(suggestion);
                    autoCompleteContainer.appendChild(suggestionBox);
                }
            }

        })
}

search = document.getElementById("search-bar");
search.addEventListener("keyup", searchBarAutocomplete)


//Traer gifs de manera aleatoria para los cuatro contenedores de sección "hoy te sugerimos"
// Haciendo uso del endpoint random

let apikey = "EnYSsYnOhpKgMtC1eGY5F3cm5mm4DWTS";  //Clave para usar los endpoints de giphy

setRandom = () => {
    // Funcion para recorrer el arreglo creado
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${apikey}&tag=&rating=g`;
    for (let index = 0; index < 4; index++) {
        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((gifsGihpy) => {
                console.log(gifsGihpy)
                createRandomGif(gifsGihpy);  // Funcion de creación de contenedores, en esta linea le llevo el gif al contenedor
            })
    }
}

setRandom();


// Crear contenedores con gif para sección de "Hoy te sugerimos"
createRandomGif = (gif) => {
    const sectionContainer = document.getElementById("today-options");
    const parentGifContainer = document.createElement("div");
    parentGifContainer.setAttribute("class", "nice-api-gifs-container");
    const headerGif = document.createElement("div");
    headerGif.setAttribute("class", "header-gif");
    const gifContainerTitle = document.createElement("div");
    const gifTitle = document.createElement("h2");
    gifTitle.textContent = gif.data.title;
    const closeGifContainer = document.createElement("div");
    closeGifContainer.setAttribute("class", "close-gif");
    const gifClose = document.createElement("h2");
    gifClose.innerHTML = "x";
    const apiGif = document.createElement("div");
    apiGif.setAttribute("class", "api-gif");
    const imgGif = document.createElement("img");
    imgGif.setAttribute("class", "gif");
    imgGif.src = gif.data.images.original.url;
    const gifButton = document.createElement("button");
    gifButton.setAttribute("class", "button-inside-gif");
    gifButton.innerHTML = "Ver mas...";

    gifContainerTitle.appendChild(gifTitle);
    closeGifContainer.appendChild(gifClose);
    headerGif.appendChild(gifContainerTitle);
    headerGif.appendChild(closeGifContainer);

    apiGif.appendChild(imgGif);
    apiGif.appendChild(gifButton);

    parentGifContainer.appendChild(headerGif);
    parentGifContainer.appendChild(apiGif);
    sectionContainer.appendChild(parentGifContainer);
}


//Traer gifs de tendencias para todos los contenedores de sección "tendencias"
// Haciendo uso del endpoint trending


setTrending = () => {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=25&rating=g`;
    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((gifsGihpy) => {
            //console.log(gifsGihpy.data)
            createTrendingGif(gifsGihpy.data)
        })
}

//Acomodar los gifs en los contenedores de trends
createTrendingGif = (gifs) => {
    const gridSection = document.getElementById("trends-gif-grid-container");
    for (let index = 0; index < gifs.length - 1; index++){
        const sectionContainer=document.createElement("div");
        sectionContainer.setAttribute("id",`trends-options${index}`);
        sectionContainer.setAttribute("class", "trends-options")
        console.log(sectionContainer)
        const parentGifContainer = document.createElement("div");
        parentGifContainer.setAttribute("class", "trends-nice-api-gifs-container");

        //const apiGif = document.createElement("div");
        //apiGif.setAttribute("class", "trends-api-gif");
        const imgGif = document.createElement("img");
        imgGif.setAttribute("class", "gif");
        imgGif.src = gifs[index].images.original.url;

        const footerGif = document.createElement("div");
        footerGif.setAttribute("class", "footer-gif");
        const gifFooter = document.createElement("h2");
        gifFooter.textContent = gifs[index].title;

        footerGif.appendChild(gifFooter);
        parentGifContainer.appendChild(imgGif);
        //parentGifContainer.appendChild(apiGif);
        parentGifContainer.appendChild(footerGif);
        sectionContainer.appendChild(parentGifContainer);
        gridSection.appendChild(sectionContainer);
    }

}

setTrending();