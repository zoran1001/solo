// 确保页面完全加载后执行
document.addEventListener('DOMContentLoaded', function() {
    // 为所有锚点链接添加平滑滚动功能
    const links = document.querySelectorAll('.sub-nav-link');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    addScrollAnimations();
    addImageClickEffect();
    initCarousel();
});

// 平滑滚动函数
function addSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.news-item, .merch-item, .merch-item-small, .ranking-item, .category-item, .story-item, .ad-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function addImageClickEffect() {
    const placeholders = document.querySelectorAll('.image-placeholder');
    placeholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}



function initCarousel() {
    updateCarousel();
    
    // 每5秒自动切换
    setInterval(() => {
        updateCarousel();
    }, 5000);
}

function updateCarousel() {
    const indicators = document.querySelectorAll('.indicator');
    const banners = document.querySelectorAll('.top-banner-image');
    
    if (indicators.length === 0 || banners.length === 0) return;
    
    // 获取当前活动的幻灯片索引
    let currentIndex = 0;
    indicators.forEach((indicator, index) => {
        if (indicator.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    // 切换到下一张幻灯片
    const nextIndex = (currentIndex + 1) % indicators.length;
    
    // 使用统一的updateSlide函数更新幻灯片
    updateSlide(nextIndex);
}

// 为指示器添加点击事件
function addIndicatorClickEvents() {
    const indicators = document.querySelectorAll('.indicator');
    const banners = document.querySelectorAll('.top-banner-image');
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            // 更新指示器状态
            indicators.forEach((ind, i) => {
                ind.classList.toggle('active', i === index);
            });
            
            // 更新横幅图片状态
            banners.forEach((banner, i) => {
                banner.classList.toggle('active', i === index);
            });
        });
    });
}

// 切换到上一张幻灯片
function prevSlide() {
    const indicators = document.querySelectorAll('.indicator');
    const banners = document.querySelectorAll('.top-banner-image');
    
    if (indicators.length === 0 || banners.length === 0) return;
    
    // 获取当前活动的幻灯片索引
    let currentIndex = 0;
    indicators.forEach((indicator, index) => {
        if (indicator.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    // 计算上一张幻灯片索引
    const prevIndex = (currentIndex - 1 + indicators.length) % indicators.length;
    
    // 更新指示器和横幅图片状态
    updateSlide(prevIndex);
}

// 切换到下一张幻灯片
function nextSlide() {
    const indicators = document.querySelectorAll('.indicator');
    const banners = document.querySelectorAll('.top-banner-image');
    
    if (indicators.length === 0 || banners.length === 0) return;
    
    // 获取当前活动的幻灯片索引
    let currentIndex = 0;
    indicators.forEach((indicator, index) => {
        if (indicator.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    // 计算下一张幻灯片索引
    const nextIndex = (currentIndex + 1) % indicators.length;
    
    // 更新指示器和横幅图片状态
    updateSlide(nextIndex);
}

// 更新幻灯片状态
function updateSlide(index) {
    const indicators = document.querySelectorAll('.indicator');
    const banners = document.querySelectorAll('.top-banner-image');
    
    // 更新指示器状态
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
    
    // 更新横幅图片状态
    banners.forEach((banner, i) => {
        banner.classList.toggle('active', i === index);
    });
}

// 为横幅控制按钮添加事件监听器
function addBannerControlEvents() {
    const prevBtn = document.getElementById('bannerPrev');
    const nextBtn = document.getElementById('bannerNext');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
}

// 在DOMContentLoaded后添加事件监听器
document.addEventListener('DOMContentLoaded', function() {
    addIndicatorClickEvents();
    addBannerControlEvents();
    
    // 监听横幅图片变化，重新添加点击事件
    const observer = new MutationObserver(() => {
        addIndicatorClickEvents();
        addBannerControlEvents();
    });
    
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const bannerContainer = document.querySelector('.banner-container');
    
    if (indicatorsContainer) {
        observer.observe(indicatorsContainer, { childList: true });
    }
    
    if (bannerContainer) {
        observer.observe(bannerContainer, { childList: true });
    }
});
