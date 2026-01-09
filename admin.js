const admin = (function() {
    const STORAGE_KEY = 'site_content_data';
    let currentData = {};

    const defaultData = {
        'carousel-1': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'carousel-2': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1_f48883c8-2168-400b-a521-e01e484b1a83.png?v=1767687196',
        'carousel-3': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/abc7a5ac29b4d8d283e2acc0cbecbe61.jpg?v=1767687194',
        'carousel-4': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/0c863d8f25fa3543348b1b79a11de66b_908285bb-f765-4efe-8466-ff7321283a05.jpg?v=1767687285',
        'carousel-5': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/0c863d8f25fa3543348b1b79a11de66b.jpg?v=1767687279',
        'hero-title-1': 'Design Without Boundaries',
        'hero-title-2': 'Boundless Creativity',
        'hero-subtitle': 'A Design Journey Beyond the Norm',
        'hero-cta': 'Start Exploring',
        'hero-edge-top-1': 'Graphic Designer',
        'hero-edge-top-2': 'Visual Communication Design',
        'hero-edge-top-3': '2021 – PRESENT',
        'hero-edge-bottom-1': 'Keep the Passion',
        'hero-edge-bottom-2': 'World Peace',
        'hero-edge-bottom-3': 'Happiness Every Day',
        'work-1-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'work-1-title': 'Brand Design',
        'work-1-category': 'Graphic Design',
        'work-3-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'work-3-title': 'AI Generated Design',
        'work-3-category': 'AI Design',
        'work-4-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'work-4-title': 'Website Design',
        'work-4-category': 'Web Design',
        'work-5-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'work-5-title': 'Illustration Design',
        'work-5-category': 'Illustration Design',
        'work-6-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'work-6-title': '3D Design',
        'work-6-category': '3D Design',
        'about-image': 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        'about-text-1': 'I am a passionate designer who specializes in creating unique and impactful design works. I believe that design is not just about visual appeal but also about solving problems and conveying emotions.',
        'about-text-2': 'My design philosophy is to combine innovation with simplicity, breaking the norms and creating memorable design experiences. I constantly explore new design techniques and trends to keep my works fresh and forward-looking.',
        'about-text-3': 'I excel at translating complex concepts into clear and powerful visual language, using design to tell stories and evoke emotions.',
        'skills-title': 'Professional Skills',
        'skills-subtitle': 'My design toolkit',
        'skill-1-title': 'Graphic Design',
        'skill-2-title': 'Web Design',
        'skill-3-title': 'Illustration Design',
        'skill-4-title': '3D Design',
        'contact-title': 'Contact Me',
        'contact-subtitle': 'Get in touch with me for design collaborations',
        'contact-email': 'design@example.com',
        'contact-phone': '+86 123 4567 8910',
        'social-1': 'Instagram',
        'social-2': 'Behance',
        'social-3': 'Dribbble',
        'form-name': 'Name',
        'form-email': 'Email',
        'form-message': 'Message',
        'form-submit': 'Send Message',
        'footer-text': '© 2026 Solo Design. All rights reserved.',
        
        'modal-1-banner': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'modal-1-title': 'Brand Design Project',
        'modal-1-category': '品牌设计',
        'modal-1-desc-1': 'This is a comprehensive brand design project for a modern startup. The project includes logo design, brand identity, packaging design, and marketing materials.',
        'modal-1-desc-2': 'The design concept revolves around minimalism and modern aesthetics, using a clean color palette and geometric shapes to create a strong visual identity.',
        'modal-1-client': 'Tech Startup Inc.',
        'modal-1-year': '2024',
        'modal-1-services': 'Logo Design, Brand Identity, Packaging',
        'modal-1-gallery-1': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'modal-1-gallery-2': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'modal-1-gallery-3': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'modal-1-concept-1': 'The design concept for this project was inspired by modern minimalism and geometric aesthetics. We wanted to create a brand identity that is both timeless and contemporary, with a strong visual impact.',
        'modal-1-concept-2': 'The color palette was carefully chosen to reflect the brand\'s values and personality, using clean and bold colors that create a strong visual contrast.',
        'modal-1-concept-3': 'The typography selection was based on readability and visual hierarchy, with a modern sans-serif font that complements the geometric shapes used throughout the design.',
        
        'modal-3-banner': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'modal-3-title': 'AI-generated Art Project',
        'modal-3-category': 'AI设计',
        'modal-3-desc-1': 'This project explores the intersection of artificial intelligence and creative design. Using advanced AI algorithms, we generated unique visual compositions that challenge traditional design boundaries.',
        'modal-3-desc-2': 'The project pushes the limits of what\'s possible with AI-generated art, creating stunning visuals that combine human creativity with machine intelligence.',
        'modal-3-client': 'AI Creative Lab',
        'modal-3-year': '2024',
        'modal-3-services': 'AI Art Generation, Creative Direction',
        'modal-3-gallery-1': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'modal-3-gallery-2': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'modal-3-gallery-3': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'modal-3-concept-1': 'The core concept behind this project is to explore the creative potential of artificial intelligence as a collaborative tool for designers.',
        'modal-3-concept-2': 'We used a combination of generative adversarial networks (GANs) and diffusion models to create unique visual compositions that blend human intent with machine creativity.',
        'modal-3-concept-3': 'The result is a series of artworks that challenge our perception of what constitutes "creative" work in the age of AI.',
        
        'modal-4-banner': 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'modal-4-title': 'Modern Website Design',
        'modal-4-category': '网页设计',
        'modal-4-desc-1': 'A modern, responsive website design for a creative agency. This project focuses on clean typography, smooth animations, and an intuitive user experience.',
        'modal-4-desc-2': 'The design incorporates a minimalist aesthetic with bold visual elements to create a memorable impression.',
        'modal-4-client': 'Creative Agency Inc.',
        'modal-4-year': '2024',
        'modal-4-services': 'Website Design, UI/UX, Frontend Development',
        'modal-4-gallery-1': 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'modal-4-gallery-2': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'modal-4-gallery-3': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'modal-4-concept-1': 'The design concept was centered around creating a digital experience that reflects the agency\'s creative approach.',
        'modal-4-concept-2': 'We used a grid-based layout to create visual hierarchy, with ample white space to let the content breathe.',
        'modal-4-concept-3': 'The color scheme was kept minimal, with accent colors used strategically to draw attention to important elements.',
        
        'modal-5-banner': 'https://images.unsplash.com/photo-1603970484243-63f290002d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        'modal-5-title': 'Creative Illustration',
        'modal-5-category': '插画设计',
        'modal-5-desc-1': 'A series of creative illustrations for a children\'s book. The project focuses on vibrant colors, playful characters, and engaging storytelling.',
        'modal-5-desc-2': 'Each illustration was carefully crafted to capture the imagination of young readers while supporting the book\'s narrative.',
        'modal-5-client': 'Children\'s Book Publisher',
        'modal-5-year': '2024',
        'modal-5-services': 'Illustration, Character Design, Storyboarding',
        'modal-5-gallery-1': 'https://images.unsplash.com/photo-1603970484243-63f290002d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        'modal-5-gallery-2': 'https://images.unsplash.com/photo-1599677885500-223a6d98d88c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        'modal-5-gallery-3': 'https://images.unsplash.com/photo-1513639721868-2c83d12c9288?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        'modal-5-concept-1': 'The illustration style was inspired by classic children\'s book art with a modern twist.',
        'modal-5-concept-2': 'We used bold, saturated colors to create a sense of wonder and excitement, while keeping the characters relatable and expressive.',
        'modal-5-concept-3': 'Each scene was composed to guide the reader\'s eye through the story, creating a cohesive narrative experience.',
        
        'modal-6-banner': 'https://images.unsplash.com/photo-1556661718-86b3f05a636d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'modal-6-title': '3D Product Design',
        'modal-6-category': '3D设计',
        'modal-6-desc-1': 'A 3D product design project for a consumer electronics company. The project includes product modeling, texturing, and realistic rendering.',
        'modal-6-desc-2': 'The design focuses on sleek, modern aesthetics with a strong emphasis on functionality and user experience.',
        'modal-6-client': 'Electronics Company Ltd.',
        'modal-6-year': '2024',
        'modal-6-services': '3D Modeling, Product Design, Rendering',
        'modal-6-gallery-1': 'https://images.unsplash.com/photo-1556661718-86b3f05a636d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'modal-6-gallery-2': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'modal-6-gallery-3': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'modal-6-concept-1': 'The design concept was centered around creating a product that is both aesthetically pleasing and highly functional.',
        'modal-6-concept-2': 'We used parametric modeling techniques to create smooth, organic shapes that feel natural to hold and use.',
        'modal-6-concept-3': 'The materials and textures were carefully chosen to create a premium look and feel, with realistic rendering that showcases the product\'s features.',
        
        // 音乐设置
        'music-name': '背景音乐',
        'music-url': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        'music-auto-play': 'true',
        'music-volume': '70',
        'music-enabled': 'true'
    };

    function loadData() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                // 从localStorage加载数据，并合并默认数据，确保所有字段都存在
                currentData = { ...defaultData, ...JSON.parse(saved) };
            } else {
                currentData = { ...defaultData };
            }
        } catch (e) {
            console.error('Failed to load data:', e);
            currentData = { ...defaultData };
        }
    }

    function saveData() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
            return true;
        } catch (e) {
            console.error('Failed to save data:', e);
            return false;
        }
    }

    function initForm() {
        const inputs = document.querySelectorAll('[data-field]');
        inputs.forEach(input => {
            const field = input.dataset.field;
            if (currentData[field] !== undefined) {
                input.value = currentData[field];
            }
            // 移除可能存在的旧事件监听器，避免重复绑定
            input.removeEventListener('input', handleInput);
            input.removeEventListener('change', handleInput);
            // 添加新的事件监听器
            input.addEventListener('input', handleInput);
            input.addEventListener('change', handleInput);
        });
    }

    function handleInput(e) {
        const field = e.target.dataset.field;
        const value = e.target.value;
        currentData[field] = value;
        updateImagePreview(e.target);
    }

    function updateImagePreview(input) {
        const previewContainer = input.parentElement.querySelector('.image-preview') || input.closest('.image-input-wrapper')?.querySelector('.image-preview');
        if (!previewContainer) return;

        const url = input.value.trim();
        if (url) {
            previewContainer.innerHTML = '<img src="" alt="预览">';
            previewContainer.classList.remove('empty');
            previewContainer.classList.add('loading');

            const img = previewContainer.querySelector('img');
            img.onload = function() {
                previewContainer.classList.remove('loading');
                previewContainer.classList.add('has-image');
            };
            img.onerror = function() {
                previewContainer.innerHTML = '<span style="color: var(--danger-color); font-size: 0.75rem;">加载失败</span>';
                previewContainer.classList.remove('loading', 'has-image');
                previewContainer.classList.add('empty');
            };
            img.src = url;
        } else {
            previewContainer.innerHTML = '';
            previewContainer.classList.remove('has-image', 'loading');
            previewContainer.classList.add('empty');
        }
    }

    function initImagePreviews() {
        const imageInputs = document.querySelectorAll('.image-url-input');
        imageInputs.forEach(input => {
            updateImagePreview(input);
        });
    }

    function initNavigation() {
        const navItems = document.querySelectorAll('.admin-nav li');
        const sections = document.querySelectorAll('.admin-section');

        navItems.forEach(item => {
            // 移除可能存在的旧事件监听器，避免重复绑定
            const handleNavClick = () => {
                const target = item.dataset.section;

                // 更新导航状态
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                // 更新显示的区域
                sections.forEach(section => {
                    section.classList.toggle('active', section.id === `${target}-section`);
                });
            };

            item.removeEventListener('click', handleNavClick);
            item.addEventListener('click', handleNavClick);
        });
    }

    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast ' + type;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    function applyChangesToPage() {
        // 更新轮播图片
        for (let i = 1; i <= 5; i++) {
            const selector = `.carousel-slide-${i}`;
            const imageUrl = currentData[`carousel-${i}`] || '';
            document.querySelectorAll(selector).forEach(el => {
                el.style.backgroundImage = `url('${imageUrl}')`;
            });
        }

        // 更新英雄区域文本
        const heroTitleLines = document.querySelectorAll('.hero-title .title-line');
        if (heroTitleLines[0]) heroTitleLines[0].textContent = currentData['hero-title-1'] || '';
        if (heroTitleLines[1]) heroTitleLines[1].textContent = currentData['hero-title-2'] || '';
        document.querySelectorAll('.hero-subtitle').forEach(el => {
            el.textContent = currentData['hero-subtitle'] || '';
        });
        document.querySelectorAll('.hero-cta span').forEach(el => {
            el.textContent = currentData['hero-cta'] || '';
        });

        // 更新边缘文本
        const edgeTop = document.querySelectorAll('.edge-text-right p');
        const edgeBottom = document.querySelectorAll('.edge-text-bottom p');
        const edgeTopData = ['hero-edge-top-1', 'hero-edge-top-2', 'hero-edge-top-3'];
        const edgeBottomData = ['hero-edge-bottom-1', 'hero-edge-bottom-2', 'hero-edge-bottom-3'];

        edgeTop.forEach((el, index) => {
            if (el) el.textContent = currentData[edgeTopData[index]] || '';
        });

        edgeBottom.forEach((el, index) => {
            if (el) el.textContent = currentData[edgeBottomData[index]] || '';
        });

        // 更新作品展示
        // 动态获取所有作品ID，与generateWorksHTML函数保持一致
        const modalKeys = Object.keys(currentData).filter(key => key.startsWith('modal-') && key.endsWith('-title'));
        const workIds = modalKeys.map(key => {
            const num = key.split('-')[1];
            return `work-${num}`;
        });
        
        workIds.forEach(workId => {
            const imageUrl = currentData[`${workId}-image`] || '';
            const title = currentData[`${workId}-title`] || '';
            const category = currentData[`${workId}-category`] || '';
            
            document.querySelectorAll(`${workId} .work-image img`).forEach(el => {
                el.src = imageUrl;
            });
            document.querySelectorAll(`${workId} .work-title`).forEach(el => {
                el.textContent = title;
            });
            document.querySelectorAll(`${workId} .work-category`).forEach(el => {
                el.textContent = category;
            });
        });

        // 更新关于我
        document.querySelectorAll('.about-image img').forEach(el => {
            el.src = currentData['about-image'] || '';
        });

        const aboutParagraphs = document.querySelectorAll('.about-paragraph');
        for (let i = 1; i <= 3; i++) {
            if (aboutParagraphs[i - 1]) {
                aboutParagraphs[i - 1].textContent = currentData[`about-text-${i}`] || '';
            }
        }

        // 更新技能区域
        document.querySelectorAll('.skills-header .section-heading').forEach(el => {
            el.textContent = currentData['skills-title'] || '';
        });
        document.querySelectorAll('.skills-header .section-subheading').forEach(el => {
            el.textContent = currentData['skills-subtitle'] || '';
        });

        for (let i = 1; i <= 4; i++) {
            const skillTitle = currentData[`skill-${i}-title`] || '';
            document.querySelectorAll(`.skill-${i} .skill-title`).forEach(el => {
                el.textContent = skillTitle;
            });
        }

        // 更新联系区域
        document.querySelectorAll('.contact-header .section-heading').forEach(el => {
            el.textContent = currentData['contact-title'] || '';
        });
        document.querySelectorAll('.contact-header .section-subheading').forEach(el => {
            el.textContent = currentData['contact-subtitle'] || '';
        });

        document.querySelectorAll('.contact-item:first-child .contact-text').forEach(el => {
            el.textContent = currentData['contact-email'] || '';
        });
        document.querySelectorAll('.contact-item:nth-child(2) .contact-text').forEach(el => {
            el.textContent = currentData['contact-phone'] || '';
        });

        // 更新社交媒体
        const socialLinks = document.querySelectorAll('.social-link');
        for (let i = 1; i <= 3; i++) {
            if (socialLinks[i - 1]) {
                socialLinks[i - 1].textContent = currentData[`social-${i}`] || '';
            }
        }

        // 更新表单
        const formLabels = {
            'form-name': 'name',
            'form-email': 'email',
            'form-message': 'message'
        };
        
        Object.entries(formLabels).forEach(([dataKey, labelFor]) => {
            document.querySelectorAll(`label[for="${labelFor}"]`).forEach(el => {
                el.textContent = currentData[dataKey] || '';
            });
        });
        
        document.querySelectorAll('.form-submit').forEach(el => {
            el.textContent = currentData['form-submit'] || '';
        });

        // 更新页脚
        document.querySelectorAll('.footer-text').forEach(el => {
            el.textContent = currentData['footer-text'] || '';
        });
    }

    // 初始化可折叠功能
    function initCollapsible() {
        const collapsibles = document.querySelectorAll('.collapsible');
        
        collapsibles.forEach(collapsible => {
            // 移除可能存在的旧事件监听器，避免重复绑定
            collapsible.removeEventListener('click', handleCollapsibleClick);
            // 添加新的事件监听器
            collapsible.addEventListener('click', handleCollapsibleClick);
            
            // 默认展开第一个作品
            const isFirstItem = collapsible.closest('.work-modal-item') === document.querySelector('.work-modal-item');
            if (isFirstItem) {
                const content = collapsible.nextElementSibling;
                if (content && content.classList.contains('collapsible-content')) {
                    content.classList.add('active');
                    const icon = collapsible.querySelector('.collapse-icon');
                    if (icon) {
                        icon.textContent = '▲';
                    }
                }
            }
        });
    }
    
    // 处理可折叠元素的点击事件
    function handleCollapsibleClick(e) {
        e.stopPropagation(); // 阻止事件冒泡
        const collapsible = e.currentTarget;
        // 切换内容显示/隐藏
        const content = collapsible.nextElementSibling;
        if (content && content.classList.contains('collapsible-content')) {
            content.classList.toggle('active');
            
            // 切换折叠图标方向
            const icon = collapsible.querySelector('.collapse-icon');
            if (icon) {
                icon.textContent = content.classList.contains('active') ? '▲' : '▼';
            }
        }
    }
    
    function init() {
        loadData();
        initForm();
        initImagePreviews();
        initNavigation();
        
        // 初始化作品分类
        initWorkCategories();
        
        // 初始化可折叠功能
        initCollapsible();
    }

    return {
        init: init,
        saveAll: function() {
            if (saveData()) {
                // 重新初始化表单以显示保存后的数据
                loadData();
                initForm();
                initImagePreviews();
                showToast('保存成功！');
            } else {
                showToast('保存失败！', 'error');
            }
        },
        preview: function() {
            applyChangesToPage();
            showToast('已应用预览效果，请查看前台页面');
            window.open('index.html', '_blank');
        },
        exportToCode: function() {
            const data = currentData;
            
            // 生成HTML轮播图片代码
            const carouselHTML = generateCarouselHTML(data);
            // 生成JavaScript代码
            const jsCode = generateJSCode(data);
            // 生成说明
            const instructions = generateInstructions();
            
            // 创建代码导出弹窗
            createExportModal(instructions, carouselHTML, jsCode);
        },
        oneClickSync: async function() {
            // 显示进度提示
            showProgressModal();
            
            try {
                // 步骤1：保存当前数据到localStorage
                updateProgress(0, '正在保存数据...');
                if (!saveData()) {
                    updateProgress(0, '数据保存失败，无法同步！', true);
                    showToast('数据保存失败，无法同步！', 'error');
                    setTimeout(hideProgressModal, 1500);
                    return;
                }
                
                updateProgress(25, '数据保存成功，正在生成HTML文件...');
                
                // 步骤2：生成完整的HTML、CSS和JS文件
                await generateAndDownloadFiles(currentData);
                
                updateProgress(100, '一键同步完成！已生成最新的HTML、CSS和JS文件');
                showToast('一键同步完成！已生成最新的HTML、CSS和JS文件');
            } catch (error) {
                updateProgress(0, `同步失败：${error.message}`, true);
                showToast(`同步失败：${error.message}`, 'error');
                console.error('一键同步失败:', error);
            } finally {
                // 3秒后隐藏进度提示
                setTimeout(hideProgressModal, 3000);
            }
        },
        addWorkModal: function() {
            // 添加新的作品弹窗
            // 动态获取所有作品ID，确保ID不重复
            // 查找所有以modal-开头且以-title结尾的数据键
            const modalKeys = Object.keys(currentData).filter(key => key.startsWith('modal-') && key.endsWith('-title'));
            const existingModalIds = modalKeys.map(key => parseInt(key.split('-')[1])).sort((a, b) => a - b);
            
            // 计算新的modal ID
            const newModalId = existingModalIds.length > 0 ? existingModalIds[existingModalIds.length - 1] + 1 : 1;
            const newWorkId = `work-${newModalId}`;
            
            // 获取当前激活的分类
            const activeCategoryBtn = document.querySelector('.category-nav-btn.active');
            let activeCategory = activeCategoryBtn ? activeCategoryBtn.dataset.category : '其他设计';
            
            // 如果当前是全部作品，默认使用其他设计分类
            const defaultCategory = activeCategory === 'all' ? '其他设计' : activeCategory;
            
            // 创建新的作品弹窗表单
            const newWorkModalItem = document.createElement('div');
            newWorkModalItem.className = 'work-modal-item';
            newWorkModalItem.dataset.work = newWorkId;
            
            // 构建分类选项HTML，默认选择当前激活的分类
            let categoryOptions = `
                <option value="">请选择分类</option>
                <option value="品牌设计" ${defaultCategory === '品牌设计' ? 'selected' : ''}>品牌设计</option>
                <option value="AI设计" ${defaultCategory === 'AI设计' ? 'selected' : ''}>AI设计</option>
                <option value="网页设计" ${defaultCategory === '网页设计' ? 'selected' : ''}>网页设计</option>
                <option value="插画设计" ${defaultCategory === '插画设计' ? 'selected' : ''}>插画设计</option>
                <option value="3D设计" ${defaultCategory === '3D设计' ? 'selected' : ''}>3D设计</option>
                <option value="其他设计" ${defaultCategory === '其他设计' ? 'selected' : ''}>其他设计</option>
            `;
            
            newWorkModalItem.innerHTML = `
                <div class="work-modal-header collapsible">
                    <h3>作品 ${newModalId} - New Work</h3>
                    <span class="collapse-icon">▼</span>
                </div>
                
                <div class="work-modal-content collapsible-content">
                    <div class="form-group">
                        <h4>Banner图片</h4>
                        <div class="image-input-wrapper">
                            <input type="text" class="image-url-input" data-field="modal-${newModalId}-banner" placeholder="Banner图片URL">
                            <div class="image-preview"></div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <h4>标题和分类</h4>
                        <input type="text" data-field="modal-${newModalId}-title" placeholder="作品标题">
                        <select data-field="modal-${newModalId}-category">
                            ${categoryOptions}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <h4>项目描述</h4>
                        <textarea data-field="modal-${newModalId}-desc-1" rows="3" placeholder="描述段落1"></textarea>
                        <textarea data-field="modal-${newModalId}-desc-2" rows="3" placeholder="描述段落2"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <h4>项目详情</h4>
                        <input type="text" data-field="modal-${newModalId}-client" placeholder="客户名称">
                        <input type="text" data-field="modal-${newModalId}-year" placeholder="年份">
                        <input type="text" data-field="modal-${newModalId}-services" placeholder="服务内容">
                    </div>
                    
                    <div class="form-group">
                        <h4>展示图片（3张）</h4>
                        <div class="image-input-wrapper">
                            <input type="text" class="image-url-input" data-field="modal-${newModalId}-gallery-1" placeholder="图片1 URL">
                            <div class="image-preview"></div>
                        </div>
                        <div class="image-input-wrapper">
                            <input type="text" class="image-url-input" data-field="modal-${newModalId}-gallery-2" placeholder="图片2 URL">
                            <div class="image-preview"></div>
                        </div>
                        <div class="image-input-wrapper">
                            <input type="text" class="image-url-input" data-field="modal-${newModalId}-gallery-3" placeholder="图片3 URL">
                            <div class="image-preview"></div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <h4>设计理念（3段）</h4>
                        <textarea data-field="modal-${newModalId}-concept-1" rows="3" placeholder="理念段落1"></textarea>
                        <textarea data-field="modal-${newModalId}-concept-2" rows="3" placeholder="理念段落2"></textarea>
                        <textarea data-field="modal-${newModalId}-concept-3" rows="3" placeholder="理念段落3"></textarea>
                    </div>
                </div>
            `;
            
            // 添加到当前激活的分类列表
            const activeCategoryList = document.querySelector(`.work-modal-list[data-category="${defaultCategory}"]`);
            if (activeCategoryList) {
                activeCategoryList.appendChild(newWorkModalItem);
            }
            
            // 同时添加到全部作品列表
            const allCategoryList = document.querySelector('.work-modal-list[data-category="all"]');
            if (allCategoryList) {
                // 克隆一个新的元素添加到全部作品列表
                const allCopy = newWorkModalItem.cloneNode(true);
                allCategoryList.appendChild(allCopy);
            }
            
            // 初始化新添加的表单和图片预览
            initForm();
            initImagePreviews();
            
            // 为新作品添加初始数据到currentData对象中
            currentData[`modal-${newModalId}-title`] = '';
            currentData[`modal-${newModalId}-category`] = defaultCategory;
            currentData[`modal-${newModalId}-banner`] = '';
            currentData[`modal-${newModalId}-desc-1`] = '';
            currentData[`modal-${newModalId}-desc-2`] = '';
            currentData[`modal-${newModalId}-client`] = '';
            currentData[`modal-${newModalId}-year`] = '';
            currentData[`modal-${newModalId}-services`] = '';
            currentData[`modal-${newModalId}-gallery-1`] = '';
            currentData[`modal-${newModalId}-gallery-2`] = '';
            currentData[`modal-${newModalId}-gallery-3`] = '';
            currentData[`modal-${newModalId}-concept-1`] = '';
            currentData[`modal-${newModalId}-concept-2`] = '';
            currentData[`modal-${newModalId}-concept-3`] = '';
            
            // 更新分类计数
            updateCategoryCounts();
            
            // 显示成功提示
            showToast('已添加新作品弹窗！');
            
            // 初始化可折叠功能
            initCollapsible();
        },
        filterWorkModalByCategory: function(category) {
            // 按分类筛选作品弹窗
            const workModalItems = document.querySelectorAll('.work-modal-item');
            
            workModalItems.forEach(item => {
                // 获取作品的分类
                const categoryField = item.querySelector(`[data-field*="-category"]`);
                const workCategory = categoryField ? categoryField.value : '';
                
                // 根据分类筛选
                if (category === '' || workCategory === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
    };

    // 生成HTML轮播图片内容
    function generateCarouselHTML(data) {
        // 默认图片URL，当轮播图图片URL为空时使用
        const defaultImageUrl = 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275';
        return `                <div class="carousel-slide active" style="background-image: url(${data['carousel-1'] || defaultImageUrl});"></div>
                <div class="carousel-slide" style="background-image: url(${data['carousel-2'] || defaultImageUrl});"></div>
                <div class="carousel-slide" style="background-image: url(${data['carousel-3'] || defaultImageUrl});"></div>
                <div class="carousel-slide" style="background-image: url(${data['carousel-4'] || defaultImageUrl});"></div>
                <div class="carousel-slide" style="background-image: url(${data['carousel-5'] || defaultImageUrl});"></div>`;
    }

    // 辅助函数：转义字符串中的单引号
    function escapeSingleQuotes(str) {
        return (str || '').replace(/'/g, "\\'");
    }

    // 生成JavaScript代码
    function generateJSCode(data) {
        // 作品数据对象
        const workData = {};
        
        // 动态获取所有作品ID
        // 查找所有以modal-开头且以-title结尾的数据键
        const modalKeys = Object.keys(data).filter(key => key.startsWith('modal-') && key.endsWith('-title'));
        
        // 提取作品ID
        const workIds = modalKeys.map(key => {
            // 从modal-X-title中提取X，然后构建work-X
            const num = key.split('-')[1];
            return `work-${num}`;
        });
        
        // 为每个作品生成数据
        workIds.forEach(workId => {
            const num = workId.split('-')[1];
            
            // 检查是否有这个作品的数据
            if (data[`modal-${num}-title`] !== undefined) {
                workData[workId] = {
                    title: data[`modal-${num}-title`],
                    category: data[`modal-${num}-category`],
                    bannerImage: data[`modal-${num}-banner`],
                    description: [
                        data[`modal-${num}-desc-1`],
                        data[`modal-${num}-desc-2`]
                    ],
                    details: {
                        client: data[`modal-${num}-client`],
                        year: data[`modal-${num}-year`],
                        services: data[`modal-${num}-services`]
                    },
                    gallery: [
                        data[`modal-${num}-gallery-1`],
                        data[`modal-${num}-gallery-2`],
                        data[`modal-${num}-gallery-3`]
                    ],
                    concept: [
                        data[`modal-${num}-concept-1`],
                        data[`modal-${num}-concept-2`],
                        data[`modal-${num}-concept-3`]
                    ]
                };
            }
        });
        
        // 使用JSON.stringify生成JavaScript代码，更安全可靠
        return '// 作品数据结构，存储每个作品的独特内容\nconst workData = ' + JSON.stringify(workData, null, 4) + ';';
    }

    // 生成说明文本
    function generateInstructions() {
        return '# 代码导出说明\n\n## 使用方法\n\n1. **HTML轮播图片代码**：\n   - 打开 `index.html` 文件\n   - 找到 `.hero-carousel` 容器内的轮播项\n   - 替换为导出的HTML轮播图片代码\n\n2. **JavaScript代码**：\n   - 打开 `script.js` 文件\n   - 找到 `workData` 对象\n   - 替换为导出的JavaScript代码\n\n3. **注意事项**：\n   - 请确保替换时不要破坏原有的代码结构\n   - 复制前请先备份原文件\n   - 替换后刷新网页查看效果\n   - 如需自定义其他内容，请直接编辑对应的HTML/CSS/JS文件\n\n## 文件位置\n- `index.html`：轮播图片HTML代码（在 `.hero-carousel` 容器内）\n- `script.js`：作品弹窗数据\n\n## 数据同步说明\n- 后台管理更新的数据和图片会先保存到浏览器的localStorage中\n- 刷新前端页面时，页面会优先从localStorage加载数据\n- 导出代码功能会将localStorage中的数据转换为静态代码\n- 替换静态文件后，数据就会永久保存，上传到服务器时也会同步过去\n\n## 其他修改\n- 作品展示图片：在HTML文件中直接修改 `work-item` 内的 `img` 标签\n- 首页文案：在HTML文件中直接修改 `hero-content` 内的文本\n- 关于我内容：在HTML文件中直接修改 `about-content` 内的文本\n- 联系方式：在HTML文件中直接修改 `contact-info` 内的文本';
    }

    // 创建导出弹窗
    function createExportModal(instructions, carouselHTML, jsCode) {
        // 检查是否已有弹窗，如有则移除
        const existingModal = document.getElementById('exportModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // 创建弹窗
        const modal = document.createElement('div');
        modal.id = 'exportModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        `;
        
        // 创建内容容器
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            border-radius: 0.75rem;
            max-width: 900px;
            width: 100%;
            max-height: 90vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        `;
        
        // 创建头部
        const modalHeader = document.createElement('div');
        modalHeader.style.cssText = `
            padding: 1.5rem;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        
        const modalTitle = document.createElement('h3');
        modalTitle.textContent = '代码导出';
        modalTitle.style.cssText = `
            margin: 0;
            font-size: 1.25rem;
            font-weight: 600;
            color: #1e293b;
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #64748b;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        closeBtn.onclick = () => modal.remove();
        
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeBtn);
        
        // 创建内容
        const modalBody = document.createElement('div');
        modalBody.style.cssText = `
            flex: 1;
            overflow-y: auto;
            padding: 1.5rem;
        `;
        
        // 创建说明部分
        const instructionsDiv = document.createElement('div');
        instructionsDiv.style.cssText = `
            margin-bottom: 1.5rem;
            background: #f8fafc;
            padding: 1rem;
            border-radius: 0.5rem;
            border-left: 4px solid #2563eb;
        `;
        const instructionsPre = document.createElement('pre');
        instructionsPre.textContent = instructions;
        instructionsPre.style.cssText = `
            margin: 0;
            white-space: pre-wrap;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 0.875rem;
            line-height: 1.6;
            color: #334155;
        `;
        instructionsDiv.appendChild(instructionsPre);
        
        // 创建HTML代码部分
        const htmlSection = document.createElement('div');
        htmlSection.style.cssText = `
            margin-bottom: 1.5rem;
        `;
        const htmlTitle = document.createElement('h4');
        htmlTitle.textContent = '1. HTML轮播图片代码 (index.html)';
        htmlTitle.style.cssText = `
            margin: 0 0 0.75rem 0;
            font-size: 1rem;
            font-weight: 600;
            color: #1e293b;
        `;
        const htmlPre = document.createElement('pre');
        htmlPre.textContent = carouselHTML;
        htmlPre.style.cssText = `
            margin: 0;
            background: #1e293b;
            color: #e2e8f0;
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 0.875rem;
        `;
        htmlSection.appendChild(htmlTitle);
        htmlSection.appendChild(htmlPre);
        
        // 创建JavaScript代码部分
        const jsSection = document.createElement('div');
        jsSection.style.cssText = `
            margin-bottom: 1.5rem;
        `;
        const jsTitle = document.createElement('h4');
        jsTitle.textContent = '2. JavaScript代码 (script.js)';
        jsTitle.style.cssText = `
            margin: 0 0 0.75rem 0;
            font-size: 1rem;
            font-weight: 600;
            color: #1e293b;
        `;
        const jsPre = document.createElement('pre');
        jsPre.textContent = jsCode;
        jsPre.style.cssText = `
            margin: 0;
            background: #1e293b;
            color: #e2e8f0;
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 0.875rem;
            max-height: 400px;
            overflow-y: auto;
        `;
        jsSection.appendChild(jsTitle);
        jsSection.appendChild(jsPre);
        
        modalBody.appendChild(instructionsDiv);
        modalBody.appendChild(htmlSection);
        modalBody.appendChild(jsSection);
        
        // 创建底部
        const modalFooter = document.createElement('div');
        modalFooter.style.cssText = `
            padding: 1rem 1.5rem;
            border-top: 1px solid #e2e8f0;
            display: flex;
            gap: 0.75rem;
            justify-content: flex-end;
        `;
        
        const copyBtn = document.createElement('button');
        copyBtn.textContent = '复制全部代码';
        copyBtn.style.cssText = `
            background: #2563eb;
            color: white;
            border: none;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-size: 0.875rem;
            font-weight: 500;
        `;
        copyBtn.onclick = () => {
            const allCode = instructions + '\n\n/* HTML轮播图片代码 */\n' + carouselHTML + '\n\n/* JavaScript代码 */\n' + jsCode;
            navigator.clipboard.writeText(allCode).then(() => {
                showToast('代码已复制到剪贴板！');
            }).catch(err => {
                showToast('复制失败，请手动复制', 'error');
            });
        };
        
        const closeModalBtn = document.createElement('button');
        closeModalBtn.textContent = '关闭';
        closeModalBtn.style.cssText = `
            background: #64748b;
            color: white;
            border: none;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-size: 0.875rem;
            font-weight: 500;
        `;
        closeModalBtn.onclick = () => modal.remove();
        
        modalFooter.appendChild(copyBtn);
        modalFooter.appendChild(closeModalBtn);
        
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        modal.appendChild(modalContent);
        
        document.body.appendChild(modal);
    }
    
    // 下载文件辅助函数
    function downloadFile(filename, content, type = 'text/plain') {
        const blob = new Blob([content], { type: type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // 生成完整文件并下载
    async function generateAndDownloadFiles(data) {
        // 生成轮播图片HTML代码
        const carouselHTML = generateCarouselHTML(data);
        
        // 生成workData JavaScript代码
        const workDataJS = generateJSCode(data);
        
        // 同步所有文件到本地 - 等待同步完成
        await syncToLocalFiles(carouselHTML, workDataJS, data);
    }
    
    // 生成作品展示HTML结构
    function generateWorksHTML(data) {
        // 动态获取所有作品ID
        const modalKeys = Object.keys(data).filter(key => key.startsWith('modal-') && key.endsWith('-title'));
        const workIds = modalKeys.map(key => {
            const num = key.split('-')[1];
            return `work-${num}`;
        });
        
        // 作品尺寸列表，循环使用
        const sizes = ['large', 'small', 'small', 'medium', 'large'];
        
        // 生成作品HTML
        let worksHTML = '';
        workIds.forEach((workId, index) => {
            const num = workId.split('-')[1];
            const size = sizes[index % sizes.length];
            const imageUrl = data[`work-${num}-image`] || data[`modal-${num}-banner`] || '';
            const title = data[`${workId}-title`] || 'New Work';
            const category = data[`${workId}-category`] || '其他设计';
            
            worksHTML += `            <!-- ${title} -->
            <div class="work-item ${size} ${workId}">
                <div class="work-inner">
                    <div class="work-image">
                        <img src="${imageUrl}" alt="${title}">
                    </div>
                    <div class="work-overlay">
                        <div class="work-info">
                            <h3 class="work-title">${title}</h3>
                            <p class="work-category">${category}</p>
                        </div>
                    </div>
                </div>
            </div>
`;
        });
        
        return worksHTML;
    }
    
    // 同步文件到本地
    async function syncToLocalFiles(carouselHTML, workDataJS, data) {
        updateProgress(50, '正在同步到本地文件...');
        
        try {
            // 动态生成workImages对象，包含所有作品
            const workImages = {};
            
            // 动态获取所有作品ID
            const modalKeys = Object.keys(data).filter(key => key.startsWith('modal-') && key.endsWith('-title'));
            const workIds = modalKeys.map(key => {
                const num = key.split('-')[1];
                return `work-${num}`;
            });
            
            // 为每个作品添加图片数据
            workIds.forEach(workId => {
                const num = workId.split('-')[1];
                // 使用作品的workImage作为展示图片，优先于bannerImage
                workImages[workId] = data[`work-${num}-image`] || data[`modal-${num}-banner`];
            });
            
            // 生成作品展示HTML
            const worksHTML = generateWorksHTML(data);
            
            // 发送请求到本地Node.js服务器
            const response = await fetch('http://localhost:3000/sync-files', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    carouselHTML: carouselHTML,
                    workDataJS: workDataJS,
                    textData: {
                        heroTitle1: data['hero-title-1'],
                        heroTitle2: data['hero-title-2'],
                        heroSubtitle: data['hero-subtitle'],
                        heroCta: data['hero-cta'],
                        edgeTop1: data['hero-edge-top-1'],
                        edgeTop2: data['hero-edge-top-2'],
                        edgeTop3: data['hero-edge-top-3'],
                        edgeBottom1: data['hero-edge-bottom-1'],
                        edgeBottom2: data['hero-edge-bottom-2'],
                        edgeBottom3: data['hero-edge-bottom-3']
                    },
                    // 添加作品展示图片数据
                    workImages: workImages,
                    // 添加作品展示HTML
                    worksHTML: worksHTML,
                    // 添加音乐设置数据
                    musicSettings: {
                        name: data['music-name'],
                        url: data['music-url'],
                        autoPlay: data['music-auto-play'],
                        volume: data['music-volume'],
                        enabled: data['music-enabled']
                    }
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                updateProgress(90, '本地文件同步成功！');
            } else {
                const errorMsg = result.error ? `${result.message} (详情: ${result.error})` : result.message;
                updateProgress(90, `本地文件同步失败：${errorMsg}`, true);
                console.error('本地文件同步失败:', result);
            }
        } catch (error) {
            updateProgress(90, `网络请求失败：请确保同步服务器正在运行 (${error.message})`, true);
            console.error('本地文件同步失败:', error);
        }
    }
    
    // 初始化作品分类
    function initWorkCategories() {
        // 清空所有分类容器
        const categoryContainers = document.querySelectorAll('.work-modal-list');
        categoryContainers.forEach(container => {
            container.innerHTML = '';
        });
        
        // 统计每个分类的作品数量
        const categoryCounts = {
            'all': 0,
            '品牌设计': 0,
            'AI设计': 0,
            '网页设计': 0,
            '插画设计': 0,
            '3D设计': 0,
            '其他设计': 0
        };
        
        // 动态获取所有作品ID
        const modalKeys = Object.keys(currentData).filter(key => key.startsWith('modal-') && key.endsWith('-title'));
        const workIds = modalKeys.map(key => {
            const num = key.split('-')[1];
            return `work-${num}`;
        });
        
        // 为每个作品生成HTML并添加到对应分类和全部作品
        workIds.forEach(workId => {
            const num = workId.split('-')[1];
            const category = currentData[`modal-${num}-category`] || '其他设计';
            
            // 增加分类计数
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            categoryCounts['all'] = (categoryCounts['all'] || 0) + 1;
            
            // 创建作品HTML
            const workHTML = `
                <div class="work-modal-item" data-work="${workId}">
                    <div class="work-modal-header collapsible">
                        <h3>作品 ${num} - ${currentData[`modal-${num}-title`] || 'New Work'}</h3>
                        <span class="collapse-icon">▼</span>
                    </div>
                    
                    <div class="work-modal-content collapsible-content">
                        <div class="form-group">
                            <h4>Banner图片</h4>
                            <div class="image-input-wrapper">
                                <input type="text" class="image-url-input" data-field="modal-${num}-banner" placeholder="Banner图片URL" value="${escapeSingleQuotes(currentData[`modal-${num}-banner`] || '')}">
                                <div class="image-preview"></div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <h4>标题和分类</h4>
                            <input type="text" data-field="modal-${num}-title" placeholder="作品标题" value="${escapeSingleQuotes(currentData[`modal-${num}-title`] || '')}">
                            <select data-field="modal-${num}-category">
                                <option value="">请选择分类</option>
                                <option value="品牌设计" ${category === '品牌设计' ? 'selected' : ''}>品牌设计</option>
                                <option value="AI设计" ${category === 'AI设计' ? 'selected' : ''}>AI设计</option>
                                <option value="网页设计" ${category === '网页设计' ? 'selected' : ''}>网页设计</option>
                                <option value="插画设计" ${category === '插画设计' ? 'selected' : ''}>插画设计</option>
                                <option value="3D设计" ${category === '3D设计' ? 'selected' : ''}>3D设计</option>
                                <option value="其他设计" ${category === '其他设计' ? 'selected' : ''}>其他设计</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <h4>项目描述</h4>
                            <textarea data-field="modal-${num}-desc-1" rows="3" placeholder="描述段落1">${escapeSingleQuotes(currentData[`modal-${num}-desc-1`] || '')}</textarea>
                            <textarea data-field="modal-${num}-desc-2" rows="3" placeholder="描述段落2">${escapeSingleQuotes(currentData[`modal-${num}-desc-2`] || '')}</textarea>
                        </div>
                        
                        <div class="form-group">
                            <h4>项目详情</h4>
                            <input type="text" data-field="modal-${num}-client" placeholder="客户名称" value="${escapeSingleQuotes(currentData[`modal-${num}-client`] || '')}">
                            <input type="text" data-field="modal-${num}-year" placeholder="年份" value="${escapeSingleQuotes(currentData[`modal-${num}-year`] || '')}">
                            <input type="text" data-field="modal-${num}-services" placeholder="服务内容" value="${escapeSingleQuotes(currentData[`modal-${num}-services`] || '')}">
                        </div>
                        
                        <div class="form-group">
                            <h4>展示图片（3张）</h4>
                            <div class="image-input-wrapper">
                                <input type="text" class="image-url-input" data-field="modal-${num}-gallery-1" placeholder="图片1 URL" value="${escapeSingleQuotes(currentData[`modal-${num}-gallery-1`] || '')}">
                                <div class="image-preview"></div>
                            </div>
                            <div class="image-input-wrapper">
                                <input type="text" class="image-url-input" data-field="modal-${num}-gallery-2" placeholder="图片2 URL" value="${escapeSingleQuotes(currentData[`modal-${num}-gallery-2`] || '')}">
                                <div class="image-preview"></div>
                            </div>
                            <div class="image-input-wrapper">
                                <input type="text" class="image-url-input" data-field="modal-${num}-gallery-3" placeholder="图片3 URL" value="${escapeSingleQuotes(currentData[`modal-${num}-gallery-3`] || '')}">
                                <div class="image-preview"></div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <h4>设计理念（3段）</h4>
                            <textarea data-field="modal-${num}-concept-1" rows="3" placeholder="理念段落1">${escapeSingleQuotes(currentData[`modal-${num}-concept-1`] || '')}</textarea>
                            <textarea data-field="modal-${num}-concept-2" rows="3" placeholder="理念段落2">${escapeSingleQuotes(currentData[`modal-${num}-concept-2`] || '')}</textarea>
                            <textarea data-field="modal-${num}-concept-3" rows="3" placeholder="理念段落3">${escapeSingleQuotes(currentData[`modal-${num}-concept-3`] || '')}</textarea>
                        </div>
                    </div>
                </div>
            `;
            
            // 添加到对应分类容器
            const categoryContainer = document.querySelector(`.work-modal-list[data-category="${category}"]`);
            if (categoryContainer) {
                categoryContainer.innerHTML += workHTML;
            }
            
            // 添加到全部作品容器
            const allContainer = document.querySelector(`.work-modal-list[data-category="all"]`);
            if (allContainer) {
                allContainer.innerHTML += workHTML;
            }
        });
        
        // 更新分类计数
        Object.entries(categoryCounts).forEach(([category, count]) => {
            const countElement = document.querySelector(`.category-count[data-category="${category}"]`);
            if (countElement) {
                countElement.textContent = `(${count})`;
            }
        });
        
        // 初始化分类导航功能
        initCategoryNavigation();
        
        // 重新初始化表单和图片预览
        initForm();
        initImagePreviews();
        
        // 初始化可折叠功能
        initCollapsible();
    }
    
    // 初始化分类导航
    function initCategoryNavigation() {
        // 隐藏所有作品列表，只显示全部作品
        const workLists = document.querySelectorAll('.work-modal-list');
        workLists.forEach(list => {
            if (list.dataset.category === 'all') {
                list.style.display = 'block';
            } else {
                list.style.display = 'none';
            }
        });
        
        // 添加分类按钮点击事件
        const categoryButtons = document.querySelectorAll('.category-nav-btn');
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 移除所有按钮的active类
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // 添加当前按钮的active类
                this.classList.add('active');
                
                // 获取当前分类
                const category = this.dataset.category;
                
                // 显示对应分类的作品列表，隐藏其他列表
                workLists.forEach(list => {
                    if (list.dataset.category === category) {
                        list.style.display = 'block';
                    } else {
                        list.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // 更新分类计数
    function updateCategoryCounts() {
        // 统计每个分类的作品数量
        const categoryCounts = {
            'all': 0,
            '品牌设计': 0,
            'AI设计': 0,
            '网页设计': 0,
            '插画设计': 0,
            '3D设计': 0,
            '其他设计': 0
        };
        
        // 获取所有作品项
        const allWorkItems = document.querySelectorAll('.work-modal-item');
        
        // 遍历所有作品，统计每个分类的数量
        allWorkItems.forEach(item => {
            // 只统计全部作品列表中的作品，避免重复计数
            if (item.closest('.work-modal-list[data-category="all"]')) {
                // 获取作品的分类
                const categoryField = item.querySelector('[data-field*="-category"]');
                const workCategory = categoryField ? categoryField.value : '其他设计';
                
                // 增加对应分类的计数
                categoryCounts[workCategory] = (categoryCounts[workCategory] || 0) + 1;
                categoryCounts['all'] = (categoryCounts['all'] || 0) + 1;
            }
        });
        
        // 更新分类计数显示
        Object.entries(categoryCounts).forEach(([category, count]) => {
            const countElement = document.querySelector(`.category-count[data-category="${category}"]`);
            if (countElement) {
                countElement.textContent = `(${count})`;
            }
        });
    }
    
    // 进度提示函数
    function showProgressModal() {
        const modal = document.getElementById('progress-modal');
        modal.classList.add('show');
    }
    
    function hideProgressModal() {
        const modal = document.getElementById('progress-modal');
        modal.classList.remove('show');
    }
    
    function updateProgress(percentage, message, isError = false) {
        const progressBar = document.getElementById('progress-bar');
        const progressMessage = document.getElementById('progress-message');
        const progressPercentage = document.getElementById('progress-percentage');
        
        progressBar.style.width = percentage + '%';
        progressMessage.textContent = message;
        progressPercentage.textContent = percentage + '%';
        
        // 如果是错误状态，改变进度条颜色
        if (isError) {
            progressBar.style.backgroundColor = 'var(--danger-color)';
        } else {
            progressBar.style.backgroundColor = 'var(--primary-color)';
        }
    }
})();

// 将admin对象暴露到全局作用域
window.admin = admin;

document.addEventListener('DOMContentLoaded', function() {
    admin.init();
});