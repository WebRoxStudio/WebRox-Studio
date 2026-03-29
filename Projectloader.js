const API_BASE = "https://webroxstudio-backend.onrender.com";

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

function renderPortfolioCards(items) {
  const grid = document.getElementById("portfolioGrid");

  if (!grid) {
    console.error("portfolioGrid element not found!");
    return;
  }

  grid.innerHTML = "";

  items.forEach((item) => {
    const techTags = (item.tech_tags || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .map((tag) => `<span>${tag}</span>`)
      .join("");

    const card = document.createElement("div");
    card.className = "portfolio-card";
    card.setAttribute("data-cat", item.category || "website");

    card.innerHTML = `
      <div class="portfolio-img">
        <span class="mock-label">${item.mock_label || item.name}</span>
        <div class="overlay">
          <a href="${item.url}" target="_blank" rel="noopener noreferrer"
          style="font-size:16px;color:white;text-decoration:none;font-weight:700;">View</a>
        </div>
        <span class="portfolio-badge">${item.badge || ""}</span>
      </div>
      <div class="portfolio-info">
        <h4>${item.name}</h4>
        <p>${item.description || ""}</p>
        <div class="portfolio-meta">
          <div class="portfolio-tech">${techTags}</div>
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="portfolio-link">Visit Site</a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

async function loadPortfolio() {
  let data = FALLBACK_PORTFOLIO;

  try {
    const response = await fetch(`${API_BASE}/api/portfolio`);

    if (!response.ok) {
      throw new Error(`Portfolio request failed with status ${response.status}`);
    }

    const apiData = await response.json();

    if (Array.isArray(apiData) && apiData.length > 0) {
      data = apiData;
    }
  } catch (error) {
    console.error("Portfolio Load Error:", error);
  }

  renderPortfolioCards(data);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadPortfolio);
} else {
  loadPortfolio();
}
