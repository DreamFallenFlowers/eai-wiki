/* EAI Wiki content — seed edition, 2026-11.
 * All prose is editable. Add an entry to ENTRIES and it appears everywhere automatically.
 * Keep claims sourced: use `links` for papers / official project pages.
 */
window.EAI_DATA = (() => {
  const DOMAINS = [
    {
      id: "navigation",
      num: "01",
      name: "导航",
      en: "Navigation",
      short: "NAV",
      accent: "#008f78",
      tint: "#d8f3ec",
      dark: false,
      feature: false,
      tagline: "在空间里定位、理解与抵达",
      description: "从几何建图到语义目标，从视觉语言导航到社交导航，研究机器人在未知、动态环境中的长期自主。",
      question: "当环境未见过、人类会移动、目标只有一句描述时，机器人如何建立可维护的空间信念，并做出可解释的决策？",
      intro: [
        "导航是具身智能中最接近「行动中的感知」的问题。机器人必须在移动中建图、在不确定中探索、在目标只有类别或一句话时决定下一步。它没有一张完整的地图，只有不断被观测修正的信念状态。",
        "这条研究线从经典 SLAM 与路径规划出发，逐渐分裂出语义目标导航、视觉语言导航、数据驱动的导航基础模型，以及把人当作动态社会性存在的社交导航。它们共享「空间信念」，但对表示、数据和评价的取舍完全不同。"
      ],
      routes: [
        {
          id: "semantic-nav",
          name: "语义导航与 ObjectNav",
          en: "Semantic Navigation",
          summary: "给定物体类别或语义目标，在未知环境中探索、建图、确认目标并抵达。",
          question: "语义先验、主动探索与长期记忆如何协同，才能既找得快又找得对？",
          tags: ["ObjectNav", "语义地图", "主动探索"]
        },
        {
          id: "vln",
          name: "视觉-语言导航",
          en: "Vision-Language Navigation",
          summary: "把自然语言路线指令 grounding 到可执行的空间决策，覆盖离散图与连续环境。",
          question: "当语言给出的是「经过厨房右转」而不是坐标，模型如何把指令、历史和视觉观察对齐？",
          tags: ["R2R", "指令 grounding", "零样本"]
        },
        {
          id: "nav-models",
          name: "导航基础模型",
          en: "Navigation Foundation Models",
          summary: "用大规模机器人轨迹预训练通用视觉导航策略，以目标图像或语言作为条件。",
          question: "导航能否像视觉一样获得一个可微调、可组合、跨本体的基础模型？",
          tags: ["ViNT", "NoMaD", "目标条件"]
        },
        {
          id: "social-nav",
          name: "社交与动态导航",
          en: "Social & Dynamic Navigation",
          summary: "在有人类活动的空间中预测运动、遵守社交规范，并完成导航或重排任务。",
          question: "当人不是静态障碍物，而是有目标、会改变计划的行动者，机器人应该如何通行？",
          tags: ["人机共处", "动态障碍", "社会规范"]
        }
      ],
      related: ["manipulation", "simulation", "data"]
    },
    {
      id: "manipulation",
      num: "02",
      name: "操作",
      en: "Manipulation",
      short: "MANIP",
      accent: "#ff4b1f",
      tint: "#ffe2d7",
      dark: true,
      feature: true,
      tagline: "让手、物与环境发生可靠接触",
      description: "从模仿学习、强化学习到 VLA、WAM 与代码策略，研究接触丰富任务中的通用操作能力。",
      question: "当数据有限、接触复杂、误差会累积时，哪一层应该由学习承担，哪一层应该由结构与控制保证？",
      intro: [
        "操作是具身智能最难被语言捷径绕开的领域。抓取透明杯子、拉上拉链、把电池插进槽里——这些任务要求视觉、触觉、力控与长时序协同，语言模型的先验只能加速，不能替代物理交互。",
        "这棵技术树的分支并不互斥。模仿学习提供可复现的技能采集，强化学习探索人类示教难以覆盖的动态行为，VLA 把语义泛化带进控制，WAM 让模型先预演未来，代码即策略把高层规划变成可检查的程序，而 Harness 负责把这些能力组装成一个稳定运行的系统。"
      ],
      routes: [
        {
          id: "imitation",
          name: "模仿学习",
          en: "Imitation Learning",
          summary: "从人类示教直接学习策略，覆盖行为克隆、动作分块、扩散与流匹配。",
          question: "在示教有限且多模态的情况下，如何让策略既平滑又不过度自信？",
          tags: ["行为克隆", "扩散策略", "动作分块"]
        },
        {
          id: "rl",
          name: "强化学习",
          en: "Reinforcement Learning",
          summary: "通过试错与奖励学习灵巧控制，常在仿真中大规模训练再迁移真机。",
          question: "没有人类示教时，奖励设计与仿真到现实的落差能否被系统性地克服？",
          tags: ["PPO", "域随机化", "灵巧手"]
        },
        {
          id: "vla",
          name: "视觉-语言-动作模型",
          en: "Vision-Language-Action",
          summary: "把视觉、语言与动作统一建模，用多模态预训练获得语义泛化。",
          question: "语义泛化、动作精度与控制频率之间，端到端模型应该如何取舍？",
          tags: ["动作 token", "跨本体", "双系统"]
        },
        {
          id: "wam",
          name: "世界-动作模型",
          en: "World-Action Models",
          summary: "从世界模型演进到世界-动作模型：先学习预测世界，再让未来预测与动作生成联合训练，用想象反哺策略与规划。",
          question: "预测未来画面，究竟能否转化为更好的动作，而不只是好看的视频？",
          tags: ["WorldVLA", "生成式世界", "动作条件"]
        },
        {
          id: "code-policy",
          name: "代码即策略",
          en: "Code as Policy",
          summary: "让 LLM 生成程序、调用感知与控制 API，把语言规划变成结构化、可检查的策略代码。",
          question: "程序化策略的可解释性，能否抵消它对底层 API 与感知质量的依赖？",
          tags: ["LLM 规划", "程序合成", "3D 价值图"]
        },
        {
          id: "harness",
          name: "具身智能体 Harness",
          en: "Embodied Agent Harness",
          summary: "在模型之外组织技能、记忆、状态机、安全护栏与恢复逻辑的系统层。",
          question: "当模型能力足够强，系统层的工程是否会被模型吞掉，还是反而更加重要？",
          tags: ["Agent scaffold", "工具调用", "闭环执行"]
        }
      ],
      related: ["navigation", "loco-manipulation", "data"]
    },
    {
      id: "loco-manipulation",
      num: "03",
      name: "移动操作",
      en: "Loco-Manipulation",
      short: "LOCO",
      accent: "#3155ff",
      tint: "#e2e7ff",
      dark: false,
      feature: false,
      tagline: "行走、平衡与操作，同时发生",
      description: "把移动、全身控制与操作放进同一个闭环，覆盖四足、人形与移动机械臂平台。",
      question: "高维、欠驱动、接触频繁切换的身体，如何承载通用操作？上层任务意图和下层全身控制之间的接口应该长什么样？",
      intro: [
        "移动操作把「走到那里」和「把事做完」合并成同一个控制问题。机器人不能先站稳再伸手：伸手会改变重心，搬重物需要调整脚步，穿过窄门时手臂又是身体的一部分。",
        "这条路线横跨传统全身控制（QP / MPC）、学习式运动先验、人形基础模型与人形 Sim2Real。核心矛盾始终是分层：上层希望用语言和视觉表达意图，下层必须把意图变成满足摩擦、力矩与平衡约束的关节命令。"
      ],
      routes: [
        {
          id: "wbc",
          name: "全身控制",
          en: "Whole-Body Control",
          summary: "统一协调行走、平衡、手臂与接触，把任务目标变成全身关节或力矩指令。",
          question: "当接触状态频繁切换，基于模型的控制与学习到的运动先验如何互补？",
          tags: ["QP / MPC", "运动模仿", "统一控制"]
        },
        {
          id: "loco-rl",
          name: "学习式移动操作",
          en: "Learning for Loco-Manipulation",
          summary: "用强化学习或模仿学习获得四足、人形的移动操作技能，并与高层规划接口。",
          question: "移动操作应该端到端学习，还是拆成运动、操作与任务规划三层？",
          tags: ["四足", "人形", "移动操作"]
        },
        {
          id: "humanoid-fm",
          name: "人形基础模型",
          en: "Humanoid Foundation Models",
          summary: "把视觉语言理解、全身运动与操作放进统一基础模型，跨任务和本体泛化。",
          question: "在人形真机数据仍然稀缺时，数据金字塔能否支撑一个通用基础模型？",
          tags: ["双系统", "人形数据", "基础模型"]
        },
        {
          id: "loco-sim2real",
          name: "人形 Sim2Real",
          en: "Humanoid Sim2Real",
          summary: "缩小仿真与真机动力学差异，让人形的高动态技能稳定迁移。",
          question: "当动作越来越敏捷，域随机化是否足够，还是必须在线辨识真实动力学？",
          tags: ["系统辨识", "残差学习", "域随机化"]
        }
      ],
      related: ["manipulation", "simulation", "data"]
    },
    {
      id: "simulation",
      num: "04",
      name: "仿真器",
      en: "Simulation",
      short: "SIM",
      accent: "#008fe8",
      tint: "#dcefff",
      dark: false,
      feature: false,
      tagline: "让规模定律进入物理世界",
      description: "GPU 物理仿真、场景级模拟、神经重建与 Sim2Real，构成机器人学习的基础设施层。",
      question: "如何让仿真既足够快、又足够真，并明确知道它究竟在哪里不真？",
      intro: [
        "机器人数据昂贵、慢、难以覆盖长尾，仿真提供了另一种可能：并行生成百万级交互，在虚拟世界里试错、随机化、失败，再把学到的先验带回真实。Isaac Lab 这类 GPU 框架让「基础设施」第一次成为可能。",
        "但仿真不是免费午餐。视觉逼真不等于物理正确，物理正确也不等于任务分布正确。一条完整的仿真技术栈至少包含物理引擎、场景与任务、Real2Sim 重建，以及最后的 Sim2Real 迁移。"
      ],
      routes: [
        {
          id: "gpu-sim",
          name: "GPU 并行仿真",
          en: "GPU-Accelerated Simulation",
          summary: "大规模向量化物理环境与并行管线，把交互数据生成速度提升几个量级。",
          question: "在接触精度与吞吐量之间，GPU 仿真器应该如何做取舍？",
          tags: ["Isaac Lab", "MJX", "并行环境"]
        },
        {
          id: "scene-sim",
          name: "场景级仿真",
          en: "Scene-Level Simulation",
          summary: "包含家庭场景、物体交互与人类活动的任务级模拟器，而非单一刚体环境。",
          question: "任务级仿真如何避免成为「只对某个 benchmark 有效的过拟合环境」？",
          tags: ["RoboCasa", "Habitat", "任务基准"]
        },
        {
          id: "real2sim",
          name: "Real2Sim 与神经重建",
          en: "Real2Sim & Neural Reconstruction",
          summary: "用三维重建、3DGS 或数字孪生把真实场景搬进仿真与规划器。",
          question: "重建出的场景如何保留物理、语义与可供性，而不只是外观？",
          tags: ["3DGS", "SLAM", "数字孪生"]
        },
        {
          id: "sim2real",
          name: "Sim2Real 迁移",
          en: "Sim2Real Transfer",
          summary: "用域随机化、系统辨识、残差模型与真机微调缩小现实差距。",
          question: "当仿真与真实不一致时，应该改仿真、改策略，还是改训练目标？",
          tags: ["域随机化", "系统辨识", "真机微调"]
        }
      ],
      related: ["navigation", "loco-manipulation", "data"]
    },
    {
      id: "data",
      num: "05",
      name: "数据与评测",
      en: "Data & Evaluation",
      short: "DATA",
      accent: "#7a5cff",
      tint: "#eae5ff",
      dark: false,
      feature: false,
      tagline: "没有可信评测，就没有真正的进步",
      description: "从遥操作采集到跨本体数据、合成数据与分布式真机评测，研究具身智能如何积累证据。",
      question: "当每个实验室都用自己的任务与指标，什么样的数据与评测协议能够让结果可比、可复现、可质疑？",
      intro: [
        "具身智能最容易被高估的地方，是一个精心剪辑的 demo。真正困难的不只是让机器人成功一次，而是说明它在什么条件下成功、失败模式是什么、别人能否复现。这就是数据与评测存在的意义。",
        "数据路线从「怎么采」开始：遥操作、手持采集、人类视频与仿真合成。随后是「怎么合」：跨本体动作空间与标注协议。最后是「怎么证明」：固定基准、真机擂台、盲测与分布外评测。"
      ],
      routes: [
        {
          id: "teleop",
          name: "遥操作与示教采集",
          en: "Teleoperation & Demonstrations",
          summary: "设计低成本、可迁移的采集硬件与协议，把人类技能变成机器人轨迹。",
          question: "如何获得既真实又便宜、既多样又可复用的操作示教？",
          tags: ["ALOHA", "UMI", "VR 遥操作"]
        },
        {
          id: "cross-embodiment",
          name: "跨本体数据",
          en: "Cross-Embodiment Data",
          summary: "统一异构机器人、传感器与动作空间，让数据在机构与本体之间流动。",
          question: "不同本体的动作空间能否真正对齐，还是所有统一都是一种有损投影？",
          tags: ["Open X", "DROID", "动作空间"]
        },
        {
          id: "synthetic",
          name: "合成数据与数据引擎",
          en: "Synthetic Data & Data Engines",
          summary: "用仿真、生成与演示变换扩大数据规模，并控制分布与质量。",
          question: "合成数据的规模收益，什么时候会被分布偏差抵消？",
          tags: ["MimicGen", "域随机化", "数据放大"]
        },
        {
          id: "eval",
          name: "评测与基准",
          en: "Evaluation & Benchmarks",
          summary: "从固定任务基准到分布式真机擂台，设计能区分泛化、鲁棒性与可复现性的协议。",
          question: "在真机成本高、任务长尾严重的情况下，如何做出可信且可扩展的评测？",
          tags: ["LIBERO", "RoboArena", "真机评测"]
        }
      ],
      related: ["manipulation", "navigation", "simulation"]
    }
  ];

  const ENTRIES = [
    /* ------------------------------------------------------------------ VLA */
    {
      id: "saycan",
      domain: "manipulation",
      route: "code-policy",
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
      domain: "manipulation",
      route: "vla",
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
      domain: "manipulation",
      route: "vla",
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
      domain: "manipulation",
      route: "vla",
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
      domain: "manipulation",
      route: "vla",
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
      domain: "manipulation",
      route: "vla",
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
      domain: "manipulation",
      route: "wam",
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
      domain: "manipulation",
      route: "wam",
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
      domain: "manipulation",
      route: "wam",
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
      domain: "manipulation",
      route: "imitation",
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
      domain: "manipulation",
      route: "imitation",
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
      domain: "manipulation",
      route: "imitation",
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
      domain: "manipulation",
      route: "imitation",
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
      route: "imitation",
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
      domain: "data",
      route: "teleop",
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
      route: "social-nav",
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
      route: "semantic-nav",
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
      domain: "loco-manipulation",
      route: "humanoid-fm",
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
      domain: "loco-manipulation",
      route: "wbc",
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
      route: "gpu-sim",
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
      route: "sim2real",
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
      domain: "simulation",
      route: "real2sim",
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
      domain: "simulation",
      route: "real2sim",
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
      domain: "navigation",
      route: "semantic-nav",
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
      domain: "data",
      route: "cross-embodiment",
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
      domain: "data",
      route: "eval",
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
      domain: "data",
      route: "cross-embodiment",
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
,
    {
      id: "nomad",
      domain: "navigation",
      route: "nav-models",
      type: "paper",
      title: "NoMaD",
      subtitle: "用目标掩码扩散策略统一导航与探索",
      year: 2023,
      venue: "ICRA 2024",
      org: "UC Berkeley",
      authors: "Dhruv Shah, Ajay Sridhar, Arjun Bhorkar 等",
      featured: false,
      tags: ["导航基础模型", "扩散策略", "探索", "目标条件"],
      tldr: "一个目标掩码扩散策略，同时处理「去目标」和「主动探索」两种模式；无需单独训练探索模块，就能在陌生环境中构建拓扑记忆并选择前沿。",
      why: "把目标条件导航与探索统一进一个生成式策略，说明导航基础模型可以从数据中同时学到「利用」与「探索」。",
      intro: [
        "传统导航系统往往把目标导航和探索拆成两个模块：一个负责朝目标走，一个负责在没目标时找前沿。NoMaD 用目标掩码把两者统一：给目标图像时条件在目标上，探索时把目标 mask 掉，模型转而依赖视觉上下文和历史。",
        "策略采用扩散模型生成动作序列，支持多模态路径。系统还维护一个拓扑记忆，把走过的观测组织成可复用的图，从而在长时探索中可以回到已知位置，而不是依赖逐步的局部反应。"
      ],
      method: [
        { title: "目标掩码训练", text: "训练时随机遮蔽目标图像，使同一策略既能做目标条件导航，也能在没有目标时探索。" },
        { title: "扩散动作生成", text: "从噪声生成多步动作序列，保留路径的多模态性，适合存在多条可行路线的环境。" },
        { title: "拓扑记忆", text: "把关键观测组织成图节点，用图像检索与图搜索支撑长时导航和返回。" }
      ],
      evidence: [
        { value: "统一", label: "导航与探索共用一个策略", text: "目标掩码让探索成为「无目标条件」的特例，减少模块之间的接口误差。" },
        { value: "真机", label: "跨场景导航与探索", text: "在真实室内外环境中验证了目标导航与主动探索。" }
      ],
      limits: [
        "依赖高质量的拓扑记忆与图像检索，长期动态环境仍会造成漂移。",
        "扩散推理带来延迟，实时高频控制需要工程优化。",
        "没有显式的三维几何或语义地图，精细空间约束能力有限。"
      ],
      related: ["objectnav", "navgpt", "conceptgraphs"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2310.07896" },
        { label: "项目页", url: "https://nomad-models.github.io/" }
      ]
    },
    {
      id: "navgpt",
      domain: "navigation",
      route: "vln",
      type: "paper",
      title: "NavGPT",
      subtitle: "用大语言模型显式推理视觉语言导航",
      year: 2023,
      venue: "AAAI 2024",
      org: "University of Adelaide",
      authors: "Gengze Zhou, Yicong Hong, Qi Wu",
      featured: false,
      tags: ["VLN", "LLM 推理", "零样本", "可解释性"],
      tldr: "把 VLN 的观测转成文本描述，让 LLM 在导航图上显式分解指令、维护历史并选择下一节点；无需任务特定训练，就能输出可读的推理过程。",
      why: "它是「用通用推理模型做导航」的早期代表，把可解释性带回 VLN，同时暴露了离散文本接口丢失空间信息的问题。",
      intro: [
        "NavGPT 的核心选择是接口：不把视觉特征直接塞进策略，而是把可通行方向、物体与历史转成文本，让 LLM 在每一步进行指令分解、子目标判断与动作选择。这样导航过程可以被人类阅读和审计。",
        "这种零样本方案的优势是泛化和可解释性，代价是信息瓶颈——连续空间、细粒度几何和视觉线索被压缩成文本。它更适合离散图上的 VLN，而不是低层连续控制。"
      ],
      method: [
        { title: "文本化观测", text: "把当前可通行节点、可见物体与历史路径编码成结构化文本，供 LLM 推理。" },
        { title: "显式推理链", text: "要求模型分析指令、回顾已走路径、判断子目标，再在候选节点中选择下一步。" },
        { title: "零样本执行", text: "不进行 VLN 任务微调，直接依赖通用语言模型的指令理解与常识。" }
      ],
      evidence: [
        { value: "Zero-shot", label: "无需任务特定训练", text: "在标准 VLN 设置中直接推理，展示了通用 LLM 的导航潜力。" },
        { value: "可解释", label: "推理链可读", text: "每一步选择都有自然语言依据，便于分析失败原因。" }
      ],
      limits: [
        "文本接口压缩掉大量空间与视觉信息，细粒度导航能力有限。",
        "依赖底层离散图和候选动作生成，尚未覆盖连续控制。",
        "LLM 推理延迟与成本较高，长程任务容易累积语言层面的错误。"
      ],
      related: ["objectnav", "nomad", "habitat-3"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2305.16986" },
        { label: "代码", url: "https://github.com/GengzeZhou/NavGPT" }
      ]
    },
    {
      id: "openai-dexterous",
      domain: "manipulation",
      route: "rl",
      type: "paper",
      title: "Learning Dexterous In-Hand Manipulation",
      subtitle: "用仿真强化学习训练灵巧手",
      year: 2018,
      venue: "arXiv 2018",
      org: "OpenAI",
      authors: "OpenAI Dactyl Team",
      featured: false,
      tags: ["灵巧手", "强化学习", "域随机化", "Sim2Real"],
      tldr: "用 PPO + LSTM 在仿真中训练 Shadow 灵巧手，通过大规模域随机化和视觉位姿估计，把策略零样本迁移到真机完成物体在手内重定向。",
      why: "它把「仿真里大规模试错 + 域随机化 + 真机零样本」变成了灵巧操作的标准工程范式，也暴露了视觉与触觉的长期瓶颈。",
      intro: [
        "OpenAI 的 Dactyl 工作把灵巧手当作一个控制与感知的联合问题。策略在仿真中接收关节角、物体位姿与本体感知，用 LSTM 处理历史，通过 PPO 学习如何连续改变手指接触来旋转物体。",
        "真机迁移的关键不是某个网络结构，而是随机化：物体质量、摩擦、尺寸、传感器噪声、执行器延迟都被随机化，让策略见过足够多的「世界变体」。但物体位姿仍依赖外部视觉系统估计，遮挡和标定误差会直接破坏闭环。"
      ],
      method: [
        { title: "大规模 PPO", text: "在并行仿真中训练 LSTM 策略，输入本体感知与物体状态，输出手指关节位置。" },
        { title: "自动域随机化", text: "随机化物理参数、观测噪声与控制延迟，并自适应扩大难度，提升真机鲁棒性。" },
        { title: "视觉位姿闭环", text: "用多相机视觉估计物体六自由度位姿，作为策略输入；位姿误差是实际系统的关键瓶颈。" }
      ],
      evidence: [
        { value: "Zero-shot", label: "仿真到真机迁移", text: "策略未经真机微调即可在 Shadow 手上执行物体重定向。" },
        { value: "多物体", label: "泛化到不同几何", text: "通过域随机化覆盖不同尺寸、形状和质量分布的物体。" }
      ],
      limits: [
        "依赖外部视觉位姿估计，遮挡、反光和标定误差会显著降低成功率。",
        "任务集中在手内重定向，尚未覆盖工具使用与长程操作。",
        "算力与仿真调参成本高，策略可解释性弱。"
      ],
      related: ["daydreamer", "diffusion-policy", "sim2real"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/1808.00177" },
        { label: "官方博客", url: "https://openai.com/index/learning-dexterity/" }
      ]
    },
    {
      id: "daydreamer",
      domain: "manipulation",
      route: "rl",
      type: "paper",
      title: "DayDreamer",
      subtitle: "在真实机器人上用世界模型从零学习",
      year: 2022,
      venue: "CoRL 2022",
      org: "UC Berkeley",
      authors: "Philipp Wu, Alejandro Escontrela, Danijar Hafner 等",
      featured: false,
      tags: ["世界模型", "真机强化学习", "样本效率", "Dreamer"],
      tldr: "把 Dreamer 的潜空间世界模型直接用在真实机器人上：四足行走、机械臂抓取与轮式导航都能在数小时真机交互内从零学会，不需要仿真器。",
      why: "它证明世界模型不仅能降低仿真成本，也能让真机强化学习在有限交互预算内可行。",
      intro: [
        "真机强化学习的最大成本是交互次数。DayDreamer 不建高保真仿真，而是让机器人在真实世界里收集数据，学习一个潜空间世界模型，再在模型的想象中训练策略。这样每次真实交互都被最大化利用。",
        "论文在四足、机械臂和轮式机器人上分别学习行走、抓取与导航，说明同一套算法可以跨越本体。但真机上的安全探索、模型误差与奖励设计仍是不可回避的问题。"
      ],
      method: [
        { title: "在线世界模型", text: "用真实交互数据持续训练 RSSM，预测潜状态、奖励与终止信号。" },
        { title: "想象中训练策略", text: "actor-critic 在世界模型滚动的潜轨迹上更新，减少真实机器人交互。" },
        { title: "跨本体复用", text: "同一算法用于四足、机械臂与轮式平台，验证通用性。" }
      ],
      evidence: [
        { value: "真机", label: "从零学习多种技能", text: "四足行走、机械臂抓取与轮式导航均在真实硬件上学习。" },
        { value: "样本效率", label: "数小时级交互", text: "相比无模型的真机 RL，显著减少所需真实样本。" }
      ],
      limits: [
        "真实世界的安全探索仍依赖人工重置与护栏。",
        "世界模型误差会在长时任务中累积，奖励设计仍高度任务特定。",
        "训练时间以小时计，离即插即用仍有距离。"
      ],
      related: ["openai-dexterous", "dreamer-v3", "world-model"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2206.14176" },
        { label: "项目页", url: "https://danijar.com/project/daydreamer/" }
      ]
    },
    {
      id: "worldvla",
      domain: "manipulation",
      route: "wam",
      type: "paper",
      title: "WorldVLA",
      subtitle: "把世界模型与动作模型装进同一个自回归框架",
      year: 2025,
      venue: "arXiv 2025",
      org: "Alibaba Group 等",
      authors: "Jun Cen, Chaohui Yu 等",
      featured: false,
      tags: ["WAM", "世界模型", "动作生成", "注意力掩码"],
      tldr: "在同一个自回归模型里同时预测未来图像和动作：世界模型帮助动作理解物理，动作模型反过来改善视觉理解；再用注意力掩码缓解动作序列的自回归误差累积。",
      why: "它是「世界-动作模型」这条新路线的代表尝试：不再把 world model 只当预训练工具，而是让预测未来与生成动作共享一个生成过程。",
      intro: [
        "WorldVLA 把 VLA 与世界模型放进一个自回归序列：模型既生成下一帧图像，也生成下一步动作。预测未来图像迫使模型学习动作与视觉后果之间的关系，而动作预测反过来提供更强的任务表征。",
        "自回归生成动作会遇到误差传播：前一步动作错了，后面会继续错。论文提出一种注意力掩码策略，在生成当前动作时选择性屏蔽之前的动作 token，让每个动作更多依赖观测而不是错误历史。"
      ],
      method: [
        { title: "联合序列建模", text: "把图像 token 与动作 token 放在同一自回归序列中，同时优化视觉预测与动作生成。" },
        { title: "动作注意力掩码", text: "生成当前动作时屏蔽历史动作，减少自回归动作块中的误差传播。" },
        { title: "互相增强", text: "世界模型提供物理先验，动作模型提供任务相关表征，二者共同训练。" }
      ],
      evidence: [
        { value: "联合", label: "World model + action model", text: "单一框架同时做未来图像预测与动作生成，性能优于各自独立训练。" },
        { value: "掩码", label: "缓解动作误差累积", text: "动作注意力掩码显著改善动作块生成，说明接口设计比单纯加参数更重要。" }
      ],
      limits: [
        "视觉预测质量与动作精度之间并不总是正相关，可能出现「预测好但控制差」。",
        "自回归推理速度有限，闭环实时性需要额外优化。",
        "主要在较短的桌面任务上验证，长程与接触丰富任务仍待检验。"
      ],
      related: ["world-model", "vla-paradigm", "genie-3"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2506.21539" },
        { label: "代码", url: "https://github.com/alibaba-damo-academy/WorldVLA" }
      ]
    },
    {
      id: "code-as-policies",
      domain: "manipulation",
      route: "code-policy",
      type: "paper",
      title: "Code as Policies",
      subtitle: "让语言模型直接写机器人策略代码",
      year: 2022,
      venue: "ICRA 2023 · arXiv 2022",
      org: "Google Research",
      authors: "Jacky Liang, Wenlong Huang 等",
      featured: false,
      tags: ["LLM 编程", "策略代码", "层级代码生成", "少样本"],
      tldr: "让代码 LLM 根据自然语言指令生成 Python 策略代码，组合感知 API 与控制 primitive；通过递归定义函数的层级代码生成，表达反馈循环、空间推理与精确参数。",
      why: "它把「语言模型控制机器人」从输出单个动作，推进到输出可执行、可检查、可复用的程序。",
      intro: [
        "Code as Policies 不要求 LLM 直接理解关节动力学，而是让它写代码调用已有能力：物体检测、坐标变换、抓取原语、速度控制。语言模型负责组合逻辑，底层 API 负责物理执行。",
        "这种接口的优势是可解释、可测试、可复用；缺点是能力上限被 API 锁死。如果环境里没有可调用的感知或控制原语，代码再漂亮也无法执行。"
      ],
      method: [
        { title: "少样本代码提示", text: "给模型若干「指令注释 + 对应策略代码」示例，让它为新指令重新组合 API。" },
        { title: "层级代码生成", text: "允许模型递归定义未实现的辅助函数，从而生成更复杂的策略结构。" },
        { title: "策略表达", text: "代码可以表达反应式控制、路径点策略、空间几何运算与反馈循环。" }
      ],
      evidence: [
        { value: "可执行", label: "多平台真机策略", text: "在多个真实机器人平台上演示抓放、轨迹控制与响应式行为。" },
        { value: "可检查", label: "策略即程序", text: "生成的代码可以被阅读、调试、复用，而不是黑箱动作序列。" }
      ],
      limits: [
        "能力受限于感知与控制 API 的表达力。",
        "LLM 代码可能包含逻辑错误或对物理世界的错误假设。",
        "复杂接触任务仍需底层控制器或学习策略兜底。"
      ],
      related: ["saycan", "voxposer", "embodied-harness"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2209.07753" },
        { label: "项目页", url: "https://code-as-policies.github.io/" }
      ]
    },
    {
      id: "voxposer",
      domain: "manipulation",
      route: "code-policy",
      type: "paper",
      title: "VoxPoser",
      subtitle: "用语言模型组合三维价值图，零样本合成轨迹",
      year: 2023,
      venue: "CoRL 2023",
      org: "Stanford University",
      authors: "Wenlong Huang, Chen Wang 等",
      featured: true,
      tags: ["3D 价值图", "LLM 规划", "零样本", "模型规划"],
      tldr: "LLM 写代码调用 VLM，把语言指令分解成三维空间中的可供性与约束价值图；再用模型规划器在这些图上合成闭环轨迹，无需任务特定示教。",
      why: "它在「语言规划」和「连续控制」之间加了一层显式的三维价值图，让代码策略第一次能处理开放词汇的精细空间约束。",
      intro: [
        "VoxPoser 的关键中间表示是三维价值图：语言模型把「把杯子推到桌边但别碰倒花瓶」拆成吸引、排斥、速度限制等约束，VLM 把这些约束 grounding 到三维空间，规划器在图上优化轨迹。",
        "相比直接生成动作，价值图是可检查、可组合的。相比纯代码策略，它把连续空间的几何约束交给规划器，避免让 LLM 猜测精确坐标。"
      ],
      method: [
        { title: "LLM 代码组合", text: "语言模型生成代码，调用 VLM 生成物体可供性、避障与运动约束。" },
        { title: "三维价值图", text: "把约束写成体素空间中的标量场，支持吸引、排斥、速度与姿态项的组合。" },
        { title: "闭环轨迹优化", text: "基于价值图优化末端轨迹，并在线重规划以应对动态扰动。" }
      ],
      evidence: [
        { value: "Zero-shot", label: "开放词汇操作", text: "无需任务示教即可处理大量日常语言指令。" },
        { value: "可组合", label: "约束即代码", text: "不同空间约束可以通过程序组合，而不是重新训练一个端到端策略。" }
      ],
      limits: [
        "依赖 VLM 的空间 grounding 质量，物体属性与接触动力学仍可能误判。",
        "规划循环计算成本高，动态环境需要频繁重规划。",
        "对透明、反光、可变形物体的三维感知仍脆弱。"
      ],
      related: ["code-as-policies", "saycan", "vla-paradigm"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2307.05973" },
        { label: "项目页", url: "https://voxposer.github.io/" }
      ]
    },
    {
      id: "embodied-harness",
      domain: "manipulation",
      route: "harness",
      type: "concept",
      title: "具身智能体 Harness",
      subtitle: "包在模型外面的执行、记忆与安全层",
      year: 2026,
      venue: "概念词条",
      org: "社区综合",
      authors: "EAI Wiki 编辑组",
      featured: false,
      tags: ["Agent scaffold", "工具调用", "记忆", "安全护栏"],
      tldr: "Harness 不是策略本身，而是把 VLM/策略、技能库、记忆、状态机、安全护栏与日志接成可运行智能体的系统层；它决定模型能力能否稳定落进物理闭环。",
      why: "同一个基础模型换一套 harness，真机表现可能完全不同。随着模型趋同，系统层正在成为具身智能产品差异化的关键。",
      intro: [
        "具身 Harness 可以理解为机器人上的「agent runtime」：它把自然语言目标转成任务状态，选择技能或工具，调用低层控制器，监控执行结果，在失败时重试或降级，并把每次决策写入可审计的日志。",
        "它不是新模型，而是一组接口与约束。一个最小 harness 至少包括技能注册表、状态与记忆、闭环执行器、安全检查和可观测性。它和 VLA、Code as Policy、世界模型不是替代关系，而是把它们组装起来的胶水层。"
      ],
      method: [
        { title: "技能与工具注册", text: "把导航、抓取、放置、感知查询等能力包装成有前置条件与效果声明的接口。" },
        { title: "状态与记忆", text: "维护任务进度、场景事实、失败历史与人类指令，避免每次决策都从零开始。" },
        { title: "安全与恢复", text: "在执行前做可行性/碰撞/权限检查，失败后重试、回退或请求人类接管，并记录完整轨迹。" }
      ],
      evidence: [
        { value: "系统", label: "模型能力的放大器", text: "工具调用、记忆与恢复逻辑能让有限模型完成更长程的任务。" },
        { value: "可审计", label: "决策链可追踪", text: "把计划、调用参数与执行结果记录下来，才能定位失败发生在哪一层。" }
      ],
      limits: [
        "概念边界尚未统一，容易变成把所有工程细节都装进去的筐。",
        "缺乏标准 benchmark，难以比较不同 harness 的真实贡献。",
        "过度工程会引入延迟与脆弱接口，甚至掩盖底层模型的能力边界。"
      ],
      related: ["saycan", "code-as-policies", "gemini-robotics-15"],
      links: [
        { label: "开源实例", url: "https://github.com/HenryLiu0405/Embodied-Harness" },
        { label: "延伸：Code as Policies", url: "https://arxiv.org/abs/2209.07753" }
      ]
    },
    {
      id: "hover",
      domain: "loco-manipulation",
      route: "wbc",
      type: "paper",
      title: "HOVER",
      subtitle: "一个统一多模态命令空间的人形全身控制器",
      year: 2024,
      venue: "ICRA 2025",
      org: "NVIDIA · CMU · UC Berkeley 等",
      authors: "Tairan He, Wenli Xiao 等",
      featured: true,
      tags: ["全身控制", "运动模仿", "多模式", "人形"],
      tldr: "把全身运动模仿当作统一抽象，用策略蒸馏把导航、移动操作与桌面操作等不同控制模式合并成一个多模式人形控制器，避免每种命令空间重训一个策略。",
      why: "它提供了一种「一个控制器覆盖多种接口」的工程答案，可能是人形机器人从专用技能走向通用身体中间件的关键。",
      intro: [
        "人形机器人不同任务需要不同控制接口：导航希望跟踪根速度，桌面操作希望跟踪上半身关节角，移动操作希望同时控制手和脚。HOVER 的洞察是：这些接口背后都可以还原为全身运动模仿。",
        "方法先用运动捕捉数据训练一个通用的运动模仿教师，再把不同控制模式蒸馏进一个学生策略。学生可以在模式之间切换，而不需要为每种接口重新训练。"
      ],
      method: [
        { title: "运动模仿作为共同抽象", text: "用全身运动跟踪提供统一的身体技能先验，覆盖平衡、行走与手臂姿态。" },
        { title: "多模式策略蒸馏", text: "把导航、关节跟踪、移动操作等命令空间蒸馏进单一控制器，实现模式切换。" },
        { title: "真机部署", text: "在真实人形上验证多模式控制与模式间的平滑切换。" }
      ],
      evidence: [
        { value: "Multi-mode", label: "一个策略多种命令空间", text: "导航、全身操作与桌面操作共享同一个控制器，而非各自训练。" },
        { value: "ICRA 2025", label: "真机全身控制", text: "在仿真与真实人形平台上评估运动跟踪和模式切换。" }
      ],
      limits: [
        "依赖高质量运动捕捉与重定向数据，动作分布外的技能仍受限。",
        "多模式蒸馏可能牺牲各模式的极限性能。",
        "没有解决高层任务理解与长程操作规划。"
      ],
      related: ["wbc", "groot-n1", "omnih2o"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2410.21229" },
        { label: "项目页", url: "https://hover-versatile-humanoid.github.io/" }
      ]
    },
    {
      id: "omnih2o",
      domain: "loco-manipulation",
      route: "loco-rl",
      type: "paper",
      title: "OmniH2O",
      subtitle: "从人到人形的全身遥操作与技能学习",
      year: 2024,
      venue: "CoRL 2024",
      org: "UT Austin · NVIDIA 等",
      authors: "Tairan He, Zhengyi Luo 等",
      featured: false,
      tags: ["人形遥操作", "运动重定向", "全身控制", "灵巧手"],
      tldr: "用人体姿态与 VR 接口把人映射到人形机器人，通过运动重定向和强化学习实现全身遥操作、灵巧手控制与移动操作，并进一步把人类示范用于自主技能学习。",
      why: "它把「人怎么教人形」做成一条可复用的数据与控制管线，连接了遥操作、全身控制与模仿学习。",
      intro: [
        "OmniH2O 把人的动作当作人形机器人的天然示教。系统从 VR 头显、手部追踪或单目视频中恢复人体姿态，重定向到机器人骨架，再用 RL 训练的运动跟踪策略执行全身动作。",
        "遥操作只是第一步。人类操作产生的数据可以进一步训练自主策略，让机器人学会在真实环境中完成抓取、搬运与移动操作，而不需要为每个任务重新设计奖励。"
      ],
      method: [
        { title: "人体到人形重定向", text: "把人体关键点、手部姿态与头部视角映射到不同人形骨架。" },
        { title: "RL 运动跟踪", text: "训练全身控制器在仿真中跟踪重定向后的运动，再迁移到真机。" },
        { title: "从遥操作到自主", text: "把人类遥操作轨迹作为示范，训练可自主执行的移动操作策略。" }
      ],
      evidence: [
        { value: "Whole-body", label: "全身 + 灵巧手遥操作", text: "人可以同时控制行走、躯干、手臂与手指。" },
        { value: "Data", label: "人类示范到自主策略", text: "遥操作数据可转化为可部署的自主技能。" }
      ],
      limits: [
        "人体与机器人形态差异导致重定向失真。",
        "遥操作对通信延迟和操作者熟练度敏感。",
        "自主策略仍受限于示范任务的覆盖范围。"
      ],
      related: ["hover", "groot-n1", "umi"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2406.08858" },
        { label: "项目页", url: "https://omni.human2humanoid.com/" }
      ]
    },
    {
      id: "locoman",
      domain: "loco-manipulation",
      route: "loco-rl",
      type: "paper",
      title: "LocoMan",
      subtitle: "给四足机器人装上轻量移动操作臂",
      year: 2024,
      venue: "arXiv 2024",
      org: "多机构合作",
      authors: "Changyi Lin 等",
      featured: false,
      tags: ["四足机器人", "移动操作", "模块化控制", "VLM 规划"],
      tldr: "给四足机器人加装 3-DoF 轻量操作臂，用模块化的运动、操作与全身控制策略组合出受限空间中的移动操作，并用 VLM 做高层任务规划。",
      why: "它把 loco-manipulation 从昂贵的人形平台扩展到更便宜、更稳定的四足平台，强调硬件与分层策略的协同设计。",
      intro: [
        "LocoMan 的出发点是：很多家庭/工业任务不需要完整人形，只需要机器人能够在不平整地面移动，同时用轻量手臂触碰、推拉和抓取物体。四足平台提供稳定移动，附加操作臂提供干预能力。",
        "系统把控制拆成移动、操作和全身协调策略，再用视觉语言模型分解任务。这种分层让不同模块可以独立训练，但也带来模块之间的接口和时序问题。"
      ],
      method: [
        { title: "轻量 loco-manipulator", text: "在四足机器人上安装低自由度操作臂，兼顾负载、灵活性与成本。" },
        { title: "模块化策略", text: "分离移动、操作与全身控制策略，通过高层调度协调。" },
        { title: "VLM 任务规划", text: "用视觉语言模型把自然语言任务拆成可执行的移动与操作步骤。" }
      ],
      evidence: [
        { value: "四足", label: "受限空间移动操作", text: "在狭窄、需要改变身体姿态的空间中完成推拉与抓取任务。" },
        { value: "模块化", label: "控制与规划解耦", text: "不同技能可独立训练并由高层组合。" }
      ],
      limits: [
        "附加操作臂的自由度与负载有限，精细操作能力弱于人形或机械臂。",
        "模块之间的接口误差会累积，长程任务可靠性不足。",
        "高层 VLM 规划仍依赖预定义技能集合。"
      ],
      related: ["omnih2o", "hover", "wbc"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2403.18197" },
        { label: "项目页", url: "https://locoman.github.io/" }
      ]
    },
    {
      id: "asap",
      domain: "loco-manipulation",
      route: "loco-sim2real",
      type: "paper",
      title: "ASAP",
      subtitle: "对齐仿真与真实物理的人形全身技能学习",
      year: 2025,
      venue: "RSS 2025",
      org: "CMU · NVIDIA 等",
      authors: "Tairan He, Jiawei Gao 等",
      featured: false,
      tags: ["Sim2Real", "人形", "运动跟踪", "残差学习"],
      tldr: "两阶段框架：先在仿真中用人体运动数据预训练全身跟踪策略，再在真机采集数据训练残差动作模型，并把残差模型放回仿真中微调，从而对齐真实动力学。",
      why: "它把「模型误差」变成一个可学习的 delta 动作模型，而不是只靠域随机化或人工系统辨识，代表了人形 Sim2Real 的一条新路径。",
      intro: [
        "高动态人形动作对动力学误差极其敏感。ASAP 不试图一次造出完美仿真，而是承认仿真与真实存在差异：先把仿真策略部署到真机，收集真实轨迹，再学习一个残差动作来补偿差异。",
        "残差模型被放回仿真，在预训练策略上继续微调，形成闭环。这个过程可以迭代，使策略逐步适应真实世界，同时保留仿真中的敏捷性。"
      ],
      method: [
        { title: "仿真预训练", text: "用重定向的人体运动训练全身运动跟踪策略，获得敏捷的运动先验。" },
        { title: "真实残差学习", text: "在真机采集数据，训练 delta 动作模型补偿动力学差异。" },
        { title: "仿真中联合微调", text: "把残差模型集成进仿真，重新微调策略，缩小 sim2real 差距。" }
      ],
      evidence: [
        { value: "Agile", label: "高动态全身动作", text: "在真实 Unitree G1 上完成多种敏捷动作，跟踪误差优于 SysID 与域随机化基线。" },
        { value: "两阶段", label: "残差模型可迭代", text: "真实数据只用于学习残差，避免从头训练高维策略。" }
      ],
      limits: [
        "残差模型依赖真实数据覆盖，未见过的高动态动作仍可能失败。",
        "两阶段流程工程复杂，需要在仿真与真机之间反复迭代。",
        "安全约束与人形硬件的耐久性仍是部署瓶颈。"
      ],
      related: ["sim2real", "hover", "groot-n1"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2502.01143" },
        { label: "项目页", url: "https://agile.human2humanoid.com/" }
      ]
    },
    {
      id: "robocasa",
      domain: "simulation",
      route: "scene-sim",
      type: "system",
      title: "RoboCasa",
      subtitle: "面向通用机器人的大规模日常任务仿真",
      year: 2024,
      venue: "RSS 2024",
      org: "UT Austin · NVIDIA",
      authors: "Soroush Nasiriany, Abhiram Maddukuri 等",
      featured: true,
      tags: ["场景仿真", "厨房任务", "生成式资产", "基准"],
      tldr: "构建包含 100+ 日常厨房任务、2,500+ 物体与可生成场景的仿真环境，并提供人类演示与多任务基准，用于训练和评测通用操作策略。",
      why: "它把仿真从「单个任务环境」推进到「可组合的日常生活场景集合」，让通用策略获得比 LIBERO 更接近家庭环境的训练分布。",
      intro: [
        "RoboCasa 关注的是场景级多样性：同一个厨房要能改变布局、物体、材质与任务。它提供生成式资产与场景配置，让研究者可以批量生成不同的厨房，而不是手工搭一个固定环境。",
        "环境包含 100+ 任务，覆盖开抽屉、拿取、清理、微波炉等日常行为，并提供人类演示用于模仿学习。它的价值不仅在任务数量，更在于把「场景变化」作为变量纳入训练与评测。"
      ],
      method: [
        { title: "可生成场景", text: "用模块化厨房资产与布局采样，自动组合出大量不同场景。" },
        { title: "日常任务套件", text: "覆盖 100+ 厨房操作任务，并提供语言指令与成功判定。" },
        { title: "人类示范", text: "为多任务提供遥操作演示，支持模仿学习与多任务策略训练。" }
      ],
      evidence: [
        { value: "100+", label: "日常厨房任务", text: "从简单抓取到长程厨房流程，覆盖场景与物体变化。" },
        { value: "2,500+", label: "物体与资产", text: "以生成式资产支撑场景级多样性。" }
      ],
      limits: [
        "聚焦厨房，无法代表全部家庭或工业操作分布。",
        "物理接触与流体、可变形物体仍被简化。",
        "sim2real 迁移未在论文中充分验证。"
      ],
      related: ["isaac-lab", "sim2real", "libero"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2406.02523" },
        { label: "项目页", url: "https://robocasa.ai/" }
      ]
    },
    {
      id: "mimicgen",
      domain: "data",
      route: "synthetic",
      type: "system",
      title: "MimicGen",
      subtitle: "用少量人类示范放大成大规模数据",
      year: 2023,
      venue: "CoRL 2023",
      org: "UT Austin · NVIDIA",
      authors: "Ajay Mandlekar, Soroush Nasiriany 等",
      featured: false,
      tags: ["数据生成", "示范扩增", "模仿学习", "仿真"],
      tldr: "把人类示范拆成以物体为中心的子任务片段，再通过空间变换、物体替换与机器人重执行，自动生成数千条新示范，覆盖新布局、新物体与新场景。",
      why: "它把数据扩增从图像层面的扰动，提升到任务与物体层面的结构化变换，为「少量示范 + 大规模合成」提供了工程范式。",
      intro: [
        "人工采集机器人示教成本高，而且往往集中在少数物体和布局上。MimicGen 的思路是复用人类示范中的「动作意图」：抓住一个片段，改变相关物体或目标的位置，再让机器人在仿真里重新执行。",
        "系统定义以物体为中心的子任务边界，通过变换物体位姿、替换几何、重新规划机器人轨迹来生成新示范。生成的数据可用于训练模仿学习策略，并在真实机器人上迁移。"
      ],
      method: [
        { title: "示范分段", text: "把一条人类示范拆成以物体为中心的子任务，识别每段的交互对象与目标。" },
        { title: "空间与物体变换", text: "改变物体、目标和场景布局，重新生成机器人可执行的轨迹。" },
        { title: "大规模数据生成", text: "在仿真中自动生成数千条示范，覆盖原始数据没有的对象和布局。" }
      ],
      evidence: [
        { value: "1000s", label: "自动生成示范", text: "从少量人类示范扩展到数千条训练轨迹。" },
        { value: "多任务", label: "跨物体与场景", text: "生成数据能训练出在真实机器人上执行的新策略。" }
      ],
      limits: [
        "依赖可识别的子任务分段与可重规划的仿真环境。",
        "对接触丰富、可变形物体的变换容易失败。",
        "生成数据继承源示范的偏置，不能自动发现新策略。"
      ],
      related: ["robocasa", "open-x-embodiment", "umi"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2310.17596" },
        { label: "项目页", url: "https://mimicgen.github.io/" }
      ]
    },
    {
      id: "roboarena",
      domain: "data",
      route: "eval",
      type: "benchmark",
      title: "RoboArena",
      subtitle: "把真机评测变成分布式盲测擂台",
      year: 2025,
      venue: "arXiv 2025",
      org: "UC Berkeley · Stanford 等",
      authors: "Pranav Atreya, Karl Pertsch 等",
      featured: true,
      tags: ["真机评测", "分布式评估", "盲测", "通用策略"],
      tldr: "不固定任务与环境，而是让多个机构的评测者自由选择场景，对两个策略做双盲成对比较，再聚合偏好得到全局排名；用 DROID 平台和 600+ 真机 episode 验证。",
      why: "它绕开了集中式机器人挑战赛的标准化瓶颈，让通用策略可以在多样真实环境中被公平比较，是评测基础设施的一次重要转向。",
      intro: [
        "通用策略的评测很难：固定任务会过拟合，集中比赛成本高且覆盖有限。RoboArena 让评测者保留场景选择权，但要求他们同时运行两个匿名策略并做成对比较。这样可以在不同任务上收集偏好，而不是强行统一任务。",
        "聚合后的排名不依赖某个固定 benchmark，而依赖分布式的成对证据。它更像机器人领域的「众包 A/B 测试」，适合评估泛化能力，但需要严格的盲测协议与统计校正。"
      ],
      method: [
        { title: "分布式评测网络", text: "多个机构使用统一机器人平台，自由选择任务与环境。" },
        { title: "双盲成对比较", text: "同一场景中匿名运行两个策略，评测者只判断哪一个更好。" },
        { title: "偏好聚合排名", text: "把跨机构、跨任务的成对比较聚合成全局策略排名。" }
      ],
      evidence: [
        { value: "600+", label: "真实成对 episode", text: "在 7 个机构的 DROID 平台上完成 600 多对真机比较。" },
        { value: "7", label: "通用策略参与", text: "用分布式偏好比集中式评测更准确地区分策略能力。" }
      ],
      limits: [
        "依赖评测者遵守双盲协议，仍可能出现场景选择偏差。",
        "成对比较成本高，难以覆盖所有任务维度。",
        "偏好排名不解释失败原因，也不能代替细粒度诊断。"
      ],
      related: ["libero", "droid", "open-x-embodiment"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2506.18123" },
        { label: "项目页", url: "https://robo-arena.github.io/" }
      ]
    }
  ];

  const RESOURCES = [
    {
      id: "res-hm3d",
      name: "HM3D",
      type: "dataset",
      year: 2021,
      domains: ["navigation"],
      scale: "1,000 个真实室内场景",
      summary: "Habitat-Matterport 3D，真实室内扫描数据集，是 ObjectNav 与场景理解的标准训练/评测底座。",
      url: "https://aihabitat.org/datasets/hm3d/"
    },
    {
      id: "res-matterport3d",
      name: "Matterport3D",
      type: "dataset",
      year: 2017,
      domains: ["navigation"],
      scale: "90 个建筑 / 194k RGB-D",
      summary: "建筑级真实室内重建数据集，提供全景图像、网格与语义标注，是 VLN 与具身导航的经典数据底座。",
      url: "https://niessner.github.io/Matterport/"
    },
    {
      id: "res-r2r",
      name: "R2R",
      type: "benchmark",
      year: 2018,
      domains: ["navigation"],
      scale: "7,189 条路径 / 21,567 条指令",
      summary: "Room-to-Room，视觉语言导航的奠基 benchmark；要求智能体在离散导航图上按自然语言指令行进。",
      url: "https://bringmeaspoon.org/"
    },
    {
      id: "res-habitat3",
      name: "Habitat 3.0",
      type: "benchmark",
      year: 2023,
      domains: ["navigation", "simulation"],
      scale: "人机共处 / 重排",
      summary: "把真实室内场景、人形化身与机器人放进同一仿真，评测社交导航与人机协作。",
      url: "https://aihabitat.org/habitat3/",
      entryId: "habitat-3"
    },
    {
      id: "res-libero",
      name: "LIBERO",
      type: "benchmark",
      year: 2023,
      domains: ["manipulation", "data"],
      scale: "130 个任务 / 4 组能力",
      summary: "语言条件操作基准，专门测试知识迁移与终身学习，而不是只测单一任务的成功率。",
      url: "https://libero-project.github.io/",
      entryId: "libero"
    },
    {
      id: "res-calvin",
      name: "CALVIN",
      type: "benchmark",
      year: 2022,
      domains: ["manipulation", "data"],
      scale: "34 个任务 / 长程指令",
      summary: "面向长程语言条件操作的仿真 benchmark，强调连续指令序列与泛化。",
      url: "https://github.com/mees/calvin"
    },
    {
      id: "res-simplerenv",
      name: "SimplerEnv",
      type: "benchmark",
      year: 2024,
      domains: ["manipulation", "simulation"],
      scale: "真实-仿真对齐评测",
      summary: "用真实机器人视频与仿真环境对齐，为通用操作策略提供可复现的仿真评测替代。",
      url: "https://simpler-env.github.io/"
    },
    {
      id: "res-droid",
      name: "DROID",
      type: "dataset",
      year: 2024,
      domains: ["manipulation", "data"],
      scale: "76k 轨迹 / 564 场景",
      summary: "跨 13 家机构采集的真实操作数据集，用统一硬件与协议覆盖不同建筑和日常任务。",
      url: "https://droid-dataset.github.io/",
      entryId: "droid"
    },
    {
      id: "res-oxe",
      name: "Open X-Embodiment",
      type: "dataset",
      year: 2023,
      domains: ["manipulation", "data"],
      scale: "22 本体 / 1M+ 轨迹",
      summary: "社区协作的跨本体机器人数据集合，统一格式与动作空间，支撑 RT-X 与后续通用策略。",
      url: "https://robopen.github.io/",
      entryId: "open-x-embodiment"
    },
    {
      id: "res-amass",
      name: "AMASS",
      type: "dataset",
      year: 2019,
      domains: ["loco-manipulation"],
      scale: "40+ 小时动作捕捉",
      summary: "统一的人体动作捕捉数据集集合，是运动重定向、全身跟踪与人形运动先验的常用数据底座。",
      url: "https://amass.is.tue.mpg.de/"
    },
    {
      id: "res-humanoidbench",
      name: "HumanoidBench",
      type: "benchmark",
      year: 2024,
      domains: ["loco-manipulation"],
      scale: "27 个任务 / 人形全身",
      summary: "面向人形机器人的仿真基准，覆盖行走、平衡、全身操作与移动操作。",
      url: "https://humanoid-bench.github.io/"
    },
    {
      id: "res-locomujoco",
      name: "LocoMuJoCo",
      type: "benchmark",
      year: 2024,
      domains: ["loco-manipulation"],
      scale: "多本体运动 / 模仿学习",
      summary: "面向运动与移动操作的开源模仿学习基准，提供多种本体、任务与统一接口。",
      url: "https://github.com/robfiras/loco-mujoco"
    },
    {
      id: "res-behavior1k",
      name: "BEHAVIOR-1K",
      type: "benchmark",
      year: 2022,
      domains: ["loco-manipulation", "simulation"],
      scale: "1,000 个日常活动",
      summary: "以人类日常活动为中心的全身体具身 benchmark，覆盖家庭场景中的长程任务。",
      url: "https://behavior.stanford.edu/"
    },
    {
      id: "res-partnet-mobility",
      name: "PartNet-Mobility",
      type: "dataset",
      year: 2020,
      domains: ["simulation"],
      scale: "2,000+ 铰接物体",
      summary: "带关节、运动学与语义标注的 3D 物体数据集，是交互式仿真与关节物体操作的标准资产来源；通过 SAPIEN 加载。",
      url: "https://github.com/haosulab/SAPIEN"
    },
    {
      id: "res-maniskill",
      name: "ManiSkill",
      type: "benchmark",
      year: 2023,
      domains: ["simulation"],
      scale: "GPU 并行 / 操作技能",
      summary: "基于 SAPIEN 的 GPU 并行操作仿真与基准，覆盖刚体、关节物体与多种机器人。",
      url: "https://maniskill.ai/"
    },
    {
      id: "res-robocasa",
      name: "RoboCasa",
      type: "benchmark",
      year: 2024,
      domains: ["simulation", "manipulation"],
      scale: "100+ 厨房任务",
      summary: "大规模日常厨房任务仿真与 benchmark，强调场景生成、物体多样性与多任务训练。",
      url: "https://robocasa.ai/",
      entryId: "robocasa"
    },
    {
      id: "res-bridgedata",
      name: "BridgeData V2",
      type: "dataset",
      year: 2023,
      domains: ["data"],
      scale: "60k+ 轨迹 / 24 个环境",
      summary: "面向多任务、多环境的真实操作数据集，覆盖抓取、推拉、堆叠等技能。",
      url: "https://rail-berkeley.github.io/bridgedata/"
    },
    {
      id: "res-rh20t",
      name: "RH20T",
      type: "dataset",
      year: 2023,
      domains: ["data"],
      scale: "110+ 任务 / 多模态",
      summary: "包含视觉、力/触觉、音频与动作的大规模真实操作数据集，覆盖多种机器人与任务。",
      url: "https://rh20t.github.io/"
    },
    {
      id: "res-roboarena",
      name: "RoboArena",
      type: "benchmark",
      year: 2025,
      domains: ["data"],
      scale: "分布式真机盲测",
      summary: "用跨机构双盲成对比较替代固定任务评测，对通用机器人策略进行分布式排名。",
      url: "https://robo-arena.github.io/",
      entryId: "roboarena"
    }
  ];

  const PATHS = [
    {
      id: "navigation-route",
      label: "PATH 01",
      title: "从导航任务开始",
      description: "先分清「找物体」「听指令」「学导航」「与人共处」四类问题，再进入各自的技术路线。",
      duration: "约 60 分钟",
      level: "入门",
      steps: ["objectnav", "nomad", "navgpt", "habitat-3"]
    },
    {
      id: "manipulation-route",
      label: "PATH 02",
      title: "操作路线的四次转向",
      description: "从示教学习出发，看语义泛化、程序化规划与世界-动作模型如何各自回答「下一步做什么」。",
      duration: "约 2 小时",
      level: "进阶",
      steps: ["diffusion-policy", "rt2", "saycan", "worldvla"]
    },
    {
      id: "sim2real-route",
      label: "PATH 03",
      title: "从仿真到真机",
      description: "沿基础设施层走一遍：GPU 仿真、场景任务、Sim2Real，以及把人形高动态技能带回现实。",
      duration: "约 2.5 小时",
      level: "前沿",
      steps: ["isaac-lab", "robocasa", "sim2real", "asap"]
    }
  ];

  const TYPE_LABELS = {
    paper: "论文",
    system: "系统",
    concept: "概念",
    dataset: "数据集",
    benchmark: "基准"
  };

  return { DOMAINS, ENTRIES, PATHS, RESOURCES, TYPE_LABELS };
})();
