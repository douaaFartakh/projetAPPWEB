document.addEventListener("DOMContentLoaded", function () {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  if (firstName && lastName) {
    document.getElementById("username").textContent = `${firstName} ${lastName}`;
  } else {
    document.getElementById("username").textContent = "Nom d'utilisateur";
  }
});

function submitExamForm(event) {
  event.preventDefault();

  const titre = document.getElementById('titre').value;  

  localStorage.setItem('examTitle', titre);

  window.location.href = 'page-cree-examen.html';
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("exam-form").addEventListener("submit", submitExamForm);
});

