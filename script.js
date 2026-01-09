// 轮播功能
const initHeroCarousel = () => {
    // 检查元素是否存在，只获取英雄区域的轮播图幻灯片
    const slides = document.querySelectorAll('.hero-carousel .carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let slideInterval;
    
    // 切换到指定幻灯片
    const goToSlide = (index) => {
        // 确保只有英雄区域的幻灯片被处理
        const heroSlides = document.querySelectorAll('.hero-carousel .carousel-slide');
        if (heroSlides.length === 0) return;
        
        // 移除当前激活状态
        heroSlides[currentSlide].classList.remove('active');
        
        // 设置新的当前幻灯片
        currentSlide = (index + heroSlides.length) % heroSlides.length;
        
        // 添加新的激活状态
        heroSlides[currentSlide].classList.add('active');
        
        // 重置自动播放
        resetInterval();
    };
    
    // 下一张幻灯片
    const nextSlide = () => goToSlide(currentSlide + 1);
    
    // 上一张幻灯片
    const prevSlide = () => goToSlide(currentSlide - 1);
    
    // 自动播放
    const startAutoPlay = () => {
        slideInterval = setInterval(nextSlide, 5000); // 每5秒切换一次
    };
    
    // 重置自动播放
    const resetInterval = () => {
        clearInterval(slideInterval);
        startAutoPlay();
    };
    
    // 直接绑定事件监听器，不使用可选链，确保事件能被正确绑定
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
        console.log('轮播图上一张按钮事件监听器已绑定');
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
        console.log('轮播图下一张按钮事件监听器已绑定');
    }
    
    // 开始自动播放
    startAutoPlay();
    console.log('轮播图自动播放已启动');
};

// 确保加载动画至少显示一段时间，并且在页面完全加载后才消失
let pageLoaded = false;
let minLoadTimePassed = false;
let domLoaded = false;

// 页面DOM加载完成
window.addEventListener('DOMContentLoaded', () => {
    domLoaded = true;
    
    // 页面DOM加载完成后执行的逻辑
    addSmoothScroll();
    addScrollAnimations();
    addFloatingNavHighlight();
    addWorkItemEffects();
    addSkillItemEffects();
    addFormSubmissionEffect();
    initScrollAnimations();
    initParticleSystem();
    initWorkModal();
    initHeroCarousel();
    initMusicPlayer();
    initWorkCategoryNav();
    
    pageLoaded = true;
    checkLoadingComplete();
});

// 页面所有资源加载完成
window.addEventListener('load', () => {
    pageLoaded = true;
    checkLoadingComplete();
});

// 确保至少显示2秒的加载动画
setTimeout(() => {
    minLoadTimePassed = true;
    checkLoadingComplete();
}, 2000);

// 备用机制：如果load事件没有触发，3秒后强制显示页面
setTimeout(() => {
    if (!pageLoaded) {
        console.log('资源加载超时，强制显示页面');
        pageLoaded = true;
        minLoadTimePassed = true;
        checkLoadingComplete();
    }
}, 3000);

// 检查加载是否完成，只有在页面完全加载且最小加载时间已过时才隐藏遮罩
const checkLoadingComplete = () => {
    if (pageLoaded && minLoadTimePassed) {
        // 添加loaded类，触发遮罩淡出动画
        document.body.classList.add('loaded');
    }
};

// 初始化滚动动画
const initScrollAnimations = () => {
    // 监听滚动事件，为元素添加动画
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        // 为英雄区域形状添加视差效果
        const shapes = document.querySelectorAll('.hero-shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * speed * 0.1}deg)`;
        });
        
        // 为浮动导航点添加淡入效果
        const floatingNav = document.querySelector('.floating-nav');
        if (floatingNav) {
            floatingNav.style.opacity = scrollY > 200 ? '1' : '0';
        }
    });
    
    // 初始设置浮动导航点的不透明度
    const floatingNav = document.querySelector('.floating-nav');
    if (floatingNav) {
        floatingNav.style.opacity = '0';
        floatingNav.style.transition = 'opacity 0.5s ease';
    }
};

// 分类切换逻辑
const switchCategory = (category) => {
    const categoryBtns = document.querySelectorAll('.category-nav-btn');
    const workCarousels = document.querySelectorAll('.work-carousel');
    
    // 更新导航按钮状态
    categoryBtns.forEach(b => b.classList.remove('active'));
    const targetBtn = document.querySelector(`.category-nav-btn[data-category="${category}"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
    
    // 显示对应的作品轮播
    workCarousels.forEach(carousel => {
        carousel.classList.remove('active');
        if (carousel.dataset.category === category) {
            carousel.classList.add('active');
        }
    });
};

// 初始化作品分类和轮播
const initWorkCategoryNav = () => {
    const categoryBtns = document.querySelectorAll('.category-nav-btn');
    const workCarousels = document.querySelectorAll('.work-carousel');
    
    // 分类导航按钮点击事件
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            switchCategory(category);
        });
    });
    
    // 直接在每个作品项上添加点击事件监听器
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(workItem => {
        workItem.addEventListener('click', (e) => {
            console.log('作品项被点击:', e.target);
            
            // 检查是否是分类代表图片（即包含data-category属性的work-category元素）
            const workCategory = workItem.querySelector('.work-category[data-category]');
            if (workCategory) {
                // 是分类代表图片，切换到对应分类
                const categoryValue = workCategory.dataset.category;
                console.log('切换到分类:', categoryValue);
                switchCategory(categoryValue);
            } else {
                // 是具体作品图片，打开详情页
                // 从类名中提取作品ID，确保只匹配类似work-1、work-2这样的具体作品ID，而不是work-item
                const workClass = Array.from(workItem.classList).find(cls => cls.startsWith('work-') && cls !== 'work-item');
                if (workClass) {
                    const workId = workClass;
                    console.log('打开作品详情:', workId);
                    // 打开作品详情页
                    openWorkModal(workId);
                }
            }
        });
    });
    
    // 为分类文字添加点击事件监听器
    const workCategories = document.querySelectorAll('.work-category[data-category]');
    workCategories.forEach(category => {
        category.addEventListener('click', (e) => {
            const categoryValue = category.dataset.category;
            if (categoryValue) {
                console.log('切换到分类:', categoryValue);
                switchCategory(categoryValue);
            }
        });
    });
};

// 平滑滚动函数
const addSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
};

// 滚动动画效果
const addScrollAnimations = () => {
    // 设置更精确的观察选项
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 添加visible类触发动画
                entry.target.classList.add('visible');
                // 动画完成后停止观察，避免重复触发
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 获取所有需要动画的元素
    const animateElements = document.querySelectorAll('.work-item, .skill-card, .contact-item, .form-group, .about-paragraph, .section-heading, .section-subheading');
    
    // 为不同类型元素添加不同的动画类，实现多样化的进入效果
    animateElements.forEach((el, index) => {
        // 基础淡入上浮效果
        el.classList.add('fade-in');
        
        // 为作品项添加交替左右进入效果
        if (el.classList.contains('work-item') || el.classList.contains('contact-item') || el.classList.contains('form-group')) {
            // 根据索引奇偶性添加左右进入效果
            el.classList.add(index % 2 === 0 ? 'left' : 'right');
        }
        
        // 为技能卡片添加旋转进入效果
        if (el.classList.contains('skill-card')) {
            el.classList.add('rotate');
        }
        
        // 添加观察
        observer.observe(el);
    });
};

// 浮动导航点高亮功能
const addFloatingNavHighlight = () => {
    const sections = document.querySelectorAll('section[id]');
    const navDots = document.querySelectorAll('.nav-dot');
    
    // 滚动事件监听
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.dataset.target === current) {
                dot.classList.add('active');
            }
        });
    });
};

// 作品项悬停效果
const addWorkItemEffects = () => {
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(item => {
        // 鼠标进入效果已在CSS中实现
        // 鼠标离开效果已在CSS中实现
    });
};

// 技能项悬停效果
const addSkillItemEffects = () => {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        // 鼠标进入效果已在CSS中实现
        // 鼠标离开效果已在CSS中实现
    });
};

// 表单提交效果
const addFormSubmissionEffect = () => {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 添加提交动画
            const submitButton = form.querySelector('.form-submit');
            const originalText = submitButton.textContent;
            
            // 添加加载状态
            submitButton.textContent = '发送中...';
            submitButton.disabled = true;
            
            // 模拟表单提交
            setTimeout(() => {
                submitButton.textContent = '发送成功！';
                submitButton.style.backgroundColor = '#4caf50';
                submitButton.style.borderColor = '#4caf50';
                
                // 重置表单
                setTimeout(() => {
                    form.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                    submitButton.style.borderColor = '';
                }, 2000);
            }, 1500);
        });
    }
};

// 雪花粒子系统
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numParticles = 500; // 雪花数量
        this.scrollY = 0; // 记录滚动位置
        
        // 3D相机参数
        this.camera = {
            x: 0,
            y: 0,
            z: 100, // 相机初始距离
            speed: 5, // 相机移动速度
            rotationX: 0,
            rotationY: 0
        };
        
        // 鼠标位置
        this.mouse = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        };
        
        // 透视参数
        this.fov = 60; // 视野角度
        this.aspect = this.canvas.width / this.canvas.height;
        this.near = 1;
        this.far = 1000;
        
        this.init();
        this.animate();
        
        // 监听窗口大小变化
        window.addEventListener('resize', () => this.init());
        
        // 监听滚动事件
        window.addEventListener('scroll', () => {
            this.scrollY = window.pageYOffset;
        });
        
        // 监听鼠标移动事件，实现3D交互
        window.addEventListener('mousemove', (e) => {
            // 计算鼠标在canvas中的相对位置
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
            
            // 根据鼠标位置调整相机旋转角度
            this.camera.rotationX = (this.mouse.y / this.canvas.height - 0.5) * Math.PI / 4;
            this.camera.rotationY = (this.mouse.x / this.canvas.width - 0.5) * Math.PI / 4;
        });
    }
    
    init() {
        // 设置canvas尺寸
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.aspect = this.canvas.width / this.canvas.height;
        
        // 清空粒子数组
        this.particles = [];
        
        // 创建雪花粒子 - 初始位置在屏幕上方
        for (let i = 0; i < this.numParticles; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = -Math.random() * 1000; // 初始位置在屏幕上方
            const z = (Math.random() - 0.5) * 2000;
            
            this.particles.push({
                // 3D位置
                x: x,
                y: y,
                z: z,
                
                // 3D速度 - 主要向下飘落
                speedX: (Math.random() - 0.5) * 1, // 减少左右移动
                speedY: Math.random() * 2 + 1.5, // 向下飘落，速度更快
                speedZ: (Math.random() - 0.5) * 0.5, // 减少Z轴移动
                
                // 雪花属性
                size: Math.random() * 6 + 2, // 随机大小，2-8像素
                color: 'rgba(255, 255, 255, ',
                opacity: Math.random() * 0.8 + 0.2,
                
                // 旋转角度和速度
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.05
            });
        }
    }
    
    // 3D点到2D屏幕坐标的投影转换
    project(point) {
        // 应用相机旋转
        let x = point.x * Math.cos(this.camera.rotationY) + point.z * Math.sin(this.camera.rotationY);
        let z = -point.x * Math.sin(this.camera.rotationY) + point.z * Math.cos(this.camera.rotationY);
        let y = point.y * Math.cos(this.camera.rotationX) + z * Math.sin(this.camera.rotationX);
        z = -point.y * Math.sin(this.camera.rotationX) + z * Math.cos(this.camera.rotationX);
        
        // 应用透视投影
        const scale = this.camera.z / z;
        const screenX = (x * scale * this.aspect) + this.canvas.width / 2;
        const screenY = (y * scale) + this.canvas.height / 2 + this.scrollY * 0.1;
        
        return {
            x: screenX,
            y: screenY,
            scale: scale,
            z: z
        };
    }
    
    // 绘制雪花
    drawSnowflake(x, y, size, rotation, opacity) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation);
        this.ctx.scale(size, size);
        
        // 设置雪花样式
        this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        this.ctx.lineWidth = 0.5;
        
        // 绘制雪花形状 - 六角星
        for (let i = 0; i < 6; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(0, -1);
            this.ctx.lineTo(0.2, -0.8);
            this.ctx.lineTo(0, -0.6);
            this.ctx.lineTo(0.2, -0.4);
            this.ctx.lineTo(0, -0.2);
            this.ctx.lineTo(0.2, 0);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.rotate(Math.PI / 3);
        }
        
        this.ctx.restore();
    }
    
    // 绘制单个雪花粒子
    drawParticle(particle) {
        const projected = this.project(particle);
        
        // 只跳过太远的粒子，确保雪花不会消失
        if (projected.z > this.far) {
            return;
        }
        
        // 计算雪花最终大小 - 确保雪花不会太小消失
        const finalSize = particle.size * projected.scale;
        if (finalSize < 1) {
            return; // 保持最小可见大小
        }
        
        // 计算雪花透明度
        const opacity = particle.opacity * (1 - (projected.z / this.far) * 0.5);
        
        // 绘制雪花
        this.drawSnowflake(projected.x, projected.y, finalSize, particle.rotation, opacity);
    }
    
    draw() {
        // 清空canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 按Z轴位置排序雪花，远处的先绘制
        this.particles.sort((a, b) => b.z - a.z);
        
        // 绘制所有雪花
        this.particles.forEach(particle => {
            this.drawParticle(particle);
        });
    }
    
    update() {
        // 更新雪花位置
        this.particles.forEach(particle => {
            // 3D空间内的运动 - 主要向下飘落
            particle.x += particle.speedX + Math.sin(Date.now() * 0.002 + particle.z * 0.005) * 0.3; // 减少左右摇摆
            particle.y += particle.speedY + Math.cos(Date.now() * 0.001 + particle.x * 0.005) * 0.2; // 主要向下运动
            particle.z += particle.speedZ; // 减少Z轴波动
            
            // 边界检测，确保雪花持续向下飘落
            // X轴：保持在视野范围内，小幅波动
            if (particle.x > 1000) particle.x = -1000;
            if (particle.x < -1000) particle.x = 1000;
            
            // Y轴：超出底部后从顶部重新出现
            if (particle.y > 1000) {
                particle.y = -1000; // 从顶部重新飘落
                particle.x = (Math.random() - 0.5) * 2000; // 随机X轴位置
                particle.z = (Math.random() - 0.5) * 2000; // 随机Z轴位置
            }
            
            // Z轴：保持在视野范围内
            if (particle.z > 1000) particle.z = -1000;
            if (particle.z < -1000) particle.z = 1000;
            
            // 更新旋转角度
            particle.rotation += particle.rotationSpeed;
        });
        
        // 移除自动相机旋转，保持固定视角
        // this.camera.x += Math.sin(Date.now() * 0.0005) * this.camera.speed * 0.5;
        // this.camera.z += Math.cos(Date.now() * 0.0005) * this.camera.speed * 0.5;
    }
    
    animate() {
        this.draw();
        this.update();
        requestAnimationFrame(() => this.animate());
    }
}

// 初始化粒子系统
const initParticleSystem = () => {
    new ParticleSystem('particles-canvas');
};

// 从localStorage读取作品数据，没有则使用默认数据
let workData = {};
let categoryData = {};

// 尝试从localStorage获取数据
const storedWorkData = localStorage.getItem('workData');
const storedCategoryData = localStorage.getItem('categoryData');

if (storedWorkData) {
    try {
        workData = JSON.parse(storedWorkData);
    } catch (e) {
        console.error('Failed to parse workData from localStorage:', e);
    }
}

if (storedCategoryData) {
    try {
        categoryData = JSON.parse(storedCategoryData);
    } catch (e) {
        console.error('Failed to parse categoryData from localStorage:', e);
    }
}

// 如果localStorage没有数据，使用默认数据
if (Object.keys(workData).length === 0) {
    workData = {
    "work-1": {
        "title": "Brand Design Project",
        "category": "品牌设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/ChatGPT_Image_May_16_2025_sedfsw04_11_34_AM_copy.webp?v=1747338860",
        "description": [
            "This is a comprehensive brand design project for a modern startup. The project includes logo design, brand identity, packaging design, and marketing materials.",
            "The design concept revolves around minimalism and modern aesthetics, using a clean color palette and geometric shapes to create a strong visual identity."
        ],
        "details": {
            "client": "Tech Startup Inc.",
            "year": "2024",
            "services": "Logo Design, Brand Identity, Packaging"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275"
        ],
        "concept": [
            "The design concept for this project was inspired by modern minimalism and geometric aesthetics. We wanted to create a brand identity that is both timeless and contemporary, with a strong visual impact.",
            "The color palette was carefully chosen to reflect the brand's values and personality, using clean and bold colors that create a strong visual contrast.",
            "The typography selection was based on readability and visual hierarchy, with a modern sans-serif font that complements the geometric shapes used throughout the design."
        ]
    },
    "work-7": {
        "title": "Brand Design Project 2",
        "category": "品牌设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
        "description": [
            "A modern logo design project for a tech company. Focused on creating a memorable and scalable brand identity.",
            "The design uses bold typography and a distinctive color scheme to create a strong brand presence."
        ],
        "details": {
            "client": "Tech Company Ltd.",
            "year": "2024",
            "services": "Logo Design, Brand Guidelines"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275"
        ],
        "concept": [
            "The design concept focuses on simplicity and versatility, creating a logo that works across all platforms.",
            "We used a monochromatic color scheme with a pop of accent color to create visual interest.",
            "The typography is clean and modern, reflecting the company's innovative approach."
        ]
    },
    "work-8": {
        "title": "Visual Identity Design",
        "category": "品牌设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/ChatGPT_Image_2026_1_7_15_43_57.png?v=1767776603",
        "description": [
            "A comprehensive visual identity design for a lifestyle brand. Includes logo, color palette, typography, and brand guidelines.",
            "The design creates a cohesive brand experience across all touchpoints."
        ],
        "details": {
            "client": "Lifestyle Brand Co.",
            "year": "2024",
            "services": "Visual Identity, Brand Guidelines, Packaging Design"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/ChatGPT_Image_2026_1_7_15_43_57.png?v=1767776603",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/ChatGPT_Image_2026_1_7_15_43_57.png?v=1767776603",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/ChatGPT_Image_2026_1_7_15_43_57.png?v=1767776603"
        ],
        "concept": [
            "The design concept draws inspiration from nature and organic forms, creating a warm and inviting brand personality.",
            "We used a soft color palette with earthy tones to evoke a sense of calm and authenticity.",
            "The typography is elegant and approachable, reflecting the brand's commitment to quality and craftsmanship."
        ]
    },
    "work-3": {
        "title": "AI-generated Art Project",
        "category": "AI设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
        "description": [
            "This project explores the intersection of artificial intelligence and creative design. Using advanced AI algorithms, we generated unique visual compositions that challenge traditional design boundaries.",
            "The project pushes the limits of what's possible with AI-generated art, creating stunning visuals that combine human creativity with machine intelligence."
        ],
        "details": {
            "client": "AI Creative Lab",
            "year": "2024",
            "services": "AI Art Generation, Creative Direction"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275"
        ],
        "concept": [
            "The core concept behind this project is to explore the creative potential of artificial intelligence as a collaborative tool for designers.",
            "We used a combination of generative adversarial networks (GANs) and diffusion models to create unique visual compositions that blend human intent with machine creativity.",
            "The result is a series of artworks that challenge our perception of what constitutes \"creative\" work in the age of AI."
        ]
    },
    "work-4": {
        "title": "Modern Website Design",
        "category": "网页设计",
        "bannerImage": "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        "description": [
            "A modern, responsive website design for a creative agency. This project focuses on clean typography, smooth animations, and an intuitive user experience.",
            "The design incorporates a minimalist aesthetic with bold visual elements to create a memorable impression."
        ],
        "details": {
            "client": "Creative Agency Inc.",
            "year": "2024",
            "services": "Website Design, UI/UX, Frontend Development"
        },
        "gallery": [
            "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        ],
        "concept": [
            "The design concept was centered around creating a digital experience that reflects the agency's creative approach.",
            "We used a grid-based layout to create visual hierarchy, with ample white space to let the content breathe.",
            "The color scheme was kept minimal, with accent colors used strategically to draw attention to important elements."
        ]
    },
    "work-5": {
        "title": "Creative Illustration",
        "category": "插画设计",
        "bannerImage": "https://images.unsplash.com/photo-1603970484243-63f290002d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        "description": [
            "A series of creative illustrations for a children's book. The project focuses on vibrant colors, playful characters, and engaging storytelling.",
            "Each illustration was carefully crafted to capture the imagination of young readers while supporting the book's narrative."
        ],
        "details": {
            "client": "Children's Book Publisher",
            "year": "2024",
            "services": "Illustration, Character Design, Storyboarding"
        },
        "gallery": [
            "https://images.unsplash.com/photo-1603970484243-63f290002d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1599677885500-223a6d98d88c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1513639721868-2c83d12c9288?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
        ],
        "concept": [
            "The illustration style was inspired by classic children's book art with a modern twist.",
            "We used bold, saturated colors to create a sense of wonder and excitement, while keeping the characters relatable and expressive.",
            "Each scene was composed to guide the reader's eye through the story, creating a cohesive narrative experience."
        ]
    },
    "work-6": {
        "title": "3D Product Design",
        "category": "3D设计",
        "bannerImage": "https://images.unsplash.com/photo-1556661718-86b3f05a636d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        "description": [
            "A 3D product design project for a consumer electronics company. The project includes product modeling, texturing, and realistic rendering.",
            "The design focuses on sleek, modern aesthetics with a strong emphasis on functionality and user experience."
        ],
        "details": {
            "client": "Electronics Company Ltd.",
            "year": "2024",
            "services": "3D Modeling, Product Design, Rendering"
        },
        "gallery": [
            "https://images.unsplash.com/photo-1556661718-86b3f05a636d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        ],
        "concept": [
            "The design concept was centered around creating a product that is both aesthetically pleasing and highly functional.",
            "We used parametric modeling techniques to create smooth, organic shapes that feel natural to hold and use.",
            "The materials and textures were carefully chosen to create a premium look and feel, with realistic rendering that showcases the product's features."
        ]
    },
    "work-9": {
        "title": "AI Art Project 2",
        "category": "AI设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
        "description": [
            "An AI-generated art project exploring the intersection of technology and creativity.",
            "Uses advanced diffusion models to create unique visual compositions."
        ],
        "details": {
            "client": "AI Creative Studio",
            "year": "2024",
            "services": "AI Art Generation, Creative Direction"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275"
        ],
        "concept": [
            "Exploring the creative potential of AI as a collaborative tool.",
            "Combining human intent with machine-generated visuals.",
            "Pushing the boundaries of traditional art forms."
        ]
    },
    "work-10": {
        "title": "AI Illustration Project",
        "category": "AI设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158",
        "description": [
            "AI-generated illustrations for a children's book project.",
            "Creating whimsical and engaging visuals using AI tools."
        ],
        "details": {
            "client": "Children's Book Publisher",
            "year": "2024",
            "services": "AI Illustration, Art Direction"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158"
        ],
        "concept": [
            "Using AI to enhance the creative process for children's book illustration.",
            "Creating visuals that spark imagination and wonder.",
            "Balancing AI generation with human curation and direction."
        ]
    },
    "work-11": {
        "title": "UI/UX Design Project",
        "category": "网页设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647",
        "description": [
            "A comprehensive UI/UX design project for a mobile application.",
            "Focused on creating an intuitive and engaging user experience."
        ],
        "details": {
            "client": "Mobile App Startup",
            "year": "2024",
            "services": "UI/UX Design, User Research, Prototype Development"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647"
        ],
        "concept": [
            "Designing for user needs and behavior.",
            "Creating a seamless and enjoyable user journey.",
            "Balancing aesthetics with functionality."
        ]
    },
    "work-12": {
        "title": "Responsive Web Design",
        "category": "网页设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
        "description": [
            "A responsive website design for a e-commerce platform.",
            "Ensures optimal viewing experience across all devices."
        ],
        "details": {
            "client": "E-commerce Company",
            "year": "2024",
            "services": "Website Design, Responsive Development, UX Optimization"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275"
        ],
        "concept": [
            "Designing for all screen sizes and devices.",
            "Creating a consistent user experience across platforms.",
            "Optimizing for performance and usability."
        ]
    },
    "work-13": {
        "title": "Illustration Project",
        "category": "平面设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158",
        "description": [
            "A series of illustrations for a marketing campaign.",
            "Creating engaging visuals to promote a new product."
        ],
        "details": {
            "client": "Marketing Agency",
            "year": "2024",
            "services": "Illustration, Graphic Design, Brand Integration"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158"
        ],
        "concept": [
            "Creating visuals that tell a story.",
            "Using color and composition to evoke emotion.",
            "Aligning illustrations with brand identity."
        ]
    },
    "work-14": {
        "title": "Print Design Project",
        "category": "平面设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/jimeng-2026-01-07-8512-3D_....png?v=1767777492",
        "description": [
            "A print design project for a magazine publication.",
            "Creating layouts and visuals for a feature article."
        ],
        "details": {
            "client": "Magazine Publisher",
            "year": "2024",
            "services": "Print Design, Layout Design, Typography"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/jimeng-2026-01-07-8512-3D_....png?v=1767777492",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/jimeng-2026-01-07-8512-3D_....png?v=1767777492",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/jimeng-2026-01-07-8512-3D_....png?v=1767777492"
        ],
        "concept": [
            "Designing for the printed page.",
            "Creating visual hierarchy through layout and typography.",
            "Enhancing the reading experience through design."
        ]
    },
    "work-15": {
        "title": "3D Modeling Project",
        "category": "3D设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647",
        "description": [
            "A 3D modeling project for architectural visualization.",
            "Creating detailed 3D models of a building design."
        ],
        "details": {
            "client": "Architecture Firm",
            "year": "2024",
            "services": "3D Modeling, Architectural Visualization"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647"
        ],
        "concept": [
            "Creating accurate and detailed 3D representations.",
            "Visualizing architectural designs in a realistic way.",
            "Helping clients understand spatial relationships."
        ]
    },
    "work-16": {
        "title": "3D Rendering Project",
        "category": "3D设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/ChatGPT_Image_2026_1_7_15_43_57.png?v=1767776603",
        "description": [
            "A 3D rendering project for product visualization.",
            "Creating photorealistic renderings of a new product design."
        ],
        "details": {
            "client": "Product Design Company",
            "year": "2024",
            "services": "3D Rendering, Product Visualization, Material Design"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/ChatGPT_Image_2026_1_7_15_43_57.png?v=1767776603",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/ChatGPT_Image_2026_1_7_15_43_57.png?v=1767776603",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/ChatGPT_Image_2026_1_7_15_43_57.png?v=1767776603"
        ],
        "concept": [
            "Creating photorealistic 3D renderings.",
            "Showcasing product details and features.",
            "Helping clients make informed design decisions."
        ]
    },
    "work-17": {
        "title": "Brand Strategy Design",
        "category": "品牌设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158",
        "description": [
            "A comprehensive brand strategy design for a startup company.",
            "Focused on creating a strong brand identity and market positioning."
        ],
        "details": {
            "client": "Startup Company",
            "year": "2024",
            "services": "Brand Strategy, Identity Design, Market Research"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158"
        ],
        "concept": [
            "Developing a comprehensive brand strategy to establish market presence.",
            "Creating a unique brand voice and visual identity.",
            "Aligning brand strategy with business goals."
        ]
    },
    "work-18": {
        "title": "Brand Guidelines Design",
        "category": "品牌设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
        "description": [
            "A detailed brand guidelines document for a corporate client.",
            "Ensuring consistent brand application across all touchpoints."
        ],
        "details": {
            "client": "Corporate Client",
            "year": "2024",
            "services": "Brand Guidelines, Identity System, Usage Standards"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275"
        ],
        "concept": [
            "Creating clear brand guidelines for consistent application.",
            "Defining brand colors, typography, and visual elements.",
            "Providing practical usage examples for different media."
        ]
    },
    "work-19": {
        "title": "AI Concept Art Project",
        "category": "AI设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/ChatGPT_Image_2026_1_7_15_43_57.png?v=1767776603",
        "description": [
            "An AI-generated concept art project for a video game.",
            "Creating immersive environments and characters using AI."
        ],
        "details": {
            "client": "Game Development Studio",
            "year": "2024",
            "services": "AI Concept Art, Character Design, Environment Design"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/ChatGPT_Image_2026_1_7_15_43_57.png?v=1767776603",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/ChatGPT_Image_2026_1_7_15_43_57.png?v=1767776603",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/ChatGPT_Image_2026_1_7_15_43_57.png?v=1767776603"
        ],
        "concept": [
            "Using AI to generate unique concept art for video games.",
            "Creating immersive environments and characters.",
            "Collaborating with game developers to bring ideas to life."
        ]
    },
    "work-20": {
        "title": "AI Character Design Project",
        "category": "AI设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
        "description": [
            "An AI-generated character design project for an animation studio.",
            "Creating unique and diverse characters using AI tools."
        ],
        "details": {
            "client": "Animation Studio",
            "year": "2024",
            "services": "AI Character Design, Concept Development, Style Guide"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275"
        ],
        "concept": [
            "Using AI to create diverse and unique character designs.",
            "Developing character personalities and backstories.",
            "Creating a cohesive style guide for character consistency."
        ]
    },
    "work-21": {
        "title": "E-commerce Website Design",
        "category": "网页设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/jimeng-2026-01-07-8512-3D_....png?v=1767777492",
        "description": [
            "A responsive e-commerce website design for a fashion brand.",
            "Focused on creating an intuitive shopping experience."
        ],
        "details": {
            "client": "Fashion Brand",
            "year": "2024",
            "services": "E-commerce Design, UI/UX, Responsive Development"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/jimeng-2026-01-07-8512-3D_....png?v=1767777492",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/jimeng-2026-01-07-8512-3D_....png?v=1767777492",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/jimeng-2026-01-07-8512-3D_....png?v=1767777492"
        ],
        "concept": [
            "Creating an engaging e-commerce experience.",
            "Designing for conversion and user experience.",
            "Ensuring responsive design for all devices."
        ]
    },
    "work-22": {
        "title": "Dashboard Design Project",
        "category": "网页设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647",
        "description": [
            "A comprehensive dashboard design for a data analytics platform.",
            "Focused on data visualization and user experience."
        ],
        "details": {
            "client": "Data Analytics Company",
            "year": "2024",
            "services": "Dashboard Design, Data Visualization, UI/UX"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647"
        ],
        "concept": [
            "Designing intuitive dashboards for data visualization.",
            "Creating clear and actionable data insights.",
            "Ensuring user-friendly interface for all skill levels."
        ]
    },
    "work-23": {
        "title": "Poster Design Project",
        "category": "平面设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647",
        "description": [
            "A series of posters for a cultural festival.",
            "Creating visually striking designs to promote the event."
        ],
        "details": {
            "client": "Cultural Festival Organizer",
            "year": "2024",
            "services": "Poster Design, Print Design, Brand Integration"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647"
        ],
        "concept": [
            "Creating visually striking posters for event promotion.",
            "Using bold colors and typography to attract attention.",
            "Ensuring consistency across all poster designs."
        ]
    },
    "work-24": {
        "title": "Brochure Design Project",
        "category": "平面设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158",
        "description": [
            "A corporate brochure design for a technology company.",
            "Creating a professional and informative design."
        ],
        "details": {
            "client": "Technology Company",
            "year": "2024",
            "services": "Brochure Design, Print Design, Content Layout"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158"
        ],
        "concept": [
            "Creating a professional corporate brochure.",
            "Designing clear and informative content layouts.",
            "Using visuals to enhance the company's message."
        ]
    },
    "work-25": {
        "title": "3D Animation Project",
        "category": "3D设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
        "description": [
            "A 3D animation project for a product demonstration.",
            "Creating engaging animations to showcase product features."
        ],
        "details": {
            "client": "Product Manufacturing Company",
            "year": "2024",
            "services": "3D Animation, Product Visualization, Motion Graphics"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275"
        ],
        "concept": [
            "Creating engaging 3D animations for product demonstration.",
            "Showcasing product features in an interactive way.",
            "Using motion graphics to enhance the animation."
        ]
    },
    "work-26": {
        "title": "3D Product Design Project",
        "category": "3D设计",
        "bannerImage": "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647",
        "description": [
            "A 3D product design project for a consumer electronics device.",
            "Focused on functionality and user experience."
        ],
        "details": {
            "client": "Consumer Electronics Company",
            "year": "2024",
            "services": "3D Product Design, Prototyping, Rendering"
        },
        "gallery": [
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647",
            "https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647"
        ],
        "concept": [
            "Designing functional and aesthetically pleasing products.",
            "Creating 3D models for prototyping and manufacturing.",
            "Using realistic rendering to showcase the product."
        ]
    }
};









// 全局变量声明
let workModal = null;
let workModalCloseBtn = null;

// 更新弹窗内容
const updateWorkModalContent = (work) => {
    // 检查弹窗元素和work对象是否存在
    if (!workModal || !work) return;
    
    // 更新Banner
    const bannerImg = workModal.querySelector('.work-banner-image img');
    const bannerTitle = workModal.querySelector('.work-banner-title');
    const bannerCategory = workModal.querySelector('.work-banner-category');
    
    if (bannerImg) bannerImg.src = work.bannerImage || '';
    if (bannerTitle) bannerTitle.textContent = work.title || '';
    if (bannerCategory) bannerCategory.textContent = work.category || '';
    
    // 更新描述
    const descriptionContainer = workModal.querySelector('.work-modal-description');
    if (descriptionContainer) {
        descriptionContainer.innerHTML = '';
        if (work.description && Array.isArray(work.description)) {
            work.description.forEach(paragraph => {
                const p = document.createElement('p');
                p.textContent = paragraph || '';
                descriptionContainer.appendChild(p);
            });
        }
    }
    
    // 更新详情
    const client = workModal.querySelector('.detail-item:nth-child(1) p');
    const year = workModal.querySelector('.detail-item:nth-child(2) p');
    const services = workModal.querySelector('.detail-item:nth-child(3) p');
    
    if (work.details) {
        if (client) client.textContent = work.details.client || '';
        if (year) year.textContent = work.details.year || '';
        if (services) services.textContent = work.details.services || '';
    }
    
    // 更新展示图片
    const gallery = workModal.querySelector('.work-showcase-gallery');
    if (gallery) {
        gallery.innerHTML = '';
        if (work.gallery && Array.isArray(work.gallery)) {
            work.gallery.forEach(imageUrl => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `<img src="${imageUrl || ''}" alt="${work.title || ''}">`;
                gallery.appendChild(galleryItem);
            });
        }
    }
    
    // 更新设计理念
    const conceptContent = workModal.querySelector('.work-concept-content');
    if (conceptContent) {
        conceptContent.innerHTML = '';
        if (work.concept && Array.isArray(work.concept)) {
            work.concept.forEach(paragraph => {
                const p = document.createElement('p');
                p.textContent = paragraph || '';
                conceptContent.appendChild(p);
            });
        }
    }
};

// 打开作品弹窗 - 全局可用
const openWorkModal = (workId) => {
    // 检查弹窗元素是否已初始化
    if (!workModal) {
        console.warn('作品弹窗尚未初始化');
        return;
    }
    
    const work = workData[workId];
    if (!work) return;
    
    // 更新弹窗内容
    updateWorkModalContent(work);
    
    // 显示弹窗
    workModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // 添加淡入效果
    setTimeout(() => {
        workModal.style.opacity = '1';
    }, 10);
};

// 关闭作品弹窗 - 全局可用
const closeWorkModal = () => {
    if (!workModal) return;
    
    workModal.style.opacity = '0';
    
    // 等待动画结束后隐藏弹窗
    setTimeout(() => {
        workModal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
};

// 初始化作品弹窗功能
const initWorkModal = () => {
    // 获取弹窗元素
    workModal = document.getElementById('workModal');
    workModalCloseBtn = document.querySelector('.work-modal-close');
    
    // 检查弹窗元素是否存在
    if (!workModal || !workModalCloseBtn) {
        console.warn('作品弹窗元素缺失，跳过初始化');
        return;
    }
    
    // 点击关闭按钮关闭弹窗
    workModalCloseBtn.addEventListener('click', closeWorkModal);
    
    // 点击弹窗外部关闭弹窗
    workModal.addEventListener('click', (e) => {
        if (e.target === workModal) {
            closeWorkModal();
        }
    });
    
    // 按下ESC键关闭弹窗
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && workModal.style.display === 'block') {
            closeWorkModal();
        }
    });
};

// 获取音乐设置
const getMusicSettings = () => {
        // 默认音乐设置
        return {
            enabled: true,
            volume: 70,
            autoPlay: true,
            url: 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/aigei_com.mp3?v=1767831280',
            name: 'BGM'
        };
    ;
    ;
    ;
    ;
    ;
    ;
};

// 初始化音乐播放器
const initMusicPlayer = () => {
    try {
        // 获取所有需要的DOM元素
        const audioPlayer = document.getElementById('audioPlayer');
        const volumeSlider = document.getElementById('volumeSlider');
        const volumeValue = document.getElementById('volumeValue');
        const musicPlayer = document.getElementById('musicPlayer');
        const musicToggle = document.getElementById('musicToggle');
        const musicPlay = document.getElementById('musicPlay');
        const musicPrev = document.getElementById('musicPrev');
        const musicNext = document.getElementById('musicNext');
        const musicName = document.getElementById('musicName');
        const musicProgressBar = document.getElementById('musicProgressBar');
        const musicProgress = document.getElementById('musicProgress');
        const playIcon = document.getElementById('playIcon');
        const pauseIcon = document.getElementById('pauseIcon');
        const currentTimeEl = document.getElementById('currentTime');
        const totalTimeEl = document.getElementById('totalTime');
        
        // 检查必要元素是否存在
        if (!audioPlayer || !volumeSlider || !volumeValue || !musicPlayer || !musicToggle || !musicPlay) {
            console.warn('音乐播放器元素缺失，跳过初始化');
            return;
        }
        
        let musicSettings = getMusicSettings();
        let isPlaying = false;
        
        // 设置初始音量
        const initialVolume = musicSettings.volume / 100;
        audioPlayer.volume = initialVolume;
        volumeSlider.value = musicSettings.volume;
        volumeValue.textContent = musicSettings.volume + '%';
        
        // 默认显示控制按钮
        musicPlayer.classList.add('expanded');
        
        // 播放/暂停控制（音乐按钮直接控制）
        const togglePlayPause = () => {
            isPlaying ? pauseMusic() : playMusic();
        };
        
        // 音乐按钮控制面板显示/隐藏
        musicToggle.addEventListener('click', () => {
            const musicPanel = document.getElementById('musicPanel');
            musicPanel?.classList.toggle('open');
        });
        
        // 播放/暂停按钮控制播放状态
        musicPlay.addEventListener('click', togglePlayPause);
        
        // 由于只有一首歌，上一首和下一首按钮可以隐藏或禁用
        musicPrev?.style.setProperty('display', 'none');
        musicNext?.style.setProperty('display', 'none');
        
        // 如果音乐未启用，隐藏播放器
        if (!musicSettings.enabled) {
            musicPlayer.style.display = 'none';
            return;
        }
        
        // 加载音乐
        const loadMusic = () => {
            audioPlayer.src = musicSettings.url;
            musicName && (musicName.textContent = musicSettings.name);
            musicProgressBar?.style.setProperty('width', '0%');
            // 初始化图标状态
            playIcon?.style.setProperty('display', 'block');
            pauseIcon?.style.setProperty('display', 'none');
            isPlaying = false;
        };
        
        // 尝试自动播放音乐
        const tryAutoPlay = () => {
            if (musicSettings.autoPlay) {
                // 直接尝试自动播放
                audioPlayer.play().then(() => {
                    isPlaying = true;
                    playIcon?.style.setProperty('display', 'none');
                    pauseIcon?.style.setProperty('display', 'block');
                }).catch(() => {
                    // 如果失败，设置用户交互监听
                    console.log('自动播放失败，等待用户交互...');
                    // 添加所有可能的用户交互事件
                    const userEvents = ['click', 'touchstart', 'keydown', 'mousemove'];
                    
                    const playOnUserInteraction = () => {
                        audioPlayer.play().then(() => {
                            isPlaying = true;
                            playIcon?.style.setProperty('display', 'none');
                            pauseIcon?.style.setProperty('display', 'block');
                            // 移除所有事件监听器
                            userEvents.forEach(event => {
                                document.removeEventListener(event, playOnUserInteraction);
                            });
                        }).catch(error => {
                            console.log('播放失败:', error);
                        });
                    };
                    
                    // 添加事件监听器
                    userEvents.forEach(event => {
                        document.addEventListener(event, playOnUserInteraction, { once: true });
                    });
                });
            }
        };
        
        // 音量控制
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            audioPlayer.volume = volume;
            volumeValue.textContent = e.target.value + '%';
        });
        
        // 进度条点击跳转
        musicProgress?.addEventListener('click', (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            if (audioPlayer.duration) {
                audioPlayer.currentTime = percent * audioPlayer.duration;
            }
        });
        
        // 时间格式化函数，将秒数转换为 MM:SS 格式
        const formatTime = (seconds) => {
            if (isNaN(seconds) || seconds < 0) {
                return '0:00';
            }
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        };
        
        // 更新进度条和当前时间
        audioPlayer.addEventListener('timeupdate', () => {
            if (audioPlayer.duration && musicProgressBar) {
                const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                musicProgressBar.style.width = percent + '%';
            }
            
            // 更新当前时间
            currentTimeEl && (currentTimeEl.textContent = formatTime(audioPlayer.currentTime));
        });
        
        // 音乐加载完成后更新总时间
        audioPlayer.addEventListener('loadedmetadata', () => {
            totalTimeEl && (totalTimeEl.textContent = formatTime(audioPlayer.duration));
        });
        
        // 音乐加载完成后更新总时间（兼容不同浏览器）
        audioPlayer.addEventListener('loadeddata', () => {
            if (totalTimeEl && !isNaN(audioPlayer.duration)) {
                totalTimeEl.textContent = formatTime(audioPlayer.duration);
            }
        });
        
        // 播放音乐
        const playMusic = () => {
            audioPlayer.play().catch(error => {
                console.log('播放失败:', error);
            });
            isPlaying = true;
            playIcon?.style.setProperty('display', 'none');
            pauseIcon?.style.setProperty('display', 'block');
        };
        
        // 暂停音乐
        const pauseMusic = () => {
            audioPlayer.pause();
            isPlaying = false;
            playIcon?.style.setProperty('display', 'block');
            pauseIcon?.style.setProperty('display', 'none');
        };
        
        // 音乐播放结束
        audioPlayer.addEventListener('ended', () => {
            // 循环播放当前音乐
            audioPlayer.currentTime = 0;
            playMusic();
        });
        
        // 加载音乐
        loadMusic();
        
        // 尝试自动播放音乐
        tryAutoPlay();
    } catch (error) {
        console.error('音乐播放器初始化失败:', error);
        // 确保页面能继续加载
        pageLoaded = true;
        checkLoadingComplete();
    }
};