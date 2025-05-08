// signupController.js
import { initDB } from "./db.js";

let db, state = {};

document.addEventListener("DOMContentLoaded", async () => {
  db = await initDB();
  const $ = id => document.getElementById(id);

  // Steps
  const step1 = $("step1"),
        step2 = $("step2"),
        step3 = $("step3"),
        step4 = $("step4");

  // Field containers
  const vendorFields = $("vendorFields"),
        userFields   = $("userFields");

  // Review & message
  const reviewDiv = $("reviewData"),
        msg       = $("message");

  // Show one step
  const show = s => [step1, step2, step3, step4]
    .forEach(el => el.classList.toggle("active", el === s));

  const success = txt => msg.innerHTML = `<p style="color:green">${txt}</p>`;
  const error   = txt => msg.innerHTML = `<p style="color:red">${txt}</p>`;

  // Step 1: choose account type
  $("chooseVendor").onclick = () => {
    state = { accountType: "vendor" };
    vendorFields.style.display = "block";
    userFields.style.display   = "none";
    show(step2);
  };
  $("chooseUser").onclick = () => {
    state = { accountType: "user" };
    vendorFields.style.display = "none";
    userFields.style.display   = "block";
    show(step2);
  };

  // Navigation
  $("backToStep1").onclick = () => show(step1);
  $("backToStep2").onclick = () => show(step2);
  $("backToStep3").onclick = () => show(step3);

  // Next: from details → credentials
  $("toStep3").onclick = () => {
    if (!collectDetails()) return;
    show(step3);
  };

  // Next: from credentials → review
  $("toStep4").onclick = () => {
    if (!collectCreds()) return;
    renderReview();
    show(step4);
  };

  // Back from review
  $("backToStep3").onclick = () => show(step3);

  // Final submit
  $("registrationForm").onsubmit = async e => {
    e.preventDefault();
    msg.innerHTML = "";
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state)
      });
      const result = await res.json();
      if (!res.ok) error(result.message);
      else {
        success(result.message);
        localStorage.setItem('loggedInUser', email);
        window.location.href = 'dashboard.html';
      }
    } catch (err) {
      error(err.message);
    }
  };

  // Helpers
  function collectDetails() {
    if (state.accountType === "vendor") {
      const b = $("businessName").value.trim(),
            c = $("contact").value.trim(),
            o = $("operatingHours").value.trim();
      if (!b || !c || !o) { alert("Fill all vendor fields."); return false; }
      Object.assign(state, { businessName: b, contact: c, operatingHours: o });
    } else {
      const f = $("firstName").value.trim(),
            l = $("lastName").value.trim();
      if (!f || !l) { alert("Fill both names."); return false; }
      Object.assign(state, { firstName: f, lastName: l });
    }
    return true;
  }

  function collectCreds() {
    const e = $("emailCred").value.trim(),
          p = $("passwordCred").value.trim();
    if (!e || !p) { alert("Fill email & password."); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) { alert("Invalid email."); return false; }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_]).{8,}$/.test(p)) {
      alert("Password too weak."); return false;
    }
    Object.assign(state, { email: e, password: p });
    return true;
  }

  function renderReview() {
    reviewDiv.innerHTML = Object.entries(state)
      .map(([k,v]) => `<p><strong>${k}:</strong> ${v}</p>`)
      .join("");
  }
});
