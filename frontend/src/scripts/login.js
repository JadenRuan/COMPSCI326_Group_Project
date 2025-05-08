// scripts/login.js
document.getElementById("login-form").onsubmit = async function (e) {
  e.preventDefault();
  const msg = document.getElementById("message");
  msg.innerHTML = ""; // Clear previous message

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    msg.innerHTML = ``;

    const data = await res.json();
    if (res.ok) {
      msg.innerHTML = `<p style="color:green">${data.message}</p>`;
      setTimeout(() => location.href = "/", 1000);
    } else {
      msg.innerHTML = `<p style="color:red">${data.message}</p>`;
    }
  } catch (err) {
    msg.innerHTML = `<p style="color:red">${err.message}</p>`;
  }
};
