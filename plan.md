# <Plan Title>

## Goal Description
<Clear, direct description of what needs to be accomplished>

## Acceptance Criteria

Following TDD philosophy, each criterion includes positive and negative tests for deterministic verification.

- AC-1: <First criterion>
  - Positive Tests (expected to PASS):
    - <Test case that should succeed when criterion is met>
    - <Another success case>
  - Negative Tests (expected to FAIL):
    - <Test case that should fail/be rejected when working correctly>
    - <Another failure/rejection case>
  - AC-1.1: <Sub-criterion if needed>
    - Positive: <...>
    - Negative: <...>
- AC-2: <Second criterion>
  - Positive Tests: <...>
  - Negative Tests: <...>
...

## Path Boundaries

Path boundaries define the acceptable range of implementation quality and choices.

### Upper Bound (Maximum Acceptable Scope)
<Affirmative description of the most comprehensive acceptable implementation>
<This represents completing the goal without over-engineering>
Example: "The implementation includes X, Y, and Z features with full test coverage"

### Lower Bound (Minimum Acceptable Scope)
<Affirmative description of the minimum viable implementation>
<This represents the least effort that still satisfies all acceptance criteria>
Example: "The implementation includes core feature X with basic validation"

### Allowed Choices
<Options that are acceptable for implementation decisions>
- Can use: <technologies, approaches, patterns that are allowed>
- Cannot use: <technologies, approaches, patterns that are prohibited>

> **Note on Deterministic Designs**: If the draft specifies a highly deterministic design with no choices (e.g., "must use JSON format", "must use algorithm X"), then the path boundaries should reflect this narrow constraint. In such cases, upper and lower bounds may converge to the same point, and "Allowed Choices" should explicitly state that the choice is fixed per the draft specification.

## Feasibility Hints and Suggestions

> **Note**: This section is for reference and understanding only. These are conceptual suggestions, not prescriptive requirements.

### Conceptual Approach
<Text description, pseudocode, or diagrams showing ONE possible implementation path>

### Relevant References
<Code paths and concepts that might be useful>
- <path/to/relevant/component> - <brief description>

## Dependencies and Sequence

### Milestones
1. <Milestone 1>: <Description>
   - Phase A: <...>
   - Phase B: <...>
2. <Milestone 2>: <Description>
   - Step 1: <...>
   - Step 2: <...>

<Describe relative dependencies between components, not time estimates>

## Task Breakdown

Each task must include exactly one routing tag:
- `coding`: implemented by Claude
- `analyze`: executed via Codex (`/humanize:ask-codex`)

| Task ID | Description | Target AC | Tag (`coding`/`analyze`) | Depends On |
|---------|-------------|-----------|----------------------------|------------|
| task1 | <...> | AC-1 | coding | - |
| task2 | <...> | AC-2 | analyze | task1 |

## Claude-Codex Deliberation

### Agreements
- <Point both sides agree on>

### Resolved Disagreements
- <Topic>: Claude vs Codex summary, chosen resolution, and rationale

### Convergence Status
- Final Status: `converged` or `partially_converged`

## Pending User Decisions

- DEC-1: <Decision topic>
  - Claude Position: <...>
  - Codex Position: <...>
  - Tradeoff Summary: <...>
  - Decision Status: `PENDING` or `<User's final decision>`

## Implementation Notes

### Code Style Requirements
- Implementation code and comments must NOT contain plan-specific terminology such as "AC-", "Milestone", "Step", "Phase", or similar workflow markers
- These terms are for plan documentation only, not for the resulting codebase
- Use descriptive, domain-appropriate naming in code instead

## Output File Convention

This template is used to produce the main output file (e.g., `plan.md`).

### Translated Language Variant

When `alternative_plan_language` is set to a supported language name in `.humanize/config.json`, a translated variant of the output file is also written after the main file. The variant filename is constructed by inserting `_<code>` (the ISO 639-1 code from the built-in mapping table) immediately before the file extension:

- `plan.md` becomes `plan_<code>.md` (e.g. `plan_zh.md` for Chinese, `plan_ko.md` for Korean)
- `docs/my-plan.md` becomes `docs/my-plan_<code>.md`
- `output` (no extension) becomes `output_<code>`

The translated variant file contains a full translation of the main plan file's current content in the configured language. All identifiers (`AC-*`, task IDs, file paths, API names, command flags) remain unchanged, as they are language-neutral.

When `alternative_plan_language` is empty, absent, set to `"English"`, or set to an unsupported language, no translated variant is written. If `.humanize/config.json` does not exist at startup, a default config with `alternative_plan_language=""` is created automatically.

--- Original Design Draft Start ---

# 数据精度格式知识页面需求草稿

## 项目目标

做一个面向 AI 训练、推理、HPC 和工程选型场景的知识页面，系统整理各种数据精度格式，并通过可视化帮助用户理解它们之间的差异、联系、应用场景和硬件支持情况。

这个页面需要兼顾以下目标：

1. 让用户快速理解常见数据精度格式的定义和差异。
2. 让用户可以横向比较精度、动态范围、位宽、速度、显存占用和稳定性。
3. 让用户知道不同精度格式通常用于哪些计算卡、芯片家族和计算场景。
4. 让用户能通过图表和矩阵直观看到训练与推理中的选型逻辑。
5. 让页面后续能够继续扩展更多格式、硬件、厂商和说明字段。

## 收录范围

第一版按“全面整理”处理，包含基础格式、AI 常见格式、量化格式和扩展格式。

建议至少覆盖以下格式：

- FP64
- FP32
- TF32
- BF16
- FP16
- FP8 E4M3
- FP8 E5M2
- INT16
- INT8
- INT4
- FP4
- NF4
- MXFP4
- Posit
- Block Floating Point

如实现成本可控，也可以为每种格式补充别名、标准来源、是否 IEEE 风格、是否主要用于训练/推理/HPC、混合精度搭配方式等字段。

## 页面内容需求

页面至少应包含以下板块：

1. 顶部总览
   - 页面主题介绍
   - 数据精度格式的核心概念说明
   - 快速入口或筛选器

2. 格式关系可视化
   - 展示不同格式在位宽、精度、动态范围上的相对位置
   - 用户可点击某个格式查看详情

3. 格式详情卡片区
   - 每个格式包含简介、结构、适用场景、优缺点、训练/推理适配性、典型硬件支持

4. 硬件支持矩阵
   - 行为格式
   - 列为厂商和硬件家族
   - 体现支持、部分支持、模拟支持、主打支持等差异

5. 训练与推理选型区
   - 对比不同格式在训练、推理、量化部署、稳定性、吞吐和显存占用上的表现

6. 选型指南
   - 用决策树、问答卡片或推荐规则帮助用户选格式

7. 术语和注释区
   - 解释 exponent、mantissa、dynamic range、quantization 等术语

## 可视化需求

页面建议至少包含以下可视化：

1. 精度谱系图
   - 按格式类别和位宽串联展示

2. 动态范围 vs 精度散点图
   - 直观展示“范围大”和“精度高”不是一回事

3. 硬件支持热力矩阵
   - 展示各格式与硬件家族的对应关系

4. 训练与推理对照图
   - 展示不同格式在不同目标下的权衡

5. 可选扩展图
   - 内存占用对比
   - 吞吐潜力对比
   - 混合精度工作流示意图

## 硬件维度需求

需要整理主流 AI 和 HPC 相关硬件，优先按“厂商 -> 家族 -> 可选具体型号”的层级组织。

建议覆盖：

- NVIDIA
  - Volta
  - Turing
  - Ampere
  - Hopper
  - Blackwell
- AMD
  - CDNA 系列
  - RDNA AI 相关系列
- Intel
  - Xe 系列
  - Gaudi 系列
- Google TPU
- 华为昇腾

页面第一版可以先做到“家族级矩阵”，并预留后续下钻到具体型号的字段。

## 数据字段需求

每种格式建议包含以下字段：

- id
- 名称
- 分类
- 位宽
- 符号位
- 指数位
- 尾数位
- 动态范围说明
- 精度说明
- 是否适合训练
- 是否适合推理
- 是否常用于量化
- 是否主要用于 HPC
- 简介
- 典型用途
- 优点
- 缺点
- 常见混合精度搭配
- 相关术语
- 标准或来源说明
- 兼容/支持的硬件条目
- 备注

每个硬件支持条目建议包含：

- 厂商
- 家族
- 具体型号（可选）
- 支持级别
- 典型用途
- 说明
- 参考资料链接占位

## 交互需求

页面最好支持：

- 按格式类别筛选
- 按用途筛选：训练 / 推理 / HPC / 量化
- 按位宽筛选
- 按厂商筛选
- 点击格式查看详情
- 点击硬件查看支持说明
- 搜索格式名和别名
- 桌面端和移动端自适应

## 技术方向

未确定，但是UI风格我截了个图作为例子，在目录下的example.png中,要求操作尽量简单，以上的交互需求按照你的想法来做删减或添加，或者逐步实现，第一要义是简洁

## 质量要求

1. 信息结构清晰，不是单纯堆卡片。
2. 图表和数据卡片彼此联动。
3. 数据模型可扩展，后续补数据不需要大改页面结构。
4. 页面视觉上有明显的知识图谱感和工程资料感。
5. 第一版先保证信息框架完整，再逐步补全具体硬件和格式细节。

--- Original Design Draft End ---
