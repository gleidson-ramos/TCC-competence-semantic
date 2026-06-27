export function updateScoreValue(value) {
  document.getElementById("score-value").textContent = value;
}

export function toggleFilters() {
  const panel = document.getElementById("filters-panel");
  const button = document.getElementById("btn-filter");
  const isHidden = panel.style.display === "none";

  panel.style.display = isHidden ? "block" : "none";
  button.textContent = isHidden ? "Ocultar Filtros" : "Mostrar Filtros";
}

export function getSelectedSearchMode() {
  return document.querySelector('input[name="search_mode"]:checked').value;
}

export function getSelectedTypes() {
  return Array.from(
    document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked')
  ).map((cb) => cb.value);
}

export function getTopResults() {
  const value = parseInt(document.getElementById("top_results").value, 10);
  return isNaN(value) || value < 1 ? 5 : value;
}