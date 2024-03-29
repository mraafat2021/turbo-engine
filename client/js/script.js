/* const cname = document.getElementById("name");
const population = document.getElementById("population");
const region = document.getElementById("region");
const capital = document.getElementById("capital"); */
const loading = document.querySelector(".loading");
const selector = document.getElementById("regions");
const darkLight = document.getElementById("dark-light");
const search = document.getElementById("search");

displayAllCountries();

selector.addEventListener("change", (e) => {
    const y = document.getElementById("countries");
    y.innerHTML = "";
    loading.style.display = "flex";
    if (selector.value == "all") {
        displayAllCountries();
    } else {
        displayByContenent(selector.value);
    }
});

darkLight.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

function displayAllCountries() {
    fetch("https://restcountries.com/v2/all")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            displayCountries(data);
            showRegion(data);
            search.addEventListener("keydown", (e) => {
                if (e.key == "Enter") {
                    searchCountries(data);
                }
            });
            search.addEventListener("blur", () => {
                searchCountries(data);
            });
            //post
        })
        .then(() => {
            loading.style.display = "none";
        });
}

function displayByContenent(continent) {
    fetch(`https://restcountries.com/v2/continent/${continent}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            displayCountries(data);
        })
        .then(() => {
            loading.style.display = "none";
        });
}

function displayCountries(data) {
    data.forEach((i) => {
        const x = `<div class="country" id="${
      i.alpha2Code
    }" onclick="showCountryDetails('${i.name}', '${i.flags.svg}', '${
      i.nativeName
    }', '${i.population}', '${i.region}', '${i.subregion}', '${i.capital}', '${
      i.area
    }' ,'${i.topLevelDomain[0]}', '', '${i.languages[0].name}')">
            <img src="${i.flags.svg}" alt="pic">
            <div class="details">
                <h5 id="country">${i.name}</h5>
                <h6>Population: <span id="population">${i.population.toLocaleString()}</span></h6>
                <h6>Region: <span id="region">${i.subregion}</span></h6>
                <h6>Capital: <span id="capital">${
                  i.capital ? i.capital : "None"
                }</span></h6>
            </div>
        </div>`;
        const y = document.getElementById("countries");
        y.innerHTML += x;
    });
}

function showRegion(data) {
    const regions = document.getElementById("regions");
    let regionsArr = [];
    data.forEach((i) => {
        regionsArr.push(i.region);
    });
    const regionsUnique = [...new Set(regionsArr)];
    regionsUnique.forEach((i) => {
        const region = document.createElement("option");
        region.setAttribute("value", i);
        region.textContent = i;
        regions.appendChild(region);
    });
}

function postData() {
    fetch("/all", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => {
        console.log(response);
    });
}

function showCountryDetails(c, i, n, p, r, sr, cp, ar, tl, cur, lang) {
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const countryName = document.getElementById("countryName");
    const countryFlag = document.getElementById("countryFlag");
    const nativeName = document.getElementById("nativeName");
    const population2 = document.getElementById("population2");
    const region2 = document.getElementById("region2");
    const subregion = document.getElementById("subregion");
    const capital2 = document.getElementById("capital2");
    const area = document.getElementById("area");
    const tld = document.getElementById("tld");
    const currencies = document.getElementById("currencies");
    const languages = document.getElementById("languages");

    modal.style.display = "block";

    countryName.innerHTML = c;
    countryFlag.setAttribute("src", i);
    nativeName.innerHTML = n;
    population2.innerHTML = parseInt(p).toLocaleString();
    region2.innerHTML = r;
    subregion.innerHTML = sr;
    capital2.innerHTML = cp;
    area.innerHTML = parseInt(ar).toLocaleString() + " km<sup>2</sup>";
    tld.innerHTML = tl;
    currencies.innerHTML = cur;
    languages.innerHTML = lang;

    span.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

function searchCountries(data) {
    let found = [];
    const y = document.getElementById("countries");

    y.innerHTML = "";
    data.forEach((i) => {
        if (i.name.toLowerCase().includes(search.value.toLowerCase())) {
            found.push(i);
        }
    });
    displayCountries(found);
    if (found.length == 0) {
        y.innerHTML = "No results found.";
    }
}
