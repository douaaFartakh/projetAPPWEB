document.addEventListener("DOMContentLoaded", function () {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const userType = localStorage.getItem("userType");

    if (!firstName || !lastName || userType !== "Étudiant") {
        alert("Accès non autorisé. Veuillez vous connecter en tant qu'étudiant.");
        window.location.href = "form.html";
        return;
    }

    document.getElementById("username").textContent = `${firstName} ${lastName}`;

    const score = localStorage.getItem("examScore");
    const totalPoints = localStorage.getItem("totalPoints");
if (score && totalPoints && !isNaN(score) && !isNaN(totalPoints) && totalPoints > 0) {
        const scorePercentage = (score / totalPoints) * 100;
        document.getElementById("score").textContent = `Votre score : ${score} / ${totalPoints} (${scorePercentage.toFixed(2)}%)`;
    } else {
        document.getElementById("score").textContent = "Erreur : Score ou total des points non disponible.";
    }

    const userInfoBtn = document.getElementById("userInfoBtn");
    userInfoBtn.addEventListener("click", function () {
        const dropdown = document.getElementById("userDropdown");
        const arrow = document.querySelector(".arrow");
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
            arrow.classList.remove("up");
        } else {
            dropdown.style.display = "block";
            arrow.classList.add("up");
        }
    });

    document.getElementById("logoutLink").addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("userType");
        localStorage.removeItem("username");
        window.location.href = "form.html";
    });
});

function returnToHome() {
    window.location.href = "interface-etudiant.html";
}