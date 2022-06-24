const pageSize = 10;
let idPage = 1;
let start = 0;
let end = pageSize;
let currentPage = 1;

const nextBtn = document.getElementById("btn-next");
const prevBtn = document.getElementById("btn-prev");

async function handleLoad() {
  if (currentPage <= 1) {
    prevBtn.style.display = "none";
  }
  function getCurrentPage(currentPage) {
    start = (currentPage - 1) * pageSize;
    end = currentPage * pageSize;
    console.log(start, end);
  }

  let pokemonList;
  await fetch("https://pokeapi.co/api/v2/pokemon?limit=200")
    .then((res) => res.json())
    .then((res) => {
      pokemonList = res.results.slice(0, 138);
    });
  let totalItems = pokemonList.length;
  let totalPages = Math.ceil(totalItems / pageSize);

  console.log("pokemonList :>> ", pokemonList);

  const pokeContainer = document.getElementById("product");
  function handlePokemon() {
    let html = "";
    const content = pokemonList.map((pokemon, index) => {
      if (index >= start && index < end) {
        html += `
          <div class="anime-card">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1
              }.png"
              alt=""
            />
            <h1 class="title">${pokemon.name}</h1>
          </div>`;
        return html;
      }
    });

    pokeContainer.innerHTML = html;
  }
  handlePokemon();

  function renderPokeList() {
    let html = "";
    html += `<li class="active"><a>${1}</a></li>`;
    for (let i = 2; i <= totalPages; i++) {
      html += `<li><a>${i}</a></li>`;
    }
    document.getElementById("number-page").innerHTML = html;
  }
  renderPokeList();

  function changePage() {
    const currentPages = document.querySelectorAll(".number-page li");

    for (let i = 0; i < currentPages.length; i++) {
      currentPages[i].addEventListener("click", () => {
        let value = i + 1;
        currentPage = value;
        getCurrentPage(currentPage);
        handlePokemon();
        if (currentPage == currentPages[i].innerText) {
          for (let n = 0; n < currentPages.length; n++) {
            currentPages[n].classList.remove("active");
          }
          currentPages[i].classList.add("active");
          checkPrevButton();
          checkNextButton();
        }
      });
    }
  }

  changePage();

  nextBtn.addEventListener("click", () => {
    currentPage++;
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }
    getCurrentPage(currentPage);
    let activeTab = document.querySelector(".active");
    console.log("activeTab :>> ", activeTab);

    activeTab.classList.remove("active");
    activeTab.nextSibling.classList.add("active");

    handlePokemon();
    if (currentPage > 1) {
      prevBtn.style.display = "flex";
    }
    if (currentPage >= totalPages) {
      nextBtn.style.display = "none";
    }
    // changePage();
  });

  prevBtn.addEventListener("click", () => {
    currentPage--;
    if (currentPage < 1) {
      currentPage = 1;
    }
    if (currentPage <= 1) {
      prevBtn.style.display = "none";
    }
    getCurrentPage(currentPage);
    let activeTab = document.querySelector(".active");
    console.log("activeTab :>> ", activeTab);

    activeTab.classList.remove("active");
    activeTab.previousSibling.classList.add("active");

    handlePokemon();
    if (currentPage < totalPages) {
      nextBtn.style.display = "flex";
    }
  });
  function checkPrevButton() {
    if (currentPage <= 1) {
      prevBtn.style.display = "none";
    } else if (currentPage > 1) {
      prevBtn.style.display = "flex";
    }
  }
  function checkNextButton() {
    if (currentPage >= totalPages) {
      nextBtn.style.display = "none";
    } else if (currentPage > 1) {
      nextBtn.style.display = "flex";
    }
  }
}

handleLoad();
