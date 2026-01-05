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
});

// Three.js 初始化函数
function initThreeJS() {
    // 创建场景
    const scene = new THREE.Scene(); 
    
    // 创建相机
    const camera = new THREE.PerspectiveCamera( 
        60, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000 
    );
    camera.position.z = 5;
    
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#webgl'), 
        antialias: true, 
        alpha: true
    });
    
    // 设置渲染器大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // 添加梵高星空背景
    const createStarfieldBackground = () => {
        // 创建平面几何体作为背景
        const geometry = new THREE.PlaneGeometry(20, 20, 100, 100);
        
        // 梵高星空着色器材质
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0.0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
            },
            vertexShader: `
                uniform float uTime;
                uniform vec2 uMouse;
                uniform vec2 uResolution;
                
                varying vec2 vUv;
                varying vec3 vNormal;
                
                void main() {
                    vUv = uv;
                    vNormal = normal;
                    
                    vec3 pos = position;
                    
                    // 鼠标驱动的水波纹效果
                    vec2 mouse = (uMouse / uResolution - 0.5) * 2.0;
                    float dist = distance(uv, mouse + 0.5);
                    float wave = sin(dist * 10.0 - uTime * 2.0) * 0.1;
                    pos.z += wave * 0.5;
                    
                    // 液化效果 - 随机扰动
                    pos.x += sin(uv.y * 20.0 + uTime * 0.5) * 0.1;
                    pos.y += sin(uv.x * 20.0 + uTime * 0.3) * 0.1;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform vec2 uMouse;
                
                varying vec2 vUv;
                varying vec3 vNormal;
                
                // 简易噪声函数
                float noise(vec2 p) {
                    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 2.0 - 1.0;
                }
                
                // 分形噪声
                float fractalNoise(vec2 p) {
                    float sum = 0.0;
                    float amplitude = 1.0;
                    float frequency = 1.0;
                    
                    for (int i = 0; i < 5; i++) {
                        sum += noise(p * frequency) * amplitude;
                        amplitude *= 0.5;
                        frequency *= 2.0;
                    }
                    
                    return sum;
                }
                
                void main() {
                    vec2 uv = vUv;
                    
                    // 梵高星空色彩
                    vec3 color = vec3(0.0, 0.0, 0.1); // 深蓝背景
                    
                    // 星空噪波
                    float starNoise = fractalNoise(uv * 10.0 + uTime * 0.1);
                    color += vec3(starNoise * 0.5 + 0.5) * 0.3;
                    
                    // 旋涡效果
                    vec2 center = uv - 0.5;
                    float angle = atan(center.y, center.x);
                    float radius = length(center);
                    
                    // 梵高风格的色彩渐变
                    vec3 swirlColor1 = vec3(0.8, 0.1, 0.5); // 粉红
                    vec3 swirlColor2 = vec3(0.1, 0.2, 0.8); // 蓝紫
                    vec3 swirlColor3 = vec3(0.1, 0.5, 0.8); // 蓝色
                    
                    // 根据角度和半径混合颜色
                    float swirl = sin(angle * 5.0 - radius * 20.0 - uTime * 1.0) * 0.5 + 0.5;
                    vec3 mixedColor = mix(swirlColor1, swirlColor2, swirl);
                    mixedColor = mix(mixedColor, swirlColor3, sin(radius * 10.0) * 0.5 + 0.5);
                    
                    // 添加色彩到背景
                    color += mixedColor * (1.0 - radius) * 0.5;
                    
                    // 液化扭曲效果
                    color.r += sin(uv.x * 5.0 + uTime * 0.5) * 0.1;
                    color.g += cos(uv.y * 5.0 + uTime * 0.3) * 0.1;
                    color.b += sin(uv.x * uv.y * 20.0 + uTime * 0.7) * 0.1;
                    
                    gl_FragColor = vec4(color, 1.0);
                }
            `,
            side: THREE.DoubleSide
        });
        
        const plane = new THREE.Mesh(geometry, material);
        plane.position.z = -5;
        
        return plane;
    };
    
    const starfield = createStarfieldBackground();
    scene.add(starfield);
    
    // 添加粒子云
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(3000);
    
    for (let i = 0; i < positions.length; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
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
    
    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // 添加点光源
    const pointLight = new THREE.PointLight(0xff0000, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    

    
    // 鼠标位置变量
    let mouseX = 0;
    let mouseY = 0;
    
    // 添加鼠标移动事件监听
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        
        // 获取当前时间
        const time = Date.now() * 0.001;
        
        // 更新星空背景的uniforms
        starfield.material.uniforms.uTime.value = time;
        starfield.material.uniforms.uMouse.value.set(mouseX * window.innerWidth, mouseY * window.innerHeight);
        starfield.material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
        
        // 旋转星空背景
        starfield.rotation.x += 0.001;
        starfield.rotation.y += 0.002;
        
        // 粒子云动画
        points.rotation.x += 0.005;
        points.rotation.y += 0.005;
        

        
        // 鼠标驱动摄像机
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        
        // 确保摄像机始终看向原点
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