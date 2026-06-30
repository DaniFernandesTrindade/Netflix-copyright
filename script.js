// Header: muda o fundo ao rolar
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// Carrossel: controles esquerda/direita
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel__track');
  const prev = carousel.querySelector('.carousel__ctrl.left');
  const next = carousel.querySelector('.carousel__ctrl.right');

  const scrollBy = () => {
    const card = track.querySelector('.card');
    const cardWidth = card ? card.getBoundingClientRect().width : 300;
    return Math.round(cardWidth * 3 + 2 * 16); // ~3 cards
  };

  prev?.addEventListener('click', () => track.scrollBy({ left: -scrollBy(), behavior: 'smooth' }));
  next?.addEventListener('click', () => track.scrollBy({ left: scrollBy(), behavior: 'smooth' }));

  // arrasto no mouse
  let isDown = false, startX, scrollLeft;
  track.addEventListener('mousedown', e => {
    isDown = true; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft;
    track.classList.add('grabbing');
  });
  track.addEventListener('mouseleave', () => { isDown = false; track.classList.remove('grabbing'); });
  track.addEventListener('mouseup', () => { isDown = false; track.classList.remove('grabbing'); });
  track.addEventListener('mousemove', e => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.2;
    track.scrollLeft = scrollLeft - walk;
  });
});

// Modal simples para “Mais informações”
const modal = document.getElementById('detailsModal');
const modalTitle = document.getElementById('modalTitle');
const modalOverview = document.getElementById('modalOverview');

function openModal() {
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
}

// Abrir a partir do botão do hero
document.querySelectorAll('[data-open-modal]').forEach(btn => {
  btn.addEventListener('click', () => openModal());
});

// Abrir ao clicar em um card (leva dados do dataset)
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    modalTitle.textContent = card.dataset.title || 'Título';
    modalOverview.textContent = card.dataset.overview || 'Descrição do conteúdo.';
    openModal();
  });
});

// Fechar modal
modal.addEventListener('click', e => {
  if (e.target.hasAttribute('data-close-modal') || e.target === modal) closeModal();
});
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.hidden) closeModal();
});

// Botão “Assistir” do hero (apenas demonstração)
document.getElementById('btnPlay').addEventListener('click', () => {
  alert('Demo: aqui iniciaria a reprodução do título em destaque.');
});
