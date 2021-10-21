const all = (root) => {
    const searchPhone = async(phone) => {
        if (phone) {
            const res = await fetch(
                `http://api-mobilespecs.azharimm.site/v2/search?query=${phone}`
            );
            const data = await res.json();

            return data;
        } else {
            return [];
        }
    };

    const input = root.querySelector("input");
    const summary = root.querySelector(".summary");
    const resultsContainer = root.querySelector(".search-results");

    let timerId;
    const onInput = async(e) => {
        if (!e.target.value) {
            resultsContainer.classList.add("is-hidden");
        }
        const phone = await searchPhone(e.target.value);
        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            showResults(phone);
        }, 1000);
    };

    const showResults = (data) => {
        if (data.length == 0) {
            return [];
        }
        //console.log(data);

        resultsContainer.classList.remove("is-hidden");
        resultsContainer.innerHTML = "";

        data.data.phones.forEach((i) => {
            const result = document.createElement("div");
            result.classList.add("result");
            result.innerHTML = renderResults(i);
            resultsContainer.appendChild(result);

            result.addEventListener("click", async() => {
                resultsContainer.classList.add("is-hidden");
                summary.innerHTML = "";
                input.value = i.phone_name;
                summary.innerHTML = await renderDetails(i);
            });
        });
    };

    const renderResults = (data) => {
        return `
            <img src="${data.image}" />
            <p class="title">${data.phone_name}</p>
        `;
    };

    const getDetails = async(data) => {
        const res = await fetch(data.detail);
        const details = await res.json();

        //console.log(details);
        return details;
    };

    const renderDetails = async(data) => {
        const details = await getDetails(data);
        let phoneSpecs = [];
        details.data.specifications.forEach((i) => {
            phoneSpecs.push(`
            <tr>
                <th class="title" colspan="2">${i.title}</th>
            </tr>
            `);
            i.specs.forEach((j) => {
                phoneSpecs.push(`
               <tr>
                <th>${j.key}</th>
                <td>${j.val}</td>
               </tr>
            `);
            });
        });
        return `
        <img src="${details.data.thumbnail}" />
        <table>
        <tr>
            <th>Phone</th>
            <td>${details.data.phone_name}</td>
        </tr>
        <tr>
            <th>Brand</th>
            <td>${details.data.brand}</td>
        </tr>
        ${phoneSpecs.join("")}
        </table>
        `;
    };

    input.addEventListener("input", onInput);

    document.body.addEventListener("click", (e) => {
        const x = document.querySelector("#left-side");
        if (!e.target.contains(x)) {
            resultsContainer.classList.add("is-hidden");
        }
    });
};