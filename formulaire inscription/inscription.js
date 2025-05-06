document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        
        const firstName = form.querySelector('input[placeholder="Prénom"]').value.trim();
        const lastName = form.querySelector('input[placeholder="Nom"]').value.trim();
        const email = form.querySelector('input[type="email"]').value.trim();
        const password = form.querySelector('input[type="password"]').value;
        const establishment = form.querySelector('select').value;
        const fieldOfStudy = form.querySelector('select[required]').value;
        const gender = form.querySelector('input[name="gender"]:checked');
        const userType = form.querySelector('input[name="type"]:checked');

       
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
        } else {
            
            const userData = {
                firstName,
                lastName,
                email,
                password,
                establishment,
                fieldOfStudy,
                gender: gender.value,
                userType: userType.value
            };

            localStorage.setItem('utilisateurEnregistre', JSON.stringify(userData));
            alert('Inscription réussie !');

                
            window.location.href = 'form.html';
        }
    });
});
