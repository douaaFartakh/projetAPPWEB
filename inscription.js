document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Récupérer les valeurs des champs
      const firstName = form.querySelector('input[placeholder="Prénom"]').value.trim();
      const lastName = form.querySelector('input[placeholder="Nom"]').value.trim();
      const email = form.querySelector('input[type="email"]').value.trim();
      const password = form.querySelector('input[type="password"]').value;
      const dateOfBirth = form.querySelector('input[type="date"]').value;
      const establishment = form.querySelector('select').value;
      const fieldOfStudy = form.querySelector('select[required]').value;
      const gender = form.querySelector('input[name="gender"]:checked');
      const userType = form.querySelector('input[name="type"]:checked');
  
      // Validation des champs
      let isValid = true;
      let errorMessage = '';
  
      if (!firstName) {
        isValid = false;
        errorMessage += 'Le prénom est requis.\n';
      }
  
      if (!lastName) {
        isValid = false;
        errorMessage += 'Le nom est requis.\n';
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        isValid = false;
        errorMessage += 'Email invalide.\n';
      }
  
      if (!password || password.length < 8) {
        isValid = false;
        errorMessage += 'Mot de passe trop court (min 8 caractères).\n';
      }
  
      if (!dateOfBirth) {
        isValid = false;
        errorMessage += 'Date de naissance requise.\n';
      }
  
      if (!establishment || establishment === 'Établissement') {
        isValid = false;
        errorMessage += 'Établissement requis.\n';
      }
  
      if (!fieldOfStudy || fieldOfStudy === 'Établissement et Filière') {
        isValid = false;
        errorMessage += 'Filière requise.\n';
      }
  
      if (!gender) {
        isValid = false;
        errorMessage += 'Sexe requis.\n';
      }
  
      if (!userType) {
        isValid = false;
        errorMessage += 'Type d\'utilisateur requis.\n';
      }
  
      if (!isValid) {
        alert(errorMessage);
        return;
      }
  
      // Récupérer les utilisateurs existants
      const users = JSON.parse(localStorage.getItem('users')) || [];
  
      // Vérifier si l'email existe déjà
      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        alert('Erreur : Cet email est déjà utilisé.');
        return;
      }
  
      // Créer un nouvel utilisateur
      const userData = {
        firstName,
        lastName,
        email,
        password,
        dateOfBirth,
        establishment,
        fieldOfStudy,
        gender: gender.value,
        userType: userType.value,
      };
  
      // Ajouter l'utilisateur au tableau
      users.push(userData);
      localStorage.setItem('users', JSON.stringify(users));
  
      alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      window.location.href = 'form.html';
    });
  });