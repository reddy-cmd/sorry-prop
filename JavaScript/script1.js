 document.addEventListener('DOMContentLoaded', function () {
      const btn = document.getElementById('nextBtn');
      btn.addEventListener('click', function () {
        if (!btn.dataset.clicked) {
          btn.dataset.clicked = '1';
          btn.textContent = 'Sending love... ❤️';
          setTimeout(() => {
            btn.textContent = 'Next →';
            btn.dataset.clicked = '';
            // Fade out for smooth transition
            document.body.classList.add('fadeout');
            setTimeout(() => {
              window.location.href = 'FillHeart.html';
            }, 700); // Wait for fade out
          }, 1400);
        }
      });
    });