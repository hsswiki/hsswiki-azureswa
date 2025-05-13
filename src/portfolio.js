import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// Doc: https://react.i18next.com/getting-started#basic-sample
// https://github.com/i18next/i18next-browser-languageDetector
// Query param: `/?lng=en`
import detector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      header: {
        home: "Home",
        education: "Education",
        experience: "Experience",
        projects: "Projects",
        openSource: "Open Source",
        contactMe: "Contact Me",
      },
      chatbot: {
        title: "Shen's AI Assistant",
        askInvitation:
          "Ask me anything about Shen! To continue our chat, may I have your invitation code please? Typically, it can be found on the resumes Shen sents out 😊",
        invalidInvitation:
          "The invitation code is invalid😢 Please reenter your invitation code or reach out to Shen for a new code. Thank you.",
        validInvitation:
          "Thank you for coming! How may I assist you with my knowledge of Shen?",
        thinking: "Let me think...",
        takeLonger:
          "(The assistant is still responding... It takes longer than usual. Thank you for your patience 😊)",
        error: "Network error. Please try again later.",
        placeholder: "E.g. Briefly introduce Shen's professional experience",
      },
      home: {
        greeting: {
          title: "HAN Shen",
          nickname: "System Architect",
          subTitle:
            "A passionate engineer focusing on system design and development to build scalable and sustainable solutions that create social value. Working languages include English, Chinese, and Japanese.",
        },
        skills: {
          whatIDo: "What I Do?",

          aiSkillTitle: "AI & Data Science",
          aiSkill1:
            "Building end-to-end LLM & RAG solutions for document analysis and conversational AI",
          aiSkill2:
            "Integrating NLP, OCR, and predictive modeling into cloud data workflows",
          aiSkill3:
            "Developing & optimizing scalable ML models for classification, regression, and quantitative analysis",

          cloudSkillTitle: "Cloud Solution Architecture",
          cloudSkill1:
            "Architecting scalable, resilient cloud solutions on multiple cloud platforms",
          cloudSkill2:
            "Designing event-driven & layered cloud architectures for data processing",
          cloudSkill3:
            "Automating cloud infrastructure & deployment with IaC and CI/CD",

          fullStackSkillTitle: "Full Stack Development",
          fullStackSkill1:
            "Leading application development, system architecture, and API design",
          fullStackSkill2:
            "Developing cloud-based microservices, integrating with SQL & NoSQL databases",
          fullStackSkill3:
            "Applying design patterns for modular, scalable, and maintainable systems",

          dataSkillTitle: "Big Data & Data Engineering",
          dataSkill1:
            "Designing & implementing scalable ETL/ELT pipelines for large-scale data processing",
          dataSkill2:
            "Developing cloud data warehousing solutions, including modeling and optimization",
          dataSkill3:
            "Orchestrating data workflows, ensuring quality and stability",
        },
      },
      education: {
        title: "Education",
        subtitle: "Degrees and Certifications",
        details:
          "My graduate studies and professional certifications provided a strong foundation in core computer science principles and practical experience in key areas relevant to modern software development and data-intensive applications.",
        degrees: {
          title: "Degrees Received",
          graduateDegreeTitle: "The University of Chicago",
          graduateDegreeSubtitle: "Master of Science in Computer Science",
          graduateDegreeDuration: "",
          graduateDegreeSentence1:
            "Relevant coursework included Machine Learning, Algorithms, Cloud Computing, Big Data Architectures, Databases, and Parallel Programming.",
          graduateDegreeSentence2:
            "Gained practical experience through capstone projects and tutoring in classes like data analysis and computational methods.",
          graduateDegreeSentence3:
            "Developed a strong theoretical foundation coupled with hands-on project experience in cutting-edge technical domains.",
          undergraduateDegreeTitle: "Nankai University",
          undergraduateDegreeSubtitle: "Dual Bachelor in Laws and Economics",
          undergraduateDegreeDuration: "",
          undergraduateDegreeSentence1:
            "Completed foundational coursework relevant to technical and analytical fields, including Database Systems, Object-Oriented Programming, and Statistical Analysis.",
          undergraduateDegreeSentence2:
            "Recognized for academic excellence with university scholarships and gained international exposure studying abroad at UC Berkeley.",
          undergraduateDegreeSentence3:
            "Led award-winning student entrepreneurship projects, honing skills in project management and the execution of impactful initiatives.",
        },
        certificationsTitle: "Certifications",
      },
      experience: {
        title: "Experience",
        subtitle: "Work, Internship, and Volunteering",
        details:
          "I design and build scalable, end-to-end technical solutions. My experiences focus on developing cloud-native systems, robust data pipelines, and AI/ML applications, including cutting-edge Generative AI and RAG implementations, to drive significant business impact.",
        work: {
          title: "Work Experience",
          experience1: {
            title: "Senior Technical Lead",
            subtitle: "PwC US Consulting Solutions AC Shanghai",
            duration: "2021 - Present",
            location: "Shanghai, China",
            details:
              "Led backend development for GenAI applications, implementing RAG pipelines on cloud platforms, enhancing data automation, and designing scalable architectures for financial and enterprise use cases.",
          },
          experience2: {
            title: "Project Associate - Data Systems Analyst",
            subtitle: "Chapin Hall at the University of Chicago",
            duration: "2017 - 2019",
            location: "Chicago, US",
            details:
              "Designed and built data warehouses, developed ETL pipelines for large-scale administrative data, applied machine learning for predictive modeling, and contributed to open-source SDE projects.",
          },
        },
        internships: {
          title: "Internships",
          experience1: {
            title: "Research Assistant",
            subtitle: "BIP Lab at the University of Chicago",
            duration: "2017",
            location: "Chicago, US",
            details:
              "Supported behavioral economics research projects involving data collection and analysis. Analyzed research data and developed data analysis manuals.",
          },
          experience2: {
            title: "Policy Labs Intern",
            subtitle: "Chapin Hall at the University of Chicago",
            duration: "2017",
            location: "Chicago, US",
            details:
              "Analyzed large administrative datasets using Python, R, and Tableau. Applied clustering and regression techniques, and presented data visualizations to policymakers to inform evidence-based decisions.",
          },
        },
        volunteering: {
          title: "Volunteering",
          experience1: {
            title: "Volunteer Instructor",
            subtitle: "U.S. Department of Energy STEM-CON AI Workshop",
            duration: "2019",
            location: "Chicago, US",
            details:
              "Served as a volunteer instructor, demonstrating AI, Machine Learning, and VR technologies to high-school students.",
          },
          experience2: {
            title: "Volunteer Python Workshop Instructor",
            subtitle: "University of Chicago",
            duration: "2017",
            location: "Chicago, US",
            details:
              "Developed and delivered weekly workshops focused on Python for data analysis to graduate students.",
          },
        },
      },
      projects: {
        title: "Projects",
        details:
          "My open source projects showcase end-to-end system design, cloud development, and expertise in AI/ML applications. I focus on building scalable, modular solutions using modern technologies to deliver impactful results.",
        moreProjectsButton: "More Projects",
        project1: {
          title: "HS's Wiki: Personal Website & Chatbot",
          subtitle: "Created on 2025-03-31",
          details:
            "Developed a full-stack personal website featuring a RAG-based chatbot digital assistant. Implemented a modular and scalable backend architecture utilizing Abstract Factory and Facade design patterns, allowing swappable components for chat models, embeddings, and vector stores. Deployed cost-effectively on Azure using free tiers, demonstrating efficient resource utilization and CI/CD.",
        },
        project2: {
          title: "PySpark Performance Tuning Sharing",
          subtitle: "Created on 2023-03-14",
          details:
            "Resources from a PySpark performance tuning session. Covers Spark architecture, properties, UI analysis, and code-level optimizations. Includes a helper script for property calculation and presentation slides to aid optimization efforts.",
        },
      },
      contact: {
        contactMe: "Contact Me",
        description:
          "Interested in discussing potential roles or collaborations? Feel free to get in touch. I can help with AI/ML, LLM/RAG, Cloud Architecture, Data Engineering, and Full Stack Development. Let's connect!",
        address: {
          title: "Address",
          subtitle: "West Nanjing Rd, Jing'an Dist, Shanghai, China 200040",
        },
      },
      // resumeLink:
      //   "https://drive.google.com/file/d/1bXRknv_h-XI_3CQ3SGPteGODtvEb7YvI/view?usp=sharing",
      // githubProfile: "https://github.com/ashutosh1919",
    },
  },
  zh: {
    translation: {
      header: {
        home: "网站主页",
        education: "教育背景",
        experience: "工作经验",
        projects: "项目经历",
        openSource: "开源网站",
        contactMe: "联系方式",
      },
      chatbot: {
        title: "韩绅的AI助理",
        askInvitation:
          "请随问我关于韩绅的任何问题！如需继续交流，请提供您的邀请码。通常您可以在韩绅发送给您的简历上找到该邀请码😊",
        invalidInvitation:
          "邀请码有误😢 请重新输入您的邀请码，或者联系韩绅获取新的邀请码，谢谢。",
        validInvitation: "感谢您的来访！关于韩绅的情况，我能如何为您提供帮助？",
        thinking: "让我思考一下...",
        takeLonger:
          "(助理仍在回复中... 此次回复比平时耗时稍长，感谢您的耐心等待😊)",
        error: "网络错误。请稍后再试。",
        placeholder: "例如：简单介绍一下韩绅的职业经历",
      },
      home: {
        greeting: {
          title: "韩 绅",
          nickname: "系统架构师",
          subTitle:
            "专注端到端系统设计与研发，致力于构建可持续、可扩展的技术解决方案，并创造社会价值。工作语言包含英、中、日三语。",
        },
        skills: {
          whatIDo: "技能领域",

          aiSkillTitle: "人工智能与数据科学",
          aiSkill1:
            "构建端到端的大语言模型(LLM)和RAG解决方案，用于文档智能处理与会话式AI应用",
          aiSkill2:
            "将自然语言处理(NLP)、OCR及预测建模等AI能力集成至云端数据工作流",
          aiSkill3:
            "开发并优化面向分类、回归及复杂定量分析场景的可扩展机器学习模型",

          cloudSkillTitle: "云解决方案架构",
          cloudSkill1: "在多云环境下设计高可用、高弹性、可扩展的云端解决方案",
          cloudSkill2: "设计基于事件驱动和分层原则的云架构，实现高效数据处理",
          cloudSkill3: "通过IaC和CI/CD实现云基础设施自动化管理与应用部署",

          fullStackSkillTitle: "全栈开发",
          fullStackSkill1: "负责应用程序架构规划、系统设计和API接口定义与实现",
          fullStackSkill2:
            "开发云端微服务，并与各类SQL和NoSQL数据库进行高效集成",
          fullStackSkill3:
            "运用软件设计模式构建模块化且易于扩展和长期维护的系统",

          dataSkillTitle: "大数据与数据工程",
          dataSkill1:
            "设计和构建可扩展的ETL/ELT数据管道，支持大规模数据处理与分析",
          dataSkill2: "开发云原生数据仓库解决方案，涵盖数据建模和性能优化",
          dataSkill3: "编排复杂数据工作流，确保数据质量、一致性与系统稳定性",
        },
      },
      education: {
        title: "教育背景",
        subtitle: "学位与认证",
        details:
          "研究生学习经历和专业认证为我在现代软件开发及数据密集型应用领域奠定了坚实的计算机科学理论基础，并积累了丰富的实践经验。",
        degrees: {
          title: "学位",
          graduateDegreeTitle: "芝加哥大学",
          graduateDegreeSubtitle: "计算机科学理学硕士",
          graduateDegreeDuration: "",
          graduateDegreeSentence1:
            "系统修读机器学习、算法设计、云计算架构、大数据处理、数据库原理及并行计算等核心课程，构建了全面的技术知识体系。",
          graduateDegreeSentence2:
            "通过课程项目实践与助教工作，在数据分析与算法优化领域积累了深度研究经验，强化了理论转化能力。",
          graduateDegreeSentence3:
            "在前沿技术领域，通过理论学习与实际项目开发的结合，既夯实了技术底层逻辑，又提升了复杂问题的工程化解决能力。",
          undergraduateDegreeTitle: "南开大学",
          undergraduateDegreeSubtitle: "法学与经济学双学士",
          undergraduateDegreeDuration: "",
          undergraduateDegreeSentence1:
            "完成数据库系统、面向对象程序设计、统计分析等技术与分析领域基础课程的学习，建立了跨学科知识储备。",
          undergraduateDegreeSentence2:
            "因优异学业表现获校级奖学金，并通过加州大学伯克利分校访学项目，拓宽了国际学术视野，深化了跨文化协作认知。",
          undergraduateDegreeSentence3:
            "作为核心负责人主导大学生创业项目并屡获表彰，在真实商业场景中锤炼了项目管理及资源协调的综合能力。",
        },
        certificationsTitle: "相关认证",
      },
      experience: {
        title: "工作经验",
        subtitle: "工作、实习与志愿活动经验",
        details:
          "致力于设计并构建具备可扩展性的端到端技术解决方案。工作经验主要集中于开发云原生系统、数据管道以及人工智能/机器学习应用，其中涵盖生成式人工智能与检索增强生成（RAG）技术，以推动显著的业务影响。",
        work: {
          title: "工作经历",
          experience1: {
            title: "高级技术专家",
            subtitle: "美国普华永道技术咨询上海优创中心",
            duration: "2021年至今",
            location: "上海",
            details:
              "领导生成式人工智能应用的后端开发工作，在云平台上实施检索增强生成（RAG）管道，提升数据自动化水平，并为金融与企业应用场景设计可扩展的架构。",
          },
          experience2: {
            title: "数据系统分析师",
            subtitle: "芝加哥大学Chapin Hall中心",
            duration: "2017年 - 2019年",
            location: "芝加哥",
            details:
              "设计并构建数据仓库，为大规模行政数据开发提取、转换与加载（ETL）管道，运用机器学习进行预测建模，并参与开源软件开发项目。",
          },
        },
        internships: {
          title: "实习经历",
          experience1: {
            title: "研究助理",
            subtitle: "芝加哥大学Behavioral Insights and Parenting (BIP)实验室",
            duration: "2017年",
            location: "芝加哥",
            details:
              "参与行为经济学研究项目，负责对研究数据进行分析，并编写分析手册。",
          },
          experience2: {
            title: "政策实验室（Policy Labs）实习生",
            subtitle: "芝加哥大学Chapin Hall中心",
            duration: "2017年",
            location: "芝加哥",
            details:
              "运用Python、R和Tableau等工具分析大型行政数据集。采用聚类与回归技术进行数据分析，并向政策制定者展示数据可视化结果，为基于证据的决策提供支持。",
          },
        },
        volunteering: {
          title: "志愿活动",
          experience1: {
            title: "人工智能工作坊讲师",
            subtitle: "美国能源部STEM - CON人工智能工作坊",
            duration: "2019年",
            location: "芝加哥",
            details:
              "担任志愿讲师，向高中生展示人工智能、机器学习和虚拟现实技术。",
          },
          experience2: {
            title: "Python工作坊讲师",
            subtitle: "芝加哥大学",
            duration: "2017年",
            location: "芝加哥",
            details: "协助每周开展基于Python的研究生数据分析工作坊。",
          },
        },
      },
      projects: {
        title: "项目经历",
        details:
          "我的开源项目展示了端到端的系统设计、云开发以及人工智能/机器学习应用方面的专业能力。我专注于运用现代技术构建具备可扩展性与模块化的解决方案，以实现具有竞争力的成果。",
        moreProjectsButton: "更多项目",
        project1: {
          title: "HS维基：个人网站与聊天机器人",
          subtitle: "创建于2025年3月31日",
          details:
            "全栈开发个人网站，该网站配备了基于检索增强生成（RAG）技术的聊天机器人数字助理。采用抽象工厂与外观设计模式，实现了模块化且可扩展的后端架构，使得聊天模型、嵌入层与向量存储等组件可灵活替换。借助Azure免费层级进行经济高效的部署，展现了资源的高效利用以及持续集成/持续部署（CI/CD）的能力。",
        },
        project2: {
          title: "PySpark性能调优分享",
          subtitle: "创建于2023年3月14日",
          details:
            "PySpark性能调优分享会的资料。涵盖Spark架构、属性、UI分析和代码级优化。包含属性计算辅助脚本和演示幻灯片，以帮助进行优化工作。",
        },
      },
      contact: {
        contactMe: "联系方式",
        description:
          "如果您对潜在交流或合作机会感兴趣，欢迎随时与我联系。我专注于人工智能/机器学习、大语言模型/检索增强生成、云架构、数据工程及全栈开发领域。期待与您沟通！",
        address: {
          title: "地址",
          subtitle: "上海市静安区南京西路 邮编200040",
        },
      },
    },
  },
  ja: {
    translation: {
      header: {
        home: "ホーム",
        education: "学歴情報",
        experience: "職務経験",
        projects: "プロジェクト",
        openSource: "オープンソース",
        contactMe: "お問い合わせ",
      },
      chatbot: {
        title: "紳のAIアシスタント",
        askInvitation:
          "紳について何でもお尋ねください！チャットを続けるには、招待コードをご入力いただけますでしょうか？通常、紳がお送りする履歴書に記載されています😊",
        invalidInvitation:
          "招待コードが無効です😢 恐れ入りますが、もう一度招待コードを入力いただくか、新しいコードについて紳にご連絡ください。よろしくお願いいたします。",
        validInvitation:
          "ご来訪ありがとうございます！紳に関する私の知識で、どのようなお手伝いができますでしょうか？",
        thinking: "考え中です...",
        takeLonger:
          "(アシスタントが応答中です... 通常より時間がかかっています。しばらくお待ちください😊)",
        error: "ネットワークエラーです。後でもう一度お試しください。",
        placeholder: "例：紳の職務経歴を簡単に紹介",
      },
      home: {
        greeting: {
          title: "韓 紳",
          nickname: "システムアーキテクト",
          subTitle:
            "エンドツーエンドのシステム設計・開発に注力し、持続可能かつスケーラブルな技術ソリューションを通じて社会価値の創造を目指しています。業務使用言語：英語、中国語、日本語。",
        },
        skills: {
          whatIDo: "スキルセット",

          aiSkillTitle: "AI・データサイエンス",
          aiSkill1:
            "文書分析や対話型AI向けに、エンドツーエンドのLLM・RAGソリューションを構築します",
          aiSkill2:
            "NLP、OCR、予測モデリングなどのAI機能をクラウドデータワークフローへ統合",
          aiSkill3:
            "分類、回帰、定量分析タスクに対応する、スケーラブルな機械学習モデルを開発・最適化",

          cloudSkillTitle: "クラウドソリューションアーキテクチャ",
          cloudSkill1:
            "複数クラウドプラットフォーム上で、スケーラブルかつレジリエントなクラウドソリューションを設計",
          cloudSkill2:
            "データ処理効率化のため、イベント駆動型および多層クラウドアーキテクチャを設計",
          cloudSkill3:
            "IaC（Infrastructure as Code）とCI/CDを活用し、クラウドインフラとデプロイを自動化",

          fullStackSkillTitle: "フルスタック開発",
          fullStackSkill1:
            "アプリケーション開発、システムアーキテクチャ、API設計を主導",
          fullStackSkill2:
            "マイクロサービスを開発し、SQL/NoSQLデータベースと連携",
          fullStackSkill3:
            "設計パターンを適用し、モジュール性・スケーラビリティ・保守性の高いシステムを構築",

          dataSkillTitle: "ビッグデータ・データエンジニアリング",
          dataSkill1:
            "大規模データ処理向けに、スケーラブルなETL/ELTパイプラインを設計・実装",
          dataSkill2:
            "データモデリングや最適化を含む、クラウドデータウェアハウジングソリューションを開発",
          dataSkill3:
            "データワークフローのオーケストレーションにより、品質と安定性を確保",
        },
      },
      education: {
        title: "学歴情報",
        subtitle: "学位および認定",
        details:
          "大学院での学習およびプロフェッショナル認定により、最新のソフトウェア開発およびデータ集約型アプリケーションに関連する主要分野において、計算機科学の強固な基盤と実践的な経験を習得しました。",
        degrees: {
          title: "取得学位",
          graduateDegreeTitle: "シカゴ大学",
          graduateDegreeSubtitle: "コンピューターサイエンス修士",
          graduateDegreeDuration: "",
          graduateDegreeSentence1:
            "関連するコースワークには、データベースシステム、オブジェクト指向プログラミング、統計分析など、技術・分析分野に関連する基礎コースワークを修了。",
          graduateDegreeSentence2:
            "データ分析や計算手法などのクラスにおいて、キャップストーンプロジェクトやチュータリングを通じて実践的な経験を積みました。",
          graduateDegreeSentence3:
            "最先端の技術領域において、理論的な基盤を確立しつつ、実践的なプロジェクト経験を豊富に積みました。",
          undergraduateDegreeTitle: "南開大学",
          undergraduateDegreeSubtitle: "法学・経済学学士（二重専攻）",
          undergraduateDegreeDuration: "",
          undergraduateDegreeSentence1:
            "データベースシステム、オブジェクト指向プログラミング、統計分析など、技術・分析分野に関連する基礎コースワークを修了。",
          undergraduateDegreeSentence2:
            "学業優秀につき大学奨学金を受給。カリフォルニア大学バークレー校への留学で国際的な視野を習得しました。",
          undergraduateDegreeSentence3:
            "受賞歴のある学生起業プロジェクトを主導し、プロジェクトマネジメントやインパクトのあるイニシアチブ遂行スキルを培いました。",
        },
        certificationsTitle: "認定資格",
      },
      experience: {
        title: "職務経験",
        subtitle: "職務、インターンシップとボランティア活動",
        details:
          "スケーラブルなエンドツーエンド技術ソリューションの設計及び構築を専門としています。クラウドネイティブシステム、堅牢なデータパイプライン、最先端の生成AIやRAG実装を含むAI/MLアプリケーション開発に焦点を当て、大きなビジネスインパクトを創出しています。",
        work: {
          title: "職務経験",
          experience1: {
            title: "シニアテクニカルリード",
            subtitle: "PwC米国コンサルティング上海事務所",
            duration: "2021年 - 現在",
            location: "中国 上海",
            details:
              "生成AIアプリケーションのバックエンド開発を主導し、クラウド上でのRAGパイプラインの実装、データ自動化の強化、金融及びエンタープライズ向けユースケースのスケーラブルなアーキテクチャ設計を行いました。",
          },
          experience2: {
            title: "プロジェクトアソシエイト - データシステムアナリスト",
            subtitle: "シカゴ大学チャピンホールセンター",
            duration: "2017年 - 2019年",
            location: "米国 シカゴ",
            details:
              "データウェアハウスの設計及び構築、大規模行政データ向けETLパイプライン開発、機械学習を用いた予測モデリングを行い、オープンソースのソフトウェア開発プロジェクトに貢献しました。",
          },
        },
        internships: {
          title: "インターンシップ",
          experience1: {
            title: "リサーチアシスタント",
            subtitle: "シカゴ大学BIPラボ",
            duration: "2017年",
            location: "米国 シカゴ",
            details:
              "データ収集及び分析を含む行動経済学研究プロジェクトを支援。研究データの分析や、データ分析マニュアルの作成を担当しました。",
          },
          experience2: {
            title: "ポリシーラボ インターン",
            subtitle: "シカゴ大学 チャピンホールセンター",
            duration: "2017年",
            location: "米国 シカゴ",
            details:
              "Python、R、Tableauを用いて大規模行政データセットを分析。クラスター分析及び回帰分析を適用し、データビジュアライゼーションを用いて政策立案者へ提示し、エビデンスに基づいた意思決定を支援しました。",
          },
        },
        volunteering: {
          title: "ボランティア",
          experience1: {
            title: "ボランティア講師",
            subtitle: "米国エネルギー省STEM-CON AIワークショップ",
            duration: "2019年",
            location: "米国 シカゴ",
            details:
              "ボランティア講師として、高校生にAI、機械学習、VR技術のデモンストレーションを実施しました。",
          },
          experience2: {
            title: "Pythonワークショップ ボランティア講師",
            subtitle: "シカゴ大学",
            duration: "2017年",
            location: "米国 シカゴ",
            details:
              "大学院生向けに、データ分析のためのPythonに焦点を当てた週次ワークショップを開発及び提供しました。",
          },
        },
      },
      projects: {
        title: "プロジェクト",
        details:
          "オープンソースプロジェクトは、エンドツーエンドのシステム設計、クラウド開発、AI/MLアプリケーションに関する専門知識を示しています。スケーラブルでモジュール化されたソリューションを現代技術を用いて構築し、インパクトのある成果を生み出すことに注力しています。",
        moreProjectsButton: "その他のプロジェクト",
        project1: {
          title: "HSのウィキ：個人ウェブサイトとチャットボット",
          subtitle: "作成日：2025年3月31日",
          details:
            "RAGベースのチャットボットデジタルアシスタントを備えたフルスタックの個人ウェブサイトを開発しました。抽象ファクトリー及びファサード設計パターンを用いたモジュール式でスケーラブルなバックエンドアーキテクチャを実装し、チャットモデル、埋め込みモデル、ベクトルストアのコンポーネントを切り替え可能にしました。Azureの無料ティアを活用して費用対効果の高いデプロイを実現し、効率的なリソース利用とCI/CDを示しました。",
        },
        project2: {
          title: "PySpark パフォーマンスチューニング共有",
          subtitle: "作成日：2023年3月14日",
          details:
            "PySparkパフォーマンスチューニング共有セッションのリソースです。Sparkアーキテクチャ、プロパティ、UI分析、コードレベルの最適化をカバーしています。最適化作業を支援するためのプロパティ計算ヘルパースクリプトとプレゼンテーションスライドが含まれています。",
        },
      },
      contact: {
        contactMe: "お問い合わせ",
        description:
          "潜在的な役割や共同作業について話し合いたいなら、どうぞお気軽にご連絡ください。AI/ML、LLM/RAG、クラウドアーキテクチャ、データエンジニアリング、フルスタック開発を専門としています。繋がりましょう！",
        address: {
          title: "住所",
          subtitle: "上海市静安区南京西路 郵便番号200040",
        },
      },
    },
  },
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    // lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

/* Change this file to get your personal Porfolio */

// Website related settings
const settings = {
  // isSplash: true, // Change this to false if you don't want Splash screen.
  isSplash: false, // Change this to false if you don't want Splash screen.
  // logoName: "HAN Shen", // Word art logo on the upper left
  logoName: "HanShen", // Word art logo on the upper left
  lastUpdatedDate: "May 3, 2025",
};

//SEO Related settings
const seo = {
  title: "HS's Wiki", // Website title
  description:
    "A passionate individual who always thrives to work on end to end products which develop sustainable and scalable social and technical systems to create impact.",
  og: {
    title: "HS's Wiki",
    type: "website",
    url: "http://hss.wiki/",
  },
};

//Home Page
const greeting = {
  // title: "Ashutosh Hathidara",
  // logo_name: "HanShen",
  // nickname: "layman_brother",
  // subTitle:
  // "A passionate individual who always thrives to work on end to end products which develop sustainable and scalable social and technical systems to create impact.",
  resumeLink: "",
  portfolio_repository: "",
  githubProfile: "https://github.com/hsswiki",
};

// Ref: https://fontawesome.com/search
const socialMediaLinks = [
  {
    name: "Email",
    link: "mailto:hi@hss.wiki",
    fontAwesomeIcon: "fa-telegram",
    backgroundColor: "#1877F2",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/shen-h/",
    fontAwesomeIcon: "fa-linkedin-in", // Reference https://fontawesome.com/icons/linkedin-in?style=brands
    backgroundColor: "#0077B5", // Reference https://simpleicons.org/?q=linkedin
  },
  {
    name: "Github",
    link: "https://github.com/hsswiki",
    fontAwesomeIcon: "fa-github", // Reference https://fontawesome.com/icons/github?style=brands
    backgroundColor: "#181717", // Reference https://simpleicons.org/?q=github
  },
  // {
  //   name: "YouTube",
  //   link: "https://youtube.com/c/DevSense19",
  //   fontAwesomeIcon: "fa-youtube", // Reference https://fontawesome.com/icons/youtube?style=brands
  //   backgroundColor: "#FF0000", // Reference https://simpleicons.org/?q=youtube
  // },
  // {
  //   name: "Gmail",
  //   link: "mailto:ashutoshhathidara98@gmail.com",
  //   fontAwesomeIcon: "fa-google", // Reference https://fontawesome.com/icons/google?style=brands
  //   backgroundColor: "#D14836", // Reference https://simpleicons.org/?q=gmail
  // },
  {
    name: "Instagram",
    link: "https://www.instagram.com/hss.wiki/",
    fontAwesomeIcon: "fa-instagram", // Reference https://fontawesome.com/icons/instagram?style=brands
    backgroundColor: "#E4405F", // Reference https://simpleicons.org/?q=instagram
  },
  {
    name: "X-Twitter",
    link: "https://x.com/hss_wiki",
    fontAwesomeIcon: "fa-x-twitter", // Reference https://fontawesome.com/icons/x-twitter?f=brands&s=solid
    backgroundColor: "#000000", // Reference https://simpleicons.org/?q=x
  },
  // {
  //   name: "Facebook",
  //   link: "https://www.facebook.com/laymanbrother.19/",
  //   fontAwesomeIcon: "fa-facebook-f", // Reference https://fontawesome.com/icons/facebook-f?style=brands
  //   backgroundColor: "#1877F2", // Reference https://simpleicons.org/?q=facebook
  // },
  // {
  //   name: "LeetCode-cn",
  //   link: "https://leetcode.cn/u/hsswiki/",
  //   fontAwesomeIcon: "fa-solid fa-code", // Reference https://fontawesome.com/icons/x-twitter?f=brands&s=solid
  //   // backgroundColor: "#000000", // Reference https://simpleicons.org/?q=x
  //   color: "#F79F1B",
  // },
];

// Ref: https://icon-sets.iconify.design/
// Ref: https://undraw.co/
const skills = {
  data: [
    {
      title: "aiSkillTitle",
      fileName: "DataScienceImg",
      skills: ["aiSkill1", "aiSkill2", "aiSkill3"],
      softwareSkills: [
        {
          skillName: "Python",
          fontAwesomeClassname: "logos:python",
        },
        {
          skillName: "Azure OpenAI Service",
          imageSrc: "azure_openai.svg",
        },
        {
          skillName: "Azure AI Search",
          imageSrc: "azure_ai_search.svg",
        },
        {
          skillName: "Amazon Sagemaker",
          imageSrc: "amazon_sagemaker.svg",
        },
        {
          skillName: "Amazon Bedrock",
          imageSrc: "amazon_bedrock.svg",
        },
        {
          skillName: "LangChain",
          fontAwesomeClassname: "simple-icons:langchain",
        },
        {
          skillName: "PySpark",
          fontAwesomeClassname: "devicon:apachespark-wordmark",
        },
        {
          skillName: "scikit-learn",
          fontAwesomeClassname: "devicon:scikitlearn",
        },
        {
          skillName: "Pandas",
          fontAwesomeClassname: "devicon:pandas",
        },
        {
          skillName: "NumPy",
          fontAwesomeClassname: "devicon:numpy",
        },
        {
          skillName: "Chroma",
          fontAwesomeClassname: "logos:chroma",
        },
        // {
        //   skillName: "Tensorflow",
        //   fontAwesomeClassname: "logos-tensorflow",
        //   style: {
        //     backgroundColor: "transparent",
        //   },
        // },
        // {
        //   skillName: "Keras",
        //   fontAwesomeClassname: "simple-icons:keras",
        //   style: {
        //     backgroundColor: "white",
        //     color: "#D00000",
        //   },
        // },
        // {
        //   skillName: "PyTorch",
        //   fontAwesomeClassname: "logos-pytorch",
        //   style: {
        //     backgroundColor: "transparent",
        //   },
        // },
        // {
        //   skillName: "Deeplearning",
        //   imageSrc: "deeplearning_ai_logo.png",
        // },
      ],
    },
    {
      title: "cloudSkillTitle",
      fileName: "CloudInfraImg",
      skills: ["cloudSkill1", "cloudSkill2", "cloudSkill3"],
      softwareSkills: [
        {
          skillName: "AWS",
          fontAwesomeClassname: "simple-icons:amazonaws",
          style: {
            color: "#FF9900",
          },
        },
        {
          skillName: "Azure",
          fontAwesomeClassname: "logos:microsoft-azure",
          style: {
            color: "#0089D6",
          },
        },
        {
          skillName: "GCP",
          fontAwesomeClassname: "simple-icons:googlecloud",
          style: {
            color: "#4285F4",
          },
        },
        {
          skillName: "Terraform",
          fontAwesomeClassname: "logos:terraform-icon",
        },
        {
          skillName: "Kubernetes",
          fontAwesomeClassname: "simple-icons:kubernetes",
          style: {
            color: "#326CE5",
          },
        },
        {
          skillName: "Helm",
          fontAwesomeClassname: "logos:helm",
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: {
            color: "#1488C6",
          },
        },
        {
          skillName: "MongoDB",
          fontAwesomeClassname: "simple-icons:mongodb",
          style: {
            color: "#47A248",
          },
        },
        {
          skillName: "PostgreSQL",
          fontAwesomeClassname: "logos:postgresql",
        },
        {
          skillName: "Redis",
          fontAwesomeClassname: "logos:redis",
        },
      ],
    },
    {
      title: "fullStackSkillTitle",
      fileName: "DesignImg",
      skills: ["fullStackSkill1", "fullStackSkill2", "fullStackSkill3"],
      softwareSkills: [
        {
          skillName: "Python",
          fontAwesomeClassname: "logos:python",
        },
        {
          skillName: "FastAPI",
          fontAwesomeClassname: "logos:fastapi-icon",
        },
        {
          skillName: "Django",
          fontAwesomeClassname: "logos:django-icon",
        },
        {
          skillName: "Flask",
          fontAwesomeClassname: "logos:flask",
        },
        {
          skillName: "HTML5",
          fontAwesomeClassname: "simple-icons:html5",
          style: {
            color: "#E34F26",
          },
        },
        {
          skillName: "JavaScript",
          fontAwesomeClassname: "simple-icons:javascript",
          style: {
            backgroundColor: "#000000",
            color: "#F7DF1E",
          },
        },
        {
          skillName: "CSS3",
          fontAwesomeClassname: "fa-css3",
          style: {
            color: "#1572B6",
          },
        },
        // {
        //   skillName: "Sass",
        //   fontAwesomeClassname: "simple-icons:sass",
        //   style: {
        //     color: "#CC6699",
        //   },
        // },
        {
          skillName: "ReactJS",
          fontAwesomeClassname: "simple-icons:react",
          style: {
            color: "#61DAFB",
          },
        },
        {
          skillName: "NodeJS",
          fontAwesomeClassname: "devicon-plain:nodejs-wordmark",
          style: {
            color: "#339933",
          },
        },
        {
          skillName: "Linux",
          fontAwesomeClassname: "devicon:linux",
        },
        {
          skillName: "Git",
          fontAwesomeClassname: "logos:git-icon",
        },
        // {
        //   skillName: "NPM",
        //   fontAwesomeClassname: "simple-icons:npm",
        //   style: {
        //     color: "#CB3837",
        //   },
        // },
        // {
        //   skillName: "Yarn",
        //   fontAwesomeClassname: "simple-icons:yarn",
        //   style: {
        //     color: "#2C8EBB",
        //   },
        // },
      ],
    },
    {
      title: "dataSkillTitle",
      fileName: "FullStackImg",
      skills: ["dataSkill1", "dataSkill2", "dataSkill3"],
      softwareSkills: [
        {
          skillName: "PySpark",
          fontAwesomeClassname: "devicon:apachespark-wordmark",
        },
        {
          skillName: "AWS EMR",
          imageSrc: "aws_emr.svg",
        },
        {
          skillName: "AWS Glue",
          imageSrc: "aws_glue.svg",
        },
        {
          skillName: "AWS Redshift",
          imageSrc: "aws_redshift.svg",
        },
        {
          skillName: "Azure Data Factory",
          imageSrc: "azure_data_factory.svg",
        },
        {
          skillName: "Azure Synapse Analytics",
          imageSrc: "azure_synapse_analytics.svg",
        },
        {
          skillName: "Databricks",
          imageSrc: "databricks.svg",
        },
        {
          skillName: "Snowflake",
          fontAwesomeClassname: "logos:snowflake-icon",
        },
        {
          skillName: "MySQL",
          fontAwesomeClassname: "logos:mysql",
        },
        {
          skillName: "PostgreSQL",
          fontAwesomeClassname: "logos:postgresql",
        },
        {
          skillName: "SQL Server",
          fontAwesomeClassname: "devicon-plain:microsoftsqlserver-wordmark",
        },
      ],
    },
  ],
};

// Education Page
const competitiveSites = {
  competitiveSites: [
    {
      siteName: "LeetCode",
      iconifyClassname: "simple-icons:leetcode",
      style: {
        color: "#F79F1B",
      },
      profileLink: "https://leetcode.com/layman_brother/",
    },
  ],
};

const degrees = {
  degrees: [
    {
      title: "education.degrees.graduateDegreeTitle",
      subtitle: "education.degrees.graduateDegreeSubtitle",
      logo_path: "uchicago_logo.png",
      alt_name: "UChicago",
      duration: "education.degrees.graduateDegreeSubtitle",
      descriptions: [
        "education.degrees.graduateDegreeSentence1",
        "education.degrees.graduateDegreeSentence2",
        "education.degrees.graduateDegreeSentence3",
      ],
      website_link: "https://www.uchicago.edu/",
    },
    {
      title: "education.degrees.undergraduateDegreeTitle",
      subtitle: "education.degrees.undergraduateDegreeSubtitle",
      logo_path: "nankai_logo.svg",
      alt_name: "Nankai University",
      duration: "education.degrees.undergraduateDegreeSubtitle",
      descriptions: [
        "education.degrees.undergraduateDegreeSentence1",
        "education.degrees.undergraduateDegreeSentence2",
        "education.degrees.undergraduateDegreeSentence3",
      ],
      website_link: "https://www.nankai.edu.cn/",
    },
  ],
};

const certifications = {
  certifications: [
    {
      title: "AWS Certified Solutions Architect - Professional",
      subtitle: "ID: 92MD5L42Y2V41J39",
      logo_path: "aws_logo.svg",
      certificate_link: "",
      alt_name: "AWS",
      color_code: "#BFDAEF",
    },
    {
      title: "AWS Certified Machine Learning - Specialty",
      subtitle: "ID: DH31B5H2TNREQVGH",
      logo_path: "aws_logo.svg",
      certificate_link: "",
      alt_name: "AWS",
      color_code: "#BFDAEF",
    },
    {
      title: "Microsoft Certified: Azure Solutions Architect Expert",
      subtitle: "ID: A64C27-6D25ZA",
      logo_path: "azure_logo.svg",
      certificate_link: "",
      alt_name: "Azure",
      color_code: "#BFDAEF",
    },
    {
      title: "Microsoft Certified: Azure Administrator Associate",
      subtitle: "ID: A41ED6-3BD4F9",
      logo_path: "azure_logo.svg",
      certificate_link: "",
      alt_name: "Azure",
      color_code: "#BFDAEF",
    },
    {
      title: "Microsoft Certified: Azure Fundamentals",
      subtitle: "ID: 4A9B94-83FD2D",
      logo_path: "azure_logo.svg",
      certificate_link: "",
      alt_name: "Azure",
      color_code: "#BFDAEF",
    },
    {
      title: "Alibaba Cloud Certified Associate",
      subtitle: "ID: ACA01220700576460L",
      logo_path: "alibaba-cloud-logo.webp",
      certificate_link: "",
      alt_name: "Alibaba Cloud",
      color_code: "#BFDAEF",
    },
    {
      title: "Databricks Certified Associate Developer for Apache Spark 3.0",
      subtitle: "ID: 5b7d8f8b-d427-4acf-a002-8342882ff913",
      logo_path: "databricks_logo.svg",
      certificate_link: "",
      alt_name: "Databricks",
      color_code: "#BFDAEF",
    },
    {
      title: "The Japanese-Language Proficiency Test N1",
      subtitle: "ID: N1A472415A",
      logo_path: "jlpt_logo.svg",
      certificate_link: "",
      alt_name: "JLPT",
      color_code: "#BFDAEF",
    },
    {
      title: "Certificate in Research Methods",
      subtitle: "The University of Chicago",
      logo_path: "uchicago_logo.png",
      certificate_link: "https://harris.uchicago.edu/academics/degrees/m",
      alt_name: "UChicago",
      color_code: "#BFDAEF",
    },
    // {
    //   title: "Cloud Architecture",
    //   subtitle: "- Qwiklabs",
    //   logo_path: "gcp_logo.png",
    //   certificate_link:
    //     "https://google.qwiklabs.com/public_profiles/5fab4b2d-be6f-408c-8dcb-6d3b58ecb4a2",
    //   alt_name: "GCP",
    //   color_code: "#4285F499",
    // },
  ],
};

// Experience Page
const experience = {
  title: "experience.title",
  subtitle: "experience.subtitle",
  description: "experience.details",
  header_image_path: "experience.svg",
  sections: [
    {
      title: "experience.work.title",
      work: true,
      experiences: [
        {
          title: "experience.work.experience1.title",
          company: "experience.work.experience1.subtitle",
          company_url: "https://www.pwc.com/us/en/services/consulting.html",
          logo_path: "pwc_logo.svg",
          duration: "experience.work.experience1.duration",
          location: "experience.work.experience1.location",
          description: "experience.work.experience1.details",
          color: "#F0CFBE",
        },
        {
          title: "experience.work.experience2.title",
          company: "experience.work.experience2.subtitle",
          company_url: "https://www.chapinhall.org/",
          logo_path: "chapin_hall_logo.png",
          duration: "experience.work.experience2.duration",
          location: "experience.work.experience2.location",
          description: "experience.work.experience2.details",
          color: "#253364",
        },
      ],
    },
    {
      title: "experience.internships.title",
      experiences: [
        {
          title: "experience.internships.experience1.title",
          company: "experience.internships.experience1.subtitle",
          company_url: "https://biplab.uchicago.edu/",
          logo_path: "uchicago_logo.png",
          duration: "experience.internships.experience1.duration",
          location: "experience.internships.experience1.location",
          description: "experience.internships.experience1.details",
          color: "#000000",
        },
        {
          title: "experience.internships.experience2.title",
          company: "experience.internships.experience2.subtitle",
          company_url: "https://biplab.uchicago.edu/",
          logo_path: "chapin_hall_logo.png",
          duration: "experience.internships.experience2.duration",
          location: "experience.internships.experience2.location",
          description: "experience.internships.experience2.details",
          color: "#253364",
        },
      ],
    },
    {
      title: "experience.volunteering.title",
      experiences: [
        {
          title: "experience.volunteering.experience1.title",
          company: "experience.volunteering.experience1.subtitle",
          company_url:
            "https://www.anl.gov/event/doe-stemcon-artificial-intelligence-compute-the-future",
          logo_path: "argonne_logo.png",
          duration: "experience.volunteering.experience1.duration",
          location: "experience.volunteering.experience1.location",
          description: "experience.volunteering.experience1.details",
          color: "#4285F4",
        },
        {
          title: "experience.volunteering.experience2.title",
          company: "experience.volunteering.experience2.subtitle",
          company_url: "https://www.uchicago.edu",
          logo_path: "uchicago_logo.png",
          duration: "experience.volunteering.experience2.duration",
          location: "experience.volunteering.experience2.location",
          description: "experience.volunteering.experience2.details",
          color: "#000000",
        },
      ],
    },
  ],
};

// Projects Page
const projectsHeader = {
  title: "projects.title",
  description: "projects.details",
  avatar_image_path: "projects_image.svg",
};

const publicationsHeader = {
  title: "Publications",
  description: "Some of my published Articles, Blogs and Research.",
  avatar_image_path: "projects_image.svg",
};

const ProjectsData = {
  moreProjectsLink: "https://github.com/hsswiki/sharing",
  data: [
    {
      name: "projects.project1.title",
      createdAt: "projects.project1.subtitle",
      url: "https://github.com/hsswiki/hsswiki-azureswa",
      description: "projects.project1.details",
      isFork: false,
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "ReactJS",
          iconifyClass: "simple-icons:react",
        },
        {
          name: "Azure",
          iconifyClass: "logos:microsoft-azure",
        },
      ],
    },
    {
      name: "projects.project2.title",
      createdAt: "projects.project2.subtitle",
      url: "https://github.com/hsswiki/sharing-spark-tuning/",
      description: "projects.project2.details",
      isFork: false,
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "Spark",
          iconifyClass: "logos:apache-spark",
        },
        {
          name: "AWS",
          iconifyClass: "simple-icons:amazonaws",
        },
      ],
    },
  ],
};

const publications = {
  data: [
    {
      id: "neuro-symbolic-sudoku-solver",
      name: "Neuro-Symbolic Sudoku Solver",
      createdAt: "2023-07-02T00:00:00Z",
      description: "Paper published in KDD KiML 2023",
      url: "https://arxiv.org/abs/2307.00653",
    },
    {
      id: "mdp-diffusion",
      name: "MDP-Diffusion",
      createdAt: "2023-09-19T00:00:00Z",
      description: "Blog published in Paperspace",
      url: "https://blog.paperspace.com/mdp-diffusion/",
    },
    {
      id: "consistency-models",
      name: "Consistency Models",
      createdAt: "2023-10-12T00:00:00Z",
      description: "Blog published in Paperspace",
      url: "https://blog.paperspace.com/consistency-models/",
    },
  ],
};

// Contact Page
const contactPageData = {
  contactSection: {
    title: "contact.contactMe",
    // profile_image_path: "animated_ashutosh.png",
    profile_image_path: "shen_profile.png",
    description: "contact.description",
  },
  blogSection: {
    title: "Blogs",
    subtitle:
      "I like to document some of my experiences in professional career journey as well as some technical knowledge sharing.",
    link: "https://blogs.ashutoshhathidara.com/",
    avatar_image_path: "blogs_image.svg",
  },
  addressSection: {
    title: "contact.address.title",
    subtitle: "contact.address.subtitle",
    // locality: "San Jose",
    // country: "USA",
    // region: "California",
    // postalCode: "95129",
    // streetAddress: "Saratoga Avenue",
    avatar_image_path: "address_image.svg",
    location_map_link: "https://maps.app.goo.gl/t4uSP4dLnQ4CdxsY6",
  },
  phoneSection: {
    title: "",
    subtitle: "",
  },
};

export {
  settings,
  seo,
  greeting,
  socialMediaLinks,
  skills,
  competitiveSites,
  degrees,
  certifications,
  experience,
  projectsHeader,
  publicationsHeader,
  publications,
  contactPageData,
  ProjectsData,
};
