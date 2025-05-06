
function submitExamForm(event) {
    event.preventDefault();
  
    const titre = document.getElementById('titre').value;
    const semestre = document.getElementById('semestre').value;
    const filiere = document.getElementById('filiere').value;
  
    
    localStorage.setItem('examTitre', titre);
    localStorage.setItem('examSemestre', semestre);
    localStorage.setItem('examFiliere', filiere);
  
    
    window.location.href = 'exam.html';
  }
  document.getElementById("logoutBtn").addEventListener("click", () => {
    alert("Déconnexion réussie !");
    
  });