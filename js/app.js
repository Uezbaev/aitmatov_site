const layersContainer = document.querySelector('.layers__container');

// Проверка: мобильное устройство или нет
const isMobile = window.innerWidth <= 768;

if (layersContainer && !isMobile) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        targetX = (e.clientX / window.innerWidth - 0.5) * 20;
        targetY = (e.clientY / window.innerHeight - 0.5) * 20;
    });

    document.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            targetX = (touch.clientX / window.innerWidth - 0.5) * 20;
            targetY = (touch.clientY / window.innerHeight - 0.5) * 20;
        }
    }, { passive: true });

    function animate() {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        layersContainer.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg)`;

        requestAnimationFrame(animate);
    }

    animate();
} else if (layersContainer && isMobile) {
    // На мобильных устройствах фиксируем контейнер ровно, без поворотов
    layersContainer.style.transform = 'rotateX(0deg) rotateY(0deg)';
}


function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const themeToggleImg = themeToggleBtn.querySelector('img');

    if (document.body.classList.contains('dark-theme')) {
        themeToggleImg.src = 'icons8-sun-48.png';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggleImg.src = 'icons8-moon-48.png';
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved theme preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleImg = document.querySelector('.theme-toggle img');
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggleImg.src = 'icons8-sun-48.png';
    } else {
        document.body.classList.remove('dark-theme');
        themeToggleImg.src = 'icons8-moon-48.png';
    }
    

    
    // ==========================================================
    // НОВАЯ АНИМАЦИЯ ПОЯВЛЕНИЯ (FADE-IN)
    // ==========================================================
    // Находим все элементы, которым мы хотим добавить анимацию
    const elementsToAnimate = document.querySelectorAll('.h1, .hero-content__p, .button-start, .hero-content');

    elementsToAnimate.forEach((element, index) => {
        // Добавляем класс, который запускает анимацию
        // Устанавливаем задержку, чтобы элементы появлялись последовательно
        setTimeout(() => {
            element.classList.add('fade-in-active');
        }, 1000 + index * 450); // Задержка 500мс + 150мс на каждый элемент
    });
    // ==========================================================
    
});

// Smooth scrolling for anchor links (if you add them later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// For the "Узнать больше" button
document.querySelector('.button-start').addEventListener('click', function() {
    window.location.href = 'info.html';
});


 // 1. Инициализируем Splide
 
document.addEventListener('DOMContentLoaded', () => {

    const isMobile = window.innerWidth <= 768;

    const splide = new Splide('.video-splide', {
        type: 'loop',
        perPage: 1,
        autoplay: true,
        interval: 600000,
        pauseOnHover: false,
        pauseOnFocus: false,
    });

    /* ===== VIDEO SOURCE (DESKTOP / MOBILE) ===== */
    document.querySelectorAll('.slide-video').forEach(video => {
        const src = isMobile ? video.dataset.mobile : video.dataset.desktop;
        video.src = src;
    });

    /* ===== PLAY ONLY ACTIVE VIDEO ===== */
    splide.on('active', slide => {
        document.querySelectorAll('.slide-video').forEach(v => {
            v.pause();
            v.currentTime = 0;
        });

        const video = slide.slide.querySelector('video');
        if (video) {
            video.play().catch(() => {});
        }
    });

    /* ===== PLAY / PAUSE BUTTON ===== */
    document.querySelectorAll('.video-control.play').forEach(btn => {
        btn.addEventListener('click', e => {
            const video = e.target.closest('.video-wrapper').querySelector('video');
            if (video.paused) {
                video.play();
                btn.textContent = '⏸';
            } else {
                video.pause();
                btn.textContent = '▶';
            }
        });
    });

    /* ===== MUTE / UNMUTE ===== */
    document.querySelectorAll('.video-control.mute').forEach(btn => {
        btn.addEventListener('click', e => {
            const video = e.target.closest('.video-wrapper').querySelector('video');
            video.muted = !video.muted;
            btn.textContent = video.muted ? '🔇' : '🔊';
        });
    });

    /* ===== AUTOPAUSE WHEN TAB IS HIDDEN ===== */
    document.addEventListener('visibilitychange', () => {
        document.querySelectorAll('.slide-video').forEach(video => {
            if (document.hidden) video.pause();
        });
    });

    /* ===== PROGRESS BAR ===== */
    const bar = document.querySelector('.my-slider-progress-bar');
    splide.on('autoplay:playing', rate => {
        bar.style.width = `${rate * 100}%`;
    });

    splide.mount();




});



let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      document.documentElement.style.setProperty(
        '--scrollY',
        window.scrollY
      );
      ticking = false;
    });
    ticking = true;
  }
});


document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('localVideo');
    const playBtn = document.getElementById('playBtnLocal');
    const muteBtn = document.getElementById('muteBtnLocal');

    // Кнопка Воспроизведение / Пауза
    playBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // Кнопка Звук / Без звука
    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        if (video.muted) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });

    // Остановка видео при уходе со страницы (опционально)
    video.addEventListener('click', () => {
        playBtn.click(); // Позволяет ставить на паузу кликом по самому видео
    });
});




