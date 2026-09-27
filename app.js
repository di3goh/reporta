const people = [
  ['Valeria Cardenas','No localizado','missing','Arequipa, Ciudad de Arequipa','12 min'],['Diego Sifuentes','Localizado','found','Arequipa, Ciudad de Arequipa','12 min'],['Mariana Paredes','No localizado','missing','Arequipa, Ciudad de Arequipa','12 min'],['Bruno Salazar','No localizado','missing','Arequipa, Ciudad de Arequipa','12 min'],['Alma Rojas','No localizado','missing','Arequipa, Ciudad de Arequipa','12 min'],['Thiago Navarro','Localizado','found','Lima, Cercado de Lima','20 min'],['Luciana Vera','No localizado','missing','Trujillo, La Libertad','36 min'],['Matias Alarcon','Localizado','found','Cusco, Cusco','48 min'],['Sofia Zamora','No localizado','missing','Piura, Piura','1 h'],['Nicolas Ibarra','Localizado','found','Ica, Ica','2 h']
];
let type = 'all';
function renderPeople(query = '') {
  const needle = query.toLowerCase();
  document.querySelector('#report-grid').innerHTML = people.filter(p => (type === 'all' || p[2] === type) && p.join(' ').toLowerCase().includes(needle)).map((p,i) => `<article class="person-card" data-status="${p[2]}"><div class="abstract-photo photo-${i%5}"><span>${p[0].split(' ').map(n=>n[0]).join('').slice(0,2)}</span><i></i><i></i></div><div class="person-info"><h3>${p[0]}</h3><p>⌖ ${p[3]}</p><div><span class="status ${p[2]}">${p[1]}</span><span>23 años</span><span>◉ 22</span></div><p>Último reporte: <b>${p[4]}</b></p><button>Ver Reporte</button></div></article>`).join('') || '<p class="empty">No se encontraron reportes con esos criterios.</p>';
}
renderPeople();
const mapEl = document.querySelector('#help-map-v2');
if (mapEl) {
  const googleMapUrl = (place) => `https://www.google.com/maps?q=${encodeURIComponent(place)}&output=embed`;
  const iframe = document.createElement('iframe');
  iframe.title = 'Google Maps: centros de ayuda cercanos';
  iframe.loading = 'lazy';
  iframe.referrerPolicy = 'no-referrer-when-downgrade';
  iframe.src = googleMapUrl('Los Olivos, Lima, Peru');
  mapEl.replaceChildren(iframe);
  document.querySelectorAll('.center-list-v2 article').forEach((card) => {
    const place = `${card.querySelector('b').textContent}, ${card.querySelector('span').textContent}`;
    card.querySelector('button').addEventListener('click', () => {
      iframe.src = googleMapUrl(place);
      mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
}
document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => { type=b.dataset.filter; document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('selected',x===b)); renderPeople(document.querySelector('#hero-input').value); }));
document.querySelector('#hero-search').addEventListener('submit', e => {e.preventDefault(); document.querySelector('#report-input').value=document.querySelector('#hero-input').value; renderPeople(document.querySelector('#hero-input').value); document.querySelector('#personas').scrollIntoView({behavior:'smooth'});});
document.querySelector('#report-input').addEventListener('input', e=>renderPeople(e.target.value));
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');}));
const faqs=[['¿Cómo busco a una persona?','Escribe el nombre, apellido, zona o descripción en el buscador, luego revisa los reportes disponibles y sus detalles.'],['¿Qué información necesito para hacer un reporte?','Incluye una descripción, última ubicación conocida y una forma de contacto segura.'],['¿Cómo se verifica la información publicada?','Nuestro equipo y la comunidad revisan cada actualización antes de destacarla.'],['¿Puedo actualizar o corregir un reporte?','Sí. Abre el reporte y utiliza la opción de actualización para añadir información.'],['¿Qué hago si encuentro a una persona buscada?','Contacta al autor del reporte y comunica la información a las autoridades competentes.']];
document.querySelector('#faq-list').innerHTML=faqs.map((f,i)=>`<article class="faq-item ${i===0?'open':''}"><button>${f[0]} <span>⌄</span></button><p>${f[1]}</p></article>`).join('');
document.querySelectorAll('.faq-item button').forEach(b=>b.addEventListener('click',()=>b.parentElement.classList.toggle('open')));
const dialog=document.querySelector('#report-dialog'); document.querySelectorAll('.report-trigger').forEach(b=>b.addEventListener('click',()=>dialog.showModal()));document.querySelector('.close').addEventListener('click',()=>dialog.close());

// Iconos consistentes con Lucide: evita depender de caracteres Unicode que pueden
// romperse por la codificación del documento o renderizarse con tamaños distintos.
if (window.lucide) {
  const iconNames = {
    shield: 'shield-check', medical: 'heart-pulse', warning: 'triangle-alert',
    fire: 'flame', message: 'message-circle', home: 'house', people: 'users'
  };
  document.querySelectorAll('.icon-v2, .resource-icon-v2').forEach((icon) => {
    const name = Object.entries(iconNames).find(([key]) => icon.classList.contains(key))?.[1] || 'circle-help';
    icon.dataset.lucide = name;
    icon.textContent = '';
  });
  document.querySelectorAll('.emergency-grid-v2 article > a').forEach((link) => {
    link.innerHTML = '<i data-lucide="phone"></i><span>Llamar</span>';
  });
  document.querySelectorAll('.resource-grid-v2 article > a').forEach((link, index) => {
    const icon = index === 3 ? 'message-circle' : 'map-pin';
    link.innerHTML = `<i data-lucide="${icon}"></i><span>${index === 3 ? 'Ver Canal de Whatsapp' : 'Ver ubicaciones'}</span>`;
  });
  document.querySelectorAll('.search-row button, .report-search button').forEach((button) => {
    button.innerHTML = '<i data-lucide="search"></i><span>Buscar Persona</span>';
  });
  document.querySelectorAll('.search-row label, .report-search label').forEach((label) => {
    const input = label.querySelector('input');
    label.innerHTML = '<span><i data-lucide="search"></i></span>';
    if (input) label.appendChild(input);
  });
  lucide.createIcons({ attrs: { 'stroke-width': 2.25 } });
}

// ScrollSmoother mantiene el scroll fluido y sincroniza las animaciones con ScrollTrigger.
const smoothContent = document.querySelector('#smooth-content');
const visibleFooter = document.querySelector('.site-footer-v2');
if (smoothContent && visibleFooter) smoothContent.appendChild(visibleFooter);

if (window.gsap && window.ScrollTrigger && window.ScrollSmoother && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.05,
    effects: true,
    normalizeScroll: true,
    ignoreMobileResize: true
  });
}
