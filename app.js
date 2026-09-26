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
