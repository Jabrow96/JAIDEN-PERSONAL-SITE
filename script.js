document.addEventListener('DOMContentLoaded', function () {
  const slides = {
    html: [
      { src: 'img/html-structure.png', caption: 'HTML Structure' },
      { src: 'img/semantic.png', caption: 'Semantic Elements' }
    ],
    css: [
      { src: 'img/css_box_model.png', caption: 'Box Model & Layouts' },
      { src: 'img/power-of-colour-in-typography.png', caption: 'Colors & Typography' }
    ],
    js: [
      { src: 'img/dom.png', caption: 'DOM Manipulation' },
      { src: 'img/Event.jpg', caption: 'Events & Interactivity' }
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
