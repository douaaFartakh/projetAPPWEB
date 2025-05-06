let examFiles = JSON.parse(localStorage.getItem('examFiles')) || [];


function displayFiles(files, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  if (files.length === 0) {
    container.innerHTML = `<div class="empty-state">Aucun examen trouvé ! Essayez une autre recherche.</div>`;
    return;
  }

  files.forEach(file => {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.innerHTML = `
      <span>${file.name} | ${file.semestre} | ${file.filiere} | ${file.date} | ${file.professor}</span>
      <div>
        <button class="access-btn" onclick="accessFile('${file.link}')">Accéder</button>
        <button class="delete-btn" onclick="confirmDelete(${file.id})">Supprimer</button>
      </div>
    `;
    container.appendChild(fileItem);
  });
}


displayFiles(examFiles, 'documentList');


function searchFiles() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const resultsSection = document.getElementById('resultsSection');
  resultsSection.style.display = 'block';

  const filteredFiles = examFiles.filter(file => 
    file.name.toLowerCase().includes(query) || file.link.toLowerCase().includes(query)
  );
  displayFiles(filteredFiles, 'searchResults');
}


function accessFile(link) {
  alert(`Vous accédez au fichier : ${link}`);
}


function confirmDelete(fileId) {
  const confirmed = confirm('Êtes-vous sûr de vouloir supprimer ce fichier ? Cette action est irréversible !');
  if (confirmed) {
    examFiles = examFiles.filter(file => file.id !== fileId);
    localStorage.setItem('examFiles', JSON.stringify(examFiles));
    displayFiles(examFiles, 'documentList');
    document.getElementById('resultsSection').style.display = 'none';
  }
}

document.getElementById("logoutBtn").addEventListener("click", () => {
alert("Déconnexion réussie !");



});

