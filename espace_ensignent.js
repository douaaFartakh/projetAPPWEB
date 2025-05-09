document.addEventListener("DOMContentLoaded", function () {
 
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const userType = localStorage.getItem("userType");


  if (!firstName || !lastName || userType !== "Enseignant") {
    alert("Veuillez vous connecter en tant qu'enseignant.");
    window.location.href = "form.html";
    return;
  }
      
      document.getElementById("username").textContent = `${firstName} ${lastName}`;
  
      
      const userInfoBtn = document.getElementById("userInfoBtn");
      userInfoBtn.addEventListener("click", function () {
        const dropdown = document.getElementById("userDropdown");
        const arrow = document.querySelector(".arrow");
        dropdown.style.display =
          dropdown.style.display === "block" ? "none" : "block";
        arrow.classList.toggle("up");
      });
  
      
      document.getElementById("logoutLink").addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.clear();
        window.location.href = "form.html";
      });
    });