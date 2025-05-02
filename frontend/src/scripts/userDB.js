import { initDB, addRecord, getDB } from "./db.js";

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

  const backToStep1 = document.getElementById("backToStep1");
  const nextStep = document.getElementById("toStep3");
  const backToStep2 = document.getElementById("backToStep2");

  document.getElementById("chooseVendor").addEventListener("click", () => {
    formData.accountType = "vendor";
    vendorFields.style.display = "block";
    userFields.style.display = "none";
    step1.classList.remove("active");
    step2.classList.add("active");
  });

  document.getElementById("chooseUser").addEventListener("click", () => {
    formData.accountType = "user";
    vendorFields.style.display = "none";
    userFields.style.display = "block";
    step1.classList.remove("active");
    step2.classList.add("active");
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
    const isUser = formData.accountType === "user";
    const storeName = isUser ? "users" : "vendors";

    try {
      if (isUser) {
        const tx = db.transaction("users", "readonly");
        const store = tx.objectStore("users");
        const getReq = store.get(formData.email);
        getReq.onsuccess = async () => {
          if (getReq.result) {
            msg.innerHTML = `<p style="color:red">A user with this email already exists.</p>`;
          } else {
            await addRecord("users", formData);
            msg.innerHTML = `<p style="color:green">User registered successfully!</p>`;
            setTimeout(() => window.location.href = "home.html", 1500);
          }
        };
      } else {
        await addRecord("vendors", formData);
        msg.innerHTML = `<p style="color:green">Vendor registered successfully!</p>`;
        setTimeout(() => window.location.href = "home.html", 1500);
      }
    } catch (err) {
      msg.innerHTML = `<p style="color:red">Error: ${err.message}</p>`;
    }
  });

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
        alert("Please fill in all user fields.");
        return null;
      }

      if (!validateEmail(email)) {
        alert("Please enter a valid email.");
        return null;
      }

      if (!validatePassword(password)) {
        alert("Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 symbol.");
        return null;
      }

      return { email, password, firstName, lastName };
    }

    return null;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/.test(password);
  }

  function updateReview() {
    reviewDiv.innerHTML = "";
    Object.entries(formData).forEach(([key, value]) => {
      reviewDiv.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
    });
  }
});
