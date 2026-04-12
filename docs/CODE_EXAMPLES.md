# 代码示例框架覆盖

## 🎨 语法高亮

代码示例现在支持语法高亮，包括：

- **关键字**: `import`, `from`, `def`, `with`, `__global__`, 等
- **类型**: `torch`, `tf`, `np`, `__half`, `int8_t`, 等
- **函数**: 函数调用高亮
- **字符串**: 字符串字面量
- **数字**: 数值常量
- **注释**: Python (#) 和 C/C++ (//) 注释

## 📚 支持的框架

### Python 深度学习框架
- ✅ **PyTorch** - 主流训练框架
- ✅ **TensorFlow** - Google 框架
- ✅ **JAX** - Google 研究框架，TPU 优化

### 量化和推理框架
- ✅ **ONNX Runtime** - 跨平台推理
- ✅ **TensorRT** - NVIDIA 推理优化
- ✅ **vLLM** - LLM 推理引擎
- ✅ **llama.cpp** - CPU/Metal 量化推理
- ✅ **auto-gptq** - GPTQ 量化
- ✅ **AutoAWQ** - AWQ 量化
- ✅ **bitsandbytes** - NF4/INT8 量化
- ✅ **PEFT** - 参数高效微调

### 低级编程
- ✅ **CUDA** - NVIDIA GPU 编程
- ✅ **Triton** - OpenAI GPU 编程语言
- ✅ **cuBLAS** - NVIDIA 线性代数库

### 科学计算
- ✅ **NumPy** - 数值计算库
- ✅ **SciPy** - 科学计算库

## 📊 各格式的框架覆盖

| 格式 | PyTorch | CUDA | Triton | 其他框架 |
|-----|---------|------|--------|---------|
| FP64 | ✅ | ✅ | - | NumPy, SciPy |
| FP32 | ✅ | ✅ | ✅ | TensorFlow |
| TF32 | ✅ | ✅ (cuBLAS) | - | - |
| BF16 | ✅ | ✅ | - | JAX |
| FP16 | ✅ | ✅ | ✅ | - |
| FP8 E4M3 | ✅ (TE) | ✅ | ✅ | - |
| FP8 E5M2 | ✅ (TE) | - | - | - |
| INT16 | ✅ | ✅ | - | NumPy |
| INT8 | ✅ | ✅ | - | TensorRT, ONNX |
| INT4 | ✅ | - | - | GPTQ, AWQ, vLLM, llama.cpp |
| NF4 | ✅ | - | - | bitsandbytes, PEFT |

**TE** = Transformer Engine

## 🎯 示例类型

### 1. 基础使用
```python
# PyTorch
tensor = torch.tensor([1.0], dtype=torch.float32)
```

### 2. 混合精度训练
```python
# PyTorch AMP
from torch.cuda.amp import autocast
with autocast():
    output = model(input)
```

### 3. 量化部署
```python
# TensorRT INT8
config.set_flag(trt.BuilderFlag.INT8)
```

### 4. CUDA 编程
```c
// CUDA FP16
__global__ void kernel(__half* data) {
    __half x = data[idx];
}
```

### 5. Triton 编程
```python
# Triton
@triton.jit
def kernel(x_ptr):
    x = tl.load(x_ptr).to(tl.float16)
```

### 6. 量化工具
```python
# GPTQ
model = AutoGPTQForCausalLM.from_quantized(...)

# AWQ
model = AutoAWQForCausalLM.from_quantized(...)
```

## 💡 使用建议

### 学习路径

1. **入门**: 查看 FP32/FP16 的 PyTorch 示例
2. **混合精度**: 查看 BF16/FP16 的 autocast 用法
3. **量化**: 查看 INT8/INT4/NF4 的量化工具
4. **高性能**: 查看 CUDA/Triton 底层示例
5. **推理优化**: 查看 TensorRT/ONNX/vLLM 示例

### 框架选择

- **训练大模型**: PyTorch + BF16/FP16
- **推理优化**: TensorRT + INT8
- **LLM 量化**: GPTQ/AWQ + INT4
- **参数微调**: QLoRA + NF4
- **科学计算**: NumPy/SciPy + FP64
- **自定义算子**: CUDA/Triton + FP16/FP32

## 🔥 热门组合

### 组合 1: PyTorch + BF16 训练
```python
from torch.cuda.amp import autocast
with autocast(dtype=torch.bfloat16):
    loss = model(input)
```

### 组合 2: TensorRT + INT8 推理
```python
import tensorrt as trt
config.set_flag(trt.BuilderFlag.INT8)
```

### 组合 3: QLoRA + NF4 微调
```python
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4"
)
```

### 组合 4: CUDA + FP16 自定义算子
```c
__global__ void kernel(__half* data) {
    __half x = __float2half(1.5f);
}
```

### 组合 5: Triton + FP32 高性能计算
```python
@triton.jit
def kernel(x_ptr):
    x = tl.load(x_ptr).to(tl.float32)
```

---

**代码示例涵盖从高级框架到底层 CUDA，满足不同使用场景！**
