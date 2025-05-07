// JavaScript
function submitExamForm(event) {
  event.preventDefault();

  const titre = document.getElementById('titre').value;

  // نخزن العنوان في localStorage
  localStorage.setItem('examTitre', titre);

  // ننتقل للصفحة الثانية
  window.location.href = 'page-cree-examen.html';
}

document.getElementById("examForm").addEventListener("submit", submitExamForm);
