// JavaScript
function submitExamForm(event) {
  event.preventDefault();

  const titre = document.getElementById('titre').value;

  
  localStorage.setItem('examTitre', titre);

  window.location.href = 'page-cree-examen.html';
}

document.getElementById("examForm").addEventListener("submit", submitExamForm);
