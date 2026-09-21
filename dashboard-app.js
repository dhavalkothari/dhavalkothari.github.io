const views = [...document.querySelectorAll('.view')];
const tabs = [...document.querySelectorAll('.nav-tab')];
const chartInstances = [];
const chartColors = ['#3b829d', '#1f4c3d', '#a97c2f', '#2f7661', '#c45c26', '#315f78'];

const reportCards = [
  ['executive', 'Executive Summary', 'Credits, budget, modernization, and savings'],
  ['warehouse', 'Warehouse & Compute', 'Utilization, queue time, and idle credit waste'],
  ['queries', 'Query Performance', 'High-cost patterns and rewrite progress'],
  ['storage', 'Storage & Lifecycle', 'Growth, clustering, and retention policies'],
  ['attribution', 'Workload Attribution', 'Chargeback-ready consumption ownership'],
  ['pipelines', 'Pipeline Modernization', 'Legacy burndown and connector coverage'],
  ['backlog', 'Optimization Backlog', 'Prioritized actions and expected savings'],
];

const tableRows = {
  'wh-table': [['WH_EXEC_XS','XS','72%','60 sec','Analytics','4,120'],['WH_BI_MEDIUM','M','68%','120 sec','BI Platform','9,840'],['WH_ETL_LARGE','L','81%','300 sec','Data Engineering','14,210']],
  'query-table': [['8F1A2C','Self-join','WH_ETL_LARGE','1,420','398','72%','Done'],['B71D09','Wide scan','WH_BI_MEDIUM','880','510','42%','Open'],['CC401E','Repeated CTE','WH_EXEC_XS','410','190','54%','Rewrite']],
  'storage-table': [['EVENT_FACT','CLINICAL','18.4','Partial','7','Review'],['CLAIMS_HISTORY','FINANCE','12.7','Yes','3','Compliant'],['SESSION_LOG','PRODUCT','8.2','No','14','Open']],
  'attr-table': [['Acute Care','Production','Power BI','18,200','37.8%','BI Team'],['Corporate','Production','Tableau','9,480','19.7%','Finance'],['Research','Development','dbt','6,120','12.7%','Engineering']],
  'pipe-table': [['Clinical events','dbt','Landing','Curated','Live','Data Engineering'],['Finance daily','Fivetran','ERP','Landing','Live','Platform'],['Legacy claims','Alteryx','Files','Warehouse','Retire','Analytics']],
  'backlog-table': [['P1','Rewrite self-joins','Query','8,900','Medium','In progress','Engineering'],['P2','Reduce idle time','Warehouse','4,100','Low','Open','Platform'],['P3','Archive cold tables','Storage','2,600','Low','Planned','Data Governance']],
};

function navigate(name) {
  views.forEach(view => view.classList.toggle('active', view.id === `view-${name}`));
  tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.view === name));
  document.getElementById('filter-bar')?.classList.toggle('visible', name !== 'home' && name !== 'glossary');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.navigate = navigate;

tabs.forEach(tab => tab.addEventListener('click', () => navigate(tab.dataset.view)));

document.getElementById('report-grid').innerHTML = reportCards.map(([id,title,copy]) => `<button class="report-card" type="button" data-view="${id}"><div class="rc-icon" aria-hidden="true">↗</div><h3>${title}</h3><p>${copy}</p><div class="rc-kpi">Open analysis</div></button>`).join('');
document.querySelectorAll('.report-card').forEach(card => card.addEventListener('click', () => navigate(card.dataset.view)));

document.querySelectorAll('.persona-chip').forEach(chip => chip.addEventListener('click', () => {
  document.querySelectorAll('.persona-chip').forEach(item => item.classList.remove('active'));
  chip.classList.add('active');
  showToast(`${chip.textContent} view applied`);
}));

function renderKpis(id, values) {
  const mount = document.getElementById(id);
  if (!mount) return;
  mount.innerHTML = values.map(([label,value,delta]) => `<button class="kpi-card" type="button"><div class="k-label">${label}</div><div class="k-value">${value}</div><div class="k-sub">${delta}</div></button>`).join('');
  mount.querySelectorAll('.kpi-card').forEach(card => card.addEventListener('click', () => {
    mount.querySelectorAll('.kpi-card').forEach(item => item.classList.remove('drill-active'));
    card.classList.add('drill-active');
    showToast(`${card.querySelector('.k-label').textContent} selected`);
  }));
}

renderKpis('exec-kpis', [['Monthly credits','48,200','22% below baseline'],['Run-rate','$139K','Within budget'],['Savings YTD','$1.05M','Validated method'],['Modernized','77%','41 of 53 pipelines']]);
renderKpis('wh-kpis', [['Warehouses','6','Consolidated from 18'],['Utilization','71%','8 points higher'],['Idle credits','19%','Non-production focus'],['Auto-suspend','94%','Target 98%']]);
renderKpis('query-kpis', [['Top 50 share','61%','Down from 78%'],['Rewritten','23','Priority queries'],['Compute reduced','72%','Rewrite set average'],['Open reviews','14','Assigned backlog']]);
renderKpis('storage-kpis', [['Stored','48.6 TB','Across governed schemas'],['Monthly growth','4.8%','Review threshold 5%'],['Policy coverage','86%','Lifecycle assigned'],['Orphan tables','17','Cleanup backlog']]);
renderKpis('attr-kpis', [['Attributed','96%','Credits with owner'],['Production','68%','Consumption share'],['BI workloads','57%','Primary consumer'],['Unassigned','1,928','Credits to review']]);
renderKpis('pipe-kpis', [['Retired','41','Of 53 legacy pipelines'],['dbt models','186','Production models'],['Connectors','28','Managed ingestion'],['On schedule','92%','Daily runs']]);
renderKpis('backlog-kpis', [['Open actions','34','Across five categories'],['Potential','18.4K','Credits per month'],['In progress','11','Owned actions'],['Realized','$87K','Monthly run-rate']]);

Object.entries(tableRows).forEach(([id, rows]) => {
  const body = document.querySelector(`#${id} tbody`);
  if (body) body.innerHTML = rows.map(row => `<tr>${row.map(value => `<td>${value}</td>`).join('')}</tr>`).join('');
});

window.filterTable = (id, value) => {
  document.querySelectorAll(`#${id} tbody tr`).forEach(row => row.hidden = !row.textContent.toLowerCase().includes(value.toLowerCase()));
};

const charts = [
  ['chart-credit-trend','line',['May','Jun','Jul','Aug','Sep','Oct'],[62,59,57,54,51,48]], ['chart-division','doughnut',['Acute','Corporate','Research','Payer'],[38,25,21,16]],
  ['chart-budget','bar',['Jul','Aug','Sep','Oct'],[148,145,141,139]], ['chart-savings-cat','doughnut',['Queries','Warehouse','Storage','Schedule'],[42,28,18,12]],
  ['chart-wh-util','bar',['EXEC','BI','ETL','DEV'],[72,68,81,42]], ['chart-wh-tier','doughnut',['XS','S','M','L'],[12,21,38,29]],
  ['chart-query-pattern','bar',['Self-join','Wide scan','CTE','Sort'],[31,27,23,19]], ['chart-scan-trend','line',['W1','W2','W3','W4','W5','W6'],[920,870,790,730,680,620]],
  ['chart-storage-schema','bar',['Clinical','Finance','Product','Archive'],[18.4,12.7,9.3,8.2]], ['chart-lifecycle','doughnut',['Compliant','Review','Open'],[86,9,5]],
  ['chart-bi-tool','bar',['Power BI','Tableau','dbt','Other'],[42,24,21,13]], ['chart-env-split','doughnut',['Production','QA','Development'],[68,17,15]],
  ['chart-burndown','line',['Q1','Q2','Q3','Q4'],[53,38,22,12]], ['chart-sources','bar',['ERP','CRM','Events','Files'],[8,7,9,4]],
  ['chart-backlog-cat','doughnut',['Query','Warehouse','Storage','Pipeline'],[36,29,19,16]], ['chart-realized','bar',['Query','Warehouse','Storage','Pipeline'],[52,31,18,12]],
];

if (window.Chart) {
  charts.forEach(([id,type,labels,data], index) => {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    chartInstances.push(new Chart(canvas, { type, data: { labels, datasets: [{ data, label: id.replace('chart-','').replaceAll('-',' '), backgroundColor: type === 'line' ? 'rgba(59,130,157,.16)' : chartColors, borderColor: type === 'line' ? '#3b829d' : '#ffffff', borderWidth: type === 'line' ? 2 : 1, fill: type === 'line', tension: .35 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: type === 'doughnut', position: 'bottom' } }, scales: type === 'doughnut' ? {} : { y: { beginAtZero: true } } } }));
  });
}

function applyFilters() {
  const selected = [...document.querySelectorAll('.filter-select')].map(el => el.options[el.selectedIndex].text).join(' · ');
  document.getElementById('filter-banner-text').textContent = selected;
  document.getElementById('filter-banner').classList.add('visible');
}
window.applyFilters = applyFilters;
window.clearFilters = () => { document.querySelectorAll('.filter-select').forEach(el => el.selectedIndex = 0); document.getElementById('filter-banner').classList.remove('visible'); showToast('Filters reset'); };

const glossary = [['Credits','Compute consumed by Snowflake workloads.'],['Run-rate','Current monthly spend projected at recent usage.'],['Idle credits','Compute consumed while a warehouse performs no work.'],['Attribution','Assignment of consumption to an accountable owner.'],['Modernization','Legacy pipelines replaced by governed platform workflows.']];
function glossaryMarkup(items) { return items.map(([term,copy]) => `<div class="glossary-item"><strong>${term}</strong><p>${copy}</p></div>`).join(''); }
document.getElementById('glossary-list').innerHTML = glossaryMarkup(glossary);
document.getElementById('glossary-page-list').innerHTML = glossaryMarkup(glossary);
window.openGlossary = () => document.getElementById('glossary-overlay').classList.add('open');
window.closeGlossary = () => document.getElementById('glossary-overlay').classList.remove('open');
window.filterGlossary = value => { document.getElementById('glossary-list').innerHTML = glossaryMarkup(glossary.filter(row => row.join(' ').toLowerCase().includes(value.toLowerCase()))); };
window.filterGlossaryPage = value => { document.getElementById('glossary-page-list').innerHTML = glossaryMarkup(glossary.filter(row => row.join(' ').toLowerCase().includes(value.toLowerCase()))); };

const tourSteps = [['Overview','Start with platform health, savings, and modernization progress.'],['Reports','Use these tabs to move from executive signals into supporting detail.'],['Filters','Scope each report by division, environment, warehouse class, and period.']];
let tourIndex = 0;
function drawTour() { const [title,body] = tourSteps[tourIndex]; document.getElementById('tour-title').textContent=title; document.getElementById('tour-body').textContent=body; document.getElementById('tour-step-num').textContent=`${tourIndex+1} / ${tourSteps.length}`; }
window.startTour = () => { tourIndex=0; drawTour(); document.getElementById('tour-overlay').classList.add('open'); };
window.nextTour = () => { tourIndex += 1; if (tourIndex >= tourSteps.length) return endTour(); drawTour(); };
window.endTour = () => document.getElementById('tour-overlay').classList.remove('open');

window.closeExportModal = () => document.getElementById('export-modal').classList.remove('open');
window.downloadExportCsv = () => { const blob = new Blob(['Metric,Value\nMonthly Credits,48200\nSavings YTD,1050000'], {type:'text/csv'}); const link=document.createElement('a'); link.href=URL.createObjectURL(blob); link.download='snowflake-finops-sample.csv'; link.click(); URL.revokeObjectURL(link.href); closeExportModal(); };
function showToast(text) { const toast=document.getElementById('app-toast'); toast.textContent=text; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'),1800); }

document.getElementById('live-ts').textContent = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', timeZoneName:'short'});
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeGlossary(); endTour(); document.getElementById('export-modal').classList.remove('open'); } });
