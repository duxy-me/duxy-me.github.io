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
      title: 'Associate Professor',
      affiliation: 'Nanjing University of Science and Technology',
      affiliationUrl: 'http://www.njust.edu.cn',
      email: 'duxy@njust.edu.cn',
      photoUrl,
      bio: 'Xiaoyu Du is currently an associate professor in Intelligent Media Analysis Group (IMAG) at School of Computer Science and Engineering, Nanjing University of Science and Technology (NJUST). He was a research fellow in the NExT++ center of National University of Singapore, supervised by Prof. Tat-Seng Chua. He received his Ph.D. degree in computer science and technology from University of Electronic Science and Technology of China supervised by Prof. Jinhui Tang, and M.E. degree in computer software and theory and B.S. degree in computer science and technology from Beijing Normal University supervised by Prof. Su Feng. His research interests include recommender systems, retrieval-augmented generation, machine learning, multimedia understanding, and deepfakes.',
    },
    professionalServicesTitle: 'Professional Services',
    professionalServices: [
      'PC Member for ACM International Conference on Multimedia (MM)',
      'PC Member for International Joint Conference on Artificial Intelligence (IJCAI)',
      'PC Member for The ACM Web Conference (WWW)',
      'PC Member for AAAI Conference on Artificial Intelligence (AAAI)',
      'PC Member for Annual Meeting of the Association for Computational Linguistics (ACL)',
      'PC Member for International ACM SIGIR Conference on Research and Development in Information Retrieval (SIGIR)',
      'PC Member for ACM International Conference on Web Search and Data Mining (WSDM)',
      'Invited Reviewer for ACM Transactions on Recommender Systems (TORS)',
      'Invited Reviewer for IEEE Transactions on Knowledge and Data Engineering (TKDE)',
    ],
    teachingTitle: 'Teaching',
    teaching: [
      'Data Structure',
      'Algorithms for Programming Competitions',
      'Operating System',
      'Web Enterprise Applications (Java)',
      'Object-Oriented Programming (C++)',
      'Unix Operating System (APUE)',
      'Mobile Application Development (HarmonyOS)',
    ],
    siteNote: {
      lastUpdateLabel: 'Last update: ',
      lastUpdate: 'April 10, 2026',
      creditIntro: '. Webpage template borrows from ',
      creditSeparator: ' and ',
      closingMark: '.',
      credits,
    },
  },
  zh: {
    profile: {
      name: '杜晓宇',
      title: '副教授',
      affiliation: '南京理工大学',
      affiliationUrl: 'http://www.njust.edu.cn',
      email: 'duxy@njust.edu.cn',
      photoUrl,
      bio: '杜晓宇，南京理工大学计算机科学与工程学院副教授，隶属于智能媒体分析组（IMAG）。曾在新加坡国立大学 NExT++ 中心任博士后研究员，合作导师为蔡达成教授。博士毕业于电子科技大学计算机科学与技术专业，师从唐金辉教授；硕士和本科毕业于北京师范大学，师从冯速教授。研究方向包括推荐系统、十检索增强生成、机器学习、多媒体理解和深度伪造。',
    },
    professionalServicesTitle: '学术服务',
    professionalServices: [
      'ACM International Conference on Multimedia (MM) 程序委员会委员',
      'International Joint Conference on Artificial Intelligence (IJCAI) 程序委员会委员',
      'The ACM Web Conference (WWW) 程序委员会委员',
      'AAAI Conference on Artificial Intelligence (AAAI) 程序委员会委员',
      'Annual Meeting of the Association for Computational Linguistics (ACL) 程序委员会委员',
      'International ACM SIGIR Conference on Research and Development in Information Retrieval (SIGIR) 程序委员会委员',
      'ACM International Conference on Web Search and Data Mining (WSDM) 程序委员会委员',
      'ACM Transactions on Recommender Systems (TORS) 特邀审稿人',
      'IEEE Transactions on Knowledge and Data Engineering (TKDE) 特邀审稿人',
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
      lastUpdate: '2026年4月10日',
      creditIntro: '。网页模板参考自 ',
      creditSeparator: ' 和 ',
      closingMark: '。',
      credits,
    },
  },
}
