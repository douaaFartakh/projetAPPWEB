function submitExamForm(event) {
  event.preventDefault();

  const titre = document.getElementById('titre').value;

  localStorage.setItem('examTitre', titre);

  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  document.getElementById("username").textContent = `${firstName} ${lastName}`;

  window.location.href = 'page-cree-examen.html';
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("exam-form").addEventListener("submit", submitExamForm);
});
