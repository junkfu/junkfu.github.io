/* ============================================================
   履歷內容（唯一資料來源）
   改履歷只需要改這個檔案。zh / en 兩邊結構必須一致。
   ============================================================ */
window.RESUME = {
  shared: {
    email: 'junkfood1106@gmail.com',
    github: 'https://github.com/junkfu',
    linkedin: 'https://www.linkedin.com/in/復-張-43a365205',
    avatar: 'assets/avatar.jpg',
    siteUrl: 'https://junkfu.github.io/resume/',
    // 指令列 ls / cat 使用的檔名 → 對應區塊
    files: {
      'about.md': 'about',
      'experience.md': 'experience',
      'projects.md': 'projects',
      'skills.md': 'skills',
      'education.md': 'education',
      'beyond-work.md': 'whyme',
      'contact.md': 'contact'
    }
  },

  /* ---------------------------------------------------------- */
  zh: {
    ui: {
      htmlLang: 'zh-Hant',
      langButton: 'EN',
      langButtonTitle: 'Switch to English',
      placeholder: '輸入 help 查看可用指令…',
      inputLabel: '終端機指令輸入',
      source: '原始碼',
      sections: {
        about: '關於我',
        experience: '工作經歷',
        projects: '專案成就',
        skills: '技能',
        education: '學歷與認證',
        whyme: '工作之外',
        contact: '聯絡方式'
      },
      currentBadge: '現職',
      roleLabel: '角色',
      linksLabel: '相關網站',
      helpIntro: '可用指令：',
      help: [
        ['help', '顯示這份說明'],
        ['about', '關於我'],
        ['exp', '工作經歷（也可用 experience）'],
        ['projects', '專案成就'],
        ['skills', '技能'],
        ['edu', '學歷與認證'],
        ['contact', '聯絡方式'],
        ['ls / cat <file>', '列出或開啟檔案'],
        ['lang [zh|en]', '切換語言'],
        ['theme [dark|light|dracula]', '切換配色'],
        ['clear', '清除輸出'],
        ['top', '回到最上方']
      ],
      hint: '提示：按 / 可快速聚焦指令列，↑↓ 切換歷史指令，Tab 自動補齊。',
      notFound: 'zsh: command not found: {cmd}（輸入 help 查看指令）',
      opening: '→ 開啟 {file}',
      noFile: 'cat: {file}: No such file or directory',
      catUsage: 'cat: 請指定檔案，例如 cat skills.md',
      langSet: '語言已切換為繁體中文',
      themeSet: '配色已切換為 {theme}',
      themeUnknown: '沒有這個配色：{theme}。可用：dark, light, dracula',
      sudo: 'fu 不在 sudoers 名單中。此事件將被回報 🙂',
      exit: '感謝造訪！這是靜態網頁，沒有出口 👋',
      top: '→ 回到最上方',
      noHistory: '（尚無歷史指令）'
    },

    whoami: {
      name: '張復 Fu Chang',
      title: '資訊部經理 @ 愛生育生物科技 · 帶領 13+ 人軟硬體團隊',
      rows: [
        ['求職目標', '後端工程師 / Backend Engineer'],
        ['地點', '新竹, Taiwan'],
        ['年資', '10+ 年：LED 研發 → 軟體開發 → 資訊部主管'],
        ['學歷', '國立中興大學 電機工程學系'],
        ['技術', 'AWS · Claude code · Codex · PHP / Laravel · Node.js · Python · React · MySQL · Docker · Git']
      ]
    },

    about: {
      summary: '橫跨硬體與軟體的 IT 主管，從工程師一路帶到 20 人的資訊團隊。把落後業界多年的醫療資訊系統，重建為軟體公司水準的現代化架構，並帶領全團隊導入 AI 輔助開發。也曾單車橫跨歐亞大陸，花半年從北京騎到巴黎：獨自規劃與面對未知挑戰，恆毅力高，喜歡探索未知。',
      highlightsHeading: '關鍵成果',
      highlights: [
        '建立完整開發制度：Git、Jenkins CI/CD、Docker，系統從地端上雲 AWS',
        '主導人工生殖 HIS 與實驗室系統，介接顯微鏡、標籤機等 IoT 設備，全面無紙化，人力需求 -30%',
        'EC2 遷移至 ECS Fargate，雲端機器成本 -30%',
        '資訊團隊從 3 人帶到 20 人，全面導入 Claude Code 進行 AI 輔助開發'
      ]
    },

    experience: {
      items: [
        {
          period: '2025/1 ~ 現在',
          title: '資訊部經理',
          company: '愛生育生物科技',
          meta: '管理 13+ 人 · 新竹',
          summary: '',
          groups: [
            {
              heading: '雲端基礎架構 / AWS',
              bullets: [
                'EC2 遷移至 ECS Fargate，提升部署彈性與資源使用率，雲端機器成本 -30%',
                'RDS MySQL 遷移與成本優化，開發環境自動啟停，降低非營運時段支出',
                'Route 53 / CloudFront / WAF 與 SPF / DMARC，強化網域與郵件安全'
              ]
            },
            {
              heading: '系統開發 / DevOps',
              bullets: [
                'HIS 系統開發與維運（Laravel、React）',
                '容器化開發流程與 ECR 映像管理，確保環境可重現'
              ]
            },
            {
              heading: '跨系統整合',
              bullets: [
                'HIS 與外部平台 API 整合：病患同步、冷凍庫存、計費、預約',
                '企業 SaaS（Google Workspace、ClickUp）自動化與權限治理，串接 Gmail、Calendar、Git',
                '導入並管理 Claude Teams，建立團隊 AI 使用規範與用量分析'
              ]
            }
          ]
        },
        {
          period: '2017/10 ~ 2024/12',
          title: '資訊部經理',
          company: '送子鳥診所',
          meta: '管理 9~12 人 · 新竹',
          summary: '三年內從工程師升任資訊部主管，團隊 3 → 10+ 人，同時管理軟體與硬體部門。',
          groups: [
            {
              heading: null,
              bullets: [
                '建立開發制度：Git 版控、Jenkins CI/CD、Docker 容器化',
                '地端機器上雲 AWS（EC2、ECS、RDS、VPC、Route 53、Lambda），實現敏捷開發與資料備援',
                'Zabbix / PRTG 監控主機與網路，介接 LINE Notify 即時告警',
                '整合異質系統與開源工具（LINE Bot、Google Apps Script、Trello），依臨床流程客製',
                '導入 Laravel 框架統一程式碼風格，提升可維護性'
              ]
            }
          ]
        },
        {
          period: '2015/9 ~ 2017/2',
          title: '軟體工程師',
          company: '蟲洞',
          meta: '新竹 · 軟體服務業',
          summary: '',
          groups: [
            {
              heading: null,
              bullets: [
                '自學 Java / Android，開發塑膠射出 MES 系統',
                '客戶專案導入、需求訪談與既有系統維護',
                '網頁開發（HTML / CSS / JS）與資料庫（MySQL / Redis / MongoDB）'
              ]
            }
          ]
        },
        {
          period: '2012/9 ~ 2015/3',
          title: '產品開發工程師',
          company: '榮創能源科技',
          meta: '光電工程師 · 新竹湖口',
          summary: '',
          groups: [
            {
              heading: null,
              bullets: [
                'LED 產品開發，熟悉 LED 製程與光電理論，2D / 3D 繪圖（AutoCAD、SolidWorks）',
                '客戶技術支援與失效分析，出差韓國、中國'
              ]
            }
          ]
        }
      ]
    },

    projects: {
      items: [
        {
          name: 'HiStork',
          period: '2023/2 ~ 2025/4',
          role: 'PM / 系統架構師 / 後端開發',
          summary: '面向醫療院所的 HIS 後端 API 平台（Laravel 11 / PHP 8.2，前後端分離），整合掛號門診、電子病歷、批價與健保申報、藥局處方與檢驗檢查。負責架構設計、技術選型、API 規格與資料庫設計，帶領後端團隊從開發到上線維運。',
          sections: [
            {
              heading: '技術亮點',
              bullets: [
                'Controller–Service–Repository 分層 + RESTful API 版本控管，模組可獨立擴充',
                'Laravel Sanctum + RBAC 依職類分級授權，敏感個資加密與操作稽核（Audit Log）',
                '串接健保署申報與 HL7 / FHIR 標準，處理異質系統資料轉換',
                'Redis 快取 + Queue 非同步批次申報與報表，消除 N+1，確保門診尖峰穩定'
              ]
            }
          ],
          links: []
        },
        {
          name: '人工生殖 HIS 與實驗室系統',
          period: '愛生育生物科技',
          role: '主導 / 架構 / 團隊帶領',
          summary: '兩套核心系統導入院所實際運作。以 AWS ECS Fargate 部署並 Auto Scaling，介接光學顯微鏡、標籤機、自動備血管機等設備，院所流程全面無紙化，人力需求 -30%。',
          sections: [],
          links: [
            { label: 'e-stork.com.tw', url: 'https://www.e-stork.com.tw/' },
            { label: 'icryobank.com', url: 'https://icryobank.com/' },
            { label: 'jp.icryobank.com', url: 'https://jp.icryobank.com/' }
          ]
        }
      ]
    },

    skills: {
      groups: [
        ['程式語言', ['PHP', 'Node.js', 'Python', 'Java']],
        ['框架', ['Laravel', 'React']],
        ['網頁', ['HTML', 'CSS', 'JavaScript']],
        ['資料庫', ['MySQL', 'MariaDB', 'MSSQL', 'Redis', 'MongoDB']],
        ['AWS', ['EC2', 'ECS Fargate', 'ECR', 'RDS', 'Route 53', 'CloudFront', 'WAF', 'Lambda', 'VPC']],
        ['DevOps', ['Git', 'Jenkins', 'Docker', 'CI/CD', 'Linux', 'Zabbix', 'PRTG']],
        ['AI 工具', ['Claude Code', 'Codex', 'Claude Teams 管理']],
        ['SaaS 與自動化', ['Google Workspace', 'ClickUp', 'LINE Bot', 'Google Apps Script']],
        ['硬體', ['LED 製程', 'IoT 設備介接', 'AutoCAD', 'SolidWorks']]
      ],
      spokenLabel: '語言能力',
      spoken: [
        ['中文', '精通'],
        ['English', '中等'],
        ['客語', '略懂']
      ]
    },

    education: {
      school: '國立中興大學',
      dept: '電機工程學系',
      degree: '大學畢業',
      period: '2008/9 ~ 2011/6',
      certsHeading: '資格認證',
      certs: [
        { name: 'Oracle OCP — Java SE 6 Programmer Certified Professional', by: 'Oracle' },
        { name: '圍棋 業餘五段', by: '中華圍棋協會' }
      ]
    },

    whyme: {
      bullets: [
        { title: '策略與沉穩', text: '圍棋業餘五段，曾代表中興大學、新竹高中出賽' },
        { title: '團隊與目標感', text: '大學籃球系隊主力，全校冠軍、全國第四' },
        { title: '利他', text: '陪伴自閉症兒童、為偏鄉國小辦營隊' }
      ]
    },

    contact: {
      linkLabels: { email: 'Email', linkedin: 'LinkedIn' },
      rows: [
        ['可配合地點', '新竹 / 台中 / 桃園 / 台北 / 新北'],
        ['可上班日', '錄取後一個月']
      ]
    }
  },

  /* ---------------------------------------------------------- */
  en: {
    ui: {
      htmlLang: 'en',
      langButton: '中文',
      langButtonTitle: '切換為繁體中文',
      placeholder: "type 'help' for available commands…",
      inputLabel: 'Terminal command input',
      source: 'source',
      sections: {
        about: 'About',
        experience: 'Experience',
        projects: 'Projects',
        skills: 'Skills',
        education: 'Education',
        whyme: 'Beyond work',
        contact: 'Contact'
      },
      currentBadge: 'current',
      roleLabel: 'Role',
      linksLabel: 'Related sites',
      helpIntro: 'Available commands:',
      help: [
        ['help', 'show this help'],
        ['about', 'about me'],
        ['exp', 'work experience (alias: experience)'],
        ['projects', 'project highlights'],
        ['skills', 'skills'],
        ['edu', 'education & certifications'],
        ['contact', 'contact info'],
        ['ls / cat <file>', 'list or open files'],
        ['lang [zh|en]', 'switch language'],
        ['theme [dark|light|dracula]', 'switch color scheme'],
        ['clear', 'clear output'],
        ['top', 'back to top']
      ],
      hint: 'Tip: press / to focus the prompt, ↑↓ for history, Tab to autocomplete.',
      notFound: "zsh: command not found: {cmd} (type 'help')",
      opening: '→ opening {file}',
      noFile: 'cat: {file}: No such file or directory',
      catUsage: 'cat: missing file operand, e.g. cat skills.md',
      langSet: 'Language switched to English',
      themeSet: 'Theme switched to {theme}',
      themeUnknown: 'Unknown theme: {theme}. Available: dark, light, dracula',
      sudo: 'fu is not in the sudoers file. This incident will be reported 🙂',
      exit: "Thanks for visiting! It's a static page, there is no exit 👋",
      top: '→ back to top',
      noHistory: '(no history yet)'
    },

    whoami: {
      name: 'Fu Chang (張復)',
      title: 'IT Manager @ BIOLOVE Biotechnology · leads a 13+ person software & hardware team',
      rows: [
        ['Open to', 'Backend Engineer'],
        ['Location', 'Hsinchu, Taiwan'],
        ['Experience', '10+ years: LED R&D → software development → head of IT'],
        ['Education', 'B.S. Electrical Engineering, National Chung Hsing University'],
        ['Stack', 'AWS · Claude code · Codex · PHP / Laravel · Node.js · Python · React · MySQL · Docker · Git']
      ]
    },

    about: {
      summary: 'An IT manager equally at home with hardware and software, I grew from engineer to leading a 20-person IT team. I rebuilt a medical information system that was years behind the industry into a modern, software-company-grade architecture and rolled out AI-assisted development across the whole team. I also cycled across Eurasia, from Beijing to Paris in six months: planning the route myself and facing unknown challenges. I have a lot of grit, and I like exploring the unknown.',
      highlightsHeading: 'Key results',
      highlights: [
        'Built the development practice from scratch: Git, Jenkins CI/CD, Docker, and migration from on-premises to AWS',
        'Led an assisted-reproduction HIS and lab system integrating microscopes, label printers and other IoT devices; fully paperless clinic, manpower needs -30%',
        'Migrated EC2 to ECS Fargate, cutting cloud compute cost by 30%',
        'Grew the IT team from 3 to 20 people and rolled out Claude Code for AI-assisted development'
      ]
    },

    experience: {
      items: [
        {
          period: '2025/1 ~ present',
          title: 'IT Manager',
          company: 'BIOLOVE Biotechnology',
          meta: 'Team of 13+ · Hsinchu',
          summary: '',
          groups: [
            {
              heading: 'Cloud Infrastructure / AWS',
              bullets: [
                'Migrated EC2 to ECS Fargate, improving deployment flexibility and utilization; cloud compute cost -30%',
                'RDS MySQL migration and cost optimization; scheduled auto start/stop for dev environments',
                'Route 53 / CloudFront / WAF plus SPF / DMARC to harden domain and email security'
              ]
            },
            {
              heading: 'System Development / DevOps',
              bullets: [
                'Develop and operate the HIS (Laravel, React)',
                'Containerized workflow with ECR image management for reproducible environments'
              ]
            },
            {
              heading: 'Cross-system Integration',
              bullets: [
                'HIS ↔ external platform APIs: patient sync, cryo-inventory, billing, appointments',
                'Enterprise SaaS (Google Workspace, ClickUp) automation and permission governance; wired to Gmail, Calendar, Git',
                'Rolled out and administer Claude Teams with team AI usage guidelines and analytics'
              ]
            }
          ]
        },
        {
          period: '2017/10 ~ 2024/12',
          title: 'IT Manager',
          company: 'Stork Fertility Center (送子鳥診所)',
          meta: 'Team of 9–12 · Hsinchu',
          summary: 'Promoted from engineer to head of IT within three years; grew the team from 3 to 10+ while managing both software and hardware.',
          groups: [
            {
              heading: null,
              bullets: [
                'Established the development practice: Git, Jenkins CI/CD, Docker containerization',
                'Migrated on-premises servers to AWS (EC2, ECS, RDS, VPC, Route 53, Lambda) for agile delivery and data backup',
                'Zabbix / PRTG monitoring wired to LINE Notify for real-time alerts',
                'Integrated heterogeneous systems with open-source tools (LINE Bot, Google Apps Script, Trello) around clinical workflows',
                'Adopted Laravel to unify code style and improve maintainability'
              ]
            }
          ]
        },
        {
          period: '2015/9 ~ 2017/2',
          title: 'Software Engineer',
          company: 'Wormhole (蟲洞)',
          meta: 'Hsinchu · Software services',
          summary: '',
          groups: [
            {
              heading: null,
              bullets: [
                'Self-taught Java / Android; built an MES for plastic injection molding',
                'Client project rollout, requirements gathering and maintenance of existing systems',
                'Web development (HTML / CSS / JS) and databases (MySQL / Redis / MongoDB)'
              ]
            }
          ]
        },
        {
          period: '2012/9 ~ 2015/3',
          title: 'Product Development Engineer',
          company: 'Advanced Optoelectronic Technology (榮創能源科技)',
          meta: 'Optoelectronics engineer · Hukou, Hsinchu',
          summary: '',
          groups: [
            {
              heading: null,
              bullets: [
                'LED product development; LED fabrication, optoelectronics, 2D / 3D drafting (AutoCAD, SolidWorks)',
                'Customer technical support and failure analysis, with business trips to Korea and China'
              ]
            }
          ]
        }
      ]
    },

    projects: {
      items: [
        {
          name: 'HiStork',
          period: '2023/2 ~ 2025/4',
          role: 'PM / System Architect / Backend',
          summary: 'HIS backend API platform for clinics (Laravel 11 / PHP 8.2, decoupled frontend) covering registration and scheduling, electronic medical records, billing and NHI claims, pharmacy and lab orders. Owned architecture, technology selection, API specification and database design, and led the backend team from development through launch and operations.',
          sections: [
            {
              heading: 'Highlights',
              bullets: [
                'Controller–Service–Repository layering with versioned RESTful APIs; modules extend independently',
                'Laravel Sanctum + role-based access control; encrypted sensitive data and audit logging',
                'Integration with NHI claims and HL7 / FHIR standards, handling data conversion across heterogeneous systems',
                'Redis caching + queued batch claims and reports, N+1 elimination; stable under peak outpatient load'
              ]
            }
          ],
          links: []
        },
        {
          name: 'Assisted-Reproduction HIS & Laboratory System',
          period: 'BIOLOVE Biotechnology',
          role: 'Lead / Architecture / Team leadership',
          summary: 'Two core systems brought into live clinical use. Deployed on AWS ECS Fargate with auto scaling; integrated with optical microscopes, label printers and automated blood-tube preparation machines for a fully paperless clinic, cutting manpower needs by 30%.',
          sections: [],
          links: [
            { label: 'e-stork.com.tw', url: 'https://www.e-stork.com.tw/' },
            { label: 'icryobank.com', url: 'https://icryobank.com/' },
            { label: 'jp.icryobank.com', url: 'https://jp.icryobank.com/' }
          ]
        }
      ]
    },

    skills: {
      groups: [
        ['Languages', ['PHP', 'Node.js', 'Python', 'Java']],
        ['Frameworks', ['Laravel', 'React']],
        ['Web', ['HTML', 'CSS', 'JavaScript']],
        ['Databases', ['MySQL', 'MariaDB', 'MSSQL', 'Redis', 'MongoDB']],
        ['AWS', ['EC2', 'ECS Fargate', 'ECR', 'RDS', 'Route 53', 'CloudFront', 'WAF', 'Lambda', 'VPC']],
        ['DevOps', ['Git', 'Jenkins', 'Docker', 'CI/CD', 'Linux', 'Zabbix', 'PRTG']],
        ['AI tools', ['Claude Code', 'Codex', 'Claude Teams admin']],
        ['SaaS & automation', ['Google Workspace', 'ClickUp', 'LINE Bot', 'Google Apps Script']],
        ['Hardware', ['LED fabrication', 'IoT device integration', 'AutoCAD', 'SolidWorks']]
      ],
      spokenLabel: 'Languages spoken',
      spoken: [
        ['Mandarin', 'native'],
        ['English', 'intermediate'],
        ['Hakka', 'basic']
      ]
    },

    education: {
      school: 'National Chung Hsing University',
      dept: 'Electrical Engineering',
      degree: 'B.S.',
      period: '2008/9 ~ 2011/6',
      certsHeading: 'Certifications',
      certs: [
        { name: 'Oracle OCP — Java SE 6 Programmer Certified Professional', by: 'Oracle' },
        { name: 'Amateur 5-dan Go player', by: 'Chinese Taipei Go Association' }
      ]
    },

    whyme: {
      bullets: [
        { title: 'Strategic and composed', text: 'Amateur 5-dan Go player; competed for National Chung Hsing University and Hsinchu High School' },
        { title: 'Team player', text: 'Starter on the university basketball team; campus champions, 4th nationally' },
        { title: 'Giving back', text: 'Mentored children with autism; ran summer camps for rural elementary schools' }
      ]
    },

    contact: {
      linkLabels: { email: 'Email', linkedin: 'LinkedIn' },
      rows: [
        ['Preferred locations', 'Hsinchu / Taichung / Taoyuan / Taipei / New Taipei'],
        ['Availability', 'One month after offer']
      ]
    }
  }
};
