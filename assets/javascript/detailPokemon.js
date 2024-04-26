// Extract the Pokémon ID from the URL query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pokemonId = urlParams.get("id");

// Fetch details for a single Pokémon using the Pokémon ID
function fetchPokemonDetail(endpoint) {
  const loader = document.getElementById("loader");
  loader.classList.remove("loader-hidden");
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const pokemonDetail = data;
      // console.log(pokemonDetail);
      showDetail(pokemonDetail);
      showStats(pokemonDetail.stats);
      showDescription(pokemonDetail);
      showAbilities(pokemonDetail.abilities);
      showMoves(pokemonDetail.moves);
      // console.log(pokemonDetail.abilities);
      loader.classList.add("loader-hidden");
    })
    .catch((error) => {
      console.error("Terjadi masalah ketika mengambil data API: ", error);
      loader.classList.add("loader-hidden");
    });
}

function showDetail(pokemonDetail) {
  const pokemonData = document.getElementById("pokemon-detail");
  console.log(pokemonDetail);
  pokemonData.innerHTML = "";
  let id = pokemonDetail.id;
  let img = pokemonDetail.sprites.front_default;
  console.log(img);
  let name = pokemonDetail.name;
  let type = pokemonDetail.types.map((type) => type.type.name);

  const containerImage = document.createElement("div");
  containerImage.className = "card";

  const image = document.createElement("img");
  image.src = img;
  image.alt = name;

  var str = "" + id;
  var pad = "000";
  var ans = pad.substring(0, pad.length - str.length) + str;

  const tag = document.createElement("span");
  tag.className = "badge";
  tag.textContent = `#${ans}`;

  const h3 = document.createElement("h3");
  h3.textContent = name;

  const typeData = document.createElement("span");
  typeData.className = "tipe-data";

  containerImage.appendChild(tag);
  containerImage.appendChild(image);
  containerImage.appendChild(h3);
  containerImage.appendChild(typeData);
  type.forEach((data) => {
    containerImage.appendChild(typeData);
    const types = document.createElement("span");
    types.className = data;
    types.textContent = data;
    typeData.appendChild(types);
    pokemonData.appendChild(containerImage);
  });

  console.log(containerImage);
}

function showStats(pokemonStats) {
  const pokemonStatsContainer = document.getElementById("pokemon-stats");
  pokemonStatsContainer.innerHTML = "";

  const containerStat = document.createElement("div");
  containerStat.className = "container-stats";

  const title = document.createElement("h2");
  title.textContent = "Base Stats";
  containerStat.appendChild(title);

  pokemonStats.forEach((stat) => {
    const name = stat.stat.name;
    const value = stat.base_stat;

    const statsName = document.createElement("div");
    statsName.className = "info";

    const nameLabel = document.createElement("span");
    nameLabel.textContent = `${name}: ${value}`;
    statsName.appendChild(nameLabel);

    const progressBar = document.createElement("div");
    progressBar.className = "progress-line";
    progressBar.style.width = "100%"; // Full width container for progress bar

    const progress = document.createElement("div");
    progress.className = "progress";
    progress.style.backgroundColor = "#FF4136"; // Example color
    progress.style.width = `${(value / 252) * 100}%`; // Assume the stat value is the percentage
    progress.style.height = "5px";
    progress.style.borderRadius = "10px";

    progressBar.appendChild(progress);
    statsName.appendChild(progressBar);
    containerStat.appendChild(statsName);
  });

  pokemonStatsContainer.appendChild(containerStat);
}

function showDescription(pokemonDetail) {
  const pokemonDescription = document.getElementById("pokemon-ability");
  pokemonDescription.innerHTML = ""; // Clear existing contents

  let baseExperience = pokemonDetail.base_experience;
  let height = pokemonDetail.height;
  let weight = pokemonDetail.weight;
  let cries = pokemonDetail.cries.latest; // Assuming this is a URL to an audio file

  const containerDescription = document.getElementById("pokemon-description");

  const table = document.createElement("table");
  table.className = "table-data";

  // Function to create a row with a label and value
  const createRow = (label, value) => {
    const row = document.createElement("tr");
    const labelCell = document.createElement("td");
    const valueCell = document.createElement("td");
    labelCell.textContent = label;

    if (label === "Latest Cry") {
      const audio = document.createElement("audio");
      audio.controls = true; // Show play controls
      audio.volume = 0.2; // Set volume to 20%
      const source = document.createElement("source");
      source.src = value;
      source.type = "audio/mpeg"; // Set type depending on the audio format
      audio.appendChild(source);
      valueCell.appendChild(audio);
    } else {
      valueCell.textContent = value;
    }

    row.appendChild(labelCell);
    row.appendChild(valueCell);
    return row;
  };
  const title = document.createElement("h2");
  title.textContent = "Detail";
  containerDescription.appendChild(title);
  // Append rows to the table
  table.appendChild(createRow("Base Experience", baseExperience));
  table.appendChild(createRow("Height", height));
  table.appendChild(createRow("Weight", weight));
  table.appendChild(createRow("Latest Cry", cries));

  // Append the table to the description container
  containerDescription.appendChild(table);
  console.log(containerDescription);
}

function showAbilities(pokemonDetail) {
  const abilitiesContainer = document.getElementById("pokemon-ability");
  const title = document.createElement("h2");
  abilitiesContainer.appendChild(title);
  pokemonDetail.forEach((data) => {
    const endpoint = data.ability.url;
    fetch(endpoint)
      .then((response) => response.json())
      .then((result) => {
        const effectEntry = result.effect_entries.find(
          (entry) => entry.language.name === "en"
        );
        if (effectEntry) {
          title.textContent = "Description Ability";
          const titleAbility = document.createElement("h3");
          const abilityDiv = document.createElement("div");
          abilityDiv.classList.add("ability-info");
          titleAbility.textContent = data.ability.name;
          abilityDiv.textContent = effectEntry.effect; // Displaying the effect text
          abilitiesContainer.appendChild(titleAbility);
          abilitiesContainer.appendChild(abilityDiv); // Append each ability to the container
        } else {
          console.log(
            `No English effect entry found for ability: ${ability.ability.name}`
          );
        }
        console.log(result);
      });
  });
}
// function showAbilities(abilities) {
//   const abilitiesContainer = document.getElementById("ability"); // Ensure this ID exists in your HTML
//   abilitiesContainer.innerHTML = ""; // Clear previous abilities if needed

//   abilities.forEach((ability) => {
//     const endpoint = ability.ability.url;
//     fetch(endpoint)
//       .then((response) => response.json())
//       .then((data) => {
//         const effectEntry = data.effect_entries.find(
//           (entry) => entry.language.name === "en"
//         );
//         if (effectEntry) {
//           const titleAbility = document.createElement("h3");
//           const abilityDiv = document.createElement("div");
//           abilityDiv.classList.add("ability-info");
//           titleAbility.textContent = ability.ability.name;
//           abilityDiv.textContent = effectEntry.effect; // Displaying the effect text
//           abilitiesContainer.appendChild(titleAbility);
//           abilitiesContainer.appendChild(abilityDiv); // Append each ability to the container
//         } else {
//           console.log(
//             `No English effect entry found for ability: ${ability.ability.name}`
//           );
//         }
//       })
//       .catch((error) => {
//         console.error(
//           `Failed to fetch details for ability: ${ability.ability.name}`,
//           error
//         );
//       });
//   });

//   let abilitiesUrl = ability.map((ability) => ability.ability.url);
//   abilitiesUrl.forEach((Url) => {
//     fetch(Url)
//       .then((response) => response.json())
//       .then((data) => {
//         const effectAbility = data.effect_entries;
//         console.log(effectAbility);
//         ability.forEach((ability) => {
//           document.getElementById("ability").innerHTML = `
//           <h2>${ability.ability.name}</h2>
//           <p>${eff}</p>
//           `;
//         });
//       });
//   });
// }

function showMoves(moves) {
  const movesContainer = document.getElementById("moves-container"); // Get the container for moves
  movesContainer.innerHTML = ""; // Clear previous content

  moves.forEach((move) => {
    let endpoint = move.move.url;

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        // Create an anchor element to make the move card clickable
        const link = document.createElement("a");
        link.href = `#`; // Placeholder link, replace with your actual URL or JavaScript function
        link.className = "move-link"; // Styling purposes if needed

        // Create a div element for each move
        const moveDiv = document.createElement("div");
        moveDiv.className = "move";

        // Assuming data.name and optionally data.description are valid attributes from your API

        moveDiv.innerHTML = `
          <h3>${data.name}</h3>
        `;

        // Append the div to the link element
        link.appendChild(moveDiv);
        // Append the link element to the container
        movesContainer.appendChild(link);
      })
      .catch((error) => console.error("Failed to fetch move details:", error));
  });
}

fetchPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
