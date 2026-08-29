const slug = document.body.dataset.project;
const project = window.portfolioProjects?.[slug];
const root = document.querySelector('#case-study');

if (!project || !root) {
  document.title = 'Project not found — Al Muntasir Abir';
  if (root) root.innerHTML = '<section class="case-shell case-error"><p class="technical-label">404 / PROJECT</p><h1>Project not found.</h1><a href="../../">Return to portfolio →</a></section>';
} else {
  document.title = `${project.name} — Engineering Case Study | Al Muntasir Abir`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = project.intro;

  const list = (items) => items.map((item) => `<li>${item}</li>`).join('');
  const tags = project.tech.map((item) => `<span>${item}</span>`).join('');
  const flow = project.flow.map((item, index) => `${index ? `<span class="flow-arrow"><i>${index === project.flow.length - 1 ? project.flowLabel : 'next'}</i>→</span>` : ''}<div class="flow-node"><small>${String(index + 1).padStart(2, '0')}</small><strong>${item}</strong></div>`).join('');

  root.innerHTML = `
    <section class="case-hero case-shell">
      <a class="back-link" href="../../#work">← Back to selected work</a>
      <div class="case-kicker"><span>${project.category}</span><span class="case-status">● ${project.status}</span></div>
      <h1>${project.name}</h1>
      <p>${project.intro}</p>
      <div class="case-meta"><div><span>ROLE</span><p>${project.role}</p></div><div><span>STACK</span><div class="tag-list">${tags}</div></div></div>
    </section>
    <section class="case-visual case-shell"><img src="${project.image}" alt="${project.imageAlt}" width="1600" height="760" /></section>
    <section class="case-section case-shell case-two-column"><div><span class="case-number">01 / OVERVIEW</span><h2>The system context.</h2></div><div class="case-prose"><p>${project.overview}</p><h3>Problem</h3><p>${project.problem}</p></div></section>
    <section class="case-section case-shell"><div class="case-section-heading"><span class="case-number">02 / SYSTEM FLOW</span><h2>Where state moves.</h2><p>This diagram describes the main implementation path at a high level; it does not imply additional services beyond the verified project scope.</p></div><div class="architecture-flow" role="img" aria-label="${project.flow.join(' to ')}">${flow}</div></section>
    <section class="case-section case-shell case-list-grid"><div><span class="case-number">03 / RESPONSIBILITY</span><h2>What I built.</h2><ul>${list(project.responsibilities)}</ul></div><div><span class="case-number">04 / CHALLENGES</span><h2>What made it hard.</h2><ul>${list(project.challenges)}</ul></div></section>
    <section class="case-section decision-section"><div class="case-shell"><span class="case-number">05 / DESIGN DECISION</span><h2>${project.decision.title}</h2><div class="tradeoff-grid"><article><span>PROBLEM</span><p>${project.decision.problem}</p></article><article><span>DECISION</span><p>${project.decision.choice}</p></article><article><span>TRADE-OFF</span><p>${project.decision.tradeoff}</p></article></div></div></section>
    <section class="case-section case-shell case-two-column"><div><span class="case-number">06 / NEXT</span><h2>What I would improve.</h2></div><div class="case-prose"><ul>${list(project.next)}</ul><p class="case-note">Future improvements are presented as engineering direction, not as completed functionality.</p></div></section>
    <section class="case-next"><div class="case-shell"><span class="technical-label">MORE ENGINEERING WORK</span><h2>Return to the complete portfolio.</h2><a class="button" href="../../#work">Explore all projects →</a><a class="text-link" href="https://github.com/amabirbd" target="_blank" rel="noreferrer">GitHub profile ↗</a></div></section>`;
}

document.querySelector('#year').textContent = new Date().getFullYear();
