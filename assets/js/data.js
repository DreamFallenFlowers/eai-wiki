/* EAI Wiki content — seed edition, 2026-11.
 * All prose is editable. Add an entry to ENTRIES and it appears everywhere automatically.
 * Keep claims sourced: use `links` for papers / official project pages.
 */
window.EAI_DATA = (() => {
  const DOMAINS = [
    {
      id: "vla",
      num: "01",
      name: "视觉-语言-动作模型",
      en: "Vision–Language–Action",
      short: "VLA",
      accent: "#ff4b1f",
      tint: "#ffe2d7",
      dark: true,
      tagline: "让语言理解直接落在动作上",
      description: "把视觉观察、语言指令与机器人动作压进同一个模型，追求跨任务、跨本体的通用控制。",
      question: "如何把互联网规模的多模态语义知识，转化为不同机器人本体上可靠、实时的连续动作？",
      topics: ["动作分词", "跨本体迁移", "双系统架构", "流匹配", "链式思考"],
      intro: [
        "VLA 的出发点很直接：既然视觉语言模型已经读过互联网，能不能让它顺便学会控制机器人？答案不是简单地「让 GPT 输出关节角」，而是把动作变成与图像、文本同构的建模对象，再用机器人轨迹把语义知识锚定到物理世界。",
        "这条路线带来了前所未有的语义泛化，也暴露了端到端模型的硬边界——控制频率、动作精度、长程稳定性与安全。今天的 VLA 正在分裂为离散动作 token、连续生成式动作头、以及「慢思考 + 快执行」的分层系统三条路线。"
      ],
      milestones: [
        { year: "2022", title: "SayCan", text: "LLM 调度技能库", entry: "saycan" },
        { year: "2023", title: "RT-2", text: "动作变成 token", entry: "rt2" },
        { year: "2024", title: "OpenVLA / π0", text: "开源与连续控制", entry: "openvla" },
        { year: "2025", title: "Gemini Robotics 1.5", text: "先思考，再行动", entry: "gemini-robotics-15" }
      ],
      related: ["world-models", "policy-learning", "data-benchmarks"]
    },
    {
      id: "world-models",
      num: "02",
      name: "世界模型",
      en: "World Models",
      short: "WORLD",
      accent: "#3155ff",
      tint: "#e2e7ff",
      dark: false,
      tagline: "在行动之前，先在脑中预演",
      description: "学习环境如何随动作演化，让智能体在想象中预测、规划与评估行动后果。",
      question: "如何学到可交互、长时一致、遵守物理规律，并且真正服务于控制的 world model？",
      topics: ["潜空间预测", "视频生成", "交互式模拟", "长时一致性", "想象中规划"],
      intro: [
        "世界模型试图回答一个比「识别」更深的问题：如果我现在这样做，下一秒世界会变成什么样？它可以是压缩的潜空间动力学（Dreamer），也可以是可直接观看、可实时交互的生成式环境（Genie）。前者服务于策略优化，后者更像一个可探索的想象沙盒。",
        "真正的难点不在生成漂亮的画面，而在动作条件、因果一致、长时记忆与物理正确性。一个不能分辨「杯子被推下去」和「杯子飘起来」的世界模型，无法成为机器人规划的基础。"
      ],
      milestones: [
        { year: "2019", title: "Dreamer", text: "潜空间想象训练", entry: "world-model" },
        { year: "2023", title: "DreamerV3", text: "一套超参数跨域", entry: "dreamer-v3" },
        { year: "2024", title: "Genie", text: "生成式可玩世界", entry: "genie-3" },
        { year: "2025", title: "Genie 3", text: "实时、长时、可提示", entry: "genie-3" }
      ],
      related: ["vla", "policy-learning", "simulation"]
    },
    {
      id: "policy-learning",
      num: "03",
      name: "策略学习",
      en: "Robot Learning",
      short: "POLICY",
      accent: "#a5c92c",
      tint: "#eff7cf",
      dark: false,
      tagline: "从示教、试错和生成中学会控制",
      description: "覆盖模仿学习、强化学习与生成式动作建模，研究机器人如何从数据中获得可执行的控制策略。",
      question: "在数据稀缺、分布偏移和真机成本约束下，什么样的策略表示既能泛化，又能可靠执行？",
      topics: ["模仿学习", "扩散策略", "动作分块", "离线强化学习", "预训练与微调"],
      intro: [
        "策略学习是具身智能最工程化的一面：损失函数怎么写、动作怎么表示、观测延迟如何处理、示教中的多模态如何建模。它也最容易被「大模型」叙事掩盖——再强的语义理解，最后仍要落到一个在 30Hz 控制循环里稳定的策略。",
        "从行为克隆到 Diffusion Policy，从 ACT 的动作分块到 Octo 的通用策略，核心问题始终是同一个：如何用有限数据覆盖一个多模态、长时程、会发生分布偏移的动作分布。"
      ],
      milestones: [
        { year: "2023", title: "Diffusion Policy", text: "生成式动作建模", entry: "diffusion-policy" },
        { year: "2023", title: "ACT / ALOHA", text: "动作分块与低成本双臂", entry: "act-aloha" },
        { year: "2024", title: "Octo", text: "开源通用策略", entry: "octo" },
        { year: "2024", title: "OpenVLA", text: "预训练 + 微调范式", entry: "openvla" }
      ],
      related: ["vla", "manipulation", "simulation"]
    },
    {
      id: "manipulation",
      num: "04",
      name: "灵巧操作",
      en: "Dexterous Manipulation",
      short: "MANIP",
      accent: "#e5a400",
      tint: "#fff0c4",
      dark: false,
      tagline: "接触、形变与长程依赖的试金石",
      description: "从双臂协作到灵巧手，研究接触丰富、精细且长程的真实操作能力。",
      question: "如何在接触、形变、遮挡与长程依赖下，实现可泛化、可恢复的精细操作？",
      topics: ["双臂协作", "灵巧手", "触觉反馈", "接触规划", "数据采集硬件"],
      intro: [
        "操作是具身智能最难被语言捷径绕开的领域。抓取一个透明杯子、把拉链拉上、把电池插进槽里——这些任务对视觉、触觉、力控和时序都有精确要求，语言模型的世界知识只能提供先验，不能替代物理交互。",
        "近年来最值得关注的是「硬件—数据—模型」的共同设计：ALOHA 降低双臂数据采集成本，UMI 让数据采集摆脱机器人本体，RDT-1B 则尝试用十亿参数基础模型吸收这些异构数据。"
      ],
      milestones: [
        { year: "2023", title: "ALOHA / ACT", text: "低成本双臂与动作分块", entry: "act-aloha" },
        { year: "2024", title: "UMI", text: "手持夹爪采集可迁移数据", entry: "umi" },
        { year: "2024", title: "RDT-1B", text: "十亿参数双臂基础模型", entry: "rdt-1b" }
      ],
      related: ["policy-learning", "perception", "data-benchmarks"]
    },
    {
      id: "navigation",
      num: "05",
      name: "导航与移动",
      en: "Navigation & Mobility",
      short: "NAV",
      accent: "#008f78",
      tint: "#d8f3ec",
      dark: false,
      tagline: "在真实空间里定位、探索与共处",
      description: "从 ObjectNav 到社交导航，让智能体在陌生、动态、有人类活动的空间中自主移动。",
      question: "局部感知与全局语义如何结合，才能在动态、拥挤的真实环境里保持长期自主？",
      topics: ["ObjectNav", "语义建图", "主动探索", "社交导航", "视觉语言导航"],
      intro: [
        "导航看起来比操作简单，但它把具身智能的时间尺度拉长了：智能体要记住走过的路、推断没看见的房间、在被人挡住时重新规划。这里的核心表征不是一张图，而是一张随着探索不断更新的信念状态。",
        "Habitat 系列把真实室内扫描、人形化身和机器人放进同一仿真，让「人类作为动态社会性存在」进入评测。这比在静态迷宫里算最短路径更接近家庭机器人的真实处境。"
      ],
      milestones: [
        { year: "2021", title: "ObjectNav", text: "语义目标导航任务", entry: "objectnav" },
        { year: "2023", title: "Habitat 3.0", text: "人机共处仿真", entry: "habitat-3" }
      ],
      related: ["perception", "simulation", "humanoids"]
    },
    {
      id: "humanoids",
      num: "06",
      name: "人形机器人",
      en: "Humanoids",
      short: "HUMANOID",
      accent: "#d0492e",
      tint: "#ffe4dc",
      dark: false,
      tagline: "把基础模型装进人的身体",
      description: "协调行走、平衡、操作与全身控制，探索高维欠驱动系统上的通用具身智能。",
      question: "高维、欠驱动、接触切换频繁的人形系统，如何获得类似基础模型的泛化能力？",
      topics: ["全身控制", "双系统模型", "Sim2Real", "运动先验", "人形数据金字塔"],
      intro: [
        "人形机器人是具身智能最激进的赌注：如果世界是为人类身体设计的，那么最通用的机器人也应该是人形的。代价是控制难度陡增——几十个自由度、频繁的接触切换、随时可能摔倒的平衡约束。",
        "当前最有影响力的路线是分层：上层用 VLM 理解任务，下层用全身控制（WBC）保证物理可行；中间用大规模仿真和运动先验填补数据缺口。GR00T N1 把这条路线包装成开放基础模型与工具链。"
      ],
      milestones: [
        { year: "2023", title: "WBC", text: "从运动控制到操作", entry: "wbc" },
        { year: "2025", title: "GR00T N1", text: "人形基础模型", entry: "groot-n1" }
      ],
      related: ["manipulation", "simulation", "policy-learning"]
    },
    {
      id: "simulation",
      num: "07",
      name: "仿真与 Sim2Real",
      en: "Simulation & Sim2Real",
      short: "SIM",
      accent: "#008fe8",
      tint: "#dcefff",
      dark: false,
      tagline: "让规模定律进入物理世界",
      description: "GPU 并行仿真、合成数据与迁移方法，是机器人学习规模化的基础设施。",
      question: "如何缩小仿真与真实之间的物理、感知与任务分布差距，并证明迁移真的有效？",
      topics: ["GPU 并行仿真", "域随机化", "系统辨识", "合成数据", "数字孪生"],
      intro: [
        "机器人数据昂贵、慢、难以覆盖长尾。仿真提供了另一种可能：并行生成百万级交互，在虚拟世界里试错、随机化、失败，再把学到的先验带回真实。Isaac Lab 这类 GPU 框架让这件事第一次具备「基础设施」形态。",
        "但仿真不是免费的午餐。视觉逼真不等于物理正确，物理正确也不等于任务分布正确。Sim2Real 的核心工作，是明确差距在哪里，并用系统辨识、域随机化和真机微调逐项对齐。"
      ],
      milestones: [
        { year: "2023", title: "Habitat 3.0", text: "复杂社会性仿真", entry: "habitat-3" },
        { year: "2024", title: "Isaac Lab", text: "GPU 并行机器人学习", entry: "isaac-lab" },
        { year: "2024", title: "UMI", text: "绕过机器人的真机数据", entry: "umi" }
      ],
      related: ["navigation", "humanoids", "data-benchmarks"]
    },
    {
      id: "perception",
      num: "08",
      name: "具身感知",
      en: "Embodied Perception",
      short: "PERCEPTION",
      accent: "#d43b6a",
      tint: "#ffe2ea",
      dark: false,
      tagline: "构建可查询、可度量、可行动的空间",
      description: "从 RGB-D 到 3D Gaussian Splatting，研究机器人如何理解三维场景、物体与可供性。",
      question: "机器人需要怎样的三维表示，才能在开放世界中同时做到实时、精确和语义可检索？",
      topics: ["三维重建", "语义地图", "可供性", "场景图", "主动感知"],
      intro: [
        "机器人感知不是「给图片打标签」。它需要知道物体在哪里、有多大、能不能抓、移开之后会露出什么——也就是把视觉转成可行动的空間表征。这要求几何精度、语义理解和实时性同时成立。",
        "3D Gaussian Splatting 提供了一种新的折中：显式、可微、渲染快、训练快，正在从新视角合成走向机器人场景重建与仿真。Gaussian Splatting SLAM 进一步把它变成在线建图系统，ConceptGraphs 则把物体与关系组织成可查询的开放词汇场景图。"
      ],
      milestones: [
        { year: "2023", title: "3D Gaussian Splatting", text: "实时显式三维表征", entry: "gaussian-splatting" },
        { year: "2024", title: "Gaussian Splatting SLAM", text: "在线建图与定位", entry: "gs-slam" },
        { year: "2024", title: "ConceptGraphs", text: "开放词汇场景图", entry: "conceptgraphs" }
      ],
      related: ["manipulation", "navigation", "simulation"]
    },
    {
      id: "data-benchmarks",
      num: "09",
      name: "数据与评测",
      en: "Data & Evaluation",
      short: "DATA",
      accent: "#5b57e8",
      tint: "#e8e5ff",
      dark: false,
      tagline: "没有可信评测，就没有真正的进步",
      description: "数据集、评测协议与安全边界共同决定具身智能是否能从 demo 走向可复现的系统。",
      question: "当每个实验室都用自己的任务与指标，如何建立可信、可复现、覆盖真实世界的评测？",
      topics: ["跨本体数据", "基准设计", "真机评测", "安全与对齐", "数据许可"],
      intro: [
        "具身智能最容易被高估的地方，是一个精心剪辑的 demo。真正困难的不是让机器人成功一次，而是说明它在什么条件下成功、失败模式是什么、别人能否复现。这就是数据与评测存在的意义。",
        "Open X-Embodiment 用社区协作验证了跨本体数据的价值，LIBERO 把「迁移」变成可量化指标，DROID 则用跨机构、跨场景的采集逼近真实分布。它们共同把「通用机器人」从口号变成可检验的问题。"
      ],
      milestones: [
        { year: "2023", title: "LIBERO", text: "终身学习基准", entry: "libero" },
        { year: "2023", title: "Open X-Embodiment", text: "跨本体数据集合", entry: "open-x-embodiment" },
        { year: "2024", title: "DROID", text: "跨机构真实操作数据", entry: "droid" }
      ],
      related: ["vla", "policy-learning", "simulation"]
    }
  ];

  const ENTRIES = [
    /* ------------------------------------------------------------------ VLA */
    {
      id: "saycan",
      domain: "vla",
      type: "paper",
      title: "SayCan",
      subtitle: "用大语言模型把语言指令锚定到可用技能",
      year: 2022,
      venue: "CoRL 2022",
      org: "Google Research · Everyday Robots",
      authors: "Michael Ahn, Anthony Brohan 等",
      featured: false,
      tags: ["LLM 规划", "技能库", "affordance", "长程任务"],
      tldr: "LLM 负责把「做什么」拆成步骤，价值函数负责判断「现在能不能做」；两者相乘，把语言计划落到真实机器人的可执行技能上。",
      why: "它是 LLM 进入机器人任务规划的早期范式：不让语言模型直接输出低层动作，而是让它调度已有技能，并用物理可行性过滤语言模型的幻觉。",
      intro: [
        "SayCan 的核心洞察是分工。大语言模型擅长把「我渴了」拆成「找到水、拿起杯子、倒水」，却完全不知道机器人现在够不够得到杯子。机器人技能库知道后者，却不懂前者。把两者的概率相乘，就得到了既合理又可执行的计划。",
        "这仍然是一个封闭世界系统：技能是预定义的，环境是布置好的厨房。但它奠定了后来所有分层具身系统的基本结构——语言负责意图，控制负责可行性，中间需要一个可学习的接口。"
      ],
      method: [
        { title: "技能即接口", text: "机器人技能库提供一组可执行 primitive，每个技能有自然语言描述，LLM 以文本方式选择技能。" },
        { title: "可行性打分", text: "学习 value function，预测每个技能在当前状态下成功的概率；把 LLM 的语言似然与技能可行性相乘。" },
        { title: "闭环重规划", text: "每次执行一个技能后，用新观察重新生成计划，降低长程任务的复合误差。" }
      ],
      evidence: [
        { value: "101", label: "真实长程任务", text: "在真实厨房环境中评估了 101 个语言指令任务，覆盖从取物到清理的多步组合。" },
        { value: "乘法", label: "语言 × 物理", text: "消融显示，去掉 affordance 打分后，计划更常出现「说得对但做不到」的动作。" }
      ],
      limits: [
        "依赖预定义技能库，无法发明技能库里不存在的新动作。",
        "值函数与技能边界共同决定上限；环境变化或物体位置变化会放大误差。",
        "主要面向准静态桌面/厨房场景，动态任务与精细接触并非其强项。"
      ],
      related: ["rt2", "vla-paradigm", "octo"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2204.01691" },
        { label: "项目页", url: "https://say-can.github.io/" }
      ]
    },
    {
      id: "rt2",
      domain: "vla",
      type: "paper",
      title: "RT-2",
      subtitle: "把网页知识迁移到机器人控制",
      year: 2023,
      venue: "CoRL 2023",
      org: "Google DeepMind",
      authors: "Brianna Zitkovich, Tianhe Yu 等",
      featured: true,
      tags: ["VLA", "动作 token", "视觉语言模型", "语义泛化"],
      tldr: "把机器人动作离散成 token，与视觉、文本一起放进 VLM 自回归训练；RT-2 因而继承了网页知识，出现零样本的语义推理与工具使用。",
      why: "首次大规模证明：互联网预训练的 VLM 可以直接成为机器人策略骨架，并带来传统模仿学习没有的语义泛化。",
      intro: [
        "RT-2 的方法几乎可以说是「暴力」的：把末端执行器动作的每个维度离散成 256 个 bin，转成文本 token，然后让一个视觉语言模型像生成句子一样生成动作。动作和语言因此共享同一个词表、同一个 Transformer、同一套预训练知识。",
        "结果出现了令人惊讶的涌现能力。面对没见过的物体，模型能根据语义推断怎么拿；让它「把石头当锤子用」，它也能组合出合理动作。这是机器人学习第一次明确展示「互联网知识可以迁移到控制」。不过，这种能力仍然是慢速、离散、缺乏精确力控的。"
      ],
      method: [
        { title: "动作即文本", text: "将 7 维末端执行器动作（含终止）每维离散为 256 个 bin，与语言 token 统一建模。" },
        { title: "联合微调", text: "在机器人轨迹与视觉问答数据上共同微调 PaLI-X 或 PaLM-E，保留 VLM 的语义能力。" },
        { title: "Chain-of-Thought", text: "RT-2 变体先输出自然语言子任务，再输出动作，让推理过程可被观察。" }
      ],
      evidence: [
        { value: "6,000+", label: "真实机器人评估试验", text: "论文在多种物体、指令和场景变化上进行了大规模真机评估。" },
        { value: "涌现", label: "未训练过的语义任务", text: "对未见过物体进行语义推理，并执行「把石头当锤子」这类组合指令。" }
      ],
      limits: [
        "动作离散、推理频率低，难以支撑高频动态控制或精密力控。",
        "继承 VLM 的幻觉与安全风险；语言上合理不等于物理上可行。",
        "模型与训练数据未公开，社区难以复现和审计。"
      ],
      related: ["openvla", "pi0", "vla-paradigm"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2307.15818" },
        { label: "项目页", url: "https://robotics-transformer2.github.io/" }
      ]
    },
    {
      id: "openvla",
      domain: "vla",
      type: "paper",
      title: "OpenVLA",
      subtitle: "开源视觉-语言-动作模型",
      year: 2024,
      venue: "CoRL 2024",
      org: "Stanford · UC Berkeley · Google DeepMind 等",
      authors: "Moo Jin Kim, Karl Pertsch 等",
      featured: true,
      tags: ["开源", "7B", "跨本体", "LoRA"],
      tldr: "一个 7B 开源 VLA，在约 97 万条机器人轨迹上训练，用 LoRA 快速适配新机器人；性能超过 55B 的 RT-2-X，并把数据、代码和权重全部开放。",
      why: "把 VLA 从封闭的大厂系统变成可复现的研究基础设施，定义了开源 VLA 的工程基线。",
      intro: [
        "OpenVLA 的重要性不只在指标，而在可及性。它基于 Prismatic-7B 视觉语言模型，在 Open X-Embodiment 的 97 万条真实机器人 episode 上微调，把模型权重、训练代码和微调脚本一起开放。研究者第一次可以在单卡或少量 GPU 上跑通一个真正的 VLA。",
        "它依然采用离散动作 token 路线，因此继承了 RT-2 类模型的共同问题：推理频率不高、动作精度受限、对相机与本体配置敏感。但作为一个开放基线，它让这些问题第一次可以被社区系统性地研究，而不是只能猜测闭源模型。"
      ],
      method: [
        { title: "视觉编码 + 语言模型 + 动作 token", text: "基于 Prismatic-7B，将连续动作离散化后与图像 patch、语言 token 一起输入。" },
        { title: "Open X-Embodiment 预训练", text: "在约 970k 真实机器人 episode 上进行下一动作 token 预测。" },
        { title: "参数高效适配", text: "LoRA 微调即可适配新任务与新机器人，大幅降低复现门槛。" }
      ],
      evidence: [
        { value: "+16.5%", label: "相对 55B RT-2-X", text: "在 29 个任务上的绝对任务成功率提升，参数规模却小一个数量级。" },
        { value: "7B", label: "开放权重", text: "可下载权重、代码和数据加载器，支持 LoRA 微调与量化推理。" }
      ],
      limits: [
        "离散动作与较低控制频率限制动态任务和精细连续控制。",
        "对本体、相机视角和动作空间定义敏感，跨机器人迁移仍需适配。",
        "长程任务与多步推理能力有限，通常需要外层规划器。"
      ],
      related: ["rt2", "octo", "pi0", "open-x-embodiment"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2406.09246" },
        { label: "项目页", url: "https://openvla.github.io/" },
        { label: "代码", url: "https://github.com/openvla/openvla" }
      ]
    },
    {
      id: "pi0",
      domain: "vla",
      type: "paper",
      title: "π0",
      subtitle: "为通用机器人控制而生的流匹配 VLA",
      year: 2024,
      venue: "arXiv 2024",
      org: "Physical Intelligence",
      authors: "Kevin Black, Noah Brown 等",
      featured: true,
      tags: ["流匹配", "连续动作", "跨本体", "动作专家"],
      tldr: "在预训练 VLM 上外接一个流匹配动作专家，直接生成连续动作块；用跨本体数据预训练，再用少量高质量数据后训练，就能完成叠衣服、清理餐桌等长程任务。",
      why: "它把「语义理解」和「高频连续控制」解耦又耦合起来：VLM 负责看与想，action expert 负责实时输出。",
      intro: [
        "π0 的设计回答了一个工程上非常关键的问题：能不能既保留 VLM 的语义能力，又不被离散 token 的低频率卡住？答案是双专家结构——PaliGemma 视觉语言模型处理图像和指令，一个约 300M 参数的动作专家用流匹配生成连续动作块。",
        "与 RT-2 类模型相比，π0 的动作更平滑、频率更高，适合叠衣服、装盒子这类需要连续接触的任务。它的后训练配方也很重要：先在跨本体数据上预训练，再用少量高质量任务数据教会具体技能。这已经成为通用机器人策略的常用范式。"
      ],
      method: [
        { title: "双专家结构", text: "PaliGemma VLM 作为主干的语义专家，外接约 300M 参数的 action expert。" },
        { title: "流匹配", text: "学习连续动作块的速度场，从噪声积分到动作序列，替代离散 token 自回归。" },
        { title: "预训练 + 后训练", text: "跨本体机器人数据预训练，再用高质量任务数据后训练，平衡通用性与任务熟练度。" }
      ],
      evidence: [
        { value: "50 Hz", label: "动作块输出频率", text: "连续动作生成让策略能以较高频率重新规划，适应动态操作。" },
        { value: "8", label: "不同机器人构型", text: "论文在 8 种机器人配置上评估，强调同一模型跨本体的控制能力。" }
      ],
      limits: [
        "模型权重、数据配方与完整训练细节未开放，外部难以独立复现。",
        "高精度接触任务仍依赖任务特定数据与后训练。",
        "长程可靠性、失败恢复与安全约束尚未系统解决。"
      ],
      related: ["openvla", "diffusion-policy", "rt2"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2410.24164" },
        { label: "官方博客", url: "https://www.physicalintelligence.company/blog/pi0" }
      ]
    },
    {
      id: "gemini-robotics-15",
      domain: "vla",
      type: "system",
      title: "Gemini Robotics 1.5",
      subtitle: "会「先想后做」的具身推理与动作模型",
      year: 2025,
      venue: "Google DeepMind · 2025",
      org: "Google DeepMind",
      authors: "Gemini Robotics Team",
      featured: true,
      tags: ["双系统", "具身推理", "跨本体", "多步任务"],
      tldr: "把具身推理模型 ER 1.5 与 VLA 模型 Robotics 1.5 配对：前者负责多步任务分解与跨模态思考，后者把计划变成动作，并支持跨机器人迁移。",
      why: "代表 2025 年「推理模型 + 动作模型」的双系统路线，强调可解释的中间思考与多本体泛化。",
      intro: [
        "Gemini Robotics 1.5 把系统拆成两个互补的模型。Gemini Robotics-ER 1.5 是「具身推理器」，可以从图像、视频和语言中推断任务步骤、空间关系、工具使用，甚至调用外部工具；Gemini Robotics 1.5 则是把高层计划转成动作的 VLA。",
        "这种分工的价值在于可解释性和可迁移性：中间的自然语言计划可以被人类检查，同一套计划也可以下发给不同本体。但它也带来新的问题——推理延迟、两个模型之间的接口误差，以及高层计划与低层可行性不一致。"
      ],
      method: [
        { title: "ER 1.5：具身推理", text: "从视觉和语言中推断多步任务、空间关系与工具使用，生成可检查的中间计划。" },
        { title: "Robotics 1.5：动作执行", text: "接收高层计划与视觉观察，输出低层机器人动作，并支持多本体部署。" },
        { title: "跨本体迁移", text: "将技能与策略从一种机器人形态迁移到另一种，减少每种硬件的重复数据采集。" }
      ],
      evidence: [
        { value: "分层", label: "先思考，再行动", text: "把推理过程显式化，让计划可被人审阅，也便于跨任务复用。" },
        { value: "跨本体", label: "从机械臂到人形", text: "官方强调同一套模型能力可迁移到不同机器人平台。" }
      ],
      limits: [
        "官方披露有限，缺少可复现的训练细节与独立评测。",
        "双模型级联带来推理延迟与错误传播，实时性仍是挑战。",
        "安全、隐私与物理约束需要额外系统层保障。"
      ],
      related: ["pi0", "rt2", "groot-n1"],
      links: [
        { label: "官方博客", url: "https://deepmind.google/discover/blog/gemini-robotics-15-brings-ai-agents-into-the-physical-world/" }
      ]
    },
    {
      id: "vla-paradigm",
      domain: "vla",
      type: "concept",
      title: "VLA 范式",
      subtitle: "从「感知→规划→控制」到端到端动作生成",
      year: 2025,
      venue: "概念词条",
      org: "社区综合",
      authors: "EAI Wiki 编辑组",
      featured: false,
      tags: ["范式", "端到端", "分层系统", "能力边界"],
      tldr: "VLA 把视觉、语言与动作放进同一个建模问题，用大规模多模态预训练获得语义泛化；它的核心争议是「端到端」到底应该端到哪一层。",
      why: "理解 VLA 的能力边界，必须区分语义泛化、动作精度、控制频率与安全性这四个正交维度，而不是笼统地说「模型会不会做」。",
      intro: [
        "VLA 不是某一个模型，而是一类接口设计：输入图像与语言，输出动作。它可以用离散 token 自回归，也可以用扩散或流匹配生成连续动作；可以是单个端到端网络，也可以是「VLM 规划 + 动作专家」的双系统。",
        "判断一个 VLA 是否真的进步，至少要拆成四问：它能否理解新指令？能否操作新物体？能否迁移到新本体？能否在真实控制频率下稳定执行？很多论文只回答了其中一两个，传播时却常被当成全部。"
      ],
      method: [
        { title: "三条技术路线", text: "离散动作 token（RT-2 / OpenVLA）、连续生成式动作头（π0 / Diffusion Policy）、分层系统（Gemini Robotics / SayCan）。" },
        { title: "数据配方", text: "互联网 VLM 数据提供语义先验，跨本体机器人数据提供动作先验，任务后训练提供熟练度。" },
        { title: "评测三问", text: "新物体、新指令、新本体分别测什么？三者不能用一个平均成功率概括。" }
      ],
      evidence: [
        { value: "语义", label: "继承 VLM 的世界知识", text: "这是 VLA 相对传统策略最明确的增量，也是大量涌现能力的来源。" },
        { value: "控制", label: "仍受动作数据与本体差异制约", text: "语义泛化不会自动带来精确接触、高频响应或安全保证。" }
      ],
      limits: [
        "不是所有机器人都需要 VLA；低成本固定任务用专用策略往往更可靠。",
        "数据、算力与安全成本高，真机评测昂贵且难以标准化。",
        "「端到端」不等于「无条件通用」，部署时需要明确适用边界。"
      ],
      related: ["rt2", "openvla", "pi0", "octo"],
      links: [
        { label: "延伸：RT-2", url: "https://arxiv.org/abs/2307.15818" },
        { label: "延伸：OpenVLA", url: "https://arxiv.org/abs/2406.09246" },
        { label: "延伸：π0", url: "https://arxiv.org/abs/2410.24164" }
      ]
    },

    /* ---------------------------------------------------------- WORLD MODELS */
    {
      id: "dreamer-v3",
      domain: "world-models",
      type: "paper",
      title: "DreamerV3",
      subtitle: "一个超参数走天下：在世界模型中学习控制",
      year: 2023,
      venue: "Nature 2025 · arXiv 2023",
      org: "Google DeepMind · University of Toronto",
      authors: "Danijar Hafner, Jurgis Pasukonis, Jimmy Ba, Timothy Lillicrap",
      featured: true,
      tags: ["世界模型", "强化学习", "RSSM", "Minecraft"],
      tldr: "只用固定超参数，DreamerV3 在 150+ 个任务上通过「在潜空间中想象未来」学习策略，并首次从零开始在《我的世界》中挖到钻石。",
      why: "证明世界模型 + 鲁棒归一化可以跨域通用，减少强化学习对逐任务调参的依赖。",
      intro: [
        "DreamerV3 的关键不是某个新模块，而是让同一套超参数在许多完全不同的任务上都稳定工作。它学习一个潜空间世界模型（RSSM），在想象出来的潜轨迹上训练 actor-critic，从而避免了每一步都必须在真实环境中交互。",
        "Minecraft 挖钻石是一个标志性结果：稀疏奖励、长时程、需要探索。DreamerV3 在没有人类演示的情况下从零学会，说明世界模型能够支撑真正的长程决策。不过，模型误差会在长时滚动中累积，策略也可能学会利用模型漏洞。"
      ],
      method: [
        { title: "潜空间世界模型", text: "RSSM 同时学习表征、动力学、奖励与终止预测，把高维观测压缩成可预测的状态。" },
        { title: "在想象中训练", text: "actor 与 critic 完全在世界模型滚动的潜轨迹上学习，显著降低真实环境交互成本。" },
        { title: "鲁棒归一化", text: "symlog 变换与 percentile return normalization 让同一组超参数跨任务稳定。" }
      ],
      evidence: [
        { value: "150+", label: "不同领域任务", text: "使用固定超参数覆盖连续控制、Atari、Minecraft 等任务。" },
        { value: "0", label: "人类演示", text: "首次从零开始在 Minecraft 中采集到钻石，依赖探索与长程信用分配。" }
      ],
      limits: [
        "长时预测误差累积，模型偏差可能被策略主动利用。",
        "训练世界模型本身计算成本高，且对视觉复杂度敏感。",
        "在真实机器人上仍需处理安全探索与分布外检测。"
      ],
      related: ["genie-3", "world-model", "isaac-lab"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2301.04104" },
        { label: "Nature", url: "https://www.nature.com/articles/s41586-025-08744-2" },
        { label: "项目页", url: "https://danijar.com/project/dreamerv3/" }
      ]
    },
    {
      id: "genie-3",
      domain: "world-models",
      type: "system",
      title: "Genie 3",
      subtitle: "可实时交互、可提示事件的生成式世界模型",
      year: 2025,
      venue: "Google DeepMind · 2025",
      org: "Google DeepMind",
      authors: "Genie Team",
      featured: true,
      tags: ["生成式世界", "实时交互", "长时一致性", "世界事件"],
      tldr: "给定一张图或一段文字，Genie 3 生成 720p、24fps、可实时交互的三维世界，并在数分钟内保持环境一致性；还能通过文本提示注入新事件。",
      why: "把视频生成从「看」推进到「玩」：世界模型开始具备动作条件、长时记忆和可探索性，为具身智能提供想象沙盒。",
      intro: [
        "Genie 3 生成的不是一个视频，而是一个可以走进去的环境。你给一张图，它补全出可探索的三维场景；你按下动作，它实时渲染下一帧；你输入「现在下雨」，天气会改变，但场景布局和之前看到的细节仍然保持。",
        "它离「机器人仿真器」还有距离：动作空间有限，物理接触不精确，无法提供可靠的力和碰撞信息。但它展示了一种新的数据引擎——用生成世界合成罕见的场景、反事实和长尾交互，可能补足真实数据的不足。"
      ],
      method: [
        { title: "自回归交互生成", text: "根据历史帧与动作条件生成下一帧，保持时间上的因果一致性。" },
        { title: "提示式世界事件", text: "在生成过程中注入天气、物体等变化，用于测试反事实与鲁棒性。" },
        { title: "长时记忆", text: "维持场景布局与视觉细节数分钟，而不是每几秒就「换一个世界」。" }
      ],
      evidence: [
        { value: "720p / 24fps", label: "实时交互规格", text: "官方展示的生成分辨率与帧率，支持实时动作输入。" },
        { value: "数分钟", label: "环境一致性窗口", text: "相比早期逐段生成的视频模型，长时场景记忆明显增强。" }
      ],
      limits: [
        "动作空间有限，不能替代具备精确物理与接触的机器人仿真器。",
        "生成内容可能违反物理规律，不能直接作为安全训练依据。",
        "计算成本高，开放程度与可复现性有限。"
      ],
      related: ["dreamer-v3", "world-model", "isaac-lab"],
      links: [
        { label: "官方博客", url: "https://deepmind.google/discover/blog/genie-3-a-new-frontier-for-world-models/" }
      ]
    },
    {
      id: "world-model",
      domain: "world-models",
      type: "concept",
      title: "世界模型",
      subtitle: "智能体的内部模拟器",
      year: 2025,
      venue: "概念词条",
      org: "社区综合",
      authors: "EAI Wiki 编辑组",
      featured: false,
      tags: ["预测", "规划", "表征学习", "生成模型"],
      tldr: "世界模型学习「动作如何改变世界」的可预测表征，让智能体在不实际执行的情况下预演后果、评估计划、生成训练数据。",
      why: "它是从反应式策略走向长程规划的关键组件；也是判断生成式视频模型能否真正服务具身智能的试金石。",
      intro: [
        "一个世界模型至少要回答三件事：当前世界处于什么状态？动作会如何改变它？哪些结果值得追求？对应表征、动力学与奖励/价值预测。三者可以联合学习，也可以分开设计。",
        "世界模型不等于视频生成模型。视频模型可以生成逼真画面，却未必对动作敏感、未必保持物理一致、未必提供可规划的状态。真正的世界模型必须让「想象」与「控制」闭环，否则只是一个好看的视频播放器。"
      ],
      method: [
        { title: "表征", text: "把高维观测压缩成包含任务相关信息的潜状态，过滤纹理噪声。" },
        { title: "动力学", text: "学习给定动作后的状态转移，可用确定性、随机性或生成式模型。" },
        { title: "使用方式", text: "在模型中滚动想象来训练策略、做 MPC 规划，或生成反事实数据。" }
      ],
      evidence: [
        { value: "预测", label: "动作条件而非被动视频", text: "关键在于模型必须对「我做了什么」敏感，而不仅是拟合未来帧。" },
        { value: "闭环", label: "想象必须服务决策", text: "可规划性、误差可控性与计算成本，比画面逼真度更重要。" }
      ],
      limits: [
        "长时预测误差累积，模型容易被策略「钻空子」。",
        "物理正确性、接触与材质建模仍是难点。",
        "评测缺乏统一标准：生成好看不等于对控制有用。"
      ],
      related: ["dreamer-v3", "genie-3", "sim2real"],
      links: [
        { label: "延伸：DreamerV3", url: "https://arxiv.org/abs/2301.04104" },
        { label: "延伸：Genie 3", url: "https://deepmind.google/discover/blog/genie-3-a-new-frontier-for-world-models/" }
      ]
    },

    /* ---------------------------------------------------------------- POLICY */
    {
      id: "diffusion-policy",
      domain: "policy-learning",
      type: "paper",
      title: "Diffusion Policy",
      subtitle: "用动作扩散建模多模态示教分布",
      year: 2023,
      venue: "RSS 2023",
      org: "Columbia · Toyota Research Institute · MIT",
      authors: "Cheng Chi, Siyuan Feng 等",
      featured: true,
      tags: ["扩散模型", "模仿学习", "动作块", "多模态"],
      tldr: "把策略表示为对动作序列的去噪过程，天然表达人类示教中的多模态与动作块相关性；在 12 个任务、4 种机器人上平均提升 46.9%。",
      why: "给出了一条比回归和离散分类更适合连续、多模态操作的控制建模路径，成为后续 VLA action head 的重要基础。",
      intro: [
        "行为克隆的一个根本问题是：同一个观测下可能有多种正确动作。人类示教里既有向左也有向右的样本，简单的均方误差会把它们平均成一个撞墙的动作。Diffusion Policy 通过学习动作分布而不是单点映射，绕开了这个平均化问题。",
        "它把一整段动作序列当作扩散模型的样本，从高斯噪声逐步去噪为动作块。这同时建模了时间相关性，并允许策略表达多模态。代价是推理需要多次去噪迭代，实时性需要工程优化（如 DDIM、蒸馏或更少的步数）。"
      ],
      method: [
        { title: "动作序列扩散", text: "从噪声动作块逐步去噪，以视觉观测和本体状态为条件，输出未来一段动作。" },
        { title: "Receding Horizon", text: "预测动作块，只执行前若干步，然后根据新观测重新规划，兼顾平滑与反馈。" },
        { title: "视觉条件网络", text: "使用 U-Net 或 Transformer 保持时空一致性，并适配不同相机配置。" }
      ],
      evidence: [
        { value: "46.9%", label: "平均成功率相对提升", text: "在 12 个任务、4 种机器人本体上相对此前最优方法。" },
        { value: "多模态", label: "覆盖不同示教分支", text: "相比单峰回归，能保留人类示教中的多种合理策略。" }
      ],
      limits: [
        "多步去噪带来推理延迟，高频控制需要加速或蒸馏。",
        "长程任务仍依赖高层规划，纯扩散策略容易在误差累积后失效。",
        "对分布外场景的鲁棒性有限，示教质量决定上限。"
      ],
      related: ["act-aloha", "pi0", "octo", "action-chunking"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2303.04137" },
        { label: "项目页", url: "https://diffusion-policy.cs.columbia.edu/" }
      ]
    },
    {
      id: "octo",
      domain: "policy-learning",
      type: "system",
      title: "Octo",
      subtitle: "开源通用机器人策略与数据配方",
      year: 2024,
      venue: "RSS 2024",
      org: "UC Berkeley · Stanford · CMU 等",
      authors: "Octo Model Team",
      featured: true,
      tags: ["开源", "通用策略", "Transformer", "多本体"],
      tldr: "一个基于 Transformer 的通用策略，在 Open X-Embodiment 的 80 万条轨迹上预训练，支持语言指令、多相机输入和多种动作空间；用少量目标域数据即可微调。",
      why: "把通用机器人策略做成真正开放、可复现的基线，让「预训练 + 微调」成为操作领域的基本工作流。",
      intro: [
        "Octo 是一个「通用策略」而不是完整 VLA：它的视觉编码器和语言模型更轻量，重点放在多模态观测融合、动作空间适配和开源工程。它可以在 Open X-Embodiment 上预训练，然后用少量目标机器人数据微调，适配新相机、新本体和新任务。",
        "相比 OpenVLA，Octo 的语义先验弱一些，但控制灵活性和训练成本更友好。它更像是机器人学习界的「ResNet 基线」：不是最强的，但足够开放、足够稳定，能成为比较新方法的共同起点。"
      ],
      method: [
        { title: "模态 token 化", text: "把语言、多个相机视图和本体状态编码成 token 序列，用 Transformer 融合。" },
        { title: "灵活动作头", text: "支持绝对/相对末端位姿和不同动作维度，便于跨本体迁移。" },
        { title: "开源生态", text: "提供权重、数据加载器、微调脚本和仿真评测配置。" }
      ],
      evidence: [
        { value: "800k", label: "预训练轨迹", text: "基于 Open X-Embodiment 的约 80 万条机器人轨迹。" },
        { value: "开源", label: "可复现工作流", text: "权重与微调配方公开，支持研究社区在新任务上快速适配。" }
      ],
      limits: [
        "相对 VLA 缺少互联网规模的语义世界知识。",
        "复杂长程任务能力有限，常需结合高层规划与任务特定数据。",
        "训练数据质量参差，跨本体动作空间仍需要人工对齐。"
      ],
      related: ["openvla", "open-x-embodiment", "diffusion-policy"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2405.12213" },
        { label: "项目页", url: "https://octo-models.github.io/" }
      ]
    },
    {
      id: "act-aloha",
      domain: "policy-learning",
      type: "paper",
      title: "ACT / ALOHA",
      subtitle: "低成本双臂遥操作 + 动作分块 Transformer",
      year: 2023,
      venue: "RSS 2023",
      org: "Stanford",
      authors: "Tony Z. Zhao, Vikash Kumar, Sergey Levine, Chelsea Finn",
      featured: false,
      tags: ["动作分块", "双臂", "遥操作", "模仿学习"],
      tldr: "用 Action Chunking Transformer 一次预测一段动作，缓解人类示教中的停顿与误差；配套开源 ALOHA 低成本双臂平台，让精细双臂操作可被大量采集。",
      why: "「算法 + 硬件 + 数据采集」三位一体，极大降低了双臂操作研究门槛。",
      intro: [
        "ACT 的出发点是数据采集的现实问题：人类遥操作会产生不自然的停顿、抖动和修正，逐帧行为克隆会把这些噪声学进去。Action Chunking 让模型一次预测未来 k 步动作，既减少误差累积，又把示教中的时间结构压缩成可学习的目标。",
        "ALOHA 则是同一篇工作里同样重要的另一半：一套用 3D 打印、舵机和游戏手柄搭起来的低成本双臂遥操作平台。它让「采集几百条精细双臂示教」从大实验室专属变成许多团队可负担的事情。"
      ],
      method: [
        { title: "Action Chunking", text: "策略一次输出未来 k 步动作，减少逐步预测的复合误差与推理频率。" },
        { title: "CVAE 风格", text: "引入隐变量建模示教中的多模态性，避免把不同策略平均掉。" },
        { title: "ALOHA 硬件", text: "低成本双臂遥操作平台，支持精细任务的数据采集与开源复现。" }
      ],
      evidence: [
        { value: "低成本", label: "双臂硬件可复制", text: "用常见零件与 3D 打印降低精细双臂操作的研究门槛。" },
        { value: "精细", label: "拉链、插电池等任务", text: "展示了在接触丰富、需要双手协调的任务上的可行性。" }
      ],
      limits: [
        "每个任务通常需要大量人类示教。",
        "开环执行动作块在动态环境中较脆弱，需要重规划与时间集成。",
        "跨任务、跨物体泛化能力有限。"
      ],
      related: ["diffusion-policy", "action-chunking", "rdt-1b"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2304.13705" },
        { label: "项目页", url: "https://tonyzhaozh.github.io/aloha/" }
      ]
    },
    {
      id: "action-chunking",
      domain: "policy-learning",
      type: "concept",
      title: "动作分块",
      subtitle: "一次预测一小段动作，而不是一步",
      year: 2024,
      venue: "概念词条",
      org: "社区综合",
      authors: "EAI Wiki 编辑组",
      featured: false,
      tags: ["Action Chunking", "时序建模", "实时控制"],
      tldr: "动作分块把策略输出从单步动作变为固定长度的动作序列，降低推理频率、缓解误差累积，并让示教中的时间相关性被显式建模。",
      why: "它是 ACT、Diffusion Policy、π0 等系统共同的关键设计选择；理解它就理解了现代操作策略的一半工程细节。",
      intro: [
        "如果策略每 10ms 输出一个动作，推理延迟和单步噪声都会直接变成执行误差。动作分块换了一个粒度：一次预测未来 20 到 100 步，执行其中一部分，再重新预测。这既提高了有效控制频率，也让模型能学习连贯的动作意图。",
        "代价是反应变慢。动作块越长，策略越平滑，但对突发变化越不敏感。工程上通常用「执行一部分 + 新观测重规划」以及时间集成（temporal ensembling）来平衡。"
      ],
      method: [
        { title: "开环执行 + 闭环重规划", text: "执行 chunk 的前若干步，然后根据新观测重新预测，避免完全开环。" },
        { title: "时间集成", text: "对新旧 chunk 的重叠部分加权平均，减少块边界抖动。" },
        { title: "长度权衡", text: "chunk 越长越平滑但反应越慢；需要根据任务动态性与控制频率选择。" }
      ],
      evidence: [
        { value: "降频", label: "减少推理次数", text: "把多次单步推理合并成一次动作块预测。" },
        { value: "连贯", label: "显式建模时间相关", text: "模型学习的是动作意图序列，而不是相互独立的单步动作。" }
      ],
      limits: [
        "长动作块在动态环境中可能错过反馈信号。",
        "块边界处理不好会产生抖动或重复动作。",
        "不是所有任务都需要分块；高频闭环控制可能更适合单步策略。"
      ],
      related: ["act-aloha", "diffusion-policy", "pi0"],
      links: [
        { label: "延伸：ACT", url: "https://arxiv.org/abs/2304.13705" },
        { label: "延伸：Diffusion Policy", url: "https://arxiv.org/abs/2303.04137" }
      ]
    },

    /* ----------------------------------------------------------- MANIPULATION */
    {
      id: "rdt-1b",
      domain: "manipulation",
      type: "paper",
      title: "RDT-1B",
      subtitle: "十亿参数的双臂扩散基础模型",
      year: 2024,
      venue: "arXiv 2024",
      org: "清华大学等",
      authors: "Songming Liu, Lingxuan Wu 等",
      featured: false,
      tags: ["双臂", "扩散 Transformer", "基础模型", "统一动作空间"],
      tldr: "1.2B 参数的双臂扩散基础模型，在 46 个数据集、100 万+ episode 上预训练；用统一动作空间处理不同机器人，并展示零样本双臂操作与灵巧手任务。",
      why: "把扩散 Transformer 规模推到十亿级，验证跨本体双臂基础模型的可行性。",
      intro: [
        "RDT-1B 试图解决双臂操作的数据碎片化：不同机器人有不同自由度、不同关节定义、不同相机布局。它把这些映射到一个统一的动作空间，用扩散 Transformer 在大量异构数据上预训练，再通过微调适配具体硬件。",
        "它展示了基础模型在精细双臂任务上的潜力，也暴露了这条路线的工程难度：统一动作空间需要人工设计，异构数据的质量差异很大。"
      ],
      method: [
        { title: "统一动作空间", text: "把不同机器人的自由度与末端执行器动作映射到统一向量表示。" },
        { title: "扩散 Transformer", text: "以语言、图像和本体状态为条件，对动作序列进行去噪生成。" },
        { title: "大规模预训练 + 微调", text: "在 46 个数据集、100 万+ episode 上预训练，再适配具体机器人。" }
      ],
      evidence: [
        { value: "1.2B", label: "参数规模", text: "将双臂操作基础模型推到十亿参数级别。" },
        { value: "1M+", label: "预训练 episode", text: "跨 46 个数据集聚合异构机器人操作数据。" }
      ],
      limits: [
        "统一动作空间的对齐依赖人工设计，跨本体迁移仍有信息损失。",
        "真机泛化与长程可靠性仍需更多独立评测。",
        "推理成本高，部署到低成本硬件有挑战。"
      ],
      related: ["act-aloha", "pi0", "open-x-embodiment"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2410.07864" },
        { label: "项目页", url: "https://rdt-robotics.github.io/rdt/" }
      ]
    },
    {
      id: "umi",
      domain: "manipulation",
      type: "system",
      title: "UMI",
      subtitle: "用手持夹爪采集可迁移的操作数据",
      year: 2024,
      venue: "RSS 2024",
      org: "Stanford · Columbia University",
      authors: "Cheng Chi, Zhenjia Xu 等",
      featured: false,
      tags: ["数据采集", "手持夹爪", "SLAM", "跨本体"],
      tldr: "把手持夹爪、相机与离线 SLAM 组合成低成本数据采集器，采集的数据可直接迁移到不同机械臂上，实现无需机器人硬件的策略学习。",
      why: "以「数据采集接口」而不是「新模型」解决具身数据瓶颈，体现了硬件—软件协同设计的力量。",
      intro: [
        "具身智能的数据瓶颈不只是数量，还有采集场景。让机器人进厨房、进工厂采集数据，成本极高。UMI 的思路是把手持夹爪做成一个「人类可携带的机器人传感器」，人在真实环境中操作，系统记录夹爪位姿与视觉，之后迁移到机械臂上。",
        "这需要解决一系列系统问题：稳健的 SLAM、相机与夹爪的标定、推理延迟补偿、动作空间映射。UMI 的价值在于把这些工程细节开源，让「先采数据、再选机器人」成为可能。"
      ],
      method: [
        { title: "手持采集硬件", text: "3D 打印夹爪 + 鱼眼相机 + 侧面相机，记录操作过程与夹爪开合。" },
        { title: "稳健 SLAM 与标定", text: "利用离线 SLAM 恢复夹爪轨迹，并补偿视觉与动作之间的延迟。" },
        { title: "跨本体策略", text: "把相对末端轨迹映射到不同机械臂，减少对特定硬件的依赖。" }
      ],
      evidence: [
        { value: "无机器人", label: "即可采集数据", text: "采集阶段不需要真实机械臂，大幅降低场景与成本门槛。" },
        { value: "跨本体", label: "手持到机械臂", text: "演示了在多种机械臂上的策略迁移。" }
      ],
      limits: [
        "没有力/触觉反馈，难以覆盖接触丰富或需要精确力控的任务。",
        "SLAM 失败与标定误差会直接污染数据。",
        "工作空间映射和夹爪形态差异仍限制跨本体泛化。"
      ],
      related: ["act-aloha", "droid", "action-chunking"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2402.10329" },
        { label: "项目页", url: "https://umi-gripper.github.io/" }
      ]
    },

    /* ------------------------------------------------------------- NAVIGATION */
    {
      id: "habitat-3",
      domain: "navigation",
      type: "benchmark",
      title: "Habitat 3.0",
      subtitle: "人、化身与机器人共处的社交导航基准",
      year: 2023,
      venue: "arXiv 2023",
      org: "Meta AI · Georgia Tech 等",
      authors: "Andrew Szot, Alexander Clegg 等",
      featured: false,
      tags: ["社交导航", "人机共处", "仿真", "重排"],
      tldr: "把真实室内扫描、可活动的人形化身与机器人放进同一个物理仿真环境，要求机器人在有人类活动的场景中完成社交导航、重排与协作任务。",
      why: "把「人」从静态障碍物变成有意图、会移动的社会性存在，是家庭机器人评测的关键一步。",
      intro: [
        "大多数导航基准把人类当作贴图或静态障碍物。Habitat 3.0 的转变是把人形化身放进场景：它们会走动、会挡路、有自己的目标。机器人必须预测人的运动、保持社交距离、在拥挤空间中找到可行的通行策略。",
        "这使评测从「最短路径」转向「社会性共处」。同时也带来新的难点：人类行为模型是否真实？仿真中的人类策略能否代表真人？这些问题的答案仍不充分，但方向是明确的。"
      ],
      method: [
        { title: "统一仿真场", text: "真实室内扫描 + 人形化身 + 机器人本体，共享同一物理与渲染环境。" },
        { title: "社交导航任务", text: "机器人在有人类活动的场景中导航到目标，同时避免干扰与碰撞。" },
        { title: "重排与协作", text: "与人类共同完成物体重排等任务，测试人机协作接口。" }
      ],
      evidence: [
        { value: "人机共处", label: "动态人类参与者", text: "人形化身具有目标与运动策略，而不是静态障碍物。" },
        { value: "多任务", label: "导航 + 重排 + 协作", text: "用同一环境覆盖家庭服务机器人的多种能力。" }
      ],
      limits: [
        "仿真人类行为与真实社会规范仍有明显差距。",
        "视觉与物理的 Sim2Real 迁移尚未充分验证。",
        "任务与成功指标仍偏工程化，难以衡量「社交恰当性」。"
      ],
      related: ["objectnav", "sim2real", "isaac-lab"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2310.13724" },
        { label: "项目页", url: "https://aihabitat.org/habitat3/" }
      ]
    },
    {
      id: "objectnav",
      domain: "navigation",
      type: "concept",
      title: "ObjectNav",
      subtitle: "在陌生环境中寻找并抵达目标物体",
      year: 2022,
      venue: "概念词条",
      org: "社区综合",
      authors: "EAI Wiki 编辑组",
      featured: false,
      tags: ["目标导航", "主动探索", "语义地图", "SPL"],
      tldr: "仅给定目标物体类别（如「找到一把椅子」），智能体需要在未见过的三维室内环境中探索、识别并导航到实例旁。它同时考验语义先验、主动探索与长期记忆。",
      why: "ObjectNav 是室内移动操作的前置能力，也是具身感知与规划的交汇点。",
      intro: [
        "ObjectNav 的输入只有目标类别，没有坐标、没有地图。智能体必须决定去哪里找、如何记住走过的地方、什么时候相信语义先验（椅子通常在桌边）。它不是单纯的视觉识别，也不是单纯的路径规划，而是两者的耦合。",
        "评测通常报告成功率（Success Rate）与按路径长度加权的 SPL。后者防止策略靠乱走碰运气。真实世界中还要考虑动态人类、可开关的门和跨楼层，这些在多数仿真基准中仍被简化。"
      ],
      method: [
        { title: "建图与记忆", text: "在线构建语义地图或拓扑记忆，记录已探索区域与物体候选。" },
        { title: "主动探索", text: "根据不确定性或前沿（frontier）选择下一个探索点，平衡信息增益与路径成本。" },
        { title: "目标确认与停止", text: "接近候选物体后验证类别与可达性，决定何时终止。" }
      ],
      evidence: [
        { value: "Success", label: "任务成功率", text: "是否在最大步数内到达目标类别的有效实例附近。" },
        { value: "SPL", label: "路径效率", text: "按最短路径长度加权，惩罚绕路与无效探索。" }
      ],
      limits: [
        "类别级目标存在歧义：哪个「椅子」才算数？",
        "仿真场景与真实家庭的长尾分布差距大。",
        "动态人类、门和跨楼层等真实约束常被简化。"
      ],
      related: ["habitat-3", "sim2real", "gaussian-splatting"],
      links: [
        { label: "延伸：Habitat 3.0", url: "https://arxiv.org/abs/2310.13724" }
      ]
    },

    /* --------------------------------------------------------------- HUMANOID */
    {
      id: "groot-n1",
      domain: "humanoids",
      type: "system",
      title: "GR00T N1",
      subtitle: "面向通用人形机器人的开放基础模型",
      year: 2025,
      venue: "arXiv 2025",
      org: "NVIDIA",
      authors: "NVIDIA GEAR Lab",
      featured: true,
      tags: ["人形机器人", "双系统", "基础模型", "数据金字塔"],
      tldr: "采用「System 2 视觉语言模型 + System 1 扩散动作专家」的双系统架构，并用真实机器人、仿真与人类视频组成的数据金字塔训练，面向人形机器人的操作与移动。",
      why: "把互联网规模的多模态模型与人形全身控制连接起来，并提供开放权重与仿真—部署工具链。",
      intro: [
        "GR00T N1 的结构和 π0、Gemini Robotics 有相似之处：慢系统理解场景与指令，快系统生成动作。不同点在于它明确面向人形机器人，并把 Isaac 仿真、合成数据、真实遥操作数据组织成「数据金字塔」。",
        "人形机器人的难点不只在模型，而在全身控制：走路、平衡、手臂操作必须同时成立。GR00T N1 提供的是上层「大脑」与部分「小脑」接口，真正的全身控制仍需要运动控制栈和安全层配合。"
      ],
      method: [
        { title: "双系统架构", text: "System 2 VLM 以较低频率理解场景，System 1 扩散动作专家生成高频动作块。" },
        { title: "数据金字塔", text: "网络视频与人类视频提供先验，仿真数据提供规模，真实遥操作数据提供任务熟练度。" },
        { title: "工具链", text: "与 Isaac Lab / Isaac GR00T 生态配合，覆盖数据生成、训练与部署。" }
      ],
      evidence: [
        { value: "双系统", label: "推理与执行解耦", text: "慢思考负责语义，快系统负责实时动作，避免让 VLM 直接承担高频控制。" },
        { value: "开放", label: "权重与工具链", text: "面向社区开放模型与开发工具，降低人形基础模型的研究门槛。" }
      ],
      limits: [
        "人形真机数据仍稀缺，仿真与人类视频的迁移效率有待验证。",
        "全身控制、安全与操作策略的耦合复杂，端到端评测困难。",
        "官方展示与独立复现之间可能存在差距。"
      ],
      related: ["pi0", "gemini-robotics-15", "wbc", "isaac-lab"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2503.14734" },
        { label: "代码", url: "https://github.com/NVIDIA/Isaac-GR00T" }
      ]
    },
    {
      id: "wbc",
      domain: "humanoids",
      type: "concept",
      title: "全身控制 WBC",
      subtitle: "让行走、平衡与操作同时发生",
      year: 2023,
      venue: "概念词条",
      org: "社区综合",
      authors: "EAI Wiki 编辑组",
      featured: false,
      tags: ["Whole-Body Control", "QP", "MPC", "接触"],
      tldr: "全身控制把机器人所有关节视为一个整体，在满足接触、摩擦、力矩与平衡约束的前提下，同时跟踪行走和操作目标。它是人形机器人从「能站」到「能干活」的控制底座。",
      why: "上层 VLA 给出任务意图，下层 WBC 才决定这些意图在人形身体上是否物理可行。",
      intro: [
        "人形机器人不能把行走和操作分开做：伸手去拿高处物体时，重心会变；搬重物时，脚步必须调整。全身控制把人体的所有自由度、接触约束和任务目标放进同一个优化问题，求出满足物理约束的关节力矩。",
        "传统 WBC 依赖精确模型与优化求解，近年越来越多地与强化学习结合：RL 提供鲁棒的运动先验，WBC 负责精确跟踪与安全约束。这条「学习 + 优化」的混合路线，可能是人形机器人落地的现实路径。"
      ],
      method: [
        { title: "分层控制", text: "任务空间目标 → 全身 QP / MPC → 关节力矩，逐层处理约束与优先级。" },
        { title: "接触调度", text: "决定哪只脚/手接触世界、接触力多大，并在切换时保持稳定。" },
        { title: "学习增强", text: "用 RL 训练鲁棒运动策略，再与传统控制器或安全层结合。" }
      ],
      evidence: [
        { value: "约束", label: "平衡、摩擦与力矩", text: "所有任务目标必须同时满足物理可行性，否则机器人会摔倒或打滑。" },
        { value: "接口", label: "承接上层意图", text: "把 VLA 或人类指令转成全身轨迹与接触目标。" }
      ],
      limits: [
        "接触切换频繁时，优化求解容易不稳定。",
        "精确模型难以获得，sim2real 误差会影响控制质量。",
        "与上层操作策略联合训练仍很困难，接口设计缺乏标准。"
      ],
      related: ["groot-n1", "sim2real", "isaac-lab"],
      links: [
        { label: "延伸：GR00T N1", url: "https://arxiv.org/abs/2503.14734" }
      ]
    },

    /* ------------------------------------------------------------- SIMULATION */
    {
      id: "isaac-lab",
      domain: "simulation",
      type: "system",
      title: "Isaac Lab",
      subtitle: "GPU 并行的机器人学习仿真框架",
      year: 2024,
      venue: "NVIDIA · 2024",
      org: "NVIDIA",
      authors: "Isaac Lab Team",
      featured: false,
      tags: ["GPU 仿真", "并行环境", "Isaac Sim", "合成数据"],
      tldr: "基于 Isaac Sim 构建的 GPU 加速机器人学习框架，可并行运行成千上万个环境，覆盖刚体、关节、传感器与多种强化学习/模仿学习工作流。",
      why: "让机器人学习拥有类似「大规模并行实验」的基础设施，是合成数据和强化学习规模化的关键。",
      intro: [
        "机器人学习的瓶颈之一是样本效率：真实机器人一天只能采几百条轨迹，而仿真可以并行跑几千个环境。Isaac Lab 把物理仿真、传感器渲染、环境向量化和训练循环整合到一个 GPU 管线里，让「百万级交互」在工程上可行。",
        "它的价值不只是快，还有可控：可以随机化光照、摩擦、质量、延迟，系统地测试策略鲁棒性。但仿真精度始终是天花板，尤其是接触丰富任务，仿真中的成功不保证真机成功。"
      ],
      method: [
        { title: "USD 场景与 PhysX", text: "基于 Isaac Sim 的 USD 场景描述和 PhysX 物理引擎，支持刚体、关节与多种传感器。" },
        { title: "向量化环境", text: "在 GPU 上并行运行大量环境实例，显著提升数据吞吐。" },
        { title: "域随机化与训练集成", text: "内置光照、材质、物理参数随机化，并与常见 RL/模仿学习库集成。" }
      ],
      evidence: [
        { value: "GPU 并行", label: "批量环境", text: "面向大规模并行仿真，降低数据采集的墙钟时间。" },
        { value: "生态", label: "Isaac Sim / ROS / RL", text: "与 NVIDIA 机器人栈及常用学习框架衔接，覆盖训练到部署。" }
      ],
      limits: [
        "接触与摩擦精度有限，精细操作仍可能失真。",
        "渲染真实感与物理真实感并不等价。",
        "依赖 NVIDIA 硬件与软件栈，存在生态锁定。"
      ],
      related: ["sim2real", "groot-n1", "habitat-3"],
      links: [
        { label: "文档", url: "https://isaac-sim.github.io/IsaacLab/" },
        { label: "代码", url: "https://github.com/isaac-sim/IsaacLab" }
      ]
    },
    {
      id: "sim2real",
      domain: "simulation",
      type: "concept",
      title: "Sim2Real",
      subtitle: "把仿真中学到的策略搬进真实世界",
      year: 2024,
      venue: "概念词条",
      org: "社区综合",
      authors: "EAI Wiki 编辑组",
      featured: false,
      tags: ["域随机化", "系统辨识", "迁移", "真机微调"],
      tldr: "Sim2Real 不是一次迁移，而是一组缩小分布差距的工程方法：随机化物理参数、对齐传感器与延迟、在真实数据上做系统辨识与微调。",
      why: "它决定了仿真数据能否真正降低真机成本，也是判断一个机器人学习结果是否可信的关键视角。",
      intro: [
        "仿真里完美的策略，到了真机可能因为 20ms 的延迟、1mm 的标定误差或不同的地面摩擦而崩溃。Sim2Real 的工作就是找出这些差距，并在训练中显式处理它们，而不是指望模型自己忽略。",
        "常见方法包括域随机化（让训练分布覆盖真实变化）、系统辨识（用真机数据校准仿真参数）、传感器建模（噪声、延迟、畸变）以及真机微调。没有一种方法能单独解决所有问题，关键是对差距有度量。"
      ],
      method: [
        { title: "域随机化", text: "随机化物理参数、视觉外观、传感器噪声与动作延迟，提升策略鲁棒性。" },
        { title: "系统辨识", text: "用真实机器人数据估计仿真中的质量、摩擦、延迟等参数，缩小物理差距。" },
        { title: "真机微调", text: "在仿真预训练后用少量真实数据校准策略，兼顾规模与真实性。" }
      ],
      evidence: [
        { value: "分布", label: "对齐而非消除差距", text: "目标不是造一个完美仿真器，而是让训练分布覆盖真实世界的变化。" },
        { value: "真机", label: "最终验证不可省略", text: "仿真指标只能作为筛选信号，不能替代真实环境评测。" }
      ],
      limits: [
        "随机化范围过窄无法覆盖真实变化，过宽则让任务变得不可学。",
        "视觉逼真不等于物理正确，物理正确也不等于任务分布正确。",
        "真机评测成本高，容易产生选择性报告。"
      ],
      related: ["isaac-lab", "habitat-3", "world-model"],
      links: [
        { label: "延伸：Isaac Lab", url: "https://isaac-sim.github.io/IsaacLab/" }
      ]
    },

    /* ------------------------------------------------------------- PERCEPTION */
    {
      id: "gaussian-splatting",
      domain: "perception",
      type: "paper",
      title: "3D Gaussian Splatting",
      subtitle: "实时可微渲染的三维场景表示",
      year: 2023,
      venue: "SIGGRAPH 2023",
      org: "Inria · Université Côte d'Azur · MPI",
      authors: "Bernhard Kerbl, Georgios Kopanas 等",
      featured: false,
      tags: ["3DGS", "新视角合成", "可微渲染", "场景重建"],
      tldr: "用一组各向异性 3D 高斯显式表示场景，通过可微光栅化实现实时、高质量的新视角合成，训练速度也显著快于 NeRF。",
      why: "为机器人提供了可快速重建、可实时渲染的空间表示，正在被用于场景理解、导航与操作仿真。",
      intro: [
        "NeRF 用隐式函数表示场景，质量高但渲染慢。3D Gaussian Splatting 换了一种表示：场景由成千上万个带位置、协方差、透明度和颜色的 3D 高斯组成，渲染时把它们投影到屏幕并做可微光栅化。",
        "这种显式表示带来两个直接好处：训练快、渲染快。对机器人来说，这意味着可以在现场快速重建场景，并以高帧率渲染用于规划或数据合成。但高斯的几何精度、透明/反射材质和动态场景仍是难点。"
      ],
      method: [
        { title: "显式高斯表示", text: "每个高斯包含位置、各向异性协方差、不透明度与球谐颜色系数。" },
        { title: "自适应密度控制", text: "根据梯度与可见性分裂/克隆高斯，在细节不足处增加表示能力。" },
        { title: "可微光栅化", text: "将高斯投影到图像平面并按深度排序合成，实现快速可微渲染。" }
      ],
      evidence: [
        { value: "实时", label: "1080p 渲染", text: "在多数场景中达到实时帧率，显著快于原始 NeRF 管线。" },
        { value: "显式", label: "便于编辑与查询", text: "高斯点云可直接裁剪、组合，更适合机器人场景处理。" }
      ],
      limits: [
        "依赖多视角、高质量采集，单目或稀疏视角重建困难。",
        "反射、透明、动态场景与薄结构重建质量有限。",
        "显存占用大，几何表面精度不如专用重建方法。"
      ],
      related: ["gs-slam", "conceptgraphs", "objectnav"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2308.04079" },
        { label: "项目页", url: "https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/" },
        { label: "代码", url: "https://github.com/graphdeco-inria/gaussian-splatting" }
      ]
    },
    {
      id: "gs-slam",
      domain: "perception",
      type: "paper",
      title: "Gaussian Splatting SLAM",
      subtitle: "用 3D 高斯做实时单目 SLAM",
      year: 2024,
      venue: "CVPR 2024",
      org: "Imperial College London",
      authors: "Hidenobu Matsuki, Riku Murai, Paul H. J. Kelly, Andrew J. Davison",
      featured: false,
      tags: ["3DGS", "SLAM", "实时建图", "单目"],
      tldr: "把 3D Gaussian Splatting 从离线重建推进到在线 SLAM：一边用可微渲染跟踪相机，一边增量式优化高斯地图，支持单目与 RGB-D 输入。",
      why: "证明 3DGS 不仅能做漂亮的新视角合成，也能成为机器人在线感知的底层表示。",
      intro: [
        "传统 SLAM 系统多用稀疏特征点或稠密深度图建图；3DGS 则提供了一种显式、可渲染、可优化的场景表示。Gaussian Splatting SLAM 把跟踪与建图都放在高斯地图上：当前帧的相机位姿通过渲染当前地图并与观测比对来优化。",
        "这类系统的吸引力在于「地图即渲染器」：同一套高斯地图可以用于定位、自由视角检查、场景合成和下游规划。难点也很明显——增量建图需要处理新观测、删除错误高斯、避免尺度漂移，并让优化在实时预算内完成。"
      ],
      method: [
        { title: "渲染式跟踪", text: "通过最小化当前观测与高斯地图渲染结果之间的光度/几何误差，优化相机位姿。" },
        { title: "增量高斯建图", text: "在新视角下增补高斯、剪除错误高斯，并联合优化地图参数与相机轨迹。" },
        { title: "单目与 RGB-D", text: "支持单目和深度输入；单目依赖几何先验与优化约束，RGB-D 则提供尺度信息。" }
      ],
      evidence: [
        { value: "Online", label: "实时增量建图", text: "在相机运动过程中持续跟踪与更新，而不是先采集完整序列再离线重建。" },
        { value: "3DGS", label: "地图与渲染统一", text: "地图本身可实时渲染，便于可视化、检查和后续场景处理。" }
      ],
      limits: [
        "单目模式仍受尺度漂移、几何歧义与初始化质量影响。",
        "动态物体、反光材质与快速运动容易破坏跟踪和建图。",
        "大规模场景的内存与计算开销高，长期一致性仍需工程处理。"
      ],
      related: ["gaussian-splatting", "objectnav", "sim2real"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2312.06741" },
        { label: "项目页", url: "https://rmurai.co.uk/projects/GaussianSplattingSLAM/" }
      ]
    },
    {
      id: "conceptgraphs",
      domain: "perception",
      type: "paper",
      title: "ConceptGraphs",
      subtitle: "开放词汇的三维场景图，用于感知与规划",
      year: 2024,
      venue: "ICRA 2024",
      org: "University of Toronto · MIT · Vector Institute 等",
      authors: "Qiao Gu 等",
      featured: false,
      tags: ["开放词汇", "三维场景图", "视觉语言", "任务规划"],
      tldr: "从 RGB-D 序列构建物体级的三维场景图：用开放词汇分割与视觉语言嵌入给物体打标签，再让语言模型推断物体间关系，供导航与操作规划查询。",
      why: "它把机器人感知从「像素或固定类别」提升到「可查询的物体与关系」，是把开放世界感知接到任务规划的一座桥。",
      intro: [
        "机器人规划需要的不只是物体位置，还需要「杯子在桌上」「抽屉在柜台下面」这类关系。ConceptGraphs 先用类别无关的分割把场景拆成物体，再把多视角观测融合成三维物体节点，并用视觉语言模型给每个节点生成开放词汇的描述与嵌入。",
        "随后，语言模型把这些物体组织成图：节点是物体，边是空间或功能关系。给定自然语言任务，系统可以在图上检索相关物体与路径，或把图交给规划器。它仍然依赖分割质量，也主要假设场景是静态的。"
      ],
      method: [
        { title: "类别无关物体分割", text: "使用开放词汇分割模型从 RGB-D 帧提取物体候选，并把多视角观测关联到同一物体。" },
        { title: "多模态物体节点", text: "融合几何、视觉与语言嵌入，为物体生成可检索的开放词汇描述。" },
        { title: "场景图与语言查询", text: "用语言模型推断物体关系，构建可被自然语言查询和下游规划使用的图结构。" }
      ],
      evidence: [
        { value: "开放词汇", label: "不依赖固定类别", text: "物体标签来自视觉语言模型，可覆盖训练类别之外的概念。" },
        { value: "可查询", label: "面向规划的场景图", text: "支持语言查询、空间关系推理与导航/操作任务的高层规划。" }
      ],
      limits: [
        "分割与关联错误会传播到场景图，导致错误的关系或漏检。",
        "主要面向静态场景，动态物体与人类活动处理不足。",
        "视觉语言标签可能有歧义；关系推理仍缺乏物理可行性校验。"
      ],
      related: ["gaussian-splatting", "objectnav", "habitat-3"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2309.16650" },
        { label: "项目页", url: "https://concept-graphs.github.io/" }
      ]
    },

    /* ------------------------------------------------------------------- DATA */
    {
      id: "open-x-embodiment",
      domain: "data-benchmarks",
      type: "dataset",
      title: "Open X-Embodiment",
      subtitle: "把 22 种机器人数据汇成一座训练场",
      year: 2023,
      venue: "ICRA 2024 · arXiv 2023",
      org: "Open X-Embodiment Collaboration",
      authors: "Open X-Embodiment Collaboration",
      featured: true,
      tags: ["跨本体", "开放数据", "RT-X", "数据规模化"],
      tldr: "汇集 22 种机器人本体、60 个数据集、超过 100 万条轨迹，训练出 RT-X 模型；证明跨本体数据能显著提升单一机器人的泛化能力。",
      why: "第一次以社区协作的方式验证「机器人数据 scaling law」：数据多样性本身可以转化为能力。",
      intro: [
        "Open X-Embodiment 的意义在于把分散在各实验室的数据集变成一件公共基础设施。它统一了格式、动作空间与语言标注，让研究者第一次可以在几十种机器人、上百种任务上训练一个模型。",
        "随之训练的 RT-1-X / RT-2-X 展示了正迁移：在别的机器人上学到的技能，能提升目标机器人上的表现。但它也暴露了数据异构性的代价——动作空间不一致、标注质量参差、并非所有任务都受益。"
      ],
      method: [
        { title: "统一 RLDS 格式", text: "把不同来源的轨迹转换为统一的 Reinforcement Learning Datasets 格式，便于混合训练。" },
        { title: "跨本体数据混合", text: "在 22 种机器人本体、60 个数据集上联合训练，研究正/负迁移。" },
        { title: "RT-X 模型", text: "用 RT-1 与 RT-2 架构在混合数据上训练，验证跨本体泛化。" }
      ],
      evidence: [
        { value: "1M+", label: "轨迹规模", text: "超过一百万条真实机器人轨迹，覆盖多种任务与本体。" },
        { value: "22", label: "机器人本体", text: "从单臂到双臂、从固定底座到移动平台。" }
      ],
      limits: [
        "动作空间与传感器配置不一致，统一表示会造成信息损失。",
        "语言标注与数据质量参差，混合训练可能带来负迁移。",
        "数据许可与使用条款因来源而异，商用需逐项确认。"
      ],
      related: ["openvla", "octo", "droid"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2310.08864" },
        { label: "项目页", url: "https://robopen.github.io/" }
      ]
    },
    {
      id: "libero",
      domain: "data-benchmarks",
      type: "benchmark",
      title: "LIBERO",
      subtitle: "评测终身学习与知识迁移的操作基准",
      year: 2023,
      venue: "NeurIPS 2023 D&B",
      org: "UT Austin 等",
      authors: "Bo Liu, Yifeng Zhu 等",
      featured: false,
      tags: ["基准", "终身学习", "知识迁移", "语言条件"],
      tldr: "提供 130 个语言条件操作任务和 4 组能力维度，专门测试策略能否把学到的知识迁移到新任务，而不是只记住单一任务。",
      why: "在 LIBERO 之前，很多操作 benchmark 只测分布内成功率；它把「终身学习」和「迁移」变成可量化指标。",
      intro: [
        "LIBERO 的问题设定很明确：机器人要在一系列任务上依次学习，然后在新任务上评测。它关心的不是单任务过拟合，而是知识能否被保留、组合和迁移。130 个任务被组织成空间、物体、目标与终身学习四组能力。",
        "它已成为语言条件操作策略的常用评测。但作为一个仿真基准，它同样面临饱和与过拟合风险：在 LIBERO 上刷高分数，不等于在真实世界有效。"
      ],
      method: [
        { title: "130 个任务", text: "覆盖空间关系、物体操作、目标变化与终身学习四类能力。" },
        { title: "四组套件", text: "LIBERO-Spatial / Object / Goal / Long，分别测试不同维度的泛化。" },
        { title: "标准化评测", text: "提供人类示教、统一环境与评测脚本，便于比较不同策略。" }
      ],
      evidence: [
        { value: "130", label: "语言条件任务", text: "用统一接口覆盖多种操作与迁移场景。" },
        { value: "4", label: "能力套件", text: "把「会做」与「会迁移」拆开评测，而不只看平均成功率。" }
      ],
      limits: [
        "纯仿真环境，与真实世界的视觉和物理差距明显。",
        "任务数量有限，存在过拟合与基准饱和风险。",
        "终身学习的评测协议仍简化了真实部署中的分布漂移。"
      ],
      related: ["open-x-embodiment", "sim2real", "octo"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2306.03310" },
        { label: "项目页", url: "https://libero-project.github.io/" }
      ]
    },
    {
      id: "droid",
      domain: "data-benchmarks",
      type: "dataset",
      title: "DROID",
      subtitle: "跨机构、跨场景的真实机器人操作数据集",
      year: 2024,
      venue: "RSS 2024",
      org: "Stanford · UC Berkeley · TRI 等 13 家机构",
      authors: "Alexander Khazatsky 等",
      featured: false,
      tags: ["真实数据", "跨场景", "遥操作", "多机构"],
      tldr: "在 13 个机构、52 栋建筑、564 个场景中采集约 7.6 万条真实操作轨迹，覆盖 86 个任务；用统一硬件与采集协议记录多视角视觉、动作与语言标注。",
      why: "与实验室小数据集不同，DROID 用场景与机构多样性逼近「真实世界分布」，为通用操作策略提供更可信的评测基础。",
      intro: [
        "DROID 的核心不是模型，而是采集协议。13 家机构使用统一的 Franka 机械臂、相机 rig 和 VR 遥操作接口，在不同建筑、不同房间、不同光照下采集数据。这使数据天然包含真实世界的多样性与噪声。",
        "它适合训练和评测通用操作策略，但也受限于单一机械臂本体。真正的跨本体泛化，还需要与 Open X-Embodiment 这类异构数据结合。"
      ],
      method: [
        { title: "统一硬件", text: "Franka Panda + 统一相机 rig + VR 遥操作，降低跨机构数据差异。" },
        { title: "多样化场景", text: "13 个机构、52 栋建筑、564 个场景，覆盖不同物体、光照与布局。" },
        { title: "多模态标注", text: "记录多视角图像、末端动作、语言指令与任务元数据。" }
      ],
      evidence: [
        { value: "76k", label: "真实轨迹", text: "约 7.6 万条操作轨迹，覆盖 86 个任务。" },
        { value: "564", label: "采集场景", text: "跨 52 栋建筑、13 家机构，显著提升场景多样性。" }
      ],
      limits: [
        "单一机械臂与夹爪硬件，跨本体泛化有限。",
        "语言标注相对稀疏，任务描述粒度不统一。",
        "真实世界长尾仍远未被覆盖，数据许可需逐项确认。"
      ],
      related: ["open-x-embodiment", "umi", "octo"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2403.12945" },
        { label: "项目页", url: "https://droid-dataset.github.io/" }
      ]
    }
  ];

  const PATHS = [
    {
      id: "start-vla",
      label: "PATH 01",
      title: "从零读懂 VLA",
      description: "先建立范式感，再沿着「离散 token → 连续动作 → 分层推理」看三代系统如何演化。",
      duration: "约 90 分钟",
      level: "入门",
      steps: ["vla-paradigm", "rt2", "openvla", "pi0"]
    },
    {
      id: "policy",
      label: "PATH 02",
      title: "操作策略的进化",
      description: "从动作分布建模出发，理解 Diffusion、Action Chunking 与通用策略之间的关系。",
      duration: "约 2 小时",
      level: "进阶",
      steps: ["diffusion-policy", "act-aloha", "action-chunking", "octo"]
    },
    {
      id: "frontier",
      label: "PATH 03",
      title: "世界模型与通用本体",
      description: "追踪两条前沿：在潜空间/生成世界里预演未来，以及把基础模型装进人形身体。",
      duration: "约 2.5 小时",
      level: "前沿",
      steps: ["dreamer-v3", "genie-3", "groot-n1", "isaac-lab"]
    }
  ];

  const TYPE_LABELS = {
    paper: "论文",
    system: "系统",
    concept: "概念",
    dataset: "数据集",
    benchmark: "基准"
  };

  return { DOMAINS, ENTRIES, PATHS, TYPE_LABELS };
})();
