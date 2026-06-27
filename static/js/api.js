export async function searchRequest(payload) {
  const response = await fetch("/api/search", {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Erro ao consultar API");
  }

  return response.json();
}