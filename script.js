// Data Science Digital Library
// The module topics below are a suggested syllabus. Update them to match your college syllabus.
const modules = [
  {
    id: 1, title: "Module 1", subtitle: "Introduction to Data Science",
    description: "Understand data science fundamentals, data types, and the data science workflow.",
    icon: "📊", color: "#e8edff",
    topics: [
      "What is Data Science?",
      "Data Science applications and real-world examples",
      "Types of data: structured, semi-structured, and unstructured",
      "Data Science lifecycle and workflow",
      "Roles of a Data Scientist, Data Analyst, and Data Engineer"
    ],
    resources: [
      {title:"Module 1 Notes",type:"PDF / notes",file:"materials/module-1-notes.pdf"},
      {title:"Module 1 Important Questions",type:"Question bank",file:"materials/module-1-questions.pdf"}
    ]
  },
  {
    id: 2, title: "Module 2", subtitle: "Data Collection and Preprocessing",
    description: "Learn how to collect, clean, transform, and prepare data for analysis.",
    icon: "🧹", color: "#e3f7ee",
    topics: [
      "Data sources and data collection",
      "Data cleaning and handling missing values",
      "Data integration and data transformation",
      "Data normalization and standardization",
      "Exploratory Data Analysis (EDA)"
    ],
    resources: [
      {title:"Module 2 Notes",type:"PDF / notes",file:"materials/module-2-notes.pdf"},
      {title:"Module 2 Important Questions",type:"Question bank",file:"materials/module-2-questions.pdf"}
    ]
  },
  {
    id: 3, title: "Module 3", subtitle: "Statistics and Data Visualization",
    description: "Explore statistical foundations and ways to communicate insights visually.",
    icon: "📈", color: "#fff0e3",
    topics: [
      "Mean, median, mode, and measures of spread",
      "Probability basics and common distributions",
      "Correlation and covariance",
      "Charts and graphs: bar, line, histogram, and scatter plot",
      "Interpreting visualizations and communicating insights"
    ],
    resources: [
      {title:"Module 3 Notes",type:"PDF / notes",file:"materials/module-3-notes.pdf"},
      {title:"Module 3 Important Questions",type:"Question bank",file:"materials/module-3-questions.pdf"}
    ]
  },
  {
    id: 4, title: "Module 4", subtitle: "Machine Learning Fundamentals",
    description: "Learn the basic machine learning workflow and common learning approaches.",
    icon: "🤖", color: "#f4e8ff",
    topics: [
      "Introduction to machine learning",
      "Supervised and unsupervised learning",
      "Regression and classification",
      "Clustering and basic algorithms",
      "Training data, testing data, and model evaluation"
    ],
    resources: [
      {title:"Module 4 Notes",type:"PDF / notes",file:"materials/module-4-notes.pdf"},
      {title:"Module 4 Important Questions",type:"Question bank",file:"materials/module-4-questions.pdf"}
    ]
  },
  {
    id: 5, title: "Module 5", subtitle: "Python for Data Science and Applications",
    description: "Discover common Python tools and see how data science is applied to real problems.",
    icon: "🐍", color: "#ffe8ed",
    topics: [
      "Python basics for data analysis",
      "NumPy arrays and basic operations",
      "Pandas Series, DataFrames, and data filtering",
      "Introduction to scikit-learn workflow",
      "Data Science applications, ethics, and privacy"
    ],
    resources: [
      {title:"Module 5 Notes",type:"PDF / notes",file:"materials/module-5-notes.pdf"},
      {title:"Module 5 Important Questions",type:"Question bank",file:"materials/module-5-questions.pdf"}
    ]
  }
];

const pages = {
  home: document.getElementById("homePage"),
  modules: document.getElementById("modulesPage"),
  detail: document.getElementById("detailPage"),
  about: document.getElementById("aboutPage")
};

function makeModuleCard(module) {
  return `
    <article class="module-card" tabindex="0" role="button" aria-label="Open ${module.title}" data-module-id="${module.id}">
      <div class="module-card-top">
        <span class="module-icon" style="background:${module.color}">${module.icon}</span>
        <span class="module-number">MODULE 0${module.id}</span>
      </div>
      <h3>${module.title}</h3>
      <p>${module.subtitle}</p>
      <div class="module-bottom"><span>${module.topics.length} topics · Study resources</span><span class="open-arrow">↗</span></div>
    </article>`;
}

function renderCards() {
  document.getElementById("homeModuleGrid").innerHTML = modules.slice(0, 3).map(makeModuleCard).join("");
  filterModules("");
}

function filterModules(query) {
  const q = query.trim().toLowerCase();
  const filtered = modules.filter(m =>
    [m.title, m.subtitle, m.description, ...m.topics, ...m.resources.map(r => r.title)]
      .some(value => value.toLowerCase().includes(q))
  );
  document.getElementById("allModuleGrid").innerHTML = filtered.map(makeModuleCard).join("");
  document.getElementById("resultCount").textContent = `${filtered.length} module${filtered.length === 1 ? "" : "s"}`;
  document.getElementById("noResults").hidden = filtered.length !== 0;
}

function showPage(pageName) {
  Object.values(pages).forEach(page => page.classList.remove("active"));
  (pages[pageName] || pages.home).classList.add("active");
  document.querySelectorAll(".nav-link").forEach(button => {
    button.classList.toggle("active", button.dataset.page === pageName || (pageName === "detail" && button.dataset.page === "modules"));
  });
  window.scrollTo({top: 0, behavior: "smooth"});
}

function openModule(id) {
  const module = modules.find(item => item.id === Number(id));
  if (!module) return;
  document.getElementById("moduleDetail").innerHTML = `
    <section class="detail-hero">
      <div class="detail-emoji" style="background:${module.color}">${module.icon}</div>
      <div><p class="eyebrow">DATA SCIENCE · MODULE 0${module.id}</p><h1>${module.title}: ${module.subtitle}</h1><p>${module.description}</p></div>
    </section>
    <div class="detail-layout">
      <section class="content-panel">
        <h2>Topics to study</h2>
        <ul class="topic-list">${module.topics.map((topic, index) => `<li><span class="topic-check">${String(index + 1).padStart(2, "0")}</span><span>${topic}</span></li>`).join("")}</ul>
      </section>
      <section class="content-panel">
        <h2>Study resources</h2>
        <div class="resource-list">${module.resources.map(resource => `
          <div class="resource-item">
            <span class="resource-icon">📄</span>
            <div><strong>${resource.title}</strong><small>${resource.type}</small></div>
            <a class="resource-link" href="${resource.file}" target="_blank" rel="noopener">Open ↗</a>
          </div>`).join("")}</div>
        <p style="font-size:12px;color:var(--muted);margin:15px 0 0">Add your own PDF files to the materials folder and use the exact filenames above, or update the links in script.js.</p>
      </section>
    </div>`;
  showPage("detail");
}

document.addEventListener("click", event => {
  const pageButton = event.target.closest("[data-page]");
  if (pageButton) {
    event.preventDefault();
    showPage(pageButton.dataset.page);
    return;
  }
  const card = event.target.closest("[data-module-id]");
  if (card) openModule(card.dataset.moduleId);
});

document.addEventListener("keydown", event => {
  const card = event.target.closest("[data-module-id]");
  if (card && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openModule(card.dataset.moduleId);
  }
});

document.getElementById("searchInput").addEventListener("input", event => filterModules(event.target.value));
document.getElementById("backToModules").addEventListener("click", () => showPage("modules"));
renderCards();
