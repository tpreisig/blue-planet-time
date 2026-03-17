
let apiKey = prompt("Enter your AbstractAPI key (get one at abstractapi.com):", "your-key-here");
if (!apiKey || apiKey === "your-key-here") {
    apiKey = null;
    document.getElementById("time").innerText = "Please provide an API key to fetch times.";
}

const timeDisplay = document.getElementById("time");

async function getData(location) {
    if (!apiKey) {
        document.getElementById("time").innerText = "API key missing. Reload and enter a key.";
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
        document.getElementById("time").innerText = `${location}'s time: ${time} (${data.timezone_abbreviation})`;
    } catch (error) {
        document.getElementById("time").innerText = `Error fetching time for ${location}: ${error.message}`;
    }
}

document.querySelectorAll("path").forEach(path => {
    path.addEventListener("mouseover", function (e) {
        const countryName = path.getAttribute("name") || path.id;
        if (countryName) {
            const tooltip = document.getElementById("name");
            tooltip.classList.add("visible");
            let x = e.clientX + 10;
            let y = e.clientY - 20;
            // Clamp to viewport
            if (x + tooltip.offsetWidth > window.innerWidth) x = window.innerWidth - tooltip.offsetWidth - 10;
            if (y < 0) y = 10;
            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y}px`;
            document.getElementById("nameDisplay").innerText = countryName;
            getData(countryName);
            const randomColor = `#${Math.random().toString(16).slice(2, 8)}`
            path.style.fill = randomColor;
        }
    });

    path.addEventListener("mouseleave", function () {
        path.style.fill = "#ececec";
        timeDisplay.style.color = "#333";
        timeDisplay.innerText = "Hover over a country to see the time";
    });
});