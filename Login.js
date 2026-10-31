
//  LOGIN (SIGN IN) (Hope, Inc. ERP)
// Load it from an HTML page with:  <script src="login.js"></script>

//  Page title and mobile settings 
document.title = "Hope, Inc. ERP - Sign In";

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
}

body {
    margin: 0;
    padding: 8px;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    font-family: Arial, sans-serif;
}

.login-container {
    width: 100%;
    max-width: 420px;
    min-height: 650px;
    background-color: #f8dffc;
    border-radius: 50px;
    padding: 15px 10px 28px;
    display: flex;
    flex-direction: column;
    border: 1px solid #eeeeee;
}

.header {
    text-align: center;
    margin-bottom: 35px;
}

.header h1 {
    font-family: Georgia, serif;
    font-size: 30px;
    margin: 0 0 5px;
    color: #111111;
}

.header p {
    font-size: 16px;
    margin: 0;
}

.form-group {
    margin-bottom: 32px;
}

.form-group label {
    display: block;
    font-size: 16px;
    margin: 0 3px 6px;
}

.form-group input {
    width: 100%;
    height: 44px;
    border: 1px solid #c6c6c6;
    border-radius: 25px;
    padding: 0 14px;
    font-size: 16px;
    outline: none;
    background-color: white;
}

.form-group input:focus {
    border: 2px solid #720080;
}

.password-box {
    position: relative;
}

.password-box input {
    padding-right: 42px;
}

.toggle-password {
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: none;
    cursor: pointer;
    font-size: 18px;
    color: #718096;
}

.options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: -14px;
    margin-bottom: 39px;
    font-size: 13px;
}

.remember {
    display: flex;
    align-items: center;
    gap: 5px;
}

.remember input {
    width: 16px;
    height: 16px;
    margin: 0;
    accent-color: #720080;
}

a {
    color: #0000ee;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.sign-in-btn {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 7px;
    background-color: #700080;
    color: white;
    font-family: Georgia, serif;
    font-size: 18px;
    cursor: pointer;
}

.sign-in-btn:hover {
    background-color: #590066;
}

.divider {
    display: flex;
    align-items: center;
    gap: 28px;
    margin: 46px 0 47px;
    font-family: Georgia, serif;
    font-size: 14px;
}

.divider::before,
.divider::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #333333;
}

.google-btn {
    width: 100%;
    height: 44px;
    border: 1px solid #c6c6c6;
    border-radius: 25px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 22px;
    font-family: Georgia, serif;
    font-size: 17px;
    cursor: pointer;
}

.google-btn:hover {
    background-color: #f7f7f7;
}

.google-logo {
    font-family: Arial, sans-serif;
    font-weight: bold;
    font-size: 25px;
    color: #4285f4;
}

.google-logo span {
    color: #34a853;
}

.register {
    text-align: center;
    font-size: 13px;
    margin-top: auto;
    padding-top: 50px;
}

.register a {
    font-family: Georgia, serif;
    font-size: 14px;
    margin-left: 5px;
}

@media (max-width: 400px) {
    .login-container {
        min-height: 650px;
        border-radius: 40px;
    }

    .header h1 {
        font-size: 27px;
    }

    .header p {
        font-size: 14px;
    }

    .google-btn {
        gap: 15px;
        font-size: 15px;
    }
}
`;
document.head.appendChild(styleElement);

//  Page content
document.body.innerHTML = `
<div class="login-container">

    <div class="header">
        <h1>Welcome back!</h1>
        <p>Sign in to your Hope, Inc. ERP account</p>
    </div>

    <form id="loginForm">

        <div class="form-group">
            <label for="email">Email address</label>
            <input
                type="email"
                id="email"
                name="email"
                required
            >
        </div>

        <div class="form-group">
            <label for="password">Password</label>

            <div class="password-box">
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                >

                <button
                    type="button"
                    class="toggle-password"
                    onclick="togglePassword()"
                    aria-label="Show or hide password"
                >👁</button>
            </div>
        </div>

        <div class="options">
            <label class="remember">
                <input type="checkbox" name="remember">
                Remember Me
            </label>

            <a href="forgot-password.html">Forgot Password?</a>
        </div>

        <button type="submit" class="sign-in-btn">
            Sign In
        </button>

    </form>

    <div class="divider">
        <span>or</span>
    </div>

    <button type="button" class="google-btn"
            onclick="googleSignIn()">
        <span class="google-logo">
            G<span>●</span>
        </span>
        Continue with Google
    </button>

    <div class="register">
        Don't have an account?
        <a href="register.html">Register</a>
    </div>

</div>
`;

// Behavior 
function togglePassword() {
    const password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Sign in design is working! Connect a backend to log in.");
});

function googleSignIn() {
    alert("Connect Google authentication to enable this feature.");
}
