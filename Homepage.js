
// HOMEPAGE (Hope, Inc. ERP)
// Converted from HTML into JavaScript.
// Load it from an HTML page with:  <script src="homepage.js"></script>

//  Page title and mobile settings 
document.title = "HOPE, Inc. ERP";

if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement("meta");
    viewport.name = "viewport";
    viewport.content = "width=device-width, initial-scale=1.0";
    document.head.appendChild(viewport);
}

// Styles (CSS)
const styleElement = document.createElement("style");
styleElement.textContent = `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Georgia, "Times New Roman", serif;
    color: #171017;
}

/* Header */
header {
    height: 65px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px 0 29px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 8px;
}

.logo-icon {
    width: 49px;
    height: 49px;
    background-color: #f5f0f6;
    color: #c64be9;
    font-family: Arial, sans-serif;
    font-size: 40px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 1px 2px 3px #8d159e;
}

.logo h1 {
    font-size: 25px;
    font-weight: normal;
}

.header-buttons {
    display: flex;
    gap: 20px;
}

.header-buttons a {
    text-decoration: none;
    color: #171017;
    border: 2px solid #850b91;
    border-radius: 25px;
    padding: 2px 25px;
    font-size: 22px;
    line-height: 26px;
    text-align: center;
    min-width: 126px;
}

/* Main section */
.hero {
    min-height: 360px;
    background-color: #d7a2f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 25px;
    padding: 14px 12px 14px 29px;
}

.hero-content {
    flex: 1;
    min-width: 0;
}

.tagline {
    font-size: 14px;
    margin-bottom: 2px;
}

.hero-content h2 {
    color: #850b91;
    font-size: 26px;
    font-weight: normal;
    line-height: 1.15;
}

.hero-content h2 strong {
    font-weight: bold;
    font-style: italic;
}

.description {
    font-family: Arial, sans-serif;
    font-size: 10px;
    line-height: 1.45;
    margin-top: 6px;
    margin-bottom: 20px;
}

.hero-buttons {
    display: flex;
    align-items: center;
    gap: 22px;
    flex-wrap: wrap;
}

.hero-buttons a {
    text-decoration: none;
    color: white;
    background-color: #78008c;
    border: 2px solid white;
    border-radius: 25px;
    padding: 8px 14px;
    font-size: 16px;
    white-space: nowrap;
}

.hero-buttons .register-button {
    background-color: #250039;
    border-color: white;
    padding: 8px 20px;
}

/* Dashboard overview */
.dashboard {
    width: 362px;
    flex-shrink: 0;
    background-color: #f4e4fc;
    border-radius: 32px;
    padding: 18px 9px 15px;
}

.dashboard-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding: 0 8px 10px;
    border-bottom: 2px solid #b8a3bd;
    font-size: 14px;
    font-style: italic;
    white-space: nowrap;
}

.dashboard-heading span:last-child {
    font-size: 13px;
}

.dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 20px;
    padding-top: 28px;
}

.dashboard-card {
    min-height: 103px;
    background-color: white;
    border: 1px solid #c6c0c7;
    border-radius: 31px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px 6px;
}

.dashboard-card h3 {
    color: #7013dc;
    font-size: 18px;
    margin-bottom: 8px;
    font-weight: bold;
    white-space: nowrap;
}

.dashboard-card p {
    font-family: Arial, sans-serif;
    font-size: 15px;
    line-height: 1.3;
}

/* Footer */
footer {
    height: 132px;
    background-color: #b64cdd;
    border-radius: 8px 8px 5px 5px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 17px;
    color: white;
    font-size: 14px;
    text-align: center;
}

/* Responsive layout */
@media (max-width: 750px) {
    header {
        padding: 10px 16px;
        height: auto;
        gap: 12px;
        flex-wrap: wrap;
    }

    .logo h1 {
        font-size: 20px;
    }

    .logo-icon {
        width: 40px;
        height: 40px;
        font-size: 32px;
    }

    .header-buttons {
        gap: 8px;
    }

    .header-buttons a {
        min-width: auto;
        padding: 3px 14px;
        font-size: 16px;
    }

    .hero {
        flex-direction: column;
        align-items: stretch;
        padding: 35px 20px;
        gap: 30px;
    }

    .hero-content h2 {
        font-size: 27px;
    }

    .description {
        font-size: 12px;
    }

    .dashboard {
        width: 100%;
        max-width: 420px;
        align-self: center;
    }

    .dashboard-grid {
        gap: 10px;
    }

    .dashboard-card h3 {
        font-size: 16px;
        white-space: normal;
    }

    .dashboard-card p {
        font-size: 13px;
    }

    footer {
        height: 100px;
        padding: 0 12px 17px;
    }
}

@media (max-width: 380px) {
    .logo h1 {
        font-size: 17px;
    }

    .header-buttons a {
        padding: 3px 10px;
        font-size: 14px;
    }

    .dashboard-heading {
        font-size: 12px;
    }

    .dashboard-heading span:last-child {
        font-size: 10px;
    }

    .dashboard-grid {
        gap: 8px;
    }

    .hero-buttons {
        gap: 10px;
    }
}
`;
document.head.appendChild(styleElement);

// ----- 3. Page content (HTML) -----
document.body.innerHTML = `
<header>
    <div class="logo">
        <div class="logo-icon">H</div>
        <h1>HOPE, Inc. ERP</h1>
    </div>

    <nav class="header-buttons">
        <a href="#signin">Sign In</a>
        <a href="#register">Register</a>
    </nav>
</header>

<main class="hero">

    <section class="hero-content">
        <p class="tagline">A simpler way to stay organized.</p>

        <h2>
            Manage Your Business,<br>
            <strong>Made Simple.</strong>
        </h2>

        <p class="description">
            Hope, Inc. ERP helps you manage customers, products, employees,<br>
            and sales through one simple and convenient platform.<br>
            Stay organized, track your business activities, and manage your daily operations with ease.
        </p>

        <div class="hero-buttons">
            <a href="#signin">Sign In to dashboard</a>
            <a href="#register" class="register-button">Register</a>
        </div>
    </section>

    <section class="dashboard">
        <div class="dashboard-heading">
            <span>Workspace overview</span>
            <span>HOPE, Inc. ERP Dashboard</span>
        </div>

        <div class="dashboard-grid">

            <div class="dashboard-card">
                <h3>Customers</h3>
                <p>Manage contacts<br>&amp; accounts</p>
            </div>

            <div class="dashboard-card">
                <h3>Products</h3>
                <p>Catalog &amp; inventory</p>
            </div>

            <div class="dashboard-card">
                <h3>Human Resources</h3>
                <p>Employees &amp; payroll</p>
            </div>

            <div class="dashboard-card">
                <h3>Sales</h3>
                <p>Orders &amp; revenue</p>
            </div>

        </div>
    </section>

</main>

<footer>
    <p>&copy; 2026 Hope, Inc. ERP System &middot; All rights reserved</p>
</footer>
`;

//  Behavior (functions and button actions) 
// (this page has no extra behavior)
