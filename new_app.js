const SUPABASE_URL = "https://citroocfaepvujntqged.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_swuE211u3_SaSArnOFrIjQ_MviAgoHZ";
const sb = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const SETTINGS_KEY = 'hope_erp_settings_v1';
const PAGE_SIZE = 5;

const ICONS = {
  dashboard: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
  customers: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  products: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  hr: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  sales: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  reports: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  users: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  deleted: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  settings: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  signout: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`
};

const SYSTEM_MODULES = [
  {
    id: 'customers', title: 'Customers', icon: ICONS.customers, href: 'customers.html',
    summary: 'Manage active client profiles, contact info, and restore deleted records.',
    subpages: [{ label: 'Active & Deleted List', href: 'customers.html' }, { label: '+ Add Customer', href: 'customer-details.html' }]
  },
  {
    id: 'products', title: 'Products', icon: ICONS.products, href: 'products.html',
    summary: 'Catalog SKUs, units of measure, unit pricing, and historical price logs.',
    subpages: [{ label: 'Product Register', href: 'products.html' }, { label: '+ Product Details', href: 'product-details.html' }, { label: 'Price History', href: 'price-history.html' }]
  },
  {
    id: 'hr', title: 'Human Resources', icon: ICONS.hr, href: 'human-resources.html',
    summary: 'Organize departments, job titles, and employee directory records.',
    subpages: [{ label: 'Employees', href: 'human-resources.html?tab=employees' }, { label: 'Jobs', href: 'human-resources.html?tab=jobs' }, { label: 'Departments', href: 'human-resources.html?tab=departments' }]
  },
  {
    id: 'sales', title: 'Sales', icon: ICONS.sales, href: 'new-sale.html',
    summary: 'Create customer sales orders, calculate line items, and record payments.',
    subpages: [{ label: '+ New Sale', href: 'new-sale.html' }, { label: 'Record Payment', href: 'record-payment.html' }]
  },
  {
    id: 'reports', title: 'Reports', icon: ICONS.reports, href: 'sales-details.html',
    summary: 'Audit sale balances, line item breakdowns, and payment histories.',
    subpages: [{ label: 'Sale Details & Balances', href: 'sales-details.html' }]
  },
  {
    id: 'users', title: 'User Management', icon: ICONS.users, href: 'roles-access.html',
    summary: 'Register accounts, assign Superadmin/Admin/User roles, and set permissions.',
    subpages: [{ label: 'User Accounts', href: 'roles-access.html' }, { label: 'Permissions Matrix', href: 'permissions.html' }]
  }
];

const USER_RIGHTS_GROUPS = [
  { id: 'customer_mgmt', title: 'Customer Management', items: ['Add Customer', 'Edit Customer', 'Delete Customer', 'Restore Customer'] },
  { id: 'product_mgmt', title: 'Product Management', items: ['Add Product', 'Edit Product', 'Delete Product', 'Add Price', 'Edit Price', 'Delete Price'] },
  { id: 'hr_mgmt', title: 'Human Resources', items: ['Add Job', 'Edit Job', 'Delete Job', 'Add Department', 'Edit Department', 'Delete Department', 'Add Employee', 'Edit Employee', 'Delete Employee', 'View Job History', 'Add Job History', 'Edit Job History', 'Delete Job History'] },
  { id: 'sales_mgmt', title: 'Sales', items: ['Add Sale', 'Edit Sale', 'Delete Sale', 'View Sale Details', 'Add Sale Detail', 'Edit Sale Detail', 'Delete Sale Detail'] },
  { id: 'reports_mgmt', title: 'Reports', items: ['Top Customers', 'Product Master List', 'Top Products', 'Active Employees', 'All Employees', 'Employee Job History', 'Top Sales'] }
];

const db = {
  currentRole: 'Superadmin',
  settings: {
    orgName: 'Hope, Inc.',
    sessionTimeout: '30 minutes',
    recordEntry: 'Manual entry only',
    defaultRole: 'User',
    showStatusStamp: true,
    retainDeleted: true
  },
  customers: [],
  products: [],
  priceHistory: [],
  employees: [],
  jobs: [],
  departments: [],
  sales: [],
  saleItems: [],
  payments: [],
  accounts: [],
  permissions: {},
  activityLog: [],
  userGrantedModules: ['dashboard', 'customers', 'products', 'sales', 'reports']
};

function loadLocalSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    if (saved) {
      if (saved.currentRole) db.currentRole = saved.currentRole;
      if (saved.settings) db.settings = { ...db.settings, ...saved.settings };
      if (saved.activityLog) db.activityLog = saved.activityLog;
    }
  } catch (e) {}
}

function saveLocalSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({
    currentRole: db.currentRole,
    settings: db.settings,
    activityLog: db.activityLog.slice(0, 20)
  }));
}

function addLog(action, detail) {
  db.activityLog.unshift({
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    action,
    detail
  });
  saveLocalSettings();
}

function shortId(uuid, prefix) {
  if (!uuid) return '—';
  return `${prefix}-${String(uuid).slice(0, 6).toUpperCase()}`;
}

function formatStamp(prefix, actor) {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  return `${prefix} ${actor.toLowerCase()} ${dateStr} ${timeStr}`;
}

function showToast(msg) {
  const existing = document.querySelector('.toast-banner');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.className = 'toast-banner';
  el.innerHTML = `<span>✓</span><span>${msg}</span>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

function paginate(arr, page) {
  const totalPages = Math.max(1, Math.ceil(arr.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  return {
    slice: arr.slice(start, start + PAGE_SIZE),
    totalPages,
    currentPage: safePage,
    totalRecords: arr.length
  };
}

// SYNC DATA FROM SUPABASE
async function syncFromSupabase() {
  if (!sb) {
    showToast('Supabase SDK not loaded. Check internet or script tag.');
    return;
  }
  try {
    const [
      { data: custs },
      { data: prods },
      { data: ph },
      { data: depts },
      { data: jobs },
      { data: emps },
      { data: sales },
      { data: items },
      { data: pays },
      { data: profs }
    ] = await Promise.all([
      sb.from('customers').select('*').order('created_at', { ascending: false }),
      sb.from('products').select('*').order('created_at', { ascending: false }),
      sb.from('price_history').select('*').order('created_at', { ascending: false }),
      sb.from('departments').select('*').order('created_at', { ascending: false }),
      sb.from('jobs').select('*').order('created_at', { ascending: false }),
      sb.from('employees').select('*').order('created_at', { ascending: false }),
      sb.from('sales').select('*').order('created_at', { ascending: false }),
      sb.from('sale_items').select('*'),
      sb.from('payments').select('*').order('created_at', { ascending: false }),
      sb.from('user_profiles').select('*').order('created_at', { ascending: false })
    ]);

    db.customers = (custs || []).map(c => ({
      id: c.id,
      code: shortId(c.id, 'CUST'),
      name: c.customer_name,
      company: c.company_name,
      email: c.email,
      phone: c.phone,
      street: c.street_address,
      city: c.city,
      state: c.province,
      postal: c.postal_code,
      notes: c.notes,
      status: c.is_deleted ? 'Deleted' : (c.status || 'Active'),
      deletedOn: c.is_deleted ? (c.created_at || '').slice(0, 10) : null
    }));

    db.products = (prods || []).map(p => ({
      id: p.id,
      code: shortId(p.id, 'PROD'),
      name: p.product_name,
      sku: p.sku,
      category: p.category,
      unitMeasure: p.unit,
      unitPrice: Number(p.unit_price || 0),
      effectiveDate: p.effective_date || (p.created_at || '').slice(0, 10),
      description: p.description
    }));

    db.priceHistory = (ph || []).map(h => ({
      id: h.id,
      productId: h.product_id,
      effectiveDate: h.effective_date,
      prevPrice: Number(h.previous_price || 0),
      newPrice: Number(h.new_price || 0),
      change: `${Number(h.new_price) - Number(h.previous_price || 0) >= 0 ? '+' : ''}${(Number(h.new_price) - Number(h.previous_price || 0)).toFixed(2)}`,
      changedBy: 'Admin'
    }));

    db.departments = (depts || []).map(d => ({
      id: d.id,
      code: shortId(d.id, 'D'),
      name: d.department_name,
      description: d.description,
      status: d.status || 'Active',
      stamp: (d.created_at || '').slice(0, 10)
    }));

    db.jobs = (jobs || []).map(j => ({
      id: j.id,
      code: shortId(j.id, 'J'),
      title: j.job_title,
      departmentId: j.department_id,
      description: j.description || j.job_title,
      status: j.status || 'Active',
      stamp: (j.created_at || '').slice(0, 10)
    }));

    db.employees = (emps || []).map(e => ({
      id: e.id,
      code: shortId(e.id, 'E'),
      firstName: e.first_name,
      lastName: e.last_name,
      email: e.email,
      phone: e.phone,
      gender: e.gender,
      birthDate: e.birth_date,
      hireDate: e.hire_date,
      sepDate: e.sep_date,
      departmentId: e.department_id,
      jobId: e.job_id,
      status: e.status || 'Active',
      stamp: (e.created_at || '').slice(0, 10),
      history: [`CREATED ${(e.created_at || '').slice(0, 10)} · Record synced`]
    }));

    db.saleItems = items || [];
    db.sales = (sales || []).map(s => {
      const sItems = db.saleItems.filter(i => i.sale_id === s.id).map(i => {
        const prod = db.products.find(p => p.id === i.product_id);
        return {
          productId: i.product_id,
          productName: prod ? prod.name : 'Product',
          qty: Number(i.quantity),
          unitPrice: Number(i.unit_price),
          total: Number(i.line_total)
        };
      });
      return {
        id: s.id,
        code: shortId(s.id, 'SALE'),
        customerId: s.customer_id,
        date: s.sale_date,
        items: sItems,
        total: Number(s.total_amount || 0),
        balance: Number(s.balance || 0),
        paymentStatus: s.payment_status
      };
    });

    db.payments = (pays || []).map(p => ({
      id: p.id,
      code: shortId(p.id, 'PAY'),
      saleId: p.sale_id,
      date: p.payment_date,
      method: p.method,
      reference: p.reference,
      amount: Number(p.amount || 0),
      notes: p.notes
    }));

    db.accounts = (profs || []).map(u => {
      const parts = (u.display_name || '').split(' ');
      if (u.permissions) db.permissions[u.id] = u.permissions;
      return {
        id: u.id,
        code: shortId(u.id, 'ACC'),
        firstName: parts[0] || u.display_name || 'User',
        lastName: parts.slice(1).join(' '),
        username: u.display_name || u.email,
        email: u.email,
        role: u.role || 'User',
        status: u.status || 'Active',
        stamp: (u.created_at || '').slice(0, 10)
      };
    });
  } catch (err) {
    console.error('Supabase sync error:', err);
    showToast('Error loading data from Supabase.');
  }
}

function getModuleCount(modId) {
  if (modId === 'customers') return db.customers.filter(c => c.status === 'Active').length;
  if (modId === 'products') return db.products.length;
  if (modId === 'hr') return db.employees.length + db.jobs.length + db.departments.length;
  if (modId === 'sales') return db.sales.length;
  if (modId === 'reports') return db.payments.length;
  if (modId === 'users') return db.accounts.filter(a => a.status !== 'Deleted').length;
  return 0;
}

function renderModuleDirectory(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const isUser = db.currentRole === 'User';

  container.innerHTML = SYSTEM_MODULES.map(m => {
    const isDisabled = isUser && (m.id === 'hr' || m.id === 'users');
    const count = getModuleCount(m.id);
    return `
      <div class="module-card ${isDisabled ? 'disabled-module' : ''}">
        <div>
          <div class="flex items-center justify-between mb-2">
            <a href="${m.href}" class="flex items-center gap-2 font-bold text-sm text-inherit no-underline hover:underline">
              <span>${m.icon}</span>
              <span>${m.title}</span>
            </a>
            <span class="badge-count">${count} records</span>
          </div>
          <p class="text-xs mb-3 leading-relaxed" style="color:var(--text-secondary);">${m.summary}</p>
        </div>
        <div class="flex flex-wrap gap-1.5 pt-2 border-t" style="border-color:var(--border-color);">
          ${m.subpages.map(sp => `<a href="${sp.href}" class="btn-secondary text-[11px] py-1 px-2.5">${sp.label}</a>`).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function initShell(activeNav, breadcrumbText) {
  const role = db.currentRole;
  const dashHref = role === 'Superadmin' ? 'superadmin-dashboard.html' : 'admin-dashboard.html';

  document.querySelectorAll('.org-name-display').forEach(el => el.textContent = db.settings.orgName);
  const bc = document.getElementById('topbar-breadcrumb');
  if (bc) bc.textContent = breadcrumbText;

  document.querySelectorAll('a.btn-secondary').forEach(link => {
    if (link.textContent.trim().startsWith('← Back to')) link.href = dashHref;
  });

  const roleSelect = document.getElementById('role-switcher');
  if (roleSelect) {
    roleSelect.value = role;
    roleSelect.onchange = (e) => {
      db.currentRole = e.target.value;
      saveLocalSettings();
      window.location.href = db.currentRole === 'Superadmin' ? 'superadmin-dashboard.html' : 'admin-dashboard.html';
    };
  }

  const sidebar = document.querySelector('aside.sidebar');
  if (sidebar) {
    const workspaceItems = [
      { id: 'dashboard', label: 'Dashboard', icon: ICONS.dashboard, href: dashHref },
      { id: 'customers', label: 'Customers', icon: ICONS.customers, href: 'customers.html' },
      { id: 'products', label: 'Products', icon: ICONS.products, href: 'products.html' },
      { id: 'hr', label: 'Human Resources', icon: ICONS.hr, href: 'human-resources.html' },
      { id: 'sales', label: 'Sales', icon: ICONS.sales, href: 'new-sale.html' },
      { id: 'reports', label: 'Reports', icon: ICONS.reports, href: 'sales-details.html' }
    ];

    const adminItems = [
      { id: 'users', label: 'User Management', icon: ICONS.users, href: 'roles-access.html' },
      { id: 'deleted', label: 'Deleted Records', icon: ICONS.deleted, href: 'customers.html?tab=Deleted' },
      { id: 'settings', label: 'System Settings', icon: ICONS.settings, href: 'superadmin-dashboard.html#settings' }
    ];

    const isUser = role === 'User';
    const isAdminOnly = role === 'Admin';

    sidebar.innerHTML = `
      <div>
        <div class="brand-box">
          <div class="brand-logo">H</div>
          <div>
            <div class="brand-title org-name-display">${db.settings.orgName}</div>
            <div class="brand-subtitle">ERP MANAGEMENT</div>
          </div>
        </div>
        <div class="nav-section-label">WORKSPACE</div>
        <nav>
          ${workspaceItems.map(item => {
            const disabled = isUser && !db.userGrantedModules.includes(item.id);
            return `<a href="${disabled ? 'javascript:void(0)' : item.href}" class="nav-item ${activeNav === item.id ? 'active' : ''} ${disabled ? 'disabled-nav' : ''}"><span class="flex items-center gap-3">${item.icon}<span>${item.label}</span></span></a>`;
          }).join('')}
        </nav>
        <div class="nav-section-label" style="margin-top: 22px;">ADMINISTRATION</div>
        <nav>
          ${adminItems.map(item => {
            const disabled = isUser || (isAdminOnly && (item.id === 'deleted' || item.id === 'settings'));
            return `<a href="${disabled ? 'javascript:void(0)' : item.href}" class="nav-item ${activeNav === item.id ? 'active' : ''} ${disabled ? 'disabled-nav' : ''}"><span class="flex items-center gap-3">${item.icon}<span>${item.label}</span></span></a>`;
          }).join('')}
        </nav>
      </div>
      <div class="sidebar-footer">
        <div class="text-xs font-semibold text-white mb-1">Cloud Connected · Supabase</div>
        <div class="text-[11px] opacity-70 mb-3 leading-relaxed">Records sync directly to your database.</div>
        <a href="${role === 'Superadmin' ? 'admin-dashboard.html' : 'superadmin-dashboard.html'}" class="nav-item text-xs p-1">
          <span class="flex items-center gap-2.5">${ICONS.signout}<span>Switch Workspace</span></span>
        </a>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  loadLocalSettings();
  const page = document.body.dataset.page;

  // Support for login/register/forgot pages if copied into this folder
  if (['login', 'register', 'forgot'].includes(page)) {
    const app = document.getElementById('app');
    if (app) {
      const configs = {
        login: ["WELCOME TO HOPE", "Sign in to your workspace", "Enter your credentials to continue."],
        register: ["CREATE AN ACCOUNT", "Create an account", "Join Hope, Inc. ERP"],
        forgot: ["ACCOUNT RECOVERY", "Forgot password?", "Enter your email to reset your password."]
      };
      const c = configs[page];
      app.innerHTML = `<div class="auth-layout"><section class="auth-main"><form class="auth-form" id="authForm"><div class="eyebrow">${c[0]}</div><h2>${c[1]}</h2><p>${c[2]}</p>${page === "register" ? `<div class="field"><label>First name</label><input name="first_name" required></div><div class="field"><label>Last name</label><input name="last_name" required></div>` : ""}<div class="field"><label>Email address</label><input name="email" type="email" required></div>${page !== "forgot" ? `<div class="field"><label>Password</label><div class="password-wrapper"><input name="password" id="passwordInput" type="password" minlength="6" required><button type="button" id="togglePassword" class="toggle-eye"><svg id="eyeIcon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button></div></div>` : ""}<button class="wide" type="submit">${page === "login" ? "Sign in →" : page === "register" ? "Register" : "Send reset link →"}</button><div id="authError" class="form-error"></div></form></section></div>`;
      const togglePassword = document.getElementById("togglePassword");
      const passwordInput = document.getElementById("passwordInput");
      if (togglePassword && passwordInput) {
        togglePassword.onclick = () => {
          const isPwd = passwordInput.type === "password";
          passwordInput.type = isPwd ? "text" : "password";
        };
      }
      document.getElementById("authForm").onsubmit = async (e) => {
        e.preventDefault();
        const f = new FormData(e.target), email = f.get("email"), password = f.get("password"), err = document.getElementById("authError");
        try {
          if (page === "register") {
            const { error } = await sb.auth.signUp({ email, password, options: { data: { display_name: `${f.get("first_name")} ${f.get("last_name")}` } } });
            if (error) throw error;
            err.textContent = "Registration submitted. Check your email to confirm.";
          } else if (page === "login") {
            const { error } = await sb.auth.signInWithPassword({ email, password });
            if (error) throw error;
            location.href = "admin-dashboard.html";
          } else {
            const { error } = await sb.auth.resetPasswordForEmail(email);
            if (error) throw error;
            err.textContent = "Reset email sent.";
          }
        } catch (x) { err.textContent = x.message; }
      };
    }
    return;
  }

  await syncFromSupabase();

  // 1. ADMIN / USER DASHBOARD
  if (page === 'admin-dashboard') {
    if (db.currentRole === 'Superadmin') { db.currentRole = 'Admin'; saveLocalSettings(); }
    initShell('dashboard', 'Dashboard');
    renderModuleDirectory('admin-modules-grid');

    document.getElementById('kpi-customers').textContent = db.customers.filter(c => c.status === 'Active').length;
    document.getElementById('kpi-products').textContent = db.products.length;
    document.getElementById('kpi-employees').textContent = db.employees.filter(e => e.status === 'Active').length;
    document.getElementById('kpi-sales').textContent = db.sales.length;

    if (db.currentRole === 'User') {
      document.getElementById('dash-heading').textContent = 'User dashboard';
      const qaHr = document.getElementById('qa-hr-btn');
      if (qaHr) qaHr.classList.add('disabled-btn');
      const kpiHr = document.getElementById('kpi-hr-card');
      if (kpiHr) { kpiHr.style.opacity = '0.45'; kpiHr.style.pointerEvents = 'none'; }
    }

    if (db.sales.length > 0) {
      document.getElementById('sales-overview-body').innerHTML = db.sales.slice(0, 4).map(s => {
        const cust = db.customers.find(c => c.id === s.customerId);
        return `<div class="flex justify-between text-xs py-2 border-b text-left" style="border-color:var(--border-color);"><span><strong>${s.code}</strong> · ${cust ? cust.name : 'Customer'} (${s.date})</span><strong>₱${Number(s.total).toFixed(2)}</strong></div>`;
      }).join('');
    }
    if (db.products.length > 0) {
      document.getElementById('product-activity-body').innerHTML = db.products.slice(0, 4).map(p =>
        `<div class="flex justify-between text-xs py-2 border-b text-left" style="border-color:var(--border-color);"><span><strong>${p.name}</strong> (${p.sku || p.code})</span><strong>₱${Number(p.unitPrice).toFixed(2)}</strong></div>`
      ).join('');
    }
    document.getElementById('activity-count').textContent = `${db.activityLog.length} entries`;
    if (db.activityLog.length > 0) {
      document.getElementById('recent-activity-list').innerHTML = db.activityLog.slice(0, 5).map(a =>
        `<div class="flex justify-between text-xs py-2 border-b text-left" style="border-color:var(--border-color);"><span><strong>${a.action}:</strong> ${a.detail}</span><span style="color:var(--text-muted);">${a.time}</span></div>`
      ).join('');
    }

    document.getElementById('btn-add-new').onclick = () => {
      const isUser = db.currentRole === 'User';
      document.getElementById('modal-root').innerHTML = `
        <div class="modal-backdrop" onclick="this.remove()">
          <div class="modal-card" onclick="event.stopPropagation()">
            <div class="flex justify-between items-center mb-3"><h3 class="text-base font-bold">Add New Record</h3><button onclick="document.getElementById('modal-root').innerHTML=''">✕</button></div>
            <p class="text-xs mb-4" style="color:var(--text-secondary);">Choose a module to create a manual record:</p>
            <div class="grid gap-2">
              <a href="customer-details.html" class="btn-secondary justify-between"><span>Customer</span><span>→</span></a>
              <a href="product-details.html" class="btn-secondary justify-between"><span>Product</span><span>→</span></a>
              <a href="human-resources.html?tab=employees" class="btn-secondary justify-between ${isUser ? 'disabled-btn' : ''}"><span>Employee (HR)</span><span>→</span></a>
              <a href="new-sale.html" class="btn-secondary justify-between"><span>New Sale</span><span>→</span></a>
            </div>
          </div>
        </div>`;
    };
  }

  // 2. SUPERADMIN DASHBOARD
  if (page === 'superadmin-dashboard') {
    db.currentRole = 'Superadmin';
    saveLocalSettings();
    initShell('dashboard', 'Superadmin dashboard');
    renderModuleDirectory('sa-modules-grid');

    let activeTab = 'all', currentPage = 1, selectedIds = [];
    document.getElementById('set-org-name').value = db.settings.orgName;
    document.getElementById('set-record-entry').value = db.settings.recordEntry;
    document.getElementById('set-timeout').value = db.settings.sessionTimeout;
    document.getElementById('set-default-role').value = db.settings.defaultRole;
    document.getElementById('set-show-stamp').checked = db.settings.showStatusStamp;
    document.getElementById('set-retain-deleted').checked = db.settings.retainDeleted;

    function renderSA() {
      const admins = db.accounts.filter(a => a.role === 'Admin' && a.status !== 'Deleted');
      const users = db.accounts.filter(a => a.role === 'User' && a.status !== 'Deleted');
      const deletedAccs = db.accounts.filter(a => a.status === 'Deleted');
      const totalSys = db.customers.length + db.products.length + db.employees.length + db.sales.length;
      const totalDel = db.customers.filter(c => c.status === 'Deleted').length + deletedAccs.length;

      document.getElementById('sa-kpi-admins').textContent = admins.length;
      document.getElementById('sa-kpi-users').textContent = users.length;
      document.getElementById('sa-kpi-records').textContent = totalSys;
      document.getElementById('sa-kpi-deleted').textContent = totalDel;
      document.getElementById('sa-deleted-summary').textContent = `${totalDel} deleted records · All modules`;

      const tabs = document.querySelectorAll('#sa-account-tabs .tab-btn');
      tabs[0].textContent = `All accounts (${db.accounts.filter(a => a.status !== 'Deleted').length})`;
      tabs[1].textContent = `Admins (${admins.length})`;
      tabs[2].textContent = `Users (${users.length})`;
      tabs[3].textContent = `Deleted accounts (${deletedAccs.length})`;

      let list = db.accounts;
      if (activeTab === 'all') list = db.accounts.filter(a => a.status !== 'Deleted');
      else if (activeTab === 'Admin') list = admins;
      else if (activeTab === 'User') list = users;
      else if (activeTab === 'Deleted') list = deletedAccs;

      const q = document.getElementById('sa-acc-search').value.toLowerCase();
      list = list.filter(a => (a.username || '').toLowerCase().includes(q) || (a.email || '').toLowerCase().includes(q));
      document.getElementById('sa-acc-badge').textContent = `${list.length} records`;

      const pg = paginate(list, currentPage);
      document.querySelectorAll('.col-status-stamp').forEach(el => el.style.display = db.settings.showStatusStamp ? '' : 'none');

      const tbody = document.getElementById('sa-accounts-tbody');
      tbody.innerHTML = pg.slice.length === 0
        ? `<tr><td colspan="7"><div class="empty-state-box"><div class="empty-icon-box">👤</div><div class="text-xs font-semibold mb-1">No accounts in database yet.</div></div></td></tr>`
        : pg.slice.map(a => `
          <tr>
            <td><input type="checkbox" class="sa-row-cb" data-id="${a.id}" ${selectedIds.includes(a.id) ? 'checked' : ''} /></td>
            <td>${a.code}</td><td class="font-semibold">${a.username}</td><td>${a.email || '—'}</td>
            <td><span class="badge-count">${a.role}</span></td>
            <td style="display:${db.settings.showStatusStamp ? '' : 'none'}">${a.status}</td>
            <td style="display:${db.settings.showStatusStamp ? '' : 'none'}">${a.stamp}</td>
          </tr>`).join('');

      document.getElementById('sa-page-label').textContent = list.length === 0 ? 'No pages' : `Page ${pg.currentPage} of ${pg.totalPages}`;
      document.getElementById('sa-prev-page').disabled = pg.currentPage <= 1;
      document.getElementById('sa-next-page').disabled = pg.currentPage >= pg.totalPages;
      document.getElementById('sa-btn-delete').disabled = selectedIds.length === 0;

      document.querySelectorAll('.sa-row-cb').forEach(cb => {
        cb.onchange = (e) => {
          selectedIds = e.target.checked ? [...selectedIds, e.target.dataset.id] : selectedIds.filter(x => x !== e.target.dataset.id);
          renderSA();
        };
      });
    }

    document.querySelectorAll('#sa-account-tabs .tab-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('#sa-account-tabs .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeTab = btn.dataset.tab; currentPage = 1; selectedIds = []; renderSA();
      };
    });
    document.getElementById('sa-acc-search').oninput = () => { currentPage = 1; renderSA(); };
    document.getElementById('sa-prev-page').onclick = () => { currentPage--; renderSA(); };
    document.getElementById('sa-next-page').onclick = () => { currentPage++; renderSA(); };
    document.getElementById('sa-btn-delete').onclick = async () => {
      await sb.from('user_profiles').update({ status: 'Deleted' }).in('id', selectedIds);
      selectedIds = []; await syncFromSupabase(); renderSA(); showToast('Selected accounts moved to deleted.');
    };
    document.getElementById('btn-save-settings').onclick = () => {
      db.settings.orgName = document.getElementById('set-org-name').value || 'Hope, Inc.';
      db.settings.recordEntry = document.getElementById('set-record-entry').value;
      db.settings.sessionTimeout = document.getElementById('set-timeout').value;
      db.settings.defaultRole = document.getElementById('set-default-role').value;
      db.settings.showStatusStamp = document.getElementById('set-show-stamp').checked;
      db.settings.retainDeleted = document.getElementById('set-retain-deleted').checked;
      saveLocalSettings();
      initShell('dashboard', 'Superadmin dashboard');
      renderSA();
      showToast('System settings saved.');
    };
    renderSA();
  }

  // 3. CUSTOMERS
  if (page === 'customers') {
    const urlParams = new URLSearchParams(window.location.search);
    let tab = urlParams.get('tab') === 'Deleted' ? 'Deleted' : 'Active';
    initShell(tab === 'Deleted' ? 'deleted' : 'customers', 'Customers');
    let currentPage = 1, selectedIds = [];

    function renderCustomers() {
      const activeList = db.customers.filter(c => c.status === 'Active');
      const deletedList = db.customers.filter(c => c.status === 'Deleted');
      document.getElementById('tab-cust-active').textContent = `Active (${activeList.length})`;
      document.getElementById('tab-cust-deleted').textContent = `Deleted (${deletedList.length})`;
      document.getElementById('tab-cust-active').classList.toggle('active', tab === 'Active');
      document.getElementById('tab-cust-deleted').classList.toggle('active', tab === 'Deleted');

      const q = document.getElementById('cust-search').value.toLowerCase();
      const base = tab === 'Active' ? activeList : deletedList;
      const filtered = base.filter(c => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || (c.email || '').toLowerCase().includes(q));
      document.getElementById('cust-table-title').textContent = tab === 'Active' ? 'Active customers' : 'Deleted customers';
      document.getElementById('cust-count-badge').textContent = `${filtered.length} records`;
      document.getElementById('cust-last-col').textContent = tab === 'Active' ? 'Status' : 'Deleted on';

      document.getElementById('btn-cust-edit').style.display = tab === 'Active' ? '' : 'none';
      document.getElementById('btn-cust-delete').style.display = tab === 'Active' ? '' : 'none';
      document.getElementById('btn-cust-restore').style.display = tab === 'Deleted' ? '' : 'none';
      document.getElementById('deleted-callout').style.display = tab === 'Deleted' ? 'flex' : 'none';

      const pg = paginate(filtered, currentPage);
      document.getElementById('cust-tbody').innerHTML = pg.slice.length === 0
        ? `<tr><td colspan="6"><div class="empty-state-box"><div class="empty-icon-box">📥</div><div class="text-xs font-semibold mb-1">No records yet. Click Add New to get started.</div></div></td></tr>`
        : pg.slice.map(c => `
          <tr>
            <td><input type="checkbox" class="cust-cb" data-id="${c.id}" ${selectedIds.includes(c.id) ? 'checked' : ''} /></td>
            <td>${c.code}</td><td class="font-semibold">${c.name}</td><td>${c.email || '—'}</td><td>${c.phone || '—'}</td>
            <td>${tab === 'Active' ? 'Active' : (c.deletedOn || 'Deleted')}</td>
          </tr>`).join('');

      document.getElementById('cust-footer-count').textContent = `${filtered.length} records`;
      document.getElementById('cust-page-info').textContent = filtered.length === 0 ? 'No pages' : `Page ${pg.currentPage} of ${pg.totalPages}`;
      document.getElementById('cust-prev').disabled = pg.currentPage <= 1;
      document.getElementById('cust-next').disabled = pg.currentPage >= pg.totalPages;
      document.getElementById('btn-cust-edit').classList.toggle('disabled-btn', selectedIds.length !== 1);
      document.getElementById('btn-cust-delete').disabled = selectedIds.length === 0;
      document.getElementById('btn-cust-restore').disabled = selectedIds.length === 0;

      document.querySelectorAll('.cust-cb').forEach(cb => {
        cb.onchange = (e) => {
          selectedIds = e.target.checked ? [...selectedIds, e.target.dataset.id] : selectedIds.filter(x => x !== e.target.dataset.id);
          renderCustomers();
        };
      });
    }

    document.getElementById('tab-cust-active').onclick = () => { tab = 'Active'; selectedIds = []; currentPage = 1; initShell('customers', 'Customers'); renderCustomers(); };
    document.getElementById('tab-cust-deleted').onclick = () => { tab = 'Deleted'; selectedIds = []; currentPage = 1; initShell('deleted', 'Customers'); renderCustomers(); };
    document.getElementById('cust-search').oninput = () => { currentPage = 1; renderCustomers(); };
    document.getElementById('cust-prev').onclick = () => { currentPage--; renderCustomers(); };
    document.getElementById('cust-next').onclick = () => { currentPage++; renderCustomers(); };

    document.getElementById('btn-cust-delete').onclick = async () => {
      const { error } = await sb.from('customers').update({ is_deleted: true }).in('id', selectedIds);
      if (error) return showToast(error.message);
      selectedIds = []; await syncFromSupabase(); renderCustomers(); showToast('Customer moved to Deleted.');
    };

    document.getElementById('btn-cust-restore').onclick = async () => {
      const { error } = await sb.from('customers').update({ is_deleted: false }).in('id', selectedIds);
      if (error) return showToast(error.message);
      selectedIds = []; await syncFromSupabase(); renderCustomers(); showToast('Customer restored.');
    };
    renderCustomers();
  }

  // 4. CUSTOMER DETAILS FORM
  if (page === 'customer-details') {
    initShell('customers', 'Customers');
    document.getElementById('btn-form-active').textContent = `Active (${db.customers.filter(c => c.status === 'Active').length})`;
    document.getElementById('btn-form-deleted').textContent = `Deleted (${db.customers.filter(c => c.status === 'Deleted').length})`;
    document.getElementById('customer-form').onsubmit = async (e) => {
      e.preventDefault();
      const name = document.getElementById('cust-name').value.trim();
      const { error } = await sb.from('customers').insert({
        customer_name: name,
        company_name: document.getElementById('cust-company').value.trim(),
        email: document.getElementById('cust-email').value.trim(),
        phone: document.getElementById('cust-phone').value.trim(),
        street_address: document.getElementById('cust-street').value.trim(),
        city: document.getElementById('cust-city').value.trim(),
        province: document.getElementById('cust-state').value.trim(),
        postal_code: document.getElementById('cust-postal').value.trim(),
        notes: document.getElementById('cust-notes').value.trim(),
        status: 'Active',
        is_deleted: false
      });
      if (error) return showToast('Error: ' + error.message);
      addLog('Customer saved', name);
      window.location.href = 'customers.html';
    };
  }

  // 4B. PRODUCT REGISTER
  if (page === 'products') {
    initShell('products', 'Products');
    let currentPage = 1, selectedIds = [];

    function renderProducts() {
      const q = document.getElementById('prod-search').value.toLowerCase();
      const filtered = db.products.filter(p =>
        p.code.toLowerCase().includes(q) || p.name.toLowerCase().includes(q) ||
        (p.sku || '').toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q)
      );

      document.getElementById('prod-count-badge').textContent = `${filtered.length} records`;
      const pg = paginate(filtered, currentPage);
      document.getElementById('prod-tbody').innerHTML = pg.slice.length === 0
        ? `<tr><td colspan="7"><div class="empty-state-box"><div class="empty-icon-box">📦</div><div class="text-xs font-semibold mb-1">No products yet. Click Add New to get started.</div></div></td></tr>`
        : pg.slice.map(p => `
          <tr>
            <td><input type="checkbox" class="prod-cb" data-id="${p.id}" ${selectedIds.includes(p.id) ? 'checked' : ''} /></td>
            <td>${p.code}</td>
            <td class="font-semibold">${p.name}</td>
            <td>${p.sku || '—'}</td>
            <td>${p.category || '—'}</td>
            <td>₱${Number(p.unitPrice).toFixed(2)}</td>
            <td>${p.effectiveDate || '—'}</td>
          </tr>`).join('');

      document.getElementById('prod-footer-count').textContent = `${filtered.length} records`;
      document.getElementById('prod-page-info').textContent = filtered.length === 0 ? 'No pages' : `Page ${pg.currentPage} of ${pg.totalPages}`;
      document.getElementById('prod-prev').disabled = pg.currentPage <= 1;
      document.getElementById('prod-next').disabled = pg.currentPage >= pg.totalPages;
      document.getElementById('btn-prod-edit').classList.toggle('disabled-btn', selectedIds.length !== 1);
      document.getElementById('btn-prod-delete').disabled = selectedIds.length === 0;

      document.querySelectorAll('.prod-cb').forEach(cb => {
        cb.onchange = (e) => {
          selectedIds = e.target.checked ? [...selectedIds, e.target.dataset.id] : selectedIds.filter(x => x !== e.target.dataset.id);
          renderProducts();
        };
      });
    }

    document.getElementById('prod-search').oninput = () => { currentPage = 1; renderProducts(); };
    document.getElementById('prod-prev').onclick = () => { currentPage--; renderProducts(); };
    document.getElementById('prod-next').onclick = () => { currentPage++; renderProducts(); };
    document.getElementById('btn-prod-delete').onclick = async () => {
      const { error } = await sb.from('products').delete().in('id', selectedIds);
      if (error) return showToast(error.message);
      selectedIds = []; await syncFromSupabase(); renderProducts(); showToast('Selected products deleted.');
    };
    renderProducts();
  }

  // 5. PRODUCT DETAILS FORM
  if (page === 'product-details') {
    initShell('products', 'Products');
    document.getElementById('product-form').onsubmit = async (e) => {
      e.preventDefault();
      const name = document.getElementById('prod-name').value.trim();
      const unitPrice = parseFloat(document.getElementById('prod-price').value) || 0;
      const effectiveDate = document.getElementById('prod-date').value || new Date().toISOString().split('T')[0];

      const { data: inserted, error } = await sb.from('products').insert({
        product_name: name,
        sku: document.getElementById('prod-sku').value.trim(),
        category: document.getElementById('prod-cat').value.trim(),
        unit: document.getElementById('prod-uom').value.trim(),
        unit_price: unitPrice,
        current_price: unitPrice,
        effective_date: effectiveDate,
        description: document.getElementById('prod-desc').value.trim(),
        status: 'Active'
      }).select().single();

      if (error) return showToast('Error: ' + error.message);

      if (inserted) {
        await sb.from('price_history').insert({
          product_id: inserted.id,
          previous_price: 0,
          new_price: unitPrice,
          effective_date: effectiveDate
        });
      }
      addLog('Product saved', name);
      window.location.href = 'products.html';
    };
  }

  // 6. PRICE HISTORY
  if (page === 'price-history') {
    initShell('products', 'Products');
    let currentPage = 1;
    const sel = document.getElementById('ph-product-select');
    sel.innerHTML = `<option value="">All products</option>` + db.products.map(p => `<option value="${p.id}">${p.name} (${p.sku || p.code})</option>`).join('');

    function renderPH() {
      const pid = sel.value, from = document.getElementById('ph-from').value, to = document.getElementById('ph-to').value;
      let list = db.priceHistory.filter(h => (!pid || h.productId === pid) && (!from || h.effectiveDate >= from) && (!to || h.effectiveDate <= to));
      document.getElementById('ph-count-badge').textContent = `${list.length} records`;
      const pg = paginate(list, currentPage);
      document.getElementById('ph-tbody').innerHTML = pg.slice.length === 0
        ? `<tr><td colspan="6"><div class="empty-state-box"><div class="empty-icon-box">📥</div><div class="text-xs font-semibold">No price history records yet.</div></div></td></tr>`
        : pg.slice.map(h => `<tr><td><input type="checkbox" /></td><td>${h.effectiveDate}</td><td>₱${Number(h.prevPrice).toFixed(2)}</td><td>₱${Number(h.newPrice).toFixed(2)}</td><td>${h.change}</td><td>${h.changedBy}</td></tr>`).join('');
      document.getElementById('ph-footer-count').textContent = `${list.length} records`;
      document.getElementById('ph-page-info').textContent = list.length === 0 ? 'No pages' : `Page ${pg.currentPage} of ${pg.totalPages}`;
      document.getElementById('ph-prev').disabled = pg.currentPage <= 1;
      document.getElementById('ph-next').disabled = pg.currentPage >= pg.totalPages;
    }
    sel.onchange = () => { currentPage = 1; renderPH(); };
    document.getElementById('ph-from').onchange = () => { currentPage = 1; renderPH(); };
    document.getElementById('ph-to').onchange = () => { currentPage = 1; renderPH(); };
    document.getElementById('ph-prev').onclick = () => { currentPage--; renderPH(); };
    document.getElementById('ph-next').onclick = () => { currentPage++; renderPH(); };
    renderPH();
  }

  // 7. HUMAN RESOURCES
  if (page === 'human-resources') {
    initShell('hr', 'Human Resources');
    const urlParams = new URLSearchParams(window.location.search);
    let hrTab = urlParams.get('tab') || 'employees';
    let statusFilter = 'Active';
    let currentPage = 1;

    function openEmployeeModal(editEmp = null) {
      const currentStatus = editEmp ? (editEmp.status || 'Active') : 'Active';
      document.getElementById('modal-root').innerHTML = `
        <div class="modal-backdrop" onclick="this.remove()">
          <div class="modal-card" style="max-width:500px;" onclick="event.stopPropagation()">
            <div class="flex justify-between items-start mb-4">
              <div><h3 class="text-lg font-bold">${editEmp ? 'Edit Employee' : 'Add Employee'}</h3><p class="text-xs" style="color:var(--text-secondary);">Enter employee details</p></div>
              <button class="text-sm px-2 py-1" onclick="document.getElementById('modal-root').innerHTML=''">✕</button>
            </div>
            <form id="modal-emp-form">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
                <div><label class="form-label">Employee No.</label><input type="text" value="${editEmp ? editEmp.code : 'Auto-generated'}" readonly class="form-input" /></div>
                <div><label class="form-label">Gender</label><select id="m-emp-gender" class="form-input"><option value="M" ${editEmp?.gender === 'M' ? 'selected' : ''}>Male (M)</option><option value="F" ${editEmp?.gender === 'F' ? 'selected' : ''}>Female (F)</option></select></div>
                <div><label class="form-label">First Name *</label><input type="text" id="m-emp-first" value="${editEmp ? editEmp.firstName : ''}" required class="form-input" /></div>
                <div><label class="form-label">Last Name *</label><input type="text" id="m-emp-last" value="${editEmp ? editEmp.lastName : ''}" required class="form-input" /></div>
                <div><label class="form-label">Birth Date</label><input type="date" id="m-emp-birth" value="${editEmp?.birthDate || ''}" class="form-input" /></div>
                <div><label class="form-label">Hire Date</label><input type="date" id="m-emp-hire" value="${editEmp?.hireDate || ''}" class="form-input" /></div>
                <div><label class="form-label">Status</label><select id="m-emp-status" class="form-input"><option value="Active" ${currentStatus === 'Active' ? 'selected' : ''}>Active</option><option value="Inactive" ${currentStatus === 'Inactive' ? 'selected' : ''}>Inactive</option></select></div>
                <div><label class="form-label">Separation Date</label><input type="date" id="m-emp-sep" value="${editEmp?.sepDate || ''}" class="form-input" /></div>
              </div>
              <div class="flex gap-2.5 mt-5">
                <button type="submit" class="btn-primary flex-1 justify-center">Save Employee</button>
                <button type="button" class="btn-secondary" onclick="document.getElementById('modal-root').innerHTML=''">Cancel</button>
              </div>
            </form>
          </div>
        </div>`;

      document.getElementById('modal-emp-form').onsubmit = async (e) => {
        e.preventDefault();
        const payload = {
          first_name: document.getElementById('m-emp-first').value.trim(),
          last_name: document.getElementById('m-emp-last').value.trim(),
          gender: document.getElementById('m-emp-gender').value,
          birth_date: document.getElementById('m-emp-birth').value || null,
          hire_date: document.getElementById('m-emp-hire').value || null,
          sep_date: document.getElementById('m-emp-sep').value || null,
          status: document.getElementById('m-emp-status').value
        };
        const { error } = editEmp
          ? await sb.from('employees').update(payload).eq('id', editEmp.id)
          : await sb.from('employees').insert(payload);
        if (error) return showToast(error.message);
        addLog(editEmp ? 'Employee updated' : 'Employee added', `${payload.first_name} ${payload.last_name}`);
        document.getElementById('modal-root').innerHTML = '';
        await syncFromSupabase(); renderHR(); showToast('Employee saved to Supabase.');
      };
    }

    function openJobModal(editJob = null) {
      document.getElementById('modal-root').innerHTML = `
        <div class="modal-backdrop" onclick="this.remove()">
          <div class="modal-card" style="max-width:440px;" onclick="event.stopPropagation()">
            <div class="flex justify-between items-start mb-4">
              <div><h3 class="text-lg font-bold">${editJob ? 'Edit Job' : 'Add Job'}</h3></div>
              <button class="text-sm px-2 py-1" onclick="document.getElementById('modal-root').innerHTML=''">✕</button>
            </div>
            <form id="modal-job-form">
              <div class="mb-5"><label class="form-label">Job Title / Description *</label><input type="text" id="m-job-desc" value="${editJob ? editJob.description : ''}" required class="form-input" /></div>
              <div class="flex gap-2.5"><button type="submit" class="btn-primary flex-1 justify-center">Save Job</button><button type="button" class="btn-secondary" onclick="document.getElementById('modal-root').innerHTML=''">Cancel</button></div>
            </form>
          </div>
        </div>`;

      document.getElementById('modal-job-form').onsubmit = async (e) => {
        e.preventDefault();
        const desc = document.getElementById('m-job-desc').value.trim();
        const { error } = editJob
          ? await sb.from('jobs').update({ job_title: desc, description: desc }).eq('id', editJob.id)
          : await sb.from('jobs').insert({ job_title: desc, description: desc, status: 'Active' });
        if (error) return showToast(error.message);
        document.getElementById('modal-root').innerHTML = '';
        await syncFromSupabase(); renderHR(); showToast('Job saved to Supabase.');
      };
    }

    function openDepartmentModal(editDept = null) {
      document.getElementById('modal-root').innerHTML = `
        <div class="modal-backdrop" onclick="this.remove()">
          <div class="modal-card" style="max-width:440px;" onclick="event.stopPropagation()">
            <div class="flex justify-between items-start mb-4">
              <div><h3 class="text-lg font-bold">${editDept ? 'Edit Department' : 'Add Department'}</h3></div>
              <button class="text-sm px-2 py-1" onclick="document.getElementById('modal-root').innerHTML=''">✕</button>
            </div>
            <form id="modal-dept-form">
              <div class="mb-5"><label class="form-label">Department Name *</label><input type="text" id="m-dept-name" value="${editDept ? editDept.name : ''}" required class="form-input" /></div>
              <div class="flex gap-2.5"><button type="submit" class="btn-primary flex-1 justify-center">Save Department</button><button type="button" class="btn-secondary" onclick="document.getElementById('modal-root').innerHTML=''">Cancel</button></div>
            </form>
          </div>
        </div>`;

      document.getElementById('modal-dept-form').onsubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById('m-dept-name').value.trim();
        const { error } = editDept
          ? await sb.from('departments').update({ department_name: name }).eq('id', editDept.id)
          : await sb.from('departments').insert({ department_name: name, status: 'Active' });
        if (error) return showToast(error.message);
        document.getElementById('modal-root').innerHTML = '';
        await syncFromSupabase(); renderHR(); showToast('Department saved to Supabase.');
      };
    }

    function renderHR() {
      ['employees', 'jobs', 'departments'].forEach(t => {
        const btnId = `tab-hr-${t === 'employees' ? 'emp' : t === 'jobs' ? 'job' : 'dept'}`;
        document.getElementById(btnId).classList.toggle('active', hrTab === t);
      });

      const sourceArr = hrTab === 'employees' ? db.employees : hrTab === 'jobs' ? db.jobs : db.departments;
      const activeCount = sourceArr.filter(item => (item.status || 'Active') === 'Active').length;
      const inactiveCount = sourceArr.filter(item => item.status === 'Inactive').length;

      document.getElementById('filter-hr-active').textContent = `Active (${activeCount})`;
      document.getElementById('filter-hr-inactive').textContent = `Inactive (${inactiveCount})`;
      document.getElementById('filter-hr-all').textContent = `All (${sourceArr.length})`;

      const addBtn = document.getElementById('btn-hr-add');
      const q = document.getElementById('hr-search').value.toLowerCase();
      const thead = document.getElementById('hr-thead');
      const tbody = document.getElementById('hr-tbody');

      let filtered = sourceArr.filter(item => {
        const st = item.status || 'Active';
        if (statusFilter === 'Active' && st !== 'Active') return false;
        if (statusFilter === 'Inactive' && st !== 'Inactive') return false;
        return JSON.stringify(item).toLowerCase().includes(q);
      });

      const pg = paginate(filtered, currentPage);

      if (hrTab === 'employees') {
        document.getElementById('hr-section-title').textContent = 'Employees';
        addBtn.textContent = '+ Add Employee';
        addBtn.onclick = () => openEmployeeModal(null);
        thead.innerHTML = `<tr><th>EMP NO</th><th>LAST NAME</th><th>FIRST NAME</th><th>GENDER</th><th>BIRTH DATE</th><th>HIRE DATE</th><th>SEP DATE</th><th>STATUS</th><th>STAMP</th><th>ACTIONS</th></tr>`;
        tbody.innerHTML = pg.slice.length === 0
          ? `<tr><td colspan="10"><div class="empty-state-box"><div class="empty-icon-box">🪪</div><div class="text-xs font-semibold">No employee records. Click + Add Employee.</div></div></td></tr>`
          : pg.slice.map(emp => `
            <tr>
              <td class="font-semibold">${emp.code}</td><td>${emp.lastName}</td><td>${emp.firstName}</td>
              <td>${emp.gender || '—'}</td><td>${emp.birthDate || '—'}</td><td>${emp.hireDate || '—'}</td><td>${emp.sepDate || '—'}</td>
              <td><span class="badge-count">${emp.status}</span></td><td class="text-[11px]">${emp.stamp}</td>
              <td><div class="flex gap-1.5">
                <button class="btn-secondary text-[11px] py-1 px-2 hr-emp-edit" data-id="${emp.id}">Edit</button>
                <button class="btn-secondary text-[11px] py-1 px-2 hr-emp-del" data-id="${emp.id}">Deactivate</button>
              </div></td>
            </tr>`).join('');

        document.querySelectorAll('.hr-emp-edit').forEach(b => b.onclick = () => openEmployeeModal(db.employees.find(x => x.id === b.dataset.id)));
        document.querySelectorAll('.hr-emp-del').forEach(b => b.onclick = async () => {
          await sb.from('employees').update({ status: 'Inactive', sep_date: new Date().toISOString().split('T')[0] }).eq('id', b.dataset.id);
          await syncFromSupabase(); renderHR(); showToast('Employee marked Inactive.');
        });
      } else if (hrTab === 'jobs') {
        document.getElementById('hr-section-title').textContent = 'Jobs';
        addBtn.textContent = '+ Add Job';
        addBtn.onclick = () => openJobModal(null);
        thead.innerHTML = `<tr><th>JOB CODE</th><th>DESCRIPTION</th><th>STATUS</th><th>STAMP</th><th>ACTIONS</th></tr>`;
        tbody.innerHTML = pg.slice.length === 0
          ? `<tr><td colspan="5"><div class="empty-state-box"><div class="empty-icon-box">💼</div><div class="text-xs font-semibold">No job records.</div></div></td></tr>`
          : pg.slice.map(j => `
            <tr>
              <td class="font-semibold">${j.code}</td><td>${j.description}</td><td><span class="badge-count">${j.status}</span></td><td>${j.stamp}</td>
              <td><div class="flex gap-1.5">
                <button class="btn-secondary text-[11px] py-1 px-2.5 hr-job-edit" data-id="${j.id}">Edit</button>
                <button class="btn-secondary text-[11px] py-1 px-2.5 hr-job-del" data-id="${j.id}">Deactivate</button>
              </div></td>
            </tr>`).join('');

        document.querySelectorAll('.hr-job-edit').forEach(b => b.onclick = () => openJobModal(db.jobs.find(x => x.id === b.dataset.id)));
        document.querySelectorAll('.hr-job-del').forEach(b => b.onclick = async () => {
          await sb.from('jobs').update({ status: 'Inactive' }).eq('id', b.dataset.id);
          await syncFromSupabase(); renderHR(); showToast('Job marked Inactive.');
        });
      } else {
        document.getElementById('hr-section-title').textContent = 'Departments';
        addBtn.textContent = '+ Add Department';
        addBtn.onclick = () => openDepartmentModal(null);
        thead.innerHTML = `<tr><th>DEPT CODE</th><th>DEPARTMENT NAME</th><th>STATUS</th><th>STAMP</th><th>ACTIONS</th></tr>`;
        tbody.innerHTML = pg.slice.length === 0
          ? `<tr><td colspan="5"><div class="empty-state-box"><div class="empty-icon-box">🗂️</div><div class="text-xs font-semibold">No departments yet.</div></div></td></tr>`
          : pg.slice.map(d => `
            <tr>
              <td class="font-semibold">${d.code}</td><td>${d.name}</td><td><span class="badge-count">${d.status}</span></td><td>${d.stamp}</td>
              <td><div class="flex gap-1.5">
                <button class="btn-secondary text-[11px] py-1 px-2.5 hr-dept-edit" data-id="${d.id}">Edit</button>
                <button class="btn-secondary text-[11px] py-1 px-2.5 hr-dept-del" data-id="${d.id}">Deactivate</button>
              </div></td>
            </tr>`).join('');

        document.querySelectorAll('.hr-dept-edit').forEach(b => b.onclick = () => openDepartmentModal(db.departments.find(x => x.id === b.dataset.id)));
        document.querySelectorAll('.hr-dept-del').forEach(b => b.onclick = async () => {
          await sb.from('departments').update({ status: 'Inactive' }).eq('id', b.dataset.id);
          await syncFromSupabase(); renderHR(); showToast('Department marked Inactive.');
        });
      }

      document.getElementById('hr-footer-count').textContent = `${filtered.length} records`;
      document.getElementById('hr-page-info').textContent = filtered.length === 0 ? 'No pages' : `Page ${pg.currentPage} of ${pg.totalPages}`;
      document.getElementById('hr-prev').disabled = pg.currentPage <= 1;
      document.getElementById('hr-next').disabled = pg.currentPage >= pg.totalPages;
    }

    document.getElementById('tab-hr-emp').onclick = () => { hrTab = 'employees'; statusFilter = 'Active'; currentPage = 1; renderHR(); };
    document.getElementById('tab-hr-job').onclick = () => { hrTab = 'jobs'; statusFilter = 'Active'; currentPage = 1; renderHR(); };
    document.getElementById('tab-hr-dept').onclick = () => { hrTab = 'departments'; statusFilter = 'Active'; currentPage = 1; renderHR(); };
    document.getElementById('filter-hr-active').onclick = () => { statusFilter = 'Active'; currentPage = 1; renderHR(); };
    document.getElementById('filter-hr-inactive').onclick = () => { statusFilter = 'Inactive'; currentPage = 1; renderHR(); };
    document.getElementById('filter-hr-all').onclick = () => { statusFilter = 'All'; currentPage = 1; renderHR(); };
    document.getElementById('hr-search').oninput = () => { currentPage = 1; renderHR(); };
    document.getElementById('hr-prev').onclick = () => { currentPage--; renderHR(); };
    document.getElementById('hr-next').onclick = () => { currentPage++; renderHR(); };
    renderHR();
  }

  // 8-10. STANDALONE HR FORMS
  if (page === 'employee-details') {
    initShell('hr', 'Human Resources');
    document.getElementById('emp-job').innerHTML = `<option value="">Select job</option>` + db.jobs.map(j => `<option value="${j.id}">${j.title}</option>`).join('');
    document.getElementById('emp-dept').innerHTML = `<option value="">Select department</option>` + db.departments.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
    document.getElementById('employee-form').onsubmit = async (e) => {
      e.preventDefault();
      const { error } = await sb.from('employees').insert({
        first_name: document.getElementById('emp-first').value.trim(),
        last_name: document.getElementById('emp-last').value.trim(),
        email: document.getElementById('emp-email').value.trim(),
        phone: document.getElementById('emp-phone').value.trim(),
        job_id: document.getElementById('emp-job').value || null,
        department_id: document.getElementById('emp-dept').value || null,
        hire_date: document.getElementById('emp-start').value || null,
        status: document.getElementById('emp-status').value || 'Active'
      });
      if (error) return showToast(error.message);
      window.location.href = 'human-resources.html?tab=employees';
    };
  }

  if (page === 'job-details') {
    initShell('hr', 'Human Resources');
    document.getElementById('job-dept').innerHTML = `<option value="">Select department</option>` + db.departments.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
    document.getElementById('job-form').onsubmit = async (e) => {
      e.preventDefault();
      const { error } = await sb.from('jobs').insert({
        job_title: document.getElementById('job-title').value.trim(),
        department_id: document.getElementById('job-dept').value || null,
        description: document.getElementById('job-desc').value.trim(),
        status: 'Active'
      });
      if (error) return showToast(error.message);
      window.location.href = 'human-resources.html?tab=jobs';
    };
  }

  if (page === 'department-details') {
    initShell('hr', 'Human Resources');
    document.getElementById('dept-form').onsubmit = async (e) => {
      e.preventDefault();
      const { error } = await sb.from('departments').insert({
        department_name: document.getElementById('dept-name').value.trim(),
        description: document.getElementById('dept-desc').value.trim(),
        status: 'Active'
      });
      if (error) return showToast(error.message);
      window.location.href = 'human-resources.html?tab=departments';
    };
  }

  // 11. NEW SALE FORM
  if (page === 'new-sale') {
    initShell('sales', 'Sales');
    let lineItems = [];
    const custSel = document.getElementById('sale-customer');
    const prodSel = document.getElementById('line-product');
    custSel.innerHTML = `<option value="">Select customer</option>` + db.customers.filter(c => c.status === 'Active').map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    prodSel.innerHTML = `<option value="">Select product</option>` + db.products.map(p => `<option value="${p.id}" data-price="${p.unitPrice}">${p.name}</option>`).join('');

    prodSel.onchange = () => {
      const opt = prodSel.options[prodSel.selectedIndex];
      if (opt && opt.dataset.price) document.getElementById('line-price').value = opt.dataset.price;
    };

    function renderLines() {
      document.getElementById('sale-lines-badge').textContent = `${lineItems.length} records`;
      document.getElementById('sale-lines-count').textContent = `${lineItems.length} records`;
      document.getElementById('sale-lines-tbody').innerHTML = lineItems.length === 0
        ? `<tr><td colspan="5"><div class="empty-state-box py-6"><div class="empty-icon-box">📥</div><div class="text-xs font-semibold">No line items added yet.</div></div></td></tr>`
        : lineItems.map(item => `<tr><td><input type="checkbox" /></td><td class="font-semibold">${item.productName}</td><td>${item.qty}</td><td>₱${Number(item.unitPrice).toFixed(2)}</td><td class="font-semibold">₱${Number(item.total).toFixed(2)}</td></tr>`).join('');
      const grand = lineItems.reduce((sum, i) => sum + i.total, 0);
      document.getElementById('sale-grand-total').textContent = grand.toFixed(2);
    }

    document.getElementById('btn-add-line-item').onclick = () => {
      const productId = prodSel.value;
      const qty = parseFloat(document.getElementById('line-qty').value);
      const unitPrice = parseFloat(document.getElementById('line-price').value);
      if (!productId || !qty || isNaN(unitPrice)) return showToast('Select Product, Quantity, and Unit price.');
      const prod = db.products.find(p => p.id === productId);
      lineItems.push({ productId, productName: prod ? prod.name : 'Product', qty, unitPrice, total: qty * unitPrice });
      prodSel.value = ''; document.getElementById('line-qty').value = ''; document.getElementById('line-price').value = '';
      renderLines();
    };

    document.getElementById('new-sale-form').onsubmit = async (e) => {
      e.preventDefault();
      const total = lineItems.reduce((sum, i) => sum + i.total, 0);
      const { data: saleInserted, error } = await sb.from('sales').insert({
        customer_id: custSel.value || null,
        sale_date: document.getElementById('sale-date').value || new Date().toISOString().split('T')[0],
        total_amount: total,
        balance: total,
        payment_status: 'Unpaid'
      }).select().single();

      if (error) return showToast('Error: ' + error.message);

      if (saleInserted && lineItems.length > 0) {
        await sb.from('sale_items').insert(lineItems.map(i => ({
          sale_id: saleInserted.id,
          product_id: i.productId,
          quantity: i.qty,
          unit_price: i.unitPrice,
          line_total: i.total
        })));
      }
      addLog('Sale created', `₱${total.toFixed(2)}`);
      window.location.href = 'sales-details.html';
    };
    renderLines();
  }

  // 12. SALES DETAILS & PAYMENTS VIEW
  if (page === 'sales-details') {
    initShell('reports', 'Reports');
    let itemsPage = 1, payPage = 1;
    const saleSel = document.getElementById('sd-sale-select');
    document.getElementById('tab-sd-records').textContent = `Sales records (${db.sales.length})`;
    document.getElementById('tab-sd-payments').textContent = `Payments (${db.payments.length})`;
    saleSel.innerHTML = `<option value="">Select sale</option>` + db.sales.map(s => `<option value="${s.id}">${s.code} (${s.date})</option>`).join('');
    if (db.sales.length > 0) saleSel.value = db.sales[0].id;

    function renderSD() {
      const sale = db.sales.find(s => s.id === saleSel.value);
      const cust = sale ? db.customers.find(c => c.id === sale.customerId) : null;
      document.getElementById('sd-customer-display').value = cust ? cust.name : '';
      document.getElementById('sd-date-display').value = sale ? sale.date : '';

      const items = sale ? sale.items : [];
      const pays = sale ? db.payments.filter(p => p.saleId === sale.id) : [];
      document.getElementById('sd-items-badge').textContent = `${items.length} records`;
      document.getElementById('sd-pay-badge').textContent = `${pays.length} records`;

      const pgItems = paginate(items, itemsPage);
      document.getElementById('sd-items-tbody').innerHTML = pgItems.slice.length === 0
        ? `<tr><td colspan="5"><div class="empty-state-box py-6"><div class="empty-icon-box">📥</div><div class="text-xs font-semibold">No line items.</div></div></td></tr>`
        : pgItems.slice.map(i => `<tr><td><input type="checkbox" /></td><td>${i.productName}</td><td>${i.qty}</td><td>₱${Number(i.unitPrice).toFixed(2)}</td><td>₱${Number(i.total).toFixed(2)}</td></tr>`).join('');
      document.getElementById('sd-items-count').textContent = `${items.length} records`;
      document.getElementById('sd-items-page-info').textContent = items.length === 0 ? 'No pages' : `Page ${pgItems.currentPage} of ${pgItems.totalPages}`;
      document.getElementById('sd-items-prev').disabled = pgItems.currentPage <= 1;
      document.getElementById('sd-items-next').disabled = pgItems.currentPage >= pgItems.totalPages;

      const pgPays = paginate(pays, payPage);
      document.getElementById('sd-pay-tbody').innerHTML = pgPays.slice.length === 0
        ? `<tr><td colspan="5"><div class="empty-state-box py-6"><div class="empty-icon-box">📥</div><div class="text-xs font-semibold">No payments recorded.</div></div></td></tr>`
        : pgPays.slice.map(p => `<tr><td><input type="checkbox" /></td><td>${p.date}</td><td>${p.method}</td><td>${p.reference || '—'}</td><td>₱${Number(p.amount).toFixed(2)}</td></tr>`).join('');
      document.getElementById('sd-pay-count').textContent = `${pays.length} records`;
      document.getElementById('sd-pay-page-info').textContent = pays.length === 0 ? 'No pages' : `Page ${pgPays.currentPage} of ${pgPays.totalPages}`;
      document.getElementById('sd-pay-prev').disabled = pgPays.currentPage <= 1;
      document.getElementById('sd-pay-next').disabled = pgPays.currentPage >= pgPays.totalPages;

      const saleTotal = sale ? sale.total : 0;
      const paidTotal = pays.reduce((sum, p) => sum + Number(p.amount), 0);
      document.getElementById('sd-total').textContent = saleTotal.toFixed(2);
      document.getElementById('sd-paid').textContent = paidTotal.toFixed(2);
      document.getElementById('sd-balance').textContent = Math.max(0, saleTotal - paidTotal).toFixed(2);
      document.getElementById('btn-sd-add-payment').classList.toggle('disabled-btn', !sale);
    }

    saleSel.onchange = () => { itemsPage = 1; payPage = 1; renderSD(); };
    document.getElementById('sd-items-prev').onclick = () => { itemsPage--; renderSD(); };
    document.getElementById('sd-items-next').onclick = () => { itemsPage++; renderSD(); };
    document.getElementById('sd-pay-prev').onclick = () => { payPage--; renderSD(); };
    document.getElementById('sd-pay-next').onclick = () => { payPage++; renderSD(); };
    renderSD();
  }

  // 13. RECORD A PAYMENT FORM
  if (page === 'record-payment') {
    initShell('sales', 'Sales');
    const saleSel = document.getElementById('pay-sale');
    saleSel.innerHTML = `<option value="">Select sale</option>` + db.sales.map(s => `<option value="${s.id}">${s.code} (₱${Number(s.total).toFixed(2)})</option>`).join('');
    document.getElementById('payment-form').onsubmit = async (e) => {
      e.preventDefault();
      const saleId = saleSel.value;
      const amount = parseFloat(document.getElementById('pay-amount').value);
      const { error } = await sb.from('payments').insert({
        sale_id: saleId,
        amount,
        payment_date: document.getElementById('pay-date').value,
        method: document.getElementById('pay-method').value,
        reference: document.getElementById('pay-ref').value.trim(),
        notes: document.getElementById('pay-notes').value.trim()
      });
      if (error) return showToast('Error: ' + error.message);

      // Update sale balance & status
      const sale = db.sales.find(s => s.id === saleId);
      if (sale) {
        const prevPaid = db.payments.filter(p => p.saleId === saleId).reduce((sum, p) => sum + p.amount, 0);
        const newPaid = prevPaid + amount;
        const newBal = Math.max(0, sale.total - newPaid);
        await sb.from('sales').update({
          balance: newBal,
          payment_status: newBal === 0 ? 'Paid' : 'Partial'
        }).eq('id', saleId);
      }
      addLog('Payment recorded', `₱${amount.toFixed(2)}`);
      window.location.href = 'sales-details.html';
    };
  }

  // 14 & 15. USER MANAGEMENT (roles-access.html)
  if (page === 'roles-access') {
    initShell('users', 'User Management');
    let currentPage = 1;

    function openUserModal(editAcc) {
      document.getElementById('modal-root').innerHTML = `
        <div class="modal-backdrop" onclick="this.remove()">
          <div class="modal-card" style="max-width:480px;" onclick="event.stopPropagation()">
            <div class="flex justify-between items-start mb-4">
              <div><h3 class="text-lg font-bold">Edit User Role & Status</h3><p class="text-xs" style="color:var(--text-secondary);">${editAcc.email}</p></div>
              <button class="text-sm px-2 py-1" onclick="document.getElementById('modal-root').innerHTML=''">✕</button>
            </div>
            <form id="modal-user-form">
              <div class="mb-3.5"><label class="form-label">Display Name *</label><input type="text" id="m-user-name" value="${editAcc.username}" required class="form-input" /></div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5">
                <div><label class="form-label">Role</label><select id="m-user-role" class="form-input"><option value="User" ${editAcc.role === 'User' ? 'selected' : ''}>User</option><option value="Admin" ${editAcc.role === 'Admin' ? 'selected' : ''}>Admin</option><option value="Superadmin" ${editAcc.role === 'Superadmin' ? 'selected' : ''}>Superadmin</option></select></div>
                <div><label class="form-label">Status</label><select id="m-user-status" class="form-input"><option value="Active" ${editAcc.status === 'Active' ? 'selected' : ''}>Active</option><option value="Blocked" ${editAcc.status === 'Blocked' ? 'selected' : ''}>Blocked</option></select></div>
              </div>
              <div class="flex gap-2.5"><button type="submit" class="btn-primary flex-1 justify-center">Save Changes</button><button type="button" class="btn-secondary" onclick="document.getElementById('modal-root').innerHTML=''">Cancel</button></div>
            </form>
          </div>
        </div>`;

      document.getElementById('modal-user-form').onsubmit = async (e) => {
        e.preventDefault();
        const { error } = await sb.from('user_profiles').update({
          display_name: document.getElementById('m-user-name').value.trim(),
          role: document.getElementById('m-user-role').value,
          status: document.getElementById('m-user-status').value
        }).eq('id', editAcc.id);
        if (error) return showToast(error.message);
        document.getElementById('modal-root').innerHTML = '';
        await syncFromSupabase(); renderUsers(); showToast('User profile updated.');
      };
    }

    function openUserRightsModal(acc) {
      const savedRights = db.permissions[acc.id] || {};
      document.getElementById('modal-root').innerHTML = `
        <div class="modal-backdrop" onclick="this.remove()">
          <div class="modal-card" style="max-width:620px; width:95%;" onclick="event.stopPropagation()">
            <div class="flex justify-between items-start mb-4">
              <div><h3 class="text-lg font-bold">Rights — ${acc.username}</h3><p class="text-xs" style="color:var(--text-secondary);">${acc.email}</p></div>
              <button class="text-sm px-2 py-1" onclick="document.getElementById('modal-root').innerHTML=''">✕</button>
            </div>
            <div class="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1 mb-5">
              ${USER_RIGHTS_GROUPS.map(grp => {
                const grpSaved = savedRights[grp.id] || {};
                return `
                  <div class="border rounded-lg p-3.5" style="border-color:var(--border-color); background:#fcfbf8;">
                    <div class="font-bold text-xs mb-2">${grp.title}</div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      ${grp.items.map(item => `<label class="flex items-center gap-2 text-xs"><input type="checkbox" class="rights-item-cb" data-group="${grp.id}" data-item="${item}" ${grpSaved[item] ? 'checked' : ''} /><span>${item}</span></label>`).join('')}
                    </div>
                  </div>`;
              }).join('')}
            </div>
            <div class="flex gap-2.5"><button type="button" id="btn-save-user-rights" class="btn-primary flex-1 justify-center">Save Rights</button><button type="button" class="btn-secondary" onclick="document.getElementById('modal-root').innerHTML=''">Cancel</button></div>
          </div>
        </div>`;

      document.getElementById('btn-save-user-rights').onclick = async () => {
        const matrix = {};
        USER_RIGHTS_GROUPS.forEach(grp => {
          matrix[grp.id] = {};
          document.querySelectorAll(`.rights-item-cb[data-group="${grp.id}"]`).forEach(cb => {
            matrix[grp.id][cb.dataset.item] = cb.checked;
          });
        });
        const { error } = await sb.from('user_profiles').update({ permissions: matrix }).eq('id', acc.id);
        if (error) return showToast(error.message);
        db.permissions[acc.id] = matrix;
        document.getElementById('modal-root').innerHTML = '';
        showToast(`Saved rights for ${acc.username}.`);
      };
    }

    function renderUsers() {
      const q = document.getElementById('um-search').value.toLowerCase();
      const visibleAccounts = db.accounts.filter(a => a.status !== 'Deleted');
      const filtered = visibleAccounts.filter(a => (a.username || '').toLowerCase().includes(q) || (a.email || '').toLowerCase().includes(q));

      document.getElementById('um-count-badge').textContent = `${filtered.length} records`;
      const pg = paginate(filtered, currentPage);
      document.getElementById('um-tbody').innerHTML = pg.slice.length === 0
        ? `<tr><td colspan="5"><div class="empty-state-box"><div class="empty-icon-box">👤</div><div class="text-xs font-semibold">No registered users yet. Sign up via register.html first.</div></div></td></tr>`
        : pg.slice.map(acc => `
          <tr>
            <td class="font-semibold">${acc.username}</td><td>${acc.email || '—'}</td>
            <td><span class="badge-count uppercase">${acc.role}</span></td><td><span class="badge-count">${acc.status}</span></td>
            <td><div class="flex gap-1.5">
              ${acc.role === 'User' ? `<button class="btn-secondary text-[11px] py-1 px-2.5 um-rights-btn" data-id="${acc.id}">Rights</button>` : ''}
              <button class="btn-secondary text-[11px] py-1 px-2.5 um-edit-btn" data-id="${acc.id}">Edit</button>
            </div></td>
          </tr>`).join('');

      document.getElementById('um-footer-count').textContent = `${filtered.length} records`;
      document.getElementById('um-page-info').textContent = filtered.length === 0 ? 'No pages' : `Page ${pg.currentPage} of ${pg.totalPages}`;
      document.getElementById('um-prev').disabled = pg.currentPage <= 1;
      document.getElementById('um-next').disabled = pg.currentPage >= pg.totalPages;

      document.querySelectorAll('.um-rights-btn').forEach(b => b.onclick = () => openUserRightsModal(db.accounts.find(a => a.id === b.dataset.id)));
      document.querySelectorAll('.um-edit-btn').forEach(b => b.onclick = () => openUserModal(db.accounts.find(a => a.id === b.dataset.id)));
    }

    document.getElementById('btn-um-add').onclick = () => showToast('New users register through register.html (Auth).');
    document.getElementById('um-search').oninput = () => { currentPage = 1; renderUsers(); };
    document.getElementById('um-prev').onclick = () => { currentPage--; renderUsers(); };
    document.getElementById('um-next').onclick = () => { currentPage++; renderUsers(); };
    renderUsers();
  }
});
