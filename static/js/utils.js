export function formatDate(dateStr) {
  if (!dateStr) return "-";

  const d = new Date(dateStr);

  return d.toLocaleDateString("pt-BR");
}

export function escapeHtml(text) {
  const div = document.createElement("div");

  div.textContent = text || "";

  return div.innerHTML;
}