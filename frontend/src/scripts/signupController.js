// signupController.js
import { initDB, addRecord } from "./db.js";

let db, state = {};

document.addEventListener("DOMContentLoaded", async () => {
  db = await initDB();

  // helper to get elements
  const $ = id => document.getElementById(id);

  // step containers
  const step1 = $("step1"), step2 = $("step2"), step3 = $("step3");
  const vendorBox = $("vendorFields"), userBox = $("userFields");
  const reviewDiv = $("reviewData"), msg = $("message");

  // show only one step
  const show = s => [step1, step2, step3].forEach(el => el.classList.toggle("active", el === s));

  // feedback
  const success = txt => msg.innerHTML = `<p style="color:green">${txt}</p>`;
  const error   = txt => msg.innerHTML = `<p style="color:red">${txt}</p>`;

  // Step 1: choose account type
  $("chooseVendor").onclick = () => {
    state = { accountType: "vendor" };
    vendorBox.style.display = "block";
    userBox.style.display   = "none";
    show(step2);
  };
  $("chooseUser").onclick   = () => {
    state = { accountType: "user" };
    vendorBox.style.display = "none";
    userBox.style.display   = "block";
    show(step2);
  };

  // Navigation buttons
  $("backToStep1").onclick = () => show(step1);
  $("backToStep2").onclick = () => show(step2);

  // Next → Step 3
  $("toStep3").onclick = () => {
    const data = collectStep2();
    if (!data) return;
    state = { ...state, ...data };
    renderReview();
    show(step3);
  };

  // Final submit
  $("registrationForm").onsubmit = async e => {
    e.preventDefault();
    const store = state.accountType === "user" ? "users" : "vendors";

    if (store === "users") {
      // check duplicate email
      const exists = await new Promise(r => {
        const req = db.transaction("users").objectStore("users").get(state.email);
        req.onsuccess = () => r(!!req.result);
      });
      if (exists) { error("Email already registered"); return; }
    }

    await addRecord(store, state);
    success(`${state.accountType} registered!`);
    setTimeout(() => location.href = "index.html", 1200); // redirect to main page 
  };

  // ===== helpers =====
  function collectStep2() {
    if (state.accountType === "vendor") {
      const businessName = $("businessName").value.trim();
      const contact      = $("contact").value.trim();
      const operating    = $("operatingHours").value.trim();
      if (!businessName || !contact || !operating) {
        alert("Fill all vendor fields"); return null;
      }
      return { businessName, contact, operatingHours: operating };
    }
    if (state.accountType === "user") {
      const email     = $("email").value.trim();
      const password  = $("password").value.trim();
      const firstName = $("firstName").value.trim();
      const lastName  = $("lastName").value.trim();
      if (!email || !password || !firstName || !lastName) {
        alert("Fill all user fields"); return null;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Invalid email"); return null;
      }
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_]).{8,}$/.test(password)) {
        alert("Weak password"); return null;
      }
      return { email, password, firstName, lastName };
    }
    return null;
  }

  function renderReview() {
    reviewDiv.innerHTML = Object.entries(state)
      .map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`)
      .join("");
  }
});
