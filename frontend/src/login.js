let db;
const request = indexedDB.open("UserDB", 2);

request.onupgradeneeded = function (event) {
  db = event.target.result;
  if (!db.objectStoreNames.contains("users")) {
    const userStore = db.createObjectStore("users", { keyPath: "email" });
    userStore.createIndex("email", "email", { unique: true });
  }
  if (!db.objectStoreNames.contains("vendors")) {
    const vendorStore = db.createObjectStore("vendors", { keyPath: "email" });
  }
};

request.onsuccess = function (event) {
  db = event.target.result;
};

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const formTitle = document.getElementById('form-title');
const toggleText = document.querySelector('.toggle');
const message = document.getElementById('message');

function toggleForm() {
  loginForm.classList.toggle('active');
  registerForm.classList.toggle('active');
  formTitle.textContent = loginForm.classList.contains('active') ? 'Login' : 'Register';
  toggleText.textContent = loginForm.classList.contains('active') ? "Don't have an account? Register" : "Already have an account? Login";
  message.textContent = '';
}

registerForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('register-name').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;

  const tx = db.transaction(["users"], "readwrite");
  const store = tx.objectStore("users");
  const checkUser = store.get(email);

  checkUser.onsuccess = function () {
    if (checkUser.result) {
      message.textContent = "User already exists.";
      message.style.color = "red";
    } else {
      store.add({ name, email, password });
      message.textContent = "Registered successfully!";
      message.style.color = "green";
      registerForm.reset();
    }
  };
});

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  const tx = db.transaction(["users"], "readonly");
  const store = tx.objectStore("users");
  const userRequest = store.get(email);

  userRequest.onsuccess = function () {
    const user = userRequest.result;
    if (user && user.password === password) {
      localStorage.setItem("loggedInUser", email);
      window.location.href = "dashboard.html";
    } else {
      message.textContent = "Invalid email or password.";
      message.style.color = "red";
    }
  };
});