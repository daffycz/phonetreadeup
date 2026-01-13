/* -----------------------------
   PhoneTradeUp App Logic
--------------------------------*/

// Load saved models from localStorage
let models = JSON.parse(localStorage.getItem("models")) || [];

// Load saved admin PIN
let adminPIN = localStorage.getItem("adminPIN") || "1234";

// DOM elements
const modelSelect = document.getElementById("model-select");
const conditionSelect = document.getElementById("condition-select");
const notesInput = document.getElementById("notes-input");
const calculateBtn = document.getElementById("calculate-btn");
const offerResult = document.getElementById("offer-result");
const offerAmount = document.getElementById("offer-amount");
const offerDetails = document.getElementById("offer-details");

const adminSection = document.getElementById("admin-section");
const calculatorSection = document.getElementById("calculator-section");
const openAdminBtn = document.getElementById("open-admin-btn");
const closeAdminBtn = document.getElementById("close-admin-btn");

const adminLoginCard = document.getElementById("admin-login-card");
const adminContent = document.getElementById("admin-content");
const adminPinInput = document.getElementById("admin-pin-input");
const adminLoginBtn = document.getElementById("admin-login-btn");

const newPinInput = document.getElementById("new-pin-input");
const updatePinBtn = document.getElementById("update-pin-btn");

const modelNameInput = document.getElementById("model-name-input");
const modelPriceInput = document.getElementById("model-price-input");
const addModelBtn = document.getElementById("add-model-btn");
const modelsList = document.getElementById("models-list");

/* -----------------------------
   Populate Model Dropdown
--------------------------------*/
function refreshModelDropdown() {
  modelSelect.innerHTML = "";
  models.forEach(m => {
    const option = document.createElement("option");
    option.value = m.name;
    option.textContent = `${m.name} ($${m.price})`;
    modelSelect.appendChild(option);
  });
}

refreshModelDropdown();

/* -----------------------------
   Calculate Offer
--------------------------------*/
calculateBtn.addEventListener("click", () => {
  if (models.length === 0) {
    alert("No phone models added yet.");
    return;
  }

  const modelName = modelSelect.value;
  const condition = conditionSelect.value;
  const notes = notesInput.value.trim();

  const model = models.find(m => m.name === modelName);
  if (!model) return;

  let multiplier = 1;
  if (condition === "good") multiplier = 0.85;
  if (condition === "fair") multiplier = 0.7;
  if (condition === "poor") multiplier = 0.5;

  const offer = Math.round(model.price * multiplier);

  offerAmount.textContent = `$${offer}`;
  offerDetails.textContent = `${modelName} · Condition: ${condition.replace("-", " ")}${notes ? " · Notes: " + notes : ""}`;

  offerResult.classList.remove("hidden");
});

/* -----------------------------
   Admin Panel
--------------------------------*/
openAdminBtn.addEventListener("click", () => {
  calculatorSection.classList.add("hidden");
  adminSection.classList.remove("hidden");
});

closeAdminBtn.addEventListener("click", () => {
  adminSection.classList.add("hidden");
  calculatorSection.classList.remove("hidden");
  adminLoginCard.classList.remove("hidden");
  adminContent.classList.add("hidden");
});

/* -----------------------------
   Admin Login
--------------------------------*/
adminLoginBtn.addEventListener("click", () => {
  if (adminPinInput.value === adminPIN) {
    adminLoginCard.classList.add("hidden");
    adminContent.classList.remove("hidden");
  } else {
    alert("Incorrect PIN");
  }
});

/* -----------------------------
   Update Admin PIN
--------------------------------*/
updatePinBtn.addEventListener("click", () => {
  const newPIN = newPinInput.value.trim();
  if (newPIN.length < 3) {
    alert("PIN must be at least 3 digits.");
    return;
  }
  adminPIN = newPIN;
  localStorage.setItem("adminPIN", newPIN);
  alert("PIN updated!");
});

/* -----------------------------
   Add / Update Phone Model
--------------------------------*/
addModelBtn.addEventListener("click", () => {
  const name = modelNameInput.value.trim();
  const price = parseInt(modelPriceInput.value);

  if (!name || !price) {
    alert("Enter model name and price.");
    return;
  }

  const existing = models.find(m => m.name === name);
  if (existing) {
    existing.price = price;
  } else {
    models.push({ name, price });
  }

  localStorage.setItem("models", JSON.stringify(models));
  refreshModelDropdown();
  renderModelsList();

  modelNameInput.value = "";
  modelPriceInput.value = "";
});

/* -----------------------------
   Render Models List
--------------------------------*/
function renderModelsList() {
  modelsList.innerHTML = "";
  models.forEach(m => {
    const li = document.createElement("li");
    li.textContent = `${m.name} — $${m.price}`;
    modelsList.appendChild(li);
  });
}

renderModelsList();
/* -----------------------------
   Bank Transfer Instructions
--------------------------------*/
let bankDetails = localStorage.getItem("bankDetails") || "";

const offerResultBox = document.getElementById("offer-result");

function showBankDetails() {
  if (bankDetails) {
    const bankBox = document.createElement("p");
    bankBox.textContent = "Bank Transfer Instructions: " + bankDetails;
    offerResultBox.appendChild(bankBox);
  }
}

showBankDetails();
/* -----------------------------
   Bank Transfer Instructions
--------------------------------*/
let bankDetails = localStorage.getItem("bankDetails") || "";

const offerResultBox = document.getElementById("offer-result");

function showBankDetails() {
  if (bankDetails) {
    const bankBox = document.createElement("p");
    bankBox.textContent = "Bank Transfer Instructions: " + bankDetails;
    offerResultBox.appendChild(bankBox);
  }
}
/* -----------------------------
   Admin-only Bank Details Box
--------------------------------*/
const bankAdminBox = document.getElementById("bank-admin-box");
const saveBankBtn = document.getElementById("save-bank-details-btn");
const bankInput = document.getElementById("bank-details-input");

// Show admin box when you click "Admin"
document.getElementById("open-admin-btn").addEventListener("click", () => {
  const pin = prompt("Enter admin PIN:");
  if (pin === "1234") {
    bankAdminBox.classList.remove("hidden");
    bankInput.value = bankDetails;
  } else {
    alert("Incorrect PIN");
  }
});

// Save bank details
saveBankBtn.addEventListener("click", () => {
  bankDetails = bankInput.value;
  localStorage.setItem("bankDetails", bankDetails);
  alert("Bank details saved");
});

