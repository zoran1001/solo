const admin = (function() {
    const STORAGE_KEY = 'site_content_data';
    let currentData = {};

    const defaultData = {
        // 首页Banner
        'hero-background': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
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
        
        // 作品展示
        'showcase-title': 'My design works',
        'showcase-subtitle': 'Breakthrough Conventional Creative Expression',
        
        // 分类代表图片
        'category-brand-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158',
        'category-ai-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/ChatGPT_Image_2026_1_7_15_43_57.png?v=1767776603',
        'category-web-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/jimeng-2026-01-07-8512-3D_....png?v=1767777492',
        'category-graphic-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647',
        'category-3d-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        
        // 品牌设计作品
        'work-1-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158',
        'work-1-title': 'Brand Design 1',
        'work-1-category': 'A Design',
        'work-7-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'work-7-title': 'Brand Design 2',
        'work-7-category': 'Logo Design',
        'work-8-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/ChatGPT_Image_2026_1_7_15_43_57.png?v=1767776603',
        'work-8-title': 'Brand Design 3',
        'work-8-category': 'Visual Identity',
        'work-17-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158',
        'work-17-title': 'Brand Design 4',
        'work-17-category': 'Brand Strategy',
        'work-18-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'work-18-title': 'Brand Design 5',
        'work-18-category': 'Brand Guidelines',
        
        // AI设计作品
        'work-3-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/ChatGPT_Image_2026_1_7_15_43_57.png?v=1767776603',
        'work-3-title': 'AI Design 1',
        'work-3-category': 'AI Generated',
        'work-9-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'work-9-title': 'AI Design 2',
        'work-9-category': 'AI Art',
        'work-10-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158',
        'work-10-title': 'AI Design 3',
        'work-10-category': 'AI Illustration',
        'work-19-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/ChatGPT_Image_2026_1_7_15_43_57.png?v=1767776603',
        'work-19-title': 'AI Design 4',
        'work-19-category': 'AI Concept Art',
        'work-20-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'work-20-title': 'AI Design 5',
        'work-20-category': 'AI Character Design',
        
        // 网页设计作品
        'work-4-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/jimeng-2026-01-07-8512-3D_....png?v=1767777492',
        'work-4-title': 'Web Design 1',
        'work-4-category': 'Web Design',
        'work-11-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647',
        'work-11-title': 'Web Design 2',
        'work-11-category': 'UI/UX Design',
        'work-12-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'work-12-title': 'Web Design 3',
        'work-12-category': 'Responsive Design',
        'work-21-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/jimeng-2026-01-07-8512-3D_....png?v=1767777492',
        'work-21-title': 'Web Design 4',
        'work-21-category': 'E-commerce Design',
        'work-22-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647',
        'work-22-title': 'Web Design 5',
        'work-22-category': 'Dashboard Design',
        
        // 平面设计作品
        'work-5-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647',
        'work-5-title': 'Graphic Design 1',
        'work-5-category': 'Creative Design',
        'work-13-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158',
        'work-13-title': 'Graphic Design 2',
        'work-13-category': 'Illustration',
        'work-14-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/jimeng-2026-01-07-8512-3D_....png?v=1767777492',
        'work-14-title': 'Graphic Design 3',
        'work-14-category': 'Print Design',
        'work-23-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647',
        'work-23-title': 'Graphic Design 4',
        'work-23-category': 'Poster Design',
        'work-24-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/04c1b54e734068ed38cbb1e9b5dc0310.png?v=1767768158',
        'work-24-title': 'Graphic Design 5',
        'work-24-category': 'Brochure Design',
        
        // 3D设计作品
        'work-6-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'work-6-title': '3D Design 1',
        'work-6-category': '3D Design',
        'work-15-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647',
        'work-15-title': '3D Design 2',
        'work-15-category': '3D Modeling',
        'work-16-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/ChatGPT_Image_2026_1_7_15_43_57.png?v=1767776603',
        'work-16-title': '3D Design 3',
        'work-16-category': '3D Rendering',
        'work-25-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'work-25-title': '3D Design 4',
        'work-25-category': '3D Animation',
        'work-26-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/167.png?v=1767777647',
        'work-26-title': '3D Design 5',
        'work-26-category': '3D Product Design',
        
        // 关于我
        'about-image': 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        'about-text-1': 'I am a passionate designer who specializes in creating unique and impactful design works. I believe that design is not just about visual appeal but also about solving problems and conveying emotions.',
        'about-text-2': 'My design philosophy is to combine innovation with simplicity, breaking the norms and creating memorable design experiences. I constantly explore new design techniques and trends to keep my works fresh and forward-looking.',
        'about-text-3': 'I excel at translating complex concepts into clear and powerful visual language, using design to tell stories and evoke emotions.',
        
        // 专业技能
        'skills-title': 'Professional Skills',
        'skills-subtitle': 'My design toolkit',
        'skill-1-title': 'Graphic Design',
        'skill-2-title': 'Web Design',
        'skill-3-title': 'Illustration Design',
        'skill-4-title': '3D Design',
        
        // 联系方式
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
        
        // 页脚
        'footer-text': '© 2026 Solo Design. All rights reserved.',
        
        // 作品详情数据
        // 品牌设计作品详情
        'modal-1-title': 'Brand Design Project',
        'modal-1-category': '品牌设计',
        'modal-1-banner': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/ChatGPT_Image_May_16_2025_sedfsw04_11_34_AM_copy.webp?v=1747338860',
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
            input.removeEventListener('input', handleInput);
            input.removeEventListener('change', handleInput);
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
            const handleNavClick = () => {
                const target = item.dataset.section;

                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                sections.forEach(section => {
                    section.classList.toggle('active', section.id === `${target}-section`);
                });
            };

            item.removeEventListener('click', handleNavClick);
            item.addEventListener('click', handleNavClick);
        });
    }
    
    function initWorkCarouselTabs() {
        const tabBtns = document.querySelectorAll('.work-carousel-tabs .tab-btn');
        const tabContents = document.querySelectorAll('.work-carousel-content .carousel-tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                
                // 更新按钮状态
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // 显示对应的内容
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.dataset.category === category) {
                        content.classList.add('active');
                    }
                });
            });
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
        // 更新首页Banner
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.backgroundImage = `url('${currentData['hero-background'] || ''}')`;
        }

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

        // 更新作品展示标题
        document.querySelectorAll('.showcase-header .section-heading').forEach(el => {
            el.textContent = currentData['showcase-title'] || '';
        });
        document.querySelectorAll('.showcase-header .section-subheading').forEach(el => {
            el.textContent = currentData['showcase-subtitle'] || '';
        });

        // 更新分类代表图片 (ALL分类下的代表图)
        const categories = ['brand', 'ai', 'web', 'graphic', '3d'];
        categories.forEach(category => {
            const imageUrl = currentData[`category-${category}-image`] || '';
            // 更新ALL分类下的分类代表图
            document.querySelectorAll(`.work-carousel[data-category="all"] [data-category="${category}"] .work-image img`).forEach(el => {
                el.src = imageUrl;
            });
        });

        // 更新作品项 (所有分类下的作品)
        const workIds = [
            'work-1', 'work-3', 'work-4', 'work-5', 'work-6',
            'work-7', 'work-8', 'work-9', 'work-10', 'work-11',
            'work-12', 'work-13', 'work-14', 'work-15', 'work-16',
            'work-17', 'work-18', 'work-19', 'work-20', 'work-21',
            'work-22', 'work-23', 'work-24', 'work-25', 'work-26'
        ];
        
        workIds.forEach(workId => {
            const imageUrl = currentData[`${workId}-image`] || '';
            const title = currentData[`${workId}-title`] || '';
            const category = currentData[`${workId}-category`] || '';
            
            // 更新所有分类下该作品的图片、标题和分类
            document.querySelectorAll(`.${workId} .work-image img`).forEach(el => {
                el.src = imageUrl;
            });
            document.querySelectorAll(`.${workId} .work-title`).forEach(el => {
                el.textContent = title;
            });
            document.querySelectorAll(`.${workId} .work-category`).forEach(el => {
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
            document.querySelectorAll(`.skill-card:nth-child(${i}) .skill-title`).forEach(el => {
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

    function initWorkCategories() {
        // 初始化作品分类导航
        const categoryBtns = document.querySelectorAll('.category-nav-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                filterWorkDetailsByCategory(category);
                
                // 更新按钮状态
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        // 生成作品详情
        generateWorkDetailsHTML();
    }

    function generateWorkDetailsHTML() {
        const container = document.querySelector('.work-details-container');
        if (!container) return;
        
        // 获取所有作品ID
        const workIds = [];
        for (let i = 1; i <= 26; i++) {
            workIds.push(`work-${i}`);
        }
        
        let html = '';
        workIds.forEach(workId => {
            const num = workId.split('-')[1];
            const title = currentData[`modal-${num}-title`] || `${workId} - 作品详情`;
            const category = currentData[`modal-${num}-category`] || '品牌设计';
            
            html += `
                <div class="work-detail-item" data-work="${workId}" data-category="${category}">
                    <div class="work-detail-header">
                        <h3>${title}</h3>
                        <span class="work-detail-category">${category}</span>
                    </div>
                    <div class="work-detail-content">
                        <div class="form-group">
                            <h4>Banner图片</h4>
                            <div class="image-input-wrapper">
                                <input type="text" class="image-url-input" data-field="modal-${num}-banner" placeholder="Banner图片URL">
                                <div class="image-preview"></div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <h4>标题和分类</h4>
                            <input type="text" data-field="modal-${num}-title" placeholder="作品标题">
                            <select data-field="modal-${num}-category">
                                <option value="品牌设计" ${category === '品牌设计' ? 'selected' : ''}>品牌设计</option>
                                <option value="AI设计" ${category === 'AI设计' ? 'selected' : ''}>AI设计</option>
                                <option value="网页设计" ${category === '网页设计' ? 'selected' : ''}>网页设计</option>
                                <option value="平面设计" ${category === '平面设计' ? 'selected' : ''}>平面设计</option>
                                <option value="3D设计" ${category === '3D设计' ? 'selected' : ''}>3D设计</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <h4>项目描述</h4>
                            <textarea data-field="modal-${num}-desc-1" rows="3" placeholder="描述段落1"></textarea>
                            <textarea data-field="modal-${num}-desc-2" rows="3" placeholder="描述段落2"></textarea>
                        </div>
                        
                        <div class="form-group">
                            <h4>项目详情</h4>
                            <input type="text" data-field="modal-${num}-client" placeholder="客户名称">
                            <input type="text" data-field="modal-${num}-year" placeholder="年份">
                            <input type="text" data-field="modal-${num}-services" placeholder="服务内容">
                        </div>
                        
                        <div class="form-group">
                            <h4>展示图片（3张）</h4>
                            <div class="image-input-wrapper">
                                <input type="text" class="image-url-input" data-field="modal-${num}-gallery-1" placeholder="图片1 URL">
                                <div class="image-preview"></div>
                            </div>
                            <div class="image-input-wrapper">
                                <input type="text" class="image-url-input" data-field="modal-${num}-gallery-2" placeholder="图片2 URL">
                                <div class="image-preview"></div>
                            </div>
                            <div class="image-input-wrapper">
                                <input type="text" class="image-url-input" data-field="modal-${num}-gallery-3" placeholder="图片3 URL">
                                <div class="image-preview"></div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <h4>设计理念（3段）</h4>
                            <textarea data-field="modal-${num}-concept-1" rows="3" placeholder="理念段落1"></textarea>
                            <textarea data-field="modal-${num}-concept-2" rows="3" placeholder="理念段落2"></textarea>
                            <textarea data-field="modal-${num}-concept-3" rows="3" placeholder="理念段落3"></textarea>
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
        // 重新初始化表单
        initForm();
        initImagePreviews();
    }

    function filterWorkDetailsByCategory(category) {
        const workItems = document.querySelectorAll('.work-detail-item');
        workItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    function showProgressModal() {
        const modal = document.getElementById('progress-modal');
        modal.style.display = 'flex';
    }

    function hideProgressModal() {
        const modal = document.getElementById('progress-modal');
        modal.style.display = 'none';
    }

    function updateProgress(percentage, message, error = false) {
        const progressBar = document.getElementById('progress-bar');
        const progressMessage = document.getElementById('progress-message');
        const progressPercentage = document.getElementById('progress-percentage');
        
        progressBar.style.width = `${percentage}%`;
        progressMessage.textContent = message;
        progressPercentage.textContent = `${percentage}%`;
        
        if (error) {
            progressBar.classList.add('error');
        } else {
            progressBar.classList.remove('error');
        }
    }

    function init() {
        loadData();
        initForm();
        initImagePreviews();
        initNavigation();
        initWorkCategories();
        initWorkCarouselTabs();
    }

    return {
        init: init,
        saveAll: function() {
            if (saveData()) {
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
        exportToCode: function exportToCode() {
            // 导出代码功能
            const data = currentData;
            
            // 生成workData JavaScript代码
            const workData = {};
            for (let i = 1; i <= 26; i++) {
                const workId = `work-${i}`;
                workData[workId] = {
                    title: data[`modal-${i}-title`] || `${workId} - 作品详情`,
                    category: data[`modal-${i}-category`] || '品牌设计',
                    bannerImage: data[`modal-${i}-banner`] || '',
                    description: [
                        data[`modal-${i}-desc-1`] || '',
                        data[`modal-${i}-desc-2`] || ''
                    ],
                    details: {
                        client: data[`modal-${i}-client`] || '',
                        year: data[`modal-${i}-year`] || '',
                        services: data[`modal-${i}-services`] || ''
                    },
                    gallery: [
                        data[`modal-${i}-gallery-1`] || '',
                        data[`modal-${i}-gallery-2`] || '',
                        data[`modal-${i}-gallery-3`] || ''
                    ],
                    concept: [
                        data[`modal-${i}-concept-1`] || '',
                        data[`modal-${i}-concept-2`] || '',
                        data[`modal-${i}-concept-3`] || ''
                    ]
                };
            }
            
            const jsCode = '// 作品数据结构，存储每个作品的独特内容\nconst workData = ' + JSON.stringify(workData, null, 4) + ';';
            
            // 生成分类数据
            const categoryData = {
                'brand': {
                    name: '品牌设计',
                    image: data['category-brand-image'] || ''
                },
                'ai': {
                    name: 'AI设计',
                    image: data['category-ai-image'] || ''
                },
                'web': {
                    name: '网页设计',
                    image: data['category-web-image'] || ''
                },
                'graphic': {
                    name: '平面设计',
                    image: data['category-graphic-image'] || ''
                },
                '3d': {
                    name: '3D设计',
                    image: data['category-3d-image'] || ''
                }
            };
            
            const categoryCode = '\n\n// 分类数据结构\nconst categoryData = ' + JSON.stringify(categoryData, null, 4) + ';';
            
            // 创建代码导出弹窗
            const modal = document.createElement('div');
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
            
            const content = document.createElement('div');
            content.style.cssText = `
                background: white;
                border-radius: 0.75rem;
                max-width: 900px;
                width: 100%;
                max-height: 90vh;
                overflow: hidden;
                display: flex;
                flex-direction: column;
            `;
            
            const header = document.createElement('div');
            header.style.cssText = `
                padding: 1.5rem;
                border-bottom: 1px solid #e2e8f0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            `;
            
            const title = document.createElement('h3');
            title.textContent = '代码导出';
            title.style.cssText = `
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
            
            header.appendChild(title);
            header.appendChild(closeBtn);
            
            const body = document.createElement('div');
            body.style.cssText = `
                flex: 1;
                overflow-y: auto;
                padding: 1.5rem;
            `;
            
            const codePre = document.createElement('pre');
            codePre.textContent = jsCode + categoryCode;
            codePre.style.cssText = `
                margin: 0;
                background: #1e293b;
                color: #e2e8f0;
                padding: 1rem;
                border-radius: 0.5rem;
                overflow-x: auto;
                font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
                font-size: 0.875rem;
                max-height: 60vh;
                overflow-y: auto;
            `;
            
            body.appendChild(codePre);
            
            const footer = document.createElement('div');
            footer.style.cssText = `
                padding: 1rem 1.5rem;
                border-top: 1px solid #e2e8f0;
                display: flex;
                gap: 0.75rem;
                justify-content: flex-end;
            `;
            
            const copyBtn = document.createElement('button');
            copyBtn.textContent = '复制代码';
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
                navigator.clipboard.writeText(jsCode).then(() => {
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
            
            footer.appendChild(copyBtn);
            footer.appendChild(closeModalBtn);
            
            content.appendChild(header);
            content.appendChild(body);
            content.appendChild(footer);
            modal.appendChild(content);
            
            document.body.appendChild(modal);
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
                    
                    updateProgress(25, '数据保存成功，正在生成文件...');
                    
                    // 步骤2：生成workData JavaScript代码
                    const workData = {};
                    for (let i = 1; i <= 26; i++) {
                        const workId = `work-${i}`;
                        workData[workId] = {
                            title: currentData[`modal-${i}-title`] || `${workId} - 作品详情`,
                            category: currentData[`modal-${i}-category`] || '品牌设计',
                            bannerImage: currentData[`modal-${i}-banner`] || '',
                            description: [
                                currentData[`modal-${i}-desc-1`] || '',
                                currentData[`modal-${i}-desc-2`] || ''
                            ],
                            details: {
                                client: currentData[`modal-${i}-client`] || '',
                                year: currentData[`modal-${i}-year`] || '',
                                services: currentData[`modal-${i}-services`] || ''
                            },
                            gallery: [
                                currentData[`modal-${i}-gallery-1`] || '',
                                currentData[`modal-${i}-gallery-2`] || '',
                                currentData[`modal-${i}-gallery-3`] || ''
                            ],
                            concept: [
                                currentData[`modal-${i}-concept-1`] || '',
                                currentData[`modal-${i}-concept-2`] || '',
                                currentData[`modal-${i}-concept-3`] || ''
                            ]
                        };
                    }
                    
                    // 生成分类数据
                    const categoryData = {
                        'brand': {
                            name: '品牌设计',
                            image: currentData['category-brand-image'] || ''
                        },
                        'ai': {
                            name: 'AI设计',
                            image: currentData['category-ai-image'] || ''
                        },
                        'web': {
                            name: '网页设计',
                            image: currentData['category-web-image'] || ''
                        },
                        'graphic': {
                            name: '平面设计',
                            image: currentData['category-graphic-image'] || ''
                        },
                        '3d': {
                            name: '3D设计',
                            image: currentData['category-3d-image'] || ''
                        }
                    };
                    
                    updateProgress(50, '正在同步到前端文件...');
                    
                    // 步骤3：将数据写入到script.js文件
                    // 这里使用localStorage来同步数据，前端可以直接读取
                    localStorage.setItem('workData', JSON.stringify(workData));
                    localStorage.setItem('categoryData', JSON.stringify(categoryData));
                    
                    // 同步数据到前端页面
                    applyChangesToPage();
                    
                    updateProgress(100, '一键同步完成！');
                    showToast('一键同步完成！');
                } catch (error) {
                    updateProgress(0, `同步失败：${error.message}`, true);
                    showToast(`同步失败：${error.message}`, 'error');
                    console.error('一键同步失败:', error);
                } finally {
                    setTimeout(hideProgressModal, 1500);
                }
            },
        addWorkDetail: function() {
            // 添加新作品详情的功能
            showToast('添加作品详情功能开发中...', 'info');
        }
    };
})();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    admin.init();
});