document.addEventListener("DOMContentLoaded", function() {
  const storedUser = localStorage.getItem("username");
  if (storedUser) {
    document.getElementById("username").textContent = storedUser;
  }

  const userInfoBtn = document.getElementById("userInfoBtn");
  userInfoBtn.addEventListener("click", function() {
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

  document.getElementById("logoutLink").addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.removeItem("username");
    window.location.href = "form.html";
  });

  document.getElementById("pasteBtn").addEventListener("click", async function() {
    try {
      const text = await navigator.clipboard.readText();
      document.getElementById("urlInput").value = text;
    } catch (err) {
      alert("Impossible de coller. Autorisez l'accès au presse-papiers.");
    }
  });

  
  document.getElementById("startBtn").addEventListener("click", function() {
    const input = document.getElementById("urlInput");
    const pattern = /^https:\/\/examen\.foxmind\.com\/.+/;
    if (!input.checkValidity() || !pattern.test(input.value)) {
      alert("Veuillez entrer un lien d'examen valide (ex : https://examen.foxmind.com/...)");
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const coords = { latitude: position.coords.latitude, longitude: position.coords.longitude };
          localStorage.setItem("geolocation", JSON.stringify(coords));
          alert(`Géolocalisation enregistrée : Lat ${coords.latitude}, Lon ${coords.longitude}`);
          window.location.href = "exam-etudiant.html";
        },
        function(error) {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("Vous avez refusé la géolocalisation. Autorisez-la pour continuer.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Position indisponible. Vérifiez votre connexion.");
              break;
            case error.TIMEOUT:
              alert("La demande de géolocalisation a expiré. Réessayez.");
              break;
            default:
              alert("Erreur inconnue lors de la géolocalisation.");
          }
        }
      );
    } else {
      alert("Géolocalisation non supportée par votre navigateur.");
    }
  });
});

