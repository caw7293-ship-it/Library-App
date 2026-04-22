const API = "https://bookish-pancake-g4wj6j9j6q64hgx-5000.app.github.dev/api";

let token = localStorage.getItem("token");
let userFavorites = [];

// ======================
// 100 REAL COURSES
// ======================
const courseNames = [
"Introduction to Computer Science",
"Data Structures and Algorithms",
"Object-Oriented Programming",
"Database Systems",
"Operating Systems",
"Computer Networks",
"Software Engineering",
"Web Development",
"Mobile App Development",
"Artificial Intelligence",
"Machine Learning",
"Deep Learning",
"Cybersecurity Fundamentals",
"Cloud Computing",
"Human-Computer Interaction",
"Discrete Mathematics",
"Calculus I",
"Calculus II",
"Linear Algebra",
"Statistics for Engineers",
"Probability Theory",
"Physics I: Mechanics",
"Physics II: Electricity and Magnetism",
"General Chemistry",
"Organic Chemistry",
"Biology I",
"Biology II",
"Microbiology",
"Genetics",
"Biochemistry",
"Introduction to Psychology",
"Developmental Psychology",
"Cognitive Psychology",
"Sociology Fundamentals",
"Macroeconomics",
"Microeconomics",
"Principles of Accounting",
"Financial Accounting",
"Managerial Accounting",
"Business Management",
"Marketing Principles",
"Entrepreneurship",
"Business Ethics",
"International Business",
"Corporate Finance",
"Investment Analysis",
"Econometrics",
"Political Science Introduction",
"American Government",
"World History",
"Modern European History",
"Philosophy: Ethics",
"Logic and Critical Thinking",
"Creative Writing",
"English Composition",
"Public Speaking",
"Linguistics Introduction",
"Spanish I",
"French I",
"Chinese Language Basics",
"Graphic Design Fundamentals",
"Digital Media Production",
"Photography I",
"Film Studies",
"Game Design Fundamentals",
"3D Modeling and Animation",
"Music Theory",
"Art History",
"Architecture Fundamentals",
"Civil Engineering Basics",
"Mechanical Engineering Principles",
"Electrical Engineering Fundamentals",
"Thermodynamics",
"Fluid Mechanics",
"Materials Science",
"Environmental Science",
"Geology",
"Astronomy",
"Nutrition and Health",
"Sports Science",
"Nursing Fundamentals",
"Public Health Introduction",
"Medical Terminology",
"Pharmacology Basics",
"Law Introduction",
"Criminal Justice System",
"Constitutional Law",
"Human Rights Law",
"Education Psychology",
"Teaching Methods",
"Special Education Fundamentals",
"Social Work Practice",
"Urban Planning",
"Environmental Policy",
"Data Science Introduction",
"Big Data Analytics",
"Blockchain Fundamentals",
"Internet of Things (IoT)"
];

// ======================
// BUILD COURSE OBJECTS
// ======================
function getCategory(title) {
    if (title.includes("Computer") || title.includes("Data") || title.includes("AI") || title.includes("Software")) return "Computer Science";
    if (title.includes("Math") || title.includes("Calculus") || title.includes("Statistics") || title.includes("Algebra")) return "Mathematics";
    if (title.includes("Physics") || title.includes("Chemistry") || title.includes("Biology")) return "Science";
    if (title.includes("Business") || title.includes("Finance") || title.includes("Marketing")) return "Business";
    if (title.includes("Psychology") || title.includes("Sociology") || title.includes("Philosophy")) return "Social Science";
    return "General Studies";
}

const courses = courseNames.map((title, i) => ({
    _id: `${i + 1}`,
    title,
    description: `${title} explores core concepts, real-world applications, and hands-on projects used in modern university-level study.`,
    instructor: `Professor ${String.fromCharCode(65 + (i % 26))}. Smith`,
    category: getCategory(title),
    duration: `${(i % 12) + 4} weeks`,
    level: ["Beginner", "Intermediate", "Advanced"][i % 3]
}));

// ======================
// DISPLAY COURSES
// ======================
function displayCourses(courseList) {
    const div = document.getElementById("courses");
    div.innerHTML = "";

    courseList.forEach(c => {
        const isFavorite = userFavorites.includes(c._id);

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${c.title}</h3>
            <p>${c.description}</p>
            <small>${c.category} • ${c.level}</small>
            <br><br>
            ${
                isFavorite
                    ? `<button onclick='removeFavorite("${c._id}")'>❌ Remove</button>`
                    : `<button onclick='addFavorite("${c._id}")'>⭐ Favorite</button>`
            }
        `;

        div.appendChild(card);
    });
}

// ======================
// LOAD COURSES (FIXED)
// ======================
function loadCourses() {
    displayCourses(courses);
}

// ======================
// SEARCH COURSES
// ======================
function searchCourses() {
    const keyword = document.getElementById("search").value.toLowerCase();

    const filtered = courses.filter(c =>
        c.title.toLowerCase().includes(keyword)
    );

    displayCourses(filtered);
}

// ======================
// ADD FAVORITE
// ======================
async function addFavorite(id) {
    if (!token) {
        alert("Please login first!");
        return;
    }

    await fetch(`${API}/courses/favorite/${id}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    userFavorites.push(id);
    loadCourses();
}

// ======================
// REMOVE FAVORITE
// ======================
async function removeFavorite(id) {
    await fetch(`${API}/courses/unfavorite/${id}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    userFavorites = userFavorites.filter(f => f !== id);
    loadCourses();
}

// ======================
// LOAD FAVORITES
// ======================
async function loadFavorites() {
    if (!token) return;

    const res = await fetch(`${API}/users/me`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const user = await res.json();

    userFavorites = (user.favorites || []).map(f => f._id);

    const div = document.getElementById("favorites");
    div.innerHTML = "";

    user.favorites.forEach(f => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${f.name || f.title}</h3>
            <p>${f.description || ""}</p>
            <button onclick='removeFavorite("${f._id}")'>❌ Remove</button>
        `;

        div.appendChild(card);
    });
}

// ======================
// LOGIN (unchanged)
// ======================
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    token = data.token;
    localStorage.setItem("token", token);

    await loadFavorites();
    loadCourses();
}

// ======================
// REGISTER
// ======================
async function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    await fetch(`${API}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    alert("User created!");
}

// ======================
// LOGOUT
// ======================
function logout() {
    localStorage.removeItem("token");
    token = null;
    location.reload();
}

// ======================
// PAGE LOAD
// ======================
window.onload = async () => {
    if (token) await loadFavorites();
    loadCourses();
};

// ======================
// NAVIGATION
// ======================
function openSettings() {
    window.location.href = "settings.html";
}

function openProfile() {
    window.location.href = "profile.html";
}

window.courses = courses;