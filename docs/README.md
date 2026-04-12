# 数据精度格式知识图谱 v2.2

一个面向 AI 训练、推理、HPC 和工程选型场景的简洁高效的数据精度格式知识页面。

## 功能特性

### 两大核心板块

#### 📊 格式总览
- 16 种主流数据精度格式统计
- 8 个核心概念卡片（位宽、精度、动态范围等）
- 硬件支持矩阵（NVIDIA、AMD、Intel、Google、华为）
- 颜色图例清晰标注支持级别

#### 🔢 格式详情
- 16 个格式卡片，点击查看详情模态框
- 内置筛选器（分类、用途、厂商、搜索）
- 代码示例（PyTorch/TensorFlow）
- 内存和性能数据

### 核心功能

✅ **详情模态框** - 点击格式卡片查看：
  - 完整位结构（符号位、指数位、尾数位）
  - 内存占用与性能数据
  - 实用代码示例（PyTorch/TensorFlow）
  - 优缺点对比分析
  - 硬件支持情况

✅ **多维筛选** - 按分类、用途、厂商、关键词搜索

✅ **深色主题** - 科技感十足的界面设计

✅ **纯静态** - 无需后端，无外部依赖，开箱即用

### 最新更新 (v2.2)

🎯 **极致精简** - 从 6 个板块精简到 2 个，专注核心内容
⚡ **更快加载** - 移除图表库，减少 ~270 行代码
🔍 **智能筛选** - 筛选栏移至格式详情，按需显示
📦 **零依赖** - 100% 纯静态，无需 CDN

### 核心特性

✨ **代码示例库** - 主要格式包含实用代码示例
📊 **性能数据** - 内存和速度数据直接显示在模态框
🎨 **详情模态框** - 完整的格式信息展示
🔧 **硬件矩阵** - 清晰的支持级别图例

## 快速开始

进入 `web` 目录，在浏览器中打开 `index.html` 即可使用，无需服务器。

```bash
# 方式 1: 直接打开
cd web && open index.html

# 方式 2: 使用 Python 启动本地服务器
cd web && python3 -m http.server 8000
# 然后访问 http://localhost:8000

# 方式 3: 使用 Node.js
cd web && npx serve
```

## 项目结构

```
.
├── web/                  # 网页文件目录
│   ├── index.html        # 主页面
│   ├── styles.css        # 样式文件
│   ├── data.js           # 格式和硬件数据
│   └── app.js            # 交互逻辑
├── docs/                 # 文档目录
│   ├── README.md         # 项目说明
│   ├── CHANGELOG.md      # 更新日志
│   ├── FEATURES.md       # 功能说明
│   ├── QUICK_START.md    # 快速上手
│   ├── UPDATES.md        # v2.1 更新
│   └── UPDATES_v2.2.md   # v2.2 更新
├── draft.md              # 原始需求草稿
└── example.png           # 设计参考图
```

## 已收录格式

### 标准浮点
- FP64 (双精度)
- FP32 (单精度)
- FP16 (半精度)

### AI 专用格式
- TF32 (TensorFloat-32, NVIDIA)
- BF16 (BFloat16, Google)
- FP8 E4M3 (训练/推理)
- FP8 E5M2 (梯度/权重)

### 量化格式
- INT16
- INT8
- INT4
- FP4
- NF4 (Normal Float 4)
- INT1 (Binary)

### 扩展格式
- MXFP4 (Microscaling)
- Posit
- Block Floating Point

## 已支持硬件

- **NVIDIA**: Volta, Turing, Ampere, Hopper, Blackwell
- **AMD**: CDNA 2/3
- **Intel**: Xe, Gaudi
- **Google**: TPU
- **华为**: 昇腾

## 技术栈

- 纯前端实现（HTML/CSS/JavaScript）
- 零外部依赖，完全离线可用
- 无需构建工具，开箱即用

## 使用示例

### 查看格式详情

1. 点击任意格式卡片
2. 查看完整的技术规格和代码示例
3. 点击背景或 X 关闭模态框

### 代码示例预览

模态框中包含实用代码，例如 **BF16 混合精度训练**：

```python
# PyTorch
import torch
model = model.to(torch.bfloat16)

from torch.cuda.amp import autocast
with autocast(dtype=torch.bfloat16):
    output = model(input)
```

### 性能对比

在"可视化对比"板块查看：
- **内存占用**: FP64 (8B) → INT4 (0.5B)，16× 压缩
- **推理速度**: INT4 (6×) → FP64 (0.5×)，12× 加速

## 扩展建议

已实现：
- ✅ 格式详情模态框
- ✅ 代码示例库
- ✅ 内存和性能图表
- ✅ 完整数据维度

后续可以：

1. **语法高亮**: 为代码示例添加颜色高亮
2. **硬件详情**: 点击硬件矩阵单元格显示具体支持说明
3. **混合精度工作流**: 可视化展示训练流程
4. **交互式决策树**: 引导式选型工具
5. **Benchmark 数据**: 实际硬件性能测试结果
6. **案例研究**: 真实项目的格式选型经验

## 数据更新

要添加新格式或硬件，编辑 `data.js` 文件：

```javascript
// 添加新格式
formatsData.push({
    id: 'new_format',
    name: 'NEW FORMAT',
    category: 'ai',
    // ... 其他字段
});

// 添加新硬件
hardwareData.vendors.push({
    id: 'new_vendor',
    name: 'New Vendor',
    families: [...]
});

// 更新支持矩阵
hardwareSupport['new_format'] = {
    'vendor-family': 'native',
    // ...
};
```

## License

MIT
