
//  REGISTER (Hope, Inc. ERP)
// Converted from HTML into JavaScript.
// Load it from an HTML page with:  <script src="register.js"></script>

//  Page title and mobile settings
document.title = "Register - HOPE, Inc. ERP";

if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement("meta");
    viewport.name = "viewport";
    viewport.content = "width=device-width, initial-scale=1.0";
    document.head.appendChild(viewport);
}

//  Styles 
const styleElement = document.createElement("style");
styleElement.textContent = `
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    background: black;
    font-family: Arial, sans-serif;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
}

.container {
    width: 410px;
    max-width: 100%;
    min-height: 660px;
    background: #f9dfff;
    border: 5px solid white;
    border-radius: 55px;
    padding: 15px 9px 25px;
    display: flex;
    flex-direction: column;
}

.heading {
    text-align: center;
    margin-bottom: 35px;
}

.heading h1 {
    font-family: Georgia, serif;
    font-size: 30px;
    margin-bottom: 5px;
}

.heading p {
    font-size: 16px;
}

.name-fields {
    display: flex;
    gap: 17px;
    margin-bottom: 16px;
}

.field {
    flex: 1;
    min-width: 0;
    margin-bottom: 13px;
}

.field label {
    display: block;
    font-size: 16px;
    margin: 0 3px 6px;
}

.field input {
    width: 100%;
    height: 44px;
    padding: 0 14px;
    border: 1px solid #c5c5c5;
    border-radius: 30px;
    background: white;
    font-size: 16px;
}

.main-button {
    width: 100%;
    height: 40px;
    margin-top: 22px;
    background: #710080;
    color: white;
    border: 1px solid #a64bb0;
    border-radius: 8px;
    font-family: Georgia, serif;
    font-size: 18px;
    cursor: pointer;
}

.divider {
    display: flex;
    align-items: center;
    gap: 28px;
    margin: 22px 0 46px;
    font-family: Georgia, serif;
    font-size: 14px;
}

.divider::before,
.divider::after {
    content: "";
    flex: 1;
    height: 1px;
    background: black;
}

.google-button {
    width: 100%;
    height: 44px;
    background: white;
    border: 1px solid #c5c5c5;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-size: 17px;
    cursor: pointer;
}

.google-logo {
    font-family: Arial, sans-serif;
    font-weight: bold;
    font-size: 25px;
    color: #4285f4;
}

a {
    color: blue;
    text-decoration: none;
}

.bottom-text {
    margin-top: auto;
    padding-top: 60px;
    text-align: center;
    font-size: 13px;
}

.bottom-text a {
    font-family: Georgia, serif;
    margin-left: 2px;
}

@media (max-width: 420px) {
    .container {
        min-height: 660px;
    }

    .heading h1 {
        font-size: 27px;
    }

    .name-fields {
        gap: 12px;
    }
}
`;
document.head.appendChild(styleElement);

//  Page content
document.body.innerHTML = `
<div class="container">

    <div class="heading">
        <h1>Create an account</h1>
        <p>Join Hope, Inc. ERP</p>
    </div>

    <form id="registerForm">

        <div class="name-fields">

            <div class="field">
                <label for="firstName">First name</label>
                <input type="text" id="firstName" required>
            </div>

            <div class="field">
                <label for="lastName">Last name</label>
                <input type="text" id="lastName" required>
            </div>

        </div>

        <div class="field">
            <label for="email">Email Address</label>
            <input type="email" id="email" required>
        </div>

        <div class="field">
            <label for="password">Password</label>
            <input type="password" id="password"
                minlength="8" required>
        </div>

        <button type="submit" class="main-button">
            Register
        </button>

    </form>

    <div class="divider">or</div>

    <button type="button" class="google-button"
        onclick="googleSignIn()">
        <span class="google-logo">G</span>
        Continue with Google
    </button>

    <div class="bottom-text">
        Already have an account?
        <a href="signin.html">Sign In</a>
    </div>

</div>
`;

//  Behavior 
function googleSignIn() {
    alert("Google sign-in requires authentication setup.");
}

document.getElementById("registerForm").addEventListener("submit",
    function(event) {
        event.preventDefault();
        alert("Registration submitted. Connect your backend to create an account.");
    }
);
