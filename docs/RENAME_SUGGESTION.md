# 项目重命名建议

## 当前项目定位

项目已从**单一的数据精度格式知识页面**升级为 **GPU 知识库平台**。

## 📁 建议的项目名称

### 方案 1: GPU-Knowledge-Base
```
GPU-Knowledge-Base/
├── web/
├── docs/
└── README.md
```

### 方案 2: GPU-Microarchitecture
```
GPU-Microarchitecture/
├── web/
├── docs/
└── README.md
```

### 方案 3: GPU-Notes
```
GPU-Notes/
├── web/
├── docs/
└── README.md
```

### 方案 4: gpu-wiki (推荐)
```
gpu-wiki/
├── web/
├── docs/
└── README.md
```

## 🔄 重命名步骤

### 方法 1: 本地重命名
```bash
# 在项目父目录执行
cd /Users/zhouzhe/vibe_coding
mv 数据精度格式学习 gpu-wiki

# 或使用其他方案名称
mv 数据精度格式学习 GPU-Knowledge-Base
```

### 方法 2: Git 重命名（如果已推送到远程）
```bash
# 本地重命名
mv 数据精度格式学习 gpu-wiki

# 更新 Git
cd gpu-wiki
git add .
git commit -m "Rename project: 数据精度格式学习 → gpu-wiki"
```

## 📝 重命名后需要更新的文件

### 文档文件
- ✅ README.md (已更新标题)
- ✅ web/index.html (已更新标题)
- ⚠️ 其他文档可能需要更新项目名称引用

### 路径相关
- 如果有硬编码路径，需要更新
- Git 远程仓库名称（GitHub/GitLab）
- 文档中的链接

## 💡 建议

**推荐使用**: `gpu-wiki` 或 `GPU-Notes`

**原因**:
- 简洁易记
- 准确反映内容
- 便于后续扩展
- 英文名称便于分享

## 🎯 当前状态

当前文件夹名: `数据精度格式学习`
- ❌ 名称过于具体，不反映知识库定位
- ❌ 中文名称在某些环境可能有兼容问题

建议新名称: `gpu-wiki`
- ✅ 简洁清晰
- ✅ 反映知识库性质
- ✅ 便于扩展
- ✅ 兼容性好

---

**重命名是可选的，但建议尽早进行以避免后续迁移成本。**
