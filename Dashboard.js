
// SECTION 1: DASHBOARD (Hope, Inc. ERP)
// Converted from HTML into JavaScript.
// Load it from an HTML page with:  <script src="dashboard.js"></script>


//  Page title and mobile settings
document.title = "HOPE, Inc. ERP Dashboard";

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
    font-family: Arial, sans-serif;
    background: #f5e0ff;
    color: #222;
}

.layout {
    display: flex;
    min-height: 100vh;
}

/* Sidebar */
.sidebar {
    width: 174px;
    min-width: 174px;
    background: #8142ad;
    color: white;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.logo {
    height: 46px;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 10px;
    border-bottom: 1px solid #c69bdd;
    white-space: nowrap;
}

.logo-icon {
    width: 30px;
    height: 30px;
    background: #f5eaff;
    color: #c34de8;
    font-family: Arial, sans-serif;
    font-size: 26px;
    font-weight: bold;
    text-align: center;
    line-height: 30px;
    border-radius: 2px;
    text-shadow: 1px 1px 2px #8524ac;
}

.logo span {
    font-family: Georgia, serif;
    font-size: 16px;
}

.navigation {
    padding: 10px;
}

.nav-link {
    display: flex;
    align-items: center;
    gap: 6px;
    color: white;
    text-decoration: none;
    font-size: 13px;
    font-weight: bold;
    padding: 8px 2px;
    margin-bottom: 8px;
    border-radius: 5px;
}

.nav-link:hover,
.nav-link.active {
    background: #71349a;
}

.nav-icon {
    width: 21px;
    height: 21px;
    background: white;
    color: #222;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    flex-shrink: 0;
}

.module-label {
    font-family: Georgia, serif;
    font-size: 12px;
    margin: 7px 0 17px;
    color: #f2ddff;
}

.sidebar-bottom {
    margin-top: auto;
    border-top: 1px solid #c69bdd;
    padding: 14px 5px 5px;
}

.profile {
    background: #c77cf0;
    border-radius: 25px;
    min-height: 34px;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 4px 7px;
}

.profile-icon {
    width: 24px;
    height: 24px;
    background: white;
    color: #555;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
}

.profile-name {
    flex: 1;
    min-width: 0;
}

.profile-name strong {
    display: block;
    font-size: 12px;
}

.profile-name small {
    display: block;
    font-size: 8px;
}

.logout {
    border: none;
    background: transparent;
    color: white;
    font-weight: bold;
    font-size: 12px;
    cursor: pointer;
}

/* Main content */
.main {
    flex: 1;
    min-width: 0;
}

.topbar {
    height: 35px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 6px 0 12px;
}

.topbar h1 {
    font-family: Georgia, serif;
    font-size: 17px;
    font-weight: normal;
}

.user-badge {
    background: #90f584;
    color: #387c36;
    padding: 5px 20px;
    border-radius: 20px;
    font-size: 12px;
}

.content {
    padding: 14px 8px;
}

/* Welcome banner */
.welcome {
    background: #390044;
    color: white;
    border-radius: 19px;
    padding: 17px 16px;
    margin: 0 25px 19px 18px;
    min-height: 81px;
}

.welcome h2 {
    font-size: 18px;
    margin-bottom: 6px;
}

.welcome p {
    font-size: 11px;
    font-weight: bold;
    line-height: 1.5;
}

/* Summary cards */
.stats {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
    margin-bottom: 30px;
    padding: 0 0 0 4px;
}

.stat-card {
    background: white;
    border: 1px solid #c9c3cc;
    border-radius: 11px;
    min-height: 71px;
    padding: 7px 10px;
}

.stat-card p {
    font-size: 10px;
    margin-bottom: 5px;
}

.stat-card h3 {
    font-size: 23px;
    font-weight: normal;
    margin-bottom: 5px;
}

.stat-card small {
    font-size: 9px;
    color: #37c94a;
}

/* Quick actions */
.quick-actions {
    background: white;
    border: 1px solid #c9c3cc;
    border-radius: 12px;
    padding: 10px 13px 18px;
}

.quick-actions h2 {
    font-size: 15px;
    font-weight: normal;
    margin-bottom: 15px;
}

.action-buttons {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 8px;
}

.action-buttons a {
    background: #d095f0;
    color: #392044;
    text-decoration: none;
    text-align: center;
    padding: 10px 4px;
    border-radius: 8px;
    font-family: Georgia, serif;
    font-size: 12px;
    white-space: nowrap;
}

.action-buttons a:hover {
    background: #bc73e5;
}

/* Responsive layout */
@media (max-width: 900px) {
    .stats {
        gap: 10px;
    }

    .action-buttons {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .action-buttons a {
        white-space: normal;
    }
}

@media (max-width: 650px) {
    .layout {
        flex-direction: column;
    }

    .sidebar {
        width: 100%;
        min-width: 0;
        min-height: auto;
    }

    .logo {
        height: 50px;
    }

    .navigation {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 5px;
        padding: 5px 10px;
    }

    .nav-link {
        margin: 0;
        padding: 7px;
    }

    .module-label {
        display: none;
    }

    .sidebar-bottom {
        display: none;
    }

    .content {
        padding: 15px 10px;
    }

    .welcome {
        margin: 0 0 18px;
    }

    .stats {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
        margin-bottom: 18px;
    }

    .action-buttons {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .topbar {
        height: 42px;
    }
}

@media (max-width: 350px) {
    .stats {
        grid-template-columns: 1fr;
    }

    .action-buttons {
        grid-template-columns: 1fr;
    }
}
`;
document.head.appendChild(styleElement);

// ----- 3. Page content (HTML) -----
document.body.innerHTML = `
<div class="layout">

    <!-- Sidebar -->
    <aside class="sidebar">

        <div class="logo">
            <div class="logo-icon">H</div>
            <span>Hope, Inc. ERP</span>
        </div>

        <nav class="navigation">

            <a href="dashboard.html" class="nav-link active">
                <span class="nav-icon">⌂</span>
                Dashboard
            </a>

            <p class="module-label">Modules</p>

            <a href="#" class="nav-link">
                <span class="nav-icon">👥</span>
                Customers
            </a>

            <a href="#" class="nav-link">
                <span class="nav-icon">♧</span>
                Products
            </a>

            <a href="#" class="nav-link">
                <span class="nav-icon">📈</span>
                Sales
            </a>

            <a href="#" class="nav-link">
                <span class="nav-icon">▤</span>
                Reports
            </a>

        </nav>

        <div class="sidebar-bottom">
            <div class="profile">

                <div class="profile-icon">♙</div>

                <div class="profile-name">
                    <strong>Name</strong>
                    <small>USER</small>
                </div>

                <button class="logout" onclick="logout()">
                    Logout
                </button>

            </div>
        </div>

    </aside>


    <!-- Main Dashboard -->
    <main class="main">

        <header class="topbar">
            <h1>Dashboard</h1>
            <span class="user-badge">USER</span>
        </header>

        <div class="content">

            <!-- Welcome Banner -->
            <section class="welcome">
                <h2>Welcome back, User!</h2>
                <p>
                    You have access to the core modules assigned to you.
                    Contact an Admin for elevated permissions.
                </p>
            </section>

            <!-- Summary Cards -->
            <section class="stats">

                <div class="stat-card">
                    <p>Total Customers</p>
                    <h3>5</h3>
                    <small>1 inactive</small>
                </div>

                <div class="stat-card">
                    <p>Products</p>
                    <h3>400</h3>
                    <small>↑ 7 new this week</small>
                </div>

                <div class="stat-card">
                    <p>Open Orders</p>
                    <h3>100</h3>
                    <small>↑ 10% vs last week</small>
                </div>

                <div class="stat-card">
                    <p>Revenue (MTD)</p>
                    <h3>$99.1k</h3>
                    <small>↑ 20% vs last month</small>
                </div>

            </section>

            <!-- Quick Actions -->
            <section class="quick-actions">

                <h2>Quick Actions</h2>

                <div class="action-buttons">
                    <a href="#">View Customers</a>
                    <a href="#">Manage Products</a>
                    <a href="#">Human Resources</a>
                    <a href="#">Sales Pipeline</a>
                    <a href="#">Reports</a>
                </div>

            </section>

        </div>

    </main>

</div>
`;

// Behavior (functions and button actions)
function logout() {
    const confirmLogout = confirm("Are you sure you want to log out?");

    if (confirmLogout) {
        window.location.href = "signin.html";
    }
}
