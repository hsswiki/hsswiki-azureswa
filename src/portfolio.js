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
      home: {
        greeting: {
          title: "HAN Shen",
          nickname: "System Architect",
          subTitle:
            "A passionate engineer focusing on end-to-end system design and development to build sustainable, scalable technical solutions that create social value. Working languages include English, Chinese, and Japanese.",
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
        openSource: "开源贡献",
        contactMe: "联系方式",
      },
      chatbot: {
        title: "Shen's Digital Assistant",
        askInvitation:
          "Ask me anything about Shen! To continue our chat, may I have your invitation code please? Typically, it can be found on the resumes Shen sents out 😊",
        invalidInvitation:
          "The invitation code is invalid. Please reenter your invitation code or reach out to Shen for a new code. Thank you.",
        validInvitation:
          "Thank you. How may I assist you with my knowledge of Shen?",
        thinking: "Let me think...",
        responding: "The assistant is still responding",
        takeLonger:
          "(The assistant is still responding. It takes longer than usual. Thank you for your patience 😊)",
        error: "Network error. Please try again later.",
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
    },
  },
  ja: {
    translation: {
      header: {
        home: "ホーム",
        education: "学歴情報",
        experience: "職務経歴",
        projects: "プロジェクト",
        openSource: "オープンソース",
        contactMe: "お問い合わせ",
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
  logoName: "HanShen",
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
  resumeLink:
    "https://drive.google.com/file/d/1bXRknv_h-XI_3CQ3SGPteGODtvEb7YvI/view?usp=sharing",
  portfolio_repository: "https://github.com/ashutosh1919/masterPortfolio",
  githubProfile: "https://github.com/ashutosh1919",
};

const socialMediaLinks = [
  {
    name: "Github",
    link: "https://github.com/hsswiki",
    fontAwesomeIcon: "fa-github", // Reference https://fontawesome.com/icons/github?style=brands
    backgroundColor: "#181717", // Reference https://simpleicons.org/?q=github
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/shen-h/",
    fontAwesomeIcon: "fa-linkedin-in", // Reference https://fontawesome.com/icons/linkedin-in?style=brands
    backgroundColor: "#0077B5", // Reference https://simpleicons.org/?q=linkedin
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
    link: "https://x.com/hsswiki",
    fontAwesomeIcon: "fa-x-twitter", // Reference https://fontawesome.com/icons/x-twitter?f=brands&s=solid
    backgroundColor: "#000000", // Reference https://simpleicons.org/?q=x
  },
  // {
  //   name: "Facebook",
  //   link: "https://www.facebook.com/laymanbrother.19/",
  //   fontAwesomeIcon: "fa-facebook-f", // Reference https://fontawesome.com/icons/facebook-f?style=brands
  //   backgroundColor: "#1877F2", // Reference https://simpleicons.org/?q=facebook
  // },
];

// Ref: https://icon-sets.iconify.design/
// Ref: https://undraw.co/
const skills = {
  data: [
    {
      title: "aiSkillTitle",
      fileName: "DataScienceImg",
      // skills: [
      //   "⚡ Building end-to-end LLM & RAG solutions for document analysis and conversational AI",
      //   "⚡ Integrating NLP, OCR, and predictive modeling into cloud data workflows",
      //   "⚡ Developing & optimizing scalable ML models for classification, regression & quantitative analysis",
      // ],
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
          fontAwesomeClassname: "simple-icons:postgresql",
          style: {
            color: "#336791",
          },
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
    {
      siteName: "HackerRank",
      iconifyClassname: "simple-icons:hackerrank",
      style: {
        color: "#2EC866",
      },
      profileLink: "https://www.hackerrank.com/layman_brother",
    },
    {
      siteName: "Codechef",
      iconifyClassname: "simple-icons:codechef",
      style: {
        color: "#5B4638",
      },
      profileLink: "https://www.codechef.com/users/ashutosh_1919",
    },
    {
      siteName: "Codeforces",
      iconifyClassname: "simple-icons:codeforces",
      style: {
        color: "#1F8ACB",
      },
      profileLink: "http://codeforces.com/profile/layman_brother",
    },
    {
      siteName: "Hackerearth",
      iconifyClassname: "simple-icons:hackerearth",
      style: {
        color: "#323754",
      },
      profileLink: "https://www.hackerearth.com/@ashutosh391",
    },
    {
      siteName: "Kaggle",
      iconifyClassname: "simple-icons:kaggle",
      style: {
        color: "#20BEFF",
      },
      profileLink: "https://www.kaggle.com/laymanbrother",
    },
  ],
};

const degrees = {
  degrees: [
    {
      title: "Indian Institute of Information Technology Kurnool",
      subtitle: "B.Tech. in Computer Engineering",
      logo_path: "iiitk_logo.png",
      alt_name: "IIITDM Kurnool",
      duration: "2016 - 2020",
      descriptions: [
        "⚡ I have studied basic software engineering subjects like DS, Algorithms, DBMS, OS, CA, AI etc.",
        "⚡ Apart from this, I have done courses on Deep Learning, Data Science, Cloud Computing and Full Stack Development.",
        "⚡ I was selected for Merit cum Means Scholarship which is given to top 10% of students in college. I have received award from respected director for consistently best performance in academics.",
      ],
      website_link: "http://iiitk.ac.in",
    },
    {
      title: "Indiana University Bloomington",
      subtitle: "M.S. in Computer Science",
      logo_path: "iu_logo.png",
      alt_name: "Indiana University Bloomington",
      duration: "2021 - 2023",
      descriptions: [
        "⚡ I have taken varity of courses related to Artificial Intelligence which correspond to Explainable AI, Graph Machine Learning, Computer Vision etc.",
        "⚡ Apart from this, I have also done research assistantship. As part of it, I have worked on creating new algorithms in Graph ML and Network Science.",
        "⚡ During my time at university, I was also associated with multimedia department. As part of it, I have worked on some documentry films and interviews.",
      ],
      website_link: "https://www.indiana.edu/",
    },
  ],
};

const certifications = {
  certifications: [
    {
      title: "Machine Learning",
      subtitle: "- Andrew Ng",
      logo_path: "stanford_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/verify/22MTSSC5WDTM",
      alt_name: "Stanford University",
      color_code: "#8C151599",
    },
    {
      title: "Deep Learning",
      subtitle: "- Andrew Ng",
      logo_path: "deeplearning_ai_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/specialization/H8CPSFXAJD2G",
      alt_name: "deeplearning.ai",
      color_code: "#00000099",
    },
    {
      title: "ML on GCP",
      subtitle: "- GCP Training",
      logo_path: "google_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/specialization/EB4VJARK8647",
      alt_name: "Google",
      color_code: "#0C9D5899",
    },
    {
      title: "Data Science",
      subtitle: "- Alex Aklson",
      logo_path: "ibm_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/specialization/PLEAPCSJBZT5",
      alt_name: "IBM",
      color_code: "#1F70C199",
    },
    {
      title: "Big Data",
      subtitle: "- Kim Akers",
      logo_path: "microsoft_logo.png",
      certificate_link:
        "https://drive.google.com/file/d/164zKCFOsI4vGqokc-Qj-e_D00kLDHIrG/view",
      alt_name: "Microsoft",
      color_code: "#D83B0199",
    },
    {
      title: "Advanced Data Science",
      subtitle: "- Romeo Kienzler",
      logo_path: "ibm_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/verify/BH2T9BRU87BH",
      alt_name: "IBM",
      color_code: "#1F70C199",
    },
    {
      title: "Advanced ML on GCP",
      subtitle: "- GCP Training",
      logo_path: "google_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/verify/5JZZM7TNQ2AV",
      alt_name: "Google",
      color_code: "#0C9D5899",
    },
    {
      title: "DL on Tensorflow",
      subtitle: "- Laurence Moroney",
      logo_path: "deeplearning_ai_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/verify/6T4DCUGNK8J8",
      alt_name: "deeplearning.ai",
      color_code: "#00000099",
    },
    {
      title: "Fullstack Development",
      subtitle: "- Jogesh Muppala",
      logo_path: "coursera_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/NRANJA66Y2YA",
      alt_name: "Coursera",
      color_code: "#2A73CC",
    },
    {
      title: "Kuberenetes on GCP",
      subtitle: "- Qwiklabs",
      logo_path: "gcp_logo.png",
      certificate_link:
        "https://google.qwiklabs.com/public_profiles/e4d5a92b-faf6-4679-a70b-a9047c0cd750",
      alt_name: "GCP",
      color_code: "#4285F499",
    },
    {
      title: "Cryptography",
      subtitle: "- Saurabh Mukhopadhyay",
      logo_path: "nptel_logo.png",
      certificate_link:
        "https://drive.google.com/open?id=1z5ExD_QJVdU0slLkp8CBqSF3-C3g-ro_",
      alt_name: "NPTEL",
      color_code: "#FFBB0099",
    },
    {
      title: "Cloud Architecture",
      subtitle: "- Qwiklabs",
      logo_path: "gcp_logo.png",
      certificate_link:
        "https://google.qwiklabs.com/public_profiles/5fab4b2d-be6f-408c-8dcb-6d3b58ecb4a2",
      alt_name: "GCP",
      color_code: "#4285F499",
    },
  ],
};

// Experience Page
const experience = {
  title: "Experience",
  subtitle: "Work, Internship and Volunteership",
  description:
    "I have worked with many evolving startups as ML and DL Developer, Designer and Software Architect. I have also worked with some well established companies mostly as AI Developer. I love organising events and that is why I am also involved with many opensource communities as a representative.",
  header_image_path: "experience.svg",
  sections: [
    {
      title: "Work",
      work: true,
      experiences: [
        {
          title: "Machine Learning Engineer",
          company: "TikTok Inc.",
          company_url: "https://www.tiktok.com/en/",
          logo_path: "tiktok_logo.png",
          duration: "June 2023 - Present",
          location: "San Jose, CA, USA",
          description:
            "Improving ads ranking models on the core TikTok product. Experience working on modeling two-tower architectures like DeepFM, Wide & deep learning, etc. Working on Large Language Models (LLM) pretraining and Large Multi-modal Model (LMM) finetuning strategies.",
          color: "#000000",
        },
        {
          title: "Associate AI Engineer",
          company: "Legato Health Technology",
          company_url: "https://legatohealthtech.com/",
          logo_path: "legato_logo.png",
          duration: "June 2020 - Aug 2021",
          location: "Hyderabad, Telangana",
          description:
            "I am working on automating healthcare products. The projects involve automation for process improvements and for significantly enhancing the profits. I am currently working on Cancer Survival and Reoccurence Prediction. Our goal is to make AI system which scales and removes doctor dependency as much as possible.",
          color: "#0879bf",
        },
        {
          title: "Android and ML Developer",
          company: "Muffito Incorporation",
          company_url: "https://www.linkedin.com/company/muffito-inc/about/",
          logo_path: "muffito_logo.png",
          duration: "May 2018 - Oct 2018",
          location: "Pune, Maharashtra",
          description:
            "I have created complete Android Application for locating Pub, Bar and beverage shops around you. I have also worked on implementation of algorithms for Face Detection, Text extraction from Image. I was involved in a team for creating complete software architecure of mobile and web application as well as admin panel for company.",
          color: "#9b1578",
        },
        {
          title: "Android Developer",
          company: "FreeCopy Pvt. Ltd.",
          company_url: "https://www.linkedin.com/company/freecopy/about/",
          logo_path: "freecopy_logo.png",
          duration: "Nov 2017 - Dec 2017",
          location: "Ahmedabad, Gujarat",
          description:
            "FreeCopy is the Start up from Indian Institute of Management, Ahmedabad. I have changed the integration of the whole app from Google to Firebase. I learnt the efﬁcient ways of Data communications like Retroﬁt, Eventbus etc. I experienced the real time start up. I learnt the Design thinking of UI on perspective of People.",
          color: "#fc1f20",
        },
      ],
    },
    {
      title: "Internships",
      experiences: [
        {
          title: "Machine Learning Intern",
          company: "TikTok Inc.",
          company_url: "https://www.tiktok.com/en/",
          logo_path: "tiktok_logo.png",
          duration: "May 2022 - Aug 2022",
          location: "San Francisco, USA",
          description:
            "Building new features on the backend recommendation system, specifically ranking algorithms for Ads that touch hundreds of millions of people around the world. Improving online and offline content ranking algorithms by performing hard sample data replays for training steps.",
          color: "#000000",
        },
        {
          title: "Data Science Research Intern",
          company: "Delhivery Pvt. Ltd.",
          company_url: "https://www.delhivery.com/",
          logo_path: "delhivery_logo.png",
          duration: "May 2019 - Sept 2019",
          location: "Gurgaon, Haryana",
          description:
            "I have worked on project of predicting freight rates based on previous data. There were two objectives: (1) To build a forecasting engine to predict daily freight rates. (2) To embed feature in the model which can explain the seasonal major changes in freight rate based on regions and locations. I have closely worked with deep learning models in combination with statistical methods to create solution for this. At the end of internship, I had created model deployed on AWS EC2 with the use of Kafka stream jobs, ElasticSearch and PostgreSQL.",
          color: "#ee3c26",
        },
        {
          title: "Data Science Intern",
          company: "Intel Indexer LLC",
          company_url:
            "https://opencorporates.com/companies/us_dc/EXTUID_4170286",
          logo_path: "intel_logo.jpg",
          duration: "Nov 2018 - Dec 2018",
          location: "Work From Home",
          description:
            "This is financial Solution Company. I have made Supervised Learning model for the company which can perform time series analysis on Stock price data for 32 companies. I have built LSTM Neural Networks Model and trained the data of 32 companies for last 2 years. This model is also used for forecasting.",
          color: "#0071C5",
        },
      ],
    },
    {
      title: "Volunteerships",
      experiences: [
        {
          title: "Google Explore ML Facilitator",
          company: "Google",
          company_url: "https://about.google/",
          logo_path: "google_logo.png",
          duration: "June 2019 - April 2020",
          location: "Hyderabad, Telangana",
          description:
            "Explore Machine Learning (ML) is a Google-sponsored program for university students to get started with Machine Learning. The curriculum offers 3 tracks of ML Content (Beginner, Intermediate, Advanced) and relies on university student facilitators to train other students on campus and to build opensource projects under this program.",
          color: "#4285F4",
        },
        {
          title: "Microsoft Student Partner",
          company: "Microsoft",
          company_url: "https://www.microsoft.com/",
          logo_path: "microsoft_logo.png",
          duration: "Aug 2019 - May 2020",
          location: "Hyderabad, Telangana",
          description:
            "Microsoft Student Partner is a program for university students to lead the awareness and use of Cloud especially Azure tools in the development of their projects and startups. Under this program, I have organised hands on workshops and seminars to teach Cloud Computing concepts to students.",
          color: "#D83B01",
        },
        {
          title: "Mozilla Campus Captain",
          company: "Mozilla",
          company_url: "https://www.mozilla.org/",
          logo_path: "mozilla_logo.png",
          duration: "Oct 2019 - May 2020",
          location: "Kurnool, Andhra Pradesh",
          description:
            "My responsibility for this program was to create opensource environment in college and in the city. We have organised multiple hackathons on the problems collected by ordinary people from Kurnool city. We have build opensource community of our own college. The community is available at dsc_iiitdmk on github.",
          color: "#000000",
        },
        {
          title: "Developer Students Club Member",
          company: "DSC IIITDM Kurnool",
          company_url:
            "https://www.linkedin.com/company/developer-students-club-iiitdm-kurnool",
          logo_path: "dsc_logo.png",
          duration: "Jan 2018 - May 2020",
          location: "Kurnool, Andhra Pradesh",
          description:
            "We have well established developer club in college which is directly associated with Google Developers. We have developed many interdisciplinary projects under the membership of this club. We have organised workshops and activities on Android Application Development, Flutter and React JS.",
          color: "#0C9D58",
        },
        {
          title: "Developer Program Member",
          company: "Github",
          company_url: "https://github.com/",
          logo_path: "github_logo.png",
          duration: "July 2019 - PRESENT",
          location: "Work From Home",
          description:
            "I am actively contributing to many opensource projects. I have contributed to projects of organisations like Tensorflow, Uber, Facebook, Google, Scikit-learn, Kiwix, Sympy, Python, NVLabs, Fossasia, Netrack, Keras etc. These contributions include bug fixes, feature requests and formulating proper documentation for project.",
          color: "#181717",
        },
      ],
    },
  ],
};

// Projects Page
const projectsHeader = {
  title: "Projects",
  description:
    "My projects makes use of vast variety of latest technology tools. My best experience is to create Data Science projects and deploy them to web applications using cloud infrastructure.",
  avatar_image_path: "projects_image.svg",
};

const publicationsHeader = {
  title: "Publications",
  description: "Some of my published Articles, Blogs and Research.",
  avatar_image_path: "projects_image.svg",
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
    title: "Contact Me",
    profile_image_path: "animated_ashutosh.png",
    description:
      "I am available on almost every social media. You can message me, I will reply within 24 hours. I can help you with ML, AI, React, Android, Cloud and Opensource Development.",
  },
  blogSection: {
    title: "Blogs",
    subtitle:
      "I like to document some of my experiences in professional career journey as well as some technical knowledge sharing.",
    link: "https://blogs.ashutoshhathidara.com/",
    avatar_image_path: "blogs_image.svg",
  },
  addressSection: {
    title: "Address",
    subtitle: "Saratoga Ave, San Jose, CA, USA 95129",
    locality: "San Jose",
    country: "USA",
    region: "California",
    postalCode: "95129",
    streetAddress: "Saratoga Avenue",
    avatar_image_path: "address_image.svg",
    location_map_link: "https://maps.app.goo.gl/NvYZqa34Wye4tpS17",
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
};
