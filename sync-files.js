const fs = require('fs').promises;
const http = require('http');
const url = require('url');

// 本地文件路径
const HTML_FILE_PATH = './index.html';
const SCRIPT_FILE_PATH = './script.js';
const PORT = 3000;

// 格式化日志输出
const log = (message, type = 'info') => {
    const timestamp = new Date().toLocaleString('zh-CN');
    const colors = {
        info: '\x1b[36m',
        success: '\x1b[32m',
        warning: '\x1b[33m',
        error: '\x1b[31m',
        reset: '\x1b[0m'
    };
    console.log(`${colors[type]}[${timestamp}] ${message}${colors.reset}`);
};

// 异步读取文件
const readFile = async (filePath) => {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        return content;
    } catch (error) {
        log(`读取文件失败: ${filePath} - ${error.message}`, 'error');
        throw error;
    }
};

// 异步写入文件
const writeFile = async (filePath, content) => {
    try {
        await fs.writeFile(filePath, content, 'utf8');
        return true;
    } catch (error) {
        log(`写入文件失败: ${filePath} - ${error.message}`, 'error');
        throw error;
    }
};

// 更新HTML文件
const updateHTMLFile = async (data) => {
    log('开始更新HTML文件...');
    try {
        let htmlContent = await readFile(HTML_FILE_PATH);
        let updatedSections = [];

        // 替换轮播图片部分
        if (data.carouselHTML) {
            const heroCarouselStart = '<div class="hero-carousel">';
            const heroCarouselEnd = '</div>';
            
            const startIndex = htmlContent.indexOf(heroCarouselStart);
            if (startIndex !== -1) {
                // 查找匹配的结束标签，考虑嵌套情况
                let currentIndex = startIndex + heroCarouselStart.length;
                let divCount = 1;
                let endIndex = -1;
                
                while (currentIndex < htmlContent.length && divCount > 0) {
                    const nextStartDiv = htmlContent.indexOf('<div', currentIndex);
                    const nextEndDiv = htmlContent.indexOf('</div>', currentIndex);
                    
                    if (nextEndDiv === -1) break;
                    
                    if (nextStartDiv === -1 || nextEndDiv < nextStartDiv) {
                        divCount--;
                        if (divCount === 0) {
                            endIndex = nextEndDiv;
                            break;
                        }
                        currentIndex = nextEndDiv + '</div>'.length;
                    } else {
                        divCount++;
                        currentIndex = nextStartDiv + '<div'.length;
                    }
                }
                
                if (endIndex !== -1) {
                    // 获取原始缩进
                    const lineStart = htmlContent.lastIndexOf('\n', startIndex) + 1;
                    const indentation = htmlContent.substring(lineStart, startIndex);
                    
                    // 构建新的hero-carousel内容，保持正确的缩进
                    const newHeroCarousel = `${indentation}${heroCarouselStart}\n${data.carouselHTML}\n${indentation}${heroCarouselEnd}`;
                    
                    // 替换原始内容，从开始标签到结束标签（包括结束标签）
                    htmlContent = htmlContent.substring(0, startIndex) + newHeroCarousel + htmlContent.substring(endIndex + heroCarouselEnd.length);
                    updatedSections.push('轮播图片');
                }
            }
        }

        // 替换作品展示区域
        if (data.worksHTML) {
            const worksContainerStart = '<div class="works-container">';
            const worksContainerEnd = '</div>';
            
            const startIndex = htmlContent.indexOf(worksContainerStart);
            if (startIndex !== -1) {
                let currentIndex = startIndex + worksContainerStart.length;
                let divCount = 1;
                let endIndex = -1;
                
                // 查找匹配的结束标签
                while (currentIndex < htmlContent.length && divCount > 0) {
                    const nextStartDiv = htmlContent.indexOf('<div', currentIndex);
                    const nextEndDiv = htmlContent.indexOf('</div>', currentIndex);
                    
                    if (nextEndDiv === -1) break;
                    
                    if (nextStartDiv === -1 || nextEndDiv < nextStartDiv) {
                        divCount--;
                        if (divCount === 0) {
                            // 找到匹配的结束标签
                            endIndex = nextEndDiv;
                            break;
                        }
                        currentIndex = nextEndDiv + '</div>'.length;
                    } else {
                        divCount++;
                        currentIndex = nextStartDiv + '<div'.length;
                    }
                }
                
                if (endIndex !== -1) {
                    // 获取原始缩进
                    const lineStart = htmlContent.lastIndexOf('\n', startIndex) + 1;
                    const indentation = htmlContent.substring(lineStart, startIndex);
                    
                    // 构建新的works-container内容，保持正确的缩进
                    const newWorksContainer = `${indentation}${worksContainerStart}\n${data.worksHTML}\n${indentation}${worksContainerEnd}`;
                    
                    // 替换原始内容，从开始标签到结束标签（包括结束标签）
                    htmlContent = htmlContent.substring(0, startIndex) + newWorksContainer + htmlContent.substring(endIndex + worksContainerEnd.length);
                    updatedSections.push('作品展示区域');
                }
            }
        }

        // 更新单个作品图片
        else if (data.workImages) {
            Object.entries(data.workImages).forEach(([workId, imageUrl]) => {
                const workItemRegex = new RegExp(`(<div class="work-item[^>]*${workId}[^>]*>.*?<\/div>)`, 's');
                const match = htmlContent.match(workItemRegex);
                
                if (match) {
                    const workItem = match[1];
                    const imgRegex = /(<img src=")([^"]+)("[^>]*>)/;
                    const updatedWorkItem = workItem.replace(imgRegex, `$1${imageUrl}$3`);
                    
                    if (updatedWorkItem !== workItem) {
                        htmlContent = htmlContent.replace(workItem, updatedWorkItem);
                        log(`已更新作品 ${workId} 的图片`, 'success');
                    }
                } else {
                    log(`未找到作品 ${workId} 的HTML元素`, 'warning');
                }
            });
            updatedSections.push('作品图片');
        }

        // 替换文本内容
        if (data.textData) {
            const { heroTitle1, heroTitle2, heroSubtitle, heroCta } = data.textData;
            
            // 更新标题行
            if (heroTitle1 || heroTitle2) {
                const titleLineRegex = /(<span class="title-line">)(.*?)(<\/span>)/g;
                let match;
                let matches = [];
                
                while ((match = titleLineRegex.exec(htmlContent)) !== null) {
                    matches.push(match);
                }
                
                if (heroTitle1 && matches[0]) {
                    htmlContent = htmlContent.replace(matches[0][0], `${matches[0][1]}${heroTitle1}${matches[0][3]}`);
                }
                
                if (heroTitle2 && matches[1]) {
                    htmlContent = htmlContent.replace(matches[1][0], `${matches[1][1]}${heroTitle2}${matches[1][3]}`);
                }
            }
            
            // 更新副标题
            if (heroSubtitle) {
                htmlContent = htmlContent.replace(
                    /(<p class="hero-subtitle">)(.*?)(<\/p>)/,
                    `$1${heroSubtitle}$3`
                );
            }
            
            // 更新CTA文本
            if (heroCta) {
                htmlContent = htmlContent.replace(
                    /(<a[^>]*class="hero-cta"[^>]*>\s*<span[^>]*>)(.*?)(<\/span>\s*<\/a>)/,
                    `$1${heroCta}$3`
                );
            }
            
            updatedSections.push('文本内容');
        }

        if (updatedSections.length > 0) {
            await writeFile(HTML_FILE_PATH, htmlContent);
            log(`HTML文件已更新，修改了: ${updatedSections.join(', ')}`, 'success');
        }
    } catch (error) {
        log(`更新HTML文件失败: ${error.message}`, 'error');
        throw error;
    }
};

// 更新script.js文件中的workData对象
const updateScriptFile = async (newWorkDataJS) => {
    log('开始更新script.js文件...');
    try {
        // 验证接收到的JavaScript代码是否有效
        if (!newWorkDataJS || !newWorkDataJS.includes('const workData')) {
            throw new Error('无效的workDataJS格式');
        }
        
        const content = await readFile(SCRIPT_FILE_PATH);
        
        // 查找workData对象的开始和结束位置
        const startIndex = content.indexOf('const workData = {');
        if (startIndex === -1) {
            throw new Error('未找到workData对象');
        }
        
        // 查找workData对象的结束位置
        let endIndex = startIndex + 'const workData = {'.length;
        let braceCount = 1;
        
        while (endIndex < content.length && braceCount > 0) {
            const char = content[endIndex];
            if (char === '{') braceCount++;
            else if (char === '}') braceCount--;
            endIndex++;
        }
        
        if (braceCount !== 0) {
            throw new Error('workData对象格式不正确，括号不匹配');
        }
        
        // 查找结束后的分号
        const semiColonIndex = content.indexOf(';', endIndex);
        if (semiColonIndex !== -1) {
            endIndex = semiColonIndex + 1;
        }
        
        const updatedContent = `${content.substring(0, startIndex)}${newWorkDataJS}\n\n${content.substring(endIndex)}`;
        await writeFile(SCRIPT_FILE_PATH, updatedContent);
        log('script.js文件已更新', 'success');
    } catch (error) {
        log(`更新script.js文件失败: ${error.message}`, 'error');
        throw error;
    }
};

// 更新script.js文件中的音乐设置
const updateMusicSettings = async (musicSettings) => {
    log('开始更新音乐设置...');
    try {
        const content = await readFile(SCRIPT_FILE_PATH);
        
        // 查找getMusicSettings函数的位置
        const functionStart = content.indexOf('const getMusicSettings =') !== -1 ? 
            content.indexOf('const getMusicSettings =') : 
            content.indexOf('function getMusicSettings()');
            
        if (functionStart === -1) {
            throw new Error('未找到getMusicSettings函数');
        }
        
        // 查找函数体的开始和结束位置
        const bodyStart = content.indexOf('{', functionStart) + 1;
        const bodyEnd = content.indexOf('}', bodyStart);
        
        if (bodyStart === -1 || bodyEnd === -1) {
            throw new Error('getMusicSettings函数格式不正确');
        }
        
        // 生成新的函数体
        const newFunctionBody = `\n        // 默认音乐设置
        return {\n            enabled: ${musicSettings.enabled === 'true' ? true : false},\n            volume: ${parseInt(musicSettings.volume || 70)},\n            autoPlay: ${musicSettings.autoPlay === 'true' ? true : false},\n            url: '${musicSettings.url || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}',\n            name: '${musicSettings.name || '背景音乐'}'\n        };\n    `;
        
        const updatedContent = `${content.substring(0, bodyStart)}${newFunctionBody}${content.substring(bodyEnd + 1)}`;
        await writeFile(SCRIPT_FILE_PATH, updatedContent);
        log('音乐设置已更新', 'success');
    } catch (error) {
        log(`更新音乐设置失败: ${error.message}`, 'error');
        throw error;
    }
};

// 处理POST请求
const handlePostRequest = async (req, res) => {
    try {
        // 读取请求体
        const body = await new Promise((resolve, reject) => {
            let data = '';
            req.on('data', chunk => data += chunk.toString());
            req.on('end', () => resolve(data));
            req.on('error', reject);
        });
        
        log('收到同步请求，请求体长度:', body.length);
        const data = JSON.parse(body);
        
        // 更新HTML文件
        if (data.carouselHTML || data.textData || data.workImages || data.worksHTML) {
            await updateHTMLFile(data);
        }
        
        // 更新script.js文件
        if (data.workDataJS) {
            await updateScriptFile(data.workDataJS);
        }
        
        // 更新音乐设置
        if (data.musicSettings) {
            await updateMusicSettings(data.musicSettings);
        }
        
        // 返回成功响应
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: '文件已成功更新' }));
        log('同步请求处理完成', 'success');
    } catch (error) {
        log(`处理同步请求失败: ${error.message}`, 'error');
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            success: false, 
            message: '处理请求时出错', 
            error: error.message 
        }));
    }
};

// 创建HTTP服务器
const server = http.createServer(async (req, res) => {
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
        await handlePostRequest(req, res);
    } else {
        // 处理其他请求
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: '请求路径不存在' }));
    }
});

// 检查端口是否被占用
const checkPort = (port) => {
    return new Promise((resolve, reject) => {
        const server = http.createServer();
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                resolve(false);
            } else {
                reject(err);
            }
        });
        server.listen(port, () => {
            server.close();
            resolve(true);
        });
    });
};

// 启动服务器
const startServer = async () => {
    try {
        const isPortAvailable = await checkPort(PORT);
        if (!isPortAvailable) {
            log(`端口 ${PORT} 已被占用，正在尝试结束占用该端口的进程...`, 'warning');
            
            // 在Windows上结束占用端口的进程
            const { exec } = require('child_process');
            await new Promise((resolve, reject) => {
                exec(`netstat -ano | findstr :${PORT}`, (err, stdout) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    
                    const lines = stdout.split('\n');
                    for (const line of lines) {
                        const parts = line.trim().split(/\s+/);
                        if (parts.length >= 5) {
                            const pid = parts[4];
                            exec(`taskkill /PID ${pid} /F`, (killErr) => {
                                if (killErr) {
                                    log(`结束进程 ${pid} 失败: ${killErr.message}`, 'error');
                                } else {
                                    log(`已结束占用端口 ${PORT} 的进程: ${pid}`, 'success');
                                }
                            });
                        }
                    }
                    resolve();
                });
            });
            
            // 等待进程结束
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        server.listen(PORT, () => {
            log(`文件同步服务器已启动，监听端口 ${PORT}`, 'success');
            log(`使用方法：发送POST请求到 http://localhost:${PORT}/sync-files`);
        });
    } catch (error) {
        log(`启动服务器失败: ${error.message}`, 'error');
        process.exit(1);
    }
};

// 启动服务器
startServer();