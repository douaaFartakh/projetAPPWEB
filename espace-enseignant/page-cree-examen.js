const typeSelect = document.getElementById("type_question");
const qcmForm = document.getElementById("qcmForm");
const directeForm = document.getElementById("directeForm");
const questionsList = document.getElementById("questionsList");
const questionsContent = document.getElementById("questionsContent");
const examTitle = document.getElementById("examTitle");
const examLegend = document.getElementById("examLegend");

const examData = {
  title: "",
  questions: []
};

examTitle.addEventListener("input", () => {
  examLegend.textContent = examTitle.value || "Examen";
  examData.title = examTitle.value;
});

typeSelect.addEventListener("change", () => {
  qcmForm.style.display = typeSelect.value === "qcm" ? "block" : "none";
  directeForm.style.display = typeSelect.value === "directe" ? "block" : "none";
});

function ajouterOptionQCM() {
  const container = document.getElementById("optionsContainer_qcm");
  const index = container.querySelectorAll("input").length + 1;
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = `Option ${index}`;
  input.className = "optionInput_qcm";
  container.appendChild(input);
}

function viderChampsQCM() {
  document.getElementById("enonce_qcm").value = "";
  document.getElementById("media_qcm").value = "";
  document.getElementById("bonnes_reponses").value = "";
  document.getElementById("note_qcm").value = "";
  document.getElementById("duree_qcm").value = "";
  document.getElementById("optionsContainer_qcm").innerHTML = `
    <input type="text" placeholder="Option 1" class="optionInput_qcm">
    <input type="text" placeholder="Option 2" class="optionInput_qcm">
  `;
}

function ajouterQuestionQCM() {
  const enonce = document.getElementById("enonce_qcm").value.trim();
  const options = Array.from(document.querySelectorAll(".optionInput_qcm")).map(input => input.value.trim());
  const bonnes_reponses = document.getElementById("bonnes_reponses").value.trim();
  const note = document.getElementById("note_qcm").value.trim();
  const duree = document.getElementById("duree_qcm").value.trim();

  if (!enonce || options.length === 0 || !bonnes_reponses || !note || !duree) {
    alert("Veuillez remplir tous les champs de la question QCM.");
    return;
  }

  const media = document.getElementById("media_qcm").files[0]?.name || "Aucun";

  const question = {
    type: "qcm",
    enonce,
    media,
    options,
    bonnes_reponses,
    note,
    duree
  };

  examData.questions.push(question);
  afficherQuestions();
  viderChampsQCM();
}

function ajouterQuestionDirecte() {
  const enonce = document.getElementById("enonce_directe").value.trim();
  const reponse = document.getElementById("reponse_directe").value.trim();
  const tolerance = document.getElementById("tolerance").value.trim();
  const note = document.getElementById("note_directe").value.trim();
  const duree = document.getElementById("duree_directe").value.trim();

  if (!enonce || !reponse || !tolerance || !note || !duree) {
    alert("Veuillez remplir tous les champs de la question directe.");
    return;
  }

  const media = document.getElementById("media_directe").files[0]?.name || "Aucun";

  const question = {
    type: "directe",
    enonce,
    media,
    reponse,
    tolerance,
    note,
    duree
  };

  examData.questions.push(question);
  afficherQuestions();
  viderChampsDirecte();
}

function viderChampsDirecte() {
  document.getElementById("enonce_directe").value = "";
  document.getElementById("media_directe").value = "";
  document.getElementById("reponse_directe").value = "";
  document.getElementById("tolerance").value = "";
  document.getElementById("note_directe").value = "";
  document.getElementById("duree_directe").value = "";
}

function afficherQuestions() {
  questionsContent.innerHTML = "";
  examData.questions.forEach((question, index) => {
    const questionHTML = `
      <div class="question-item">
        <div class="icon-button">
          <i onclick="supprimerQuestion(${index})">🗑️</i>
          <i onclick="alert('Modification à implémenter')">✏️</i>
        </div>
        <div class="question-left"><strong>${question.type === "qcm" ? "QCM" : "Directe"}</strong></div>
        <div class="question-right">
          <p><strong>Énoncé:</strong> ${question.enonce}</p>
          <p><strong>Fichier:</strong> ${question.media}</p>
          ${question.type === "qcm" ? `<p><strong>Options:</strong> ${question.options.join(", ")}</p>` : ""}
          <p><strong>Réponse attendue:</strong> ${question.reponse || "Non définie"}</p>
          <p><strong>Note:</strong> ${question.note} | <strong>Durée:</strong> ${question.duree} s</p>
        </div>
      </div>
    `;
    questionsContent.innerHTML += questionHTML;
  });
  questionsList.style.display = "block";
}

function supprimerQuestion(index) {
  examData.questions.splice(index, 1);
  afficherQuestions();
}

function enregistrerExamen() {
  if (examData.questions.length === 0) {
    alert("Veuillez ajouter au moins une question avant d'enregistrer l'examen.");
    return;
  }

  const examId = encodeURIComponent(examData.title.replace(/\s+/g, '-').toLowerCase()) + "-" + new Date().getTime();
  localStorage.setItem(examId, JSON.stringify(examData));

  const examLink = `${window.location.origin}/exam.html?id=${examId}`;
  document.getElementById("examLink").innerHTML = `IMPORTANT : Veuillez enregistrer les données aprés chaque modification des qestions <br/> Votre examen est enregistré. Voici votre lien : <a href="${examLink}" target="_blank">${examLink}</a>`;
  document.getElementById("examLink").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
const titre = localStorage.getItem("examTitre");
if (titre) {
  examTitle.value = titre;
  examLegend.textContent = titre;
  examData.title = titre;
}
  });