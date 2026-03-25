
let apiKey = prompt("Enter your AbstractAPI key (get one at abstractapi.com):", "your-key-here");
if (!apiKey || apiKey === "your-key-here") {
    document.getElementById("time").innerText = "Please provide an API key to fetch times.";
    apiKey = null;
}

const timeDisplay = document.getElementById("time");

let hoverTimeout;

async function getData(location) {
    if (!apiKey) {
        document.getElementById("time").innerText = "API key missing. Reload and enter a key.";
        window.alert("API key is required to fetch time data. Please reload and enter your AbstractAPI key.");
        return;
    }
    const url = `https://timezone.abstractapi.com/v1/current_time/?api_key=${encodeURIComponent(apiKey)}&location=${encodeURIComponent(location)}`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        const time = data.datetime;
        timeDisplay.innerText = `${location}'s time: ${time} (${data.timezone_abbreviation})`;
    } catch (error) {
        timeDisplay.innerText = `Error fetching time for ${location}: ${error.message}`;
        timeDisplay.style.color = "red";
        timeDisplay.style.borderColor = "red";
    }
}

document.querySelectorAll("path").forEach(path => {
    path.addEventListener("mouseover", function (e) {
        const countryName = path.getAttribute("name") || path.id;
        if (countryName) {
            const tooltip = document.getElementById("nameDisplay");
            tooltip.classList.add("visible");
            let x = e.clientX + 10;
            let y = e.clientY - 20;
            // Clamp to viewport
            if (x + tooltip.offsetWidth > window.innerWidth) x = window.innerWidth - tooltip.offsetWidth - 10;
            if (y < 0) y = 10;
            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y}px`;
            document.getElementById("nameDisplay").innerText = countryName;
            // Clear any existing timeout
            clearTimeout(hoverTimeout);
            // Set a delay before fetching data
            hoverTimeout = setTimeout(() => getData(countryName), 400);
            const randomColor = `#${Math.random().toString(16).slice(2, 8)}`
            path.style.fill = randomColor;
            tooltip.style.borderColor = randomColor;
            tooltip.style.color = randomColor;
            timeDisplay.style.borderColor = randomColor;
            timeDisplay.style.color = randomColor;
            timeDisplay.innerText = "Loading time...";
        }
    });

    path.addEventListener("mouseleave", function () {
        path.style.fill = "#ececec";
        timeDisplay.style.color = "#e82e53c7";
        timeDisplay.innerText = "Hover over a country to see the time";
        timeDisplay.style.borderColor = "#e82e53c7";
        document.getElementById("nameDisplay").classList.remove("visible");
        // Clear the hover timeout to prevent delayed API call
        clearTimeout(hoverTimeout);

    });
});