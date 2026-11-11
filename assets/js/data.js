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
        "这条研究线从经典 SLAM 与路径规划出发，逐渐分裂出语义目标导航、视觉语言导航、数据驱动的导航基础模型，以及把人当作动态社会性存在的社交导航。它们共享「空间信念」，但对表示、数据和评价的取舍完全不同。",
        "阅读导航研究时，先看目标形式（坐标、类别、语言或社会规范），再看系统是否显式维护地图与历史，最后确认评测是离散图还是连续控制。许多「导航模型」的差异其实来自接口和评测，而不是算法本身。"
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
      related: ["manipulation", "hardware", "control", "data"]
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
        "这棵技术树的分支并不互斥。模仿学习提供可复现的技能采集，强化学习探索人类示教难以覆盖的动态行为，VLA 把语义泛化带进控制，WAM 让模型先预演未来，代码即策略把高层规划变成可检查的程序，而 Harness 负责把这些能力组装成一个稳定运行的系统。",
        "选择路线时，先定位主要瓶颈：是动作数据不够、语义泛化不足、长程规划困难，还是系统集成不可靠？同一篇论文可能同时触碰多条路线，但词条只把它放在最能解释其贡献的位置，其他关联留在文末。"
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
      related: ["navigation", "loco-manipulation", "hardware", "control", "data"]
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
        "这条路线横跨传统全身控制（QP / MPC）、学习式运动先验、人形基础模型与人形 Sim2Real。核心矛盾始终是分层：上层希望用语言和视觉表达意图，下层必须把意图变成满足摩擦、力矩与平衡约束的关节命令。",
        "移动操作的评测尤其容易被拆散：只测走路、只测桌面操作，都无法说明机器人能否一边保持平衡一边完成接触任务。阅读时应关注平台、控制接口与任务耦合程度，而不只是比较某个动作视频。"
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
      related: ["manipulation", "hardware", "control", "simulation"]
    },
    {
      id: "hardware",
      num: "04",
      name: "硬件",
      en: "Hardware",
      short: "HW",
      accent: "#b45309",
      tint: "#fef3c7",
      dark: false,
      feature: false,
      tagline: "身体决定智能能触及的边界",
      description: "灵巧手、机械臂、人形与轮式平台，加上传感器与执行器，构成具身智能的物理身体。",
      question: "怎样的硬件形态、驱动与传感，能让策略在真实世界里既够用又可持续迭代？",
      intro: [
        "硬件不是模型的被动容器。自由度、连杆长度、驱动器带宽、减速比、传感器噪声与结构刚度，决定了策略能看见什么、能施加多大的力、能以多快的频率闭环。",
        "本领域按机器人形态与关键部件划分路线：灵巧手处理多指接触，机械臂提供可达空间与精度，人形机器人把双臂、双腿与躯干放进同一个身体，轮式平台强调稳定移动与载荷，传感器与执行器则是所有平台共同的物理接口。",
        "硬件研究很少被单一 benchmark 概括。评测需要同时看重复定位、负载、带宽、力控能力、可维护性与成本；一个在视频里灵活的动作，可能以极高的硬件磨损或人工维护为代价。"
      ],
      routes: [
        {
          id: "dexterous-hand",
          name: "灵巧手",
          en: "Dexterous Hands",
          summary: "多指、欠驱动或全驱动的手，研究抓取、手内操作、触觉与低成本可复制性。",
          question: "自由度、驱动、传感与成本之间如何取舍，才能让灵巧手真正进入日常实验？",
          tags: ["多指", "欠驱动", "触觉", "开源硬件"]
        },
        {
          id: "robotic-arm",
          name: "机械臂",
          en: "Robotic Arms",
          summary: "串联臂、协作臂与力控臂，关注工作空间、精度、负载与安全交互。",
          question: "当任务从桌面走向开放环境，机械臂的精度、力控与移动能力如何平衡？",
          tags: ["协作臂", "力控", "重复定位", "Franka"]
        },
        {
          id: "humanoid",
          name: "人形机器人",
          en: "Humanoid Robots",
          summary: "双臂、双腿与躯干组成的高维平台，强调拟人形态、平衡与通用操作。",
          question: "人形形态的通用性，是否足以抵消高自由度带来的成本、控制与安全代价？",
          tags: ["双足", "全身自由度", "人形平台"]
        },
        {
          id: "wheeled",
          name: "轮式机器人",
          en: "Wheeled Robots",
          summary: "差速、全向与麦轮平台，强调稳定移动、载荷、导航与低成本部署。",
          question: "在非结构化环境中，轮式底盘的稳定性优势与地形通过性如何折中？",
          tags: ["差速驱动", "全向底盘", "移动平台"]
        },
        {
          id: "sensors-actuators",
          name: "传感器与执行器",
          en: "Sensors & Actuators",
          summary: "编码器、IMU、力矩/触觉传感与准直驱、弹性执行器，是控制闭环的物理接口。",
          question: "高带宽力控与低成本、可靠性之间，执行器和传感应该如何协同设计？",
          tags: ["力矩传感", "准直驱", "IMU", "触觉阵列"]
        }
      ],
      related: ["manipulation", "loco-manipulation", "control", "simulation"]
    },
    {
      id: "control",
      num: "05",
      name: "控制",
      en: "Control",
      short: "CTRL",
      accent: "#2563eb",
      tint: "#dbeafe",
      dark: false,
      feature: false,
      tagline: "让动作稳定、精确、可解释",
      description: "从反馈、最优控制到力/阻抗、学习控制与安全约束，控制层负责把意图变成可执行、可保证的动作。",
      question: "当学习策略进入真实硬件，哪些部分必须由经典控制与安全约束兜底？",
      intro: [
        "控制是具身系统的底层语法。无论上层是 VLA、世界模型还是任务规划，最终都要变成满足执行器限制、接触约束与稳定性要求的控制指令。",
        "本领域沿五条路线展开：反馈与经典控制提供稳定性直觉，最优控制与 MPC 处理预测与约束，力/阻抗控制处理接触，学习控制把数据带进闭环，安全控制则为不可接受的状态提供形式化边界。",
        "控制与学习不是替代关系。一个常见的系统是「学习策略给目标，MPC/阻抗控制器保执行，CBF 或安全滤波器保底线」；真正困难的是接口、时延与故障恢复，而不是单个算法。"
      ],
      routes: [
        {
          id: "feedback",
          name: "反馈与经典控制",
          en: "Feedback & Classical Control",
          summary: "PID、状态反馈、频域分析与稳定性，是理解闭环行为与调试真机的基础。",
          question: "面对非线性、延迟与饱和，经典反馈的稳定性直觉还能延伸到什么程度？",
          tags: ["PID", "状态反馈", "稳定性"]
        },
        {
          id: "optimal-mpc",
          name: "最优控制与 MPC",
          en: "Optimal Control & MPC",
          summary: "LQR、轨迹优化与模型预测控制，在约束下滚动求解未来一段时间的动作。",
          question: "模型误差与计算延迟，如何影响 MPC 在真实机器人上的可用性？",
          tags: ["LQR", "MPC", "轨迹优化"]
        },
        {
          id: "force-impedance",
          name: "力控与阻抗控制",
          en: "Force & Impedance Control",
          summary: "把位置、速度与接触力放进统一阻抗/导纳关系，处理接触丰富任务。",
          question: "在不确定环境中，机器人应该多「硬」地跟踪位置，又多「软」地顺应接触？",
          tags: ["阻抗控制", "导纳控制", "力传感"]
        },
        {
          id: "learning-control",
          name: "学习控制",
          en: "Learning-Based Control",
          summary: "用数据学习反馈策略、残差或自适应控制器，同时保留闭环稳定性分析。",
          question: "学习控制器如何从「实验成功」走向可验证的稳定性与泛化保证？",
          tags: ["神经反馈", "自适应控制", "残差控制"]
        },
        {
          id: "safety",
          name: "安全控制与约束",
          en: "Safety Control & Constraints",
          summary: "用控制障碍函数、可达性分析与安全滤波器限制不可接受状态。",
          question: "学习策略不可解释时，安全层如何在不牺牲全部性能的前提下提供硬约束？",
          tags: ["CBF", "安全滤波", "可达性"]
        }
      ],
      related: ["hardware", "manipulation", "loco-manipulation", "simulation"]
    },
    {
      id: "simulation",
      num: "06",
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
        "但仿真不是免费午餐。视觉逼真不等于物理正确，物理正确也不等于任务分布正确。一条完整的仿真技术栈至少包含物理引擎、场景与任务、Real2Sim 重建，以及最后的 Sim2Real 迁移。",
        "仿真器本身也有产品化问题：资产格式、传感器模型、并行环境接口、许可与维护成本都会影响研究可复现性。评估一个仿真平台，不能只看它能不能跑一个 demo，而要看它能否支撑一套可检验的实验流程。"
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
      related: ["navigation", "loco-manipulation", "hardware", "control", "data"]
    },
    {
      id: "data",
      num: "07",
      name: "数据与评测",
      en: "Data & Evaluation",
      short: "DATA",
      accent: "#7a5cff",
      tint: "#eae5ff",
      dark: false,
      feature: false,
      tagline: "没有可信的数据，就没有可信的评测",
      description: "从真机遥操、UMI 手持采集到 EGO 第一人称人类视频，数据层决定机器人能学到什么、能证明什么。",
      question: "在动作、视角、本体与任务分布都不一致的现实里，哪些数据应当被放在一起训练，哪些差异必须被保留？",
      intro: [
        "数据不是「更多轨迹」的同义词。一条真机遥操轨迹包含准确的本体动作、相机标定、时间同步与真实接触；一段 EGO 视频则包含极丰富的人类手部操作，却缺少可直接执行的机器人动作；UMI 数据用手持夹爪把真实场景中的操作意图转成可映射的末端轨迹，但同样缺失部分力与触觉信息。",
        "本领域按采集接口划分路线，而不是按「是否跨本体」划分。跨机构、跨机器人本体是数据的属性，不是一种独立的数据来源：DROID、Open X-Embodiment 本质上仍是真机遥操数据，只是采集规模与异构性更大。UMI 与 EGO 则分别代表手持接口和人类第一人称视角这两类不同的具身数据。",
        "采集之后还有数据引擎与评测：合成、扩增、重放与去重决定训练分布，benchmark 与真机盲测决定这些数据是否真的转化成了能力。"
      ],
      routes: [
        {
          id: "teleop",
          name: "真机遥操数据",
          en: "Robot Teleoperation Data",
          summary: "人通过 VR、主从臂或动作捕捉操控真实机器人，记录带本体动作、相机与接触的真实轨迹。",
          question: "如何降低采集成本、提高场景多样性，并让不同机构的数据仍然可被比较和复用？",
          tags: ["VR / 主从遥操", "DROID", "Open X"]
        },
        {
          id: "umi",
          name: "UMI 数据",
          en: "Handheld UMI Data",
          summary: "用手持夹爪与腕部相机在真实场景中采集操作，再把相对末端轨迹映射到不同机器人。",
          question: "当采集设备不是机器人，如何保留足够的几何、动作与接触信息，使策略仍能迁移到真机？",
          tags: ["UMI", "DexUMI", "手持采集"]
        },
        {
          id: "ego",
          name: "EGO 数据",
          en: "Egocentric Human Data",
          summary: "用第一人称人类视频、手部追踪与动作重定向学习操作，规模巨大但存在 embodiment gap。",
          question: "人类第一人称视频如何从「看人类做事」变成「机器人可执行的动作监督」？",
          tags: ["Ego4D", "EgoDex", "人类视频"]
        },
        {
          id: "engine-eval",
          name: "数据引擎与评测",
          en: "Data Engines & Evaluation",
          summary: "不是一类采集来源，而是把已有数据放大、筛选并证明其有效性的横切基础设施：合成/扩增数据、固定基准与真机盲测。",
          question: "数据规模、任务覆盖与评测可信度之间，如何避免用同一个偏差自我证明？",
          tags: ["MimicGen", "LIBERO", "横切基础设施"]
        }
      ],
      related: ["manipulation", "navigation", "hardware", "control", "simulation"]
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
      related: ["rt2", "diffusion-policy", "octo"],
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
      related: ["openvla", "pi0", "pi05"],
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
      id: "pi05",
      domain: "manipulation",
      route: "vla",
      type: "paper",
      title: "π0.5",
      subtitle: "面向开放世界泛化的视觉-语言-动作模型",
      year: 2025,
      venue: "arXiv 2025",
      org: "Physical Intelligence",
      authors: "Kevin Black, Noah Brown 等",
      featured: false,
      tags: ["开放世界", "异构任务共训", "语义子任务", "长程操作"],
      tldr: "在 π0 基础上，把多种机器人数据、网页数据、目标检测与语义子任务预测混合共训，让单个 VLA 能在未见过的家庭中完成清理厨房、整理卧室等长程任务。",
      why: "它把开放世界泛化从「同一实验室的新物体」推进到「全新的真实住宅」，说明异构任务共训与语义子任务是 VLA 走向通用操作的关键。",
      intro: [
        "π0.5 沿用 π0 的连续动作生成骨干，但把训练数据从单一操作轨迹扩展为异构任务混合：不同机器人、不同任务、网页图文、目标检测、语义子任务标签以及低层动作都可以进入同一训练目标。",
        "部署时，模型可以在新家庭中理解「清理厨房」这类高层目标，先预测语义子任务，再输出连续动作。论文展示了端到端系统在未见住宅中的长程清理能力，也暴露出数据配方与评测规模仍是核心变量。"
      ],
      method: [
        { title: "异构任务共训", text: "混合多机器人操作数据、网页数据与视觉语言任务，提升语义和场景泛化。" },
        { title: "混合多模态目标", text: "同一训练序列同时包含图像、语言、物体检测、语义子任务预测与低层动作。" },
        { title: "语义子任务引导", text: "模型先预测下一步子任务，再生成对应的连续动作块，把长程任务拆成可执行阶段。" }
      ],
      evidence: [
        { value: "New homes", label: "未见真实住宅", text: "在全新的家庭环境中执行清理厨房、卧室等长程灵巧操作任务。" },
        { value: "Co-training", label: "异构共训是泛化关键", text: "论文强调多源数据、语义子任务与动作监督的混合对开放世界迁移至关重要。" }
      ],
      limits: [
        "训练数据、完整配方与权重未公开，外部难以独立复现。",
        "真实住宅评测仍以有限任务与场景为主，长期可靠性未知。",
        "语义子任务预测错误会向下游动作传播，安全与恢复仍需系统层保障。"
      ],
      related: ["pi0", "openvla", "rt2"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2504.16054" }
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
      route: "umi",
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
        "GR00T N1 的结构和 π0 等双系统 VLA 有相似之处：慢系统理解场景与指令，快系统生成动作。不同点在于它明确面向人形机器人，并把 Isaac 仿真、合成数据、真实遥操作数据组织成「数据金字塔」。",
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
      related: ["pi0", "pi05", "wbc", "isaac-lab"],
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
      route: "teleop",
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
      route: "engine-eval",
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
      route: "teleop",
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
      related: ["world-model", "pi05", "genie-3"],
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
      related: ["code-as-policies", "saycan", "rt2"],
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
      related: ["saycan", "code-as-policies", "pi0"],
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
      route: "engine-eval",
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
      route: "engine-eval",
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
    },
    {
      id: "mobile-aloha",
      domain: "data",
      route: "teleop",
      type: "system",
      title: "Mobile ALOHA",
      subtitle: "低成本全身遥操作与双臂移动操作数据",
      year: 2024,
      venue: "CoRL 2024",
      org: "Stanford University",
      authors: "Zipeng Fu, Tony Z. Zhao, Chelsea Finn",
      featured: false,
      tags: ["移动遥操作", "双臂", "数据采集", "全身控制"],
      tldr: "把低成本双臂 ALOHA 装到移动底座上，用全身遥操作采集移动操作数据；再与已有静态 ALOHA 数据联合训练，让机器人在移动中完成长程双臂任务。",
      why: "它把「数据采集硬件」和「策略学习」放进同一个系统，证明移动操作的数据可以靠可复制的遥操作平台积累。",
      intro: [
        "移动操作的数据比桌面操作更难采：机器人必须同时控制底座、躯干、双臂和夹爪，操作者还要在移动过程中保持对场景的感知。Mobile ALOHA 用一套低成本的全身遥操作方案解决采集问题，操作者通过主从臂和移动底座控制机器人。",
        "论文的关键不是单任务策略，而是数据配方：先用移动遥操作数据教机器人移动操作，再与大量静态 ALOHA 数据联合训练，让策略保留通用的双臂操作技能。这种「先采、再合、后学」的流程比单纯增加模型参数更贴近真实数据瓶颈。"
      ],
      method: [
        { title: "移动双臂硬件", text: "在移动底座上搭建低成本双臂与躯干，支持移动中的双手操作。" },
        { title: "全身遥操作", text: "操作者同步控制底座、躯干、双臂和夹爪，记录完整全身动作与多视角观测。" },
        { title: "联合训练", text: "把移动遥操作数据与静态 ALOHA 数据混合训练，兼顾移动能力与通用操作技能。" }
      ],
      evidence: [
        { value: "Mobile", label: "在移动中完成双臂任务", text: "展示了烹饪、电梯、收纳等需要移动与双手协作的长程任务。" },
        { value: "Co-train", label: "移动数据 + 静态数据", text: "联合训练显著提升移动操作策略的泛化与稳定性。" }
      ],
      limits: [
        "遥操作采集速度慢，数据规模仍受操作者与硬件数量限制。",
        "低成本硬件在负载、精度和耐久性上无法覆盖工业级任务。",
        "移动底座与机械臂的协调控制仍依赖任务特定工程。"
      ],
      related: ["act-aloha", "umi", "droid"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2401.02117" },
        { label: "项目页", url: "https://mobile-aloha.github.io/" }
      ]
    },
    {
      id: "dexumi",
      domain: "data",
      route: "umi",
      type: "system",
      title: "DexUMI",
      subtitle: "把人的手变成灵巧操作的通用采集接口",
      year: 2025,
      venue: "arXiv 2025",
      org: "Columbia University 等",
      authors: "Mengda Xu, Han Zhang 等",
      featured: false,
      tags: ["灵巧手", "UMI", "外骨骼", "数据采集"],
      tldr: "在 UMI 的手持接口上加入可穿戴手部外骨骼，把人的手指动作映射到不同灵巧手；再用机器人手 inpaint 替换视频中的人手，缩小视觉与运动学上的 embodiment gap。",
      why: "它把 UMI 从平行夹爪扩展到灵巧手，说明「人手采集 + 机器人重定向」可以成为灵巧操作的数据接口。",
      intro: [
        "UMI 的核心是让人手持一个与机器人夹爪对齐的采集器，在真实环境中操作。但灵巧手有更多自由度，人的手指也无法直接映射到机器人手。DexUMI 用外骨骼记录并约束人的手指动作，使采集到的轨迹在目标机器人手上物理可行。",
        "仅有运动学对齐还不够：视频里出现的是人手，策略看到的是机器人手。DexUMI 用高保真机器人手 inpaint 替换人手，让视觉观测与部署时的机器人形态一致，从而降低视觉域差距。"
      ],
      method: [
        { title: "可穿戴手部外骨骼", text: "记录人手指运动并施加触觉反馈，同时把动作约束到机器人手的可达空间。" },
        { title: "运动学重定向", text: "把人手关节映射到不同灵巧手的自由度，生成可执行的机器人动作。" },
        { title: "视觉域替换", text: "用机器人手 inpaint 替换视频中的人手，缩小训练与部署的视觉差异。" }
      ],
      evidence: [
        { value: "86%", label: "平均任务成功率", text: "在两种灵巧手硬件、多个真实操作任务上的平均成功率。" },
        { value: "2", label: "机器人手平台", text: "验证了同一采集框架可迁移到不同灵巧手。" }
      ],
      limits: [
        "外骨骼增加采集负担，长时间使用舒适性有限。",
        "触觉与力反馈仍不完整，接触丰富任务仍可能失真。",
        "机器人手 inpaint 的视觉伪影会引入新的分布偏差。"
      ],
      related: ["umi", "mobile-aloha", "act-aloha"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2505.21864" }
      ]
    },
    {
      id: "egomimic",
      domain: "data",
      route: "ego",
      type: "paper",
      title: "EgoMimic",
      subtitle: "用第一人称人类视频扩展模仿学习",
      year: 2024,
      venue: "arXiv 2024",
      org: "Georgia Tech · NVIDIA 等",
      authors: "Simar Kareer, Dhruv Patel 等",
      featured: false,
      tags: ["EGO", "Project Aria", "手部追踪", "跨域对齐"],
      tldr: "用 Project Aria 眼镜采集第一人称视频与 3D 手部追踪，把人手动作与机器人动作对齐后联合训练一个模仿学习策略。",
      why: "它把人类第一人称数据当作与机器人数据平等的「具身示教」，而不是只提取高层意图，为 EGO 数据规模化提供了完整系统。",
      intro: [
        "人类每天用手完成大量操作，但这些操作视频没有机器人动作标签。EgoMimic 用可穿戴眼镜记录第一人称视角与手部三维姿态，再通过硬件与数据对齐，把人的手部轨迹映射到低成本双臂机器人上。",
        "与传统「从人类视频推断意图」不同，EgoMimic 训练一个统一策略，同时吃人类手部数据和机器人遥操作数据。论文报告了有利的 scaling 趋势：增加一小时人类手部数据的价值，显著高于增加一小时机器人数据。"
      ],
      method: [
        { title: "可穿戴采集", text: "用 Project Aria 记录第一人称视频、头部位姿与手部关节追踪。" },
        { title: "硬件对齐", text: "设计低成本双臂机器人，缩小人手与机器人夹爪之间的运动学差距。" },
        { title: "跨域联合训练", text: "对齐人类与机器人数据的时间、视角和动作表示，训练统一模仿学习策略。" }
      ],
      evidence: [
        { value: "1h", label: "人类数据 vs 机器人数据", text: "多一小时人类手部数据的收益显著高于多一小时机器人数据。" },
        { value: "Long-horizon", label: "单臂与双臂任务", text: "在多种长程操作任务上优于已有模仿学习基线，并能泛化到新场景。" }
      ],
      limits: [
        "人类手部与机器人夹爪的形态差异仍会产生重定向误差。",
        "第一人称视角与机器人相机视角不完全一致。",
        "数据依赖专用眼镜和手部追踪流程，采集并非完全无成本。"
      ],
      related: ["egodex", "egovla", "umi"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2410.24221" },
        { label: "项目页", url: "https://egomimic.github.io/" }
      ]
    },
    {
      id: "egodex",
      domain: "data",
      route: "ego",
      type: "dataset",
      title: "EgoDex",
      subtitle: "大规模第一人称灵巧操作数据集",
      year: 2025,
      venue: "ICLR 2026 · arXiv 2025",
      org: "Apple",
      authors: "Ryan Hoque, Peide Huang 等",
      featured: true,
      tags: ["EGO", "灵巧手", "3D 手部追踪", "Apple Vision Pro"],
      tldr: "用 Apple Vision Pro 采集 829 小时第一人称视频，记录双手每根手指的 3D 关节轨迹，覆盖 194 个桌面日常任务，并提供手部轨迹预测的 benchmark。",
      why: "它把 EGO 数据从「有视频、没动作」推进到「有高精度手指动作」的大规模数据集，是灵巧操作模仿学习的重要数据底座。",
      intro: [
        "EgoDex 针对的是灵巧操作的数据稀缺：互联网第一人称视频很多，但缺少精确的手部动作标注，而且大多不是桌面操作。EgoDex 用 Vision Pro 在采集时同步追踪双手所有关节，避免了事后从视频估计手部姿态的误差。",
        "数据覆盖系鞋带、叠衣服、整理物品等 194 个桌面任务，并包含多相机标定与 SLAM 位姿。论文还训练手部轨迹预测策略，提出评估指标与 benchmark，让「从 EGO 视频学习灵巧操作」成为可比较的研究问题。"
      ],
      method: [
        { title: "头显内采集", text: "使用 Apple Vision Pro 在记录第一人称视频的同时追踪双手关节与头部位姿。" },
        { title: "多视角与 SLAM", text: "多个校准相机与设备端 SLAM 提供精确的三维手部与场景几何。" },
        { title: "任务与基准", text: "194 个桌面任务；定义手部轨迹预测指标并训练基准策略。" }
      ],
      evidence: [
        { value: "829h", label: "第一人称视频", text: "目前规模最大的灵巧人类操作视频数据集之一。" },
        { value: "194", label: "桌面任务", text: "覆盖日常物体、长程灵巧操作与多样场景。" }
      ],
      limits: [
        "采集自人类手部而非机器人，仍需 retargeting 与视觉适配。",
        "任务集中在桌面，不覆盖移动操作与全身运动。",
        "数据规模大但任务与物体分布仍有采集机构偏差。"
      ],
      related: ["egomimic", "egovla", "dexumi"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2505.11709" },
        { label: "数据与代码", url: "https://github.com/apple/ml-egodex" }
      ]
    },
    {
      id: "egovla",
      domain: "data",
      route: "ego",
      type: "paper",
      title: "EgoVLA",
      subtitle: "从第一人称人类视频学习视觉-语言-动作模型",
      year: 2025,
      venue: "arXiv 2025",
      org: "UC San Diego · MIT · NVIDIA 等",
      authors: "Ruihan Yang, Qinxi Yu 等",
      featured: false,
      tags: ["EGO", "VLA", "动作重定向", "人形基准"],
      tldr: "在人类第一人称视频上训练 VLA 预测手腕与手指动作，再通过逆运动学与重定向转换成机器人动作，并用少量机器人示教微调。",
      why: "它把 EGO 数据直接接入 VLA 训练，让视频里的「人怎么用手」成为机器人动作监督，而不是只做视觉预训练。",
      intro: [
        "EgoVLA 的关键问题是动作空间：人类视频中只有手和手腕的运动，没有机器人关节命令。模型先学习预测人类手腕与手指动作，再通过逆运动学和 retargeting 映射到目标机器人；最后用少量机器人示教微调，完成从人到机器人的动作迁移。",
        "论文还提出 Ego Humanoid Manipulation Benchmark，包含多种双臂操作任务与示范，用于测量人类视频预训练究竟带来了多少增益。它把「EGO 数据能否改善 VLA」变成一个可复现的实验问题。"
      ],
      method: [
        { title: "人类动作预训练", text: "用第一人称视频训练 VLA，预测手腕位姿与手指动作。" },
        { title: "IK / Retargeting", text: "把人类动作转换为目标机器人的关节或末端执行器命令。" },
        { title: "机器人微调", text: "用少量真机示教把通用人类动作先验适配到具体本体。" }
      ],
      evidence: [
        { value: "EGO→Robot", label: "人类视频转机器人动作", text: "通过逆运动学与重定向把人类手腕/手部预测落到机器人执行。" },
        { value: "Benchmark", label: "Ego Humanoid Manipulation", text: "提供双臂人形操作任务与示范，检验人类数据预训练的迁移效果。" }
      ],
      limits: [
        "重定向依赖精确的相机与手部姿态估计，误差会传导到控制。",
        "人类手与机器人手/夹爪的自由度差异导致动作失真。",
        "真实机器人验证仍受任务与本体数量限制。"
      ],
      related: ["egomimic", "egodex", "openvla"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2507.12440" },
        { label: "项目页", url: "https://rchalyang.github.io/EgoVLA" }
      ]
    },
    {
      id: "leap-hand",
      domain: "hardware",
      route: "dexterous-hand",
      type: "system",
      title: "LEAP Hand",
      subtitle: "低成本、拟人化的开源灵巧手",
      year: 2023,
      venue: "arXiv 2023",
      org: "Carnegie Mellon University",
      authors: "Kenneth Shaw, Ananye Agarwal 等",
      featured: false,
      tags: ["16 DoF", "开源硬件", "低成本", "灵巧操作"],
      tldr: "用 3D 打印结构、低成本舵机与模块化设计做出 16 自由度拟人灵巧手，并提供仿真模型与遥操作接口，让灵巧操作研究不必依赖昂贵的商业手。",
      why: "它把灵巧手从少数实验室的专用设备变成可复制、可维修的研究平台；低成本意味着可以并行部署多只手、采集更多数据。",
      intro: [
        "灵巧手长期面临一个现实矛盾：自由度越高，结构、驱动、传感与维护成本越难控制。LEAP Hand 选择 16 个自由度、模块化手指与低成本舵机，在拟人形态和可制造性之间取平衡。",
        "它不只提供硬件，还提供 MuJoCo 模型、ROS 接口与遥操作示例，使研究者可以把手指动作、触觉扩展和策略学习放在同一套平台上迭代。低成本也意味着手可以被视为可替换的耗材，而不是只能小心保护的展品。"
      ],
      method: [
        { title: "模块化 16 自由度", text: "每根手指由独立模块组成，覆盖拟人抓取与手内操作所需的主要自由度。" },
        { title: "低成本驱动", text: "使用可替换的低成本舵机与 3D 打印结构，降低制造、维修和多手部署门槛。" },
        { title: "仿真与接口", text: "提供 MuJoCo 模型、ROS 驱动与遥操作接口，支持从仿真到真机的策略迁移。" }
      ],
      evidence: [
        { value: "16 DoF", label: "拟人自由度", text: "覆盖多指抓取与手内操作，同时保持结构与驱动可维护。" },
        { value: "Open", label: "可复制硬件", text: "结构、驱动与软件开放，适合实验室批量部署与二次改造。" }
      ],
      limits: [
        "低成本舵机在力矩、带宽、背隙与耐久性上无法与高端商业手相比。",
        "标准版缺少高密度触觉阵列，接触丰富任务的力感知仍有限。",
        "开源硬件的制造质量依赖打印与装配，不同批次的重复性需要标定。"
      ],
      related: ["dexumi", "unitree-g1", "franka-research"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2309.06440" },
        { label: "项目页", url: "https://leap-hand.github.io/" }
      ]
    },
    {
      id: "franka-research",
      domain: "hardware",
      route: "robotic-arm",
      type: "system",
      title: "Franka Research 3",
      subtitle: "7 自由度力控协作机械臂",
      year: 2023,
      venue: "系统平台",
      org: "Franka Robotics",
      authors: "Franka Robotics",
      featured: false,
      tags: ["7 DoF", "关节力矩传感", "1 kHz", "协作臂"],
      tldr: "7 自由度协作机械臂，每个关节带力矩传感，支持 1 kHz 控制与力/阻抗交互，是机器人学习与操作研究中常见的研究级平台。",
      why: "它把力控、柔顺交互与开放的实时控制接口带进实验室，成为大量 VLA、模仿学习与力控工作共同使用的硬件基线。",
      intro: [
        "Franka Research 3 的核心不是外形，而是每个关节的力矩传感与高频控制接口。研究者可以直接做力矩控制、阻抗控制和接触实验，而不必只把机械臂当作位置执行器。",
        "它的 7 自由度冗余结构让末端在执行任务时仍能调整姿态与避障。对学习研究而言，这意味着动作空间、力反馈与安全限制都比简单的 6 轴位置臂更丰富，但也要求更认真的运动学与动力学建模。"
      ],
      method: [
        { title: "关节力矩传感", text: "每个关节提供力矩测量，使力控、碰撞检测与柔顺交互可以在低层闭环中实现。" },
        { title: "1 kHz 实时接口", text: "提供高频控制与状态读取接口，适合 MPC、阻抗控制与学习控制实验。" },
        { title: "7 自由度冗余", text: "冗余自由度让机械臂在保持末端位姿的同时调整肘部与避障姿态。" }
      ],
      evidence: [
        { value: "7 DoF", label: "冗余协作臂", text: "适合桌面操作、接触任务与需要姿态调整的复杂场景。" },
        { value: "1 kHz", label: "实时控制", text: "为低层力控与高频策略提供比普通位置接口更细的时间粒度。" }
      ],
      limits: [
        "价格与维护成本高，难以像低成本平台一样大规模并行部署。",
        "负载与工作空间有限，不适合重型或超大范围任务。",
        "开放低层控制也意味着安全责任增加，必须配置碰撞、力矩与急停限制。"
      ],
      related: ["leap-hand", "act-aloha", "pi0"],
      links: [
        { label: "官方页", url: "https://franka.de/" }
      ]
    },
    {
      id: "unitree-g1",
      domain: "hardware",
      route: "humanoid",
      type: "system",
      title: "Unitree G1",
      subtitle: "23–43 自由度的人形机器人平台",
      year: 2024,
      venue: "系统平台",
      org: "Unitree Robotics",
      authors: "Unitree Robotics",
      featured: false,
      tags: ["人形", "23–43 DoF", "低成本", "IMU / 深度相机"],
      tldr: "约 35kg、23–43 自由度的人形机器人平台，配备深度相机、3D LiDAR、IMU 与可选的力控三指手，降低了人形全身控制与移动操作研究的前期硬件门槛。",
      why: "在 Atlas、Figure 等高端平台之外，G1 提供了一个相对可负担、可二次开发的人形本体，使更多实验室能研究全身运动、遥操作与学习策略。",
      intro: [
        "G1 的关键定位是「可进入实验室的人形平台」。它提供双足、双臂与躯干的高维关节空间，同时保留深度相机、LiDAR、IMU、麦克风与 Wi-Fi 等感知与计算接口。",
        "对具身智能研究而言，G1 的价值在于把高维身体、真实动力学与相对低的采购门槛放在一起。它仍然需要认真的安全配置、关节标定与底层控制栈，不能被当作开箱即用的通用机器人。"
      ],
      method: [
        { title: "高维人形本体", text: "标准版 23 自由度、EDU 版 23–43 自由度，覆盖双腿、双臂、腰部与可选手部。" },
        { title: "多模态感知", text: "集成深度相机、3D LiDAR、IMU、麦克风与扬声器，为感知和交互提供基础传感器。" },
        { title: "二次开发接口", text: "提供关节控制、状态读取与二次开发接口，可接入 RL、遥操作或全身控制栈。" }
      ],
      evidence: [
        { value: "23–43", label: "自由度范围", text: "从基础双足双臂到带灵巧手与额外腰/腕自由度的配置。" },
        { value: "35kg", label: "整机重量", text: "在可搬运、可实验的尺度内提供人形全身动力学。" }
      ],
      limits: [
        "低成本人形平台的关节寿命、散热与结构刚度需要长期维护与监测。",
        "高动态动作存在摔倒与人身风险，必须配置安全绳、限位与急停。",
        "硬件规格不等于控制能力；底层状态估计、WBC 与安全层仍需自行搭建。"
      ],
      related: ["asap", "groot-n1", "leap-hand"],
      links: [
        { label: "官方页", url: "https://www.unitree.com/g1/" }
      ]
    },
    {
      id: "turtlebot4",
      domain: "hardware",
      route: "wheeled",
      type: "system",
      title: "TurtleBot 4",
      subtitle: "ROS 2 教育与研究轮式平台",
      year: 2022,
      venue: "系统平台",
      org: "Clearpath Robotics · Open Robotics",
      authors: "Clearpath Robotics · Open Robotics",
      featured: false,
      tags: ["差速驱动", "ROS 2", "2D LiDAR", "OAK-D"],
      tldr: "基于 iRobot Create 3 底盘、树莓派 4、2D LiDAR 与 OAK-D 相机的 ROS 2 轮式平台，提供开箱即用的导航、建图与教学接口。",
      why: "它代表了「稳定、低成本、软件生态完整」的轮式研究路线：不追求地形通过性，而是把室内导航、感知与 ROS 2 工程实践变成可复制的基础设施。",
      intro: [
        "TurtleBot 4 是面向教育与研究的轮式平台，而不是高性能野外机器人。差速底盘提供稳定的平面运动，2D LiDAR 与深度相机覆盖室内建图、定位与视觉感知，ROS 2 生态则降低了软件集成成本。",
        "它的优势在于可复现：同一套硬件与 ROS 2 接口可以让课程、实验与论文共享代码。局限也同样明确：室内平面、载荷有限，无法直接代表腿足或复杂非结构化环境。"
      ],
      method: [
        { title: "差速移动底盘", text: "基于 Create 3 的差速驱动，适合室内平面导航、建图与轨迹跟踪。" },
        { title: "感知与计算", text: "2D LiDAR、OAK-D 相机与树莓派 4 提供定位、视觉与机载计算基础。" },
        { title: "ROS 2 软件栈", text: "官方提供 ROS 2 驱动、仿真、导航教程与多机支持，便于教学和复现。" }
      ],
      evidence: [
        { value: "ROS 2", label: "完整软件生态", text: "导航、建图、仿真与多机器人示例可直接复用。" },
        { value: "Indoor", label: "室内轮式平台", text: "稳定、低维护，适合作为导航与感知研究的基线本体。" }
      ],
      limits: [
        "差速底盘无法跨越台阶、楼梯或复杂非结构化地形。",
        "载荷与续航有限，难以承载大型机械臂或高功耗计算设备。",
        "低成本轮式平台缺少高带宽力控与高精度关节执行器，不适合精细接触任务。"
      ],
      related: ["mobile-aloha", "habitat-3", "droid"],
      links: [
        { label: "用户手册", url: "https://turtlebot.github.io/turtlebot4-user-manual/" }
      ]
    },
    {
      id: "odri-actuator",
      domain: "hardware",
      route: "sensors-actuators",
      type: "system",
      title: "Open Dynamic Robot Initiative",
      subtitle: "开源力矩控制执行器与腿足平台",
      year: 2020,
      venue: "IEEE RA-L 2020",
      org: "MPI-IS · NYU · LAAS-CNRS",
      authors: "Felix Grimminger, Avadesh Meduri 等",
      featured: false,
      tags: ["准直驱", "开源硬件", "力矩控制", "模块化"],
      tldr: "用低成本无刷电机、低减速比传动与开源硬件做出模块化力矩控制执行器，并组装成 Solo 四足、TriFinger 等腿足与操作平台。",
      why: "它展示了执行器、控制与开源硬件的协同设计：高带宽力控不一定依赖昂贵工业伺服，合理的电机、减速比与驱动设计可以把成本降下来。",
      intro: [
        "ODRI 的出发点是腿足机器人研究需要高带宽、可反驱、可力矩控制的执行器，而商业方案往往昂贵且封闭。项目把无刷电机、低减速比传动、电机驱动与实时通信做成可复制的模块。",
        "同一执行器模块可以组装成单腿、四足 Solo、TriFinger 操作平台等不同形态，硬件与控制软件一起开源。这种「执行器即积木」的思路，对实验室自建平台和教学非常有价值。"
      ],
      method: [
        { title: "模块化执行器", text: "无刷电机 + 低减速比传动 + 电机驱动板，强调可反驱与力矩控制。" },
        { title: "开源机械与电子", text: "结构图纸、电子设计与固件开放，便于复制、维修和改造。" },
        { title: "跨形态复用", text: "同一执行器模块用于四足、单腿与多指操作平台，共享控制与软件栈。" }
      ],
      evidence: [
        { value: "Solo", label: "开源四足平台", text: "基于该执行器构建的四足机器人被用于运动与力矩控制研究。" },
        { value: "TriFinger", label: "多指操作平台", text: "执行器模块也被用于三指操作与真实世界强化学习实验。" }
      ],
      limits: [
        "低减速比执行器对控制带宽与传感精度要求高，调试门槛不低。",
        "开源硬件的制造与装配质量依赖实验室能力，批次一致性需要管理。",
        "模块化平台适合研究原型，不等于经过认证的产品级硬件。"
      ],
      related: ["asap", "groot-n1", "unitree-g1"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/1910.00093" },
        { label: "项目页", url: "https://open-dynamic-robot-initiative.github.io/" }
      ]
    },
    {
      id: "pid-control",
      domain: "control",
      route: "feedback",
      type: "concept",
      title: "PID 控制",
      subtitle: "误差反馈的工程基线",
      year: 1922,
      venue: "经典控制",
      org: "控制理论",
      authors: "Nicolas Minorsky 等",
      featured: false,
      tags: ["反馈", "比例积分微分", "稳定性", "工程基线"],
      tldr: "用误差的比例、积分与微分项构成反馈，在不依赖精确模型的情况下稳定大量实际系统；它也是理解延迟、饱和与振荡的入口。",
      why: "几乎所有真实机器人底层都有 PID 或类似反馈。理解它，才能判断一个问题来自策略、模型还是低层跟踪。",
      intro: [
        "PID 把当前误差、累计误差与误差变化率组合成控制量。比例项提供即时纠正，积分项消除稳态误差，微分项抑制过冲；三者的取舍取决于对象惯性、延迟、噪声与执行器饱和。",
        "它并不「过时」。在高层学习策略与低层执行器之间，PID/PD 仍是最常见的跟踪层。真正的工程难点是限幅、抗积分饱和、滤波与增益调度，而不是公式本身。"
      ],
      method: [
        { title: "比例项", text: "按当前误差成比例输出纠正量，增益过大容易振荡，过小则响应迟缓。" },
        { title: "积分项", text: "累计历史误差以消除稳态偏差，但需要抗饱和与条件积分防止积分爆炸。" },
        { title: "微分项", text: "对误差变化率作出反应以抑制过冲，通常需要低通滤波避免放大噪声。" }
      ],
      evidence: [
        { value: "工业基线", label: "长期广泛使用", text: "从电机调速到温度、压力与位置控制，PID 是最普遍的闭环控制器之一。" },
        { value: "可解释", label: "调参直觉明确", text: "增益与响应、超调、稳态误差之间的关系可以被实验直接观察。" }
      ],
      limits: [
        "强非线性、强耦合与大延迟系统仅靠固定增益 PID 难以稳定。",
        "积分饱和、噪声放大与执行器限幅需要额外工程处理。",
        "PID 不显式处理约束与多变量耦合，复杂任务通常需要 MPC、阻抗或学习控制。"
      ],
      related: ["mpc-control", "impedance-control", "safety-cbf"],
      links: [
        { label: "教材", url: "https://fbswiki.org/wiki/index.php/Main_Page" }
      ]
    },
    {
      id: "mpc-control",
      domain: "control",
      route: "optimal-mpc",
      type: "concept",
      title: "模型预测控制（MPC）",
      subtitle: "在约束下滚动优化未来动作",
      year: 1970,
      venue: "最优控制",
      org: "控制理论 / 工业控制",
      authors: "工业控制社区",
      featured: false,
      tags: ["滚动时域", "约束", "LQR", "轨迹优化"],
      tldr: "用系统模型预测未来一段时间的状态，在输入、状态与接触约束下求解最优控制序列，只执行第一步，然后滚动重算。",
      why: "MPC 把「预测、约束与优化」放进同一个在线问题，是连接学习意图与物理可行执行的重要中间层。",
      intro: [
        "MPC 在每个控制周期求解一个有限时域优化问题：给定当前状态、模型与约束，找一条未来控制序列，使代价最小。只执行序列的第一项，下一周期用新状态重新求解。",
        "它的优势是显式处理约束与多步预测，适合接触、避障与执行器限幅；代价是模型误差、求解时间与非凸接触让实时性成为核心挑战。LQR/iLQR 可以看作其线性/轨迹优化特例。"
      ],
      method: [
        { title: "预测模型", text: "用线性或非线性动力学预测未来状态；模型误差会直接影响约束满足与控制质量。" },
        { title: "滚动时域", text: "只执行第一步并持续重算，用反馈抵消部分模型误差与扰动。" },
        { title: "约束优化", text: "把力矩、关节限位、避障与接触条件写成约束，在可行域内最小化任务代价。" }
      ],
      evidence: [
        { value: "约束", label: "显式物理边界", text: "MPC 的能量在于把安全与执行器限制直接写进优化问题。" },
        { value: "Rolling", label: "闭环重规划", text: "滚动执行第一步，使控制器对扰动与模型误差保持一定鲁棒性。" }
      ],
      limits: [
        "非线性 MPC 求解成本高，实时性受硬件、时域长度与接触模型影响。",
        "模型不准时，约束可能在真实系统中被违反，需要鲁棒或学习补偿。",
        "非凸接触与混合动力学仍是开放问题，接触丰富任务很难只靠标准 MPC。"
      ],
      related: ["pid-control", "impedance-control", "neural-fly"],
      links: [
        { label: "教材章节", url: "https://underactuated.mit.edu/mpc.html" }
      ]
    },
    {
      id: "impedance-control",
      domain: "control",
      route: "force-impedance",
      type: "concept",
      title: "阻抗控制",
      subtitle: "把位置与接触力放进同一个动态关系",
      year: 1985,
      venue: "ASME JDSMC 1985",
      org: "MIT",
      authors: "Neville Hogan",
      featured: false,
      tags: ["阻抗", "导纳", "柔顺", "接触"],
      tldr: "不把机器人当成刚性的位置源，而是规定末端对外力呈现的「质量-弹簧-阻尼」关系，让位置误差与接触力在同一个闭环中协调。",
      why: "接触任务不能只追求位置精度；阻抗控制提供了「多硬地跟踪、多软地顺应」的可调物理接口。",
      intro: [
        "阻抗控制的核心是调节机器人末端与环境之间的动态关系：环境推机器人时，机器人应该让多少、回弹多快、表现出多大惯性。位置控制追求零误差，阻抗控制则允许受控的偏差来换取柔顺与稳定接触。",
        "它对抓取、装配、擦洗与人机交互都重要。实现方式可以是关节力矩控制、末端力控或导纳控制；区别在于测量力、控制位置还是同时闭环。"
      ],
      method: [
        { title: "目标阻抗", text: "规定末端的虚拟质量、阻尼与刚度，让外力与位移之间呈现期望的动态关系。" },
        { title: "力/位混合", text: "在自由空间跟踪位置，在接触方向调节力或柔顺度，避免硬碰硬。" },
        { title: "导纳实现", text: "用测得的外力生成位置修正，适合位置控制接口的机器人。" }
      ],
      evidence: [
        { value: "Compliant", label: "接触稳定性", text: "通过降低接触刚度、增加阻尼，减少冲击与不稳定接触。" },
        { value: "Adjustable", label: "任务可调", text: "刚度与阻尼可按任务阶段改变，在自由空间与接触阶段切换。" }
      ],
      limits: [
        "阻抗参数需要根据环境刚度与任务调整，错误参数会导致振荡或过软。",
        "力传感噪声、延迟与末端工具动力学限制可用带宽。",
        "接触模型不确定时，固定阻抗难以保证所有场景的稳定与安全。"
      ],
      related: ["pid-control", "leap-hand", "mpc-control"],
      links: [
        { label: "论文", url: "https://doi.org/10.1115/1.3138561" }
      ]
    },
    {
      id: "neural-fly",
      domain: "control",
      route: "learning-control",
      type: "paper",
      title: "Neural-Fly",
      subtitle: "用学习残差实现强风中的敏捷飞行",
      year: 2022,
      venue: "Science Robotics 2022",
      org: "Caltech · NVIDIA 等",
      authors: "Guanya Shi, Kamyar Azizzadenesheli 等",
      featured: false,
      tags: ["学习控制", "自适应", "无人机", "强风"],
      tldr: "把已知的标称动力学与学习到的气动残差结合，用在线自适应更新残差表示，使无人机在强风与未见环境中保持敏捷飞行。",
      why: "它展示了「先验模型 + 学习残差 + 在线适应」的实用路线：不要求神经网络从零学会飞，而是让它补偿模型不知道的部分。",
      intro: [
        "Neural-Fly 不把飞控完全交给黑箱。它保留可解释的标称动力学，用神经网络学习风与机体交互造成的残差，并在飞行中根据观测快速更新最后一层，实现在线适应。",
        "这种结构把数据效率与稳定性放在一起：标称模型提供基础泛化，残差模型捕捉环境变化，在线适应处理训练分布之外的风场。"
      ],
      method: [
        { title: "标称模型", text: "用已知的刚体动力学提供基础控制，避免从零学习全部飞行动力学。" },
        { title: "残差学习", text: "神经网络学习气动与未建模效应，输出对控制量的修正。" },
        { title: "在线自适应", text: "飞行中更新残差表示的线性头，快速适应新的风场与负载变化。" }
      ],
      evidence: [
        { value: "Wind", label: "强风环境", text: "在强风与动态扰动下保持轨迹跟踪，优于纯标称控制与离线学习基线。" },
        { value: "Adapt", label: "在线适应", text: "在未见风场中通过在线更新恢复性能，减少重新采集数据的需求。" }
      ],
      limits: [
        "仍依赖可用的标称模型与安全飞行包线，不能保证任意故障下稳定。",
        "在线适应需要可靠的观测与足够的激励，强非线性下可能失稳。",
        "从无人机迁移到接触丰富的机械臂或人形，需要重新设计残差结构与安全约束。"
      ],
      related: ["mpc-control", "pid-control", "safety-cbf"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/2205.06908" }
      ]
    },
    {
      id: "safety-cbf",
      domain: "control",
      route: "safety",
      type: "concept",
      title: "控制障碍函数（CBF）",
      subtitle: "用前向不变集约束系统安全",
      year: 2019,
      venue: "ECC 2019",
      org: "Caltech 等",
      authors: "Aaron D. Ames 等",
      featured: false,
      tags: ["CBF", "安全滤波", "前向不变", "约束"],
      tldr: "用一个标量函数描述安全集，并通过控制输入使系统始终留在安全集内；常作为学习策略外部的安全滤波器，以最小干预修正危险动作。",
      why: "它把「不要进入危险状态」从奖励惩罚变成可证明的约束，为学习策略提供了一层可分析的安全接口。",
      intro: [
        "控制障碍函数把安全集表示为一个函数的非负区域，并要求该函数沿系统轨迹的导数满足约束。只要存在满足约束的控制输入，系统就不会离开安全集。",
        "在机器人中，CBF 常被包装成安全滤波器：学习策略先给一个候选动作，QP 在最小修改候选动作的前提下满足安全约束。它不是万能的——模型不准、输入受限或初始状态不安全时，约束可能无解。"
      ],
      method: [
        { title: "安全集", text: "用 h(x) ≥ 0 定义安全状态，h 的零水平集是安全边界。" },
        { title: "不变性约束", text: "要求 h 的导数满足与 h 相关的下界，使系统不能穿过安全边界。" },
        { title: "安全滤波器", text: "在候选控制附近求解最小修正 QP，在满足约束的同时尽量保留原策略。" }
      ],
      evidence: [
        { value: "Hard", label: "可证明的约束", text: "在模型准确且可行时，CBF 提供的是形式化安全保证，而非奖励惩罚。" },
        { value: "Filter", label: "最小干预", text: "与学习策略组合时，只在必要时修改动作，保留大部分任务性能。" }
      ],
      limits: [
        "需要相对准确的系统模型；模型误差会破坏形式化保证。",
        "多约束、输入受限与高相对度系统可能导致 QP 无可行解。",
        "人类、柔软物体与复杂接触的安全集难以精确建模。"
      ],
      related: ["mpc-control", "pid-control", "neural-fly"],
      links: [
        { label: "论文", url: "https://arxiv.org/abs/1903.11199" }
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
      domains: ["manipulation", "data", "hardware"],
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
      domains: ["loco-manipulation", "control"],
      scale: "40+ 小时动作捕捉",
      summary: "统一的人体动作捕捉数据集集合，是运动重定向、全身跟踪与人形运动先验的常用数据底座。",
      url: "https://amass.is.tue.mpg.de/"
    },
    {
      id: "res-humanoidbench",
      name: "HumanoidBench",
      type: "benchmark",
      year: 2024,
      domains: ["loco-manipulation", "hardware", "control"],
      scale: "27 个任务 / 人形全身",
      summary: "面向人形机器人的仿真基准，覆盖行走、平衡、全身操作与移动操作。",
      url: "https://humanoid-bench.github.io/"
    },
    {
      id: "res-locomujoco",
      name: "LocoMuJoCo",
      type: "benchmark",
      year: 2024,
      domains: ["loco-manipulation", "control"],
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
      id: "res-umi",
      name: "UMI",
      type: "dataset",
      year: 2024,
      domains: ["data"],
      scale: "跨场景手持采集",
      summary: "用手持夹爪在真实场景中采集可迁移的末端轨迹与多视角视觉，适合在机器人硬件之外扩展操作数据。",
      url: "https://umi-gripper.github.io/",
      entryId: "umi"
    },
    {
      id: "res-ego4d",
      name: "Ego4D",
      type: "dataset",
      year: 2021,
      domains: ["data"],
      scale: "3,000+ 小时第一人称视频",
      summary: "大规模第一人称人类日常视频集合，是 EGO 数据与人类行为理解的基础资源，但原生缺少机器人动作标签。",
      url: "https://ego4d-data.org/"
    },
    {
      id: "res-egodex",
      name: "EgoDex",
      type: "dataset",
      year: 2025,
      domains: ["data"],
      scale: "829 小时 / 194 个任务",
      summary: "带双手全关节 3D 追踪的大规模第一人称灵巧操作数据集，直接提供可学习的手部动作监督。",
      url: "https://github.com/apple/ml-egodex",
      entryId: "egodex"
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
    },
    {
      id: "res-leap-hand",
      name: "LEAP Hand",
      type: "platform",
      year: 2023,
      domains: ["hardware", "manipulation"],
      scale: "16 DoF / 开源",
      summary: "低成本、拟人化的开源灵巧手平台，提供结构、仿真模型与遥操作接口，适合批量部署与灵巧操作研究。",
      url: "https://leap-hand.github.io/",
      entryId: "leap-hand"
    },
    {
      id: "res-franka-research",
      name: "Franka Research 3",
      type: "platform",
      year: 2023,
      domains: ["hardware", "manipulation"],
      scale: "7 DoF / 关节力矩传感",
      summary: "带有关节力矩传感与 1 kHz 实时控制接口的协作机械臂，是力控与机器人学习研究常用的机械臂平台。",
      url: "https://franka.de/",
      entryId: "franka-research"
    },
    {
      id: "res-unitree-g1",
      name: "Unitree G1",
      type: "platform",
      year: 2024,
      domains: ["hardware", "loco-manipulation"],
      scale: "23–43 DoF / 约 35kg",
      summary: "相对可负担、可二次开发的人形机器人平台，覆盖双足、双臂与可选手部，适合全身控制与移动操作研究。",
      url: "https://www.unitree.com/g1/",
      entryId: "unitree-g1"
    },
    {
      id: "res-turtlebot4",
      name: "TurtleBot 4",
      type: "platform",
      year: 2022,
      domains: ["hardware", "navigation"],
      scale: "差速底盘 / ROS 2",
      summary: "基于 Create 3、树莓派 4、2D LiDAR 与 OAK-D 的室内轮式平台，提供完整的 ROS 2 导航与教学软件栈。",
      url: "https://turtlebot.github.io/turtlebot4-user-manual/",
      entryId: "turtlebot4"
    },
    {
      id: "res-odri",
      name: "Open Dynamic Robot Initiative",
      type: "platform",
      year: 2020,
      domains: ["hardware", "control"],
      scale: "模块化 / 力矩控制",
      summary: "开源的无刷电机、低减速比执行器与腿足平台方案，包含 Solo 四足、TriFinger 等硬件与实时控制软件。",
      url: "https://open-dynamic-robot-initiative.github.io/",
      entryId: "odri-actuator"
    },
    {
      id: "res-gym-classic",
      name: "Gymnasium Classic Control",
      type: "benchmark",
      year: 2022,
      domains: ["control"],
      scale: "经典控制环境",
      summary: "CartPole、Mountain Car、Pendulum 等经典控制环境，是反馈、最优控制与学习控制算法的入门级基准。",
      url: "https://gymnasium.farama.org/environments/classic_control/"
    }
  ];

  const ROUTE_DETAILS = {
    "navigation:semantic-nav": {
      lead: [
        "语义导航把「地图上的坐标」换成「世界里的对象或区域」。智能体接收一个语义目标（例如「找到一把椅子」「去厨房」），必须在部分可观测的环境中主动探索、确认目标、规划可达路径并最终停靠。",
        "它与点目标导航的区别在于目标不是预先给定的坐标，而是需要视觉识别与语义推理才能确认的实体。这使感知误差、类别歧义和探索策略直接进入决策闭环；成功不仅取决于能不能走过去，还取决于找得对不对。"
      ],
      sections: [
        {
          title: "问题形式化与系统边界",
          body: [
            "常见设定是部分可观测马尔可夫决策过程：观测为 RGB-D 与位姿，动作是离散的前进、转向或连续速度。评测同时看成功率与路径效率（SPL），避免策略靠无序探索碰运气。目标实例的定义、停止距离与最大步数都会显著改变排名。"
          ],
          bullets: [
            "语义先验：物体通常出现在合理位置，可用来减少搜索空间，也会在反常识布局中造成强偏置。",
            "地图表示：语义地图、场景图与拓扑记忆各有取舍；建图误差会传播到目标确认与路径规划。",
            "探索预算：前沿探索、不确定性采样与语义猜测决定「找得快」和「找得全」的平衡。"
          ]
        },
        {
          title: "两条实现路线",
          body: [
            "模块化系统把感知、语义建图、探索与规划拆开，优势是可解释、可替换；端到端策略直接把观测映射为动作，优势是误差不必经过人工接口，但需要大量带目标标签的轨迹，且难以定位失败环节。"
          ],
          bullets: [
            "模块化：检测/分割 → 语义地图 → 前沿选择 → 路径规划，工程可控但模块间误差会叠加。",
            "端到端：RGB-D/历史 → 动作或子目标，可学习探索行为，但泛化依赖训练场景与目标分布。",
            "混合式：用学习模型产生语义前沿或候选目标，再由经典规划器保证可达与安全。"
          ]
        },
        {
          title: "主要失效模式",
          body: [
            "语义导航最常见的失败不是撞墙，而是「认错」与「找不到」：把相似物体误判为目标、被遮挡后丢失目标、在多层建筑中绕圈。动态人类与可开关的门会进一步破坏基于静态地图的假设。"
          ],
          bullets: [
            "类别歧义导致过早停止；应在接近后做细粒度验证。",
            "长期探索后地图漂移，回环失败；需要拓扑记忆或重定位。",
            "仿真里的室内布局与真实家庭长尾差距大，成功率高不代表可部署。"
          ]
        }
      ],
      practice: [
        "先固定评测协议，再比较模型；不同停止阈值和场景集合上的成功率不可直接横比。",
        "把探索失败与目标误识别分开记录，否则无法判断是感知问题还是规划问题。",
        "在真实部署中保留人工确认或远程接管接口，尤其是开放词汇目标。"
      ]
    },
    "navigation:vln": {
      lead: [
        "视觉-语言导航（VLN）要求智能体按照自然语言指令在三维环境中行动。指令可以是「走过沙发后右转，进入厨房」这样带空间关系与顺序的路线描述，也可以是更开放的高层目标。",
        "VLN 的核心不是把文本编码成向量，而是建立指令、观测历史与可行动作之间的时序对齐。模型必须知道「现在走到哪一句了」，并在语言歧义与视觉遮挡下做出可恢复的决策。"
      ],
      sections: [
        {
          title: "离散图与连续环境",
          body: [
            "经典 VLN 在预建的全景图上游走，动作是选择相邻节点，评测依赖 R2R、RxR 等数据集。这类设定便于比较语言 grounding，但与真实连续控制存在明显差距。连续环境版本（VLN-CE）改用低层动作，要求模型同时处理局部避障与指令跟随。"
          ],
          bullets: [
            "离散图：候选节点可枚举，适合研究语言理解与历史建模；但真实机器人不会天然拥有图。",
            "连续环境：观测空间更大、动作更细，误差累积与仿真到现实差距更突出。",
            "历史建模：循环网络、Transformer 记忆与拓扑图分别压缩不同时间尺度的信息。"
          ]
        },
        {
          title: "从监督学习到基础模型",
          body: [
            "早期方法依赖成对的指令-轨迹监督，容易过拟合环境与指令模板。后续工作引入预训练视觉语言模型、数据增广与对抗训练，提升对未见指令和场景的泛化。NavGPT 一类方法则把观测转成文本，让通用 LLM 在图上显式推理，以可解释性换取空间信息。"
          ],
          bullets: [
            "数据增广：回译指令、路径扰动与视角变化能缓解监督稀缺。",
            "LLM 推理：显式分解子目标，但文本接口会丢失几何与连续空间信息。",
            "视频/VLA 方法：直接以视频历史和大规模视觉语言预训练做导航，是近年的融合方向。"
          ]
        },
        {
          title: "评测陷阱",
          body: [
            "VLN 的测试集往往与训练场景共享视觉风格或物体分布。模型可能记住了「厨房长什么样」而不是学会读懂指令。报告成功率时，应同时给出未见场景、未见指令组合和长指令的表现。"
          ],
          bullets: [
            "只看最终成功率会掩盖中途走错再纠正的行为质量。",
            "语言模板化会让模型依赖关键词，而不是空间关系。",
            "真实环境的动态行人与语音交互尚未被主流 benchmark 覆盖。"
          ]
        }
      ],
      practice: [
        "先确认指令风格与动作空间，再决定是否需要 LLM 推理；离散图上的结论不能直接迁移到连续机器人。",
        "保留逐步执行日志，分析错误发生在语言解析、视觉定位还是控制层。",
        "人机协作场景中，允许用户中途修正指令比追求完全零样本更现实。"
      ]
    },
    "navigation:nav-models": {
      lead: [
        "导航基础模型试图把「从大量机器人轨迹中学习如何到达目标」做成可复用的预训练问题。输入通常是目标图像或语言，输出是动作或局部路径；模型先在多环境数据上预训练，再用少量目标域数据适配。",
        "与经典 SLAM/规划不同，这类模型不显式维护全局地图，而是学习一种反应式或短时记忆策略。它们擅长处理视觉杂乱和未见场景，但长程一致性、空间度量与安全约束仍需外部结构补足。"
      ],
      sections: [
        {
          title: "目标条件策略与拓扑记忆",
          body: [
            "GNM、ViNT、NoMaD 这一系列工作把导航看成目标条件序列建模：给定当前观测与目标，预测下一步动作。NoMaD 进一步用目标掩码统一「目标导航」与「无目标探索」，并用扩散模型表达多模态路径。"
          ],
          bullets: [
            "目标表示：目标图像、相对位姿或语言；不同条件对应不同的泛化方式。",
            "拓扑记忆：把关键帧组织成图，让长程导航可以检索与回退。",
            "动作表示：离散航点、连续速度或轨迹块；与控制频率和底层控制器强相关。"
          ]
        },
        {
          title: "数据与泛化",
          body: [
            "导航基础模型的能力高度依赖轨迹数据的场景与平台多样性。跨城市、跨室内外、跨相机安装方式的数据能提升泛化，但也会引入动作空间与视觉分布的不一致。预训练后的模型通常需要在目标机器人上做少量微调或校准。"
          ],
          bullets: [
            "数据规模并不自动等于空间推理能力；轨迹覆盖的决策分支比单纯里程更重要。",
            "相机外参、延迟与轮速标定会直接破坏策略，部署前必须做系统辨识。",
            "对动态障碍物，反应式策略往往缺少显式预测与安全裕度。"
          ]
        },
        {
          title: "可靠性与安全",
          body: [
            "端到端导航模型很难给出「为什么走这里」的局部解释，也难以保证不会进入不可恢复区域。实际系统通常把学习策略放在局部规划层，用经典地图、代价地图与安全控制器兜底。"
          ],
          bullets: [
            "将学习输出限制在可通行区域，并加碰撞检查与急停。",
            "用不确定性估计识别分布外场景，触发降级或人工接管。",
            "在部署环境中持续记录失败片段，形成闭环数据回流。"
          ]
        }
      ],
      practice: [
        "把「目标识别」「局部避障」「长程拓扑」分开评测，避免一个平均成功率掩盖具体短板。",
        "优先验证相机标定、控制延迟与轮式里程计，这些工程问题常比换模型更影响表现。",
        "真实部署中保留经典规划器作为安全层，不要把端到端模型当作唯一防线。"
      ]
    },
    "navigation:social-nav": {
      lead: [
        "社交导航把人类从静态障碍物变成有目标、会预测、会改变计划的行动者。机器人不仅要到达目的地，还要在通行过程中保持舒适距离、避免阻断、遵守排队与让行等社会规范。",
        "这类问题无法只靠几何最短路径求解：一条更短的路可能穿过人群，造成不适或碰撞风险。评测因此同时涉及任务成功率、路径效率、社交指标与人类主观感受。"
      ],
      sections: [
        {
          title: "人类运动建模",
          body: [
            "常见做法是预测人类短期轨迹，再把预测不确定性纳入规划。 Social Force、ORCA 等经典模型可解释但假设简单；数据驱动模型能捕捉群体行为，却需要大量带标注的人类轨迹，并可能放大数据中的社会偏置。"
          ],
          bullets: [
            "短期预测：位置、速度、朝向与意图；预测误差会直接变成规划约束。",
            "群体交互：人与人之间的避让会改变机器人可通行空间，不能逐个独立处理。",
            "社会规范：距离、视线、让行与语言提示等难以用单一代价函数表达。"
          ]
        },
        {
          title: "仿真与真实人类",
          body: [
            "Habitat 3.0 把真实室内扫描、人形化身与机器人放进同一物理仿真，支持社交导航与协作重排。它让「有人类活动」进入可重复实验，但化身的行为策略仍然是对真实人类的简化。"
          ],
          bullets: [
            "仿真人类往往按脚本或简单策略行动，难以复现真实的犹豫、结伴与突然转向。",
            "真实实验需要伦理审查、知情同意与安全边界，规模很难做大。",
            "主观舒适度通常通过问卷或生理信号测量，难以与成功率合并成单一指标。"
          ]
        },
        {
          title: "安全与伦理边界",
          body: [
            "社交导航系统需要明确「谁优先」：是效率、人的舒适，还是弱势群体的可通行性？这些不是纯技术参数。部署在公共空间时，还要考虑监控、数据隐私与对特定人群的差别对待。"
          ],
          bullets: [
            "保留硬性安全距离与紧急停止，不把社会规范完全交给学习模型。",
            "在夜间、拥挤、儿童与行动不便者等场景中单独评测。",
            "对机器人采集的视频与轨迹做最小化存储与访问控制。"
          ]
        }
      ],
      practice: [
        "不要只在空旷走廊测避障；人群密度、结伴行走与对向交汇才是社交导航的难点。",
        "把「任务成功」与「人感到舒适/安全」分别记录，两者可能冲突。",
        "先做小规模、可控环境的人机实验，再考虑开放公共空间。"
      ]
    },
    "manipulation:imitation": {
      lead: [
        "模仿学习直接从人类示教学习策略，是当前机器人操作最主流的数据驱动范式。它把「人怎么做」转成观测到动作的映射，避免手工设计奖励，但需要面对分布偏移、多模态动作与长程组合三大问题。",
        "行为克隆的朴素形式是监督回归，然而同一观测下可能有多种正确动作；直接回归会把它们平均成不可执行的中间路径。动作分块、扩散/流匹配与隐变量模型都是为了表达这种多模态性，同时保持时间连贯。"
      ],
      sections: [
        {
          title: "从单步回归到动作分布",
          body: [
            "现代操作策略通常输出一段动作块，而不是单步动作。ACT 用 Transformer 一次预测未来若干步，Diffusion Policy 用去噪过程建模动作序列分布，π0 则用流匹配生成连续动作。三者共享一个直觉：动作的时间相关性必须被显式建模。"
          ],
          bullets: [
            "动作分块降低推理频率与 compounding error，但会牺牲对突发变化的响应。",
            "扩散/流匹配能表达多模态路径，代价是推理迭代与训练成本。",
            "时间集成与重新规划决定动作块之间如何衔接，是工程成败的关键。"
          ]
        },
        {
          title: "数据质量与分布偏移",
          body: [
            "示教数据通常只覆盖成功轨迹，策略很少见到「失败后如何恢复」。当策略偏离示教分布，误差会迅速累积。常见缓解手段包括 DAgger 式交互纠错、在数据中加入扰动与恢复片段，以及把策略限制在较短的动作块内重新观测。"
          ],
          bullets: [
            "相机位置、光照、物体摆放的变化会放大分布偏移。",
            "示教者的停顿与修正如果未处理，会被策略当成正常动作学习。",
            "只报告成功任务会掩盖失败恢复能力；应单独测试扰动与长程任务。"
          ]
        },
        {
          title: "何时不该只用模仿学习",
          body: [
            "模仿学习擅长复制已有技能，却不擅长发现新策略或优化超越示教者的行为。对高精度接触、动态任务或需要主动探索的场景，通常需要与强化学习、模型预测控制或任务规划结合。"
          ],
          bullets: [
            "需要超越人类示教速度或精度的任务，纯行为克隆上限受限。",
            "稀疏奖励和长程任务可用模仿做热启动，再用 RL 微调。",
            "安全关键任务需要独立于策略的约束层。"
          ]
        }
      ],
      practice: [
        "先固定动作空间与相机标定，再比较算法；很多「模型提升」来自更好的数据对齐。",
        "把动作块长度、推理延迟与重规划频率作为超参数系统搜索，而不是沿用论文默认值。",
        "收集少量失败恢复数据，往往比增加同分布成功示教更能提升鲁棒性。"
      ]
    },
    "manipulation:rl": {
      lead: [
        "强化学习让机器人在奖励信号下通过试错获得行为。它不要求人类示教每一步，却要求一个可定义的奖励、一个可承受的试错环境，以及把仿真策略迁移到真机的手段。",
        "在操作领域，RL 最成功的场景往往具备高保真仿真、明确奖励和可大规模并行的环境，例如灵巧手在手内重定向、四足运动与部分装配任务。开放环境中的长程操作仍很难直接端到端训练。"
      ],
      sections: [
        {
          title: "问题设定与算法族",
          body: [
            "标准设定是马尔可夫决策过程：状态、动作、转移、奖励与折扣。操作任务常使用 PPO 等无模型算法，配合 LSTM/Transformer 处理历史；也有基于世界模型的 Dreamer 系列，在潜空间想象中训练策略。"
          ],
          bullets: [
            "稀疏奖励：需要奖励塑形、课程学习或 demonstrations 热启动。",
            "高维动作：灵巧手与全身控制需要大量并行环境与稳定归一化。",
            "安全探索：真机试错必须限制动作范围并准备急停。"
          ]
        },
        {
          title: "Sim2Real 是主战场",
          body: [
            "RL 策略通常在仿真中训练百万级步数，再迁移真机。域随机化、系统辨识、执行器建模与残差学习是常用手段。OpenAI 的灵巧手工作展示了大规模随机化可以把策略零样本迁移到真机，但也暴露了视觉位姿估计的脆弱性。"
          ],
          bullets: [
            "随机化范围太窄无法覆盖真实差异，太宽则让任务不可学。",
            "观测延迟、控制频率与执行器饱和常被仿真忽略，却是真机主要误差源。",
            "用真实数据学习残差或做短期微调，比从零真机 RL 更现实。"
          ]
        },
        {
          title: "评测与可复现性",
          body: [
            "RL 结果对随机种子、奖励尺度与并行环境数量非常敏感。论文中的高成功率可能来自大量调参与筛选。复现时应报告训练曲线、随机种子方差与真机试验次数，而不只是最佳策略。"
          ],
          bullets: [
            "在相同交互预算下比较，而不是比较谁训练得更久。",
            "分别报告仿真成功率与真机成功率，避免用仿真指标替代部署证据。",
            "记录失败模式：摔倒、卡死、超时与不可恢复状态同样重要。"
          ]
        }
      ],
      practice: [
        "先估计任务是否需要 RL；如果已有足够示教，模仿学习通常更便宜、更可控。",
        "把仿真环境当作需要维护的系统：传感器、延迟和执行器模型都要校准。",
        "用安全层限制动作范围，并准备人工接管，不要直接让探索策略控制真实硬件。"
      ]
    },
    "manipulation:vla": {
      lead: [
        "视觉-语言-动作模型把图像、语言与动作放进同一个建模问题，让机器人策略继承视觉语言预训练中的世界知识与语义泛化。它通常由视觉编码器、语言模型和动作头组成，在大规模机器人轨迹上联合微调。",
        "VLA 的核心承诺是「开放指令 + 跨任务泛化」，但它的动作精度、推理频率与长程稳定性仍是硬约束。理解一个 VLA，必须分开看语义泛化、动作表示、控制频率与数据配方，而不是只看参数规模。"
      ],
      sections: [
        {
          title: "动作表示的两大分支",
          body: [
            "一类方法把动作离散成 token，与文本共享词表，如 RT-2 与 OpenVLA；另一类方法外接连续动作头，用扩散或流匹配生成动作块，如 π0 与 RDT-1B。离散 token 更接近语言模型原生的自回归训练，连续头更适合高频、平滑的接触控制。"
          ],
          bullets: [
            "离散动作：实现简单、可复用 LLM 基础设施，但精度与频率受 token 化限制。",
            "连续动作：动作平滑、频率高，但需要额外的动作专家与训练目标。",
            "双系统：VLM 慢思考负责语义，动作专家快执行负责实时控制。"
          ]
        },
        {
          title: "数据配方决定能力边界",
          body: [
            "VLA 通常混合互联网视觉语言数据、跨本体机器人数据和目标任务后训练数据。前两者提供语义与动作先验，后者提供任务熟练度。数据比例、动作空间统一方式和后训练策略，往往比模型结构更能解释性能差异。"
          ],
          bullets: [
            "跨本体数据提升泛化，但动作空间与相机差异会引入噪声。",
            "后训练数据过少导致指令跟随差，过多则遗忘通用知识。",
            "多模态推理数据可以让模型「先想后做」，但会拉高延迟。"
          ]
        },
        {
          title: "评测与部署风险",
          body: [
            "VLA 的真机评测成本高，很多结果来自少量任务与单一实验室环境。语言合理不等于物理可行，模型可能生成看似合理但危险的动作。部署时必须加独立的碰撞、力矩与工作空间约束。"
          ],
          bullets: [
            "报告未见物体、未见指令与未见本体的表现，而不是单一平均成功率。",
            "测量端到端延迟；慢速推理会破坏闭环。",
            "对高风险动作设置硬约束与人工确认，不要依赖模型自我评估。"
          ]
        }
      ],
      practice: [
        "先明确动作空间和控制频率，再选择离散 token 或连续动作头。",
        "尽可能复现数据配比和后训练流程；只换模型结构很难得到论文中的增益。",
        "把 VLA 放在安全控制器之上，而不是替代安全控制器。"
      ]
    },
    "manipulation:wam": {
      lead: [
        "世界-动作模型（WAM）尝试让模型同时学习「世界会如何变化」与「我该如何行动」。与只预测动作的 VLA 不同，WAM 显式建模未来观测，并让视觉预测与动作生成互相约束。",
        "它延续了 Dreamer 一类潜空间世界模型和 Genie 一类生成式世界模型，但重点从「生成视频」转向「生成可执行动作」。WorldVLA 是这一方向的代表：在单一自回归框架中联合预测未来图像与动作。"
      ],
      sections: [
        {
          title: "从世界模型到动作模型",
          body: [
            "世界模型学习状态转移，策略在模型内部想象未来。WAM 进一步把动作作为生成过程的一部分，让模型在预测「杯子会去哪里」的同时决定「手该怎么动」。这种联合建模可以提供比纯模仿更丰富的监督信号，也可能让模型学到物理因果。"
          ],
          bullets: [
            "潜空间世界模型：压缩观测、预测动力学，适合策略优化但解释性弱。",
            "生成式世界模型：直接预测像素/视频，视觉丰富但计算昂贵、物理不一定正确。",
            "联合 WAM：共享序列同时生成未来观测与动作，强调二者的一致性。"
          ]
        },
        {
          title: "核心风险：预测好不等于控制好",
          body: [
            "视觉预测指标（PSNR、FID）与任务成功率之间没有稳定关系。一个模型可能生成逼真的未来画面，却对动作不敏感，或者利用预测误差「作弊」。评估 WAM 必须同时看动作成功率、动作对扰动的敏感性以及长时预测的物理一致性。"
          ],
          bullets: [
            "预测误差会在自回归中累积，长程滚动可能偏离真实轨迹。",
            "动作注意力与训练目标设计不当，会让模型忽略动作条件。",
            "推理时频繁生成未来帧会显著拉低控制频率。"
          ]
        },
        {
          title: "与 VLA、Diffusion Policy 的关系",
          body: [
            "WAM 不是替代 VLA，而是给 VLA 增加世界预测目标；也不是替代扩散策略，而是在动作生成之外增加未来观测的约束。实际系统可以采用 WAM 预训练、VLA 动作头、扩散控制器组合的分层结构。"
          ],
          bullets: [
            "需要动作标签，因此仍受机器人数据规模限制。",
            "预训练世界模型可以在无动作视频上学习，但如何对齐到控制仍是难点。",
            "真实部署需要独立的安全与实时性约束。"
          ]
        }
      ],
      practice: [
        "先验证模型对动作是否敏感：做反事实动作输入，看预测未来是否按物理规律改变。",
        "不要把视频生成质量作为唯一卖点；同时报告控制成功率与推理延迟。",
        "从短时预测与局部动作块开始，逐步增加滚动长度，避免一次性追求长视频。"
      ]
    },
    "manipulation:code-policy": {
      lead: [
        "代码即策略让大语言模型生成可执行程序，调用感知、几何计算与控制 API 来完成机器人任务。它把「语言理解」转成「程序组合」，因此计划是可读、可检查、可复用的。",
        "SayCan 用 LLM 选择预定义技能，Code as Policies 让 LLM 写 Python 策略，VoxPoser 则把代码生成与三维价值图结合，让 LLM 通过 VLM 影响连续空间。它们共同的关键是 API：模型的智能上限受可用感知与控制原语限制。"
      ],
      sections: [
        {
          title: "程序作为中间表示",
          body: [
            "自然语言计划容易含糊，低层动作又难以直接生成。程序介于两者之间：可以表达条件分支、循环、空间关系与参数化调用，也能被静态分析或人工审查。分层代码生成可以递归定义辅助函数，让复杂任务被拆成可测试的模块。"
          ],
          bullets: [
            "API 设计决定能力边界：抓取、导航、检测、坐标变换是否可用。",
            "程序可以被单元测试与回放，但物理执行仍需闭环监控。",
            "对开放世界，代码需要处理异常、失败重试与不确定性。"
          ]
        },
        {
          title: "从离散技能到三维空间",
          body: [
            "VoxPoser 把语言约束转成三维价值图，再用规划器生成末端轨迹。这弥补了纯代码策略难以处理连续几何的缺点，也让空间约束可组合。但它依赖 VLM 的空间 grounding，透明物体与复杂接触仍容易失败。"
          ],
          bullets: [
            "价值图可表达吸引、排斥、速度与姿态约束，但仍是手工设计的表示。",
            "规划器能保证几何可行，却不能保证动力学与接触成功。",
            "感知错误会被代码放大成系统性失败，需要运行时验证。"
          ]
        },
        {
          title: "可靠性问题",
          body: [
            "LLM 生成的代码可能包含逻辑错误、幻觉 API 或对物理世界的错误假设。直接执行高风险动作是不负责任的；应加入沙箱、类型检查、仿真回放与人工确认。"
          ],
          bullets: [
            "在仿真或数字孪生里先执行生成的程序，检查碰撞与可达性。",
            "对每个 API 提供前置条件与后置条件，失败时回退。",
            "记录代码、输入与执行结果，才能复现失败。"
          ]
        }
      ],
      practice: [
        "先投资稳定的感知与控制 API，再谈 LLM 规划；API 质量决定系统上限。",
        "让程序输出可验证的中间量（目标位姿、约束、路径），而不是只输出最终动作。",
        "将高风险操作放在人工确认或硬件急停之后。"
      ]
    },
    "manipulation:harness": {
      lead: [
        "具身智能体 Harness 是包在模型外面的系统层：它把视觉语言模型、策略、技能库、记忆、状态机、安全护栏和日志接成一个可运行的闭环。它不是某个新网络，而是决定模型能力能否稳定落地的工程接口。",
        "同一基础模型换一套 harness，真机表现可能相差很大。模型负责理解与生成，harness 负责何时调用、如何验证、失败后怎么办，以及把哪些信息带回下一轮。"
      ],
      sections: [
        {
          title: "最小可用结构",
          body: [
            "一个具身 harness 至少需要技能注册表、状态与记忆、闭环执行器、安全检查与可观测性。技能注册表把导航、抓取、放置、感知查询包装成带前置条件和效果声明的接口；状态机维护任务进度与失败历史；执行器负责任务分解、调用与重试。"
          ],
          bullets: [
            "工具/技能调用：把模型输出限制在可执行、可审计的接口上。",
            "记忆：场景事实、任务进度和历史失败，避免每次从零推理。",
            "安全护栏：碰撞、力矩、工作空间与权限检查必须独立于模型。"
          ]
        },
        {
          title: "与端到端模型的分工",
          body: [
            "Harness 并不反对端到端，而是承认系统存在不同时间尺度：语义规划以秒计，控制以毫秒计。让一个模型同时承担所有层，既难训练也难调试。分层不是保守，而是把可验证性放在正确的位置。"
          ],
          bullets: [
            "上层用 VLM/VLA 生成目标与计划，下层用控制器或专用策略执行。",
            "中间层负责把自然语言转成结构化调用，并处理异常。",
            "端到端策略也可以作为 harness 的一个技能，而不是整个系统。"
          ]
        },
        {
          title: "如何评测",
          body: [
            "目前缺少统一的 harness benchmark。至少应报告任务完成率、人工接管次数、恢复成功率、延迟与安全违规次数。只展示成功视频无法说明系统在分布外和故障情况下是否可靠。"
          ],
          bullets: [
            "注入故障（物体丢失、抓取失败、网络延迟）测试恢复能力。",
            "记录每次工具调用的参数与结果，支持事后审计。",
            "比较不同模型在同一 harness 下的表现，才能分离模型与系统贡献。"
          ]
        }
      ],
      practice: [
        "先做可观测性和急停，再做自主性；没有日志的智能体无法调试。",
        "把「失败后恢复」当作一等功能，而不是异常处理补丁。",
        "不要用 harness 的工程复杂度掩盖底层模型能力不足。"
      ]
    },
    "loco-manipulation:wbc": {
      lead: [
        "全身控制（WBC）把机器人所有关节视为一个整体，在满足接触、摩擦、力矩与平衡约束的前提下，同时跟踪行走与操作目标。它解决的问题是：当手去够一个物体时，脚和躯干应该如何配合。",
        "传统 WBC 依赖精确模型与在线优化（QP/MPC）；学习式 WBC 则用强化学习或运动模仿获得鲁棒的运动先验。两者正在融合：学习策略提供全身技能，优化器负责约束与安全。"
      ],
      sections: [
        {
          title: "分层与约束",
          body: [
            "典型结构是任务空间目标 → 全身 QP/MPC → 关节力矩。任务可以有优先级：保持平衡高于末端跟踪，末端跟踪高于姿态美观。接触调度决定哪只脚/手接触世界，以及接触力如何分配。"
          ],
          bullets: [
            "平衡约束：质心、支撑多边形与角动量必须同时满足。",
            "摩擦锥：接触力不能超出摩擦极限，否则会打滑。",
            "力矩/关节限位：优化结果必须能被真实执行器执行。"
          ]
        },
        {
          title: "学习式全身控制",
          body: [
            "HOVER 把全身运动模仿作为统一抽象，用策略蒸馏把导航、移动操作和桌面操作等不同命令空间合并成一个多模式控制器。这样同一个策略可以在不同控制接口之间切换，而不必为每种模式重训。"
          ],
          bullets: [
            "运动模仿提供通用身体技能，但依赖高质量动捕与重定向。",
            "多模式蒸馏可能牺牲各模式的极限性能。",
            "学习控制器仍需安全层与状态估计兜底。"
          ]
        },
        {
          title: "失败模式",
          body: [
            "接触切换、状态估计漂移与执行器延迟是主要风险。机器人可能在仿真中完美跟踪，却在真机上因脚底打滑或关节摩擦而失稳。硬件限位、急停与人工接管不可省略。"
          ],
          bullets: [
            "单脚支撑与快速转向最容易失稳。",
            "负载变化会改变质心与动力学，需要在线上估计。",
            "操作反作用力会通过身体传回，必须与接触规划联合处理。"
          ]
        }
      ],
      practice: [
        "先把状态估计与执行器标定做好，再调 WBC；大部分真机失稳来自感知与延迟。",
        "为不同任务设置明确优先级，不要让优化器自行取舍平衡与操作。",
        "保留经典安全控制器，学习策略只负责技能与跟踪。"
      ]
    },
    "loco-manipulation:loco-rl": {
      lead: [
        "学习式移动操作把行走与操作技能放在同一个学习问题里，或用分层策略把运动、操作和任务规划组合起来。与固定底座操作相比，它需要处理移动带来的视角变化、轮/足接触与全身动力学。",
        "现有路线大致分为端到端全身策略、模块化运动+操作策略，以及从人类动作/遥操作中学习的分层系统。共同难点是：数据采集昂贵，仿真到现实的动力学差距大，长程任务的误差累积快。"
      ],
      sections: [
        {
          title: "端到端与分层",
          body: [
            "端到端方法直接把视觉目标映射到全身动作，能联合优化身体与手，但样本效率低、调试困难。分层方法用运动控制器维持平衡与移动，用操作策略控制手臂，再由上层任务规划协调；它更容易复用与验证，但模块接口可能引入延迟与不一致。"
          ],
          bullets: [
            "端到端：联合优化潜力大，但需要大量仿真与精心奖励。",
            "分层：运动与操作可独立迭代，接口定义是主要难点。",
            "混合：用 RL 训练运动先验，用模仿学习训练操作技能。"
          ]
        },
        {
          title: "人类动作作为数据源",
          body: [
            "OmniH2O 用人体姿态与 VR 接口驱动机器人，通过运动重定向和 RL 跟踪实现全身遥操作，并进一步用人类示范训练自主技能。LocoMan 则用四足平台加轻量操作臂，在受限空间中完成任务，强调硬件与模块化策略的协同设计。"
          ],
          bullets: [
            "重定向误差会改变接触点与重心，不能只做关节角映射。",
            "遥操作数据需要与机器人动作严格同步，否则策略学到错误因果。",
            "四足平台稳定但自由度有限，人形平台灵活但控制更难。"
          ]
        },
        {
          title: "评测与安全",
          body: [
            "移动操作评测必须同时覆盖移动、操作与两者耦合的任务，例如边走边拿、在狭窄空间转身、上下坡搬运。只测桌面操作会低估全身控制的难度。"
          ],
          bullets: [
            "记录失败发生在移动、操作还是任务规划层。",
            "在负载、地面材质与障碍物变化下测试。",
            "人形高动态动作需要硬件保护与安全绳。"
          ]
        }
      ],
      practice: [
        "先决定平台与控制接口，再选算法；四足与人形的数据不可直接互换。",
        "分层系统中把延迟预算写清楚，避免上层规划频率与底层控制不匹配。",
        "从低速、静态操作开始，再逐步增加移动与动态性。"
      ]
    },
    "loco-manipulation:humanoid-fm": {
      lead: [
        "人形基础模型试图把视觉语言理解、全身运动与操作放进统一模型。它通常采用双系统架构：慢速 VLM 理解场景与任务，快速动作专家生成全身动作块。GR00T N1 是这一方向的代表。",
        "与桌面 VLA 不同，人形基础模型必须处理高维关节、平衡约束与长程移动。模型不能只在视觉上合理，还要输出物理可行的全身目标，并由底层控制器保证稳定。"
      ],
      sections: [
        {
          title: "双系统与数据金字塔",
          body: [
            "慢系统以较低频率理解图像与语言，输出子任务或中间表示；快系统根据本体状态生成高频动作。训练数据通常由互联网/人类视频、仿真合成数据与真实遥操作数据组成金字塔，分别提供语义、规模与真实接触。"
          ],
          bullets: [
            "语义层：视觉语言预训练提供物体、任务与常识。",
            "运动层：人类动作与仿真提供全身运动先验。",
            "真机层：遥操作数据提供硬件特性与任务熟练度。"
          ]
        },
        {
          title: "接口与安全性",
          body: [
            "人形基础模型的输出可以是关节目标、末端位姿或运动 token，不同接口需要不同的底层控制器。安全约束必须独立于模型：重心、关节限位、碰撞与急停不能交给生成模型自行判断。"
          ],
          bullets: [
            "动作空间要与 WBC/运动控制器匹配，否则模型输出不可执行。",
            "长程任务需要状态记忆与失败恢复，而不是每次重新看图。",
            "真实人形硬件昂贵，仿真与安全测试必须前置。"
          ]
        },
        {
          title: "尚未解决的问题",
          body: [
            "人形数据规模远小于视觉语言数据，评测也缺少统一标准。多数展示是精心挑选的任务与环境，难以说明在家庭或工厂的泛化能力。全身操作与移动的联合训练、跨本体迁移与安全保证仍是开放问题。"
          ],
          bullets: [
            "如何可靠地评价全身操作而非只评价手臂？",
            "仿真人形动力学与真实硬件的差距如何量化？",
            "基础模型出错时，系统如何安全降级？"
          ]
        }
      ],
      practice: [
        "先把底层全身控制器与安全层做稳，再接入基础模型。",
        "记录模型输出与底层执行的偏差，定位是语义错误还是物理不可行。",
        "不要用单一成功视频替代多任务、多场景的统计评测。"
      ]
    },
    "loco-manipulation:loco-sim2real": {
      lead: [
        "人形 Sim2Real 研究如何把仿真中的高动态全身技能迁移到真实硬件。人形系统接触频繁、欠驱动、硬件昂贵，仿真误差会被放大成摔倒或关节过载。",
        "ASAP 把问题拆成两阶段：先在仿真中用人类运动数据预训练跟踪策略，再在真机采集数据学习残差动作模型，把残差放回仿真中微调。它代表从「一次性迁移」转向「持续对齐」的思路。"
      ],
      sections: [
        {
          title: "误差来源",
          body: [
            "主要差异包括质量/惯量、关节摩擦与间隙、执行器延迟、地面接触与传感器噪声。域随机化可以覆盖一部分变化，但高动态动作需要更精确的在线辨识；否则策略会变得保守，失去敏捷性。"
          ],
          bullets: [
            "执行器模型：真实电机的力矩-速度曲线与仿真不同。",
            "接触模型：脚底形变、打滑与地面材质难以精确建模。",
            "状态估计：IMU 漂移与视觉延迟会让反馈失准。"
          ]
        },
        {
          title: "残差学习与真实数据",
          body: [
            "残差模型学习「仿真动作 + delta」来补偿真实动力学。它不需要从零训练高维策略，但需要真实数据覆盖目标动作。ASAP 在真实 G1 上验证了多种敏捷动作，跟踪误差优于单独使用系统辨识或域随机化的基线。"
          ],
          bullets: [
            "残差模型的泛化受真实数据分布限制。",
            "两阶段流程工程复杂，需要仿真与真机反复迭代。",
            "安全绳、急停与硬件保护是实验前提。"
          ]
        },
        {
          title: "评测建议",
          body: [
            "不要只报告最佳动作的视频。应给出多动作的跟踪误差分布、失败恢复率、能耗与硬件磨损，并说明仿真与真实的初始状态是否一致。"
          ],
          bullets: [
            "同一动作多次重复，报告方差而非单次成功。",
            "测试不同地面、负载与电池状态下的一致性。",
            "把安全违规与硬件损伤单独计数。"
          ]
        }
      ],
      practice: [
        "先做系统辨识与延迟测量，再决定是否需要残差学习。",
        "在仿真里保留与真机一致的安全约束，避免策略学会不可执行的动作。",
        "将真实数据采集设计成可迭代流程，而不是一次性迁移实验。"
      ]
    },
    "simulation:gpu-sim": {
      lead: [
        "GPU 并行仿真是机器人学习的基础设施：把物理步进、传感器渲染与环境重置放到 GPU 上，同时运行成千上万个环境，用吞吐量换取数据规模。Isaac Lab、MJX 等框架把这一能力封装成可编程接口。",
        "它改变的不只是速度，还有实验方式：可以在一次训练中随机化材质、质量、光照和延迟，系统性地测试策略鲁棒性。但接触精度、渲染真实感与硬件依赖仍是限制。"
      ],
      sections: [
        {
          title: "技术栈",
          body: [
            "典型栈包括场景描述（USD/MJCF）、物理引擎（PhysX/MuJoCo）、传感器渲染、向量化环境与学习框架适配。场景与资产的标准化决定了环境能否复用；不同的物理引擎在接触、关节与可变形体上的能力不同。"
          ],
          bullets: [
            "向量化：环境数量与每步计算量决定吞吐量。",
            "传感器：相机、深度、LiDAR 与 IMU 的模拟成本差异很大。",
            "资产：URDF/USD/MJCF 的转换常引入质量与碰撞体误差。"
          ]
        },
        {
          title: "何时值得使用",
          body: [
            "当任务需要百万级交互、可并行评估或危险场景试错时，GPU 仿真价值最大。若任务高度依赖真实接触或人机交互，仿真只能作为预训练与筛选，不能替代真机。"
          ],
          bullets: [
            "适合：运动控制、导航、视觉策略预训练、域随机化。",
            "不适合：精细装配、可变形物体、需要真实人类行为的任务。",
            "成本：GPU 集群、工程维护与仿真调参本身并不便宜。"
          ]
        },
        {
          title: "可信度",
          body: [
            "仿真结果需要校准：比较真实与仿真的轨迹、接触力与传感器统计。没有校准的仿真只能证明「在某个虚拟世界里可行」，不能证明现实可部署。"
          ],
          bullets: [
            "建立真实-仿真对照任务，量化差距。",
            "记录随机化范围与默认参数，保证可复现。",
            "将仿真指标与真机指标并列报告。"
          ]
        }
      ],
      practice: [
        "先确认资产与物理参数可信，再追求环境数量；错误物理下的大规模数据只会放大偏差。",
        "把传感器延迟、噪声与执行器限制纳入仿真，而不是只随机化视觉。",
        "保留真实对照集，防止仿真分数与真机表现脱节。"
      ]
    },
    "simulation:scene-sim": {
      lead: [
        "场景级仿真提供的不只是物理世界，还包括任务、物体语义、布局与成功判定。RoboCasa、Habitat、ManiSkill 等环境让研究者可以在家庭、办公室或厨房中训练和评测长程操作与导航。",
        "与单一刚体环境相比，场景级仿真强调资产多样性、场景生成与任务组合。它更接近通用机器人的测试分布，也更容易出现「只对某个 benchmark 有效」的过拟合。"
      ],
      sections: [
        {
          title: "环境设计",
          body: [
            "一个场景级环境需要物体资产、可交互关节、材质、光照、相机配置与任务脚本。RoboCasa 用可生成厨房与 100+ 任务强调场景多样性；Habitat 侧重真实室内扫描与人类活动；ManiSkill 强调 GPU 并行与技能评测。"
          ],
          bullets: [
            "资产多样性决定策略是否见过不同物体与布局。",
            "任务脚本与成功判定会直接塑造模型行为。",
            "人类示范与语言指令让环境可用于模仿学习。"
          ]
        },
        {
          title: "泛化与过拟合",
          body: [
            "场景级 benchmark 很容易被「场景记忆」攻破：模型可能记住厨房布局而不是学习任务。评测应包含未见布局、未见物体和组合任务，并区分训练分布内与分布外的成功率。"
          ],
          bullets: [
            "随机化布局与物体实例，但保留任务语义。",
            "报告每个任务族的失败模式，而不只给平均分。",
            "避免在测试场景上做大量超参搜索。"
          ]
        },
        {
          title: "从仿真到真实",
          body: [
            "场景级仿真通常不追求像素级真实，而追求任务结构与交互逻辑。迁移到真实环境时，视觉差距、物体物理与传感器噪声需要单独处理；仿真中的成功不能自动转化为真机能力。"
          ],
          bullets: [
            "用真实图像做视觉域适应或渲染增强。",
            "校准关键物体的质量、摩擦与关节阻尼。",
            "在真实场景中重复评测，不依赖一次演示。"
          ]
        }
      ],
      practice: [
        "先定义任务与成功判定，再搭场景；评测协议比资产数量更重要。",
        "为每个任务族保留 held-out 场景，避免场景记忆。",
        "把仿真用作筛选与预训练，真机用作最终验证。"
      ]
    },
    "simulation:real2sim": {
      lead: [
        "Real2Sim 把真实场景或物体转成仿真可用的表示，用于数字孪生、策略训练与规划。它包含几何重建、外观建模、物理参数估计与语义标注，目标不是「看起来像」，而是「交互起来对」。",
        "3D Gaussian Splatting 与 SLAM 提供了快速重建和渲染能力，但重建出的场景往往只有视觉几何，缺少质量、摩擦、关节与可交互性。真正的 Real2Sim 需要把这些物理属性补上。"
      ],
      sections: [
        {
          title: "表示与重建",
          body: [
            "常见表示包括网格、点云、神经辐射场、3D 高斯与场景图。3DGS 渲染快、训练快，适合实时可视化与部分几何处理；隐式场几何平滑但渲染慢；场景图更适合语义查询与任务规划。"
          ],
          bullets: [
            "几何：网格适合碰撞检测，3DGS 适合渲染，两者需要转换与校准。",
            "外观：材质与光照影响视觉策略，但难以从少量视角恢复。",
            "语义：物体标签、可供性与关节结构需要额外标注或识别。"
          ]
        },
        {
          title: "物理对齐",
          body: [
            "视觉重建不会自动给出质量、摩擦、弹性与关节约束。系统辨识需要通过真实交互估计这些参数；对可交互物体，还需要识别关节轴、限位与运动学结构。"
          ],
          bullets: [
            "用真实抓取/推动数据估计质量与摩擦。",
            "对关节物体做运动学建模，而不是当作刚体。",
            "记录不确定性，避免把估计参数当作真值。"
          ]
        },
        {
          title: "适用边界",
          body: [
            "Real2Sim 适合静态场景、数字孪生与视觉策略预训练；对动态人类、可变形物体与复杂接触，当前重建仍不完整。它也无法替代真实硬件测试。"
          ],
          bullets: [
            "透明、反光、薄结构与动态物体重建困难。",
            "渲染真实不等于物理真实。",
            "场景更新成本高，长期维护困难。"
          ]
        }
      ],
      practice: [
        "先明确 Real2Sim 的用途：渲染、碰撞、规划还是训练；不同用途需要不同表示。",
        "把视觉重建与物理参数估计分开评估，不要用一个渲染分数替代物理可信度。",
        "保留真实交互校准集，验证仿真中的接触与运动。"
      ]
    },
    "simulation:sim2real": {
      lead: [
        "Sim2Real 是一组缩小仿真与真实分布差距的方法，而不是一次性的迁移步骤。它涵盖域随机化、系统辨识、传感器建模、残差学习与真机微调。",
        "成功的 Sim2Real 需要知道差距在哪里：是视觉、动力学、延迟，还是任务分布？不同差距对应不同手段，盲目扩大随机化可能让任务变得不可学。"
      ],
      sections: [
        {
          title: "方法工具箱",
          body: [
            "域随机化让训练分布覆盖真实变化；系统辨识用真实数据校准仿真参数；残差学习在仿真策略上学习真实偏差；真机微调用少量真实数据适配策略。它们可以组合使用。"
          ],
          bullets: [
            "随机化参数应与真实变化有物理依据，而不是无限扩大。",
            "系统辨识需要可观测的激励轨迹与可靠的测量。",
            "残差模型依赖真实数据覆盖，外推能力有限。"
          ]
        },
        {
          title: "度量与验证",
          body: [
            "Sim2Real 的论文常报告真机成功率，但很少说明仿真与真实的初始条件、硬件版本与试验次数。可信的验证应给出多场景重复实验、失败分类与与基线方法的对照。"
          ],
          bullets: [
            "报告仿真与真机的性能差，而不只报真机结果。",
            "记录硬件批次、地面材质与电池状态。",
            "把安全违规与硬件损伤纳入指标。"
          ]
        },
        {
          title: "常见误区",
          body: [
            "视觉逼真不等于物理正确；物理正确也不等于任务分布正确。另一个误区是只在仿真中调参，再在真机上做一次演示，缺少对分布外情况的测试。"
          ],
          bullets: [
            "渲染质量与接触精度是两条独立的技术线。",
            "真机评测成本高，但不能用仿真替代最终验证。",
            "一次成功视频不能说明可重复性。"
          ]
        }
      ],
      practice: [
        "先做误差分析，再选 Sim2Real 手段；不要默认域随机化是万能药。",
        "在真机上保留安全约束与人工接管，尤其是高动态动作。",
        "建立真实-仿真对照数据，持续监控迁移质量。"
      ]
    },
    "data:teleop": {
      lead: [
        "真机遥操数据由人类实时操控真实机器人采集，包含本体动作、相机观测、时间同步与真实接触。它是最接近部署分布的机器人数据来源，也是 DROID、Open X-Embodiment、Mobile ALOHA 等数据集与平台的基础。",
        "遥操数据的质量取决于硬件、操作者、任务设计与采集协议。不同机构的机器人、相机与动作空间差异很大，跨机构复用需要统一格式与标定，但不应因此把「跨本体」误认成一种独立的数据来源。"
      ],
      sections: [
        {
          title: "采集接口",
          body: [
            "常见接口包括 VR 手柄、主从机械臂、外骨骼与动作捕捉。VR 直观但缺少力反馈；主从臂精度高但成本高；外骨骼可记录手指动作但穿戴负担大。接口决定了动作空间与操作者的学习曲线。"
          ],
          bullets: [
            "动作表示：关节角、末端位姿、速度或力矩；不同表示影响策略学习。",
            "观测：多相机、深度、腕部相机与本体状态；标定与同步是数据质量核心。",
            "协议：任务脚本、成功判定、重置流程与失败记录决定数据可用性。"
          ]
        },
        {
          title: "规模化与多样性",
          body: [
            "DROID 用统一硬件在 13 家机构、564 个场景中采集 7.6 万条轨迹；Open X-Embodiment 汇总 22 种机器人、100 万+ 轨迹。规模带来多样性，也带来动作空间、相机与标注协议的不一致。"
          ],
          bullets: [
            "跨机构采集需要统一硬件与流程，否则数据难以合并。",
            "场景多样性比单纯重复同一任务更有价值。",
            "语言标注、成功标签与失败片段决定数据能否用于评测。"
          ]
        },
        {
          title: "质量陷阱",
          body: [
            "遥操数据常混入操作者停顿、修正与不自然动作；如果直接做行为克隆，策略会学到抖动与犹豫。时间同步、相机曝光与机械臂延迟也会让观测与动作错位。"
          ],
          bullets: [
            "检查时间戳、丢帧与相机延迟。",
            "清理失败与无效片段，保留恢复片段。",
            "记录硬件版本与标定参数，保证可复现。"
          ]
        }
      ],
      practice: [
        "先统一动作空间、相机配置与采集协议，再追求数据量。",
        "把失败恢复片段当作宝贵数据，而不是全部删除。",
        "为每个数据集记录许可、硬件与采集环境，避免不可用的混合训练。"
      ]
    },
    "data:umi": {
      lead: [
        "UMI 用「人手持夹爪 + 相机 + 离线 SLAM」替代真实机器人采集数据。人在真实场景中操作，系统记录夹爪轨迹、夹爪开合与多视角视觉；随后把相对末端轨迹映射到不同机械臂。",
        "它把数据采集从机器人硬件中解放出来，使厨房、商店、工厂等真实场景可以低成本进入训练集。DexUMI 进一步把手持接口扩展到灵巧手，用外骨骼与视觉替换缩小 embodiment gap。"
      ],
      sections: [
        {
          title: "采集与映射管线",
          body: [
            "核心管线包括相机标定、离线 SLAM、动作延迟补偿、夹爪位姿恢复与相对轨迹提取。策略学习的不是绝对机器人关节角，而是相对于初始位姿的末端轨迹，因此可以迁移到不同臂长与安装方式。"
          ],
          bullets: [
            "SLAM 失败或漂移会直接污染轨迹。",
            "相机与夹爪之间的外参必须精确标定。",
            "动作延迟补偿决定轨迹与视觉是否对齐。"
          ]
        },
        {
          title: "能力与边界",
          body: [
            "UMI 适合抓取、推拉、放置等可由夹爪末端完成的任务；对需要力控、触觉或双手精细协调的任务，手持接口无法完整记录接触信息。它也没有真实机器人本体的动力学约束。"
          ],
          bullets: [
            "缺少力/触觉反馈，接触丰富任务受限。",
            "夹爪形态与机器人夹爪不同，映射存在误差。",
            "场景中的动态变化与人类干预会影响采集质量。"
          ]
        },
        {
          title: "DexUMI 与灵巧手",
          body: [
            "DexUMI 用外骨骼记录手指动作，并把视频中的人手替换成目标机器人手。运动学对齐与视觉对齐缺一不可；否则策略会在部署时看到不同的手部形态。"
          ],
          bullets: [
            "外骨骼需要适配不同人手尺寸与目标灵巧手。",
            "机器人手 inpaint 可能引入视觉伪影。",
            "精细接触与力反馈仍是开放问题。"
          ]
        }
      ],
      practice: [
        "先验证 SLAM 与相机标定，再批量采集；错误标定会让整批数据不可用。",
        "记录采集设备、夹爪尺寸与环境，便于跨数据集复用。",
        "把手持数据当作预训练/规模化来源，真机数据用于最终对齐。"
      ]
    },
    "data:ego": {
      lead: [
        "EGO 数据指第一人称人类视角的视频与动作数据，通常结合手部追踪、头部位姿与场景几何。它的规模远大于机器人遥操数据，场景与任务也更丰富，但缺少机器人动作与本体动力学。",
        "代表资源包括 Ego4D 与 EgoDex；代表方法包括 EgoMimic 与 EgoVLA。核心挑战是 embodiment gap：如何把人类手部动作重定向到机器人，并让视觉观测与机器人视角一致。"
      ],
      sections: [
        {
          title: "从视频到动作监督",
          body: [
            "仅有视频只能提供视觉预训练；要有动作监督，需要手部 3D 追踪、相机位姿与场景尺度。EgoDex 用头显在采集时记录双手关节；EgoMimic 用 Project Aria 与手部追踪；EgoVLA 则预测手腕/手指动作再做 IK 与重定向。"
          ],
          bullets: [
            "手部追踪精度决定动作监督质量。",
            "头部位姿与场景尺度决定动作能否映射到机器人坐标系。",
            "第一人称相机与机器人相机的位置/视野差异会造成视觉分布偏移。"
          ]
        },
        {
          title: "重定向与视觉对齐",
          body: [
            "人类手与机器人夹爪/灵巧手在自由度、尺寸与接触方式上不同。重定向需要求解运动学映射，并处理不可达姿态；视觉对齐则需要替换人手、匹配相机参数或做域适应。"
          ],
          bullets: [
            "人手到灵巧手：关节映射与接触点保持。",
            "人手到夹爪：抓取意图与开合宽度映射。",
            "视觉替换：机器人手 inpaint 或渲染，减少训练/部署差异。"
          ]
        },
        {
          title: "规模化的代价",
          body: [
            "EGO 数据可以被动采集，但高质量手部标注仍需要专用设备与流程。数据规模大不代表任务分布正确；大量日常视频可能集中在少数场景与物体上，且缺少失败标签与力信息。"
          ],
          bullets: [
            "隐私与许可：第一人称视频常包含人脸、家庭环境与敏感信息。",
            "任务偏差：视频内容由采集者选择，未必覆盖机器人目标。",
            "缺少力/触觉，精细接触任务仍需真机数据补齐。"
          ]
        }
      ],
      practice: [
        "先确认手部追踪与相机标定质量，再谈数据规模。",
        "把人类视频当作预训练与先验来源，用少量真机数据做最终对齐。",
        "对第一人称视频做隐私审查与脱敏，明确数据许可。"
      ]
    },
    "data:engine-eval": {
      lead: [
        "数据引擎负责把少量真实示范放大成可训练的数据，评测负责判断这些数据是否真的带来能力。MimicGen 通过子任务变换生成大量仿真示范，LIBERO、CALVIN、SimplerEnv 与 RoboArena 则从不同角度评测策略。",
        "数据与评测不能彼此独立：如果训练数据与测试任务共享同一偏差，分数会虚高。好的评测应包含分布内、分布外、长程组合与真机验证，并明确任务、指标与失败判定。"
      ],
      sections: [
        {
          title: "数据引擎",
          body: [
            "MimicGen 把人类示范拆成以物体为中心的子任务，通过变换物体与场景让机器人在仿真中重新执行，从而批量生成示范。它的关键是可重规划的环境与正确的子任务边界，而不是简单的图像增广。"
          ],
          bullets: [
            "变换物体/场景，保留任务意图与接触结构。",
            "在仿真中重执行，自动获得动作标签。",
            "生成数据的偏置继承自源示范，不能替代真实分布。"
          ]
        },
        {
          title: "基准与真机评测",
          body: [
            "LIBERO 评测语言条件操作与知识迁移，CALVIN 强调长程连续指令，SimplerEnv 用真实视频对齐仿真评测，RoboArena 则把评测搬到多个机构的真机上进行双盲成对比较。"
          ],
          bullets: [
            "固定基准便于比较，但容易被过拟合。",
            "仿真评测便宜、可重复，但与真实存在差距。",
            "真机盲测更可信，但成本高、统计功效有限。"
          ]
        },
        {
          title: "如何避免自证",
          body: [
            "在同一 benchmark 上反复调参，会把测试集变成训练集。应保留 held-out 任务/场景，报告多次运行方差，并区分「在分布内更好」与「在新分布上更好」。"
          ],
          bullets: [
            "把测试场景与超参搜索隔离。",
            "同时报告平均分与失败任务清单。",
            "用独立机构或盲测复核关键结论。"
          ]
        }
      ],
      practice: [
        "先明确要证明什么能力，再选 benchmark；不要用平均分掩盖关键失败。",
        "数据生成与评测要使用不同的场景/物体来源，减少泄漏。",
        "把真机验证当作最终证据，而不是可选的补充。"
      ]
    },
    "hardware:dexterous-hand": {
      lead: [
        "灵巧手是机器人操作中自由度最密集的硬件。多根手指、多个关节、肌腱或连杆传动，使机器人可以在不移动整条手臂的情况下改变物体的位姿；代价是驱动、传感、控制与维护的复杂度同时上升。",
        "本路线关注的不是「手指数越多越好」，而是自由度、驱动方式、传动刚度、传感、成本与可维护性的组合。一个适合学习研究的手，必须在可复制性、耐用性和可感知性之间做出清晰取舍。"
      ],
      sections: [
        {
          title: "自由度与驱动架构",
          body: [
            "全驱动手为每个关节配置独立电机，控制精度高但体积、成本与布线复杂；欠驱动手用更少电机通过腱绳、连杆或差动机构驱动多个关节，结构更轻、更耐用，却牺牲了独立控制能力。低减速比准直驱与高减速比舵机代表了两种不同的带宽、反驱与成本取舍。"
          ],
          bullets: [
            "连杆传动刚性好、易建模，但惯性与空间占用大。",
            "腱绳传动可以把手部质量前移，但存在磨损、预紧与迟滞。",
            "欠驱动适合抓取与自适应包络，全驱动适合精细手内操作。"
          ]
        },
        {
          title: "传感与接触",
          body: [
            "灵巧操作需要知道手指与物体之间的接触位置、法向力与滑动趋势。没有触觉时，策略只能依赖视觉与关节电流间接推断接触，透明、柔软或遮挡严重的物体尤其困难。触觉阵列的密度、耐用性和布线又是新的工程约束。"
          ],
          bullets: [
            "关节编码器提供位置闭环，但不等于接触信息。",
            "力矩/电流估计成本低，受摩擦与温度漂移影响。",
            "视触觉与触觉阵列信息丰富，但标定和耐久性是瓶颈。"
          ]
        },
        {
          title: "成本与可复制性",
          body: [
            "灵巧手长期是昂贵且脆弱的实验设备。低成本开源方案的意义不只是省钱，而是允许一只机器人在多个任务、多个实验室间并行采集数据，并在损坏后快速替换。代价是精度、背隙、热管理与寿命需要更认真管理。"
          ],
          bullets: [
            "3D 打印结构与舵机方案适合教学和批量实验。",
            "工业级手在重复定位、负载与寿命上仍不可替代。",
            "开源模型与仿真模型决定硬件能否被策略研究复用。"
          ]
        }
      ],
      practice: [
        "先明确任务是抓取包络还是手内精细操作，再决定自由度与驱动架构。",
        "把触觉和关节力矩的标定纳入数据采集流程，不要假设电流等于接触力。",
        "低成本手要准备备件与快速更换流程，否则实验进度会被维修拖垮。"
      ]
    },
    "hardware:robotic-arm": {
      lead: [
        "机械臂是操作研究最成熟的硬件形态：串联连杆提供大工作空间，关节伺服提供可重复的定位，末端可以搭载夹爪、灵巧手或传感器。它的设计问题集中在自由度、负载、精度、速度、力控与安全性之间。",
        "协作臂与工业臂的分野不是外观，而是力感知、碰撞检测、安全认证与人机共处的设计目标。对具身智能研究而言，开放的低层控制接口和可靠的力矩传感往往比绝对定位精度更重要。"
      ],
      sections: [
        {
          title: "自由度与工作空间",
          body: [
            "6 自由度足以在可达空间内确定末端位姿，7 自由度冗余则允许在保持末端位姿的同时调整肘部、避障或优化关节力矩。自由度增加带来更灵活的姿态调整，也带来逆运动学多解、奇异位形与标定复杂度。"
          ],
          bullets: [
            "臂展与负载决定能覆盖的桌面、货架或移动平台尺寸。",
            "冗余自由度可以改善避障与关节限位，但控制与规划更复杂。",
            "末端工具、相机与线缆会增加惯量并改变可达空间。"
          ]
        },
        {
          title: "力控、精度与安全",
          body: [
            "传统位置控制追求重复定位精度，力控协作臂则强调对外力的感知与顺应。关节力矩传感、电流估计与末端六维力传感各有带宽和成本差异。安全功能需要独立于学习策略，包括碰撞检测、力矩限幅、速度限制与急停。"
          ],
          bullets: [
            "重复定位精度不等于绝对精度，标定与热漂移会改变实际误差。",
            "力控带宽受传动刚度、传感噪声与控制频率限制。",
            "协作安全认证是整机系统属性，不是单个算法能替代的。"
          ]
        },
        {
          title: "研究平台的选择",
          body: [
            "选择机械臂时，应同时看控制接口、力矩传感、负载、维护与社区生态。一个接口开放、文档完整、零件可替换的 7 自由度臂，往往比参数更漂亮但封闭的工业臂更适合算法研究。"
          ],
          bullets: [
            "确认能否以足够频率读取关节状态并下发力矩或位置。",
            "确认负载余量足以搭载相机、夹爪与线缆。",
            "确认安全限制、碰撞检测和急停在底层可靠生效。"
          ]
        }
      ],
      practice: [
        "先做运动学标定与相机外参标定，再比较策略；机械臂误差会直接污染数据。",
        "在接触任务中优先使用力矩/阻抗控制接口，而不是把位置控制当作万能底层。",
        "为每台机械臂记录维护、碰撞与负载历史，硬件状态会改变策略表现。"
      ]
    },
    "hardware:humanoid": {
      lead: [
        "人形机器人把双臂、双腿、躯干与头部装进一个拟人身体，试图直接复用为人设计的环境、工具与示范。它的吸引力在于形态通用性，难点在于高维欠驱动、双足平衡、功耗、成本与安全。",
        "人形硬件不是一个单一规格：自由度从二十余到四十余不等，手、腰、腕与踝的配置差异很大。研究者需要区分演示视频中的极限能力与可重复、可维护的日常能力。"
      ],
      sections: [
        {
          title: "身体结构与自由度",
          body: [
            "人形平台通常在双腿、双臂、腰部与颈部配置数十个自由度。更多自由度带来更丰富的姿态与操作空间，也带来更复杂的动力学、更高的功耗和更难的关节协调。足端、髋关节与膝关节的执行器选型直接决定行走、蹲起与抗扰能力。"
          ],
          bullets: [
            "腿部执行器决定平衡、负载与动态运动上限。",
            "腰部自由度影响全身操作与重心调整。",
            "手部配置决定精细操作能力，也显著影响成本与维护。"
          ]
        },
        {
          title: "感知、计算与安全",
          body: [
            "人形平台需要 IMU、关节编码器、相机与可选的 LiDAR 来做状态估计和感知。机载计算、散热与供电是经常被低估的工程问题。高动态动作必须配合安全绳、限位、急停与人工接管，不能只依赖策略的自我判断。"
          ],
          bullets: [
            "IMU 与足端接触估计是平衡控制的基础。",
            "相机位置、视野与线缆会影响视觉策略的可迁移性。",
            "电池、散热与关节寿命决定连续实验的可持续性。"
          ]
        },
        {
          title: "平台选择与评测",
          body: [
            "选择人形平台时，应关注可维护性、开放接口、备件供应与社区生态，而不只是自由度数量。评测应包含长时间站立、负载行走、跌倒恢复与维修成本；单次后空翻或舞蹈视频不能代表通用能力。"
          ],
          bullets: [
            "确认厂商是否提供底层关节控制与状态读取。",
            "确认关键结构件与执行器能否单独更换。",
            "把安全测试与硬件磨损纳入实验预算。"
          ]
        }
      ],
      practice: [
        "先建立可靠的状态估计与急停链路，再尝试高动态动作。",
        "为每类动作记录关节温度、电流与磨损，硬件退化会改变策略。",
        "不要用一次演示视频代替多任务、多场景的统计评测。"
      ]
    },
    "hardware:wheeled": {
      lead: [
        "轮式机器人用轮子与地面的持续接触换取稳定、高效、低成本的移动。差速、全向、麦轮与阿克曼等底盘形式对应不同的运动约束、载荷与地形适应性。",
        "在室内导航、仓储、教育与服务机器人中，轮式平台往往是最现实的部署形态。它的限制也清晰：台阶、楼梯、松软地面与复杂非结构化地形需要腿足或其他移动方式补足。"
      ],
      sections: [
        {
          title: "底盘运动学",
          body: [
            "差速底盘不能瞬时侧移，但结构简单、载荷能力强；全向轮与麦轮可以横移与原地旋转，却牺牲效率、越障与对地面平整度的适应性。运动学约束会直接影响导航策略的动作空间与轨迹可行性。"
          ],
          bullets: [
            "差速：控制简单、效率高，适合走廊与大空间。",
            "全向/麦轮：机动性强，对地面与轮面磨损敏感。",
            "阿克曼：高速稳定，适合室外道路，但转弯半径大。"
          ]
        },
        {
          title: "感知与导航栈",
          body: [
            "轮式平台通常搭载 2D LiDAR、深度相机、IMU 与轮式里程计。建图、定位、局部避障与全局规划构成完整的导航栈。平台是否提供 ROS 2/ROS 1 驱动、时间同步与仿真模型，往往比额外传感器更能决定研究效率。"
          ],
          bullets: [
            "2D LiDAR 适合平面建图，深度相机补充三维障碍与语义。",
            "轮式里程计会漂移，需要视觉/激光定位融合。",
            "机载算力、网络与供电决定能否运行大型感知模型。"
          ]
        },
        {
          title: "载荷、地形与部署",
          body: [
            "轮式平台的优势在稳定与可维护，局限在地形。选型时要看负载余量、越障高度、续航与实际运行环境；在实验室地毯上表现良好的底盘，未必能适应斜坡、门槛或室外路面。"
          ],
          bullets: [
            "负载要包含机械臂、相机、计算与电池，不只看标称值。",
            "门槛、线缆与地毯会改变轮式平台的通过性。",
            "长时间运行需要热管理与可更换电池方案。"
          ]
        }
      ],
      practice: [
        "先标定轮距、轮径与里程计，再调导航；底盘参数错误会让建图与定位持续漂移。",
        "根据地面材质选择轮胎与悬挂，不要只在实验室平地测试。",
        "把急停、防跌落与远程接管作为轮式平台的最低配置。"
      ]
    },
    "hardware:sensors-actuators": {
      lead: [
        "传感器与执行器是所有机器人形态共同的物理接口。编码器把关节位置变成可读信号，IMU 提供姿态与加速度，力矩/触觉传感把接触变成反馈，执行器则把控制指令变成力与运动。",
        "高带宽力控、低惯量、可反驱与低成本之间很少能同时满足。执行器与传感的选型会决定控制器的带宽、策略的安全边界，以及整台机器人能否被精确建模。"
      ],
      sections: [
        {
          title: "执行器与传动",
          body: [
            "高减速比舵机或谐波减速器提供大力矩和低背隙，但摩擦大、反驱差；准直驱执行器用低减速比换取透明反驱与力控带宽，却需要更精密的电流环和更强的散热。弹性执行器进一步引入串联弹性，以带宽换取柔顺与冲击保护。"
          ],
          bullets: [
            "减速比越高，力矩密度越高，反驱与力控透明度越低。",
            "准直驱强调带宽、反驱和碰撞柔顺，适合腿足与协作。",
            "串联弹性执行器能储放能量，但控制模型更复杂。"
          ]
        },
        {
          title: "传感与状态估计",
          body: [
            "编码器、IMU、力矩与触觉传感器各自有噪声、漂移、带宽和标定问题。真正的状态估计不是把传感器读数直接拼接，而是用模型、滤波与时间同步把它们融合成可用的关节状态、基座位姿与接触估计。"
          ],
          bullets: [
            "IMU 高频但会漂移，需要与视觉/轮式/足端接触融合。",
            "关节力矩可由电流估计，但摩擦、温漂与减速器效率会引入偏差。",
            "触觉阵列提供接触位置与力分布，但标定与耐久性仍是难题。"
          ]
        },
        {
          title: "接口与时序",
          body: [
            "执行器与传感器之间的时间同步会直接影响控制稳定性。CAN、EtherCAT、SPI 与以太网的带宽、延迟和确定性不同；一个高带宽控制器如果拿到的状态已经延迟数毫秒，闭环性能会明显下降。"
          ],
          bullets: [
            "确认控制周期、通信周期与传感器采样率是否匹配。",
            "为每个关节记录延迟、零位与方向，避免多关节协同误差。",
            "把急停与过流/过温保护放在独立于主控的硬件层。"
          ]
        }
      ],
      practice: [
        "先做零位、方向、延迟和电流-力矩标定，再运行任何学习策略。",
        "把执行器温度、电流与故障计数纳入日志，硬件退化常被误判为模型退化。",
        "优先选择有备件、有文档、可替换的传感器与执行器，避免单点依赖。"
      ]
    },
    "control:feedback": {
      lead: [
        "反馈控制利用测量到的误差不断修正输入，使系统在模型不精确、存在扰动时仍然保持稳定。PID 是最常见的实现，但比例、积分、微分背后的稳定性、带宽与延迟问题适用于所有闭环系统。",
        "对具身系统而言，反馈控制是学习策略与真实执行器之间的基础层。一个 VLA 输出目标位姿，底层仍然需要关节伺服、速度环或力矩环把它变成可执行指令；忽略这一层，策略评估会混入大量控制误差。"
      ],
      sections: [
        {
          title: "稳定性与带宽",
          body: [
            "闭环系统的响应速度受带宽限制，而带宽又受执行器动力学、传感噪声、采样延迟与结构共振限制。增益过高会让系统振荡甚至失稳，过低则跟踪迟缓。频域分析、相位裕度与延迟预算比单纯试凑增益更能解释真机问题。"
          ],
          bullets: [
            "延迟会侵蚀相位裕度，是高频振荡的常见原因。",
            "积分项能消除稳态误差，也会带来超调与饱和风险。",
            "微分项对噪声敏感，通常需要滤波与合理采样。"
          ]
        },
        {
          title: "从关节环到任务环",
          body: [
            "机器人控制通常分层：电流/力矩环、速度环、位置环、任务空间控制器。学习策略可以在任务层输出目标，也可以直接输出低层动作；层数越高，学习问题越抽象，但底层控制误差也越容易被掩盖。"
          ],
          bullets: [
            "关节伺服负责快速、可靠的本地跟踪。",
            "任务空间控制把末端目标转为关节指令，需处理奇异与限位。",
            "学习策略与底层控制器的频率、单位和延迟必须明确对齐。"
          ]
        },
        {
          title: "工程边界",
          body: [
            "PID 不是万能的：强非线性、强耦合、接触切换与大延迟系统需要 MPC、阻抗控制或学习控制。工程上更重要的是抗积分饱和、限幅、滤波、故障检测与增益调度，而不是不断加复杂项。"
          ],
          bullets: [
            "执行器饱和时继续积分会造成长时间过冲。",
            "模式切换（自由/接触、空载/负载）需要不同增益或控制器。",
            "安全限位与急停必须独立于主控制回路。"
          ]
        }
      ],
      practice: [
        "先测量延迟、采样率、饱和限与噪声，再设计增益；参数不是从教材直接抄。",
        "把控制误差与策略误差分开记录，避免把底层跟踪问题误判为模型问题。",
        "在真机上永远保留硬限位、过流保护与物理急停。"
      ]
    },
    "control:optimal-mpc": {
      lead: [
        "最优控制把动作选择写成代价最小化问题，MPC 在此基础上加入滚动时域与约束：每步预测未来、求解控制序列、只执行第一步。它把任务目标、动力学与物理限制放在同一个优化框架里。",
        "LQR 处理无约束线性二次问题，iLQR 处理非线性轨迹优化，MPC 进一步引入输入/状态约束与接触。它们的共同难点是模型精度、求解时间与约束可行性；在真实机器人上，实时性往往比最优性更关键。"
      ],
      sections: [
        {
          title: "问题结构与算法",
          body: [
            "MPC 的性能取决于预测模型、代价函数、时域长度与求解器。线性 MPC 可以快速求解，非线性 MPC 更准确但计算昂贵；接触切换是混合整数/非光滑问题，通常需要简化或分层处理。"
          ],
          bullets: [
            "时域太短看不到未来，太长则求解慢且模型误差累积。",
            "代价函数要平衡任务误差、控制努力与平滑性。",
            "约束可行性比单纯降低代价更重要，必要时需要松弛。"
          ]
        },
        {
          title: "与学习的接口",
          body: [
            "学习策略可以提供目标、代价权重或初始轨迹，MPC 负责满足动力学与约束。反过来，MPC 也可以生成示范数据供策略学习。两者结合的关键是频率分层：学习层慢、优化层中速、执行器快。"
          ],
          bullets: [
            "把学习输出作为参考轨迹，而不是直接执行。",
            "让 MPC 处理碰撞、力矩与关节限位等硬约束。",
            "记录求解时间与失败率，避免控制周期被优化器拖垮。"
          ]
        },
        {
          title: "真实部署风险",
          body: [
            "模型误差、延迟与外部扰动会让预测偏离。滚动重算可以补偿一部分，但不能保证约束在真实系统中始终满足。接触丰富任务还需要力控、阻抗或安全滤波器作为补充。"
          ],
          bullets: [
            "模型参数不准会导致约束违反或保守行为。",
            "求解超时会让控制周期抖动，必须设计降级策略。",
            "非凸接触问题不适合直接套用标准 MPC。"
          ]
        }
      ],
      practice: [
        "先在线性/低维系统验证 MPC，再上高维机器人；不要用复杂系统调试基础错误。",
        "明确控制周期与求解预算，准备超时后的安全回退。",
        "把 MPC 与 PID/阻抗控制分层组合，而不是让一个优化器承担全部任务。"
      ]
    },
    "control:force-impedance": {
      lead: [
        "位置控制假设机器人应该到达某个点，阻抗控制则规定机器人与环境接触时呈现的「质量-弹簧-阻尼」关系。它允许位置偏差来换取柔顺、稳定接触与更低的冲击。",
        "在抓取、装配、擦拭、人机交互中，接触力往往比位置更重要。阻抗/导纳控制提供了可调的物理交互接口；难点是环境刚度未知、力传感噪声、延迟与接触切换。"
      ],
      sections: [
        {
          title: "阻抗与导纳",
          body: [
            "阻抗控制测量运动、输出力，适合力矩控制机器人；导纳控制测量力、输出位置修正，适合位置控制接口。两者是同一交互关系的不同因果方向，选择取决于硬件接口与传感器。"
          ],
          bullets: [
            "刚度决定机器人抵抗环境变形的程度。",
            "阻尼影响接触稳定与能量耗散。",
            "虚拟质量在高加速或接触切换时影响稳定性。"
          ]
        },
        {
          title: "接触稳定性",
          body: [
            "环境刚度、传感延迟与控制带宽共同决定稳定接触的可用参数范围。过高的刚度会引发振荡，过低的刚度会让机器人无法施加足够力。接触切换时还需要平滑过渡与状态估计。"
          ],
          bullets: [
            "力传感器噪声与滤波延迟会限制可用增益。",
            "环境刚度未知时，固定阻抗难以覆盖所有接触。",
            "从自由空间进入接触需要软着陆与模式切换逻辑。"
          ]
        },
        {
          title: "与学习策略组合",
          body: [
            "学习策略可以输出期望力、阻抗参数或接触阶段，阻抗控制器负责稳定执行。这样策略不必学习高频力控，但仍需要理解接触阶段与硬件限制。"
          ],
          bullets: [
            "让策略输出任务层参数，把高频闭环留给阻抗控制器。",
            "在数据采集中记录力/位关系，否则策略无法学习接触。",
            "安全边界仍要独立设置，不能只依赖柔顺控制。"
          ]
        }
      ],
      practice: [
        "先辨识环境刚度与传感延迟，再调阻抗参数；不要只凭手感。",
        "对接触阶段做明确的状态机与软着陆，避免硬切换。",
        "把力传感、关节力矩与电流估计交叉校验，单一信号可能漂移。"
      ]
    },
    "control:learning-control": {
      lead: [
        "学习控制用数据改进反馈策略、残差模型或自适应参数，同时保留闭环结构与稳定性考量。它不同于纯端到端模仿：学习部分通常只补偿模型不知道的残差，或在线调整少量参数。",
        "Neural-Fly 是一个代表性例子：标称动力学提供基础，神经网络学习气动残差，在线更新最后一层适应风场。它说明「先验模型 + 学习 + 在线适应」可能比纯黑箱更数据高效、更可解释。"
      ],
      sections: [
        {
          title: "残差学习与自适应",
          body: [
            "残差学习把已知模型与学习模型并联，让网络只学习未建模动力学；自适应控制则在线调整参数以跟踪变化。两者都需要可靠的基线控制器与足够的激励信号，否则学习部分可能学到噪声或与基线冲突。"
          ],
          bullets: [
            "基线模型越可靠，残差学习的数据需求越小。",
            "在线适应需要持续观测与稳定更新，否则可能发散。",
            "训练分布外的风、负载或接触变化仍是主要风险。"
          ]
        },
        {
          title: "稳定性与泛化",
          body: [
            "纯监督学习不保证闭环稳定。学习控制器需要额外的稳定性分析、安全约束或保守的基线控制。泛化不仅取决于网络容量，还取决于训练数据覆盖的动力学范围与在线适应机制。"
          ],
          bullets: [
            "用 Lyapunov、CBF 或鲁棒控制给出可验证边界。",
            "在训练中注入扰动与延迟，测试闭环鲁棒性。",
            "保留基线控制器作为降级与回退方案。"
          ]
        },
        {
          title: "从飞行到操作",
          body: [
            "无人机的学习控制相对成熟，因为动力学可观测、试错成本较低；机械臂与足式机器人接触频繁、硬件昂贵，迁移需要重新设计残差结构与安全层。学习控制不是把控制问题变成回归问题，而是把数据放进闭环。"
          ],
          bullets: [
            "接触动力学难以用简单残差表示，需要结构化模型。",
            "真实硬件试错成本高，仿真预训练与安全探索必不可少。",
            "在线学习需要故障检测，避免错误更新累积。"
          ]
        }
      ],
      practice: [
        "先建立一个能稳定工作的基线控制器，再让学习部分只做残差。",
        "记录训练分布、在线更新与失败模式，避免把适应失败误判为模型容量不足。",
        "在真实系统上保留安全滤波器与人工接管。"
      ]
    },
    "control:safety": {
      lead: [
        "安全控制研究如何把「不要进入危险状态」从奖励惩罚变成可验证的约束。控制障碍函数（CBF）用一个标量函数定义安全集，并要求系统轨迹始终留在其中；安全滤波器则在候选动作附近求最小修正。",
        "学习策略可以提供高性能，但不能保证不撞人、不超力矩、不进入不可恢复状态。安全层必须独立于策略，并在模型不确定、传感器故障与输入受限时仍能降级。"
      ],
      sections: [
        {
          title: "CBF 与不变集",
          body: [
            "CBF 通过约束 h 的导数保证安全集的前向不变性。对高相对度系统需要高阶 CBF；多约束系统需要 QP 同时满足多个条件。形式化保证依赖模型准确性、初始状态安全与约束可行。"
          ],
          bullets: [
            "安全集要覆盖真实风险，而不是只覆盖容易建模的障碍物。",
            "模型误差会破坏形式保证，需要鲁棒或自适应扩展。",
            "输入受限时 QP 可能无解，必须有回退策略。"
          ]
        },
        {
          title: "安全滤波器",
          body: [
            "把学习策略的输出作为候选动作，安全 QP 在最小修改的前提下满足约束。它可以在不重新训练策略的情况下提供安全层，但会增加计算延迟，并可能让策略行为变得保守或不可预测。"
          ],
          bullets: [
            "滤波器频率必须匹配控制周期，否则约束会在两次求解之间被违反。",
            "最小修改目标要平衡任务性能与安全裕度。",
            "对不可行状态要有明确的降级/急停策略。"
          ]
        },
        {
          title: "人机与复杂环境",
          body: [
            "人类行为、柔软物体与复杂接触很难用简单不等式描述。实际系统通常组合 CBF、速度/力矩限制、地理围栏、视觉监控与硬件急停，不存在单一算法保证所有安全。"
          ],
          bullets: [
            "人的意图不可完全预测，需要保守裕度与多传感器确认。",
            "柔软物体和可变形环境的安全集难以精确建模。",
            "安全认证是系统级工程，不是论文算法能单独完成的。"
          ]
        }
      ],
      practice: [
        "先列出不可接受状态与硬件急停条件，再选择 CBF/安全滤波实现。",
        "在仿真中注入模型误差、延迟与传感器故障，测试安全层的降级行为。",
        "不要把安全责任交给学习策略的自我评估。"
      ]
    }
  };

  const DOMAIN_DETAILS = {
    navigation: {
      openProblems: [
        "开放词汇目标与长尾场景：如何可靠确认「那个东西」就是用户说的目标？",
        "动态人类社会性：预测、规范、隐私与安全如何进入同一个决策闭环？",
        "长期自主：真实家庭与城市尺度下的地图维护、重定位与跨楼层导航仍缺少可信评测。"
      ],
      readingGuide: "先区分目标形式（坐标、类别、语言），再看系统是否显式建图，最后判断评测是在离散图还是连续环境中完成。"
    },
    manipulation: {
      openProblems: [
        "跨本体的动作表示：不同手、臂与相机如何共享同一个策略，而不把差异抹平成噪声？",
        "接触丰富任务：力/触觉反馈、可变形物体与高精度装配仍远未被解决。",
        "长程可靠性与恢复：策略能否知道自己在失败，并安全地重试或请求帮助？",
        "评测可信度：从少量真机演示到可复现的统计结论，中间缺少标准化基础设施。"
      ],
      readingGuide: "先看它解决哪类失败（数据、泛化、接触还是长程），再看方法是否真的改变了对应瓶颈，而不是只看模型规模。"
    },
    "loco-manipulation": {
      openProblems: [
        "全身控制与基础模型的接口：语言/视觉意图如何变成物理可行的全身动作？",
        "人形数据与安全：真机昂贵、危险且数据稀缺，如何建立可复现的评测？",
        "移动与操作的联合任务：现有 benchmark 常把两者分开测，缺少真实的耦合任务。"
      ],
      readingGuide: "先确认平台（四足/人形/移动臂）和控制接口，再判断它是运动控制、操作策略还是端到端基础模型。"
    },
    simulation: {
      openProblems: [
        "接触物理：可变形体、摩擦、间隙与执行器延迟的仿真精度仍不足。",
        "真实差距的量化：如何知道仿真在哪一层不真，并把差距纳入训练目标？",
        "场景过拟合：任务级 benchmark 容易被场景记忆攻破，需要更严格的 held-out 协议。"
      ],
      readingGuide: "先问「仿真器要解决什么问题」：吞吐、接触、场景还是 Real2Sim；不同目标不能只看环境数量。"
    },
    data: {
      openProblems: [
        "采集接口的统一：真机遥操、UMI 与 EGO 的时间、动作和观测如何互操作？",
        "质量与许可：数据质量参差、隐私与商用许可复杂，混合训练缺少标准。",
        "可信评测：固定 benchmark 容易过拟合，分布式真机评测又难扩展。"
      ],
      readingGuide: "先看数据由什么接口采集，再看它能否提供可执行的机器人动作；最后检查数据许可与评测协议。"
    },
    hardware: {
      openProblems: [
        "形态与通用性：人形、轮式、机械臂与灵巧手各自适配什么任务，是否存在真正通用的硬件形态？",
        "成本、可靠性与可维护性：低成本平台如何在不牺牲实验可重复性的前提下进入更多实验室？",
        "传感与执行器：高带宽力控、触觉与耐用性如何同时满足，而不是只在 demo 中成立？",
        "评测标准：硬件的精度、负载、带宽、寿命与安全应如何被标准化报告？"
      ],
      readingGuide: "先看形态与自由度，再看驱动、传感、载荷和维护成本；不要只比较参数表，硬件要放回具体任务与实验流程里评估。"
    },
    control: {
      openProblems: [
        "学习与经典控制的接口：学习策略输出什么、底层控制器保证什么，仍需统一设计。",
        "约束与实时性：在接触切换、延迟与输入受限下，如何保证安全约束始终可行？",
        "可验证性：学习控制器的稳定性与泛化能否从实验成功走向可证明的边界？",
        "硬件差异：同一控制算法在不同执行器、传感与结构上的迁移仍需要大量系统辨识。"
      ],
      readingGuide: "先区分反馈、最优、力/阻抗、学习与安全五层，再看论文解决的是稳定性、约束、接触还是数据效率；控制问题很少只靠一个算法解决。"
    }
  };

  DOMAINS.forEach(domain => {
    domain.routes.forEach(route => {
      const details = ROUTE_DETAILS[`${domain.id}:${route.id}`];
      if (!details) throw new Error(`Missing route details: ${domain.id}:${route.id}`);
      Object.assign(route, details);
    });
    Object.assign(domain, DOMAIN_DETAILS[domain.id] || {});
  });

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
    benchmark: "基准",
    platform: "平台 / 硬件"
  };

  return { DOMAINS, ENTRIES, PATHS, RESOURCES, TYPE_LABELS };
})();
