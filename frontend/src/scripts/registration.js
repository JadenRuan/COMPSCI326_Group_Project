// scripts/registration.js
import { initDB, addRecord } from "./userDB.js";

let db;
let formData = {};

document.addEventListener("DOMContentLoaded", async () => {
  db = await initDB();

  const form = document.getElementById("registrationForm");
  const msg = document.getElementById("message");

  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");

  const vendorFields = document.getElementById("vendorFields");
  const userFields = document.getElementById("userFields");
  const reviewDiv = document.getElementById("reviewData");

  const nextStep = document.getElementById("toStep3");
  const backToStep1 = document.getElementById("backToStep1");
  const backToStep2 = document.getElementById("backToStep2");

  document.getElementById("chooseVendor").addEventListener("click", () => {
    formData.accountType = "vendor";
    step1.classList.remove("active");
    step2.classList.add("active");
    vendorFields.style.display = "block";
    userFields.style.display = "none";
  });

  document.getElementById("chooseUser").addEventListener("click", () => {
    formData.accountType = "user";
    step1.classList.remove("active");
    step2.classList.add("active");
    vendorFields.style.display = "none";
    userFields.style.display = "block";
  });

  backToStep1.addEventListener("click", () => {
    step2.classList.remove("active");
    step1.classList.add("active");
  });

  backToStep2.addEventListener("click", () => {
    step3.classList.remove("active");
    step2.classList.add("active");
  });

  nextStep.addEventListener("click", () => {
    const data = collectFormData();

    if (!data) return;

    formData = { ...formData, ...data };
    updateReview();
    step2.classList.remove("active");
    step3.classList.add("active");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!db) {
      msg.innerHTML = `<p style="color:red">Page is not ready.</p>`;
      return;
    }

    const isUser = formData.accountType === "user";
    const storeName = isUser ? "users" : "vendors";

    if (isUser) {
      const tx = db.transaction(["users"], "readonly");
      const store = tx.objectStore("users");
      const getReq = store.get(formData.email);
      getReq.onsuccess = async () => {
        if (getReq.result) {
          msg.innerHTML = `<p style="color:red">User already exists.</p>`;
        } else {
          await addRecord("users", formData);
          msg.innerHTML = `<p style="color:green">User registered!</p>`;
          setTimeout(() => (window.location.href = "home.html"), 1500);
        }
      };
    } else {
      await addRecord("vendors", formData);
      msg.innerHTML = `<p style="color:green">Vendor registered!</p>`;
      setTimeout(() => (window.location.href = "home.html"), 1500);
    }
  });

  function updateReview() {
    reviewDiv.innerHTML = "";
    for (const [key, value] of Object.entries(formData)) {
      reviewDiv.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
    }
  }

  function collectFormData() {
    if (formData.accountType === "vendor") {
      const businessName = document.getElementById("businessName").value.trim();
      const contact = document.getElementById("contact").value.trim();
      const operatingHours = document.getElementById("operatingHours").value.trim();

      if (!businessName || !contact || !operatingHours) {
        alert("Please fill in all vendor fields.");
        return null;
      }

      return { businessName, contact, operatingHours };
    }

    if (formData.accountType === "user") {
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();

      if (!email || !password || !firstName || !lastName) {
        alert("Please complete all user fields.");
        return null;
      }

      if (!validateEmail(email)) {
        alert("Invalid email format.");
        return null;
      }

      if (!validatePassword(password)) {
        alert("Password must include 8+ characters, upper/lowercase, number, symbol.");
        return null;
      }

      return { email, password, firstName, lastName };
    }

    return null;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePassword(pwd) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/.test(pwd);
  }
});
