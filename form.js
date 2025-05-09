document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.login-box');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    
    const emailInput = document.getElementById('Email').value.trim();
    const passwordInput = document.getElementById('password').value;

    
    const users = JSON.parse(localStorage.getItem('users')) || [];

  
    const matchedUser = users.find(
      (user) => user.email === emailInput && user.password === passwordInput
    );

    if (matchedUser) {
      
      localStorage.setItem('firstName', matchedUser.firstName);
      localStorage.setItem('lastName', matchedUser.lastName);
      localStorage.setItem('userType', matchedUser.userType);

      alert('Connexion réussie ! Bienvenue ' + matchedUser.firstName + ' ' + matchedUser.lastName);

      if (matchedUser.userType === 'Étudiant') {
        window.location.href = 'interface-etudiant.html';
      } else if (matchedUser.userType === 'Enseignant') {
        window.location.href = 'espace_ensignet_interface.html';
      }
    } else {
      alert('Email ou mot de passe incorrect.');
    }
  });
});