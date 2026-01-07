// 同步网页内容到后台管理程序
function syncWebContentToAdmin() {
    try {
        console.log('开始同步网页内容到后台管理程序');
        
        // 使用完整的默认数据结构，包括所有作品和弹窗内容
        const fullDefaultData = {
            // 轮播图片
            'carousel-1': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1.png?v=1767682275',
            'carousel-2': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/dc75125a74b3f6f509719465ef712ca1_f48883c8-2168-400b-a521-e01e484b1a83.png?v=1767687196',
            'carousel-3': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/abc7a5ac29b4d8d283e2acc0cbecbe61.jpg?v=1767687194',
            'carousel-4': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/0c863d8f25fa3543348b1b79a11de66b_908285bb-f765-4efe-8466-ff7321283a05.jpg?v=1767687285',
            'carousel-5': 'https://cdn.shopify.com/s/files/1/0522/3320/7988/files/0c863d8f25fa3543348b1b79a11de66b.jpg?v=1767687279',
            
            // 英雄区域
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
            
            // 关于我
            'about-image': 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            'about-text-1': 'I am a passionate designer who specializes in creating unique and impactful design works. I believe that design is not just about visual appeal but also about solving problems and conveying emotions.',
            'about-text-2': 'My design philosophy is to combine innovation with simplicity, breaking the norms and creating memorable design experiences. I constantly explore new design techniques and trends to keep my works fresh and forward-looking.',
            'about-text-3': 'I excel at translating complex concepts into clear and powerful visual language, using design to tell stories and evoke emotions.',
            
            // 技能
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
            
            // 音乐设置
            'music-name': '背景音乐',
            'music-url': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            'music-auto-play': 'true',
            'music-volume': '70',
            'music-enabled': 'true',
            
            // 作品弹窗内容
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
            'modal-6-concept-3': 'The materials and textures were carefully chosen to create a premium look and feel, with realistic rendering that showcases the product\'s features.'
        };
        
        console.log('使用完整默认数据结构进行同步');
        
        // 获取现有的数据
        const existingData = localStorage.getItem('site_content_data');
        console.log('现有的localStorage数据:', existingData ? '有数据' : '无数据');
        
        let mergedData = {};
        
        // 如果有现有数据，合并到默认数据中，否则直接使用默认数据
        if (existingData) {
            const parsedExistingData = JSON.parse(existingData);
            console.log('解析后的现有数据:', parsedExistingData);
            // 合并现有数据到默认数据中，现有数据优先级更高
            mergedData = {
                ...fullDefaultData,
                ...parsedExistingData
            };
        } else {
            // 直接使用默认数据
            mergedData = fullDefaultData;
        }
        
        console.log('合并后的数据:', mergedData);
        
        // 保存合并后的数据
        localStorage.setItem('site_content_data', JSON.stringify(mergedData));
        console.log('数据已保存到localStorage');
        
        // 立即验证保存结果
        const savedData = localStorage.getItem('site_content_data');
        console.log('保存后验证:', savedData ? '保存成功' : '保存失败');
        if (savedData) {
            console.log('保存的数据内容:', JSON.parse(savedData));
        }
        
        console.log('网页内容已同步到后台管理程序');
        return true;
    } catch (error) {
        console.error('同步网页内容到后台管理程序失败:', error);
        // 显示更详细的错误信息
        if (error instanceof TypeError) {
            console.error('类型错误:', error.message);
        } else if (error instanceof SyntaxError) {
            console.error('语法错误:', error.message);
        } else {
            console.error('其他错误:', error.message);
        }
        return Promise.resolve(false);
    }
}

// 从DOM文档中提取数据
function extractDataFromDoc(doc) {
    const data = {};
    
    try {
        // 提取轮播图片
        const carouselSlides = doc.querySelectorAll('.hero-carousel .carousel-slide');
        carouselSlides.forEach((slide, index) => {
            try {
                const style = slide.style.backgroundImage;
                if (style) {
                    const match = style.match(/url\(['"]?(.*?)['"]?\)/);
                    if (match && match[1]) {
                        data[`carousel-${index + 1}`] = match[1];
                    }
                }
            } catch (error) {
                console.warn(`提取轮播图片 ${index + 1} 失败:`, error);
            }
        });
        
        // 提取英雄区域文本
        const titleLines = doc.querySelectorAll('.hero-title .title-line');
        if (titleLines.length > 0 && titleLines[0]) data['hero-title-1'] = titleLines[0].textContent;
        if (titleLines.length > 1 && titleLines[1]) data['hero-title-2'] = titleLines[1].textContent;
        
        const subtitle = doc.querySelector('.hero-subtitle');
        if (subtitle) data['hero-subtitle'] = subtitle.textContent;
        
        const ctaText = doc.querySelector('.hero-cta span');
        if (ctaText) data['hero-cta'] = ctaText.textContent;
        
        // 提取边缘文案
        const edgeTop = doc.querySelectorAll('.edge-text-right p');
        if (edgeTop.length > 0 && edgeTop[0]) data['hero-edge-top-1'] = edgeTop[0].textContent;
        if (edgeTop.length > 1 && edgeTop[1]) data['hero-edge-top-2'] = edgeTop[1].textContent;
        if (edgeTop.length > 2 && edgeTop[2]) data['hero-edge-top-3'] = edgeTop[2].textContent;
        
        const edgeBottom = doc.querySelectorAll('.edge-text-bottom p');
        if (edgeBottom.length > 0 && edgeBottom[0]) data['hero-edge-bottom-1'] = edgeBottom[0].textContent;
        if (edgeBottom.length > 1 && edgeBottom[1]) data['hero-edge-bottom-2'] = edgeBottom[1].textContent;
        if (edgeBottom.length > 2 && edgeBottom[2]) data['hero-edge-bottom-3'] = edgeBottom[2].textContent;
        
        // 提取作品展示图片
        const workItems = doc.querySelectorAll('.work-item');
        workItems.forEach(item => {
            try {
                // 获取workId - 查找以work-开头的类
                const workId = Array.from(item.classList).find(cls => cls.startsWith('work-'));
                if (workId) {
                    const img = item.querySelector('.work-image img');
                    if (img) {
                        data[`${workId}-image`] = img.src;
                    }
                    
                    const title = item.querySelector('.work-title');
                    if (title) {
                        data[`${workId}-title`] = title.textContent;
                    }
                    
                    const category = item.querySelector('.work-category');
                    if (category) {
                        data[`${workId}-category`] = category.textContent;
                    }
                }
            } catch (error) {
                console.warn('提取作品信息失败:', error);
            }
        });
        
        // 提取关于我部分
        const aboutImage = doc.querySelector('.about-image img');
        if (aboutImage) data['about-image'] = aboutImage.src;
        
        const aboutParagraphs = doc.querySelectorAll('.about-paragraph');
        if (aboutParagraphs.length > 0 && aboutParagraphs[0]) data['about-text-1'] = aboutParagraphs[0].textContent;
        if (aboutParagraphs.length > 1 && aboutParagraphs[1]) data['about-text-2'] = aboutParagraphs[1].textContent;
        if (aboutParagraphs.length > 2 && aboutParagraphs[2]) data['about-text-3'] = aboutParagraphs[2].textContent;
        
        // 提取技能部分
        const skillsTitle = doc.querySelector('.skills-header .section-heading');
        if (skillsTitle) data['skills-title'] = skillsTitle.textContent;
        
        const skillsSubtitle = doc.querySelector('.skills-header .section-subheading');
        if (skillsSubtitle) data['skills-subtitle'] = skillsSubtitle.textContent;
        
        const skillTitles = doc.querySelectorAll('.skill-card .skill-title');
        if (skillTitles.length > 0 && skillTitles[0]) data['skill-1-title'] = skillTitles[0].textContent;
        if (skillTitles.length > 1 && skillTitles[1]) data['skill-2-title'] = skillTitles[1].textContent;
        if (skillTitles.length > 2 && skillTitles[2]) data['skill-3-title'] = skillTitles[2].textContent;
        if (skillTitles.length > 3 && skillTitles[3]) data['skill-4-title'] = skillTitles[3].textContent;
        
        // 提取联系方式部分
        const contactTitle = doc.querySelector('.contact-header .section-heading');
        if (contactTitle) data['contact-title'] = contactTitle.textContent;
        
        const contactSubtitle = doc.querySelector('.contact-header .section-subheading');
        if (contactSubtitle) data['contact-subtitle'] = contactSubtitle.textContent;
        
        const contactItems = doc.querySelectorAll('.contact-item');
        if (contactItems.length > 0) {
            const emailText = contactItems[0].querySelector('.contact-text');
            if (emailText) data['contact-email'] = emailText.textContent;
        }
        if (contactItems.length > 1) {
            const phoneText = contactItems[1].querySelector('.contact-text');
            if (phoneText) data['contact-phone'] = phoneText.textContent;
        }
        
        const socialLinks = doc.querySelectorAll('.social-link');
        if (socialLinks.length > 0 && socialLinks[0]) data['social-1'] = socialLinks[0].textContent;
        if (socialLinks.length > 1 && socialLinks[1]) data['social-2'] = socialLinks[1].textContent;
        if (socialLinks.length > 2 && socialLinks[2]) data['social-3'] = socialLinks[2].textContent;
        
        const formName = doc.querySelector('label[for="name"]');
        if (formName) data['form-name'] = formName.textContent;
        
        const formEmail = doc.querySelector('label[for="email"]');
        if (formEmail) data['form-email'] = formEmail.textContent;
        
        const formMessage = doc.querySelector('label[for="message"]');
        if (formMessage) data['form-message'] = formMessage.textContent;
        
        const formSubmit = doc.querySelector('.form-submit');
        if (formSubmit) data['form-submit'] = formSubmit.textContent;
        
        // 提取页脚部分
        const footerText = doc.querySelector('.footer-text');
        if (footerText) data['footer-text'] = footerText.textContent;
        
    } catch (error) {
        console.error('提取数据时出错:', error);
        // 返回部分提取的数据，而不是空对象
    }
    
    return data;
}

// 获取音乐设置
function getMusicSettingsFromLocalStorage() {
    const musicSettings = {};
    
    try {
        // 从localStorage获取音乐设置
        const storageKey = 'site_content_data';
        const saved = localStorage.getItem(storageKey);
        
        if (saved) {
            const data = JSON.parse(saved);
            
            // 添加音乐设置到返回结果
            musicSettings['music-name'] = data['music-name'] || '背景音乐';
            musicSettings['music-url'] = data['music-url'] || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
            musicSettings['music-auto-play'] = data['music-auto-play'] || 'true';
            musicSettings['music-volume'] = data['music-volume'] || '70';
            musicSettings['music-enabled'] = data['music-enabled'] || 'true';
            
            console.log('从localStorage获取到的音乐设置:', musicSettings);
        }
    } catch (error) {
        console.error('获取音乐设置时出错:', error);
    }
    
    return musicSettings;
}

// 获取作品信息
function getWorkDataFromLocalStorage() {
    const workData = {};
    
    try {
        // 从localStorage获取所有作品信息
        const storageKey = 'site_content_data';
        const saved = localStorage.getItem(storageKey);
        
        if (saved) {
            const data = JSON.parse(saved);
            
            // 获取所有作品ID
            const workIds = ['work-1', 'work-3', 'work-4', 'work-5', 'work-6'];
            
            // 遍历所有作品ID，获取作品信息
            workIds.forEach(workId => {
                const num = workId.split('-')[1];
                
                // 添加作品弹窗内容到返回结果
                workData[`${workId}-title`] = data[`${workId}-title`];
                workData[`${workId}-category`] = data[`${workId}-category`];
                workData[`${workId}-image`] = data[`${workId}-image`];
                
                // 添加弹窗详情
                workData[`modal-${num}-banner`] = data[`modal-${num}-banner`];
                workData[`modal-${num}-title`] = data[`modal-${num}-title`];
                workData[`modal-${num}-category`] = data[`modal-${num}-category`];
                workData[`modal-${num}-desc-1`] = data[`modal-${num}-desc-1`];
                workData[`modal-${num}-desc-2`] = data[`modal-${num}-desc-2`];
                workData[`modal-${num}-client`] = data[`modal-${num}-client`];
                workData[`modal-${num}-year`] = data[`modal-${num}-year`];
                workData[`modal-${num}-services`] = data[`modal-${num}-services`];
                workData[`modal-${num}-gallery-1`] = data[`modal-${num}-gallery-1`];
                workData[`modal-${num}-gallery-2`] = data[`modal-${num}-gallery-2`];
                workData[`modal-${num}-gallery-3`] = data[`modal-${num}-gallery-3`];
                workData[`modal-${num}-concept-1`] = data[`modal-${num}-concept-1`];
                workData[`modal-${num}-concept-2`] = data[`modal-${num}-concept-2`];
                workData[`modal-${num}-concept-3`] = data[`modal-${num}-concept-3`];
            });
            
            console.log('从localStorage获取到的作品信息:', workData);
        }
    } catch (error) {
        console.error('获取作品信息时出错:', error);
    }
    
    return workData;
}

// 为后台管理程序添加同步功能
if (typeof admin !== 'undefined') {
    // 扩展admin对象，添加从网页同步数据的方法
    admin.syncFromWeb = async function() {
        // 显示进度提示
        const progressModal = document.createElement('div');
        progressModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
            font-weight: bold;
        `;
        progressModal.innerHTML = `
            <div style="text-align: center;">
                <div style="margin-bottom: 1rem;">正在从网页同步数据...</div>
                <div style="width: 300px; height: 10px; background: #333; border-radius: 5px; overflow: hidden;">
                    <div id="sync-progress-bar" style="width: 0%; height: 100%; background: #4CAF50; transition: width 0.3s ease;"></div>
                </div>
                <div id="sync-progress-text" style="margin-top: 0.5rem; font-size: 0.9rem;">0%</div>
            </div>
        `;
        document.body.appendChild(progressModal);
        
        // 更新进度
        const updateProgress = (percentage, text) => {
            const progressBar = document.getElementById('sync-progress-bar');
            const progressText = document.getElementById('sync-progress-text');
            if (progressBar && progressText) {
                progressBar.style.width = percentage + '%';
                progressText.textContent = text;
            }
        };
        
        updateProgress(10, '正在获取网页内容...');
        
        try {
            const success = await syncWebContentToAdmin();
            
            updateProgress(90, '正在更新后台数据...');
            
            if (success) {
                // 重新加载数据
                admin.init();
                // 显示提示
                const toast = document.getElementById('toast');
                toast.textContent = '已从网页同步数据！';
                toast.className = 'toast success';
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            } else {
                const toast = document.getElementById('toast');
                toast.textContent = '从网页同步数据失败！';
                toast.className = 'toast error';
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }
        } catch (error) {
            console.error('同步过程中发生错误:', error);
            const toast = document.getElementById('toast');
            toast.textContent = '从网页同步数据失败！';
            toast.className = 'toast error';
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        } finally {
            // 移除进度提示
            document.body.removeChild(progressModal);
        }
    };
    
    // 在后台管理界面添加同步按钮
    document.addEventListener('DOMContentLoaded', function() {
        // 找到合适的位置添加同步按钮
        const adminActions = document.querySelector('.admin-actions');
        if (adminActions) {
            // 检查是否已经存在同步按钮
            if (!adminActions.querySelector('[onclick="admin.syncFromWeb()"]')) {
                const syncButton = document.createElement('button');
                syncButton.textContent = '从网页同步数据';
                syncButton.className = 'btn btn-info';
                syncButton.onclick = admin.syncFromWeb;
                
                adminActions.appendChild(syncButton);
            }
        }
    });
}