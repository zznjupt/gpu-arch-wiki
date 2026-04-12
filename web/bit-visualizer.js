// 位结构可视化生成器
function generateBitVisualization(format) {
    // 跳过整数类型和特殊格式（可变位结构）
    if (!format.sign || !format.exponent || !format.mantissa) {
        return '';
    }

    // 跳过可变位结构的格式
    if (format.id === 'posit' || format.id === 'bfp') {
        return '';
    }

    const totalBits = format.bits;
    const signBits = format.sign;
    const exponentBits = format.exponent;
    const mantissaBits = format.mantissa;

    // 生成示例位值（参考 Float_example.png 的模式）
    let bits = [];

    // 符号位
    bits.push(0);

    // 指数位（示例值 - 类似 0.15625 的编码模式）
    // FP32 的 0.15625 ≈ 01111100...
    const exponentPattern = format.id === 'fp32' || format.id === 'fp16' ?
        [0, 1, 1, 1, 1, 1, 0, 0] : // 类似实际值
        Array(exponentBits).fill(0).map((_, i) => i < Math.ceil(exponentBits * 0.6) ? 1 : 0);

    for (let i = 0; i < exponentBits; i++) {
        bits.push(exponentPattern[i] || 0);
    }

    // 尾数位（示例值 - 前几位为 1）
    for (let i = 0; i < mantissaBits; i++) {
        bits.push(i === 0 || i === mantissaBits - 1 ? 1 : 0);
    }

    // 构建 SVG - 自适应布局
    // 根据总位数调整，确保所有格式都有足够空间
    let boxWidth, totalWidth;

    if (totalBits === 64) {
        // FP64: 特别处理，使用最紧凑布局
        boxWidth = 15;
        totalWidth = 1000;
    } else if (totalBits === 32) {
        // FP32: 标准布局
        boxWidth = 24;
        totalWidth = 800;
    } else if (totalBits >= 16 && totalBits < 32) {
        // FP16/BF16/TF32: 中等布局
        boxWidth = 38;
        totalWidth = 750;
    } else {
        // FP8 等小格式：宽松布局
        boxWidth = 70;
        totalWidth = 650;
    }

    const boxHeight = 45;
    const fontSize = totalBits >= 32 ? 15 : (totalBits >= 16 ? 16 : 18);
    const totalHeight = 140;

    // 计算实际位图宽度
    const actualWidth = bits.length * boxWidth;
    // 计算左边距，让位图居中
    const offsetX = (totalWidth - actualWidth) / 2;

    let svg = `<svg viewBox="0 0 ${totalWidth} ${totalHeight}" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto;">`;

    // 计算各段的中心位置（加上偏移量）
    const signCenterX = offsetX + boxWidth * signBits / 2;
    const exponentStartX = offsetX + boxWidth * signBits;
    const exponentCenterX = exponentStartX + boxWidth * exponentBits / 2;
    const mantissaStartX = offsetX + boxWidth * (signBits + exponentBits);
    const mantissaCenterX = mantissaStartX + boxWidth * mantissaBits / 2;

    // 标签 - 根据位数调整
    const labelFontSize = totalBits >= 32 ? 12 : 13;
    const labelY = 20;

    // 根据段的宽度决定是否显示详细信息
    const showBitCount = boxWidth * exponentBits > 80 || totalBits <= 16;

    svg += `<text x="${signCenterX}" y="${labelY}" font-size="${labelFontSize}" fill="#9aa0a6" text-anchor="middle">sign</text>`;

    if (showBitCount) {
        svg += `<text x="${exponentCenterX}" y="${labelY}" font-size="${labelFontSize}" fill="#9aa0a6" text-anchor="middle">exponent (${exponentBits} bits)</text>`;
        svg += `<text x="${mantissaCenterX}" y="${labelY}" font-size="${labelFontSize}" fill="#9aa0a6" text-anchor="middle">fraction (${mantissaBits} bits)</text>`;
    } else {
        // 大格式使用简化标签
        svg += `<text x="${exponentCenterX}" y="${labelY}" font-size="${labelFontSize}" fill="#9aa0a6" text-anchor="middle">exponent (${exponentBits})</text>`;
        svg += `<text x="${mantissaCenterX}" y="${labelY}" font-size="${labelFontSize}" fill="#9aa0a6" text-anchor="middle">fraction (${mantissaBits})</text>`;
    }

    // 位框 - 从偏移位置开始绘制
    let currentX = offsetX;
    bits.forEach((bit, index) => {
        let color;
        if (index < signBits) {
            color = '#6dd5ed'; // 蓝色 - 符号位
        } else if (index < signBits + exponentBits) {
            color = '#50fa7b'; // 绿色 - 指数位
        } else {
            color = '#ff6b9d'; // 红色 - 尾数位
        }

        // 位框
        svg += `<rect x="${currentX}" y="35" width="${boxWidth}" height="${boxHeight}" fill="${color}" stroke="#0a0e1a" stroke-width="2"/>`;

        // 位值 - 根据框宽度决定是否显示
        if (boxWidth >= 20) {
            const bitFontSize = boxWidth >= 35 ? fontSize : (boxWidth >= 20 ? 13 : 11);
            svg += `<text x="${currentX + boxWidth / 2}" y="62" font-size="${bitFontSize}" font-weight="bold" text-anchor="middle" fill="#0a0e1a">${bit}</text>`;
        }

        // 位索引（显示关键位置）
        const bitIndex = totalBits - index - 1;
        let showIndex = false;

        if (index === 0) {
            // 最高位（符号位）
            showIndex = true;
        } else if (index === signBits - 1 && signBits > 1) {
            // 符号位最后一位（如果有多位）
            showIndex = true;
        } else if (index === signBits) {
            // 指数位开始
            showIndex = true;
        } else if (index === signBits + exponentBits - 1) {
            // 指数位结束
            showIndex = true;
        } else if (index === bits.length - 1) {
            // 最后一位
            showIndex = true;
        }

        if (showIndex) {
            svg += `<text x="${currentX + boxWidth / 2}" y="95" font-size="11" text-anchor="middle" fill="#5f6368">${bitIndex}</text>`;
        }

        currentX += boxWidth;
    });

    // 位索引标签
    svg += `<text x="${totalWidth / 2}" y="120" font-size="12" text-anchor="middle" fill="#5f6368">(bit index)</text>`;

    svg += '</svg>';
    return svg;
}

// 生成简化版位结构图（用于卡片预览）
function generateBitPreview(format) {
    if (!format.sign || !format.exponent || !format.mantissa) {
        return ''; // 整数类型不显示
    }

    // 跳过可变位结构的格式
    if (format.id === 'posit' || format.id === 'bfp') {
        return `
            <div class="bit-preview-note">
                <span>位结构可变</span>
            </div>
        `;
    }

    const total = format.bits;
    const s = format.sign;
    const e = format.exponent;
    const m = format.mantissa;

    // 使用 flexbox 的简化版本
    return `
        <div class="bit-preview">
            <div class="bit-segment sign" style="flex: ${s};" title="符号位: ${s}">S</div>
            <div class="bit-segment exponent" style="flex: ${e};" title="指数位: ${e}">E${e}</div>
            <div class="bit-segment mantissa" style="flex: ${m};" title="尾数位: ${m}">M${m}</div>
        </div>
    `;
}
