// 简单的代码语法高亮
function highlightCode(code) {
    // 先转义 HTML
    let highlighted = escapeHtml(code);

    // 注释（优先处理）
    highlighted = highlighted.replace(/(#.*$)/gm, '<span class="comment">$1</span>');
    highlighted = highlighted.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>');
    highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');

    // C/C++ 预处理指令（#include 等）
    highlighted = highlighted.replace(/^(#include.*$)/gm, '<span class="keyword">$1</span>');

    // 关键字
    const keywords = [
        'import', 'from', 'def', 'class', 'return', 'if', 'else', 'for', 'while', 'with', 'as',
        '__global__', '__device__', '__shared__', '__host__', '__constant__',
        'void', 'int', 'float', 'double', 'bool', 'auto', 'const',
        'True', 'False', 'None'
    ];
    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b(?![^<]*>)`, 'g');
        highlighted = highlighted.replace(regex, `<span class="keyword">${keyword}</span>`);
    });

    // 装饰器
    highlighted = highlighted.replace(/(@[a-zA-Z_.]+)/g, '<span class="keyword">$1</span>');

    // 字符串（转义后的引号）
    highlighted = highlighted.replace(/(&quot;)(.*?)(&quot;)/g, '<span class="string">&quot;$2&quot;</span>');
    highlighted = highlighted.replace(/(&#39;)(.*?)(&#39;)/g, '<span class="string">&#39;$2&#39;</span>');

    // 函数/方法调用
    highlighted = highlighted.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\((?![^<]*<\/span>)/g, '<span class="function">$1</span>(');

    // 数字
    highlighted = highlighted.replace(/\b(\d+\.?\d*[fF]?)\b(?![^<]*<\/span>)/g, '<span class="number">$1</span>');

    // 类型和库名
    const types = [
        'torch', 'tf', 'np', 'tl', 'jnp', 'trt',
        'int8_t', 'int16_t', 'int32_t', 'uint8_t',
        '__half', '__nv_bfloat16', '__nv_fp8_e4m3', '__nv_fp8_e5m2',
        'half', 'bfloat16', 'float16', 'float32', 'float64',
        'dtype'
    ];
    types.forEach(type => {
        const regex = new RegExp(`\\b${type}\\b(?![^<]*<\/span>)`, 'g');
        highlighted = highlighted.replace(regex, `<span class="type">${type}</span>`);
    });

    return highlighted;
}

// HTML 转义
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
