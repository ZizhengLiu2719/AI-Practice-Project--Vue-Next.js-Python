# AI-Practice-Project--Vue-Next.js-Python

## 智能支付助手聊天系统 (Smart Payment Assistant)

这是一个针对 HSBC AI 团队面试准备的实践项目，模拟真实的 AI Agent 前端开发场景。

---

## 📋 项目概述

本项目是一个连接 AI Agent 的 Web 应用，用户可以通过对话界面查询支付信息、分析交易数据、获取金融建议。主要用于学习和展示前端开发在 AI 应用中的核心能力。

**技术栈**：Vue 3 + Next.js + Python FastAPI + AI Agents

---

## 🏗️ 项目结构设计说明

### 整体架构设计理念

```
smart-payment-assistant/
├── frontend-nextjs/          # Next.js主前端应用
├── frontend-vue/              # Vue 3独立仪表板模块
├── backend-python/            # Python FastAPI后端 + AI Agents
├── .gitignore
└── README.md
```

---

## 🎯 为什么采用这种结构？

### 1️⃣ **分离前端技术栈** (`frontend-nextjs/` + `frontend-vue/`)

#### 设计原因：

- **技术要求匹配**：岗位明确要求掌握 Vue 和 Next.js 两种框架
- **真实业务场景**：企业级应用常见混合前端架构（微前端思想）
- **职责明确**：
  - Next.js：主应用框架，处理路由、SSR、用户交互
  - Vue 3：专注数据可视化仪表板，展示不同框架的协作能力

#### 实际应用价值：

在 HSBC 这样的大型金融机构中，不同团队可能使用不同技术栈，需要前端开发者能够：

- 整合多个框架到一个应用中
- 理解各框架的优势并合理分配职责
- 实现跨框架的数据通信

---

### 2️⃣ **Next.js 目录结构** (`frontend-nextjs/`)

```
frontend-nextjs/
├── pages/                 # 页面路由（Next.js约定）
│   ├── index.tsx         # 首页 - 主聊天界面
│   └── api/              # API Routes（后端代理层）
│       └── proxy.ts      # 代理Python后端请求
├── components/            # React组件
│   ├── ChatInterface.tsx # 聊天主界面
│   ├── MessageList.tsx   # 消息列表
│   └── VueDashboard.vue  # Vue仪表板组件
├── hooks/                 # 自定义Hooks
│   └── useChat.ts        # 聊天逻辑封装
├── styles/                # 样式文件
├── next.config.js         # Next.js配置
├── tsconfig.json          # TypeScript配置
└── package.json
```

#### 设计原因：

**a) `pages/` 目录**：

- 采用 Next.js 的文件系统路由
- `pages/api/`实现 BFF（Backend For Frontend）模式
- 为什么需要 API 代理层？
  - 隐藏后端 API 细节
  - 处理 CORS 问题
  - 统一前端错误处理
  - 在生产环境中更安全（API 密钥不暴露给浏览器）

**b) `components/` 目录**：

- 遵循组件化开发原则
- `ChatInterface.tsx`：顶层容器组件
- `MessageList.tsx`：可复用的展示组件
- `VueDashboard.vue`：跨框架组件示例

**c) `hooks/` 目录**：

- 展示 React Hooks 最佳实践
- 分离业务逻辑和 UI 渲染
- `useChat.ts`封装聊天状态管理、WebSocket 连接等复杂逻辑

---

### 3️⃣ **Vue 独立模块** (`frontend-vue/`)

```
frontend-vue/
├── src/
│   ├── components/
│   │   ├── TransactionChart.vue   # 交易趋势图表
│   │   └── MetricsCard.vue        # 统计卡片
│   └── App.vue
├── vite.config.ts
└── package.json
```

#### 设计原因：

**为什么独立出 Vue 项目而不是全部用 Next.js？**

1. **展示跨框架集成能力**：

   - 在 Next.js 中嵌入 Vue 组件是高级技能
   - 模拟真实的微前端架构

2. **技术适配性**：

   - Vue 在数据可视化方面生态丰富（如 ECharts、Chart.js）
   - Composition API 适合复杂的数据处理逻辑
   - 响应式系统天然适合实时数据更新

3. **可选部署方式**：

   - 方式 1：编译后作为组件嵌入 Next.js
   - 方式 2：独立部署，通过 iframe 集成
   - 方式 3：作为 Web Component 使用

4. **面试加分点**：
   - 展示对两个框架的深入理解
   - 证明架构设计能力
   - 体现解决实际问题的思维

---

### 4️⃣ **Python 后端架构** (`backend-python/`)

```
backend-python/
├── app/
│   ├── main.py                # FastAPI应用入口
│   ├── agents/                # AI Agent层（核心业务逻辑）
│   │   ├── query_agent.py     # 数据查询Agent
│   │   ├── analysis_agent.py  # 数据分析Agent
│   │   └── orchestrator.py    # Agent协调器
│   ├── api/                   # API路由层
│   │   ├── chat.py           # 聊天接口
│   │   └── data.py           # 数据接口
│   ├── services/              # 服务层
│   │   ├── llm_service.py    # LLM调用服务
│   │   └── data_service.py   # 数据服务
│   └── models/                # 数据模型
│       └── schemas.py        # Pydantic schemas
├── requirements.txt
└── env.template
```

#### 设计原因：

**a) 分层架构（Layered Architecture）**：

```
用户请求 → API路由层 → Agent层 → 服务层 → 外部API/数据库
         (chat.py)  (orchestrator) (llm_service)
```

这种分层的好处：

- **职责单一**：每层只关注自己的任务
- **易于测试**：可以 mock 任何一层
- **易于扩展**：添加新 Agent 不影响 API 层
- **符合企业级开发规范**：HSBC 等大型企业要求的代码组织方式

**b) `agents/` 目录（核心设计）**：

为什么需要三个文件？

- `query_agent.py`：专门处理"查询类"请求

  - 示例："查询上周的交易记录"
  - 功能：SQL 生成、数据检索、格式化输出

- `analysis_agent.py`：处理"分析类"请求

  - 示例："分析本月消费趋势"
  - 功能：数据聚合、统计分析、生成洞察

- `orchestrator.py`：多 Agent 协调器（关键设计）
  - 职责：理解用户意图 → 选择合适的 Agent → 组合多个 Agent 结果
  - 示例：用户问"上个月花了多少钱，和之前比如何？"
    - 需要 Query Agent 获取数据
    - 再调用 Analysis Agent 进行对比分析

**为什么这样设计对面试重要？**

这展示了你对**Agentic AI**的理解：

- Ze Wei 明确提到 2026 重点是 agentic AI
- 这种多 Agent 协作是当前 AI 应用的趋势
- 体现了系统设计能力，不仅仅是调用 API

**c) `api/` vs `services/` 分离**：

- `api/`：FastAPI 路由，处理 HTTP 请求/响应

  - 职责：参数验证、错误处理、返回格式化

- `services/`：业务逻辑封装
  - `llm_service.py`：统一 LLM 调用接口
    - 支持多个 LLM provider（OpenAI、Azure、Gemini）
    - 重试逻辑、错误处理、token 计算
  - `data_service.py`：数据访问层
    - 模拟数据库操作
    - 缓存逻辑

**为什么分开？**

- API 层可能需要改动（加新 endpoint）
- Service 层保持稳定（业务逻辑不变）
- 多个 API 可以共享同一个 Service
- 便于单元测试

**d) `models/schemas.py`**：

使用 Pydantic 的原因：

- 自动数据验证
- API 文档自动生成（FastAPI 的杀手级功能）
- 类型安全
- 与 TypeScript 类型定义对应，前后端类型一致

---

## 🔄 数据流设计

```
┌─────────────────────────────────────────────────┐
│  用户在浏览器输入消息                              │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  Next.js Frontend (React Component)             │
│  - ChatInterface.tsx 捕获输入                    │
│  - useChat Hook 管理状态                         │
└─────────────────┬───────────────────────────────┘
                  │ HTTP POST
                  ▼
┌─────────────────────────────────────────────────┐
│  Next.js API Route (/api/proxy.ts)              │
│  - 转发请求到Python后端                          │
│  - 处理流式响应（SSE/WebSocket）                  │
└─────────────────┬───────────────────────────────┘
                  │ HTTP POST
                  ▼
┌─────────────────────────────────────────────────┐
│  Python FastAPI (/app/api/chat.py)              │
│  - 接收请求                                      │
│  - 路由到Agent层                                 │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  Agent Orchestrator (orchestrator.py)           │
│  - 分析用户意图                                   │
│  - 选择合适的Agent                               │
└─────────────────┬───────────────────────────────┘
                  │
         ┌────────┴────────┐
         ▼                 ▼
┌─────────────┐   ┌─────────────┐
│ Query Agent │   │Analysis Agent│
│ (数据查询)   │   │ (数据分析)   │
└──────┬──────┘   └──────┬───────┘
       │                 │
       └────────┬────────┘
                ▼
┌─────────────────────────────────────────────────┐
│  LLM Service (llm_service.py)                   │
│  - 调用Azure OpenAI / Gemini                     │
│  - 返回AI响应                                    │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
        [ 响应沿原路返回，实时流式显示 ]
```

---

## 💡 架构设计的核心考虑

### 1. **可扩展性**

- 新增 Agent：只需在`agents/`添加新文件
- 新增数据源：在`services/`添加新 service
- 新增前端页面：在`pages/`添加新路由

### 2. **可维护性**

- 清晰的目录结构
- 职责单一的模块
- 统一的代码风格

### 3. **符合企业实践**

- 前后端分离
- API 设计 RESTful
- 使用类型系统（TypeScript + Pydantic）
- 环境变量管理

### 4. **展示技术深度**

- 不只是调用 API，而是构建完整系统
- 展示对 AI Agent 架构的理解
- 前后端都有设计思考

---

## 🎓 这个结构如何帮助你通过面试？

### 针对"Front end dev"岗位：

1. **技术广度**：

   - ✅ Vue 3 Composition API
   - ✅ Next.js SSR + API Routes
   - ✅ TypeScript 类型系统
   - ✅ 跨框架集成

2. **对 AI 的理解**：

   - ✅ 如何设计 AI 聊天界面
   - ✅ 流式响应的前端实现
   - ✅ Agent 结果的可视化

3. **系统设计能力**：

   - ✅ 前后端架构设计
   - ✅ 数据流设计
   - ✅ 可扩展的代码结构

4. **符合岗位要求的软技能**：
   - **Entrepreneurial mindset**：架构设计考虑了未来扩展
   - **Proactive**：不只是实现功能，而是思考最佳实践
   - **Logical reasoning**：清晰的分层架构
   - **Innovative**：混合前端架构是创新方案

---

## 📝 下一步实施计划

### Phase 1: 后端基础（Day 1-2）

- [ ] 搭建 FastAPI 基础框架
- [ ] 实现简单的 Agent 逻辑
- [ ] 集成 LLM API（可先用 mock）

### Phase 2: Next.js 前端（Day 2-3）

- [ ] 搭建聊天界面
- [ ] 实现与后端通信
- [ ] 添加流式响应渲染

### Phase 3: Vue 集成（Day 4）

- [ ] 创建数据可视化组件
- [ ] 集成到 Next.js
- [ ] 实现数据实时更新

### Phase 4: 优化提升（Day 5+）

- [ ] 多 Agent 协作
- [ ] 错误处理
- [ ] UI/UX 优化
- [ ] 性能优化

---

## 🚀 为什么这个项目能打动面试官？

1. **业务相关性**：支付助手直接对应 HSBC 的 global payment solutions 业务
2. **技术完整性**：覆盖前端、后端、AI 三个维度
3. **架构思维**：不是简单的 demo，而是可扩展的系统
4. **实战导向**：解决真实问题（如何让用户使用 AI Agent）
5. **展示潜力**：结构设计体现了你的成长空间

---

**Good luck with your interview! 💪**
