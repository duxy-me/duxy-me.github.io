import photoUrl from '../assets/photo.jpg'

export type Locale = 'en' | 'zh'

export interface SiteProfile {
  name: string
  title: string
  affiliation: string
  affiliationUrl: string
  email: string
  photoUrl: string
  bio: string
}

export interface SiteCredit {
  label: string
  url: string
}

export interface SiteNote {
  lastUpdateLabel: string
  lastUpdate: string
  creditIntro: string
  creditSeparator: string
  closingMark: string
  credits: SiteCredit[]
}

export interface SiteContent {
  profile: SiteProfile
  projectsTitle: string
  projects: string[]
  awardsTitle: string
  awards: string[]
  supervisionTitle: string
  supervision: string[]
  professionalServicesTitle: string
  professionalServices: string[]
  teachingTitle: string
  teaching: string[]
  siteNote: SiteNote
}

const credits: SiteCredit[] = [
  {
    label: 'Jon Barron',
    url: 'https://jonbarron.info/',
  },
  {
    label: 'Yixuan Li',
    url: 'https://yxli2123.github.io/',
  },
]

export const siteContentByLocale: Record<Locale, SiteContent> = {
  en: {
    profile: {
      name: 'Xiaoyu Du',
      title: 'Associate Professor (Ph.D. Supervisor)',
      affiliation: 'Nanjing University of Science and Technology',
      affiliationUrl: 'http://www.njust.edu.cn',
      email: 'duxy@njust.edu.cn',
      photoUrl,
      bio: 'Xiaoyu Du is an associate professor and a supervisor of doctoral and master’s students in the School of Computer Science and Engineering at Nanjing University of Science and Technology (NJUST), and a member of the Intelligent Media Analysis Group (IMAG). He was a postdoctoral research fellow at the NExT++ Center, National University of Singapore, working with Prof. Tat-Seng Chua. He received his Ph.D. in computer science and technology from the University of Electronic Science and Technology of China under the supervision of Prof. Jinhui Tang, and his master’s and bachelor’s degrees from Beijing Normal University under the supervision of Prof. Su Feng. His research interests include multimodal content understanding and generation, and multimodal information retrieval and recommendation.',
    },
    professionalServicesTitle: 'Professional Services',
    professionalServices: [
      'Executive Committee Member, Multimedia Technical Committee, China Computer Federation (CCF)',
      'Committee Member, Open Source Intelligence Technical Committee, Chinese Information Processing Society of China',
      'Secretary-General, Digital Intelligence Technology and Industry Committee, Nanjing Western Returned Scholars Association',
      'Think Tank Expert, Jiangsu Society of Digital Economy',
      'PC Member for ACM International Conference on Multimedia (MM)',
      'PC Member for International Joint Conference on Artificial Intelligence (IJCAI)',
      'PC Member for The ACM Web Conference (WWW)',
      'PC Member for AAAI Conference on Artificial Intelligence (AAAI)',
      'PC Member for Annual Meeting of the Association for Computational Linguistics (ACL)',
      'PC Member for International ACM SIGIR Conference on Research and Development in Information Retrieval (SIGIR)',
      'PC Member for ACM International Conference on Web Search and Data Mining (WSDM)',
      'Invited Reviewer for ACM Transactions on Recommender Systems (TORS)',
      'Invited Reviewer for IEEE Transactions on Knowledge and Data Engineering (TKDE)',
      'Reviewer for IEEE Transactions on Neural Networks and Learning Systems (TNNLS), Neurocomputing, IEEE Intelligent Systems, Multimedia Systems, and Pattern Recognition Letters',
      'PC Member for IEEE International Conference on Multimedia and Expo (ICME 2020)',
      'Organizer, ACM Multimedia 2020 Grand Challenge on video relation understanding',
    ],
    projectsTitle: 'Research Projects',
    projects: [
      '2027–2030 · Principal investigator, NSFC General Program: Cognition-enhanced generation through difference modeling (62676194); project starts in January 2027.',
      '2022–2025 · Principal investigator, NSFC General Program: Social multimedia recommendation through knowledge discovery and reasoning (6217070660).',
      '2016–2018 · Project lead, relational database cluster performance, First China Innovation Challenge, Ministry of Science and Technology.',
      '2014–2015 · Principal investigator, online meteorological data reanalysis platform, State Key Laboratory of Severe Weather (2014LASW-B12).',
      '2012–2013 · Core researcher, enhancement of the national science and technology infrastructure platform, National Meteorological Information Center.',
    ],
    awardsTitle: 'Awards & Honors',
    awards: [
      '2026 · ICMR Best Paper Award: Frozen LVLMs for Micro-Video Recommendation: A Systematic Study of Feature Extraction and Fusion.',
      '2021 · Jiangsu “Shuangchuang” Doctoral Talent Program.',
      '2020 · Outstanding Doctoral Dissertation, University of Electronic Science and Technology of China.',
      '2017 · Fourth Young Faculty Teaching Award, Chengdu University of Information Technology.',
      '2011 · Outstanding Master’s Graduate, Beijing Normal University.',
    ],
    supervisionTitle: 'Student Supervision',
    supervision: [
      '2023–2024 · Principal investigator, Ministry of Education–Huawei industry–university collaborative education project: Practical HarmonyOS—Research on Mobile Application Development Course Construction.',
      '2016–2017 · Faculty advisor, game-based algorithm learning platform, Ministry of Education industry–university collaborative education program.',
      '2023 · Supervised student Fei Shen, recipient of the Outstanding Award in the Tencent Elite Talent Program.',
      '2020–present · Supervised students winning more than ten awards in domestic and international algorithm competitions.',
      '2024 · Jiangsu Graduate Research and Practice Innovation Program.',
      '2023 · First Prize, Jiangsu Challenge Cup.',
      '2022 · First Prize in the national finals of the Huawei Cup National College Student IoT Design Competition, and Huawei Cloud challenge project award.',
      '2022 · First and second places, pepper pest and disease image recognition challenge, iFLYTEK A.I. Developer Competition.',
      '2022 · Third place, IEEE UV VisAlgae challenge.',
      '2022 · Second place, ICME few-shot logo detection challenge.',
      '2022 · Third Prize, optical network resource compliance detection track, first Xingzhi Cup National AI Innovation and Application Competition.',
      '2011–2019 · Coached students at Chengdu University of Information Technology to an ACM-ICPC Asia Regional gold medal; recognized as an outstanding programming competition coach in western China.',
    ],
    teachingTitle: 'Teaching',
    teaching: [
      'Data Structures',
      'Algorithms for Programming Competitions',
      'Operating Systems',
      'Web Enterprise Applications (Java)',
      'Object-Oriented Programming (C++)',
      'Unix Operating Systems (APUE)',
      'Mobile Application Development (HarmonyOS)',
    ],
    siteNote: {
      lastUpdateLabel: 'Last update: ',
      lastUpdate: 'October 9, 2026',
      creditIntro: '. Website template adapted from ',
      creditSeparator: ' and ',
      closingMark: '.',
      credits,
    },
  },
  zh: {
    profile: {
      name: '杜晓宇',
      title: '副教授（博导）',
      affiliation: '南京理工大学',
      affiliationUrl: 'http://www.njust.edu.cn',
      email: 'duxy@njust.edu.cn',
      photoUrl,
      bio: '杜晓宇，南京理工大学计算机科学与工程学院副教授、博士生导师、硕士生导师，隶属于智能媒体分析组（IMAG）。曾在新加坡国立大学 NExT++ 中心任博士后研究员，合作导师为蔡达成教授。博士毕业于电子科技大学计算机科学与技术专业，师从唐金辉教授；硕士和本科毕业于北京师范大学，师从冯速教授。研究方向包含多模态内容理解与生成、多模态信息检索与推荐。',
    },
    professionalServicesTitle: '学术服务',
    professionalServices: [
      '中国计算机学会多媒体专委会执行委员',
      '中国中文信息学会开源情报专委会委员',
      '南京欧美同学会数智科技与产业专委会秘书长',
      '江苏省数字经济学会智库专家',
      'ACM International Conference on Multimedia (MM) 程序委员会委员',
      'International Joint Conference on Artificial Intelligence (IJCAI) 程序委员会委员',
      'The ACM Web Conference (WWW) 程序委员会委员',
      'AAAI Conference on Artificial Intelligence (AAAI) 程序委员会委员',
      'Annual Meeting of the Association for Computational Linguistics (ACL) 程序委员会委员',
      'International ACM SIGIR Conference on Research and Development in Information Retrieval (SIGIR) 程序委员会委员',
      'ACM International Conference on Web Search and Data Mining (WSDM) 程序委员会委员',
      'ACM Transactions on Recommender Systems (TORS) 特邀审稿人',
      'IEEE Transactions on Knowledge and Data Engineering (TKDE) 特邀审稿人',
      'IEEE Transactions on Neural Networks and Learning Systems (TNNLS)、Neurocomputing、IEEE Intelligent Systems、Multimedia Systems、Pattern Recognition Letters 审稿人',
      'IEEE International Conference on Multimedia and Expo (ICME 2020) 程序委员会委员',
      'ACM Multimedia 2020 视频关系理解 Grand Challenge 组织者',
    ],
    projectsTitle: '项目情况',
    projects: [
      '2027–2030 · 主持国家自然科学基金面上项目：基于差异建模的认知增强生成方法研究（62676194），将于 2027 年 1 月启动。',
      '2022–2025 · 主持国家自然科学基金面上项目：基于知识发现与推理的社交多媒体推荐方法研究（6217070660）。',
      '2016–2018 · 主持科技部首届中国创新挑战赛项目：关系型数据库集群性能。',
      '2014–2015 · 主持中国气象科学研究院灾害天气国家重点实验室项目：气象数据在线再分析平台（2014LASW-B12）。',
      '2012–2013 · 主研国家气象信息中心项目：国家科技基础条件平台运行服务——主系统功能完善。',
    ],
    awardsTitle: '获奖与荣誉',
    awards: [
      '2026 · ICMR 最佳论文奖：Frozen LVLMs for Micro-Video Recommendation: A Systematic Study of Feature Extraction and Fusion。',
      '2021 · 江苏省双创博士。',
      '2020 · 电子科技大学优秀博士学位论文。',
      '2017 · 成都信息工程大学第四届青年教师教学奖。',
      '2011 · 北京师范大学优秀硕士毕业生。',
    ],
    supervisionTitle: '学生培养',
    supervision: [
      '2023–2024 · 主持教育部–华为产学合作协同育人项目：《实战鸿蒙——移动应用开发课程建设研究》。',
      '2016–2017 · 指导教育部产学合作协同育人项目：游戏性学习算法平台。',
      '2023 · 培养学生沈飞获腾讯精英人才计划杰出奖。',
      '2020–至今 · 指导学生获十余项国内外算法竞赛奖项。',
      '2024 · 江苏省研究生科研与实践创新计划。',
      '2023 · 江苏省挑战杯一等奖。',
      '2022 · 全国大学生物联网设计竞赛（华为杯）全国总决赛一等奖，并获华为云揭榜挂帅项目奖。',
      '2022 · iFLYTEK A.I. 开发者大赛辣椒病虫害图像识别挑战赛第一名、第二名。',
      '2022 · IEEE UV 国际“视觉与藻类”挑战赛（VisAlgae）第三名。',
      '2022 · ICME 小样本商标检测挑战赛第二名。',
      '2022 · 首届“兴智杯”全国人工智能创新应用大赛光网络哑资源合规检测赛（技术模型类）三等奖。',
      '2011–2019 · 指导成都信息工程大学学生获 ACM 国际大学生程序设计竞赛（ACM-ICPC）亚洲区金奖，获评西部地区程序设计竞赛优秀指导教师。',
    ],
    teachingTitle: '教学课程',
    teaching: [
      '数据结构',
      '程序设计竞赛算法',
      '操作系统',
      'Web 企业级应用（Java）',
      '面向对象程序设计（C++）',
      'Unix 操作系统（APUE）',
      '移动应用开发（HarmonyOS）',
    ],
    siteNote: {
      lastUpdateLabel: '最后更新：',
      lastUpdate: '2026年10月9日',
      creditIntro: '。网页模板参考自 ',
      creditSeparator: ' 和 ',
      closingMark: '。',
      credits,
    },
  },
}
