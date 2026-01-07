const fs = require('fs');
const http = require('http');
const url = require('url');

// 本地文件路径
const HTML_FILE_PATH = './index.html';
const SCRIPT_FILE_PATH = './script.js';

// 创建HTTP服务器
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // 处理OPTIONS请求
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // 处理同步文件请求
    if (parsedUrl.pathname === '/sync-files' && req.method === 'POST') {
        let body = '';
        
        // 接收请求体
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        // 处理请求体
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                
                // 更新HTML文件
                if (data.carouselHTML || data.textData) {
                    updateHTMLFile(data);
                }
                
                // 更新script.js文件
                if (data.workDataJS) {
                    updateScriptFile(data.workDataJS);
                }
                
                // 返回成功响应
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: '文件已成功更新' }));
            } catch (error) {
                console.error('更新文件时出错:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: '更新文件时出错', error: error.message }));
            }
        });
    } else {
        // 处理其他请求
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: '请求路径不存在' }));
    }
});

// 更新HTML文件
function updateHTMLFile(data) {
    try {
        // 读取原始HTML文件内容
        let htmlContent = fs.readFileSync(HTML_FILE_PATH, 'utf8');
        
        // 替换轮播图片部分
        if (data.carouselHTML) {
            // 使用更简单、更可靠的方法替换轮播项
            // 先找到hero-carousel容器的开始和结束位置
            const heroCarouselStart = '<div class="hero-carousel">';
            const heroCarouselEnd = '</div>';
            
            const startIndex = htmlContent.indexOf(heroCarouselStart);
            if (startIndex !== -1) {
                const endIndex = htmlContent.indexOf(heroCarouselEnd, startIndex + heroCarouselStart.length);
                if (endIndex !== -1) {
                    // 构建新的hero-carousel内容
                    const newHeroCarousel = `${heroCarouselStart}\n${data.carouselHTML}\n            ${heroCarouselEnd}`;
                    
                    // 替换原始内容
                    htmlContent = htmlContent.substring(0, startIndex) + newHeroCarousel + htmlContent.substring(endIndex + heroCarouselEnd.length);
                    console.log('HTML轮播图片已更新');
                }
            }
        }
        
        // 替换文本内容
        if (data.textData) {
            const textData = data.textData;
            
            // 替换标题
            if (textData.heroTitle1) {
                const title1Start = htmlContent.indexOf('<span class="title-line">Design Without Boundaries</span>');
                if (title1Start !== -1) {
                    const title1End = title1Start + '<span class="title-line">Design Without Boundaries</span>'.length;
                    const newTitle1 = `<span class="title-line">${textData.heroTitle1}</span>`;
                    htmlContent = htmlContent.substring(0, title1Start) + newTitle1 + htmlContent.substring(title1End);
                }
            }
            
            if (textData.heroTitle2) {
                const title2Start = htmlContent.indexOf('<span class="title-line">Boundless Creativity</span>');
                if (title2Start !== -1) {
                    const title2End = title2Start + '<span class="title-line">Boundless Creativity</span>'.length;
                    const newTitle2 = `<span class="title-line">${textData.heroTitle2}</span>`;
                    htmlContent = htmlContent.substring(0, title2Start) + newTitle2 + htmlContent.substring(title2End);
                }
            }
            
            // 替换副标题
            if (textData.heroSubtitle) {
                const subtitleStart = htmlContent.indexOf('<p class="hero-subtitle">');
                if (subtitleStart !== -1) {
                    const subtitleEnd = htmlContent.indexOf('</p>', subtitleStart);
                    if (subtitleEnd !== -1) {
                        const newSubtitle = `<p class="hero-subtitle">${textData.heroSubtitle}</p>`;
                        htmlContent = htmlContent.substring(0, subtitleStart) + newSubtitle + htmlContent.substring(subtitleEnd + '</p>'.length);
                    }
                }
            }
            
            // 替换CTA文本
            if (textData.heroCta) {
                const ctaStart = htmlContent.indexOf('<span>Start Exploring</span>');
                if (ctaStart !== -1) {
                    const ctaEnd = ctaStart + '<span>Start Exploring</span>'.length;
                    const newCta = `<span>${textData.heroCta}</span>`;
                    htmlContent = htmlContent.substring(0, ctaStart) + newCta + htmlContent.substring(ctaEnd);
                }
            }
            
            console.log('HTML文本内容已更新');
        }
        
        // 写入更新后的HTML文件
        fs.writeFileSync(HTML_FILE_PATH, htmlContent, 'utf8');
        console.log('index.html文件已更新');
    } catch (error) {
        console.error('更新HTML文件时出错:', error);
        throw error;
    }
}

// 更新script.js文件，只替换workData对象部分
function updateScriptFile(newWorkDataJS) {
    try {
        // 读取原始文件内容
        let content = fs.readFileSync(SCRIPT_FILE_PATH, 'utf8');
        
        // 定义JS替换的正则表达式 - 匹配workData对象
        const workDataRegex = /const workData\s*=\s*\{[\s\S]*?\};\s*(?=\/\*|const|let|var|function|class|export|$)/;
        
        // 替换workData对象部分
        const updatedContent = content.replace(workDataRegex, newWorkDataJS + '\n\n');
        
        // 写入更新后的内容
        fs.writeFileSync(SCRIPT_FILE_PATH, updatedContent, 'utf8');
        console.log('script.js文件已更新');
    } catch (error) {
        console.error('更新script.js文件时出错:', error);
        throw error;
    }
}

// 启动服务器
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`文件同步服务器已启动，监听端口 ${PORT}`);
    console.log(`使用方法：发送POST请求到 http://localhost:${PORT}/sync-files`);
    console.log('请求体格式：{ "carouselHTML": "轮播HTML", "workDataJS": "workData对象", "textData": { 文本数据 } }');
});