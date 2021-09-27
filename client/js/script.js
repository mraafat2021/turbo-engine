/* const cname = document.getElementById("name");
const population = document.getElementById("population");
const region = document.getElementById("region");
const capital = document.getElementById("capital"); */
const loading = document.querySelector(".loading");
const selector = document.getElementById("regions");
const darkLight = document.getElementById("dark-light");

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
    }" onclick="showCountryDetails('${i.name}', '${i.flags[0]}', '${
      i.nativeName
    }', '${i.population}', '${i.continent}', '${i.region}', '${i.capital}', '${
      i.topLevelDomain[0]
    }')">
            <img src="${i.flags[0]}" alt="pic">
            <div class="details">
                <h5 id="country">${i.name}</h5>
                <h6>Population: <span id="population">${i.population.toLocaleString()}</span></h6>
                <h6>Region: <span id="region">${i.region}</span></h6>
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
        regionsArr.push(i.continent);
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

function showCountryDetails(c, i, n, p, r, sr, cp, tl, cur, lang) {
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const countryName = document.getElementById("countryName");
    const countryFlag = document.getElementById("countryFlag");
    const nativeName = document.getElementById("nativeName");
    const population2 = document.getElementById("population2");
    const region2 = document.getElementById("region2");
    const subregion = document.getElementById("subregion");
    const capital2 = document.getElementById("capital2");
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
    tld.innerHTML = tl;
    //currencies.innerHTML += typeof cur;
    //languages.innerHTML += typeof lang;

    span.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}