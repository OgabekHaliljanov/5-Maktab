document.addEventListener('DOMContentLoaded', function() {
  var openLoginModalBtn = document.getElementById('openLoginModalBtn');
  var loginModal = document.getElementById('loginModal');
  var closeBtn = document.querySelector('.close-btn');
  var loginForm = document.getElementById('loginForm');

  // Open modal
  openLoginModalBtn.addEventListener('click', function() {
      loginModal.style.display = 'block';
  });

  // Close modal
  closeBtn.addEventListener('click', function() {
      loginModal.style.display = 'none';
  });

  // Close modal if clicked outside
  window.addEventListener('click', function(event) {
      if (event.target === loginModal) {
          loginModal.style.display = 'none';
      }
  });

  // Handle form submission
  loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      // Get the input values
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;

      // Validate credentials (replace with your own logic)
      if (username === '1234' && password === '1234') {
          window.location.href = './koshish.html'; // Redirect on success
      } else {
          alert('Invalid credentials. Please try again.');
      }
  });
});

document.getElementById("toggleMenuBtn").addEventListener("click", function() {
  var menu = document.getElementById("menu");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
});
var hotbod = document.querySelector("body");

function doStuff() {
    hotbod.className += " animate";
}

window.onload = function() {
    doStuff();
};
