// 确保页面完全加载后执行
document.addEventListener('DOMContentLoaded', function() {
    // 为所有锚点链接添加平滑滚动功能
    addSmoothScroll();
    
    // 添加滚动动画效果
    addScrollAnimations();
    
    // 添加浮动导航点高亮功能
    addFloatingNavHighlight();
    
    // 添加作品项悬停效果
    addWorkItemEffects();
    
    // 添加技能项悬停效果
    addSkillItemEffects();
    
    // 添加表单提交效果
    addFormSubmissionEffect();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化Three.js 3D场景
    initThreeJS();
    
    // 初始化作品弹出层功能
    initWorkModal();
});

// Three.js 初始化函数
function initThreeJS() {
    // 创建场景
    const scene = new THREE.Scene(); 
    
    // 创建相机
    const camera = new THREE.PerspectiveCamera( 
        80, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000 
    );
    camera.position.z = 8;
    
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#webgl'), 
        antialias: true, 
        alpha: true
    });
    
    // 设置渲染器大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // 添加粒子云
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(3000);
    
    for (let i = 0; i < positions.length; i += 3) {
        // 粒子分布在整个场景中
        positions[i] = (Math.random() - 0.5) * 40; // x: -20 到 20
        positions[i + 1] = (Math.random() - 0.5) * 30; // y: -15 到 15
        positions[i + 2] = (Math.random() - 0.5) * 20; // z: -10 到 10
    }
    
    particleGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    );
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xffffff
    });
    
    const points = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(points);
    
    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        
        // 粒子云动画
        points.rotation.x += 0.005;
        points.rotation.y += 0.005;
        
        // 固定摄像机
        camera.lookAt(0, 0, 0);
        
        // 渲染场景
        renderer.render(scene, camera);
    }
    
    // 开始动画
    animate();
    
    // 处理窗口大小变化
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

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

// 滚动动画效果
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // 为所有需要动画的元素添加观察
    const animateElements = document.querySelectorAll('.work-item, .skill-card, .contact-item, .form-group, .about-paragraph');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// 浮动导航点高亮功能
function addFloatingNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navDots = document.querySelectorAll('.nav-dot');
    
    // 滚动事件监听
    window.addEventListener('scroll', function() {
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
}

// 作品项悬停效果
function addWorkItemEffects() {
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(item => {
        // 鼠标进入效果已在CSS中实现
        // 鼠标离开效果已在CSS中实现
    });
}

// 技能项悬停效果
function addSkillItemEffects() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        // 鼠标进入效果已在CSS中实现
        // 鼠标离开效果已在CSS中实现
    });
}

// 表单提交效果
function addFormSubmissionEffect() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 添加提交动画
            const submitButton = this.querySelector('.form-submit');
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
}

// 初始化滚动动画
function initScrollAnimations() {
    // 监听滚动事件，为元素添加动画
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        // 为英雄区域形状添加视差效果
        const shapes = document.querySelectorAll('.hero-shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * speed * 0.1}deg)`;
        });
        
        // 为浮动导航点添加淡入效果
        const floatingNav = document.querySelector('.floating-nav');
        if (scrollY > 200) {
            floatingNav.style.opacity = '1';
        } else {
            floatingNav.style.opacity = '0';
        }
    });
    
    // 初始设置浮动导航点的不透明度
document.querySelector('.floating-nav').style.opacity = '0';
document.querySelector('.floating-nav').style.transition = 'opacity 0.5s ease';
}

// 作品数据
const workData = {
    'work-1': {
        title: 'Brand Design Project',
        category: 'Graphic Design',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        description: [
            'This is a comprehensive brand design project for a modern startup. The project includes logo design, brand identity, packaging design, and marketing materials.',
            'The design concept revolves around minimalism and modern aesthetics, using a clean color palette and geometric shapes to create a strong visual identity.'
        ],
        details: {
            client: 'Tech Startup Inc.',
            year: '2024',
            services: 'Logo Design, Brand Identity, Packaging'
        }
    },
    'work-3': {
        title: 'AI Generated Art Collection',
        category: 'AI Design',
        image: 'https://images.unsplash.com/photo-1677442136607-d81b6006d972?ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80',
        description: [
            'This collection showcases the potential of AI-generated art. Using advanced machine learning algorithms, we created a series of unique and captivating visual artworks.',
            'Each piece combines human creativity with AI capabilities, resulting in stunning visuals that push the boundaries of traditional art.'
        ],
        details: {
            client: 'Art Gallery Exhibition',
            year: '2024',
            services: 'AI Art Generation, Digital Artwork'
        }
    },
    'work-4': {
        title: 'Modern Website Design',
        category: 'Web Design',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        description: [
            'A modern, responsive website design for a creative agency. The design focuses on user experience and visual appeal, with a clean layout and smooth animations.',
            'The website is fully responsive, ensuring optimal viewing experience across all devices and screen sizes.'
        ],
        details: {
            client: 'Creative Agency',
            year: '2024',
            services: 'Web Design, UI/UX Design, Responsive Development'
        }
    },
    'work-5': {
        title: 'Illustration Design Collection',
        category: 'Creative Design',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        description: [
                'A collection of creative illustrations for various projects. The illustrations feature a unique style with bold colors and dynamic compositions.',
                'The project includes editorial illustrations, children\'s book illustrations, and concept art for video games.'
            ],
        details: {
            client: 'Multiple Clients',
            year: '2024',
            services: 'Illustration, Concept Art, Digital Painting'
        }
    },
    'work-6': {
        title: '3D Design Portfolio',
        category: '3D Design',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        description: [
            'A showcase of 3D design projects, including product visualization, architectural rendering, and character design.',
            'Using industry-standard 3D software, we created realistic and visually stunning 3D models and renderings.'
        ],
        details: {
            client: 'Design Studio',
            year: '2024',
            services: '3D Modeling, Rendering, Product Visualization'
        }
    }
};

// 作品弹出层功能
function initWorkModal() {
    // 获取DOM元素
    const modal = document.getElementById('workModal');
    const closeBtn = document.querySelector('.work-modal-close');
    const workItems = document.querySelectorAll('.work-item');
    
    // 获取模态框内的元素
    const modalImage = modal.querySelector('.work-modal-image img');
    const modalTitle = modal.querySelector('.work-modal-title');
    const modalCategory = modal.querySelector('.work-modal-category');
    const modalDescription = modal.querySelector('.work-modal-description');
    const modalDetails = modal.querySelector('.work-modal-details');
    
    // 更新模态框内容
    function updateModalContent(workId) {
        const data = workData[workId];
        if (data) {
            // 更新Banner区域
            const bannerImage = modal.querySelector('.work-banner-image img');
            const bannerTitle = modal.querySelector('.work-banner-title');
            const bannerCategory = modal.querySelector('.work-banner-category');
            
            if (bannerImage) bannerImage.src = data.image;
            if (bannerImage) bannerImage.alt = data.title;
            if (bannerTitle) bannerTitle.textContent = data.title;
            if (bannerCategory) bannerCategory.textContent = data.category;
            
            // 更新详情页标题和分类
            if (modalTitle) modalTitle.textContent = data.title;
            if (modalCategory) modalCategory.textContent = data.category;
            
            // 更新描述
            if (modalDescription) {
                modalDescription.innerHTML = '';
                data.description.forEach(paragraph => {
                    const p = document.createElement('p');
                    p.textContent = paragraph;
                    modalDescription.appendChild(p);
                });
            }
            
            // 更新详细信息
            if (modalDetails) {
                modalDetails.innerHTML = `
                    <div class="detail-item">
                        <h4>Client</h4>
                        <p>${data.details.client}</p>
                    </div>
                    <div class="detail-item">
                        <h4>Year</h4>
                        <p>${data.details.year}</p>
                    </div>
                    <div class="detail-item">
                        <h4>Services</h4>
                        <p>${data.details.services}</p>
                    </div>
                `;
            }
            
            // 更新项目展示图片（使用相同图片的不同尺寸或相关图片）
            const galleryItems = modal.querySelectorAll('.gallery-item img');
            if (galleryItems.length > 0) {
                galleryItems.forEach((item, index) => {
                    // 为每个画廊项使用相同的主图，实际项目中可以使用不同图片
                    item.src = data.image;
                    item.alt = `${data.title} - Image ${index + 1}`;
                });
            }
        }
    }
    
    // 点击作品模块打开弹出层
    workItems.forEach(item => {
        item.addEventListener('click', function() {
            const workId = this.classList[2]; // 获取work-1, work-3等类名
            updateModalContent(workId);
            modal.classList.add('show');
            // 禁止页面滚动
            document.body.style.overflow = 'hidden';
        });
    });
    
    // 点击关闭按钮关闭弹出层
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('show');
            // 恢复页面滚动
            document.body.style.overflow = 'auto';
        });
    }
    
    // 点击弹出层外部关闭弹出层
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                // 恢复页面滚动
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // 按ESC键关闭弹出层
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            // 恢复页面滚动
            document.body.style.overflow = 'auto';
        }
    });
}