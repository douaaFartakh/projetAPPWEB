function getAllExams() {
  const exams = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    
    if (key && key.startsWith('exam-')) {
      try {
        const examData = JSON.parse(localStorage.getItem(key));
        
        if (examData && examData.title) {
          exams.push({
            id: key,
            name: examData.title,
            date: examData.date || new Date(parseInt(key.split('-')[1])).toLocaleDateString(),
            professor: examData.professor || 'Non spécifié',
            filiere: examData.filiere || 'Non spécifiée',
            semestre: examData.semestre || 'Non spécifié',
            link: `exam.html?id=${key}`,
            questionsCount: examData.questions ? examData.questions.length : 0
          });
        }
      } catch (e) {
        console.error('Erreur de lecture:', key, e);
      }
    }
  }
  
  return exams;
}

function displayExams() {
  const exams = getAllExams();
  const container = document.getElementById('examsContainer');
  const documentList = document.getElementById('documentList');
  
  container.innerHTML = '';
  documentList.style.display = 'none';
  
  if (exams.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        Aucun examen enregistré pour le moment.
      </div>
    `;
    return;
  }
  
  exams.forEach(exam => {
    const examElement = document.createElement('div');
    examElement.className = 'file-item';
    examElement.innerHTML = `
      <span>${exam.name} | ${exam.semestre} | ${exam.filiere} | ${exam.date} | ${exam.professor}</span>
      <div>
        <button class="access-btn" onclick="accessExam('${exam.link}')">Accéder</button>
        <button class="delete-btn" onclick="confirmDelete('${exam.id}', '${exam.name}')">Supprimer</button>
      </div>
    `;
    container.appendChild(examElement);
  });
}

function accessExam(link) {
  window.open(link, '_blank');
}

function confirmDelete(examId, examName) {
  if (confirm(`Voulez-vous vraiment supprimer l'examen "${examName}" ?`)) {
    localStorage.removeItem(examId);
    displayExams();
    alert(`L'examen "${examName}" a été supprimé.`);
  }
}

function searchFiles() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const resultsSection = document.getElementById('resultsSection');
  resultsSection.style.display = 'block';

  const exams = getAllExams();
  const filteredExams = exams.filter(exam => 
    exam.name.toLowerCase().includes(query) || 
    exam.filiere.toLowerCase().includes(query) ||
    exam.semestre.toLowerCase().includes(query) ||
    exam.professor.toLowerCase().includes(query)
  );

  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = '';
  
  if (filteredExams.length === 0) {
    searchResults.innerHTML = `<div class="empty-state">Aucun résultat trouvé</div>`;
    return;
  }
  
  filteredExams.forEach(exam => {
    const examElement = document.createElement('div');
    examElement.className = 'file-item';
    examElement.innerHTML = `
      <span>${exam.name} | ${exam.semestre} | ${exam.filiere}</span>
      <div>
        <button class="access-btn" onclick="accessExam('${exam.link}')">Accéder</button>
      </div>
    `;
    searchResults.appendChild(examElement);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  displayExams();
});

document.getElementById('searchInput').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    searchFiles();
  }
});