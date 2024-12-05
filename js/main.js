const cards = document.querySelectorAll(".card");
const links = document.querySelectorAll(".link");

// Fetch and parse the JSON data
fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        // Loop through the cards and update the data
        cards.forEach((card, index) => {
            const title = card.querySelector(".card-type");
            const current = card.querySelector(".current-hours");
            const previous = card.querySelector(".previous-hours");

            // Initial data display
            title.textContent = data[index].title;
            current.textContent = data[index].timeframes.weekly.current + "hrs";
            previous.textContent =
                "Last week - " + data[index].timeframes.weekly.previous + "hrs";

            // Link event listeners
            links.forEach((link) => {
                link.addEventListener("click", (e) => {
                    e.preventDefault(); // Prevent the default link behavior

                    const timeframe = link.getAttribute("data-timeframe");
                    current.textContent =
                        data[index].timeframes[timeframe].current + "hrs";
                    const reducedName = timeframe.replace(/ly$/i, "");
                    const goodName = reducedName.replace(/i/i, "y");

                    previous.textContent =
                        "Last " +
                        goodName +
                        " - " +
                        data[index].timeframes[timeframe].previous +
                        "hrs";
                    links.forEach((link) => link.classList.remove("activated"));
                    link.classList.add("activated");
                });
            });
        });
    })
    .catch((error) => console.error(error));
