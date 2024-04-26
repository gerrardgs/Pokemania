<<<<<<< HEAD
<<<<<<< HEAD
const itemsData = document.getElementById("items-list");
const itemsSearch = document.getElementById("items-search");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");

function fetchItems(endpoint) {
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const itemArray = data.results;
      const nextUrl = data.next;
      const previousUrl = data.previous;
      previousButton.setAttribute("data-url", previousUrl);
      nextButton.setAttribute("data-url", nextUrl);

      return Promise.all(
        itemArray.map((item) => fetch(item.url).then((result) => result.json()))
      );
    })
    .then((itemDetails) => {
      showCards(itemDetails);
    })
    .catch((error) => {
      console.error("Terjadi masalah ketika mengambil data API: ", error);
    });
}

function showCards(itemArray) {
  itemsData.innerHTML = "";
  itemArray.forEach((items) => {
    let id = items.id;
    let img = items.sprites.default;
    let name = items.name;
    itemsData.innerHTML += `
    <a href="detailPokemon.html?id=${id}" class="card-link">
      <div class="card">
        <img src="${img}" alt="${name}">
        <div class="container">
          <h5>${name}</h5>
        </div>
      </div>
    </a>
    `;
    console.log(items);
  });
}

previousButton.addEventListener("click", function () {
  const url = this.getAttribute("data-url");
  fetchItems(url);
});

nextButton.addEventListener("click", function () {
  const url = this.getAttribute("data-url");
  fetchItems(url);
});

function setupSearch() {
  const inputElement = document.getElementById("items-search");
}

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  loader.classList.add("loader-hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild("loader");
  });
});
fetchItems(`https://pokeapi.co/api/v2/item?limit=24`);
=======
=======
>>>>>>> ferry
// const itemsSearch = document.getElementById("items-search").value;
// const previousButton = document.getElementById("previous-button");
// const nextButton = document.getElementById("next-button");
// const buttonSearch = document.getElementById("searchQuerySubmit");

function fetchitems(endpoint) {
  const loader = document.getElementById("loader");
  loader.classList.remove("loader-hidden");
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const itemsArray = data.results;

      // console.log(itemsArray);
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
        itemsArray.map((items) =>
          fetch(items.url).then((result) => result.json())
        )
      );
    })
    .then((itemsDetails) => {
      console.log(itemsDetails);
      showCards(itemsDetails);
      loader.classList.add("loader-hidden");
    })
    .catch((error) => {
      console.error("Terjadi masalah ketika mengambil data API: ", error);
      loader.classList.add("loader-hidden");
    });
}

function showCards(itemsArray) {
  const itemsData = document.getElementById("items-list");
  itemsData.innerHTML = "";
  itemsArray.forEach((items) => {
    console.log(items);
    let id = items.id;
    let img = items.sprites.default;
    let name = items.name;
    // console.log(name);
    let category = items.category.name;
    const link = document.createElement("a");
    link.href = `detailitems.html?id=${id}`;
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

    const subMenu = document.createElement("span");
    subMenu.textContent = category;

    // const typeData = document.createElement("div");
    // typeData.className = "type-data";

    container.appendChild(h4);
    // type.forEach((data) => {
    //   container.appendChild(typeData);
    //   const types = document.createElement("span");
    //   types.className = data;
    //   types.textContent = data;
    //   typeData.appendChild(types);
    // });
    container.appendChild(subMenu);
    card.appendChild(tag);
    card.appendChild(image);
    card.appendChild(container);
    link.appendChild(card);
    itemsData.appendChild(link);
    console.log(card);
  });
}

// previousButton.addEventListener("click", function () {
//   const url = this.getAttribute("data-url");
//   fetchitems(url);
// });

// nextButton.addEventListener("click", function () {
//   const url = this.getAttribute("data-url");
//   fetchitems(url);
// });

// function setupSearch() {
//   const inputElement = document.getElementById("items-search");
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
//   window.location.href = `detailitems.html?id=${encodeURIComponent(query)}`;
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
  $("#items-search").keyup(function () {
    let filter = $(this).val(),
      count = 0; // Initialize count to track visible items

    // Filter through each card
    $(".container-items .card-link .card").each(function () {
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

    // Display "items not found" message if count is 0
    if (count === 0) {
      $("#items-not-found")
        .fadeIn(700)
        .text("Oooppss!! items not found")
        .show(); // Ensure this element is visible
    } else {
      $("#items-not-found").fadeOut(700).hide(); // Hide the message when there are items shown
    }
  });
});

// fetchitems(`https://pokeapi.co/api/v2/items?limit=50`);
// fetchitems(`https://pokeapi.co/api/v2/item?limit=100000`);
fetchitems(`https://pokeapi.co/api/v2/item?limit=1000&offset=0`);
<<<<<<< HEAD
>>>>>>> ferry
=======
>>>>>>> ferry
