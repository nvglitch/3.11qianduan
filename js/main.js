/* ========================================
   SIGNAL_0 - Mini PC Landing Page Scripts
   ======================================== */

// ========================================
// 时间码更新
// ========================================
function updateTimecode() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const frames = String(Math.floor(now.getMilliseconds() / 40)).padStart(2, '0');
    document.getElementById('timecode').textContent = `${hours}:${minutes}:${seconds}:${frames}`;
}
setInterval(updateTimecode, 40);
updateTimecode();

// ========================================
// Hero 轮播图功能
// ========================================
const carouselSlides = document.querySelectorAll('.carousel-slide');
const progressBars = document.querySelectorAll('.progress-bar');
let currentSlide = 0;
let slideInterval;
const slideDuration = 5000; // 5秒切换

function goToSlide(index) {
    // 移除当前激活状态
    carouselSlides[currentSlide].classList.remove('active');
    progressBars[currentSlide].classList.remove('active');
    progressBars[currentSlide].querySelector('.progress-fill').style.width = '0%';
    
    // 更新索引
    currentSlide = index;
    if (currentSlide >= carouselSlides.length) {
        currentSlide = 0;
    }
    
    // 添加新的激活状态
    carouselSlides[currentSlide].classList.add('active');
    progressBars[currentSlide].classList.add('active');
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function startCarousel() {
    // 重置所有进度条
    progressBars.forEach((bar, index) => {
        const fill = bar.querySelector('.progress-fill');
        fill.style.width = '0%';
        if (index === currentSlide) {
            bar.classList.add('active');
        } else {
            bar.classList.remove('active');
        }
    });
    
    // 启动自动播放
    slideInterval = setInterval(nextSlide, slideDuration);
}

function stopCarousel() {
    clearInterval(slideInterval);
}

// 点击进度条切换
progressBars.forEach((bar, index) => {
    bar.addEventListener('click', () => {
        stopCarousel();
        goToSlide(index);
        startCarousel();
    });
    
    // 鼠标悬停暂停
    bar.addEventListener('mouseenter', () => {
        progressBars[currentSlide].classList.add('paused');
    });
    
    bar.addEventListener('mouseleave', () => {
        progressBars[currentSlide].classList.remove('paused');
    });
});

// 启动轮播
startCarousel();

// ========================================
// 移动端菜单控制
// ========================================
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

function openMobileMenu() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

navToggle.addEventListener('click', openMobileMenu);
mobileMenuClose.addEventListener('click', closeMobileMenu);

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// 点击遮罩关闭
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        closeMobileMenu();
    }
});

// ========================================
// 随机故障效果
// ========================================
function randomGlitch() {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    const randomIndex = Math.floor(Math.random() * glitchTexts.length);
    const target = glitchTexts[randomIndex];
    
    target.classList.add('glitch-active');
    
    setTimeout(() => {
        target.classList.remove('glitch-active');
    }, 300);
}

// 每 3-8 秒随机触发一次故障效果
function scheduleRandomGlitch() {
    const delay = 3000 + Math.random() * 5000;
    setTimeout(() => {
        if (Math.random() > 0.3) {
            randomGlitch();
        }
        scheduleRandomGlitch();
    }, delay);
}
scheduleRandomGlitch();

// ========================================
// 平滑滚动
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// 图片懒加载效果
// ========================================
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                entry.target.style.opacity = '1';
            }, 100);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-image').forEach(img => {
    imageObserver.observe(img);
});

// ========================================
// 键盘导航支持
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// ========================================
// 性能优化：减少动画的 will-change
// ========================================
const animatedElements = document.querySelectorAll('.feature-card, .hero-cta, .nav-link');
animatedElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.style.willChange = 'transform, box-shadow';
    });
    el.addEventListener('mouseleave', () => {
        el.style.willChange = 'auto';
    });
});
