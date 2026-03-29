
const API_BASE =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000"
    : "https://webroxstudio-backend.onrender.com";
const FALLBACK_PORTFOLIO = [
  {
    name: "FoundBond",
    category: "website",
    badge: "Business Website",
    url: "https://foundbond.com",
    description: "Modern business website built with HTML, CSS, and JavaScript.",
    tech_tags: "HTML,CSS,JavaScript",
    mock_label: "FOUNDBOND"
  },
  {
    name: "The High Garden",
    category: "website",
    badge: "Cafe Website",
    url: "https://thehighgardencafe.netlify.app/",
    description: "Client website built for a cafe brand with a clean, modern layout.",
    tech_tags: "HTML,CSS,JavaScript",
    mock_label: "THE HIGH GARDEN"
  }
];

async function loadPortfolio() {

  let data = FALLBACK_PORTFOLIO;

  try {

    console.log("Loading portfolio...");

    const response = await fetch(`${API_BASE}/api/portfolio`);
    if (!response.ok) {
      throw new Error(`Portfolio request failed with status ${response.status}`);
    }

    const apiData = await response.json();
    if (Array.isArray(apiData) && apiData.length > 0) {
      data = apiData;
    }

    console.log("API DATA:", data);

    const grid = document.getElementById("portfolioGrid");

    console.log("GRID:", grid);

    if (!grid) {
      console.error("portfolioGrid element not found!");
      return;
    }

    grid.innerHTML = "";

    data.forEach(item => {

      const techTags = (item.tech_tags || "")
        .split(",")
        .filter(Boolean)
        .map(tag => `<span>${tag.trim()}</span>`)
        .join("");

      const card = document.createElement("div");

    //   card.className = "portfolio-card reveal";
    card.className = "portfolio-card";
      card.setAttribute("data-cat", item.category || "website");

      card.innerHTML = `
      <div class="portfolio-img">

        <span class="mock-label">${item.mock_label || item.name}</span>

        <div class="overlay">
          <a href="${item.url}" target="_blank"
          style="font-size:40px;color:white;text-decoration:none;">👁</a>
        </div>

        <span class="portfolio-badge">${item.badge || ""}</span>

      </div>

      <div class="portfolio-info">

        <h4>${item.name}</h4>
        <p>${item.description}</p>

        <div class="portfolio-meta">

          <div class="portfolio-tech">
            ${techTags}
          </div>

          <a href="${item.url}" target="_blank"
          class="portfolio-link">
          Visit Site →
          </a>

        </div>

      </div>
      `;

      grid.appendChild(card);

    });

    console.log("Portfolio loaded successfully");

  } catch (error) {

    console.error("Portfolio Load Error:", error);

  }

}

document.addEventListener("DOMContentLoaded", loadPortfolio);
