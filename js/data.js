/* ============================================================
   履歷內容（唯一資料來源）
   改履歷只需要改這個檔案。zh / en 兩邊結構必須一致。
   ============================================================ */
window.RESUME = {
  shared: {
    handle: 'allen@junkfu',
    path: '~/resume',
    email: 'junkfood1106@gmail.com',
    github: 'https://github.com/junkfu',
    linkedin: 'https://www.linkedin.com/in/復-張-43a365205',
    avatar: 'assets/avatar.jpg',
    siteUrl: 'https://junkfu.github.io/',
    // 各區塊在畫面上顯示的「指令」
    cmds: {
      whoami: 'whoami',
      neofetch: 'neofetch',
      about: 'cat about.md',
      experience: 'git log --graph career/',
      projects: 'cat projects.md',
      skills: 'cat skills.yaml',
      education: 'cat education.md',
      whyme: 'cat why-me.md',
      contact: 'cat contact.json'
    },
    // ls 會列出的檔案 → 對應區塊
    files: {
      'about.md': 'about',
      'experience.md': 'experience',
      'projects.md': 'projects',
      'skills.yaml': 'skills',
      'education.md': 'education',
      'why-me.md': 'whyme',
      'contact.json': 'contact'
    }
  },

  /* ---------------------------------------------------------- */
  zh: {
    ui: {
      htmlLang: 'zh-Hant',
      langButton: 'EN',
      langButtonTitle: 'Switch to English',
      placeholder: "輸入 help 查看可用指令…",
      inputLabel: '終端機指令輸入',
      footer: '以純 HTML / CSS / JS 打造 · 部署於 GitHub Pages',
      source: '原始碼',
      helpIntro: '可用指令：',
      help: [
        ['help', '顯示這份說明'],
        ['about', '關於我'],
        ['exp', '工作經歷（也可用 experience）'],
        ['projects', '專案成就'],
        ['skills', '技能清單'],
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
      catUsage: 'cat: 請指定檔案，例如 cat skills.yaml',
      langSet: '語言已切換為繁體中文',
      themeSet: '配色已切換為 {theme}',
      themeUnknown: '沒有這個配色：{theme}。可用：dark, light, dracula',
      sudo: 'allen 不在 sudoers 名單中。此事件將被回報 🙂',
      exit: '感謝造訪！這是靜態網頁，沒有出口 👋',
      cleared: '',
      top: '→ 回到最上方',
      noHistory: '（尚無歷史指令）',
      noscript: '此頁面需要 JavaScript。聯絡方式：junkfood1106@gmail.com · github.com/junkfu'
    },

    whoami: {
      line: '張復 Allen Chang',
      sub: '資訊部經理 · 後端工程師 · 軟硬整合'
    },

    neofetch: {
      rows: [
        ['Name', '張復 Allen Chang'],
        ['Role', '資訊部經理 @ 愛生育生物科技'],
        ['Open to', '後端工程師 / Backend Engineer'],
        ['Location', '新竹, Taiwan'],
        ['Experience', '9+ 年（硬體 → 軟體 → 帶領資訊團隊）'],
        ['Team', '資訊部 13+ 人（軟體 + 硬體）'],
        ['Education', '國立中興大學 電機工程學系'],
        ['Stack', 'PHP / Laravel · Node.js · Python · React · MySQL · AWS'],
        ['AI', 'Claude Code · Codex（團隊導入者）'],
        ['Motto', '「疑人不用，用人不疑」']
      ],
      tags: ['#AWS', '#VibeCoding', '#軟硬整合', '#擅溝通', '#愛挑戰', '#邏輯分析']
    },

    about: {
      paragraphs: [
        '橫跨硬體與軟體的 IT 主管，從工程師一路帶到 20 人的資訊團隊。把落後業界多年的醫療資訊系統，重建為業界軟體公司水準的現代化架構：導入 Git、Jenkins、Docker、CI/CD，並將系統從地端上雲（AWS）。',
        '曾主導人工生殖 HIS 與實驗室系統，介接顯微鏡、標籤機等 IoT 硬體設備、全面無紙化，使人力需求降低 30%，並帶領全團隊導入 Claude Code 進行 AI 輔助開發。',
        '職涯從 LED 產品開發工程師起步，轉進程式開發，再成長為資訊部主管。我深信「制度與系統都靠人運作，把人對齊了，事情自然就順」。負責任、有毅力，能畫藍圖也能帶團隊落地。'
      ]
    },

    experience: {
      current: 'HEAD -> now',
      items: [
        {
          period: '2025/1 ~ 現在',
          title: '資訊部經理',
          company: '愛生育生物科技股份有限公司',
          meta: '軟體專案主管 · 管理 13 人以上 · 新竹市 · 生化科技研發業',
          summary: '醫療資訊系統開發、雲端基礎架構與跨團隊協作，負責從架構規劃、系統整合到 AI 自動化導入的端到端落地。',
          groups: [
            {
              heading: '雲端基礎架構 / AWS',
              bullets: [
                '由 EC2 遷移至 ECS Fargate，提升部署彈性與資源使用率，降低維運負擔，節省雲端機器約 30% 成本',
                '管理 Route 53 DNS，建置 CloudFront 與 Google Workspace SPF / DMARC，強化網域與郵件安全',
                '主導 RDS MySQL 遷移與成本優化，導入開發環境自動啟停排程，降低非營運時段雲端支出',
                '規劃 WAF / Proxy IP 允許清單'
              ]
            },
            {
              heading: '系統開發 / DevOps',
              bullets: [
                '負責 HIS 系統開發與維運，技術為 PHP（Laravel）及 React',
                '建立容器化開發流程與 ECR 映像管理，提升交付一致性與環境可重現性'
              ]
            },
            {
              heading: '跨系統整合',
              bullets: [
                '主導 HIS 與外部平台之 API 整合，涵蓋病患同步、冷凍庫存、計費與預約等模組',
                '管理 Google Workspace、ClickUp 等企業 SaaS，建立自動化規則與權限治理',
                '串接 ClickUp、Gmail、Google Calendar、Git，推動研發與專案流程自動化',
                '導入並管理 Claude Teams（Primary Owner），建立團隊 AI 使用規範與用量分析'
              ]
            }
          ],
          tags: ['#系統架構規劃', '#系統整合分析', '#軟體程式設計', '#AWS', '#軟體硬體整合']
        },
        {
          period: '2017/10 ~ 2024/12（7 年 3 個月）',
          title: '資訊部經理',
          company: '送子鳥診所',
          meta: '軟體專案主管 · 管理 9~12 人 · 新竹市 · 診所 100~500 人',
          summary: '用三年從工程師成長為資訊部主管，團隊由 3 人擴編到 10 多人，同時管理軟體與硬體部門，為公司建立完整的開發制度。',
          groups: [
            {
              heading: null,
              bullets: [
                '導入 Git 版控',
                '使用 Jenkins 建立 CI/CD 制度',
                '將 VM 容器化（Docker），減輕開發團隊部署的負擔',
                '以系統化方式監控網路及主機（Zabbix、PRTG），介接 LINE Notify 達到即時告警',
                '導入 AWS 雲端解決方案將地端機器上雲，達到敏捷開發及資料備份（EC2、ECS、RDS、CDN、VPC、Route 53、Lambda）',
                '整合異質系統，導入 open source（Trello、LINE Bot、Google Apps Script…），配合臨床流程客製程式，提升效率',
                'PHP 網頁開發，導入業界框架，使程式碼風格一致，提升團隊維護性及可讀性'
              ]
            }
          ],
          tags: ['#軟體程式設計', '#專案溝通／整合管理', '#Laravel', '#PHP', '#MySQL', '#Node.js']
        },
        {
          period: '2015/9 ~ 2017/2（1 年 6 個月）',
          title: '軟體工程師',
          company: '蟲洞',
          meta: '新竹市 · 電腦軟體服務業',
          summary: '看準行動與雲端趨勢，自學 Java 與 Android，投入塑膠射出 MES 系統開發。在小型團隊裡，從專案導入、程式開發、網頁設計到客戶服務一手包辦。',
          groups: [
            {
              heading: null,
              bullets: [
                'Java 程式開發（塑膠射出 MES 系統）',
                '客戶端專案導入與執行',
                '網頁撰寫（HTML / CSS / JS）',
                '現有客戶程式維護與修正',
                '資料庫設計與撰寫（MySQL / Redis / MongoDB）'
              ]
            }
          ],
          tags: ['#Java', '#MySQL', '#HTML', '#CSS', '#JavaScript', '#軟體程式設計']
        },
        {
          period: '2012/9 ~ 2015/3（2 年 7 個月）',
          title: '產品開發工程師',
          company: '榮創能源科技',
          meta: '光電工程師 · 新竹縣湖口鄉 · 光電產業 500 人以上',
          summary: 'LED 產業產品開發，掌握產品從原料到量產的完整脈絡，並磨出跨部門協調的能力。',
          groups: [
            {
              heading: null,
              bullets: [
                'LED 產品開發，熟悉 LED 製程與光電理論',
                '2D / 3D 繪圖（AutoCAD、SolidWorks）',
                '客戶技術支援與失效分析，頻繁出差韓國與中國大陸'
              ]
            }
          ],
          tags: ['#LED', '#光電', '#AutoCAD', '#SolidWorks', '#失效分析']
        }
      ]
    },

    projects: {
      items: [
        {
          name: 'HiStork',
          period: '2023/2 ~ 2025/4',
          role: 'PM / 系統架構師 / 後端開發',
          summary: '主導設計並開發一套面向醫療院所的醫院資訊系統（HIS）後端 API 平台，以 Laravel 11 / PHP 8.2 為核心框架，採前後端分離架構對外提供 RESTful API，整合掛號門診、電子病歷、批價收費與健保申報、藥局處方與檢驗檢查等核心業務模組，作為院所日常營運的中樞服務。負責整體系統架構設計、技術選型、API 規格制定與資料庫設計，並帶領後端團隊完成開發、測試與上線維運。',
          sections: [
            {
              heading: '系統架構與技術選型',
              bullets: [
                'Laravel 11 + PHP 8.2 模組化後端，採 Controller–Service–Repository 分層，將業務邏輯與資料存取解耦',
                'RESTful API 設計並導入版本控管（versioning），搭配 API Resource 統一回應格式，便於前端、行動端與第三方介接',
                'Token-based 身分驗證（Laravel Sanctum）結合 RBAC 角色權限，依醫師、護理、批價、藥師、管理者控管功能與資料範圍',
                '關聯式資料庫設計，以 Migration 進行版本控管，針對高頻查詢建立索引與正規化，確保大量病歷與交易資料下的查詢效能'
              ]
            },
            {
              heading: '核心功能模組',
              bullets: [
                '掛號與門診排班：醫師班表、看診序號、現場與網路掛號流程',
                '電子病歷（EMR）與病人主檔：基本資料、就診歷史、診斷與病歷紀錄',
                '批價收費與健保申報：費用計算、自費與健保項目處理，自動產製健保署申報資料',
                '藥局處方與檢驗檢查：處方開立、藥品庫存控管、檢驗（LIS）資料串接'
              ]
            },
            {
              heading: '技術亮點與挑戰',
              bullets: [
                '模組化 API 架構：分層與模組化切分業務領域，降低耦合，並建立統一的例外處理與資料驗證機制',
                '系統整合：串接健保署申報、HL7 / FHIR 醫療資料交換標準及院內既有系統，解決異質系統間的資料格式轉換與一致性問題',
                '效能與高併發：Redis 快取熱點資料、Queue 將健保批次申報與報表非同步化、優化 Eloquent 查詢消除 N+1',
                '資安與權限：RBAC 分級、敏感個資加密儲存、操作稽核軌跡（Audit Log），符合醫療法規與個資保護要求'
              ]
            }
          ],
          tags: ['#Laravel', '#PHP', '#RESTful', '#MySQL', '#Redis', '#RBAC', '#HL7/FHIR'],
          links: []
        },
        {
          name: '人工生殖 HIS 與實驗室系統',
          period: '愛生育生物科技',
          role: '主導 / 架構 / 團隊帶領',
          summary: '主導「人工生殖 HIS 醫療系統」與「人工生殖實驗室系統」兩套核心系統，導入院所實際運作。系統以 AWS ECS Fargate 部署並實現 Auto Scaling，介接光學顯微鏡、標籤機、自動備血管機等硬體設備，讓院所流程全面無紙化、人力需求降低 30%。同時帶領團隊從 Codex 轉換到 Claude Code，全面導入 AI 輔助開發。',
          sections: [],
          tags: ['#ECS Fargate', '#AutoScaling', '#IoT', '#無紙化', '#Claude Code'],
          links: [
            { label: 'e-stork.com.tw', url: 'https://www.e-stork.com.tw/' },
            { label: 'icryobank.com', url: 'https://icryobank.com/' },
            { label: 'jp.icryobank.com', url: 'https://jp.icryobank.com/' }
          ]
        }
      ],
      linksLabel: '相關網站'
    },

    skills: {
      groups: [
        ['languages', ['PHP', 'Node.js', 'Python', 'Java']],
        ['frameworks', ['Laravel', 'React']],
        ['web', ['HTML', 'CSS', 'JavaScript']],
        ['database', ['MySQL', 'MariaDB', 'MSSQL', 'Redis', 'MongoDB']],
        ['aws', ['EC2', 'ECS Fargate', 'ECR', 'RDS', 'Route 53', 'CloudFront', 'WAF', 'Lambda', 'VPC']],
        ['devops', ['Git', 'Jenkins', 'Docker', 'CI/CD', 'Linux', 'Zabbix', 'PRTG']],
        ['ai', ['Claude Code', 'Codex', 'Claude Teams 管理']],
        ['saas', ['Google Workspace', 'ClickUp', 'LINE Bot', 'Google Apps Script', 'Trello']],
        ['hardware', ['LED 製程', 'IoT 設備介接', 'AutoCAD', 'SolidWorks']]
      ],
      spokenKey: 'spoken',
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
        { title: '策略與沉穩', text: '圍棋業餘五段，曾代表中興大學出賽。長年對弈讓我邏輯清晰、能在壓力下冷靜判斷，這正是帶團隊與做技術決策最需要的素質。' },
        { title: '利他之心', text: '曾陪伴自閉症兒童、為偏鄉國小辦營隊，幫助弱勢是我願意持續一生的事。' },
        { title: '團隊與目標感', text: '大學籃球系隊主力，拿過全校冠軍、全國第四，享受一群人為同一目標拚搏的過程。' },
        { title: '規劃力與毅力', text: '以一年半規劃、半年時間，單車從北京騎到巴黎，完成「30 歲前看世界」的夢想。從零規劃、評估地形里程做風險管理、全程英文溝通、獨立面對每一個突發狀況。它讓我相信：只要有毅力，幾乎沒有做不到的事。' }
      ],
      value: {
        title: '我能帶來的價值',
        text: '結合硬體與軟體的雙重背景，以及長期面對客戶累積的應變力，為公司打造穩健可擴充的資訊架構、帶出能打硬仗的團隊，並讓成果實際反映在效率與獲利上。'
      }
    },

    contact: {
      name: '張復 Allen Chang',
      openTo: '後端工程師 / Backend Engineer',
      location: '新竹, Taiwan',
      keys: { name: 'name', email: 'email', github: 'github', linkedin: 'linkedin', openTo: 'open_to', location: 'location' }
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
      footer: 'Built with plain HTML / CSS / JS · Hosted on GitHub Pages',
      source: 'source',
      helpIntro: 'Available commands:',
      help: [
        ['help', 'show this help'],
        ['about', 'about me'],
        ['exp', 'work experience (alias: experience)'],
        ['projects', 'project highlights'],
        ['skills', 'skill list'],
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
      catUsage: 'cat: missing file operand, e.g. cat skills.yaml',
      langSet: 'Language switched to English',
      themeSet: 'Theme switched to {theme}',
      themeUnknown: 'Unknown theme: {theme}. Available: dark, light, dracula',
      sudo: 'allen is not in the sudoers file. This incident will be reported 🙂',
      exit: "Thanks for visiting! It's a static page, there is no exit 👋",
      cleared: '',
      top: '→ back to top',
      noHistory: '(no history yet)',
      noscript: 'This page needs JavaScript. Contact: junkfood1106@gmail.com · github.com/junkfu'
    },

    whoami: {
      line: 'Allen Chang (張復)',
      sub: 'IT Manager · Backend Engineer · Hardware + Software'
    },

    neofetch: {
      rows: [
        ['Name', 'Allen Chang (張復)'],
        ['Role', 'IT Manager @ BIOLOVE Biotechnology'],
        ['Open to', 'Backend Engineer'],
        ['Location', 'Hsinchu, Taiwan'],
        ['Experience', '9+ years (hardware → software → leading an IT team)'],
        ['Team', 'IT dept, 13+ people (software + hardware)'],
        ['Education', 'B.S. Electrical Engineering, National Chung Hsing University'],
        ['Stack', 'PHP / Laravel · Node.js · Python · React · MySQL · AWS'],
        ['AI', 'Claude Code · Codex (led team adoption)'],
        ['Motto', '"Don\'t hire those you doubt; don\'t doubt those you hire."']
      ],
      tags: ['#AWS', '#VibeCoding', '#HardwareSoftware', '#Communicator', '#ChallengeSeeker', '#LogicalThinker']
    },

    about: {
      paragraphs: [
        'An IT manager equally at home with hardware and software, I grew from engineer to leading a 20-person IT team. I took a medical information system that was years behind the industry and rebuilt it to the standard of a modern software company: Git, Jenkins, Docker and CI/CD, with the whole stack migrated from on-premises to AWS.',
        'I led an assisted-reproduction HIS and laboratory system into live clinical use, integrating microscopes, label printers and other IoT devices to make clinic operations fully paperless and cut manpower needs by 30%, and rolled out Claude Code for AI-assisted development across the entire team.',
        'My career started in LED product development, moved into software, and grew into running an IT department. I firmly believe processes and systems only work because people run them: once the people are aligned, everything else falls into place. Accountable and persistent, I can draw the blueprint and get the team to deliver it.'
      ]
    },

    experience: {
      current: 'HEAD -> now',
      items: [
        {
          period: '2025/1 ~ present',
          title: 'IT Manager',
          company: 'BIOLOVE Biotechnology Co., Ltd.',
          meta: 'Software project lead · Team of 13+ · Hsinchu · Biotech R&D',
          summary: 'Medical information system development, cloud infrastructure and cross-team collaboration: end-to-end ownership from architecture planning and system integration to AI automation rollout.',
          groups: [
            {
              heading: 'Cloud Infrastructure / AWS',
              bullets: [
                'Migrated from EC2 to ECS Fargate, improving deployment flexibility and resource utilization while cutting cloud compute cost by about 30%',
                'Manage Route 53 DNS; set up CloudFront and Google Workspace SPF / DMARC to harden domain and email security',
                'Led the RDS MySQL migration and cost optimization; introduced scheduled auto start/stop for dev environments to cut off-hours spend',
                'Designed WAF / proxy IP allow-lists'
              ]
            },
            {
              heading: 'System Development / DevOps',
              bullets: [
                'Own development and operations of the HIS, built with PHP (Laravel) and React',
                'Established a containerized development workflow with ECR image management for consistent, reproducible delivery'
              ]
            },
            {
              heading: 'Cross-system Integration',
              bullets: [
                'Led API integration between the HIS and external platforms: patient sync, cryo-inventory, billing and appointment modules',
                'Administer enterprise SaaS (Google Workspace, ClickUp) with automation rules and permission governance',
                'Connected ClickUp, Gmail, Google Calendar and Git to automate R&D and project workflows',
                'Rolled out and administer Claude Teams (Primary Owner): team AI usage guidelines and usage analytics'
              ]
            }
          ],
          tags: ['#SystemArchitecture', '#SystemIntegration', '#SoftwareDevelopment', '#AWS', '#HardwareSoftwareIntegration']
        },
        {
          period: '2017/10 ~ 2024/12 (7 yrs 3 mos)',
          title: 'IT Manager',
          company: 'Stork Fertility Center (送子鳥診所)',
          meta: 'Software project lead · Team of 9–12 · Hsinchu · Clinic, 100–500 staff',
          summary: 'Grew from engineer to head of IT in three years, expanding the team from 3 to 10+ while managing both software and hardware departments, and built the company\'s development practice from the ground up.',
          groups: [
            {
              heading: null,
              bullets: [
                'Introduced Git version control',
                'Established CI/CD practice with Jenkins',
                'Containerized VMs with Docker, easing the deployment burden on the dev team',
                'Systematic network and host monitoring (Zabbix, PRTG) wired to LINE Notify for real-time alerts',
                'Migrated on-premises servers to AWS for agile development and data backup (EC2, ECS, RDS, CDN, VPC, Route 53, Lambda)',
                'Integrated heterogeneous systems with open-source tools (Trello, LINE Bot, Google Apps Script) customized to clinical workflows',
                'PHP web development on an industry-standard framework, unifying code style for maintainability and readability'
              ]
            }
          ],
          tags: ['#SoftwareDevelopment', '#ProjectCoordination', '#Laravel', '#PHP', '#MySQL', '#Node.js']
        },
        {
          period: '2015/9 ~ 2017/2 (1 yr 6 mos)',
          title: 'Software Engineer',
          company: 'Wormhole (蟲洞)',
          meta: 'Hsinchu · Software services',
          summary: 'Seeing where mobile and cloud were heading, I taught myself Java and Android and built an MES for plastic injection molding. In a small team I handled everything from project rollout and development to web design and customer support.',
          groups: [
            {
              heading: null,
              bullets: [
                'Java application development (plastic-injection MES)',
                'Client project implementation and rollout',
                'Web development (HTML / CSS / JS)',
                'Maintenance and bug fixes for existing client systems',
                'Database design and development (MySQL / Redis / MongoDB)'
              ]
            }
          ],
          tags: ['#Java', '#MySQL', '#HTML', '#CSS', '#JavaScript', '#SoftwareDevelopment']
        },
        {
          period: '2012/9 ~ 2015/3 (2 yrs 7 mos)',
          title: 'Product Development Engineer',
          company: 'Advanced Optoelectronic Technology (榮創能源科技)',
          meta: 'Optoelectronics engineer · Hukou, Hsinchu · LED industry, 500+ staff',
          summary: 'LED product development: learned the full product lifecycle from raw material to mass production and sharpened cross-department coordination.',
          groups: [
            {
              heading: null,
              bullets: [
                'LED product development; hands-on with LED fabrication and optoelectronics',
                '2D / 3D drafting (AutoCAD, SolidWorks)',
                'Customer technical support and failure analysis, with frequent trips to Korea and mainland China'
              ]
            }
          ],
          tags: ['#LED', '#Optoelectronics', '#AutoCAD', '#SolidWorks', '#FailureAnalysis']
        }
      ]
    },

    projects: {
      items: [
        {
          name: 'HiStork',
          period: '2023/2 ~ 2025/4',
          role: 'PM / System Architect / Backend',
          summary: 'Led the design and development of a Hospital Information System (HIS) backend API platform for clinics, built on Laravel 11 / PHP 8.2 with a decoupled frontend and RESTful APIs. It integrates registration and outpatient scheduling, electronic medical records, billing and National Health Insurance (NHI) claims, pharmacy prescriptions and lab orders, serving as the operational hub of the clinic. Owned overall architecture, technology selection, API specification and database design, and led the backend team through development, testing, launch and operations.',
          sections: [
            {
              heading: 'Architecture & Technology',
              bullets: [
                'Modular Laravel 11 + PHP 8.2 backend using a Controller–Service–Repository layering to decouple business logic from data access',
                'RESTful API design with versioning and API Resources for a unified response format, easing integration for web, mobile and third parties',
                'Token-based auth (Laravel Sanctum) combined with an RBAC model scoped by role: physicians, nursing, billing, pharmacists, administrators',
                'Relational schema managed through migrations, with indexing and normalization for high-frequency queries over large volumes of records and transactions'
              ]
            },
            {
              heading: 'Core Modules',
              bullets: [
                'Registration & outpatient scheduling: physician rosters, visit numbers, walk-in and online registration',
                'Electronic medical records (EMR) & patient master data: demographics, visit history, diagnoses and notes',
                'Billing & NHI claims: fee calculation, self-pay vs. insured items, automated generation of NHI claim files',
                'Pharmacy & lab: prescriptions, drug inventory control, and LIS data exchange'
              ]
            },
            {
              heading: 'Highlights & Challenges',
              bullets: [
                'Modular API architecture: domains split by layer and module for low coupling, with unified exception handling and validation',
                'System integration: NHI claims, HL7 / FHIR healthcare data exchange, and legacy in-house systems, resolving format conversion and consistency across heterogeneous systems',
                'Performance & concurrency: Redis caching of hot data, queue-based async processing for batch claims and reports, and Eloquent query tuning to eliminate N+1',
                'Security & access control: tiered RBAC, encrypted storage of sensitive personal data and audit logging, meeting medical regulations and data-protection requirements'
              ]
            }
          ],
          tags: ['#Laravel', '#PHP', '#RESTful', '#MySQL', '#Redis', '#RBAC', '#HL7/FHIR'],
          links: []
        },
        {
          name: 'Assisted-Reproduction HIS & Laboratory System',
          period: 'BIOLOVE Biotechnology',
          role: 'Lead / Architecture / Team leadership',
          summary: 'Led two core systems, an assisted-reproduction HIS and an assisted-reproduction laboratory system, into live clinical use. Deployed on AWS ECS Fargate with auto scaling, the systems integrate directly with optical microscopes, label printers and automated blood-tube preparation machines, making clinic operations fully paperless and cutting the manpower required by 30%. Also led the team\'s transition from Codex to Claude Code, rolling out AI-assisted development across the board.',
          sections: [],
          tags: ['#ECS Fargate', '#AutoScaling', '#IoT', '#Paperless', '#Claude Code'],
          links: [
            { label: 'e-stork.com.tw', url: 'https://www.e-stork.com.tw/' },
            { label: 'icryobank.com', url: 'https://icryobank.com/' },
            { label: 'jp.icryobank.com', url: 'https://jp.icryobank.com/' }
          ]
        }
      ],
      linksLabel: 'Related sites'
    },

    skills: {
      groups: [
        ['languages', ['PHP', 'Node.js', 'Python', 'Java']],
        ['frameworks', ['Laravel', 'React']],
        ['web', ['HTML', 'CSS', 'JavaScript']],
        ['database', ['MySQL', 'MariaDB', 'MSSQL', 'Redis', 'MongoDB']],
        ['aws', ['EC2', 'ECS Fargate', 'ECR', 'RDS', 'Route 53', 'CloudFront', 'WAF', 'Lambda', 'VPC']],
        ['devops', ['Git', 'Jenkins', 'Docker', 'CI/CD', 'Linux', 'Zabbix', 'PRTG']],
        ['ai', ['Claude Code', 'Codex', 'Claude Teams admin']],
        ['saas', ['Google Workspace', 'ClickUp', 'LINE Bot', 'Google Apps Script', 'Trello']],
        ['hardware', ['LED fabrication', 'IoT device integration', 'AutoCAD', 'SolidWorks']]
      ],
      spokenKey: 'spoken',
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
        { title: 'Strategic and composed', text: 'As an amateur 5-dan Go player who competed for National Chung Hsing University, years at the board have trained me to think clearly and stay calm under pressure, exactly what leading a team and making technical calls demand.' },
        { title: 'Giving back', text: 'I have mentored children with autism and run summer camps for schools in remote areas. Helping those who are disadvantaged is something I intend to keep doing for life.' },
        { title: 'Team and shared purpose', text: 'As a starter on my university basketball team, I won a campus championship and placed fourth nationally. I love the feeling of a group working toward the same goal.' },
        { title: 'Planning and grit', text: 'I spent a year and a half planning, then six months cycling from Beijing to Paris, fulfilling a dream to see the world before turning 30. Built from nothing, with terrain and distance assessed as risk management, conducted in English the whole way, facing every surprise on my own. It taught me that with enough persistence almost nothing is out of reach.' }
      ],
      value: {
        title: 'The value I bring',
        text: 'A dual hardware-and-software background plus the adaptability that comes from years on the front line with customers: I build resilient, scalable IT architecture, develop a team that can take on hard challenges, and turn that into real gains in efficiency and profit.'
      }
    },

    contact: {
      name: 'Allen Chang (張復)',
      openTo: 'Backend Engineer',
      location: 'Hsinchu, Taiwan',
      keys: { name: 'name', email: 'email', github: 'github', linkedin: 'linkedin', openTo: 'open_to', location: 'location' }
    }
  }
};
