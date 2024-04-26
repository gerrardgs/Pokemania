const pokemonSearch = document.getElementById("pokemon-search").value;
const previousButton = document.getElementById("previous-button");
// const nextButton = document.getElementById("next-button");
// const buttonSearch = document.getElementById("searchQuerySubmit");

function fetchPokemon(endpoint) {
  const loader = document.getElementById("loader");
  loader.classList.remove("loader-hidden");
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const pokemonArray = data.results;
      // const nextUrl = data.next;
      // const previousUrl = data.previous;

      // document.getElementById("previous-button").style.visibility = previousUrl
      //   ? "visible"
      //   : "hidden";
      // document.getElementById("next-button").style.visibility = nextUrl
      //   ? "visible"
      //   : "hidden";

      // previousButton.setAttribute("data-url", previousUrl);
      // nextButton.setAttribute("data-url", nextUrl);

      return Promise.all(
        pokemonArray.map((pokemon) =>
          fetch(pokemon.url).then((result) => result.json())
        )
      );
    })
    .then((pokemonDetails) => {
      showCards(pokemonDetails);
      loader.classList.add("loader-hidden");
    })
    .catch((error) => {
      console.error("Terjadi masalah ketika mengambil data API: ", error);
      loader.classList.add("loader-hidden");
    });
}

function showCards(pokemonArray) {
  const pokemonData = document.getElementById("pokemon-list");
  pokemonData.innerHTML = "";
  pokemonArray.forEach((pokemon) => {
    let id = pokemon.id;
    let img = pokemon.sprites.front_default;
    let name = pokemon.name;
    let type = pokemon.types.map((type) => type.type.name);
    // console.log(type);
    const link = document.createElement("a");
    link.href = `detailPokemon.html?id=${id}`;
    link.className = "card-link";

    const card = document.createElement("div");
    card.className = "card";

    const image = document.createElement("img");
    image.src = img;
    image.alt = name;

    const container = document.createElement("div");
    container.className = "container";

    var str = "" + id;
    var pad = "000";
    var ans = pad.substring(0, pad.length - str.length) + str;

    const tag = document.createElement("span");
    tag.className = "badge";
    tag.textContent = `#${ans}`;

    const h4 = document.createElement("h4");
    h4.textContent = name;

    const typeData = document.createElement("div");
    typeData.className = "type-data";

    container.appendChild(h4);
    type.forEach((data) => {
      container.appendChild(typeData);
      const types = document.createElement("span");
      types.className = data;
      types.textContent = data;
      typeData.appendChild(types);
    });
    card.appendChild(tag);
    card.appendChild(image);
    card.appendChild(container);
    link.appendChild(card);
    pokemonData.appendChild(link);
    console.log(card);
  });
}

// previousButton.addEventListener("click", function () {
//   const url = this.getAttribute("data-url");
//   fetchPokemon(url);
// });

// nextButton.addEventListener("click", function () {
//   const url = this.getAttribute("data-url");
//   fetchPokemon(url);
// });

// function setupSearch() {
//   const inputElement = document.getElementById("pokemon-search");
//   const button = document.querySelector(".search-container button");

//   // Adding an event listener to handle the Enter key press
//   inputElement.addEventListener("keypress", function (e) {
//     if (e.key === "Enter") {
//       e.preventDefault(); // Prevent default form submission if part of a form
//       performSearch(inputElement.value); // Perform search based on the input's value
//     }
//   });

//   // Setup click event listener for the button
//   buttonSearch.addEventListener("click", function () {
//     performSearch(inputElement.value); // Perform search based on the input's value
//   });
// }

// function performSearch(query) {
//   if (query.trim() === "") return; // Optionally prevent search on empty query
//   console.log(query); // For debugging: log the query to the console
//   window.location.href = `detailPokemon.html?id=${encodeURIComponent(query)}`;
// }

// // Initialize the search functionality
// document.addEventListener("DOMContentLoaded", setupSearch);

// window.addEventListener("load", () => {
//   const loader = document.getElementById("loader");

//   loader.classList.add("loader-hidden");

//   loader.addEventListener("transitionend", () => {
//     document.body.removeChild("loader");
//   });
// });

$(document).ready(function () {
  $("#pokemon-search").keyup(function () {
    let filter = $(this).val(),
      count = 0; // Initialize count to track visible items

    // Filter through each card
    $(".container-pokemon .card-link .card").each(function () {
      // Check if the card text matches the filter using case-insensitive search
      if ($(this).text().search(new RegExp(filter, "i")) < 0) {
        $(this).fadeOut(); // Hide non-matching cards
      } else {
        $(this).show(); // Show matching cards
        count++; // Increment count for each shown card
      }
    });

    // Update the count display
    $("#filter-count").text("Number of Filter = " + count);

    // Display "Pokemon not found" message if count is 0
    if (count === 0) {
      $("#pokemon-not-found")
        .fadeIn(700)
        .text("Oooppss!! Pokemon not found")
        .show(); // Ensure this element is visible
    } else {
      $("#pokemon-not-found").fadeOut(700).hide(); // Hide the message when there are items shown
    }
  });
});

// fetchPokemon(`https://pokeapi.co/api/v2/pokemon?limit=50`);
fetchPokemon(`https://pokeapi.co/api/v2/pokemon?limit=100000`);
