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

registerForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const name = document.getElementById('register-name').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      message.textContent = data.message;
      message.style.color = 'green';
      registerForm.reset();
      toggleForm();
    } else {
      message.textContent = data.message || 'Registration failed';
      message.style.color = 'red';
    }
  } catch (err) {
    console.error('Registration error:', err);
    message.textContent = 'An error occurred. Please try again.';
    message.style.color = 'red';
  }
});

loginForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('loggedInUser', email);
      window.location.href = 'dashboard.html';
    } else {
      message.textContent = data.message || 'Login failed';
      message.style.color = 'red';
    }
  } catch (err) {
    console.error('Login error:', err);
    message.textContent = 'An error occurred. Please try again.';
    message.style.color = 'red';
  }
});