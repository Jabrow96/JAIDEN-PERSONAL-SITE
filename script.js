document.addEventListener('DOMContentLoaded', function () {
  const slides = {
    html: [
      { src: 'img/html1.svg', caption: 'HTML structure' },
      { src: 'img/html2.svg', caption: 'Semantic elements' }
    ],
    css: [
      { src: 'img/css1.svg', caption: 'Box model & layouts' },
      { src: 'img/css2.svg', caption: 'Colors & typography' }
    ],
    js: [
      { src: 'img/js1.svg', caption: 'DOM manipulation' },
      { src: 'img/js2.svg', caption: 'Events & interactivity' }
    ]
  };

  const skillsGrid = document.querySelector('.skills-grid');
  document.querySelectorAll('.skill-card').forEach(card => {
    const key = card.dataset.skill;
    const list = slides[key] || [];
    const preview = card.querySelector('.skill-preview');
    const img = preview.querySelector('.skill-img');
    const caption = card.querySelector('.skill-caption');
    const btn = card.querySelector('.skill-btn');
    let idx = 0;
    let timer = null;

    function show(i) {
      const item = list[i];
      if (!item) return;
      img.src = item.src;
      caption.textContent = item.caption;
    }

    function layoutCaption() {
      // size the caption bubble to match the tile width and 1/3 of its height,
      // then position it directly below the tile and update grid bottom padding
      const gap = 12;
      const w = card.offsetWidth;
      const h = card.offsetHeight;
      const captionH = Math.round(h / 3);
      caption.style.width = w + 'px';
      caption.style.height = captionH + 'px';
      caption.style.top = (h) + 'px';
      caption.style.left = '0px';

      // ensure the grid reserves enough space below tiles for the caption
      if (skillsGrid) {
        const extra = 12; // extra spacing
        skillsGrid.style.paddingBottom = (captionH + gap + extra) + 'px';
      }
    }

    function start() {
      if (!list.length) return;
      layoutCaption();
      card.classList.add('active');
      if (btn) btn.style.opacity = '0';
      preview.style.opacity = '1';
      show(0);
      timer = setInterval(() => {
        idx = (idx + 1) % list.length;
        show(idx);
      }, 1600);
    }

    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
      if (list.length) show(0);
      card.classList.remove('active');
      if (btn) btn.style.opacity = '1';
      preview.style.opacity = '0';
      // caption will hide via CSS transition
    }

    card.addEventListener('mouseenter', start);
    card.addEventListener('mouseleave', stop);
    card.addEventListener('focusin', start);
    card.addEventListener('focusout', stop);

    // keep caption sized if window resizes while active
    window.addEventListener('resize', () => {
      if (card.classList.contains('active')) layoutCaption();
    });
  });
});
