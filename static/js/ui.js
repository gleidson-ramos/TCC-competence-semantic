import { getSelectedSearchMode } from "./filters.js";
import { formatDate, escapeHtml } from "./utils.js";

export function toggleBio(button) {
  const bioDiv = button.nextElementSibling;
  const isHidden = bioDiv.style.display === "none";

  bioDiv.style.display = isHidden ? "block" : "none";
  button.textContent = isHidden ? "Ocultar Detalhes" : "Ver Detalhes";
}

export function toggleArea(button) {
  const areaDiv = button.nextElementSibling;
  const isHidden = areaDiv.style.display === "none";

  areaDiv.style.display = isHidden ? "block" : "none";
  button.textContent = isHidden ? "Ocultar Área" : "Ver Área";
}

export function renderScores(r) {
  const mode = getSelectedSearchMode();
  if (mode === "semantic") {
    return `
      <div>🧠 Semântico: ${r.semantic_score || 0}%
        <div class="score-bar semantic">
          <div style="width:${r.semantic_score || 0}%"></div>
        </div>
      </div>
    `;
  }

  if (mode === "lexical") {
    return `
      <div>🔤 Léxico: ${r.lexical_score || 0}%
        <div class="score-bar lexical">
          <div style="width:${r.lexical_score || 0}%"></div>
        </div>
      </div>
    `;
  }

  return `
    <div>🔀 Híbrido: ${r.hybrid_score || 0}%
      <div class="score-bar hybrid">
        <div style="width:${r.hybrid_score || 0}%"></div>
      </div>
    </div>

    <div>🧠 Semântico: ${r.semantic_score || 0}%
      <div class="score-bar semantic">
        <div style="width:${r.semantic_score || 0}%"></div>
      </div>
    </div>

    <div>🔤 Léxico: ${r.lexical_score || 0}%
      <div class="score-bar lexical">
        <div style="width:${r.lexical_score || 0}%"></div>
      </div>
    </div>
  `;
}

export function renderColumn(title, results) {
  let html = `<div class="result-column"><h3>${title}</h3>`;

  if (!results || results.length === 0) {
    html += `
      <div class="empty-results">Nenhum resultado disponível.</div>
    </div>
    `;

    return html;
  }

  html += results
    .map((r) => {
      const exactClass = r.lexical_score == 100 ? "exact-match" : "";

      return `
        <div class="result-item ${exactClass}">
          <div class="top-icon">
            ${
              r.lexical_score == 100
                ? "🔤"
                : "🧠"
            }
          </div>
          <div class="entity-name">
            <center>${escapeHtml(r.entity_name)}</center>
          </div>

          <hr>
          <div class="scores">
            ${renderScores(r)}
          </div>

          <div class="scores">
          <br>
            <center>
              <button class="btn-bio btn-area">Ver Área</button>

              <div class="bio-content area-content" style="display:none; padding:1px; text-align:justify; margin-top:10px;">
                <strong>Instituição: </strong>${escapeHtml(r.institution || "-")}
                <br>
                <strong>Área: </strong>${escapeHtml(r.area || "-")}
                <br>
                <strong>${title === "Grupo de Pesquisa" ? "Linhas de Pesquisa" : "Área de Conhecimento"}: </strong>${escapeHtml(r.knowledge || "-")}
              </div>
            </center>
          </div>

          <div class="scores">
            ${
              title === "Pesquisador" ? `
                <center>
                  <button class="btn-bio">Ver Resumo Acadêmico</button>

                  <div class="bio-content" style="display:none; padding:1px; text-align:justify; margin-top:10px;">
                    ${escapeHtml(r.abstract || "Biografia não disponível.")}
                    <br><br>
                    <center>📍 
                    ${escapeHtml(r.city || "-")}<br><br>
                      <strong>Última atualização: </strong>${formatDate(r.last_update)}
                    </center>
                  </div>
                </center>
              `
                : ""
            }
          </div>

        </div>
        <br>
      `;
    })
    .join("");

  html += `</div>`;

  return html;
}


export function renderCompanyColumn(title, results) {
  let html = `<div class="result-column"><h3>${title}</h3>`;

  if (!results || results.length === 0) {
    html += `
      <div class="empty-results">
        Nenhum resultado disponível.
      </div>
    </div>
    `;

    return html;
  }

  html += results
    .map((r) => {
      const exactClass = r.lexical_score == 100 ? "exact-match" : "";

      return `
        <div class="result-item ${exactClass}">
          <div class="top-icon">
            ${
              r.lexical_score == 100
                ? "🔤"
                : "🧠"
            }
          </div>
          <div class="entity-name">
            <center>${escapeHtml(r.entity_name)}</center>
          </div>

          <hr>
          <div class="scores">
            ${renderScores(r)}
          </div>

          <div class="scores">
          <br>
            <center>
              <button class="btn-bio btn-area">Ver Área</button>

              <div class="bio-content area-content" style="display:none; padding:1px; text-align:justify; margin-top:10px;">
                <strong>Segmento: </strong>${escapeHtml(r.segment_original || "-")}
                <br>
                <strong>Subsegmento: </strong>${escapeHtml(r.subsegment_original || "-")}
                <br>
                <strong>Área: </strong>${escapeHtml(r.knowledge || "-")}
              </div>
            </center>
          </div>

          <div class="scores">
            <center>
              <button class="btn-bio">Ver detalhes</button>

              <div class="bio-content" style="display:none; padding:1px; text-align:justify; margin-top:10px;">
                <center>
                  ${
                    r.institutional_description ? escapeHtml(r.institutional_description.split("|")[0].trim()) : "Não disponível"
                  }
                </center>

                <hr>

                <strong>Missão: </strong> ${escapeHtml(r.mission || "-")}
                <br>
                <strong>Valores: </strong> ${escapeHtml(r.values || "-")}
                <br>
                <strong>Visão: </strong> ${escapeHtml(r.vision || "-")}

                <br><br> 
                <center>📍 ${escapeHtml(r.city || "-")}
                </center>
              </div>
            </center>
          </div>
        </div>

        <br>
      `;
    })
    .join("");

  html += `</div>`;

  return html;
}