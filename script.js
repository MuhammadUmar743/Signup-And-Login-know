// Elements pakar liye
let signupForm = document.getElementById("signup-form");
let loginForm = document.getElementById("login-form");
let showLogin = document.getElementById("show-login");
let showSignup = document.getElementById("show-signup");

// Switch between forms
showLogin.addEventListener("click", (event) => {
  event.preventDefault();
  signupForm.style.display = "none";
  loginForm.style.display = "block";
});

showSignup.addEventListener("click", (event) => {
  event.preventDefault();
  loginForm.style.display = "none";
  signupForm.style.display = "block";
});

// ✅ Signup Form
signupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let fullName = document.getElementById("signup-name").value.trim();
  let email = document.getElementById("signup-email").value.trim();
  let password = document.getElementById("signup-password").value.trim();

  if (fullName === "" || email === "" || password === "") {
    alert("⚠️ Please complete all fields to Signup");
    return;
  }

  // Users list localStorage se lao

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user already exists
  let existingUser = users.find(user => user.email === email);
  if (existingUser) {
    alert("❌ This email is already registered! Please login.");
    signupForm.reset();
    return;
  }

  // Add new user
  let newUser = {
    id: users.length + 1,
    name: fullName,
    email: email,
    password: password
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // ✅ Save total user count in localStorage
  localStorage.setItem("userCount", users.length);

  signupForm.reset();
  alert(`✅ Signup successful! Welcome ${fullName}`);
});

// ✅ Login Form
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let email = document.getElementById("login-email").value.trim();
  let password = document.getElementById("login-password").value.trim();

  if (email === "" || password === "") {
    alert("⚠️ Please fill both fields to login");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let foundUser = users.find(user => user.email === email && user.password === password);

  if (foundUser) {
    alert(`🎉 Login successful! Welcome back, ${foundUser.name}`);
    loginForm.reset();
  } else {
    alert("❌ Invalid Email or Password");
  }
});



