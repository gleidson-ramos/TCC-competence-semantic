import {updateScoreValue, toggleFilters, getSelectedSearchMode, getSelectedTypes, getTopResults} from "./filters.js";
import {renderColumn, renderCompanyColumn, toggleBio, toggleArea} from "./ui.js";
import { searchRequest } from "./api.js";

const queryInput = document.getElementById("query");
const searchButton = document.getElementById("btn-search");
const filterButton = document.getElementById("btn-filter");
const scoreInput = document.getElementById("min_score");

queryInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    search();
  }
});

searchButton.addEventListener("click", search);
filterButton.addEventListener("click", toggleFilters);

scoreInput.addEventListener("input", (e) => {
  updateScoreValue(e.target.value);
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-bio") && !event.target.classList.contains("btn-area")) {
    toggleBio(event.target);
  }

  if (event.target.classList.contains("btn-area")) {
    toggleArea(event.target);
  }
});

async function search() {
  const query = queryInput.value.trim();

  if (!query) {
    document.getElementById("status").innerHTML = `
      <div style="color:red; text-align:center; margin-top:20px;">Informe um termo para busca.</div>
    `;

    return;
  }

  document.body.classList.add("has-results");
  document.body.classList.remove("centered");

  const min_score = document.getElementById("min_score").value;
  const selectedTypes = getSelectedTypes();
  const search_mode = getSelectedSearchMode();
  const top_results = getTopResults();
  const status = document.getElementById("status");
  const container = document.getElementById("results");

  container.innerHTML = `
    <div class="loading-container">
      <div class="loader"></div>
    </div>
  `;

  status.innerHTML = "";

  try {
    const data = await searchRequest({
      query, min_score,
      entity_types: selectedTypes, search_mode, top_results,
    });

    console.log("RESULTADO COMPLETO:", data);
    console.log("MATCHED TERMS:", data.grouped_results);

    let groups = Object.fromEntries(
      Object.entries(data.grouped_results).filter(
        ([key]) => selectedTypes.includes(key)
      )
    );

    const legendHtml = `
      <div class="legend-container">
        <span class="legend-item">
          <span class="label"><strong>🧠 Resultado Semântico:</strong> Encontrado através do contexto.</span>
        </span>

        <span class="legend-item">
          <span class="label"><strong>🔤 Resultado Léxico:</strong> Contém o termo da busca.</span>
        </span>
      </div>
    `;

    const columnsHtml = `
      <div class="results-columns">
        ${renderColumn("Pesquisador", groups["Pesquisador"] || [])}
        ${renderColumn("Grupo de Pesquisa", groups["Grupo de Pesquisa"] || [])}
        ${renderCompanyColumn("Empresa", groups["Empresa"] || [] )}
      </div>
    `;

    const timeHtml = `
      <div style="text-align:center; margin-top:20px; color:#666; font-size:0.9em;">
        Tempo de processamento: ${(data.execution_time_ms / 1000).toFixed(2)}s
      </div>
    `;

    container.innerHTML =  legendHtml + columnsHtml + timeHtml;

  } catch (err) {
    console.error(err);
    container.innerHTML = "";
    status.innerHTML = `
      <div style="color:red; text-align:center; margin-top:20px; ">
        Erro ao realizar busca.
      </div>
    `;
  }
}