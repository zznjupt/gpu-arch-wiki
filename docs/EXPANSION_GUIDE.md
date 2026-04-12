# 扩展指南 - GPU 知识库

## 🎯 项目定位

这是一个**个人 GPU 知识库**，用于系统整理各种 GPU 相关知识。

当前已完成：**数据精度格式知识图谱**

## 📚 规划的模块

### 1️⃣ 数据精度格式 ✅ 已完成
- 16 种精度格式
- 位结构可视化
- 硬件支持矩阵
- 代码示例

### 2️⃣ 计算单元 🚧 规划中

**Tensor Core**
- 架构演进（Volta → Hopper → Blackwell）
- 支持的数据类型
- 计算吞吐对比
- WMMA API 使用

**CUDA Core**
- 架构细节
- 线程层次
- Warp 调度
- 性能特性

**其他计算单元**
- RT Core (光追)
- SFU (特殊函数单元)

### 3️⃣ 内存架构 🚧 规划中

**显存层次**
- HBM/GDDR 对比
- 显存带宽
- ECC 内存

**缓存结构**
- L1/L2 Cache
- Shared Memory
- Texture Cache
- Constant Cache

**内存访问模式**
- Coalescing（合并访问）
- Bank Conflict
- Memory Transaction

### 4️⃣ 性能优化 🚧 规划中

**优化技巧**
- Occupancy 优化
- 内存访问优化
- 计算隐藏延迟
- Kernel Fusion

**Profiling 工具**
- NSight Compute
- NSight Systems
- nvprof

**Benchmark 方法**
- FLOPS 测量
- 带宽测试
- 瓶颈分析

### 5️⃣ GPU 架构对比 🚧 规划中

**NVIDIA 架构演进**
- Volta, Turing, Ampere, Hopper, Blackwell
- 关键特性对比
- 性能提升

**AMD 架构**
- CDNA vs RDNA
- MI200/MI300 特性

**其他厂商**
- Intel Xe
- Apple Silicon GPU

## 🛠️ 如何添加新模块

### 步骤 1: 规划内容

在 `docs/` 中创建模块规划文档，例如：
```
docs/modules/tensor_core_plan.md
```

### 步骤 2: 准备数据

在 `web/` 中创建模块数据文件，例如：
```javascript
// web/tensor-core-data.js
const tensorCoreData = [
    {
        generation: 'Volta',
        year: 2017,
        // ...
    }
];
```

### 步骤 3: 添加导航

在 `web/index.html` 中添加导航项：
```html
<li class="nav-item" data-section="tensor-core">
    <span class="icon">🧮</span>
    <span>Tensor Core</span>
</li>
```

### 步骤 4: 创建页面内容

在 `web/index.html` 中添加内容区块：
```html
<section id="tensor-core" class="content-section">
    <h1 class="section-title">Tensor Core 架构</h1>
    <!-- 内容 -->
</section>
```

### 步骤 5: 实现交互逻辑

在 `web/app.js` 中添加（如果需要）：
```javascript
function renderTensorCoreContent() {
    // 渲染逻辑
}
```

### 步骤 6: 更新文档

更新 `README.md` 和 `CHANGELOG.md`

## 📋 模块模板

### 数据文件模板 (module-data.js)
```javascript
const moduleData = {
    title: '模块标题',
    description: '模块描述',
    items: [
        {
            id: 'item1',
            name: '项目名称',
            description: '描述',
            // 其他字段...
        }
    ]
};
```

### HTML 模板
```html
<section id="module-name" class="content-section">
    <h1 class="section-title">模块标题</h1>

    <div class="intro-box">
        <p>模块介绍</p>
    </div>

    <h2 class="subsection-title">子标题</h2>
    <div class="content-grid">
        <!-- 内容卡片 -->
    </div>
</section>
```

### CSS 样式复用
- `.concept-card` - 概念卡片
- `.format-card` - 格式卡片（可复用）
- `.matrix-container` - 表格容器
- `.modal` - 模态框

## 🎨 设计原则

### 一致性
- 使用现有的组件样式
- 保持深色主题
- 统一的交互模式

### 模块化
- 每个模块独立数据文件
- 独立的内容区块
- 可单独维护

### 简洁性
- 避免过度设计
- 信息密度适中
- 交互直接

## 💡 扩展示例

### 添加 "Tensor Core" 模块

1. **创建数据** (`web/tensor-core-data.js`)
```javascript
const tensorCoreGenerations = [
    {
        id: 'volta',
        name: 'Volta (1st Gen)',
        year: 2017,
        gpu: 'V100',
        supportedTypes: ['FP16', 'FP32'],
        throughput: '125 TFLOPS (FP16)',
        features: ['Mixed Precision']
    },
    // ...
];
```

2. **更新导航**
```html
<li class="nav-item" data-section="tensor-core">
    <span class="icon">🧮</span>
    <span>Tensor Core</span>
</li>
```

3. **添加内容区**
```html
<section id="tensor-core" class="content-section">
    <h1 class="section-title">Tensor Core 架构演进</h1>
    <div id="tensorCoreCards" class="format-cards"></div>
</section>
```

4. **渲染逻辑**
```javascript
function renderTensorCoreCards() {
    const container = document.getElementById('tensorCoreCards');
    tensorCoreGenerations.forEach(gen => {
        const card = createTensorCoreCard(gen);
        container.appendChild(card);
    });
}
```

## 📊 当前架构

```
web/
├── index.html          # 主页面（多模块导航）
├── styles.css          # 全局样式
├── app.js              # 主逻辑
├── data.js             # 精度格式数据
├── bit-visualizer.js   # 位结构可视化
└── syntax-highlighter.js # 代码高亮

未来扩展:
├── tensor-core-data.js      # Tensor Core 数据
├── memory-hierarchy-data.js # 内存架构数据
└── ...
```

## 🚀 扩展建议

### 短期（1-2 个模块）
- Tensor Core 架构演进
- 内存层次结构

### 中期（3-5 个模块）
- CUDA Core 详解
- 性能优化技巧
- Benchmark 方法

### 长期（持续扩展）
- GPU 架构对比
- 编程模型
- 案例研究

## 📝 命名规范

### 文件命名
- 数据文件: `module-name-data.js`
- 可视化: `module-name-visualizer.js`
- 工具函数: `module-name-utils.js`

### ID 命名
- 导航项: `data-section="module-name"`
- 内容区: `id="module-name"`
- CSS 类: `.module-name-card`

---

**从单一知识页面到 GPU 知识库 - 持续扩展，持续完善！**
