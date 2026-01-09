const fs = require('fs');
const path = require('path');

// 读取script.js文件内容
const filePath = path.join(__dirname, 'script.js');
const content = fs.readFileSync(filePath, 'utf8');

// 初始化括号栈，用于追踪每个开括号的位置
const bracketStack = [];
const squareBracketStack = [];
const curlyBracketStack = [];
let line = 1;
let col = 1;
let errorFound = false;

// 遍历每个字符
for (let i = 0; i < content.length; i++) {
    const char = content[i];
    
    if (char === '\n') {
        line++;
        col = 1;
        continue;
    }
    
    switch (char) {
        case '(':
            bracketStack.push({ type: '(', line, col });
            break;
        case ')':
            if (bracketStack.length > 0) {
                bracketStack.pop();
            } else {
                console.error(`Error: Extraneous closing bracket ')' at line ${line}, column ${col}`);
                errorFound = true;
                break;
            }
            break;
        case '[':
            squareBracketStack.push({ type: '[', line, col });
            break;
        case ']':
            if (squareBracketStack.length > 0) {
                squareBracketStack.pop();
            } else {
                console.error(`Error: Extraneous closing square bracket ']' at line ${line}, column ${col}`);
                errorFound = true;
                break;
            }
            break;
        case '{':
            curlyBracketStack.push({ type: '{', line, col });
            break;
        case '}':
            if (curlyBracketStack.length > 0) {
                curlyBracketStack.pop();
            } else {
                console.error(`Error: Extraneous closing curly bracket '}' at line ${line}, column ${col}`);
                errorFound = true;
                break;
            }
            break;
    }
    
    if (errorFound) break;
    
    col++;
}

// 检查最终括号栈
if (!errorFound) {
    if (bracketStack.length > 0) {
        const lastBracket = bracketStack[bracketStack.length - 1];
        console.error(`Error: Unclosed opening bracket '${lastBracket.type}' at line ${lastBracket.line}, column ${lastBracket.col}`);
        errorFound = true;
    }
    if (squareBracketStack.length > 0) {
        const lastBracket = squareBracketStack[squareBracketStack.length - 1];
        console.error(`Error: Unclosed opening square bracket '${lastBracket.type}' at line ${lastBracket.line}, column ${lastBracket.col}`);
        errorFound = true;
    }
    if (curlyBracketStack.length > 0) {
        const lastBracket = curlyBracketStack[curlyBracketStack.length - 1];
        console.error(`Error: Unclosed opening curly bracket '${lastBracket.type}' at line ${lastBracket.line}, column ${lastBracket.col}`);
        errorFound = true;
    }
    
    if (!errorFound) {
        console.log('All brackets are correctly matched!');
    }
}
