// Function to toggle password visibility
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (input) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}


// Handler for login page redirection based on username
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.toLowerCase().trim();


  if (username === 'superadmin') {
    window.location.href = 'superadmin_dashboard.html';
  } else if (username === 'admin') {
    window.location.href = 'admin_dashboard.html';
  } else {
    // Default to user dashboard
    window.location.href = 'user_dashboard.html';
  }
}


// Handler for register form
function handleRegister(event) {
  event.preventDefault();
  alert('Registration successful! Redirecting to login...');
  window.location.href = 'login.html';
}


// Handler for forgot password form
function handleForgotPass(event) {
  event.preventDefault();
  alert('Password reset link sent to your email!');
  window.location.href = 'login.html';
}


// Modal helper for dashboards
function openAddModal() {
  const name = prompt("Enter record title/name:");
  if (name) {
    alert("Record '" + name + "' added successfully!");
  }
}


window.HOPE_CONFIG = {
    SUPABASE_URL: 'https://sisbwkqgmxugqwlmkfka.supabase.co/rest/v1/',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpc2J3a3FnbXh1Z3F3bG1rZmthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyNzUyNjIsImV4cCI6MjEwODg1MTI2Mn0._LdeYcXr86mY0ejQjr8B2Yzr2E46emwX8835CCUdk1s',
};



