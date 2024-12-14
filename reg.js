// Parolni tekshirish va boshqa sahifaga otish
function checkPassword() {
    var passwordInput = document.getElementById("passwordInput").value;
    var correctPassword = "ogabek"; // O'zgartiring: Kerakli parolni yozing
    if (passwordInput === correctPassword) {
        // Parol to'g'ri bo'lsa, boshqa sahifaga otish
        window.location.href = "index.html"; // Boshqa sahifaning URL manzili
    } else {
        alert("Noto'g'ri parol! Iltimos, qaytadan urinib ko'ring.");
    }
}
