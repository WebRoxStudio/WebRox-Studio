
async function loadPortfolio() {

  try {

    console.log("Loading portfolio...");

    const response = await fetch("http://127.0.0.1:5000/api/portfolio");

    const data = await response.json();

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