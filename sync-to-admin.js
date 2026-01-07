// 同步网页内容到后台管理程序
function syncWebContentToAdmin() {
    try {
        // 从index.html提取数据
        const syncData = extractDataFromPage();
        
        // 保存到localStorage，供后台管理程序使用
        localStorage.setItem('site_content_data', JSON.stringify(syncData));
        
        console.log('网页内容已同步到后台管理程序');
        return true;
    } catch (error) {
        console.error('同步网页内容到后台管理程序失败:', error);
        return false;
    }
}

// 从当前页面提取数据
function extractDataFromPage() {
    const data = {};
    
    // 提取轮播图片
    const carouselSlides = document.querySelectorAll('.hero-carousel .carousel-slide');
    carouselSlides.forEach((slide, index) => {
        const style = slide.style.backgroundImage;
        const url = style.match(/url\(['"]?(.*?)['"]?\)/)[1];
        data[`carousel-${index + 1}`] = url;
    });
    
    // 提取英雄区域文本
    const titleLines = document.querySelectorAll('.hero-title .title-line');
    if (titleLines[0]) data['hero-title-1'] = titleLines[0].textContent;
    if (titleLines[1]) data['hero-title-2'] = titleLines[1].textContent;
    
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) data['hero-subtitle'] = subtitle.textContent;
    
    const ctaText = document.querySelector('.hero-cta span');
    if (ctaText) data['hero-cta'] = ctaText.textContent;
    
    // 提取边缘文案
    const edgeTop = document.querySelectorAll('.edge-text-right p');
    if (edgeTop[0]) data['hero-edge-top-1'] = edgeTop[0].textContent;
    if (edgeTop[1]) data['hero-edge-top-2'] = edgeTop[1].textContent;
    if (edgeTop[2]) data['hero-edge-top-3'] = edgeTop[2].textContent;
    
    const edgeBottom = document.querySelectorAll('.edge-text-bottom p');
    if (edgeBottom[0]) data['hero-edge-bottom-1'] = edgeBottom[0].textContent;
    if (edgeBottom[1]) data['hero-edge-bottom-2'] = edgeBottom[1].textContent;
    if (edgeBottom[2]) data['hero-edge-bottom-3'] = edgeBottom[2].textContent;
    
    // 提取作品展示图片
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        const workId = item.classList[2];
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
    });
    
    // 提取关于我部分
    const aboutImage = document.querySelector('.about-image img');
    if (aboutImage) data['about-image'] = aboutImage.src;
    
    const aboutParagraphs = document.querySelectorAll('.about-paragraph');
    if (aboutParagraphs[0]) data['about-text-1'] = aboutParagraphs[0].textContent;
    if (aboutParagraphs[1]) data['about-text-2'] = aboutParagraphs[1].textContent;
    if (aboutParagraphs[2]) data['about-text-3'] = aboutParagraphs[2].textContent;
    
    // 提取技能部分
    const skillsTitle = document.querySelector('.skills-header .section-heading');
    if (skillsTitle) data['skills-title'] = skillsTitle.textContent;
    
    const skillsSubtitle = document.querySelector('.skills-header .section-subheading');
    if (skillsSubtitle) data['skills-subtitle'] = skillsSubtitle.textContent;
    
    const skillTitles = document.querySelectorAll('.skill-card .skill-title');
    if (skillTitles[0]) data['skill-1-title'] = skillTitles[0].textContent;
    if (skillTitles[1]) data['skill-2-title'] = skillTitles[1].textContent;
    if (skillTitles[2]) data['skill-3-title'] = skillTitles[2].textContent;
    if (skillTitles[3]) data['skill-4-title'] = skillTitles[3].textContent;
    
    // 提取联系方式部分
    const contactTitle = document.querySelector('.contact-header .section-heading');
    if (contactTitle) data['contact-title'] = contactTitle.textContent;
    
    const contactSubtitle = document.querySelector('.contact-header .section-subheading');
    if (contactSubtitle) data['contact-subtitle'] = contactSubtitle.textContent;
    
    const contactItems = document.querySelectorAll('.contact-item');
    if (contactItems[0]) {
        const emailText = contactItems[0].querySelector('.contact-text');
        if (emailText) data['contact-email'] = emailText.textContent;
    }
    if (contactItems[1]) {
        const phoneText = contactItems[1].querySelector('.contact-text');
        if (phoneText) data['contact-phone'] = phoneText.textContent;
    }
    
    const socialLinks = document.querySelectorAll('.social-link');
    if (socialLinks[0]) data['social-1'] = socialLinks[0].textContent;
    if (socialLinks[1]) data['social-2'] = socialLinks[1].textContent;
    if (socialLinks[2]) data['social-3'] = socialLinks[2].textContent;
    
    const formName = document.querySelector('label[for="name"]');
    if (formName) data['form-name'] = formName.textContent;
    
    const formEmail = document.querySelector('label[for="email"]');
    if (formEmail) data['form-email'] = formEmail.textContent;
    
    const formMessage = document.querySelector('label[for="message"]');
    if (formMessage) data['form-message'] = formMessage.textContent;
    
    const formSubmit = document.querySelector('.form-submit');
    if (formSubmit) data['form-submit'] = formSubmit.textContent;
    
    // 提取页脚部分
    const footerText = document.querySelector('.footer-text');
    if (footerText) data['footer-text'] = footerText.textContent;
    
    return data;
}

// 为后台管理程序添加同步功能
if (typeof admin !== 'undefined') {
    // 扩展admin对象，添加从网页同步数据的方法
    admin.syncFromWeb = function() {
        if (syncWebContentToAdmin()) {
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
    };
    
    // 在后台管理界面添加同步按钮
    document.addEventListener('DOMContentLoaded', function() {
        // 找到合适的位置添加同步按钮
        const adminActions = document.querySelector('.admin-actions');
        if (adminActions) {
            const syncButton = document.createElement('button');
            syncButton.textContent = '从网页同步数据';
            syncButton.className = 'btn btn-info';
            syncButton.onclick = admin.syncFromWeb;
            
            adminActions.appendChild(syncButton);
        }
    });
}
