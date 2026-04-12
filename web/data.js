// 数据精度格式数据
const formatsData = [
    {
        id: 'fp64',
        name: 'FP64',
        category: 'standard',
        categoryName: '标准浮点',
        bits: 64,
        sign: 1,
        exponent: 11,
        mantissa: 52,
        dynamicRange: '约 10^±308',
        precision: '约 15-17 位十进制',
        training: true,
        inference: false,
        hpc: true,
        quantization: false,
        description: '双精度浮点数，IEEE 754 标准格式，提供最高精度和动态范围。',
        usage: '科学计算、金融模拟、高精度数值分析',
        pros: '极高精度、极大动态范围、数值稳定',
        cons: '占用内存大、计算速度慢、带宽需求高',
        mixedPrecision: '通常不用于混合精度训练',
        standard: 'IEEE 754-2008',
        hardware: ['nvidia-all', 'amd-all', 'intel-all'],
        memoryPerParam: 8,
        relativeSpeed: 0.5,
        codeExamples: [
            {
                lang: 'PyTorch',
                code: `import torch
model = model.double()
tensor = torch.tensor([1.0], dtype=torch.float64)`
            },
            {
                lang: 'NumPy',
                code: `import numpy as np
arr = np.array([1.0], dtype=np.float64)`
            },
            {
                lang: 'CUDA',
                code: `__global__ void kernel(double* data) {
    double x = data[idx];
}`
            },
            {
                lang: 'SciPy',
                code: `from scipy.integrate import odeint
result = odeint(func, y0, t)  # 默认 FP64`
            }
        ]
    },
    {
        id: 'fp32',
        name: 'FP32',
        category: 'standard',
        categoryName: '标准浮点',
        bits: 32,
        sign: 1,
        exponent: 8,
        mantissa: 23,
        dynamicRange: '约 10^±38',
        precision: '约 6-9 位十进制',
        training: true,
        inference: true,
        hpc: true,
        quantization: false,
        description: '单精度浮点数，AI 训练的传统标准格式，平衡精度和性能。',
        usage: '传统深度学习训练、模型权重存储、通用计算',
        pros: '精度充足、硬件支持广泛、生态成熟',
        cons: '相对较慢、内存占用较大',
        mixedPrecision: '常与 FP16/BF16 混合使用',
        standard: 'IEEE 754-2008',
        hardware: ['nvidia-all', 'amd-all', 'intel-all', 'google-tpu', 'huawei-ascend'],
        memoryPerParam: 4,
        relativeSpeed: 1.0,
        codeExamples: [
            {
                lang: 'PyTorch',
                code: `import torch
model = model.float()  # FP32 是默认类型
tensor = torch.tensor([1.0], dtype=torch.float32)`
            },
            {
                lang: 'TensorFlow',
                code: `import tensorflow as tf
model = tf.keras.Model(...)  # 默认 FP32`
            },
            {
                lang: 'CUDA',
                code: `__global__ void kernel(float* data) {
    float x = data[idx];  // 默认 float 是 FP32
}`
            },
            {
                lang: 'Triton',
                code: `import triton.language as tl
@triton.jit
def kernel(x_ptr):
    x = tl.load(x_ptr).to(tl.float32)`
            }
        ]
    },
    {
        id: 'tf32',
        name: 'TF32',
        category: 'ai',
        categoryName: 'AI专用',
        bits: 19,
        sign: 1,
        exponent: 8,
        mantissa: 10,
        dynamicRange: '约 10^±38 (同FP32)',
        precision: '约 3 位十进制',
        training: true,
        inference: false,
        hpc: false,
        quantization: false,
        description: 'NVIDIA Ampere 引入的格式，结合 FP32 范围和 FP16 性能，训练中自动使用。',
        usage: 'GPU 加速训练（自动启用）、矩阵运算',
        pros: '无需修改代码、保持 FP32 范围、性能提升明显',
        cons: '仅 NVIDIA Ampere+ 支持、精度略低于 FP32',
        mixedPrecision: '通常与 FP32 累加器配合',
        standard: 'NVIDIA 专有格式',
        hardware: ['nvidia-ampere', 'nvidia-hopper', 'nvidia-blackwell'],
        memoryPerParam: 4,
        relativeSpeed: 1.8,
        codeExamples: [
            {
                lang: 'PyTorch',
                code: `import torch
torch.backends.cuda.matmul.allow_tf32 = True
torch.backends.cudnn.allow_tf32 = True

# 矩阵乘法自动使用 TF32
result = torch.matmul(a, b)`
            },
            {
                lang: 'cuBLAS',
                code: `// FP32 数据自动在 TF32 上计算
cublasSgemm(...);

// 控制 TF32
cublasSetMathMode(handle, CUBLAS_TF32_TENSOR_OP_MATH);`
            }
        ]
    },
    {
        id: 'bf16',
        name: 'BF16',
        category: 'ai',
        categoryName: 'AI专用',
        bits: 16,
        sign: 1,
        exponent: 8,
        mantissa: 7,
        dynamicRange: '约 10^±38 (同FP32)',
        precision: '约 2-3 位十进制',
        training: true,
        inference: true,
        hpc: false,
        quantization: false,
        description: 'Google 提出的 Brain Float 16，保持 FP32 的指数范围，训练稳定性好。',
        usage: '大模型训练、混合精度训练、推理加速',
        pros: '训练稳定、无需 loss scaling、易于转换',
        cons: '精度低于 FP16、需硬件支持',
        mixedPrecision: 'BF16 计算 + FP32 累加',
        standard: 'Google Brain / IEEE 754-2019 补充',
        hardware: ['nvidia-ampere', 'nvidia-hopper', 'nvidia-blackwell', 'google-tpu', 'intel-gaudi', 'huawei-ascend'],
        memoryPerParam: 2,
        relativeSpeed: 2.5,
        codeExamples: [
            {
                lang: 'PyTorch',
                code: `import torch
model = model.to(torch.bfloat16)

# 混合精度训练
from torch.cuda.amp import autocast
with autocast(dtype=torch.bfloat16):
    output = model(input)`
            },
            {
                lang: 'CUDA',
                code: `#include <cuda_bf16.h>

__global__ void kernel(__nv_bfloat16* data) {
    __nv_bfloat16 x = data[idx];
}`
            },
            {
                lang: 'JAX',
                code: `import jax.numpy as jnp
x = jnp.array([1.0], dtype=jnp.bfloat16)`
            }
        ]
    },
    {
        id: 'fp16',
        name: 'FP16',
        category: 'standard',
        categoryName: '标准浮点',
        bits: 16,
        sign: 1,
        exponent: 5,
        mantissa: 10,
        dynamicRange: '约 10^±4.5',
        precision: '约 3-4 位十进制',
        training: true,
        inference: true,
        hpc: false,
        quantization: false,
        description: '半精度浮点数，广泛用于推理和混合精度训练，精度高于 BF16。',
        usage: '推理部署、混合精度训练、图形计算',
        pros: '精度较高、速度快、节省内存',
        cons: '范围小易溢出、训练需 loss scaling',
        mixedPrecision: 'FP16 计算 + FP32 权重',
        standard: 'IEEE 754-2008',
        hardware: ['nvidia-all', 'amd-all', 'intel-all', 'google-tpu'],
        memoryPerParam: 2,
        relativeSpeed: 2.0,
        codeExamples: [
            {
                lang: 'PyTorch',
                code: `from torch.cuda.amp import autocast, GradScaler

scaler = GradScaler()
model = model.half()

with autocast():
    output = model(input)
    loss = criterion(output, target)

scaler.scale(loss).backward()
scaler.step(optimizer)
scaler.update()`
            },
            {
                lang: 'CUDA',
                code: `#include <cuda_fp16.h>

__global__ void kernel(__half* data) {
    __half x = data[idx];
    __half y = __float2half(1.5f);
}`
            },
            {
                lang: 'Triton',
                code: `import triton.language as tl

@triton.jit
def kernel(x_ptr):
    x = tl.load(x_ptr).to(tl.float16)`
            }
        ]
    },
    {
        id: 'fp8_e4m3',
        name: 'FP8 E4M3',
        category: 'ai',
        categoryName: 'AI专用',
        bits: 8,
        sign: 1,
        exponent: 4,
        mantissa: 3,
        dynamicRange: '约 10^±4.5',
        precision: '约 1 位十进制',
        training: true,
        inference: true,
        hpc: false,
        quantization: true,
        description: 'FP8 格式的高精度变体，4 位指数 + 3 位尾数，适合前向传播。',
        usage: 'Transformer 训练、推理加速、激活量化',
        pros: '内存减半、吞吐量高、适合激活',
        cons: '需硬件支持、量化策略复杂',
        mixedPrecision: 'FP8 激活 + FP16/BF16 权重',
        standard: 'NVIDIA / OCP (开放计算项目)',
        hardware: ['nvidia-hopper', 'nvidia-blackwell', 'amd-cdna3'],
        memoryPerParam: 1,
        relativeSpeed: 3.5,
        codeExamples: [
            {
                lang: 'Transformer Engine',
                code: `import transformer_engine.pytorch as te

with te.fp8_autocast(enabled=True):
    output = model(input)  # H100 加速`
            },
            {
                lang: 'CUDA',
                code: `#include <cuda_fp8.h>

__global__ void kernel(__nv_fp8_e4m3* data) {
    __nv_fp8_e4m3 x = data[idx];
}`
            }
        ]
    },
    {
        id: 'fp8_e5m2',
        name: 'FP8 E5M2',
        category: 'ai',
        categoryName: 'AI专用',
        bits: 8,
        sign: 1,
        exponent: 5,
        mantissa: 2,
        dynamicRange: '约 10^±9',
        precision: '约 0.5 位十进制',
        training: true,
        inference: true,
        hpc: false,
        quantization: true,
        description: 'FP8 格式的宽范围变体，5 位指数 + 2 位尾数，适合梯度和权重。',
        usage: '梯度量化、权重量化、混合精度训练',
        pros: '范围大、适合梯度、训练稳定',
        cons: '精度最低、需仔细调优',
        mixedPrecision: 'E5M2 梯度 + E4M3 激活',
        standard: 'NVIDIA / OCP',
        hardware: ['nvidia-hopper', 'nvidia-blackwell', 'amd-cdna3'],
        memoryPerParam: 1,
        relativeSpeed: 3.2,
        codeExamples: [
            {
                lang: 'Transformer Engine',
                code: `import transformer_engine.pytorch as te

# E5M2 适合梯度，E4M3 适合激活
with te.fp8_autocast(fp8_recipe=recipe):
    loss = model(input)  # H100 硬件加速`
            }
        ]
    },
    {
        id: 'int16',
        name: 'INT16',
        category: 'quantize',
        categoryName: '量化格式',
        bits: 16,
        sign: 1,
        exponent: 0,
        mantissa: 15,
        dynamicRange: '-32768 ~ 32767',
        precision: '整数',
        training: false,
        inference: true,
        hpc: false,
        quantization: true,
        description: '16 位整数，较少用于 AI，偶见于音频处理或特殊量化场景。',
        usage: '音频处理、特殊推理场景',
        pros: '简单、计算快',
        cons: '不常用于主流 AI',
        mixedPrecision: '较少参与混合精度',
        standard: '标准整数类型',
        hardware: ['nvidia-all', 'amd-all', 'intel-all'],
        memoryPerParam: 2,
        relativeSpeed: 2.5,
        codeExamples: [
            {
                lang: 'PyTorch',
                code: `import torch
tensor = torch.tensor([1, 2, 3], dtype=torch.int16)`
            },
            {
                lang: 'NumPy',
                code: `import numpy as np
audio = np.array(samples, dtype=np.int16)  # 音频`
            }
        ]
    },
    {
        id: 'int8',
        name: 'INT8',
        category: 'quantize',
        categoryName: '量化格式',
        bits: 8,
        sign: 1,
        exponent: 0,
        mantissa: 7,
        dynamicRange: '-128 ~ 127',
        precision: '整数',
        training: false,
        inference: true,
        hpc: false,
        quantization: true,
        description: '8 位整数，推理量化的主流格式，大幅提升吞吐量和降低内存。',
        usage: '模型量化部署、边缘推理、推理服务器',
        pros: '极快、内存小、硬件支持好',
        cons: '精度损失、需量化校准',
        mixedPrecision: '常用于推理量化',
        standard: '标准整数类型',
        hardware: ['nvidia-all', 'amd-all', 'intel-all', 'google-tpu', 'huawei-ascend'],
        memoryPerParam: 1,
        relativeSpeed: 4.0,
        codeExamples: [
            {
                lang: 'PyTorch',
                code: `import torch.quantization as quantization

model_int8 = quantization.quantize_dynamic(
    model, {torch.nn.Linear}, dtype=torch.qint8
)`
            },
            {
                lang: 'TensorRT',
                code: `import tensorrt as trt

config.set_flag(trt.BuilderFlag.INT8)`
            },
            {
                lang: 'ONNX Runtime',
                code: `from onnxruntime.quantization import quantize_dynamic

quantize_dynamic(model_input, model_output)`
            },
            {
                lang: 'CUDA',
                code: `__global__ void kernel(int8_t* data) {
    int8_t x = data[idx];
}`
            }
        ]
    },
    {
        id: 'int4',
        name: 'INT4',
        category: 'quantize',
        categoryName: '量化格式',
        bits: 4,
        sign: 0,
        exponent: 0,
        mantissa: 4,
        dynamicRange: '0 ~ 15 或 -8 ~ 7',
        precision: '整数',
        training: false,
        inference: true,
        hpc: false,
        quantization: true,
        description: '4 位整数，极致压缩格式，用于大模型量化和边缘部署。',
        usage: 'LLM 量化（GPTQ/AWQ）、边缘设备、移动端',
        pros: '极小内存、极快推理',
        cons: '精度损失大、需精细量化',
        mixedPrecision: '与 INT8/FP16 混合',
        standard: '标准整数类型',
        hardware: ['nvidia-ampere', 'nvidia-hopper', 'intel-gaudi'],
        memoryPerParam: 0.5,
        relativeSpeed: 6.0,
        codeExamples: [
            {
                lang: 'GPTQ',
                code: `from auto_gptq import AutoGPTQForCausalLM

model = AutoGPTQForCausalLM.from_quantized(
    model_name, use_safetensors=True
)`
            },
            {
                lang: 'AWQ',
                code: `from awq import AutoAWQForCausalLM

model = AutoAWQForCausalLM.from_quantized(
    model_name, quantization_config=config
)`
            },
            {
                lang: 'llama.cpp',
                code: `# INT4 量化模型
./main -m model-q4_0.gguf -n 128`
            },
            {
                lang: 'vLLM',
                code: `from vllm import LLM

llm = LLM(model="model", quantization="awq")`
            }
        ]
    },
    {
        id: 'fp4',
        name: 'FP4',
        category: 'quantize',
        categoryName: '量化格式',
        bits: 4,
        sign: 1,
        exponent: 2,
        mantissa: 1,
        dynamicRange: '非常有限',
        precision: '极低',
        training: false,
        inference: true,
        hpc: false,
        quantization: true,
        description: '4 位浮点格式，保留浮点特性但精度极低，用于实验性量化。',
        usage: '实验性量化、研究',
        pros: '保留浮点特性',
        cons: '精度极低、硬件支持少',
        mixedPrecision: '实验性质',
        standard: '研究性格式',
        hardware: [],
        memoryPerParam: 0.5,
        relativeSpeed: 5.5,
        codeExamples: []  // 实验性格式，暂无主流框架支持
    },
    {
        id: 'nf4',
        name: 'NF4',
        category: 'quantize',
        categoryName: '量化格式',
        bits: 4,
        sign: 1,
        exponent: 0,
        mantissa: 3,
        dynamicRange: '针对正态分布优化',
        precision: '非均匀量化',
        training: false,
        inference: true,
        hpc: false,
        quantization: true,
        description: 'Normal Float 4，针对神经网络权重正态分布优化的 4 位格式。',
        usage: 'QLoRA、LLM 量化微调',
        pros: '针对权重分布优化、QLoRA 标配',
        cons: '需特殊库支持',
        mixedPrecision: '与 BF16 混合（QLoRA）',
        standard: 'bitsandbytes 库',
        hardware: ['nvidia-ampere', 'nvidia-hopper'],
        memoryPerParam: 0.5,
        relativeSpeed: 5.0,
        codeExamples: [
            {
                lang: 'QLoRA',
                code: `from transformers import BitsAndBytesConfig, AutoModelForCausalLM

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16
)

model = AutoModelForCausalLM.from_pretrained(
    model_name, quantization_config=bnb_config
)`
            },
            {
                lang: 'PEFT',
                code: `from peft import prepare_model_for_kbit_training, LoraConfig

model = prepare_model_for_kbit_training(model)
lora_config = LoraConfig(r=16, lora_alpha=32)`
            }
        ]
    },
    {
        id: 'mxfp4',
        name: 'MXFP4',
        category: 'extended',
        categoryName: '扩展格式',
        bits: 4,
        sign: 1,
        exponent: 0,
        mantissa: 3,
        dynamicRange: '共享指数',
        precision: '块级量化',
        training: false,
        inference: true,
        hpc: false,
        quantization: true,
        description: 'Microscaling FP4，块级共享指数的 4 位格式，OCP 推动的标准。',
        usage: '新一代量化、推理优化',
        pros: '硬件友好、标准化',
        cons: '较新、生态未成熟',
        mixedPrecision: '可与 MXFP6/MXFP8 混合',
        standard: 'OCP MX 标准',
        hardware: ['nvidia-blackwell'],
        memoryPerParam: 0.5,
        relativeSpeed: 6.5,
        codeExamples: []  // 较新标准，库支持开发中
    },
    {
        id: 'posit',
        name: 'Posit',
        category: 'extended',
        categoryName: '扩展格式',
        bits: '可变',
        sign: 1,
        exponent: '可变',
        mantissa: '可变',
        dynamicRange: '自适应',
        precision: '自适应',
        training: false,
        inference: false,
        hpc: true,
        quantization: false,
        description: '新型数值系统，动态分配指数和尾数，理论上比浮点更高效。',
        usage: '科学计算研究、理论探索',
        pros: '理论优势明显、精度可变',
        cons: '硬件支持几乎没有、生态缺失',
        mixedPrecision: '理论研究阶段',
        standard: 'Posit Working Group',
        hardware: [],
        memoryPerParam: 2,
        relativeSpeed: 0.8,
        codeExamples: []  // 生态尚未成熟
    },
    {
        id: 'bfp',
        name: 'Block FP',
        category: 'extended',
        categoryName: '扩展格式',
        bits: '可变',
        sign: 1,
        exponent: '共享',
        mantissa: '可变',
        dynamicRange: '块级共享指数',
        precision: '可变',
        training: true,
        inference: true,
        hpc: false,
        quantization: true,
        description: 'Block Floating Point，一组数共享一个指数，减少存储和带宽。',
        usage: '特定硬件加速器、研究',
        pros: '节省存储、硬件实现简单',
        cons: '需特定硬件、应用有限',
        mixedPrecision: '取决于硬件实现',
        standard: '多种变体',
        hardware: ['intel-nervana'],
        memoryPerParam: 1.5,
        relativeSpeed: 2.0,
        codeExamples: []  // 特定硬件，生态有限
    },
    {
        id: 'int1',
        name: 'INT1 (Binary)',
        category: 'quantize',
        categoryName: '量化格式',
        bits: 1,
        sign: 0,
        exponent: 0,
        mantissa: 1,
        dynamicRange: '0 或 1',
        precision: '二值',
        training: false,
        inference: true,
        hpc: false,
        quantization: true,
        description: '二值网络，权重和激活仅为 0/1 或 -1/+1，极致压缩。',
        usage: '边缘设备、实验性网络',
        pros: '极致压缩、极快推理',
        cons: '精度损失极大、应用受限',
        mixedPrecision: '较少使用',
        standard: '研究性质',
        hardware: [],
        memoryPerParam: 0.125,
        relativeSpeed: 8.0,
        codeExamples: []  // 研究性质，应用受限
    }
];

// 硬件支持数据
const hardwareData = {
    vendors: [
        {
            id: 'nvidia',
            name: 'NVIDIA',
            families: [
                { id: 'volta', name: 'Volta', generation: 'V100' },
                { id: 'turing', name: 'Turing', generation: 'T4, RTX 20' },
                { id: 'ampere', name: 'Ampere', generation: 'A100, RTX 30/40' },
                { id: 'hopper', name: 'Hopper', generation: 'H100, H200' },
                { id: 'blackwell', name: 'Blackwell', generation: 'B100, B200' }
            ]
        },
        {
            id: 'amd',
            name: 'AMD',
            families: [
                { id: 'cdna2', name: 'CDNA 2', generation: 'MI200' },
                { id: 'cdna3', name: 'CDNA 3', generation: 'MI300' }
            ]
        },
        {
            id: 'intel',
            name: 'Intel',
            families: [
                { id: 'xe', name: 'Xe', generation: 'Data Center GPU' },
                { id: 'gaudi', name: 'Gaudi', generation: 'Gaudi 2/3' }
            ]
        },
        {
            id: 'google',
            name: 'Google',
            families: [
                { id: 'tpu-v3', name: 'TPU v3', generation: '2018' },
                { id: 'tpu-v4', name: 'TPU v4', generation: '2020' },
                { id: 'tpu-v5e', name: 'TPU v5e', generation: '2023' },
                { id: 'tpu-v5p', name: 'TPU v5p', generation: '2023' }
            ]
        },
        {
            id: 'huawei',
            name: '华为',
            families: [
                { id: 'ascend-910', name: '昇腾 910', generation: '2019' },
                { id: 'ascend-910b', name: '昇腾 910B', generation: '2022' },
                { id: 'ascend-910c', name: '昇腾 910C', generation: '2024' }
            ]
        }
    ]
};

// 硬件支持矩阵（格式 x 硬件架构）
const hardwareSupport = {
    'fp64': {
        'nvidia-volta': 'full', 'nvidia-turing': 'full', 'nvidia-ampere': 'full', 'nvidia-hopper': 'full', 'nvidia-blackwell': 'full',
        'amd-cdna2': 'full', 'amd-cdna3': 'full',
        'intel-xe': 'full', 'intel-gaudi': 'partial',
        'google-tpu-v3': 'none', 'google-tpu-v4': 'none', 'google-tpu-v5e': 'none', 'google-tpu-v5p': 'none',
        'huawei-ascend-910': 'full', 'huawei-ascend-910b': 'full', 'huawei-ascend-910c': 'full'
    },
    'fp32': {
        'nvidia-volta': 'native', 'nvidia-turing': 'native', 'nvidia-ampere': 'native', 'nvidia-hopper': 'native', 'nvidia-blackwell': 'native',
        'amd-cdna2': 'native', 'amd-cdna3': 'native',
        'intel-xe': 'native', 'intel-gaudi': 'native',
        'google-tpu-v3': 'native', 'google-tpu-v4': 'native', 'google-tpu-v5e': 'native', 'google-tpu-v5p': 'native',
        'huawei-ascend-910': 'native', 'huawei-ascend-910b': 'native', 'huawei-ascend-910c': 'native'
    },
    'tf32': {
        'nvidia-volta': 'none', 'nvidia-turing': 'none', 'nvidia-ampere': 'native', 'nvidia-hopper': 'native', 'nvidia-blackwell': 'native',
        'amd-cdna2': 'none', 'amd-cdna3': 'none',
        'intel-xe': 'none', 'intel-gaudi': 'none',
        'google-tpu-v3': 'none', 'google-tpu-v4': 'none', 'google-tpu-v5e': 'none', 'google-tpu-v5p': 'none',
        'huawei-ascend-910': 'none', 'huawei-ascend-910b': 'none', 'huawei-ascend-910c': 'none'
    },
    'bf16': {
        'nvidia-volta': 'none', 'nvidia-turing': 'none', 'nvidia-ampere': 'native', 'nvidia-hopper': 'native', 'nvidia-blackwell': 'native',
        'amd-cdna2': 'partial', 'amd-cdna3': 'native',
        'intel-xe': 'native', 'intel-gaudi': 'native',
        'google-tpu-v3': 'native', 'google-tpu-v4': 'native', 'google-tpu-v5e': 'native', 'google-tpu-v5p': 'native',
        'huawei-ascend-910': 'partial', 'huawei-ascend-910b': 'native', 'huawei-ascend-910c': 'native'
    },
    'fp16': {
        'nvidia-volta': 'native', 'nvidia-turing': 'native', 'nvidia-ampere': 'native', 'nvidia-hopper': 'native', 'nvidia-blackwell': 'native',
        'amd-cdna2': 'native', 'amd-cdna3': 'native',
        'intel-xe': 'native', 'intel-gaudi': 'native',
        'google-tpu-v3': 'native', 'google-tpu-v4': 'native', 'google-tpu-v5e': 'native', 'google-tpu-v5p': 'native',
        'huawei-ascend-910': 'native', 'huawei-ascend-910b': 'native', 'huawei-ascend-910c': 'native'
    },
    'fp8_e4m3': {
        'nvidia-volta': 'none', 'nvidia-turing': 'none', 'nvidia-ampere': 'none', 'nvidia-hopper': 'native', 'nvidia-blackwell': 'native',
        'amd-cdna2': 'none', 'amd-cdna3': 'native',
        'intel-xe': 'none', 'intel-gaudi': 'partial',
        'google-tpu-v3': 'none', 'google-tpu-v4': 'none', 'google-tpu-v5e': 'partial', 'google-tpu-v5p': 'native',
        'huawei-ascend-910': 'none', 'huawei-ascend-910b': 'none', 'huawei-ascend-910c': 'partial'
    },
    'fp8_e5m2': {
        'nvidia-volta': 'none', 'nvidia-turing': 'none', 'nvidia-ampere': 'none', 'nvidia-hopper': 'native', 'nvidia-blackwell': 'native',
        'amd-cdna2': 'none', 'amd-cdna3': 'native',
        'intel-xe': 'none', 'intel-gaudi': 'partial',
        'google-tpu-v3': 'none', 'google-tpu-v4': 'none', 'google-tpu-v5e': 'partial', 'google-tpu-v5p': 'native',
        'huawei-ascend-910': 'none', 'huawei-ascend-910b': 'none', 'huawei-ascend-910c': 'partial'
    },
    'int8': {
        'nvidia-volta': 'native', 'nvidia-turing': 'native', 'nvidia-ampere': 'native', 'nvidia-hopper': 'native', 'nvidia-blackwell': 'native',
        'amd-cdna2': 'native', 'amd-cdna3': 'native',
        'intel-xe': 'native', 'intel-gaudi': 'native',
        'google-tpu-v3': 'native', 'google-tpu-v4': 'native', 'google-tpu-v5e': 'native', 'google-tpu-v5p': 'native',
        'huawei-ascend-910': 'native', 'huawei-ascend-910b': 'native', 'huawei-ascend-910c': 'native'
    },
    'int4': {
        'nvidia-volta': 'none', 'nvidia-turing': 'none', 'nvidia-ampere': 'partial', 'nvidia-hopper': 'native', 'nvidia-blackwell': 'native',
        'amd-cdna2': 'none', 'amd-cdna3': 'partial',
        'intel-xe': 'none', 'intel-gaudi': 'partial',
        'google-tpu-v3': 'none', 'google-tpu-v4': 'partial', 'google-tpu-v5e': 'partial', 'google-tpu-v5p': 'native',
        'huawei-ascend-910': 'none', 'huawei-ascend-910b': 'partial', 'huawei-ascend-910c': 'partial'
    }
};
