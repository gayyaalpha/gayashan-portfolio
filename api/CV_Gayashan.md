## Career Timeline

- **Jul 2025 – Present** — Artificial Intelligence Engineer at Onwards Analytics (Glide, Method8)
- **Mar 2025 – Jun 2025** — Intern Artificial Intelligence Engineer at Blackbox Innovation
- **Nov 2022 – Nov 2023** — Software Engineer at Mickiesoft
- **Ongoing (side venture)** — Co-founder and Creative Director at Needlesack

## Experience: AI Engineer at Onwards Analytics (Jul 2025 – Present)

Perth, Western Australia (Remote). Working on two production AI products at Onwards Analytics: Glide and Method8.

**Glide Swim App** — Website: https://getglide.io/ | App Store: https://apps.apple.com/au/app/get-glide/id6742453858

- Developed an automated swimming technique analysis system used by swimming trainers across Australia and Canada, using MediaPipe to extract biomechanical metrics and GPT-4o to deliver coaching feedback.
- Engineered pose-tracking logic using MediaPipe's heavy model to compute stroke count, arm symmetry, glide detection, leading arm drop, and hip rotation metrics from raw landmark coordinates.
- Designed a frame-quality filtering system using anatomical limb-ratio validation and joint displacement thresholds to reject implausible pose estimates before metric computation.
- Built an LLM pipeline using GPT-4o with structured JSON schema output to transform computed biomechanical metrics into personalised coaching feedback.

**Method8 AI Analytics Assistant** — Website: https://www.method8.com/

- Designed a two-agent orchestration system with an Orchestrator and SQL Agent in n8n enabling natural language interaction with a PostgreSQL database.
- Engineered schema-aware SQL generation using filtered table descriptions to ensure deterministic, structure-aligned queries.
- Built the orchestration layer that interprets user intent, routes to the SQL agent, and manages downstream pipeline execution.
- Used Anthropic's API to transform queried data into structured Excel reports and PowerPoint presentations based on natural-language user requests.

**Technologies:** Python, OpenCV, MediaPipe, Matplotlib, NumPy, OpenAI API, JSON, n8n, PostgreSQL, SQL, Anthropic API (Claude), JavaScript

## Experience: Intern AI Engineer at Blackbox Innovation (Mar 2025 – Jun 2025)

Melbourne, Australia.

- Built a serverless AI backend for a mobile workout planner, architecting the LLM plan generation pipeline and RAG retrieval layer from the ground up.
- Designed RAG pipelines with semantic search using OpenAI Vector Database and Firestore to ground LLM outputs and eliminate hallucinations.
- Built backend orchestration using Firebase Cloud Functions to integrate LLM-based plan generation into a production API.
- Enforced structured ID-based generation and authoritative metadata retrieval from Firestore to ensure deterministic AI outputs.

**Technologies:** Python, Firebase Cloud Functions, Firestore, OpenAI API, Postman, GitHub

## Experience: Software Engineer at Mickiesoft (Nov 2022 – Nov 2023)

Sri Lanka.

- Developed full stack features for Goddeeris, a construction ERP system active in Belgium, across React JS frontend and .NET Core API layers.
- Built an internship management system for Wayamba University of Sri Lanka using a hybrid Laravel and React frontend with admin and student-facing backends.

**Technologies:** .NET Core, React Native, React JS, Laravel, Redux, RTK Query, MS SQL, Azure, Swagger, Git

## Experience: Co-founder and Creative Director at Needlesack

Side venture. Game development studio, published on the Google Play Store.

- Co-founded a game development studio and shipped a cross-platform mobile game to 100,000+ downloads on the Google Play Store.

## Personal Project: Conversational AI Portfolio Assistant — Production RAG System with LangGraph Agent

GitHub: https://github.com/gayyaalpha/gayashan-portfolio | Live Portfolio: https://ambitious-tree-053dd6010.4.azurestaticapps.net/

- Built a conversational AI assistant that lets portfolio visitors query experience in natural language, powered by a multi-agent LangGraph backend with intent-based routing to specialised sub-agents.
- Designed a semantic retrieval pipeline using OpenAI embeddings and a Pinecone vector database to ground LLM responses in structured CV and project data.
- Deployed on Azure Functions with a Next.js frontend on Azure Static Web Apps, with automated CI/CD via GitHub Actions and secure secrets management through Azure App Settings.

**Technologies:** Python, Node.js, React (Next.js), Azure, OpenAI API, Pinecone, LangGraph, LangChain

## Personal Project: Document Intelligence API — Multi-Backend Document Extraction Service

GitHub: https://github.com/gayyaalpha/document-intelligence | Live Demo: https://doc-intel-e6hjh8g8bcdugrav.australiaeast-01.azurewebsites.net/docs

- Architected a multi-backend document extraction service with Azure Document Intelligence and Claude Vision extractors, exposing a REST API via FastAPI that returns structured JSON with field names.
- Designed a pluggable BaseExtractor abstraction layer using the Strategy pattern, enabling Azure Document Intelligence, Claude Vision, and future backends to be swapped at runtime without modifying the pipeline.
- Conducted a systematic evaluation of Azure Document Intelligence vs Claude Vision across determinism, OCR accuracy, schema consistency, and cost.

**Technologies:** Python, FastAPI, Uvicorn, Azure Document Intelligence, Pydantic v2, Azure, CI/CD, REST APIs

## Academic Project: NLP Classification & Modelling Suite (2025)

MSc Academic Projects | La Trobe University | 2025.

- Built a Naive Bayes classifier from scratch for fake vs real news detection, achieving 82% accuracy using manual log-likelihood computation and Laplace smoothing.
- Implemented a bigram language model with add-k smoothing for author attribution across literary texts.
- Developed a TF-IDF vectorisation pipeline from scratch for document classification, validated against Scikit-learn's implementation.
- Built and compared Logistic Regression and neural network classifiers for tweet sentiment analysis using Word2Vec embeddings.
- Fine-tuned a DistilBERT transformer for POS tagging, exceeding 95% accuracy with minimal overfitting across all epochs.

**Technologies:** Python, NLTK, Scikit-learn, TensorFlow, HuggingFace Transformers, Word2Vec, Pandas

## Academic Project: Predictive Analytics & Classification Suite (2024)

MSc Academic Projects | La Trobe University | 2024.

- Built and compared Decision Tree and Random Forest classifiers on the German credit risk dataset; Random Forest outperformed with 75.49% accuracy and 0.78 AUC.
- Applied a cost-sensitive evaluation matrix that penalised approving bad loans 10x more than rejecting good ones, reflecting real banking risk asymmetry.
- Trained Logistic Regression and SVM models on the UCI Adult Income dataset (26,000+ records); SVM achieved 85.5% test accuracy after GridSearchCV hyperparameter tuning.
- Built a full preprocessing pipeline: mode-based imputation for missing values, ordinal encoding for education levels, one-hot encoding for categorical variables, and Min-Max normalisation.
- Validated all models using 10-fold cross-validation, confusion matrix inspection, and ROC-AUC scoring to ensure generalisation and guard against overfitting.

**Technologies:** Python, Scikit-learn, Pandas, NumPy, Matplotlib

## Technical Skills

**Artificial Intelligence & Machine Learning:** LLM integration, prompt engineering, RAG, Generative AI, Computer Vision (object detection, pose estimation), Deep Learning (CNN-based models), NLP (tokenisation, embeddings, text classification, sentiment analysis, named entity recognition), Model evaluation and confidence thresholding, LLM-as-a-Judge evaluation (RAGAS, DeepEval, Langfuse), Supervised & Unsupervised Learning.

**Predictive Analytics & Statistical Modelling:** Generalised Linear Models (GLM), Tree-based models (Decision Trees, Random Forest), Gradient Boosting (XGBoost, LightGBM), Multivariate analysis, Feature engineering, Model validation and performance evaluation.

**AI Systems & Data Pipelines:** Agentic AI systems (LangGraph, LangChain, Multi-Agent Orchestration), semantic search, vector databases (Pinecone, OpenAI Vector Database), Structured LLM outputs (JSON pipelines), hallucination mitigation strategies, retrieval grounding, schema-aware query generation.

**Data & Storage:** PostgreSQL, Firebase, Oracle, MS SQL, schema-aware data handling, backend data validation.

**Programming & Frameworks:** Python, FastAPI, Pydantic v2, Uvicorn, OpenCV, Pandas, NumPy, Matplotlib, PyTorch, Scikit-learn, Seaborn, TensorFlow, MediaPipe, REST API development, JavaScript.

**Cloud & Backend:** Azure (Document Intelligence, Web App Service, Functions, Static Web Apps), Firebase Cloud Functions, Firestore, Serverless architectures, GitHub Actions (CI/CD).

**AI Workflow & Engineering Tools:** N8n, Git, GitHub, Postman, Swagger, VS Code, Cursor.

## Education: La Trobe University (MSc AI, 2023 – 2025)

**Degree:** MSc – Artificial Intelligence (Specialisation: Natural Language Processing)
**Period:** 2023–2025
**WAM:** 76.07

Education: University of Colombo (BSc, 2018 – 2023)

**Degree:** BSc (Hons) in Electronics and Information Technology
**Period:** 2018–2023
**Result:** Second Class (upper division)
