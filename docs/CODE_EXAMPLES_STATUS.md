# 代码示例覆盖状态

## ✅ 已完成的格式

| 格式 | 示例数量 | 框架列表 |
|-----|---------|---------|
| FP64 | 4个 | PyTorch, NumPy, CUDA, SciPy |
| FP32 | 4个 | PyTorch, TensorFlow, CUDA, Triton |
| TF32 | 2个 | PyTorch, cuBLAS |
| BF16 | 3个 | PyTorch, CUDA, JAX |
| FP16 | 3个 | PyTorch, CUDA, Triton |
| FP8 E4M3 | 2个 | Transformer Engine, CUDA |
| FP8 E5M2 | 1个 | Transformer Engine |
| INT16 | 2个 | PyTorch, NumPy |
| INT8 | 4个 | PyTorch, TensorRT, ONNX Runtime, CUDA |
| INT4 | 4个 | GPTQ, AWQ, llama.cpp, vLLM |
| NF4 | 2个 | QLoRA, PEFT |

**总计**: 11 个格式，31 个代码示例

## ⚪ 无示例的格式

| 格式 | 原因 |
|-----|------|
| FP4 | 实验性格式，暂无主流框架支持 |
| MXFP4 | 较新标准，库支持开发中 |
| Posit | 生态尚未成熟 |
| Block FP | 特定硬件，生态有限 |
| INT1 | 研究性质，应用受限 |

## 📊 框架覆盖统计

### 深度学习框架 (5个)
- PyTorch: 9 个格式
- TensorFlow: 1 个格式
- JAX: 1 个格式
- Transformer Engine: 2 个格式
- PEFT/QLoRA: 2 个格式

### 量化推理 (5个)
- TensorRT: 1 个格式
- ONNX Runtime: 1 个格式
- GPTQ: 1 个格式
- AWQ: 1 个格式
- vLLM: 1 个格式
- llama.cpp: 1 个格式

### 底层编程 (2个)
- CUDA: 7 个格式
- Triton: 2 个格式
- cuBLAS: 1 个格式

### 科学计算 (2个)
- NumPy: 2 个格式
- SciPy: 1 个格式

## 🎨 语法高亮特性

- ✅ 关键字高亮（粉色）
- ✅ 类型高亮（蓝色）
- ✅ 函数高亮（蓝色）
- ✅ 字符串高亮（绿色）
- ✅ 数字高亮（紫色）
- ✅ 注释高亮（灰色斜体）
- ✅ 装饰器高亮（@triton.jit）

## 📦 代码框样式

- ✅ 框架标签（顶部标签）
- ✅ 独立代码框（每个框架一个）
- ✅ 深色背景
- ✅ 等宽字体
- ✅ 横向滚动（长代码）

## 🔍 验证方法

1. 打开页面
2. 点击"格式详情"
3. 依次点击以下格式卡片：
   - FP32 (应该看到 4 个代码框)
   - INT8 (应该看到 4 个代码框)
   - INT4 (应该看到 4 个代码框)
   - FP8 E4M3 (应该看到 2 个代码框)
   - NF4 (应该看到 2 个代码框)

4. 检查代码是否有语法高亮（彩色）
5. 检查框架标签是否显示

## ✨ 示例质量

### 覆盖场景
- ✅ 训练（PyTorch, TensorFlow）
- ✅ 推理（TensorRT, ONNX, vLLM）
- ✅ 量化（GPTQ, AWQ, QLoRA）
- ✅ 底层编程（CUDA, Triton）
- ✅ 科学计算（NumPy, SciPy）
- ✅ 边缘部署（llama.cpp）

### 代码特点
- ✅ 简洁实用
- ✅ 注释清晰
- ✅ 可直接参考
- ✅ 框架官方推荐用法

---

**代码示例覆盖主流场景，满足不同用户需求！**
