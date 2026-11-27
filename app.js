const SUPABASE_URL = "https://citroocfaepvujntqged.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_swuE211u3_SaSArnOFrIjQ_MviAgoHZ";
const sb = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const SETTINGS_KEY = 'hope_erp_settings_v2';
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
  signout: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  calendar: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`
};

const HopeCalendar = (() => {
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let activeInput = null;
  let popover = null;
  let viewYear = new Date().getFullYear();
  let viewMonth = new Date().getMonth();

  function formatDisplay(isoStr) {
    if (!isoStr) return '';
    const parts = isoStr.split('-');
    if (parts.length !== 3) return isoStr;
    const d = parseInt(parts[2], 10);
    const m = parseInt(parts[1], 10) - 1;
    const y = parts[0];
    if (isNaN(d) || isNaN(m) || !SHORT_MONTHS[m]) return isoStr;
    return `${String(d).padStart(2, '0')} ${SHORT_MONTHS[m]} ${y}`;
  }

  function toISO(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  function parseISO(str) {
    if (!str) return null;
    const parts = str.split('-');
    if (parts.length !== 3) return null;
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
    return { year: y, month: m, day: d };
  }

  function close() {
    if (popover) { popover.remove(); popover = null; }
    activeInput = null;
  }

  function positionPopover() {
    if (!popover || !activeInput) return;
    const rect = activeInput.getBoundingClientRect();
    const popW = 300, popH = 345;
    let left = rect.left;
    let top = rect.bottom + 6;
    if (left + popW > window.innerWidth - 12) left = window.innerWidth - popW - 12;
    if (left < 12) left = 12;
    if (top + popH > window.innerHeight - 12) top = Math.max(12, rect.top - popH - 6);
    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
  }

  function setInputISO(input, isoStr, silent = false) {
    if (!input) return;
    input.dataset.isoValue = isoStr || '';
    input.value = isoStr ? formatDisplay(isoStr) : '';
    if (!silent) {
      input.dispatchEvent(new Event('change', { bubbles: true }));
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  function render() {
    if (!popover || !activeInput) return;
    const selected = parseISO(activeInput.dataset.isoValue || '');
    const now = new Date();
    const todayY = now.getFullYear(), todayM = now.getMonth(), todayD = now.getDate();

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const startOffset = (firstDay + 6) % 7;
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    let yearOptions = '';
    for (let y = 1940; y <= 2050; y++) {
      yearOptions += `<option value="${y}" ${y === viewYear ? 'selected' : ''}>${y}</option>`;
    }

    const monthOptions = MONTHS.map((m, idx) =>
      `<option value="${idx}" ${idx === viewMonth ? 'selected' : ''}>${m}</option>`
    ).join('');

    const cells = [];
    for (let i = startOffset - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const pm = viewMonth === 0 ? 11 : viewMonth - 1;
      const py = viewMonth === 0 ? viewYear - 1 : viewYear;
      cells.push({ day: d, month: pm, year: py, outside: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, month: viewMonth, year: viewYear, outside: false });
    }
    while (cells.length < 42) {
      const d = cells.length - (startOffset + daysInMonth) + 1;
      const nm = viewMonth === 11 ? 0 : viewMonth + 1;
      const ny = viewMonth === 11 ? viewYear + 1 : viewYear;
      cells.push({ day: d, month: nm, year: ny, outside: true });
    }

    popover.innerHTML = `
      <div class="hope-cal-header">
        <div class="hope-cal-selects">
          <select id="hope-cal-month" class="hope-cal-select">${monthOptions}</select>
          <select id="hope-cal-year" class="hope-cal-select">${yearOptions}</select>
        </div>
        <div class="flex items-center gap-1">
          <button type="button" id="hope-cal-prev" class="hope-cal-nav-btn">‹</button>
          <button type="button" id="hope-cal-next" class="hope-cal-nav-btn">›</button>
        </div>
      </div>
      <div class="hope-cal-weekdays"><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div><div>Su</div></div>
      <div class="hope-cal-days">
        ${cells.map(c => {
          const isToday = c.year === todayY && c.month === todayM && c.day === todayD;
          const isSel = selected && c.year === selected.year && c.month === selected.month && c.day === selected.day;
          const classes = ['hope-cal-day', c.outside ? 'outside' : '', isToday ? 'today' : '', isSel ? 'selected' : ''].filter(Boolean).join(' ');
          return `<button type="button" class="${classes}" data-iso="${toISO(c.year, c.month, c.day)}">${c.day}</button>`;
        }).join('')}
      </div>
      <div class="hope-cal-footer">
        <button type="button" id="hope-cal-clear" class="hope-cal-clear">Clear</button>
        <button type="button" id="hope-cal-today" class="hope-cal-today-btn">Today</button>
      </div>
    `;

    popover.querySelector('#hope-cal-month').onchange = (e) => { viewMonth = parseInt(e.target.value, 10); render(); };
    popover.querySelector('#hope-cal-year').onchange = (e) => { viewYear = parseInt(e.target.value, 10); render(); };
    popover.querySelector('#hope-cal-prev').onclick = () => { if (viewMonth === 0) { viewMonth = 11; viewYear--; } else { viewMonth--; } render(); };
    popover.querySelector('#hope-cal-next').onclick = () => { if (viewMonth === 11) { viewMonth = 0; viewYear++; } else { viewMonth++; } render(); };
    popover.querySelectorAll('.hope-cal-day').forEach(btn => {
      btn.onclick = () => { setInputISO(activeInput, btn.dataset.iso); close(); };
    });
    popover.querySelector('#hope-cal-clear').onclick = () => { setInputISO(activeInput, ''); close(); };
    popover.querySelector('#hope-cal-today').onclick = () => {
      const n = new Date();
      setInputISO(activeInput, toISO(n.getFullYear(), n.getMonth(), n.getDate()));
      close();
    };
  }

  function open(input) {
    if (activeInput === input && popover) return;
    close();
    activeInput = input;
    const parsed = parseISO(input.dataset.isoValue || '');
    const base = parsed || { year: new Date().getFullYear(), month: new Date().getMonth() };
    viewYear = base.year;
    viewMonth = base.month;

    popover = document.createElement('div');
    popover.className = 'hope-cal-popover';
    popover.addEventListener('click', (e) => e.stopPropagation());
    document.body.appendChild(popover);
    render();
    positionPopover();
  }

  function enhance(root = document) {
    const allowedPages = ['products', 'product-details', 'price-history', 'sales', 'new-sale', 'record-payment', 'human-resources', 'employee-details', 'sales-details'];
    const currentPage = document.body?.dataset?.page || '';
    if (!allowedPages.includes(currentPage)) return;

    root.querySelectorAll('input[type="date"]').forEach(input => {
      if (input.dataset.hopeCalAttached) return;
      input.dataset.hopeCalAttached = '1';

      const initialISO = input.value || '';
      input.type = 'text';
      input.readOnly = true;
      input.placeholder = 'Select date';
      input.classList.add('hope-date-input');
      input.dataset.isoValue = initialISO;
      if (initialISO) input.value = formatDisplay(initialISO);

      const wrap = document.createElement('div');
      wrap.className = 'hope-date-wrap';
      input.parentNode.insertBefore(wrap, input);
      wrap.appendChild(input);

      const iconSpan = document.createElement('span');
      iconSpan.className = 'hope-date-icon';
      iconSpan.innerHTML = ICONS.calendar;
      wrap.appendChild(iconSpan);

      input.addEventListener('click', (e) => { e.stopPropagation(); open(input); });
    });
  }

  function getISO(idOrEl) {
    const el = typeof idOrEl === 'string' ? document.getElementById(idOrEl) : idOrEl;
    if (!el) return '';
    return el.dataset.isoValue !== undefined ? el.dataset.isoValue : el.value;
  }

  function setISO(idOrEl, isoStr, silent = false) {
    const el = typeof idOrEl === 'string' ? document.getElementById(idOrEl) : idOrEl;
    setInputISO(el, isoStr, silent);
  }

  document.addEventListener('click', (e) => { if (popover && !popover.contains(e.target) && e.target !== activeInput) close(); });
  window.addEventListener('resize', positionPopover);
  window.addEventListener('scroll', positionPopover, true);

  return { enhance, getISO, setISO, formatDisplay };
})();

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
    id: 'sales', title: 'Sales', icon: ICONS.sales, href: 'sales.html',
    summary: 'View sales transactions, create new sales orders, and record payments.',
    subpages: [{ label: 'Sales Register', href: 'sales.html' }, { label: '+ New Sale', href: 'new-sale.html' }, { label: 'Record Payment', href: 'record-payment.html' }]
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

const ROLE_ALLOWED_PAGES = {
  Superadmin: ['superadmin-dashboard', 'admin-dashboard', 'user-dashboard', 'customers', 'customer-details', 'products', 'product-details', 'price-history', 'human-resources', 'employee-details', 'job-details', 'department-details', 'sales', 'new-sale', 'sales-details', 'record-payment', 'roles-access', 'account-details', 'permissions'],
  Admin: ['admin-dashboard', 'customers', 'customer-details', 'products', 'product-details', 'price-history', 'human-resources', 'employee-details', 'job-details', 'department-details', 'sales', 'new-sale', 'sales-details', 'record-payment'],
  User: ['user-dashboard', 'customers', 'customer-details', 'products', 'product-details', 'price-history', 'sales', 'new-sale', 'sales-details', 'record-payment']
};

const db = {
  authUser: null, userProfile: null, currentRole: 'User',
  settings: { orgName: 'Hope, Inc.', sessionTimeout: '30 minutes', recordEntry: 'Manual entry only', defaultRole: 'User', showStatusStamp: true, retainDeleted: true },
  customers: [], products: [], priceHistory: [], employees: [], jobs: [], departments: [], sales: [], saleItems: [], payments: [], accounts: [], permissions: {}, activityLog: [],
  userGrantedModules: ['dashboard', 'customers', 'products', 'sales', 'reports']
};

function getDashboardForRole(role) {
  if (role === 'Superadmin') return 'superadmin-dashboard.html';
  if (role === 'Admin') return 'admin-dashboard.html';
  return 'user-dashboard.html';
}

function loadLocalSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    if (saved) {
      if (saved.settings) db.settings = { ...db.settings, ...saved.settings };
      if (saved.activityLog) db.activityLog = saved.activityLog;
    }
  } catch (e) {}
}

function saveLocalSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({ settings: db.settings, activityLog: db.activityLog.slice(0, 20) }));
}

function addLog(action, detail) {
  db.activityLog.unshift({ time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), action, detail });
  saveLocalSettings();
}

function shortId(uuid, prefix) {
  if (!uuid) return '—';
  return `${prefix}-${String(uuid).slice(0, 6).toUpperCase()}`;
}

function formatStampTimestamp(isoStr) {
  if (!isoStr) return '2026-10-01 10:00 AM';
  const d = new Date(isoStr);
  if (isNaN(d.getTime())) return isoStr;
  const datePart = d.toISOString().slice(0, 10);
  const timePart = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  return `${datePart} ${timePart}`;
}

function esc(v) {
  return String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function showToast(msg) {
  const existing = document.querySelector('.toast-banner');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.className = 'toast-banner';
  el.innerHTML = `<span>✓</span><span>${esc(msg)}</span>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

function paginate(arr, page) {
  const totalPages = Math.max(1, Math.ceil(arr.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  return { slice: arr.slice(start, start + PAGE_SIZE), totalPages, currentPage: safePage, totalRecords: arr.length };
}

function publicHeader() {
  return `
    <header class="public-topbar">
      <a href="index.html" class="brand"><span class="brandmark">H</span> Hope, Inc. ERP</a>
      <div class="top-actions">
        <a href="login.html" class="btn-secondary">Sign In</a>
        <a href="register.html" class="btn-primary">Register</a>
      </div>
    </header>
  `;
}

function authAside() {
  return `
    <aside class="auth-aside">
      <a href="index.html" class="brand"><span class="brandmark">H</span> Hope, Inc.</a>
      <div class="aside-copy">
        <div class="eyebrow">ERP Management System</div>
        <h1>One workspace.<br>A clearer way<br>to manage.</h1>
        <p>Bring your records, people, and operations together. Built around the way your team works.</p>
      </div>
      <div class="aside-bottom">🔒 Private workspace · Role-based access control</div>
    </aside>
  `;
}

function renderLandingPage() {
  document.body.classList.add('public-page');
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${publicHeader()}
    <section class="landing">
      <div class="hero">
        <div>
          <div class="eyebrow">ENTERPRISE RESOURCE PLANNING</div>
          <h1>Run your entire business <span>with confidence</span></h1>
          <p>Hope, Inc. ERP unifies Customer Management, Product Catalog, Human Resources, and Sales into one connected platform with dedicated workspaces for Users, Admins, and Superadmins.</p>
          <div class="hero-actions">
            <a href="login.html" class="btn-primary" style="padding:11px 20px; font-size:14px;">Sign In to Workspace →</a>
            <a href="register.html" class="btn-secondary" style="padding:11px 20px; font-size:14px;">Create an Account</a>
          </div>
        </div>
        <div class="mock-window">
          <div class="mock-head">● ● ● &nbsp; Hope, Inc. ERP Workspace</div>
          <div class="mock-grid">
            ${[['👥 Customers', 'Manage client records & history'], ['📦 Products', 'Catalog SKUs & unit pricing'], ['🪪 Human Resources', 'Employees, jobs & departments'], ['🧾 Sales & Reports', 'Line items, payments & balances']].map(x => `<div class="mock-tile"><b>${x[0]}</b><p class="small-muted">${x[1]}</p></div>`).join('')}
          </div>
        </div>
      </div>
      <section class="modules">
        <h2>Everything you need to grow</h2>
        <p>Core modules. Three role-specific workspaces. One unified database.</p>
        <div class="module-grid">
          ${[['👥', 'Customer Management', 'Track leads, accounts, contacts, and restore deleted records safely.'], ['📦', 'Product Management', 'Maintain product catalog, SKUs, unit pricing, and effective price logs.'], ['🪪', 'Human Resources', 'Employee directory, hiring status, job codes, and departments.'], ['🧾', 'Sales & Payments', 'Create line-item sales orders, record payments, and track balances.']].map(m => `<div class="module-card"><div class="module-icon">${m[0]}</div><b>${m[1]}</b><p class="text-xs" style="color:var(--text-secondary); margin-top:6px;">${m[2]}</p></div>`).join('')}
        </div>
      </section>
    </section>
    <footer class="public-footer">© 2026 Hope, Inc. ERP System · All rights reserved</footer>
  `;
}

function renderAuthPage(mode) {
  document.body.classList.add('public-page');
  const app = document.getElementById('app');
  if (!app) return;

  const configs = {
    login: ['WELCOME TO HOPE', 'Sign in to your workspace', 'Enter your credentials to access your role dashboard.'],
    register: ['CREATE AN ACCOUNT', 'Create an account', 'Join Hope, Inc. ERP. Instant workspace access upon registration.'],
    forgot: ['ACCOUNT RECOVERY', 'Reset your password', 'Enter your account email to receive a reset link, or contact your Superadmin for an instant reset.']
  };
  const c = configs[mode];

  app.innerHTML = `
    <div class="auth-layout">
      ${authAside()}
      <section class="auth-main">
        <form class="auth-form" id="authForm">
          <div class="eyebrow">${c[0]}</div>
          <h2>${c[1]}</h2>
          <p>${c[2]}</p>
          ${mode === 'register' ? `<div class="field"><label>First name *</label><input name="first_name" required /></div><div class="field"><label>Last name *</label><input name="last_name" required /></div>` : ''}
          <div class="field"><label>Email address *</label><input name="email" type="email" required /></div>
          ${mode !== 'forgot' ? `
            <div class="field">
              <label>Password *</label>
              <div class="password-wrapper">
                <input name="password" id="passwordInput" type="password" minlength="6" required />
                <button type="button" id="togglePassword" class="toggle-eye" title="Show/Hide Password">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>
              </div>
            </div>
          ` : ''}
          ${mode === 'login' ? `
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; color:var(--text-secondary); margin-top:6px;">
              <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="checkbox" /> Remember me</label>
              <a href="forgot-password.html" style="color:var(--accent-green); text-decoration:none; font-weight:600;">Forgot password?</a>
            </div>
          ` : ''}
          <button class="wide" type="submit" id="authSubmitBtn">${mode === 'login' ? 'Sign in →' : mode === 'register' ? 'Create Account →' : 'Send Reset Link →'}</button>
          <div id="authFeedback" class="form-error"></div>
          <div class="auth-links">
            ${mode === 'login' ? `Don't have an account? <a href="register.html">Register</a>` : mode === 'register' ? `Already have an account? <a href="login.html">Sign in</a>` : `<a href="login.html">← Back to sign in</a>`}
          </div>
          <div class="auth-note">🔒 Connected to Supabase Auth · Instant registration & role-based routing.</div>
          <div class="auth-foot"><a href="index.html" style="color:inherit; text-decoration:none;">← Return to Hope, Inc. Home</a></div>
        </form>
      </section>
    </div>
  `;

  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('passwordInput');
  if (togglePassword && passwordInput) {
    togglePassword.onclick = () => { passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password'; };
  }

  document.getElementById('authForm').onsubmit = async (e) => {
    e.preventDefault();
    const feedback = document.getElementById('authFeedback');
    const btn = document.getElementById('authSubmitBtn');
    feedback.className = 'form-error';
    feedback.textContent = '';
    if (!sb) { feedback.textContent = 'Supabase client is not initialized.'; return; }

    const f = new FormData(e.target);
    const email = String(f.get('email') || '').trim();
    const password = String(f.get('password') || '');

    btn.disabled = true;
    try {
      if (mode === 'register') {
        const first = String(f.get('first_name') || '').trim();
        const last = String(f.get('last_name') || '').trim();
        const displayName = `${first} ${last}`.trim();
        const redirectDashboard = window.location.origin + window.location.pathname.replace('register.html', 'user-dashboard.html');

        const { data, error } = await sb.auth.signUp({
          email, password,
          options: { emailRedirectTo: redirectDashboard, data: { first_name: first, last_name: last, display_name: displayName } }
        });
        if (error) throw error;

        if (data?.user) {
          await sb.from('user_profiles').upsert({ id: data.user.id, email, display_name: displayName, role: 'User', status: 'Active' }, { onConflict: 'id' });
        }
        if (data?.session) { window.location.href = 'user-dashboard.html'; return; }

        const { data: loginData, error: loginErr } = await sb.auth.signInWithPassword({ email, password });
        if (!loginErr && loginData?.session) { window.location.href = 'user-dashboard.html'; return; }

        feedback.className = 'form-success';
        feedback.textContent = 'Registration successful! Please check your email inbox and click the confirmation link before signing in.';
        e.target.reset();
      } else if (mode === 'login') {
        const { data, error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;

        const user = data.user;
        let { data: prof } = await sb.from('user_profiles').select('*').eq('id', user.id).single();

        if (!prof) {
          const fallbackName = user.user_metadata?.display_name || email.split('@')[0];
          const { data: createdProf } = await sb.from('user_profiles').upsert({ id: user.id, email: user.email, display_name: fallbackName, role: 'User', status: 'Active' }, { onConflict: 'id' }).select().single();
          prof = createdProf || { role: 'User', status: 'Active' };
        }

        if (prof.status === 'Blocked' || prof.status === 'Deleted') {
          await sb.auth.signOut();
          throw new Error('Your account has been suspended or blocked. Contact Superadmin.');
        }
        window.location.href = getDashboardForRole(prof.role || 'User');
      } else {
        const redirectUrl = window.location.origin + window.location.pathname.replace('forgot-password.html', 'login.html');
        const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl });
        if (error) throw error;
        feedback.className = 'form-success';
        feedback.textContent = 'Password reset link sent! Check your email inbox.';
      }
    } catch (err) {
      feedback.textContent = err.message || 'Authentication failed.';
    } finally {
      btn.disabled = false;
    }
  };
}

async function authenticateWorkspace(page) {
  if (!sb) { window.location.href = 'login.html'; return false; }
  const { data: { session } } = await sb.auth.getSession();
  if (!session || !session.user) { window.location.href = 'login.html'; return false; }

  db.authUser = session.user;
  let { data: prof } = await sb.from('user_profiles').select('*').eq('id', session.user.id).single();

  if (!prof) {
    const fallbackName = session.user.user_metadata?.display_name || session.user.email.split('@')[0];
    const { data: inserted } = await sb.from('user_profiles').upsert({ id: session.user.id, email: session.user.email, display_name: fallbackName, role: 'User', status: 'Active' }, { onConflict: 'id' }).select().single();
    prof = inserted || { id: session.user.id, email: session.user.email, display_name: fallbackName, role: 'User', status: 'Active' };
  }

  if (prof.status === 'Blocked' || prof.status === 'Deleted') {
    await sb.auth.signOut();
    window.location.href = 'login.html';
    return false;
  }

  db.userProfile = prof;
  db.currentRole = prof.role || 'User';

  const allowedPages = ROLE_ALLOWED_PAGES[db.currentRole] || ROLE_ALLOWED_PAGES.User;
  if (!allowedPages.includes(page)) {
    window.location.href = getDashboardForRole(db.currentRole);
    return false;
  }

  if (db.currentRole === 'User') {
    const mods = new Set(['dashboard', 'customers', 'products', 'sales', 'reports']);
    const p = prof.permissions;
    if (p && typeof p === 'object') {
      if (p.customer_mgmt && Object.values(p.customer_mgmt).every(v => v === false)) mods.delete('customers');
      if (p.product_mgmt && Object.values(p.product_mgmt).every(v => v === false)) mods.delete('products');
    }
    db.userGrantedModules = Array.from(mods);
  }
  return true;
}

async function signOutUser() {
  if (sb) await sb.auth.signOut();
  window.location.href = 'index.html';
}

function hasRight(groupKey, rightLabel) {
  if (db.currentRole === 'Superadmin' || db.currentRole === 'Admin') return true;
  const restrictedCustomerRights = ['Edit Sale', 'Delete Sale', 'Edit Sale Detail', 'Delete Sale Detail'];
  if (db.currentRole === 'User' && restrictedCustomerRights.includes(rightLabel)) return false;

  const perms = db.userProfile?.permissions;
  if (!perms || Object.keys(perms).length === 0) return true;
  return Boolean(perms[groupKey]?.[rightLabel]);
}

async function syncFromSupabase() {
  if (!sb) return;
  try {
    const [
      { data: custs }, { data: prods }, { data: ph }, { data: depts },
      { data: jobs }, { data: emps }, { data: sales }, { data: items },
      { data: pays }, { data: profs }
    ] = await Promise.all([
      sb.from('customers').select('*').order('created_at', { ascending: false }),
      sb.from('products').select('*').order('created_at', { ascending: false }),
      sb.from('price_history').select('*').order('created_at', { ascending: false }),
      sb.from('departments').select('*').order('created_at', { ascending: true }),
      sb.from('jobs').select('*').order('created_at', { ascending: true }),
      sb.from('employees').select('*').order('created_at', { ascending: false }),
      sb.from('sales').select('*').order('created_at', { ascending: true }),
      sb.from('sale_items').select('*'),
      sb.from('payments').select('*').order('created_at', { ascending: false }),
      sb.from('user_profiles').select('*').order('created_at', { ascending: false })
    ]);

    db.customers = (custs || []).map((c, idx) => ({
      id: c.id, code: `C-${String(idx + 1).padStart(3, '0')}`, name: c.customer_name, company: c.company_name,
      email: c.email, phone: c.phone, street: c.street_address, city: c.city, state: c.province, postal: c.postal_code,
      notes: c.notes, status: c.is_deleted ? 'Deleted' : (c.status || 'Active'), deletedOn: c.is_deleted ? (c.created_at || '').slice(0, 10) : null
    }));

    db.products = (prods || []).map(p => ({
      id: p.id, code: shortId(p.id, 'PROD'), name: p.product_name, sku: p.sku, category: p.category,
      unitMeasure: p.unit, unitPrice: Number(p.unit_price || 0), effectiveDate: p.effective_date || (p.created_at || '').slice(0, 10), description: p.description
    }));

    db.priceHistory = (ph || []).map(h => {
      const diff = Number(h.new_price) - Number(h.previous_price || 0);
      const pct = h.previous_price > 0 ? ` (${diff >= 0 ? '+' : ''}${((diff / h.previous_price) * 100).toFixed(1)}%)` : '';
      return {
        id: h.id, productId: h.product_id, effectiveDate: h.effective_date, prevPrice: Number(h.previous_price || 0),
        newPrice: Number(h.new_price || 0), change: `${diff >= 0 ? '+' : ''}₱${Math.abs(diff).toFixed(2)}${pct}`, changedBy: h.changed_by || 'Admin'
      };
    });

    db.departments = (depts || []).map((d, idx) => ({
      id: d.id, code: `DEP-${String(idx + 1).padStart(3, '0')}`, name: d.department_name, description: d.description || 'Organizational department', status: d.status || 'Active', stamp: (d.created_at || '').slice(0, 10)
    }));

    db.jobs = (jobs || []).map((j, idx) => ({
      id: j.id, code: `JOB-${String(idx + 1).padStart(3, '0')}`, title: j.job_title, departmentId: j.department_id, description: j.description || j.job_title, status: j.status || 'Active', stamp: (j.created_at || '').slice(0, 10)
    }));

    db.employees = (emps || []).map((e, idx) => ({
      id: e.id, code: `E-${String(idx + 1).padStart(3, '0')}`, firstName: e.first_name, lastName: e.last_name, email: e.email, phone: e.phone,
      gender: e.gender, birthDate: e.birth_date, hireDate: e.hire_date, sepDate: e.sep_date, departmentId: e.department_id, jobId: e.job_id, status: e.status || 'Active', stamp: (e.created_at || '').slice(0, 10)
    }));

    db.saleItems = items || [];
    db.sales = (sales || []).map((s, idx) => {
      const sItems = db.saleItems.filter(i => i.sale_id === s.id).map(i => {
        const prod = db.products.find(p => p.id === i.product_id);
        return { productId: i.product_id, productName: prod ? prod.name : 'Product', qty: Number(i.quantity), unitPrice: Number(i.unit_price), total: Number(i.line_total) };
      });
      const isInactive = s.status === 'Inactive' || s.is_deleted === true;
      return {
        id: s.id, code: `T-${String(idx + 1).padStart(3, '0')}`, customerId: s.customer_id, employeeId: s.employee_id || null,
        date: s.sale_date, items: sItems, total: Number(s.total_amount || 0), balance: Number(s.balance || 0),
        paymentStatus: s.payment_status, status: isInactive ? 'Inactive' : 'Active',
        stampAction: s.updated_at && s.updated_at !== s.created_at ? 'EDITED' : 'CREATED',
        stampBy: s.updated_by || s.created_by || 'system',
        stampTime: formatStampTimestamp(s.updated_at || s.created_at)
      };
    });

    db.payments = (pays || []).map(p => ({
      id: p.id, code: shortId(p.id, 'PAY'), saleId: p.sale_id, date: p.payment_date, method: p.method, reference: p.reference, amount: Number(p.amount || 0), notes: p.notes
    }));

    db.accounts = (profs || []).map(u => {
      const parts = (u.display_name || '').split(' ');
      if (u.permissions) db.permissions[u.id] = u.permissions;
      return {
        id: u.id, code: shortId(u.id, 'ACC'), firstName: parts[0] || u.display_name || 'User', lastName: parts.slice(1).join(' '),
        username: u.display_name || u.email, email: u.email, role: u.role || 'User', status: u.status || 'Active', stamp: (u.created_at || '').slice(0, 10)
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
  if (modId === 'sales') return db.sales.filter(s => s.status === 'Active').length;
  if (modId === 'reports') return db.payments.length;
  if (modId === 'users') return db.accounts.filter(a => a.status !== 'Deleted').length;
  return 0;
}

function renderModuleDirectory(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const role = db.currentRole;

  let visibleModules = SYSTEM_MODULES;
  if (role === 'User') visibleModules = SYSTEM_MODULES.filter(m => db.userGrantedModules.includes(m.id));
  else if (role === 'Admin') visibleModules = SYSTEM_MODULES.filter(m => m.id !== 'users');

  container.innerHTML = visibleModules.map(m => `
    <div class="module-card">
      <div>
        <div class="flex items-center justify-between mb-2">
          <a href="${m.href}" class="flex items-center gap-2 font-bold text-sm text-inherit no-underline hover:underline">
            <span>${m.icon}</span><span>${m.title}</span>
          </a>
          <span class="badge-count">${getModuleCount(m.id)} records</span>
        </div>
        <p class="text-xs mb-3 leading-relaxed" style="color:var(--text-secondary);">${m.summary}</p>
      </div>
      <div class="flex flex-wrap gap-1.5 pt-2 border-t" style="border-color:var(--border-color);">
        ${m.subpages.map(sp => `<a href="${sp.href}" class="btn-secondary text-[11px] py-1 px-2.5">${sp.label}</a>`).join('')}
      </div>
    </div>
  `).join('');
}

function initShell(activeNav, breadcrumbText) {
  const role = db.currentRole;
  const dashHref = getDashboardForRole(role);
  const userName = db.userProfile?.display_name || db.authUser?.email || role;

  document.querySelectorAll('.org-name-display').forEach(el => el.textContent = db.settings.orgName);
  const bc = document.getElementById('topbar-breadcrumb');
  if (bc) bc.textContent = breadcrumbText;

  document.querySelectorAll('a.btn-secondary').forEach(link => {
    if (link.textContent.trim().toLowerCase() === '← back to dashboard') link.href = dashHref;
  });

  const roleSelect = document.getElementById('role-switcher');
  if (roleSelect) {
    if (role === 'Superadmin') {
      roleSelect.value = 'Superadmin';
      roleSelect.onchange = (e) => { window.location.href = getDashboardForRole(e.target.value); };
    } else {
      const badge = document.createElement('span');
      badge.className = 'badge-count';
      badge.textContent = `${role} · ${userName}`;
      roleSelect.replaceWith(badge);
    }
  }

  const sidebar = document.querySelector('aside.sidebar');
  if (sidebar) {
    const workspaceItems = [
      { id: 'dashboard', label: 'Dashboard', icon: ICONS.dashboard, href: dashHref },
      { id: 'customers', label: 'Customers', icon: ICONS.customers, href: 'customers.html' },
      { id: 'products', label: 'Products', icon: ICONS.products, href: 'products.html' },
      { id: 'hr', label: 'Human Resources', icon: ICONS.hr, href: 'human-resources.html' },
      { id: 'sales', label: 'Sales', icon: ICONS.sales, href: 'sales.html' },
      { id: 'reports', label: 'Reports', icon: ICONS.reports, href: 'sales-details.html' }
    ];

    const adminItems = [
      { id: 'users', label: 'User Management', icon: ICONS.users, href: 'roles-access.html' },
      { id: 'deleted', label: 'Deleted Records', icon: ICONS.deleted, href: 'customers.html?tab=Deleted' },
      { id: 'settings', label: 'System Settings', icon: ICONS.settings, href: 'superadmin-dashboard.html#settings' }
    ];

    const isUser = role === 'User';
    const isAdmin = role === 'Admin';
    const visibleWorkspace = isUser ? workspaceItems.filter(i => db.userGrantedModules.includes(i.id)) : workspaceItems;

    sidebar.innerHTML = `
      <div>
        <div class="brand-box">
          <div class="brand-logo">H</div>
          <div>
            <div class="brand-title org-name-display">${esc(db.settings.orgName)}</div>
            <div class="brand-subtitle">${role.toUpperCase()} WORKSPACE</div>
          </div>
        </div>
        <div class="nav-section-label">WORKSPACE</div>
        <nav>
          ${visibleWorkspace.map(item => `<a href="${item.href}" class="nav-item ${activeNav === item.id ? 'active' : ''}"><span class="flex items-center gap-3">${item.icon}<span>${item.label}</span></span></a>`).join('')}
        </nav>
        ${!isUser ? `
          <div class="nav-section-label" style="margin-top: 22px;">ADMINISTRATION</div>
          <nav>
            ${adminItems.map(item => {
              if (isAdmin && (item.id === 'users' || item.id === 'settings')) return '';
              return `<a href="${item.href}" class="nav-item ${activeNav === item.id ? 'active' : ''}"><span class="flex items-center gap-3">${item.icon}<span>${item.label}</span></span></a>`;
            }).join('')}
          </nav>
        ` : ''}
      </div>
      <div class="sidebar-footer">
        <div class="text-xs font-semibold text-white mb-0.5 truncate">${esc(userName)}</div>
        <div class="text-[11px] opacity-70 mb-3">Signed in as ${esc(role)}</div>
        <button type="button" id="btn-sidebar-signout" class="nav-item text-xs p-1.5" style="background:rgba(255,255,255,0.08);">
          <span class="flex items-center gap-2.5">${ICONS.signout}<span>Sign out</span></span>
        </button>
      </div>
    `;
    const signoutBtn = document.getElementById('btn-sidebar-signout');
    if (signoutBtn) signoutBtn.onclick = signOutUser;
  }
}

function openEditSaleModal(sale, onSavedCallback) {
  const canEdit = db.currentRole === 'Admin' || db.currentRole === 'Superadmin' || hasRight('sales_mgmt', 'Edit Sale');
  if (!canEdit) { showToast('Access denied: Customers cannot edit sales.'); return; }

  let modalItems = sale.items.map(i => ({ ...i }));
  const custOptions = db.customers.filter(c => c.status === 'Active' || c.id === sale.customerId).map(c => `<option value="${c.id}" ${c.id === sale.customerId ? 'selected' : ''}>${c.code} — ${esc(c.name)}</option>`).join('');
  const empOptions = `<option value="">Unassigned</option>` + db.employees.map(e => `<option value="${e.id}" ${e.id === sale.employeeId ? 'selected' : ''}>${e.code} — ${esc(e.firstName)} ${esc(e.lastName)}</option>`).join('');
  const prodOptions = `<option value="">Select product to add</option>` + db.products.map(p => `<option value="${p.id}" data-price="${p.unitPrice}">${esc(p.name)} (₱${Number(p.unitPrice).toFixed(2)})</option>`).join('');

  document.getElementById('modal-root').innerHTML = `
    <div class="modal-backdrop" onclick="this.remove()">
      <div class="modal-card" style="max-width:660px; width:95%;" onclick="event.stopPropagation()">
        <div class="flex justify-between items-start mb-4 pb-3 border-b" style="border-color:var(--border-color);">
          <div><h3 class="text-lg font-bold">Edit Sale — ${esc(sale.code)}</h3><p class="text-xs" style="color:var(--text-secondary);">Admin & Superadmin access only.</p></div>
          <button type="button" class="text-sm px-2 py-1" onclick="document.getElementById('modal-root').innerHTML=''">✕</button>
        </div>
        <form id="modal-edit-sale-form">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
            <div><label class="form-label">Customer *</label><select id="m-sale-cust" required class="form-input">${custOptions}</select></div>
            <div><label class="form-label">Sales Date *</label><input type="date" id="m-sale-date" value="${sale.date}" required class="form-input" /></div>
            <div><label class="form-label">Employee</label><select id="m-sale-emp" class="form-input">${empOptions}</select></div>
            <div><label class="form-label">Status</label><select id="m-sale-status" class="form-input"><option value="Active" ${sale.status === 'Active' ? 'selected' : ''}>Active</option><option value="Inactive" ${sale.status === 'Inactive' ? 'selected' : ''}>Inactive</option></select></div>
          </div>
          <div class="mb-3">
            <label class="form-label">Line Items</label>
            <div class="border rounded-lg overflow-hidden mb-2" style="border-color:var(--border-color);">
              <table class="erp-table"><thead><tr><th>Product</th><th>Qty</th><th>Unit Price</th><th>Total</th><th>Action</th></tr></thead><tbody id="m-sale-items-tbody"></tbody></table>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end">
              <div class="sm:col-span-2"><select id="m-add-prod" class="form-input text-xs">${prodOptions}</select></div>
              <div><input type="number" id="m-add-qty" min="1" placeholder="Qty" class="form-input text-xs" /></div>
              <div><button type="button" id="m-btn-add-item" class="btn-secondary w-full justify-center text-xs">+ Add Item</button></div>
            </div>
          </div>
          <div class="flex justify-between items-center pt-3 border-t" style="border-color:var(--border-color);">
            <div class="text-sm font-bold">Updated Total: ₱<span id="m-sale-total">0.00</span></div>
            <div class="flex gap-2">
              <button type="button" class="btn-secondary text-xs" onclick="document.getElementById('modal-root').innerHTML=''">Cancel</button>
              <button type="submit" class="btn-primary text-xs">✓ Save Changes</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  HopeCalendar.enhance(document.getElementById('modal-root'));

  function renderModalItems() {
    const tbody = document.getElementById('m-sale-items-tbody');
    tbody.innerHTML = modalItems.length === 0
      ? `<tr><td colspan="5" class="text-center text-xs py-4">No line items. Add at least one item.</td></tr>`
      : modalItems.map((it, idx) => `
        <tr>
          <td class="font-semibold">${esc(it.productName)}</td>
          <td><input type="number" min="1" value="${it.qty}" data-idx="${idx}" class="m-item-qty form-input py-1 px-2 text-xs" style="width:70px;" /></td>
          <td>₱${Number(it.unitPrice).toFixed(2)}</td>
          <td class="font-semibold">₱${Number(it.total).toFixed(2)}</td>
          <td><button type="button" data-idx="${idx}" class="m-item-del text-xs text-red-600 hover:underline">Remove</button></td>
        </tr>`).join('');

    const newTotal = modalItems.reduce((sum, x) => sum + Number(x.total), 0);
    document.getElementById('m-sale-total').textContent = newTotal.toFixed(2);

    tbody.querySelectorAll('.m-item-qty').forEach(inp => {
      inp.onchange = (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        const q = Math.max(1, parseFloat(e.target.value) || 1);
        modalItems[idx].qty = q;
        modalItems[idx].total = q * modalItems[idx].unitPrice;
        renderModalItems();
      };
    });

    tbody.querySelectorAll('.m-item-del').forEach(btn => {
      btn.onclick = (e) => { modalItems.splice(parseInt(e.target.dataset.idx, 10), 1); renderModalItems(); };
    });
  }

  document.getElementById('m-btn-add-item').onclick = () => {
    const pSel = document.getElementById('m-add-prod');
    const pid = pSel.value;
    const qty = parseFloat(document.getElementById('m-add-qty').value) || 1;
    if (!pid) return showToast('Select a product first.');
    const prod = db.products.find(p => p.id === pid);
    if (!prod) return;
    modalItems.push({ productId: pid, productName: prod.name, qty, unitPrice: Number(prod.unitPrice), total: qty * Number(prod.unitPrice) });
    pSel.value = ''; document.getElementById('m-add-qty').value = '';
    renderModalItems();
  };

  document.getElementById('modal-edit-sale-form').onsubmit = async (e) => {
    e.preventDefault();
    if (modalItems.length === 0) return showToast('A sale must have at least one line item.');

    const updatedCustId = document.getElementById('m-sale-cust').value || null;
    const updatedEmpId = document.getElementById('m-sale-emp').value || null;
    const updatedDate = HopeCalendar.getISO('m-sale-date') || sale.date;
    const updatedStatusVal = document.getElementById('m-sale-status').value;
    const updatedTotal = modalItems.reduce((sum, x) => sum + Number(x.total), 0);
    const paidSoFar = db.payments.filter(p => p.saleId === sale.id).reduce((sum, p) => sum + Number(p.amount), 0);
    const updatedBalance = Math.max(0, updatedTotal - paidSoFar);
    const updatedPayStatus = updatedBalance === 0 ? 'Paid' : paidSoFar > 0 ? 'Partial' : 'Unpaid';
    const editorName = db.userProfile?.display_name || db.currentRole;

    const { error: saleErr } = await sb.from('sales').update({
      customer_id: updatedCustId, sale_date: updatedDate, total_amount: updatedTotal, balance: updatedBalance, payment_status: updatedPayStatus
    }).eq('id', sale.id);

    if (saleErr) return showToast('Error updating sale: ' + saleErr.message);

    await sb.from('sales').update({ employee_id: updatedEmpId, status: updatedStatusVal, updated_by: editorName, updated_at: new Date().toISOString() }).eq('id', sale.id);
    await sb.from('sale_items').delete().eq('sale_id', sale.id);
    await sb.from('sale_items').insert(modalItems.map(i => ({ sale_id: sale.id, product_id: i.productId, quantity: i.qty, unit_price: i.unitPrice, line_total: i.total })));

    addLog('Sale edited', `${sale.code} (₱${updatedTotal.toFixed(2)})`);
    document.getElementById('modal-root').innerHTML = '';
    await syncFromSupabase();
    if (typeof onSavedCallback === 'function') onSavedCallback();
    showToast('Sale updated successfully.');
  };

  renderModalItems();
}

// =========================================================
// MAIN APPLICATION BOOTSTRAP
// =========================================================
document.addEventListener('DOMContentLoaded', async () => {
  loadLocalSettings();
  const page = document.body.dataset.page || 'landing';

  if (page === 'landing') { renderLandingPage(); return; }
  if (['login', 'register', 'forgot'].includes(page)) { renderAuthPage(page); return; }

  const authorized = await authenticateWorkspace(page);
  if (!authorized) return;

  await syncFromSupabase();
  HopeCalendar.enhance(document);

  // =========================================================
  // USER DASHBOARD
  // =========================================================
  if (page === 'user-dashboard') {
    initShell('dashboard', 'User Dashboard');
    renderModuleDirectory('user-modules-grid');
    const userName = db.userProfile?.display_name || 'Team Member';
    document.getElementById('user-dash-heading').textContent = `Welcome, ${userName}`;
    document.getElementById('u-kpi-customers').textContent = db.customers.filter(c => c.status === 'Active').length;
    document.getElementById('u-kpi-products').textContent = db.products.length;
    document.getElementById('u-kpi-sales').textContent = db.sales.filter(s => s.status === 'Active').length;

    document.querySelectorAll('[data-mod]').forEach(el => {
      if (!db.userGrantedModules.includes(el.dataset.mod)) el.style.display = 'none';
    });

    document.getElementById('btn-user-add-new').onclick = () => {
      const links = [];
      if (db.userGrantedModules.includes('customers') && hasRight('customer_mgmt', 'Add Customer')) {
        links.push(`<a href="customer-details.html" class="btn-secondary justify-between"><span>+ New Customer</span><span>→</span></a>`);
      }
      if (db.userGrantedModules.includes('products') && hasRight('product_mgmt', 'Add Product')) {
        links.push(`<a href="product-details.html" class="btn-secondary justify-between"><span>+ New Product</span><span>→</span></a>`);
      }
      if (db.userGrantedModules.includes('sales') && hasRight('sales_mgmt', 'Add Sale')) {
        links.push(`<a href="new-sale.html" class="btn-secondary justify-between"><span>+ New Sale</span><span>→</span></a>`);
      }

      document.getElementById('modal-root').innerHTML = `
        <div class="modal-backdrop" onclick="this.remove()">
          <div class="modal-card" onclick="event.stopPropagation()">
            <div class="flex justify-between items-center mb-3"><h3 class="text-base font-bold">Quick Entry</h3><button onclick="document.getElementById('modal-root').innerHTML=''">✕</button></div>
            <p class="text-xs mb-4" style="color:var(--text-secondary);">Select an action permitted for your account:</p>
            <div class="grid gap-2">${links.length ? links.join('') : '<div class="text-xs">No creation rights assigned to your account.</div>'}</div>
          </div>
        </div>`;
    };
  }

  // =========================================================
  // ADMIN DASHBOARD
  // =========================================================
  if (page === 'admin-dashboard') {
    initShell('dashboard', 'Admin Dashboard');
    renderModuleDirectory('admin-modules-grid');
    document.getElementById('kpi-customers').textContent = db.customers.filter(c => c.status === 'Active').length;
    document.getElementById('kpi-products').textContent = db.products.length;
    document.getElementById('kpi-employees').textContent = db.employees.filter(e => e.status === 'Active').length;
    document.getElementById('kpi-sales').textContent = db.sales.filter(s => s.status === 'Active').length;

    if (db.sales.length > 0) {
      document.getElementById('sales-overview-body').innerHTML = db.sales.slice(0, 4).map(s => {
        const cust = db.customers.find(c => c.id === s.customerId);
        return `<div class="flex justify-between text-xs py-2 border-b text-left" style="border-color:var(--border-color);"><span><strong>${s.code}</strong> · ${cust ? esc(cust.name) : 'Customer'} (${HopeCalendar.formatDisplay(s.date)})</span><strong>₱${Number(s.total).toFixed(2)}</strong></div>`;
      }).join('');
    }
    if (db.products.length > 0) {
      document.getElementById('product-activity-body').innerHTML = db.products.slice(0, 4).map(p =>
        `<div class="flex justify-between text-xs py-2 border-b text-left" style="border-color:var(--border-color);"><span><strong>${esc(p.name)}</strong> (${esc(p.sku || p.code)})</span><strong>₱${Number(p.unitPrice).toFixed(2)}</strong></div>`
      ).join('');
    }
    document.getElementById('activity-count').textContent = `${db.activityLog.length} entries`;
    if (db.activityLog.length > 0) {
      document.getElementById('recent-activity-list').innerHTML = db.activityLog.slice(0, 5).map(a =>
        `<div class="flex justify-between text-xs py-2 border-b text-left" style="border-color:var(--border-color);"><span><strong>${esc(a.action)}:</strong> ${esc(a.detail)}</span><span style="color:var(--text-muted);">${a.time}</span></div>`
      ).join('');
    }

    document.getElementById('btn-add-new').onclick = () => {
      document.getElementById('modal-root').innerHTML = `
        <div class="modal-backdrop" onclick="this.remove()">
          <div class="modal-card" onclick="event.stopPropagation()">
            <div class="flex justify-between items-center mb-3"><h3 class="text-base font-bold">Add New Record</h3><button onclick="document.getElementById('modal-root').innerHTML=''">✕</button></div>
            <p class="text-xs mb-4" style="color:var(--text-secondary);">Choose a module to create a manual record:</p>
            <div class="grid gap-2">
              <a href="customer-details.html" class="btn-secondary justify-between"><span>Customer</span><span>→</span></a>
              <a href="product-details.html" class="btn-secondary justify-between"><span>Product</span><span>→</span></a>
              <a href="human-resources.html?tab=employees" class="btn-secondary justify-between"><span>Employee (HR)</span><span>→</span></a>
              <a href="new-sale.html" class="btn-secondary justify-between"><span>New Sale</span><span>→</span></a>
            </div>
          </div>
        </div>`;
    };
  }

  // =========================================================
  // SUPERADMIN DASHBOARD
  // =========================================================
  if (page === 'superadmin-dashboard') {
    initShell('dashboard', 'Superadmin Dashboard');
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
            <td>${a.code}</td><td class="font-semibold">${esc(a.username)}</td><td>${esc(a.email || '—')}</td>
            <td><span class="badge-count">${esc(a.role)}</span></td>
            <td style="display:${db.settings.showStatusStamp ? '' : 'none'}">${esc(a.status)}</td>
            <td style="display:${db.settings.showStatusStamp ? '' : 'none'}">${esc(a.stamp)}</td>
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
      initShell('dashboard', 'Superadmin Dashboard');
      renderSA();
      showToast('System settings saved.');
    };
    renderSA();
  }

  // =========================================================
  // SALES REGISTER (sales.html — Customer View-Only, Admin/Superadmin Edit/Delete)
  // =========================================================
  if (page === 'sales') {
    initShell('sales', 'Sales');
    let statusTab = 'Active';
    let currentPage = 1;

    const canEditOrDelete = db.currentRole === 'Admin' || db.currentRole === 'Superadmin';

    function renderSalesList() {
      const activeSales = db.sales.filter(s => s.status === 'Active');
      const inactiveSales = db.sales.filter(s => s.status === 'Inactive');

      document.getElementById('tab-sales-active').textContent = `Active (${activeSales.length})`;
      document.getElementById('tab-sales-inactive').textContent = `Inactive (${inactiveSales.length})`;
      document.getElementById('tab-sales-all').textContent = `All (${db.sales.length})`;

      document.getElementById('tab-sales-active').classList.toggle('active', statusTab === 'Active');
      document.getElementById('tab-sales-inactive').classList.toggle('active', statusTab === 'Inactive');
      document.getElementById('tab-sales-all').classList.toggle('active', statusTab === 'All');

      const q = document.getElementById('sales-search').value.toLowerCase();
      let base = db.sales;
      if (statusTab === 'Active') base = activeSales;
      else if (statusTab === 'Inactive') base = inactiveSales;

      const filtered = base.filter(s => {
        const cust = db.customers.find(c => c.id === s.customerId);
        const emp = db.employees.find(e => e.id === s.employeeId);
        const custText = cust ? `${cust.code} ${cust.name}`.toLowerCase() : '';
        const empText = emp ? `${emp.code} ${emp.firstName} ${emp.lastName}`.toLowerCase() : '';
        return s.code.toLowerCase().includes(q) || (s.date || '').includes(q) || custText.includes(q) || empText.includes(q);
      });

      document.getElementById('sales-count-badge').textContent = `${filtered.length} records`;
      const pg = paginate(filtered, currentPage);

      const tbody = document.getElementById('sales-tbody');
      tbody.innerHTML = pg.slice.length === 0
        ? `<tr><td colspan="8"><div class="empty-state-box"><div class="empty-icon-box">🧾</div><div class="text-xs font-semibold mb-1">No sales records found.</div></div></td></tr>`
        : pg.slice.map(s => {
            const cust = db.customers.find(c => c.id === s.customerId);
            const emp = db.employees.find(e => e.id === s.employeeId);
            const custLabel = cust ? `${cust.code} — ${esc(cust.name)}` : '—';
            const empLabel = emp ? `${emp.code} — ${esc(emp.firstName)} ${esc(emp.lastName)}` : 'E-001 — Staff';
            const statusBg = s.status === 'Active' ? 'background:#e8efe8; color:#2b5434;' : 'background:#f3e8e8; color:#9b2c2c;';

            return `
              <tr>
                <td class="font-bold">${esc(s.code)}</td>
                <td>${esc(s.date || '—')}</td>
                <td>${custLabel}</td>
                <td>${empLabel}</td>
                <td class="font-bold">₱${Number(s.total).toFixed(2)}</td>
                <td><span class="badge-count" style="${statusBg}">${esc(s.status)}</span></td>
                <td>
                  <div class="text-[11px] font-semibold uppercase" style="color:var(--text-secondary);">${esc(s.stampAction)} ${esc(s.stampBy)}</div>
                  <div class="text-[10px]" style="color:var(--text-muted);">${esc(s.stampTime)}</div>
                </td>
                <td>
                  <div class="flex items-center gap-1.5">
                    <a href="sales-details.html?sale_id=${s.id}" class="btn-secondary text-[11px] py-1 px-2.5">Details</a>
                    ${canEditOrDelete ? `
                      <button type="button" class="btn-secondary text-[11px] py-1 px-2.5 btn-sale-edit" data-id="${s.id}">Edit</button>
                      <button type="button" class="btn-secondary text-[11px] py-1 px-2.5 btn-sale-delete" data-id="${s.id}" style="color:#b42318;">
                        ${s.status === 'Inactive' ? 'Restore' : 'Delete'}
                      </button>
                    ` : ''}
                  </div>
                </td>
              </tr>
            `;
          }).join('');

      document.getElementById('sales-footer-count').textContent = `${filtered.length} records`;
      document.getElementById('sales-page-info').textContent = filtered.length === 0 ? 'No pages' : `Page ${pg.currentPage} of ${pg.totalPages}`;
      document.getElementById('sales-prev').disabled = pg.currentPage <= 1;
      document.getElementById('sales-next').disabled = pg.currentPage >= pg.totalPages;

      if (canEditOrDelete) {
        document.querySelectorAll('.btn-sale-edit').forEach(btn => {
          btn.onclick = () => {
            const sale = db.sales.find(x => x.id === btn.dataset.id);
            if (sale) openEditSaleModal(sale, renderSalesList);
          };
        });

        document.querySelectorAll('.btn-sale-delete').forEach(btn => {
          btn.onclick = async () => {
            const sale = db.sales.find(x => x.id === btn.dataset.id);
            if (!sale) return;
            const nextStatus = sale.status === 'Inactive' ? 'Active' : 'Inactive';
            const isDeletedFlag = nextStatus === 'Inactive';

            const { error } = await sb.from('sales').update({
              status: nextStatus
            }).eq('id', sale.id);

            if (error) {
              await sb.from('sales').update({ is_deleted: isDeletedFlag }).eq('id', sale.id);
            }

            addLog(nextStatus === 'Inactive' ? 'Sale deactivated' : 'Sale restored', sale.code);
            await syncFromSupabase();
            renderSalesList();
            showToast(`Sale ${sale.code} marked ${nextStatus}.`);
          };
        });
      }
    }

    document.getElementById('tab-sales-active').onclick = () => { statusTab = 'Active'; currentPage = 1; renderSalesList(); };
    document.getElementById('tab-sales-inactive').onclick = () => { statusTab = 'Inactive'; currentPage = 1; renderSalesList(); };
    document.getElementById('tab-sales-all').onclick = () => { statusTab = 'All'; currentPage = 1; renderSalesList(); };
    document.getElementById('sales-search').oninput = () => { currentPage = 1; renderSalesList(); };
    document.getElementById('sales-prev').onclick = () => { currentPage--; renderSalesList(); };
    document.getElementById('sales-next').onclick = () => { currentPage++; renderSalesList(); };

    renderSalesList();
  }

  // =========================================================
  // CUSTOMERS
  // =========================================================
  if (page === 'customers') {
    const urlParams = new URLSearchParams(window.location.search);
    let tab = urlParams.get('tab') === 'Deleted' ? 'Deleted' : 'Active';
    initShell(tab === 'Deleted' ? 'deleted' : 'customers', 'Customers');
    let currentPage = 1, selectedIds = [];

    if (!hasRight('customer_mgmt', 'Add Customer')) {
      const addBtn = document.getElementById('btn-cust-add-new');
      if (addBtn) addBtn.style.display = 'none';
    }

    function openEditCustomerModal(cust) {
      document.getElementById('modal-root').innerHTML = `
        <div class="modal-backdrop" onclick="this.remove()">
          <div class="modal-card" style="max-width:560px; width:95%;" onclick="event.stopPropagation()">
            <div class="flex justify-between items-start mb-4 pb-3 border-b" style="border-color:var(--border-color);">
              <div>
                <h3 class="text-lg font-bold">Edit Customer — ${esc(cust.code)}</h3>
                <p class="text-xs" style="color:var(--text-secondary);">Update only the fields you want to change.</p>
              </div>
              <button type="button" class="text-sm px-2 py-1" onclick="document.getElementById('modal-root').innerHTML=''">✕</button>
            </div>
            <form id="modal-cust-edit-form">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                <div><label class="form-label">Customer Name *</label><input type="text" id="m-cust-name" value="${esc(cust.name || '')}" required class="form-input" /></div>
                <div><label class="form-label">Company Name</label><input type="text" id="m-cust-company" value="${esc(cust.company || '')}" class="form-input" /></div>
                <div><label class="form-label">Email</label><input type="email" id="m-cust-email" value="${esc(cust.email || '')}" class="form-input" /></div>
                <div><label class="form-label">Phone</label><input type="text" id="m-cust-phone" value="${esc(cust.phone || '')}" class="form-input" /></div>
                <div class="sm:col-span-2"><label class="form-label">Street Address</label><input type="text" id="m-cust-street" value="${esc(cust.street || '')}" class="form-input" /></div>
                <div><label class="form-label">City</label><input type="text" id="m-cust-city" value="${esc(cust.city || '')}" class="form-input" /></div>
                <div><label class="form-label">Province / State</label><input type="text" id="m-cust-state" value="${esc(cust.state || '')}" class="form-input" /></div>
                <div><label class="form-label">Postal Code</label><input type="text" id="m-cust-postal" value="${esc(cust.postal || '')}" class="form-input" /></div>
                <div><label class="form-label">Notes</label><input type="text" id="m-cust-notes" value="${esc(cust.notes || '')}" class="form-input" /></div>
              </div>
              <div class="flex justify-end gap-2 pt-3 border-t" style="border-color:var(--border-color);">
                <button type="button" class="btn-secondary text-xs" onclick="document.getElementById('modal-root').innerHTML=''">Cancel</button>
                <button type="submit" class="btn-primary text-xs">✓ Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      `;

      document.getElementById('modal-cust-edit-form').onsubmit = async (e) => {
        e.preventDefault();
        const updatedName = document.getElementById('m-cust-name').value.trim();
        const { error } = await sb.from('customers').update({
          customer_name: updatedName,
          company_name: document.getElementById('m-cust-company').value.trim(),
          email: document.getElementById('m-cust-email').value.trim(),
          phone: document.getElementById('m-cust-phone').value.trim(),
          street_address: document.getElementById('m-cust-street').value.trim(),
          city: document.getElementById('m-cust-city').value.trim(),
          province: document.getElementById('m-cust-state').value.trim(),
          postal_code: document.getElementById('m-cust-postal').value.trim(),
          notes: document.getElementById('m-cust-notes').value.trim()
        }).eq('id', cust.id);

        if (error) return showToast('Error: ' + error.message);
        addLog('Customer updated', updatedName);
        selectedIds = [];
        document.getElementById('modal-root').innerHTML = '';
        await syncFromSupabase();
        renderCustomers();
        showToast('Customer updated.');
      };
    }

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

      document.getElementById('btn-cust-edit').style.display = (tab === 'Active' && hasRight('customer_mgmt', 'Edit Customer')) ? '' : 'none';
      document.getElementById('btn-cust-delete').style.display = (tab === 'Active' && hasRight('customer_mgmt', 'Delete Customer')) ? '' : 'none';
      document.getElementById('btn-cust-restore').style.display = (tab === 'Deleted' && hasRight('customer_mgmt', 'Restore Customer')) ? '' : 'none';
      document.getElementById('deleted-callout').style.display = tab === 'Deleted' ? 'flex' : 'none';

      const pg = paginate(filtered, currentPage);
      document.getElementById('cust-tbody').innerHTML = pg.slice.length === 0
        ? `<tr><td colspan="6"><div class="empty-state-box"><div class="empty-icon-box">📥</div><div class="text-xs font-semibold mb-1">No records yet. Click Add New to get started.</div></div></td></tr>`
        : pg.slice.map(c => `
          <tr>
            <td><input type="checkbox" class="cust-cb" data-id="${c.id}" ${selectedIds.includes(c.id) ? 'checked' : ''} /></td>
            <td>${c.code}</td><td class="font-semibold">${esc(c.name)}</td><td>${esc(c.email || '—')}</td><td>${esc(c.phone || '—')}</td>
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

    document.getElementById('btn-cust-edit').onclick = (e) => {
      e.preventDefault();
      if (selectedIds.length !== 1) return;
      const cust = db.customers.find(c => c.id === selectedIds[0]);
      if (cust) openEditCustomerModal(cust);
    };

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

  // =========================================================
  // CUSTOMER DETAILS FORM
  // =========================================================
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

  // =========================================================
  // PRODUCT REGISTER
  // =========================================================
  if (page === 'products') {
    initShell('products', 'Products');
    let currentPage = 1, selectedIds = [];

    function openEditProductModal(prod) {
      const origName = prod.name || '', origSku = prod.sku || '', origCat = prod.category || '';
      const origUom = prod.unitMeasure || 'Piece (pcs)', origPrice = Number(prod.unitPrice || 0).toFixed(2);
      const origDate = prod.effectiveDate || '', origDesc = prod.description || '';

      document.getElementById('modal-root').innerHTML = `
        <div class="modal-backdrop" onclick="this.remove()">
          <div class="modal-card" style="max-width:540px; width:95%;" onclick="event.stopPropagation()">
            <div class="flex justify-between items-start mb-4 pb-3 border-b" style="border-color:var(--border-color);">
              <div>
                <h3 class="text-lg font-bold">Edit Product — ${esc(prod.code)}</h3>
                <p class="text-xs" style="color:var(--text-secondary);">Update the selected product's name, price, SKU, unit measure, and effective date.</p>
              </div>
              <button type="button" class="text-sm px-2 py-1" onclick="document.getElementById('modal-root').innerHTML=''">✕</button>
            </div>
            <form id="modal-prod-edit-form">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                <div><label class="form-label">Product Name *</label><input type="text" id="m-prod-name" value="${esc(origName)}" required class="form-input" /></div>
                <div><label class="form-label">SKU</label><input type="text" id="m-prod-sku" value="${esc(origSku)}" class="form-input" /></div>
                <div><label class="form-label">Unit Price *</label><input type="number" step="0.01" id="m-prod-price" value="${origPrice}" required class="form-input" /></div>
                <div><label class="form-label">Unit Measure</label><select id="m-prod-uom" class="form-input">${['Piece (pcs)', 'Box', 'Set', 'Unit', 'Kilogram (kg)', 'Liter (L)'].map(u => `<option value="${u}" ${origUom === u ? 'selected' : ''}>${u}</option>`).join('')}</select></div>
                <div><label class="form-label">Effective Date *</label><input type="date" id="m-prod-date" value="${origDate}" required class="form-input" /></div>
                <div><label class="form-label">Category</label><input type="text" id="m-prod-cat" value="${esc(origCat)}" class="form-input" /></div>
                <div class="sm:col-span-2"><label class="form-label">Description</label><textarea id="m-prod-desc" rows="2" class="form-input">${esc(origDesc)}</textarea></div>
              </div>
              <div class="flex items-center justify-between pt-3 border-t" style="border-color:var(--border-color);">
                <div class="flex gap-2">
                  <button type="button" id="btn-m-prod-delete" class="btn-secondary text-xs" style="color:#b42318; border-color:#f3c6c2;">🗑️ Delete</button>
                  <button type="button" id="btn-m-prod-restore" class="btn-secondary text-xs">↺ Restore</button>
                </div>
                <div class="flex gap-2">
                  <button type="button" class="btn-secondary text-xs" onclick="document.getElementById('modal-root').innerHTML=''">Cancel</button>
                  <button type="submit" class="btn-primary text-xs">✓ Save Changes</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      `;

      HopeCalendar.enhance(document.getElementById('modal-root'));

      document.getElementById('btn-m-prod-restore').onclick = () => {
        document.getElementById('m-prod-name').value = origName;
        document.getElementById('m-prod-sku').value = origSku;
        document.getElementById('m-prod-price').value = origPrice;
        document.getElementById('m-prod-uom').value = origUom;
        document.getElementById('m-prod-cat').value = origCat;
        document.getElementById('m-prod-desc').value = origDesc;
        HopeCalendar.setISO('m-prod-date', origDate, true);
        showToast('Restored original product values.');
      };

      document.getElementById('btn-m-prod-delete').onclick = async () => {
        const { error } = await sb.from('products').delete().eq('id', prod.id);
        if (error) return showToast(error.message);
        selectedIds = [];
        document.getElementById('modal-root').innerHTML = '';
        await syncFromSupabase();
        renderProducts();
        showToast(`Deleted ${origName}.`);
      };

      document.getElementById('modal-prod-edit-form').onsubmit = async (e) => {
        e.preventDefault();
        const newName = document.getElementById('m-prod-name').value.trim();
        const newSku = document.getElementById('m-prod-sku').value.trim();
        const newPrice = parseFloat(document.getElementById('m-prod-price').value) || 0;
        const newUom = document.getElementById('m-prod-uom').value;
        const newCat = document.getElementById('m-prod-cat').value.trim();
        const newDesc = document.getElementById('m-prod-desc').value.trim();
        const newDate = HopeCalendar.getISO('m-prod-date') || origDate || new Date().toISOString().split('T')[0];

        const { error } = await sb.from('products').update({
          product_name: newName, sku: newSku, unit_price: newPrice, current_price: newPrice,
          unit: newUom, category: newCat, description: newDesc, effective_date: newDate
        }).eq('id', prod.id);

        if (error) return showToast('Error: ' + error.message);

        if (Number(origPrice) !== newPrice || origDate !== newDate) {
          await sb.from('price_history').insert({ product_id: prod.id, previous_price: Number(origPrice), new_price: newPrice, effective_date: newDate });
        }

        addLog('Product updated', newName);
        selectedIds = [];
        document.getElementById('modal-root').innerHTML = '';
        await syncFromSupabase();
        renderProducts();
        showToast('Selected product updated.');
      };
    }

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
            <td>${p.code}</td><td class="font-semibold">${esc(p.name)}</td><td>${esc(p.sku || '—')}</td>
            <td>${esc(p.category || '—')}</td><td>₱${Number(p.unitPrice).toFixed(2)}</td><td>${HopeCalendar.formatDisplay(p.effectiveDate) || '—'}</td>
          </tr>`).join('');

      document.getElementById('prod-footer-count').textContent = `${filtered.length} records`;
      document.getElementById('prod-page-info').textContent = filtered.length === 0 ? 'No pages' : `Page ${pg.currentPage} of ${pg.totalPages}`;
      document.getElementById('prod-prev').disabled = pg.currentPage <= 1;
      document.getElementById('prod-next').disabled = pg.currentPage >= pg.totalPages;

      const editBtn = document.getElementById('btn-prod-edit');
      const delBtn = document.getElementById('btn-prod-delete');
      editBtn.disabled = selectedIds.length !== 1;
      delBtn.disabled = selectedIds.length === 0;

      if (!hasRight('product_mgmt', 'Edit Product')) editBtn.style.display = 'none';
      if (!hasRight('product_mgmt', 'Delete Product')) delBtn.style.display = 'none';

      document.querySelectorAll('.prod-cb').forEach(cb => {
        cb.onchange = (e) => {
          selectedIds = e.target.checked ? [...selectedIds, e.target.dataset.id] : selectedIds.filter(x => x !== e.target.dataset.id);
          renderProducts();
        };
      });
    }

    document.getElementById('btn-prod-edit').onclick = () => {
      if (selectedIds.length !== 1) return;
      const prod = db.products.find(p => p.id === selectedIds[0]);
      if (prod) openEditProductModal(prod);
    };

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

  // =========================================================
  // PRODUCT DETAILS FORM
  // =========================================================
  if (page === 'product-details') {
    initShell('products', 'Products');
    document.getElementById('product-form').onsubmit = async (e) => {
      e.preventDefault();
      const name = document.getElementById('prod-name').value.trim();
      const unitPrice = parseFloat(document.getElementById('prod-price').value) || 0;
      const effectiveDate = HopeCalendar.getISO('prod-date') || new Date().toISOString().split('T')[0];

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
        await sb.from('price_history').insert({ product_id: inserted.id, previous_price: 0, new_price: unitPrice, effective_date: effectiveDate });
      }
      addLog('Product saved', name);
      window.location.href = 'products.html';
    };
  }

  // =========================================================
  // PRICE HISTORY
  // =========================================================
  if (page === 'price-history') {
    initShell('products', 'Products');
    let currentPage = 1, selectedPhIds = [];
    const sel = document.getElementById('ph-product-select');
    sel.innerHTML = `<option value="">All products</option>` + db.products.map(p => `<option value="${p.id}">${esc(p.name)} (${esc(p.sku || p.code)})</option>`).join('');

    function openEditPriceModal(phRecord) {
      const prod = db.products.find(p => p.id === phRecord.productId) || {};
      const origName = prod.name || '', origSku = prod.sku || '', origPrice = Number(phRecord.newPrice || 0).toFixed(2);
      const origUom = prod.unitMeasure || 'Piece (pcs)', origDate = phRecord.effectiveDate || '';

      document.getElementById('modal-root').innerHTML = `
        <div class="modal-backdrop" onclick="this.remove()">
          <div class="modal-card" style="max-width:520px; width:95%;" onclick="event.stopPropagation()">
            <div class="flex justify-between items-start mb-4 pb-3 border-b" style="border-color:var(--border-color);">
              <div>
                <h3 class="text-lg font-bold">Edit Product & Price Record</h3>
                <p class="text-xs" style="color:var(--text-secondary);">Update the selected product's information, effective date, and price record.</p>
              </div>
              <button type="button" class="text-sm px-2 py-1" onclick="document.getElementById('modal-root').innerHTML=''">✕</button>
            </div>
            <form id="modal-ph-edit-form">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div><label class="form-label">Product Name</label><input type="text" id="m-ph-name" value="${esc(origName)}" required class="form-input" /></div>
                <div><label class="form-label">SKU</label><input type="text" id="m-ph-sku" value="${esc(origSku)}" class="form-input" /></div>
                <div><label class="form-label">Price</label><input type="number" step="0.01" id="m-ph-price" value="${origPrice}" required class="form-input" /></div>
                <div><label class="form-label">Unit Measure</label><select id="m-ph-uom" class="form-input">${['Piece (pcs)', 'Box', 'Set', 'Unit', 'Kilogram (kg)', 'Liter (L)'].map(u => `<option value="${u}" ${origUom === u ? 'selected' : ''}>${u}</option>`).join('')}</select></div>
                <div class="sm:col-span-2"><label class="form-label">Effective Date</label><input type="date" id="m-ph-date" value="${origDate}" required class="form-input" /></div>
              </div>
              <div class="flex items-center justify-between pt-3 border-t" style="border-color:var(--border-color);">
                <div class="flex gap-2">
                  <button type="button" id="btn-m-ph-delete" class="btn-secondary text-xs" style="color:#b42318; border-color:#f3c6c2;">🗑️ Delete</button>
                  <button type="button" id="btn-m-ph-restore" class="btn-secondary text-xs">↺ Restore</button>
                </div>
                <div class="flex gap-2">
                  <button type="button" class="btn-secondary text-xs" onclick="document.getElementById('modal-root').innerHTML=''">Cancel</button>
                  <button type="submit" class="btn-primary text-xs">Save Changes</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      `;

      HopeCalendar.enhance(document.getElementById('modal-root'));

      document.getElementById('btn-m-ph-restore').onclick = () => {
        document.getElementById('m-ph-name').value = origName;
        document.getElementById('m-ph-sku').value = origSku;
        document.getElementById('m-ph-price').value = origPrice;
        document.getElementById('m-ph-uom').value = origUom;
        HopeCalendar.setISO('m-ph-date', origDate, true);
        showToast('Fields restored to original values.');
      };

      document.getElementById('btn-m-ph-delete').onclick = async () => {
        const { error } = await sb.from('price_history').delete().eq('id', phRecord.id);
        if (error) return showToast(error.message);
        selectedPhIds = [];
        document.getElementById('modal-root').innerHTML = '';
        await syncFromSupabase();
        renderPH();
        showToast('Price record deleted.');
      };

      document.getElementById('modal-ph-edit-form').onsubmit = async (e) => {
        e.preventDefault();
        const newName = document.getElementById('m-ph-name').value.trim();
        const newSku = document.getElementById('m-ph-sku').value.trim();
        const newPrice = parseFloat(document.getElementById('m-ph-price').value) || 0;
        const newUom = document.getElementById('m-ph-uom').value;
        const newDate = HopeCalendar.getISO('m-ph-date') || origDate;

        await sb.from('price_history').update({ new_price: newPrice, effective_date: newDate }).eq('id', phRecord.id);
        if (prod.id) {
          await sb.from('products').update({
            product_name: newName, sku: newSku, unit_price: newPrice, current_price: newPrice, unit: newUom, effective_date: newDate
          }).eq('id', prod.id);
        }
        selectedPhIds = [];
        document.getElementById('modal-root').innerHTML = '';
        await syncFromSupabase();
        renderPH();
        showToast('Product & price record updated.');
      };
    }

    function renderPH() {
      const pid = sel.value;
      const from = HopeCalendar.getISO('ph-from');
      const to = HopeCalendar.getISO('ph-to');
      const list = db.priceHistory.filter(h => (!pid || h.productId === pid) && (!from || h.effectiveDate >= from) && (!to || h.effectiveDate <= to));
      document.getElementById('ph-count-badge').textContent = `${list.length} records`;
      const pg = paginate(list, currentPage);

      document.getElementById('ph-tbody').innerHTML = pg.slice.length === 0
        ? `<tr><td colspan="6"><div class="empty-state-box"><div class="empty-icon-box">📥</div><div class="text-xs font-semibold">No records yet. Click Add New to get started.</div></div></td></tr>`
        : pg.slice.map(h => {
            const isPos = !h.change.startsWith('-');
            return `
              <tr>
                <td><input type="checkbox" class="ph-row-cb" data-id="${h.id}" ${selectedPhIds.includes(h.id) ? 'checked' : ''} /></td>
                <td>${HopeCalendar.formatDisplay(h.effectiveDate)}</td>
                <td>₱${Number(h.prevPrice).toFixed(2)}</td>
                <td class="font-semibold">₱${Number(h.newPrice).toFixed(2)}</td>
                <td style="color:${isPos ? 'var(--primary)' : '#b42318'}; font-weight:600;">${esc(h.change)}</td>
                <td>${esc(h.changedBy)}</td>
              </tr>`;
          }).join('');

      document.getElementById('ph-footer-count').textContent = `${list.length} records`;
      document.getElementById('ph-page-info').textContent = list.length === 0 ? 'No pages' : `Page ${pg.currentPage} of ${pg.totalPages}`;
      document.getElementById('ph-prev').disabled = pg.currentPage <= 1;
      document.getElementById('ph-next').disabled = pg.currentPage >= pg.totalPages;
      document.getElementById('btn-ph-edit').disabled = selectedPhIds.length !== 1;

      document.querySelectorAll('.ph-row-cb').forEach(cb => {
        cb.onchange = (e) => { selectedPhIds = e.target.checked ? [e.target.dataset.id] : []; renderPH(); };
      });
    }

    document.getElementById('btn-ph-edit').onclick = () => {
      if (selectedPhIds.length !== 1) return;
      const rec = db.priceHistory.find(x => x.id === selectedPhIds[0]);
      if (rec) openEditPriceModal(rec);
    };

    sel.onchange = () => { currentPage = 1; selectedPhIds = []; renderPH(); };
    document.getElementById('ph-from').onchange = () => { currentPage = 1; renderPH(); };
    document.getElementById('ph-to').onchange = () => { currentPage = 1; renderPH(); };
    document.getElementById('ph-prev').onclick = () => { currentPage--; renderPH(); };
    document.getElementById('ph-next').onclick = () => { currentPage++; renderPH(); };
    renderPH();
  }

  // =========================================================
  // HUMAN RESOURCES
  // =========================================================
  if (page === 'human-resources') {
    initShell('hr', 'Human Resources');
    const urlParams = new URLSearchParams(window.location.search);
    let hrTab = urlParams.get('tab') || 'employees';
    let statusFilter = 'Active';
    let currentPage = 1;
    let selectedHrIds = [];

    function openEmployeeModal(editEmp = null) {
      let currentStatus = editEmp ? (editEmp.status || 'Active') : 'Active';
      document.getElementById('modal-root').innerHTML = `
        <div class="modal-backdrop" onclick="this.remove()">
          <div class="modal-card" style="max-width:520px; width:95%;" onclick="event.stopPropagation()">
            <div class="flex justify-between items-start mb-4 pb-3 border-b" style="border-color:var(--border-color);">
              <div>
                <h3 class="text-lg font-bold">${editEmp ? 'Edit Employee' : 'Add Employee'}</h3>
                <p class="text-xs" style="color:var(--text-secondary);">Update employee details, dates, and availability.</p>
              </div>
              <button type="button" class="text-sm px-2 py-1" onclick="document.getElementById('modal-root').innerHTML=''">✕</button>
            </div>
            <form id="modal-emp-form">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                <div><label class="form-label">Employee ID</label><input type="text" value="${editEmp ? editEmp.code : 'Auto-generated'}" readonly class="form-input" /></div>
                <div><label class="form-label">Gender</label><select id="m-emp-gender" class="form-input"><option value="M" ${editEmp?.gender === 'M' ? 'selected' : ''}>Male (M)</option><option value="F" ${editEmp?.gender === 'F' ? 'selected' : ''}>Female (F)</option></select></div>
                <div><label class="form-label">First Name *</label><input type="text" id="m-emp-first" value="${editEmp ? esc(editEmp.firstName) : ''}" required class="form-input" /></div>
                <div><label class="form-label">Last Name *</label><input type="text" id="m-emp-last" value="${editEmp ? esc(editEmp.lastName) : ''}" required class="form-input" /></div>
                <div><label class="form-label">Birth Date</label><input type="date" id="m-emp-birth" value="${editEmp?.birthDate || ''}" class="form-input" /></div>
                <div><label class="form-label">Hire Date</label><input type="date" id="m-emp-hire" value="${editEmp?.hireDate || ''}" class="form-input" /></div>
                <div><label class="form-label">Separation Date</label><input type="date" id="m-emp-sep" value="${editEmp?.sepDate || ''}" class="form-input" /></div>
                <div>
                  <label class="form-label">Status</label>
                  <div class="status-toggle-group">
                    <button type="button" class="status-toggle-btn ${currentStatus === 'Active' ? 'active-state' : ''}" data-val="Active">ACTIVE</button>
                    <button type="button" class="status-toggle-btn ${currentStatus === 'Inactive' ? 'active-state' : ''}" data-val="Inactive">INACTIVE</button>
                  </div>
                </div>
              </div>
              <div class="flex justify-end gap-2.5 pt-3 border-t" style="border-color:var(--border-color);">
                <button type="button" class="btn-secondary" onclick="document.getElementById('modal-root').innerHTML=''">Cancel</button>
                <button type="submit" class="btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>`;

      HopeCalendar.enhance(document.getElementById('modal-root'));

      document.querySelectorAll('#modal-emp-form .status-toggle-btn').forEach(btn => {
        btn.onclick = () => {
          currentStatus = btn.dataset.val;
          document.querySelectorAll('#modal-emp-form .status-toggle-btn').forEach(b => b.classList.remove('active-state'));
          btn.classList.add('active-state');
        };
      });

      document.getElementById('modal-emp-form').onsubmit = async (e) => {
        e.preventDefault();
        const payload = {
          first_name: document.getElementById('m-emp-first').value.trim(),
          last_name: document.getElementById('m-emp-last').value.trim(),
          gender: document.getElementById('m-emp-gender').value,
          birth_date: HopeCalendar.getISO('m-emp-birth') || null,
          hire_date: HopeCalendar.getISO('m-emp-hire') || null,
          sep_date: HopeCalendar.getISO('m-emp-sep') || null,
          status: currentStatus
        };
        const { error } = editEmp
          ? await sb.from('employees').update(payload).eq('id', editEmp.id)
          : await sb.from('employees').insert(payload);
        if (error) return showToast(error.message);
        addLog(editEmp ? 'Employee updated' : 'Employee added', `${payload.first_name} ${payload.last_name}`);
        selectedHrIds = [];
        document.getElementById('modal-root').innerHTML = '';
        await syncFromSupabase(); renderHR(); showToast('Employee saved.');
      };
    }

    function openJobModal(editJob = null) {
      let currentStatus = editJob ? (editJob.status || 'Active') : 'Active';
      const nextCode = editJob ? editJob.code : `JOB-${String(db.jobs.length + 1).padStart(3, '0')}`;
      const deptOptions = `<option value="">Select department</option>` + db.departments.map(d =>
        `<option value="${d.id}" ${editJob?.departmentId === d.id ? 'selected' : ''}>${esc(d.name)}</option>`
      ).join('');

      document.getElementById('modal-root').innerHTML = `
        <div class="modal-backdrop" onclick="this.remove()">
          <div class="modal-card" style="max-width:460px; width:95%;" onclick="event.stopPropagation()">
            <div class="flex justify-between items-start mb-4 pb-3 border-b" style="border-color:var(--border-color);">
              <div>
                <h3 class="text-lg font-bold">${editJob ? 'Edit Job' : 'Add Job'}</h3>
                <p class="text-xs" style="color:var(--text-secondary);">Update job details, department and availability.</p>
              </div>
              <button type="button" class="text-sm px-2 py-1" onclick="document.getElementById('modal-root').innerHTML=''">✕</button>
            </div>
            <form id="modal-job-form" class="space-y-3.5">
              <div><label class="form-label">Job ID</label><input type="text" value="${nextCode}" readonly class="form-input" style="background:#f5f2ea;" /></div>
              <div><label class="form-label">Job name *</label><input type="text" id="m-job-title" value="${editJob ? esc(editJob.title) : ''}" required class="form-input" /></div>
              <div><label class="form-label">Department</label><select id="m-job-dept" class="form-input">${deptOptions}</select></div>
              <div><label class="form-label">Description</label><textarea id="m-job-desc" rows="2" class="form-input">${editJob ? esc(editJob.description) : ''}</textarea></div>
              <div>
                <label class="form-label">Status</label>
                <div class="status-toggle-group">
                  <button type="button" class="status-toggle-btn ${currentStatus === 'Active' ? 'active-state' : ''}" data-val="Active">ACTIVE</button>
                  <button type="button" class="status-toggle-btn ${currentStatus === 'Inactive' ? 'active-state' : ''}" data-val="Inactive">INACTIVE</button>
                </div>
              </div>
              <div class="flex justify-end gap-2.5 pt-3 border-t" style="border-color:var(--border-color);">
                <button type="button" class="btn-secondary" onclick="document.getElementById('modal-root').innerHTML=''">Cancel</button>
                <button type="submit" class="btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>`;

      document.querySelectorAll('#modal-job-form .status-toggle-btn').forEach(btn => {
        btn.onclick = () => {
          currentStatus = btn.dataset.val;
          document.querySelectorAll('#modal-job-form .status-toggle-btn').forEach(b => b.classList.remove('active-state'));
          btn.classList.add('active-state');
        };
      });

      document.getElementById('modal-job-form').onsubmit = async (e) => {
        e.preventDefault();
        const title = document.getElementById('m-job-title').value.trim();
        const desc = document.getElementById('m-job-desc').value.trim() || title;
        const deptId = document.getElementById('m-job-dept').value || null;
        const payload = { job_title: title, description: desc, department_id: deptId, status: currentStatus };
        const { error } = editJob
          ? await sb.from('jobs').update(payload).eq('id', editJob.id)
          : await sb.from('jobs').insert(payload);
        if (error) return showToast(error.message);
        selectedHrIds = [];
        document.getElementById('modal-root').innerHTML = '';
        await syncFromSupabase(); renderHR(); showToast('Job saved.');
      };
    }

    function openDepartmentModal(editDept = null) {
      let currentStatus = editDept ? (editDept.status || 'Active') : 'Active';
      const nextCode = editDept ? editDept.code : `DEP-${String(db.departments.length + 1).padStart(3, '0')}`;

      document.getElementById('modal-root').innerHTML = `
        <div class="modal-backdrop" onclick="this.remove()">
          <div class="modal-card" style="max-width:460px; width:95%;" onclick="event.stopPropagation()">
            <div class="flex justify-between items-start mb-4 pb-3 border-b" style="border-color:var(--border-color);">
              <div>
                <h3 class="text-lg font-bold">${editDept ? 'Edit Department' : 'Add Department'}</h3>
                <p class="text-xs" style="color:var(--text-secondary);">Update department details and availability.</p>
              </div>
              <button type="button" class="text-sm px-2 py-1" onclick="document.getElementById('modal-root').innerHTML=''">✕</button>
            </div>
            <form id="modal-dept-form" class="space-y-3.5">
              <div><label class="form-label">Department ID</label><input type="text" value="${nextCode}" readonly class="form-input" style="background:#f5f2ea;" /></div>
              <div><label class="form-label">Department name *</label><input type="text" id="m-dept-name" value="${editDept ? esc(editDept.name) : ''}" required class="form-input" /></div>
              <div><label class="form-label">Description</label><textarea id="m-dept-desc" rows="2" class="form-input">${editDept ? esc(editDept.description) : ''}</textarea></div>
              <div>
                <label class="form-label">Status</label>
                <div class="status-toggle-group">
                  <button type="button" class="status-toggle-btn ${currentStatus === 'Active' ? 'active-state' : ''}" data-val="Active">ACTIVE</button>
                  <button type="button" class="status-toggle-btn ${currentStatus === 'Inactive' ? 'active-state' : ''}" data-val="Inactive">INACTIVE</button>
                </div>
              </div>
              <div class="flex justify-end gap-2.5 pt-3 border-t" style="border-color:var(--border-color);">
                <button type="button" class="btn-secondary" onclick="document.getElementById('modal-root').innerHTML=''">Cancel</button>
                <button type="submit" class="btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>`;

      document.querySelectorAll('#modal-dept-form .status-toggle-btn').forEach(btn => {
        btn.onclick = () => {
          currentStatus = btn.dataset.val;
          document.querySelectorAll('#modal-dept-form .status-toggle-btn').forEach(b => b.classList.remove('active-state'));
          btn.classList.add('active-state');
        };
      });

      document.getElementById('modal-dept-form').onsubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById('m-dept-name').value.trim();
        const desc = document.getElementById('m-dept-desc').value.trim();
        const payload = { department_name: name, description: desc, status: currentStatus };
        const { error } = editDept
          ? await sb.from('departments').update(payload).eq('id', editDept.id)
          : await sb.from('departments').insert(payload);
        if (error) return showToast(error.message);
        selectedHrIds = [];
        document.getElementById('modal-root').innerHTML = '';
        await syncFromSupabase(); renderHR(); showToast('Department saved.');
      };
    }

    function renderHR() {
      document.getElementById('tab-hr-emp').textContent = `Employees (${db.employees.length})`;
      document.getElementById('tab-hr-job').textContent = `Jobs (${db.jobs.length})`;
      document.getElementById('tab-hr-dept').textContent = `Departments (${db.departments.length})`;

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

      ['Active', 'Inactive', 'All'].forEach(st => {
        const el = document.getElementById(`filter-hr-${st.toLowerCase()}`);
        if (statusFilter === st) el.classList.remove('border-transparent', 'bg-transparent');
        else el.classList.add('border-transparent', 'bg-transparent');
      });

      const addBtn = document.getElementById('btn-hr-add');
      const editBtn = document.getElementById('btn-hr-edit');
      const delBtn = document.getElementById('btn-hr-delete');
      const q = document.getElementById('hr-search').value.toLowerCase();
      const thead = document.getElementById('hr-thead');
      const tbody = document.getElementById('hr-tbody');

      const filtered = sourceArr.filter(item => {
        const st = item.status || 'Active';
        if (statusFilter === 'Active' && st !== 'Active') return false;
        if (statusFilter === 'Inactive' && st !== 'Inactive') return false;
        return JSON.stringify(item).toLowerCase().includes(q);
      });

      document.getElementById('hr-records-badge').textContent = `${filtered.length} records`;
      const pg = paginate(filtered, currentPage);

      if (hrTab === 'employees') {
        document.getElementById('hr-section-title').textContent = 'Employees';
        document.getElementById('hr-page-subtitle').textContent = 'Manage employee records, hiring dates, and active status.';
        document.getElementById('hr-callout-icon').textContent = '🪪';
        document.getElementById('hr-callout-title').textContent = 'Employee directory & status tracking';
        document.getElementById('hr-callout-desc').textContent = 'Select a saved employee record to edit details or update status.';
        addBtn.onclick = () => openEmployeeModal(null);

        thead.innerHTML = `<tr><th style="width:36px;"><input type="checkbox" disabled /></th><th>Employee ID</th><th>Name</th><th>Gender</th><th>Birth Date</th><th>Hire Date</th><th>Status</th></tr>`;
        tbody.innerHTML = pg.slice.length === 0
          ? `<tr><td colspan="7"><div class="empty-state-box"><div class="empty-icon-box">📥</div><div class="text-xs font-semibold">No records yet. Click Add New to get started.</div></div></td></tr>`
          : pg.slice.map(emp => `
            <tr>
              <td><input type="checkbox" class="hr-row-cb" data-id="${emp.id}" ${selectedHrIds.includes(emp.id) ? 'checked' : ''} /></td>
              <td class="font-semibold">${emp.code}</td>
              <td class="font-semibold">${esc(emp.firstName)} ${esc(emp.lastName)}</td>
              <td>${emp.gender || '—'}</td>
              <td>${HopeCalendar.formatDisplay(emp.birthDate) || '—'}</td>
              <td>${HopeCalendar.formatDisplay(emp.hireDate) || '—'}</td>
              <td><span class="badge-count uppercase">${esc(emp.status)}</span></td>
            </tr>`).join('');
      } else if (hrTab === 'jobs') {
        document.getElementById('hr-section-title').textContent = 'Jobs';
        document.getElementById('hr-page-subtitle').textContent = 'Define jobs before assigning them to employee records.';
        document.getElementById('hr-callout-icon').textContent = '💼';
        document.getElementById('hr-callout-title').textContent = 'Jobs belong to your organization';
        document.getElementById('hr-callout-desc').textContent = 'Add job titles and descriptions manually. Select a saved job to edit its details or delete it.';
        addBtn.onclick = () => openJobModal(null);

        thead.innerHTML = `<tr><th style="width:36px;"><input type="checkbox" disabled /></th><th>Job ID</th><th>Job title</th><th>Department</th><th>Description</th><th>Status</th></tr>`;
        tbody.innerHTML = pg.slice.length === 0
          ? `<tr><td colspan="6"><div class="empty-state-box"><div class="empty-icon-box">📥</div><div class="text-xs font-semibold">No records yet. Click Add New to get started.</div></div></td></tr>`
          : pg.slice.map(j => {
              const dept = db.departments.find(d => d.id === j.departmentId);
              return `
                <tr>
                  <td><input type="checkbox" class="hr-row-cb" data-id="${j.id}" ${selectedHrIds.includes(j.id) ? 'checked' : ''} /></td>
                  <td class="font-semibold">${j.code}</td>
                  <td class="font-semibold">${esc(j.title)}</td>
                  <td>${dept ? esc(dept.name) : '—'}</td>
                  <td>${esc(j.description)}</td>
                  <td><span class="badge-count uppercase">${esc(j.status)}</span></td>
                </tr>`;
            }).join('');
      } else {
        document.getElementById('hr-section-title').textContent = 'Departments';
        document.getElementById('hr-page-subtitle').textContent = 'Organize your team with a clear department register.';
        document.getElementById('hr-callout-icon').textContent = '🗂️';
        document.getElementById('hr-callout-title').textContent = 'Start with your organizational structure';
        document.getElementById('hr-callout-desc').textContent = 'Add departments manually, then associate jobs and employees. Select a saved department to edit or delete it.';
        addBtn.onclick = () => openDepartmentModal(null);

        thead.innerHTML = `<tr><th style="width:36px;"><input type="checkbox" disabled /></th><th>Department ID</th><th>Department name</th><th>Description</th><th>Employees</th><th>Status</th></tr>`;
        tbody.innerHTML = pg.slice.length === 0
          ? `<tr><td colspan="6"><div class="empty-state-box"><div class="empty-icon-box">📥</div><div class="text-xs font-semibold">No records yet. Click Add New to get started.</div></div></td></tr>`
          : pg.slice.map(d => {
              const empCount = db.employees.filter(e => e.departmentId === d.id).length;
              return `
                <tr>
                  <td><input type="checkbox" class="hr-row-cb" data-id="${d.id}" ${selectedHrIds.includes(d.id) ? 'checked' : ''} /></td>
                  <td class="font-semibold">${d.code}</td>
                  <td class="font-semibold">${esc(d.name)}</td>
                  <td>${esc(d.description || '—')}</td>
                  <td>${empCount}</td>
                  <td><span class="badge-count uppercase">${esc(d.status)}</span></td>
                </tr>`;
            }).join('');
      }

      editBtn.disabled = selectedHrIds.length !== 1;
      delBtn.disabled = selectedHrIds.length === 0;

      document.querySelectorAll('.hr-row-cb').forEach(cb => {
        cb.onchange = (e) => {
          selectedHrIds = e.target.checked ? [...selectedHrIds, e.target.dataset.id] : selectedHrIds.filter(x => x !== e.target.dataset.id);
          renderHR();
        };
      });

      editBtn.onclick = () => {
        if (selectedHrIds.length !== 1) return;
        const id = selectedHrIds[0];
        if (hrTab === 'employees') openEmployeeModal(db.employees.find(x => x.id === id));
        else if (hrTab === 'jobs') openJobModal(db.jobs.find(x => x.id === id));
        else openDepartmentModal(db.departments.find(x => x.id === id));
      };

      delBtn.onclick = async () => {
        if (selectedHrIds.length === 0) return;
        const table = hrTab === 'employees' ? 'employees' : hrTab === 'jobs' ? 'jobs' : 'departments';
        const { error } = await sb.from(table).update({ status: 'Inactive' }).in('id', selectedHrIds);
        if (error) return showToast(error.message);
        selectedHrIds = [];
        await syncFromSupabase();
        renderHR();
        showToast('Selected record(s) marked Inactive.');
      };

      document.getElementById('hr-footer-count').textContent = `${filtered.length} records`;
      document.getElementById('hr-page-info').textContent = filtered.length === 0 ? 'No pages' : `Page ${pg.currentPage} of ${pg.totalPages}`;
      document.getElementById('hr-prev').disabled = pg.currentPage <= 1;
      document.getElementById('hr-next').disabled = pg.currentPage >= pg.totalPages;
    }

    document.getElementById('tab-hr-emp').onclick = () => { hrTab = 'employees'; statusFilter = 'Active'; selectedHrIds = []; currentPage = 1; renderHR(); };
    document.getElementById('tab-hr-job').onclick = () => { hrTab = 'jobs'; statusFilter = 'Active'; selectedHrIds = []; currentPage = 1; renderHR(); };
    document.getElementById('tab-hr-dept').onclick = () => { hrTab = 'departments'; statusFilter = 'Active'; selectedHrIds = []; currentPage = 1; renderHR(); };
    document.getElementById('filter-hr-active').onclick = () => { statusFilter = 'Active'; selectedHrIds = []; currentPage = 1; renderHR(); };
    document.getElementById('filter-hr-inactive').onclick = () => { statusFilter = 'Inactive'; selectedHrIds = []; currentPage = 1; renderHR(); };
    document.getElementById('filter-hr-all').onclick = () => { statusFilter = 'All'; selectedHrIds = []; currentPage = 1; renderHR(); };
    document.getElementById('hr-search').oninput = () => { currentPage = 1; renderHR(); };
    document.getElementById('hr-prev').onclick = () => { currentPage--; renderHR(); };
    document.getElementById('hr-next').onclick = () => { currentPage++; renderHR(); };
    renderHR();
  }

  // =========================================================
  // STANDALONE HR FORMS
  // =========================================================
  if (page === 'employee-details') {
    initShell('hr', 'Human Resources');
    document.getElementById('emp-job').innerHTML = `<option value="">Select job</option>` + db.jobs.map(j => `<option value="${j.id}">${esc(j.title)}</option>`).join('');
    document.getElementById('emp-dept').innerHTML = `<option value="">Select department</option>` + db.departments.map(d => `<option value="${d.id}">${esc(d.name)}</option>`).join('');
    document.getElementById('employee-form').onsubmit = async (e) => {
      e.preventDefault();
      const { error } = await sb.from('employees').insert({
        first_name: document.getElementById('emp-first').value.trim(),
        last_name: document.getElementById('emp-last').value.trim(),
        email: document.getElementById('emp-email').value.trim(),
        phone: document.getElementById('emp-phone').value.trim(),
        job_id: document.getElementById('emp-job').value || null,
        department_id: document.getElementById('emp-dept').value || null,
        hire_date: HopeCalendar.getISO('emp-start') || null,
        status: document.getElementById('emp-status').value || 'Active'
      });
      if (error) return showToast(error.message);
      window.location.href = 'human-resources.html?tab=employees';
    };
  }

  if (page === 'job-details') {
    initShell('hr', 'Human Resources');
    document.getElementById('job-dept').innerHTML = `<option value="">Select department</option>` + db.departments.map(d => `<option value="${d.id}">${esc(d.name)}</option>`).join('');
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

  // =========================================================
  // NEW SALE FORM
  // =========================================================
  if (page === 'new-sale') {
    initShell('sales', 'Sales');
    let lineItems = [];
    const custSel = document.getElementById('sale-customer');
    const prodSel = document.getElementById('line-product');
    custSel.innerHTML = `<option value="">Select customer</option>` + db.customers.filter(c => c.status === 'Active').map(c => `<option value="${c.id}">${esc(c.name)}</option>`).join('');
    prodSel.innerHTML = `<option value="">Select product</option>` + db.products.map(p => `<option value="${p.id}" data-price="${p.unitPrice}">${esc(p.name)}</option>`).join('');

    prodSel.onchange = () => {
      const opt = prodSel.options[prodSel.selectedIndex];
      if (opt && opt.dataset.price) document.getElementById('line-price').value = opt.dataset.price;
    };

    function renderLines() {
      document.getElementById('sale-lines-badge').textContent = `${lineItems.length} records`;
      document.getElementById('sale-lines-count').textContent = `${lineItems.length} records`;
      document.getElementById('sale-lines-tbody').innerHTML = lineItems.length === 0
        ? `<tr><td colspan="5"><div class="empty-state-box py-6"><div class="empty-icon-box">📥</div><div class="text-xs font-semibold">No line items added yet.</div></div></td></tr>`
        : lineItems.map(item => `<tr><td><input type="checkbox" /></td><td class="font-semibold">${esc(item.productName)}</td><td>${item.qty}</td><td>₱${Number(item.unitPrice).toFixed(2)}</td><td class="font-semibold">₱${Number(item.total).toFixed(2)}</td></tr>`).join('');
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
        sale_date: HopeCalendar.getISO('sale-date') || new Date().toISOString().split('T')[0],
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
      window.location.href = 'sales.html';
    };
    renderLines();
  }

  // =========================================================
  // SALES DETAILS & REPORTS VIEW (Role-Restricted Edit)
  // =========================================================
  if (page === 'sales-details') {
    initShell('reports', 'Reports');
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedSaleId = urlParams.get('sale_id') || '';

    let itemsPage = 1, payPage = 1;
    const canEditSale = db.currentRole === 'Admin' || db.currentRole === 'Superadmin' || hasRight('sales_mgmt', 'Edit Sale');

    const saleSel = document.getElementById('sd-sale-select');
    const dateFilterEl = document.getElementById('sd-filter-date');
    const saleDateEl = document.getElementById('sd-date-display');
    const editSaleBtn = document.getElementById('btn-sd-edit-sale');

    document.getElementById('tab-sd-records').textContent = `Sales records (${db.sales.length})`;
    document.getElementById('tab-sd-payments').textContent = `Payments (${db.payments.length})`;

    if (editSaleBtn && !canEditSale) editSaleBtn.style.display = 'none';

    function populateSalesDropdown(filterDate = '') {
      const filteredSales = filterDate ? db.sales.filter(s => s.date === filterDate) : db.sales;
      saleSel.innerHTML = `<option value="">Select sale (${filteredSales.length})</option>` + filteredSales.map(s => {
        const cust = db.customers.find(c => c.id === s.customerId);
        return `<option value="${s.id}">${s.code} · ${cust ? esc(cust.name) : 'Customer'} (${HopeCalendar.formatDisplay(s.date)})</option>`;
      }).join('');

      if (preselectedSaleId && filteredSales.some(s => s.id === preselectedSaleId)) saleSel.value = preselectedSaleId;
      else if (filteredSales.length > 0) saleSel.value = filteredSales[0].id;
      else saleSel.value = '';
    }

    function renderSD() {
      const sale = db.sales.find(s => s.id === saleSel.value);
      const cust = sale ? db.customers.find(c => c.id === sale.customerId) : null;
      document.getElementById('sd-customer-display').value = cust ? cust.name : '';
      HopeCalendar.setISO(saleDateEl, sale ? sale.date : '', true);

      if (editSaleBtn) {
        editSaleBtn.disabled = !sale || !canEditSale;
        editSaleBtn.style.display = canEditSale ? '' : 'none';
      }

      const items = sale ? sale.items : [];
      const pays = sale ? db.payments.filter(p => p.saleId === sale.id) : [];
      document.getElementById('sd-items-badge').textContent = `${items.length} records`;
      document.getElementById('sd-pay-badge').textContent = `${pays.length} records`;

      const pgItems = paginate(items, itemsPage);
      document.getElementById('sd-items-tbody').innerHTML = pgItems.slice.length === 0
        ? `<tr><td colspan="5"><div class="empty-state-box py-6"><div class="empty-icon-box">📥</div><div class="text-xs font-semibold">No line items.</div></div></td></tr>`
        : pgItems.slice.map(i => `<tr><td><input type="checkbox" disabled /></td><td>${esc(i.productName)}</td><td>${i.qty}</td><td>₱${Number(i.unitPrice).toFixed(2)}</td><td>₱${Number(i.total).toFixed(2)}</td></tr>`).join('');
      document.getElementById('sd-items-count').textContent = `${items.length} records`;
      document.getElementById('sd-items-page-info').textContent = items.length === 0 ? 'No pages' : `Page ${pgItems.currentPage} of ${pgItems.totalPages}`;
      document.getElementById('sd-items-prev').disabled = pgItems.currentPage <= 1;
      document.getElementById('sd-items-next').disabled = pgItems.currentPage >= pgItems.totalPages;

      const pgPays = paginate(pays, payPage);
      document.getElementById('sd-pay-tbody').innerHTML = pgPays.slice.length === 0
        ? `<tr><td colspan="5"><div class="empty-state-box py-6"><div class="empty-icon-box">📥</div><div class="text-xs font-semibold">No payments recorded.</div></div></td></tr>`
        : pgPays.slice.map(p => `<tr><td><input type="checkbox" disabled /></td><td>${HopeCalendar.formatDisplay(p.date)}</td><td>${esc(p.method)}</td><td>${esc(p.reference || '—')}</td><td>₱${Number(p.amount).toFixed(2)}</td></tr>`).join('');
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

    if (editSaleBtn) {
      editSaleBtn.onclick = () => {
        const sale = db.sales.find(s => s.id === saleSel.value);
        if (sale) {
          openEditSaleModal(sale, () => {
            populateSalesDropdown(HopeCalendar.getISO('sd-filter-date'));
            saleSel.value = sale.id;
            renderSD();
          });
        }
      };
    }

    if (dateFilterEl) {
      dateFilterEl.onchange = () => {
        populateSalesDropdown(HopeCalendar.getISO('sd-filter-date'));
        itemsPage = 1; payPage = 1; renderSD();
      };
    }

    if (saleDateEl) {
      saleDateEl.onchange = () => {
        const d = HopeCalendar.getISO('sd-date-display');
        HopeCalendar.setISO('sd-filter-date', d, true);
        populateSalesDropdown(d);
        itemsPage = 1; payPage = 1; renderSD();
      };
    }

    saleSel.onchange = () => { itemsPage = 1; payPage = 1; renderSD(); };
    document.getElementById('sd-items-prev').onclick = () => { itemsPage--; renderSD(); };
    document.getElementById('sd-items-next').onclick = () => { itemsPage++; renderSD(); };
    document.getElementById('sd-pay-prev').onclick = () => { payPage--; renderSD(); };
    document.getElementById('sd-pay-next').onclick = () => { payPage++; renderSD(); };
    populateSalesDropdown();
    renderSD();
  }

  // =========================================================
  // RECORD A PAYMENT FORM
  // =========================================================
  if (page === 'record-payment') {
    initShell('sales', 'Sales');
    const saleSel = document.getElementById('pay-sale');
    saleSel.innerHTML = `<option value="">Select sale</option>` + db.sales.map(s => `<option value="${s.id}">${s.code} (₱${Number(s.total).toFixed(2)})</option>`).join('');
    document.getElementById('payment-form').onsubmit = async (e) => {
      e.preventDefault();
      const saleId = saleSel.value;
      const amount = parseFloat(document.getElementById('pay-amount').value);
      const payDate = HopeCalendar.getISO('pay-date');
      if (!payDate) return showToast('Please select a payment date.');

      const { error } = await sb.from('payments').insert({
        sale_id: saleId, amount, payment_date: payDate,
        method: document.getElementById('pay-method').value,
        reference: document.getElementById('pay-ref').value.trim(),
        notes: document.getElementById('pay-notes').value.trim()
      });
      if (error) return showToast('Error: ' + error.message);

      const sale = db.sales.find(s => s.id === saleId);
      if (sale) {
        const prevPaid = db.payments.filter(p => p.saleId === saleId).reduce((sum, p) => sum + p.amount, 0);
        const newPaid = prevPaid + amount;
        const newBal = Math.max(0, sale.total - newPaid);
        await sb.from('sales').update({ balance: newBal, payment_status: newBal === 0 ? 'Paid' : 'Partial' }).eq('id', saleId);
      }
      addLog('Payment recorded', `₱${amount.toFixed(2)}`);
      window.location.href = 'sales-details.html';
    };
  }

  // =========================================================
  // USER MANAGEMENT (roles-access.html)
  // =========================================================
  if (page === 'roles-access') {
    initShell('users', 'User Management');
    let currentPage = 1;

    function openUserModal(editAcc) {
      document.getElementById('modal-root').innerHTML = `
        <div class="modal-backdrop" onclick="this.remove()">
          <div class="modal-card" style="max-width:480px;" onclick="event.stopPropagation()">
            <div class="flex justify-between items-start mb-4">
              <div><h3 class="text-lg font-bold">Edit User Role & Status</h3><p class="text-xs" style="color:var(--text-secondary);">${esc(editAcc.email)}</p></div>
              <button class="text-sm px-2 py-1" onclick="document.getElementById('modal-root').innerHTML=''">✕</button>
            </div>
            <form id="modal-user-form">
              <div class="mb-3.5"><label class="form-label">Display Name *</label><input type="text" id="m-user-name" value="${esc(editAcc.username)}" required class="form-input" /></div>
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
              <div><h3 class="text-lg font-bold">Rights — ${esc(acc.username)}</h3><p class="text-xs" style="color:var(--text-secondary);">${esc(acc.email)}</p></div>
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
            <td class="font-semibold">${esc(acc.username)}</td><td>${esc(acc.email || '—')}</td>
            <td><span class="badge-count uppercase">${esc(acc.role)}</span></td><td><span class="badge-count">${esc(acc.status)}</span></td>
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

    document.getElementById('btn-um-add').onclick = () => { window.location.href = 'account-details.html'; };
    document.getElementById('um-search').oninput = () => { currentPage = 1; renderUsers(); };
    document.getElementById('um-prev').onclick = () => { currentPage--; renderUsers(); };
    document.getElementById('um-next').onclick = () => { currentPage++; renderUsers(); };
    renderUsers();
  }

  // =========================================================
  // ACCOUNT DETAILS (account-details.html)
  // =========================================================
  if (page === 'account-details') {
    initShell('users', 'User Management');
    document.getElementById('account-form').onsubmit = async (e) => {
      e.preventDefault();
      const pwd = document.getElementById('acc-pass').value;
      const confirmPwd = document.getElementById('acc-confirm').value;
      if (pwd !== confirmPwd) return showToast('Passwords do not match.');

      const username = document.getElementById('acc-username').value.trim();
      const email = document.getElementById('acc-email').value.trim();
      const role = document.getElementById('acc-role').value;
      const status = document.getElementById('acc-status').value;

      const { data, error } = await sb.auth.signUp({ email, password: pwd, options: { data: { display_name: username } } });
      if (error) return showToast(error.message);

      if (data?.user) {
        await sb.from('user_profiles').upsert({ id: data.user.id, email, display_name: username, role, status }, { onConflict: 'id' });
      }
      addLog('Account created', `${username} (${role})`);
      window.location.href = 'roles-access.html';
    };
  }

  // =========================================================
  // PERMISSIONS MATRIX (permissions.html)
  // =========================================================
  if (page === 'permissions') {
    initShell('users', 'User Management');
    const MODULES = ['Customers', 'Products', 'Human Resources', 'Sales', 'Reports', 'User Management'];
    const ACTIONS = ['View', 'Add', 'Edit', 'Delete', 'Restore', 'Print / PDF'];
    document.getElementById('tab-perm-accounts').textContent = `Accounts (${db.accounts.length})`;

    const accSel = document.getElementById('perm-account-select');
    const roleSel = document.getElementById('perm-role-select');
    accSel.innerHTML = `<option value="">Select account</option>` + db.accounts.map(a => `<option value="${a.id}">${esc(a.username)} (${esc(a.role)})</option>`).join('');

    function renderMatrix() {
      const acc = db.accounts.find(a => a.id === accSel.value);
      if (acc) roleSel.value = acc.role;
      document.getElementById('perm-selected-badge').textContent = acc ? acc.username : 'No account selected';
      document.getElementById('btn-save-perms').disabled = !acc;

      const saved = acc && db.permissions[acc.id] ? db.permissions[acc.id] : {};
      document.getElementById('perm-tbody').innerHTML = MODULES.map(mod => `
        <tr>
          <td class="font-medium">${mod}</td>
          ${ACTIONS.map(act => {
            const checked = saved[mod] && saved[mod][act] ? 'checked' : '';
            return `<td class="text-center"><input type="checkbox" class="perm-cb" data-mod="${mod}" data-act="${act}" ${checked} /></td>`;
          }).join('')}
        </tr>`).join('');
    }

    accSel.onchange = renderMatrix;
    document.getElementById('btn-clear-selection').onclick = () => { accSel.value = ''; roleSel.value = ''; renderMatrix(); };
    document.getElementById('btn-save-perms').onclick = async () => {
      const accId = accSel.value;
      if (!accId) return;
      const matrix = { ...(db.permissions[accId] || {}) };
      document.querySelectorAll('.perm-cb').forEach(cb => {
        if (!matrix[cb.dataset.mod]) matrix[cb.dataset.mod] = {};
        matrix[cb.dataset.mod][cb.dataset.act] = cb.checked;
      });
      const { error } = await sb.from('user_profiles').update({ role: roleSel.value || 'User', permissions: matrix }).eq('id', accId);
      if (error) return showToast(error.message);
      db.permissions[accId] = matrix;
      showToast('Module permissions saved to database.');
    };
    renderMatrix();
  }
});