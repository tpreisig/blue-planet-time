const timeDisplay = document.getElementById("time");

function getData(location) {

    console.log(location);
    timeDisplay.innerText = `${location}`;

}

document.querySelectorAll("path").forEach(path => {
    path.addEventListener("mouseover", function (e) {
        const countryName = path.getAttribute("name") || path.id;
        if (countryName && countryName) {
            // Position tooltip
            const tooltip = document.getElementById("name");
            tooltip.style.top = `${e.clientY - 20}px`;
            tooltip.style.left = `${e.clientX + 10}px`;
            document.getElementById("nameP").innerText = countryName;

            // Fetch and display time
            getData(countryName);

            // Highlight path
            path.style.fill = "#fc0";
        }
    });

    path.addEventListener("mouseleave", function () {
        path.style.fill = "#ececec";
        timeDisplay.style.color = "#333";
        timeDisplay.innerText = "Hover over a country to see the time";
    });
});