// Animate fade and navigation
    function navigateWithFade(url) {
      document.body.classList.add('fadeout');
      setTimeout(() => {
        window.location.href = url;
      }, 700);
    }

    const centerBox = document.querySelector('.box[data-center="true"]');
    const popup = document.getElementById('popupMessage');
    centerBox.addEventListener('click', function(){
      if (!centerBox.classList.contains('filled')) {
        centerBox.classList.add('filled');
        centerBox.textContent = '💗';
        centerBox.setAttribute('disabled', 'true');
        popup.classList.add('active');
        setTimeout(() => {
          popup.classList.remove('active');
          navigateWithFade('ThisIsForYou.html');
        }, 1500);
      }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
      navigateWithFade('ThisIsForYou.html');
    });

    document.getElementById('backBtn').addEventListener('click', () => {
      navigateWithFade('index.html');
    });