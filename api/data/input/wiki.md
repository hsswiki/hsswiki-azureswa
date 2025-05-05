## PwC US Consulting AC Shanghai - Senior Technical Lead

- Duration: 2023 - Present
- Overview: Leading technical design and backend development for Generative AI and cloud-native applications, focusing on scalable architectures, data automation, and implementing cutting-edge AI/ML solutions for major enterprise clients.

### Project: Financial Due Diligence (FDD)

- Duration: 2025
- Overview: Developed a Proof of Concept application leveraging Generative AI to automate the drafting of Financial Due Diligence reports based on financial documents.
- Aspect 1: RAG Backend Design and Development
  - Situation: Build a backend application for document upload, processing, and a RAG-based chat interface to assist financial auditors.
  - Action: Designed layered backend architecture using Python with FastAPI. Implemented document processing pipeline (OCR, chunking, embedding) using Azure services (Blob Storage, Doc Intelligence, OpenAI embedding) and vector search (Azure AI Search). Developed RAG pipeline with transient memory for chat sessions. Utilized Abstract Factory design pattern for swappable vector store types (Azure AI Search, ChromaDB). Implemented CI/CD and IaC with Terraform.
  - Result: Delivered functional APIs for upload, vectorization, document generation, and chat. Successfully demonstrated GenAI capabilities for automating report drafting and document interaction to the client.

### Project: Fortune 50 Tech Company GenAI Invoice Checker & Audit Assistant

- Duration: 2024
- Overview: Enhanced internal productivity tools using GenAI, focusing on automating invoice review and assisting financial document audits.
- Aspect 1: Invoice Checker Automation
  - Situation: Automate the review of invoices based on configurable rules for different spending categories.
  - Action: Designed and implemented a modular application architecture in Python leveraging Azure Function Apps. Developed configurable rule engine stored in Azure SQL Database. Implemented workflow orchestration and scheduling using Azure Data Factory. Integrated OCR and translation for input preprocessing. Utilized LLM (Azure OpenAI Service) with prompt tuning and few-shot examples for generating reimbursement outcomes in parallel batches. Included validation for LLM output and monitored success metrics.
  - Result: Enabled automated invoice review process capable of processing 100K records in a one-hour window daily. Earned project extension to expand solution to more countries, demonstrating business impact and client satisfaction.
- Aspect 2: Audit Assistant Enhancement
  - Situation: Enhance a web tool to help auditors review financial documents by comparing uploaded files against a sales database.
  - Action: Developed backend API in Python using Durable Functions on Azure Function Apps. Implemented document processing (Blob storage, AI Translator, Doc Intelligence). Designed logic to query source data from Azure Database and compare financial fields (client name, purchase amount, SKU, etc.) across documents and against the database. Used LLM for fuzzy matching and Python for exact matching. Incorporated currency conversion with internal APIs and calculated fields based on formulas. Applied LLM for compliance analysis.
  - Result: Enabled comparison of 20+ financial fields across documents and a sales database. Supported 4 different audit scopes. Delivered demo showcasing capabilities to internal auditors.

### Project: Enterprise RAG Infrastructure

- Duration: 2024
- Overview: Developed foundational RAG infrastructure components to support automated document drafting using GenAI for various client use cases.
- Aspect 1: RAG Pipeline Development
  - Situation: Build a core RAG pipeline framework to enable automatic drafting of technical and business documents (FSD, TSD, BRD) based on templates and knowledge chunks.
  - Action: Developed RAG pipeline components primarily based on LangChain in Python, deployed on internal Kubernetes clusters. Focused on code quality and extensibility using design patterns. Designed components to support use case-specific modules/plugins.
  - Result: Provided a reusable RAG pipeline infrastructure adopted by multiple internal practice teams.
- Aspect 2: RagConfigTool Module
  - Situation: Enable users to easily configure the RAG pipeline behavior through configuration files.
  - Action: Developed a reusable Python package using Poetry and published it to an internal GitHub repository. Applied Abstract Factory, Facade, and Dependency Injection design patterns for modularity. Used Pydantic for configuration parsing and published JSON schema for user guidance. Made components like metadata processor, text splitter, embedding model, vector store, and retriever configurable.
  - Result: Created a robust, configurable module adopted as an internal dependency, simplifying RAG pipeline customization for practice teams. Presented capabilities in leadership calls.
- Aspect 3: DocumentLoader Module
  - Situation: Provide a flexible and extensible mechanism for loading diverse document types into the RAG pipeline.
  - Action: Developed a reusable Python library using Poetry, published internally. Designed the library architecture based on SOLID principles for ease of use and maintainability. Led a teammate in developing interfaces and concrete classes using Abstract Factory Pattern and Dependency Injection. Developed custom file loaders inheriting from LangChain's BaseLoader, including specialized database loaders (SqlDatabaseLoader, MongodbLoader) configured via file.
  - Result: Delivered a flexible document loading library adopted as an internal dependency, simplifying data ingestion for the RAG pipeline across various data sources. Presented capabilities in leadership calls.

### Project: Global Cement and Building Materials Company EDW

- Duration: 2023 - 2024
- Overview: Built a multi-layered enterprise data warehouse on AWS Redshift to provide a 360-degree view of customers by integrating data from various source systems.
- Aspect 1: Data Model Design and Development
  - Situation: Design and develop the core data model (Refined Layer) and published views for a new enterprise data warehouse.
  - Action: Collaborated with technical leads and business stakeholders to define data warehouse layers and data models (Dimension and Fact tables) based on client requirements. Implemented models and views/Stored Procedures in AWS Redshift using SQL, incorporating new data sources while maintaining architectural consistency.
  - Result: Established a robust, layered data warehouse serving as a central source of truth. Successfully implemented critical data layers, transforming raw data into usable business intelligence assets that supported diverse reporting and analytical needs.
- Aspect 2: Published Data View Optimization
  - Situation: Develop and optimize data views (Materialized Views, Stored Procedures) in the published layer for consumption by business intelligence tools.
  - Action: Created Materialized Views and corresponding Stored Procedures in Redshift for dashboard consumption. Converted several views to Stored Procedures to work around Redshift Materialized View limitations and gain control over refresh logic. Optimized query logic for performance.
  - Result: Provided curated, aggregated, and performance-optimized datasets directly usable by dashboarding tools, reducing burden on analysts. Delivered key views enabling reporting on various customer dimensions.
- Aspect 3: DevOps and Code Management
  - Situation: Manage code versioning and deployment pipelines for database code changes across development, QA, and production environments.
  - Action: Utilized AWS CodeCommit for source control, managing branches, PRs, and code reviews. Structured the repository by environment and data layer. Configured and operated DevOps pipelines to automate deployments of Redshift SQL code. Coordinated merges and deployments with team members.
  - Result: Ensured reliable and traceable deployment of database code changes. Facilitated collaborative development through structured version control and automation.
- Aspect 4: Cross-Functional Collaboration and Problem Solving
  - Situation: Collaborate with diverse teams (developers, leads, analysts, clients) and resolve technical challenges in data integration and database implementation.
  - Action: Participated actively in meetings, collaborated on development and knowledge sharing, clarified data modeling strategies, troubleshoot complex issues (e.g., Redshift permissions, MV creation failures), and interacted with business analysts to validate data and resolve discrepancies. Utilized shared documentation and task tracking tools.
  - Result: Successfully contributed to project delivery by effectively collaborating across teams. Resolved numerous technical and data issues, keeping the project on track and improving data model accuracy.

### Project: Leading North American Retailer EDW and Dashboarding

- Duration: 2023
- Overview: Reconciled inventory and sales data for a major retail client to ensure accuracy for financial reporting, involving large-scale Spark ETL and data warehousing on AWS.
- Aspect 1: End-of-Period (EOP) Inventory Reconciliation
  - Situation: Ensure accurate calculation and reconciliation of month-end inventory values based on diverse data sources and complex business rules.
  - Action: Developed and refined Spark ETL jobs in PySpark on AWS EMR to calculate EOP inventory based on beginning inventory, transactions, and adjustments. Handled complexities like physical inventory changes and corrections. Investigated and debugged reconciliation variances by comparing calculations with month-end and snapshot data. Implemented logic for spreading stale inventory values and handling discontinued items.
  - Result: Significantly reduced EOP reconciliation variances across numerous locations and business units. Enabled reconciliation for numerous locations and provided detailed variance analysis.
- Aspect 2: Shrinkage Calculation Improvement
  - Situation: Ensure accurate calculation and reconciliation of shrinkage metric based on complex business formulas.
  - Action: Investigated discrepancies in calculated vs. month-end shrinkage data. Collaborated with business experts to clarify complex formulas involving accrual, physical inventory, and correction components. Modified Spark logic to align with the correct formula and debug specific variances.
  - Result: Improved the accuracy of the calculated shrinkage metric. Identified and addressed locations with irreconcilable historical data.
- Aspect 3: Daily Incremental Data Processing
  - Situation: Enhance the daily data pipeline to handle processing delays and integrate late transactions.
  - Action: Modified daily incremental ETL logic to handle different processing schedules (T-1 vs T-3). Debugged daily failures and integrated late transactions. Developed triggering mechanisms for daily routines using AWS SQS queues and runbooks. Contributed to EMR cluster configuration.
  - Result: Ensured more timely availability and improved robustness of the daily data pipeline.
- Aspect 4: Spark Job Performance and Infrastructure Optimization
  - Situation: Optimize the performance of large-scale Spark ETL jobs processing billions of rows on EMR.
  - Action: Conducted internal sharing sessions on Spark tuning. Explored and tested EMR configurations and instance types (e.g., Graviton 2, AQE). Ensured Spark history server persistence for debugging.
  - Result: Improved understanding and application of Spark performance tuning within the team. Potentially improved ETL job execution speed and efficiency.
- Aspect 5: Data Quality and Source System Issues
  - Situation: Address persistent data quality issues and complexities across various source systems impacting ETL accuracy and completeness.
  - Action: Identified and analyzed numerous data quality issues (missing data, inconsistencies, inaccuracies, complex behaviors). Wrote scripts to compare raw data sources at different aggregation levels. Collaborated with data owners to understand data behaviors and seek fixes or workarounds. Implemented workarounds in ETL logic for known issues.
  - Result: Provided clear analysis and documentation of data issues. Enabled processing to continue despite underlying data problems through robust ETL logic. Improved overall data understanding within the team.
- Aspect 6: Project Infrastructure and Processes Contribution
  - Situation: Contribute to the overall project infrastructure, data loading processes, and debugging efforts across the pipeline.
  - Action: Wrote scripts for historical data loads and full reconciliation runs. Developed Lambda functions for control data updates (fiscal year mapping). Contributed to S3 data management. Debugged Power BI dashboard discrepancies by comparing Redshift table data with raw data sources.
  - Result: Supported full-scale historical data processing and reconciliation efforts. Maintained critical control data. Enabled end-to-end data flow from raw sources to dashboard.

## PwC Cloud Native Services Accelerator - Technical Lead

- Duration: 2021 - 2023
- Overview: Led the design and development of core backend components and CI/CD pipelines for a cloud-native platform on AWS, enabling end-to-end data-centric workflows for clients.

### Project: Cloud Native Services Platform Development

- Duration: 2021 - 2022
- Overview: Designed and built a modular, web-interfaced platform on AWS to support data ingestion, processing, AI/ML integration, and data warehousing.
- Aspect 1: Data Ingestion Pipeline and Status Tracking
  - Situation: Build an automated data ingestion pipeline from various sources into a data lake with real-time status tracking.
  - Action: Designed and implemented ingestion flows using AWS DMS and Kinesis. Integrated AWS SQS and Lambda to process completion messages and update job status in a backend DocumentDB (NoSQL) database. Ensured data landing in S3.
  - Result: Enabled automated ingestion and provided users with real-time visibility via the web interface.
- Aspect 2: PySpark ETL Framework Development
  - Situation: Develop a scalable and flexible framework for distributed data processing (Profiling, Quality, Transformation).
  - Action: Built a PySpark framework (using aws deequ for DQ) for distributed processing on Glue/EMR. Implemented automatic deployment of framework files and logic to pass arguments for execution. Enabled users to upload and execute custom PySpark scripts and define common rules via UI.
  - Result: Provided a scalable framework for complex data tasks, empowering users and streamlining transformation logic creation.
- Aspect 3: Data Orchestration Engine Implementation
  - Situation: Automate and manage end-to-end data workflows.
  - Action: Utilized AWS Step Functions to define and orchestrate sequences of data processing jobs. Integrated orchestration results to update job status.
  - Result: Automated data pipelines, reducing manual effort and providing visibility into workflow execution.
- Aspect 4: AIML Integration
  - Situation: Integrate automated ML model training and deployment capabilities into the platform.
  - Action: Integrated with AWS Sagemaker Autopilot and used AWS Step Functions to orchestrate training and deployment workflows. Enabled users to specify dependent variables and facilitated automatic deployment to Sagemaker endpoints.
  - Result: Empowered users to quickly build and deploy predictive models with minimal expertise, providing a streamlined path from data to deployed model.
- Aspect 5: Backend API and Database Integration
  - Situation: Design and build the core backend logic and data management layer.
  - Action: Developed backend services using Python running on AWS EKS. Designed and interacted with a DocumentDB (NoSQL) database for platform state and job status. Set up AWS SNS, SQS, and Lambda for asynchronous communication and database updates.
  - Result: Provided the core logic and data management layer, enabling decoupled communication and supporting the web interface.
- Aspect 6: CI/CD Pipeline Establishment
  - Situation: Implement automated and consistent deployment of platform updates.
  - Action: Implemented CI/CD workflows using Github and AWS Codepipeline. Defined infrastructure and application deployments using Terraform and Helm.
  - Result: Enabled automated and consistent deployments across environments, improving development velocity and release reliability.

## Project Associate - Data Systems Analyst at Chapin Hall at the University of Chicago

- Duration: 2017 - 2019
- Overview: Designed and implemented data warehouses and ETL pipelines for large-scale administrative data, applied machine learning for predictive modeling, and contributed to open-source software development projects for research purposes.

### Project: Child Care Assistance Longitudinal Database

- Duration: 2017 - 2019
- Overview: Designed and built a data warehouse for Illinois childcare payment records since 2000 to analyze resource utilization.
- Aspect 1: Data Warehouse Design and Implementation
  - Situation: Design and build a data warehouse integrating high-volume monthly data from multiple sources.
  - Action: Performed requirement analysis for an OLAP system. Designed database schema (ERD -> Star schema) in Python and PostgreSQL. Developed ETL process (Extract, Staging, Transform, Integration, Load, Access layers) to integrate data from 8 different sources with varied formats using Python, SAS, and Shell scripting. Automated the monthly update process.
  - Result: Built a comprehensive data warehouse enabling analysis of child care resource utilization. Improved business processes with data platform tools and documented the database with 200+ Sharepoint pages and 8 data dictionaries.
- Aspect 2: Data Quality and Modeling Challenges
  - Situation: Address data quality issues and balance normalization/de-normalization in the data warehouse design.
  - Action: Performed data profiling to clarify concepts like unique identifiers across multiple records. Balanced normalization and de-normalization to optimize for ease of use and query speed.
  - Result: Improved data quality understanding and built a database schema optimized for research use.

### Project: Federal TANF Data Innovations

- Duration: 2018 - 2019
- Overview: Analyzed TB-sized TANF (Temporary Assistance for Needy Families) data for the US Department of Health and Human Services, focusing on data quality, record linkage, caseload dynamics, and interactive dashboarding.
- Aspect 1: Data Quality Analysis and Record Linkage
  - Situation: Assess overall data quality and feasibility of record linkage for large-scale TANF data.
  - Action: Performed data quality checks (e.g., verifying FIPS codes, data validity, duplicates). Analyzed data to infer database management states and propose recommendations.
  - Result: Provided insights into data quality issues and their potential impact on analysis.
- Aspect 2: Spell Data Generation and Analysis
  - Situation: Analyze caseload dynamics by generating spell data from cross-sectional observation data.
  - Action: Designed and implemented a parallel algorithm in Python/SAS to build spell data. Analyzed data anomalies, such as changes in IDs or case status manipulation.
  - Result: Successfully generated monthly spell data from 9 years of stock data using an innovative parallel algorithm. Identified data anomalies related to state government operations.
- Aspect 3: Interactive Dashboard and Reporting
  - Situation: Present caseload dynamics data in an interactive and accessible format to policymakers.
  - Action: Developed an interactive dashboard using Python Bokeh to visualize caseload dynamics for 29 states. Wrote reports summarizing findings and analysis. Presented visualized data and reports to the Department of Health and Human Services in Washington D.C.
  - Result: Produced 3 major reports with visualizations and an interactive dashboard. Charts were published at the APPAM Conference 2018. Effectively communicated complex data insights to policymakers.

### Project: Major US City Child Welfare Case Prediction

- Duration: 2018
- Overview: Applied machine learning techniques to predict child welfare cases in a major US city to optimize resource deployment for crime prevention.
- Aspect 1: Predictive Modeling and Feature Engineering
  - Situation: Optimize existing predictive models and incorporate open data as features to improve prediction accuracy for child welfare cases at a fine-grained geographic level.
  - Action: Performed preprocessing and feature engineering (standardization, polynomial/interaction terms, missing data imputation using MICE). Conducted diagnosis of previous models' results. Applied LASSO and Elastic Net with cross-validation for feature selection, resulting in a concise list of variables.
  - Result: Developed a machine learning workflow at a finer geographic granularity (neighborhood level). Identified a robust set of predictive features. Decreased prediction error by 23% (precision) compared to the previous model.
- Aspect 2: Model Interpretation and Visualization
  - Situation: Interpret the selected variables and visualize their spatial impact to inform resource allocation.
  - Action: Used Factor Analysis (R) to group variables into meaningful categories (finance, health, crime, demographic). Applied Geographically Weighted Regression (GWR, ArcGIS) using factor loadings to determine the relative importance of factors at the neighborhood level. Created heat maps by zip code for visualization.
  - Result: Provided a clearer understanding of factors contributing to child welfare cases (abuse, neglect) and their spatial variation. Delivered visualizations to inform precise resource allocation decisions.

### Project: Automated Data Metadata Database

- Duration: 2019
- Overview: Developed an automated relational database and associated tools for extracting and analyzing metadata from administrative datasets, intended for open-source use by a Major US University.
- Aspect 1: Database Design and SDE
  - Situation: Create an automated, open-source database to persist and analyze metadata from delivered administrative datasets.
  - Action: Designed the Entity-Relationship Diagram (ERD) for the database, including tables for data requests, contacts, datasets, tables, categorical codes, etc. Engaged in collaborative software engineering using GitHub. Implemented unit testing with pytest to validate code and database interactions. Developed auto-generated documentation using Python Sphinx for improved communication with clients.
  - Result: Created an automated relational database with 22 tables for extracting and analyzing metadata. Made the project open-source on GitHub for a Major US University.
- Aspect 2: Design Challenges and Client Communication
  - Situation: Balance the generality of the tool with specific workflow requirements and define key terms for the database design.
  - Action: Addressed design challenges related to balancing generality and specific workflow needs. Defined key terms and metadata requirements through communication with the client.
  - Result: Successfully navigated design complexities to build a functional and documented metadata tool.

## Internships

### Policy Labs Intern at Chapin Hall at the University of Chicago

- Duration: 2017
- Overview: Analyzed large administrative datasets to identify patterns and inform policy recommendations for state government initiatives.
- Aspect 1: Data Analysis and Modeling
  - Situation: Analyze administrative data to find patterns in participant behavior for a state government public assistance program.
  - Action: Conducted cohort retention rate analysis using Python. Performed cluster analysis on participant data. Designed a research framework and coordinated stakeholder interviews with State Government Departments and a data warehouse. Applied regression and machine learning techniques to 5-year quarterly data. Analyzed over 98 million observations of state administrative data using Python, R, and Tableau.
  - Result: Identified that a specific population group was highly prone to recidivism. Provided data-driven insights to inform policy making aimed at minimizing caseload loss.
- Aspect 2: Data Visualization and Communication
  - Situation: Present complex data analysis findings and policy recommendations to policymakers.
  - Action: Analyzed data and wrote policy memos. Presented visualized data (including Tableau heat maps) and project findings to the Secretary and other policymakers. Completed a project report summarizing the analysis and recommendations.
  - Result: Effectively communicated data insights to inform evidence-based decisions by policymakers.

### Research Assistant at BIP Lab at the University of Chicago

- Duration: 2017
- Overview: Supported behavioral economics research projects through data collection, analysis, and tutoring.
- Aspect 1: Research Support and Data Handling
  - Situation: Support behavioral economics research projects involving data collection and management.
  - Action: Assisted with research design (Randomized Controlled Trials), participant recruitment, field research, and data compiling. Handled large datasets (1000+ spreadsheets, using VBA). Analyzed research data.
  - Result: Contributed to the successful execution of behavioral economics studies. Managed and analyzed research data effectively.
- Aspect 2: Technical Tutoring and Documentation
  - Situation: Assist other research assistants and document data analysis processes.
  - Action: Developed data analysis manuals. Tutored other research assistants in data analysis.
  - Result: Improved the technical capacity of the research team through tutoring and clear documentation.

## Volunteering

### Volunteer Instructor at U.S. Department of Energy STEM-CON AI Workshop

- Duration: 2019
- Overview: Volunteered as an instructor to introduce students to AI, ML, and VR technologies.
- Aspect 1: AI/ML/VR Instruction
  - Situation: Educate high-school students about emerging technologies in AI, Machine Learning, and Virtual Reality.
  - Action: Prepared and delivered demonstrations of AI, ML, and VR technologies. Hosted the Idaho National Laboratory's booth at the workshop.
  - Result: Successfully introduced complex technical concepts to a younger audience, promoting STEM education.

### Volunteer Python Workshop Instructor as the University of Chicago

- Duration: 2017
- Overview: Developed and delivered weekly workshops to teach Python for data analysis to graduate students.
- Aspect 1: Python Instruction for Data Analysis
  - Situation: Provide instruction on using Python for data analysis to graduate students in public policy.
  - Action: Developed lesson plans and materials for weekly workshops. Delivered hands-on training sessions covering Python concepts relevant to data analysis.
  - Result: Enhanced the data analysis skills of graduate students, enabling them to apply Python in their research.
