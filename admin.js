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
        'work-3-title': 'AI-generated',
        'work-3-category': 'AI Design',
        'work-4-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'work-4-title': 'Website Design',
        'work-4-category': 'Web Design',
        'work-5-image': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
        'work-5-title': 'Illustration Design',
        'work-5-category': 'Creative Design',
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
        'modal-1-category': 'Graphic Design',
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
        'modal-3-category': 'AI Design',
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
        'modal-4-category': 'Web Design',
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
        'modal-5-category': 'Creative Design',
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
        'modal-6-category': '3D Design',
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
                currentData = JSON.parse(saved);
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
            item.addEventListener('click', () => {
                const target = item.dataset.section;

                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                sections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === target + '-section') {
                        section.classList.add('active');
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
        document.querySelectorAll('.carousel-slide-1').forEach(el => {
            el.style.backgroundImage = `url('${currentData['carousel-1'] || ''}')`;
        });
        document.querySelectorAll('.carousel-slide-2').forEach(el => {
            el.style.backgroundImage = `url('${currentData['carousel-2'] || ''}')`;
        });
        document.querySelectorAll('.carousel-slide-3').forEach(el => {
            el.style.backgroundImage = `url('${currentData['carousel-3'] || ''}')`;
        });
        document.querySelectorAll('.carousel-slide-4').forEach(el => {
            el.style.backgroundImage = `url('${currentData['carousel-4'] || ''}')`;
        });
        document.querySelectorAll('.carousel-slide-5').forEach(el => {
            el.style.backgroundImage = `url('${currentData['carousel-5'] || ''}')`;
        });

        document.querySelectorAll('.hero-title .title-line:first-child').forEach(el => {
            el.textContent = currentData['hero-title-1'] || '';
        });
        document.querySelectorAll('.hero-title .title-line:last-child').forEach(el => {
            el.textContent = currentData['hero-title-2'] || '';
        });
        document.querySelectorAll('.hero-subtitle').forEach(el => {
            el.textContent = currentData['hero-subtitle'] || '';
        });
        document.querySelectorAll('.hero-cta span').forEach(el => {
            el.textContent = currentData['hero-cta'] || '';
        });

        const edgeTop = document.querySelectorAll('.edge-text-right p');
        if (edgeTop[0]) edgeTop[0].textContent = currentData['hero-edge-top-1'] || '';
        if (edgeTop[1]) edgeTop[1].textContent = currentData['hero-edge-top-2'] || '';
        if (edgeTop[2]) edgeTop[2].textContent = currentData['hero-edge-top-3'] || '';

        const edgeBottom = document.querySelectorAll('.edge-text-bottom p');
        if (edgeBottom[0]) edgeBottom[0].textContent = currentData['hero-edge-bottom-1'] || '';
        if (edgeBottom[1]) edgeBottom[1].textContent = currentData['hero-edge-bottom-2'] || '';
        if (edgeBottom[2]) edgeBottom[2].textContent = currentData['hero-edge-bottom-3'] || '';

        document.querySelectorAll('.work-1 .work-image img').forEach(el => {
            el.src = currentData['work-1-image'] || '';
        });
        document.querySelectorAll('.work-1 .work-title').forEach(el => {
            el.textContent = currentData['work-1-title'] || '';
        });
        document.querySelectorAll('.work-1 .work-category').forEach(el => {
            el.textContent = currentData['work-1-category'] || '';
        });

        document.querySelectorAll('.work-3 .work-image img').forEach(el => {
            el.src = currentData['work-3-image'] || '';
        });
        document.querySelectorAll('.work-3 .work-title').forEach(el => {
            el.textContent = currentData['work-3-title'] || '';
        });
        document.querySelectorAll('.work-3 .work-category').forEach(el => {
            el.textContent = currentData['work-3-category'] || '';
        });

        document.querySelectorAll('.work-4 .work-image img').forEach(el => {
            el.src = currentData['work-4-image'] || '';
        });
        document.querySelectorAll('.work-4 .work-title').forEach(el => {
            el.textContent = currentData['work-4-title'] || '';
        });
        document.querySelectorAll('.work-4 .work-category').forEach(el => {
            el.textContent = currentData['work-4-category'] || '';
        });

        document.querySelectorAll('.work-5 .work-image img').forEach(el => {
            el.src = currentData['work-5-image'] || '';
        });
        document.querySelectorAll('.work-5 .work-title').forEach(el => {
            el.textContent = currentData['work-5-title'] || '';
        });
        document.querySelectorAll('.work-5 .work-category').forEach(el => {
            el.textContent = currentData['work-5-category'] || '';
        });

        document.querySelectorAll('.work-6 .work-image img').forEach(el => {
            el.src = currentData['work-6-image'] || '';
        });
        document.querySelectorAll('.work-6 .work-title').forEach(el => {
            el.textContent = currentData['work-6-title'] || '';
        });
        document.querySelectorAll('.work-6 .work-category').forEach(el => {
            el.textContent = currentData['work-6-category'] || '';
        });

        document.querySelectorAll('.about-image img').forEach(el => {
            el.src = currentData['about-image'] || '';
        });

        const aboutParagraphs = document.querySelectorAll('.about-paragraph');
        if (aboutParagraphs[0]) aboutParagraphs[0].textContent = currentData['about-text-1'] || '';
        if (aboutParagraphs[1]) aboutParagraphs[1].textContent = currentData['about-text-2'] || '';
        if (aboutParagraphs[2]) aboutParagraphs[2].textContent = currentData['about-text-3'] || '';

        document.querySelectorAll('.skills-header .section-heading').forEach(el => {
            el.textContent = currentData['skills-title'] || '';
        });
        document.querySelectorAll('.skills-header .section-subheading').forEach(el => {
            el.textContent = currentData['skills-subtitle'] || '';
        });

        document.querySelectorAll('.skill-1 .skill-title').forEach(el => {
            el.textContent = currentData['skill-1-title'] || '';
        });
        document.querySelectorAll('.skill-2 .skill-title').forEach(el => {
            el.textContent = currentData['skill-2-title'] || '';
        });
        document.querySelectorAll('.skill-3 .skill-title').forEach(el => {
            el.textContent = currentData['skill-3-title'] || '';
        });
        document.querySelectorAll('.skill-4 .skill-title').forEach(el => {
            el.textContent = currentData['skill-4-title'] || '';
        });

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

        const socialLinks = document.querySelectorAll('.social-link');
        if (socialLinks[0]) socialLinks[0].textContent = currentData['social-1'] || '';
        if (socialLinks[1]) socialLinks[1].textContent = currentData['social-2'] || '';
        if (socialLinks[2]) socialLinks[2].textContent = currentData['social-3'] || '';

        document.querySelectorAll('label[for="name"]').forEach(el => {
            el.textContent = currentData['form-name'] || '';
        });
        document.querySelectorAll('label[for="email"]').forEach(el => {
            el.textContent = currentData['form-email'] || '';
        });
        document.querySelectorAll('label[for="message"]').forEach(el => {
            el.textContent = currentData['form-message'] || '';
        });
        document.querySelectorAll('.form-submit').forEach(el => {
            el.textContent = currentData['form-submit'] || '';
        });

        document.querySelectorAll('.footer-text').forEach(el => {
            el.textContent = currentData['footer-text'] || '';
        });
    }

    function init() {
        loadData();
        initForm();
        initImagePreviews();
        initNavigation();
    }

    return {
        init: init,
        saveAll: function() {
            if (saveData()) {
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
        oneClickSync: function() {
            // 显示进度提示
            showProgressModal();
            
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
            generateAndDownloadFiles(currentData);
            
            updateProgress(100, '一键同步完成！已生成最新的HTML、CSS和JS文件');
            showToast('一键同步完成！已生成最新的HTML、CSS和JS文件');
            
            // 3秒后隐藏进度提示
            setTimeout(hideProgressModal, 3000);
        }
    };

    // 生成HTML轮播图片内容
    function generateCarouselHTML(data) {
        return `                <div class="carousel-slide active" style="background-image: url(${data['carousel-1'] || ''});"></div>
                <div class="carousel-slide" style="background-image: url(${data['carousel-2'] || ''});"></div>
                <div class="carousel-slide" style="background-image: url(${data['carousel-3'] || ''});"></div>
                <div class="carousel-slide" style="background-image: url(${data['carousel-4'] || ''});"></div>
                <div class="carousel-slide" style="background-image: url(${data['carousel-5'] || ''});"></div>`;
    }

    // 生成JavaScript代码
    function generateJSCode(data) {
        // 作品数据对象
        let workDataCode = '// 作品数据结构，存储每个作品的独特内容\nconst workData = {\n';
        
        // 为每个作品生成数据
        const workIds = ['work-1', 'work-3', 'work-4', 'work-5', 'work-6'];
        workIds.forEach((workId, index) => {
            const num = workId.split('-')[1];
            const isLast = index === workIds.length - 1;
            
            workDataCode += `    '${workId}': {\n`;
            workDataCode += `        title: '${data[`modal-${num}-title`] || ''}',\n`;
            workDataCode += `        category: '${data[`modal-${num}-category`] || ''}',\n`;
            workDataCode += `        bannerImage: '${data[`modal-${num}-banner`] || ''}',\n`;
            workDataCode += `        description: [\n`;
            workDataCode += `            '${data[`modal-${num}-desc-1`] || ''}',\n`;
            workDataCode += `            '${data[`modal-${num}-desc-2`] || ''}'\n`;
            workDataCode += `        ],\n`;
            workDataCode += `        details: {\n`;
            workDataCode += `            client: '${data[`modal-${num}-client`] || ''}',\n`;
            workDataCode += `            year: '${data[`modal-${num}-year`] || ''}',\n`;
            workDataCode += `            services: '${data[`modal-${num}-services`] || ''}'\n`;
            workDataCode += `        },\n`;
            workDataCode += `        gallery: [\n`;
            workDataCode += `            '${data[`modal-${num}-gallery-1`] || ''}',\n`;
            workDataCode += `            '${data[`modal-${num}-gallery-2`] || ''}',\n`;
            workDataCode += `            '${data[`modal-${num}-gallery-3`] || ''}'\n`;
            workDataCode += `        ],\n`;
            workDataCode += `        concept: [\n`;
            workDataCode += `            '${data[`modal-${num}-concept-1`] || ''}',\n`;
            workDataCode += `            '${data[`modal-${num}-concept-2`] || ''}',\n`;
            workDataCode += `            '${data[`modal-${num}-concept-3`] || ''}'\n`;
            workDataCode += `        ]\n`;
            workDataCode += `    }${isLast ? '' : ','}\n`;
        });
        
        workDataCode += '};';
        
        return workDataCode;
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
    function generateAndDownloadFiles(data) {
        // 生成轮播图片HTML代码
        const carouselHTML = generateCarouselHTML(data);
        
        // 生成workData JavaScript代码
        const workDataJS = generateJSCode(data);
        
        // 同步所有文件到本地
        syncToLocalFiles(carouselHTML, workDataJS, data);
    }
    
    // 同步文件到本地
    function syncToLocalFiles(carouselHTML, workDataJS, data) {
        updateProgress(50, '正在同步到本地文件...');
        
        // 发送请求到本地Node.js服务器
        fetch('http://localhost:3000/sync-files', {
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
                }
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateProgress(90, '本地文件同步成功！');
            } else {
                updateProgress(90, `本地文件同步失败：${data.message}`, true);
                console.error('本地文件同步失败:', data.message);
            }
        })
        .catch(error => {
            updateProgress(90, `本地文件同步失败：${error.message}`, true);
            console.error('本地文件同步失败:', error);
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