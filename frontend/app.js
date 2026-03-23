const API = "https://bookish-pancake-g4wj6j9j6q64hgx-5000.app.github.dev/api";

let user = null;
let favorites = [];

// LOGIN
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/users/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    });

    user = await res.json();
    alert("Logged in!");
}

// LOAD COURSES
async function loadCourses() {
    const res = await fetch(`${API}/courses`);
    const data = await res.json();
    displayCourses(data);
}

// SEARCH
async function searchCourses() {
    const keyword = document.getElementById("search").value;
    const res = await fetch(`${API}/courses/search/${keyword}`);
    const data = await res.json();
    displayCourses(data);
}

// DISPLAY
function displayCourses(courses) {
    const div = document.getElementById("courses");
    div.innerHTML = "";

    courses.forEach(c => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${c.title}</h3>
            <p>${c.department}</p>
            <button onclick='addFavorite("${c._id}", "${c.title}")'>⭐ Favorite</button>
        `;

        div.appendChild(card);
    });
}

// FAVORITES
function addFavorite(id, title) {
    favorites.push({ id, title });
    displayFavorites();
}

function displayFavorites() {
    const div = document.getElementById("favorites");
    div.innerHTML = "";

    favorites.forEach(f => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<h3>${f.title}</h3>`;
        div.appendChild(card);
    });
}

loadCourses();