
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form inputs
        const firstName = form.querySelector('input[placeholder="Prénom"]').value.trim();
        const lastName = form.querySelector('input[placeholder="Nom"]').value.trim();
        const email = form.querySelector('input[type="email"]').value.trim();
        const password = form.querySelector('input[type="password"]').value;
        const establishment = form.querySelector('select').value;
        const fieldOfStudy = form.querySelector('select[required]').value;
        const gender = form.querySelector('input[name="gender"]:checked');
        const userType = form.querySelector('input[name="type"]:checked');

        // Validation flags
        let isValid = true;
        let errorMessage = '';

        // Validate First Name
        if (!firstName) {
            isValid = false;
            errorMessage += 'Le prénom est requis.\n';
        }

        // Validate Last Name
        if (!lastName) {
            isValid = false;
            errorMessage += 'Le nom est requis.\n';
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            isValid = false;
            errorMessage += 'L\'email est requis.\n';
        } else if (!emailRegex.test(email)) {
            isValid = false;
            errorMessage += 'Veuillez entrer un email valide.\n';
        }

        // Validate Password
        if (!password) {
            isValid = false;
            errorMessage += 'Le mot de passe est requis.\n';
        } else if (password.length < 8) {
            isValid = false;
            errorMessage += 'Le mot de passe doit contenir au moins 8 caractères.\n';
        }

        // Validate Establishment
        if (!establishment || establishment === 'Établissement') {
            isValid = false;
            errorMessage += 'Veuillez sélectionner un établissement.\n';
        }

        // Validate Field of Study
        if (!fieldOfStudy || fieldOfStudy === 'Établissement et Filière') {
            isValid = false;
            errorMessage += 'Veuillez sélectionner une filière.\n';
        }

        // Validate Gender
        if (!gender) {
            isValid = false;
            errorMessage += 'Veuillez sélectionner un sexe.\n';
        }

        // Validate User Type
        if (!userType) {
            isValid = false;
            errorMessage += 'Veuillez sélectionner un type d\'utilisateur.\n';
        }

        // Display errors or submit form
        if (!isValid) {
            alert(errorMessage);
        } else {
            // Simulate form submission (replace with actual submission logic)
            console.log({
                firstName,
                lastName,
                email,
                password,
                establishment,
                fieldOfStudy,
                gender: gender.value,
                userType: userType.value
            });
            alert('Inscription réussie !');
            form.reset(); // Reset form after successful submission
        }
    });
});