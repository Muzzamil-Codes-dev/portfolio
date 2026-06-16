/**
 * Case-study content for the /projects/[slug] pages. Factual, skimmable for
 * recruiters but technical enough for ML reviewers.
 *
 * `visuals[].src` points at a REAL exported chart in /public/proof/... when one
 * exists; when `src` is omitted the page shows a clean "coming soon" placeholder
 * (see the TODOs at the bottom for what's still missing).
 */

export type CaseSection = {
  heading: string;
  body?: string;
  bullets?: string[];
};

export type Visual = {
  label: string;
  /** Real image under /public; omit to render a placeholder. */
  src?: string;
  /**
   * How the image is framed inside its fixed-height card so the gallery stays
   * consistent regardless of the source image's proportions:
   *  - "wide": very wide charts/diagrams — span the full grid width and fill it.
   *  - "square": square-ish plots (confusion matrices, heatmaps) — fill the height.
   *  - "tall": portrait charts — use a taller frame.
   *  - undefined: a standard landscape chart in the default frame.
   */
  shape?: "wide" | "square" | "tall";
  /**
   * Object-fit inside the frame:
   *  - "contain" (default): matted and centred, nothing cropped — charts/diagrams.
   *  - "cover": fills the frame edge-to-edge — app/UI screenshots.
   */
  fit?: "contain" | "cover";
};

export type Glance = {
  problem: string;
  built: string;
  models: string;
  result: string;
  strength: string;
  links: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  tech: string[];
  github?: string;
  /** Subtle proof-signal chips shown near the top. */
  proof: string[];
  glance: Glance;
  visuals: Visual[];
  sections: CaseSection[];
};

export const caseStudies: Record<string, CaseStudy> = {
  "finsight-ai": {
    slug: "finsight-ai",
    title: "FinSight AI",
    tagline:
      "Short-term stock-movement classification fusing market indicators, financial-news sentiment, and document retrieval.",
    tech: ["Python", "PyTorch", "FinBERT", "Transformers", "RAG", "scikit-learn"],
    proof: ["Metric shown", "SHAP explainability", "Reproducible pipeline", "Docker included", "CI/tests included"],
    glance: {
      problem:
        "Can short-term stock direction be predicted using market data, news sentiment and retrieved document context?",
      built:
        "End-to-end financial ML pipeline with technical indicators, FinBERT sentiment and document retrieval.",
      models:
        "Logistic regression, random forest, gradient boosting, LSTM, GRU and Transformer-style models.",
      result:
        "Models performed only slightly above baseline, showing the difficulty of short-horizon prediction.",
      strength: "Leakage-free evaluation, reproducible experiments, honest reporting.",
      links: ["Dashboard", "Case Study", "Repo available on request"],
    },
    visuals: [
      { label: "Live Streamlit dashboard — prediction, sentiment, backtest & document Q&A", src: "/proof/finsight/streamlit-dashboard.png", shape: "wide" },
      { label: "Model comparison — macro-F1 vs random baseline", src: "/proof/finsight/model-comparison.png", shape: "wide" },
      { label: "Confusion matrices (per model)", src: "/proof/finsight/confusion-matrices.png" },
      { label: "SHAP feature importance (AAPL)", src: "/proof/finsight/shap-importance.png" },
      { label: "Backtest equity curve vs buy-and-hold", src: "/proof/finsight/backtest-equity.png", shape: "wide" },
      { label: "Pipeline architecture — data, features, models, RAG & serving", src: "/proof/finsight/architecture.svg", shape: "wide" },
    ],
    sections: [
      {
        heading: "Objective",
        body: "Predict whether a stock moves UP, DOWN, or SIDEWAYS over the next few trading days, and test honestly whether news sentiment and document context improve on price-only models.",
      },
      {
        heading: "Dataset / input",
        bullets: [
          "Daily OHLCV price history for a basket of large-cap tickers",
          "Engineered technical indicators (returns, moving averages, RSI, MACD, volatility)",
          "Financial-news headlines scored for sentiment with FinBERT",
          "Filings and reports indexed for retrieval-augmented context",
        ],
      },
      {
        heading: "Model approach",
        bullets: [
          "Framed as a 3-class problem with strict, leakage-free time-based splits",
          "Classical baselines: logistic regression, random forest, gradient boosting",
          "Deep sequence models: LSTM, GRU and a Transformer-style encoder",
          "Ablations to isolate the contribution of sentiment and retrieval",
        ],
      },
      {
        heading: "Results / metrics",
        body: "Evaluated with macro-F1 to respect class imbalance. Models clustered just above the random baseline (0.33) — the honest finding that 5-day direction is close to unpredictable on this universe. SHAP confirmed the models leaned on volatility and momentum signals rather than artefacts.",
      },
      {
        heading: "Deployment / reproducibility",
        body: "Packaged as a modular pipeline with a single config, unit tests, a Streamlit dashboard, a Dockerfile, and CI — so every experiment is reproducible end to end.",
      },
      {
        heading: "Limitations",
        bullets: [
          "Short-horizon market direction is inherently noisy and near-random",
          "Sentiment used a reproducible sample feed rather than a paid dated archive",
          "Single market, daily resolution, a handful of tickers",
        ],
      },
      {
        heading: "Future improvements",
        bullets: [
          "Sector-specific market context and a real dated news API",
          "Walk-forward cross-validation and probability calibration",
          "A FastAPI inference service alongside the dashboard",
        ],
      },
      {
        heading: "Key takeaway",
        body: "A negative result, reported honestly: the engineering rigour (leakage-free splits, ablations, reproducibility) matters more than chasing an inflated score on a near-random problem.",
      },
    ],
  },

  "telco-churn": {
    slug: "telco-churn",
    title: "Telco Churn Predictor",
    tagline:
      "A two-stage churn model with explainable drivers on the IBM Telco dataset.",
    tech: ["Python", "XGBoost", "scikit-learn", "pandas", "SHAP"],
    github: "https://github.com/Muzzamil-Codes-dev/telco-churn-predictor",
    proof: ["Metric shown · 0.82 ROC-AUC", "GitHub available", "Feature importance", "Reproducible notebook"],
    glance: {
      problem:
        "Which customers are likely to churn, and what drives each prediction so retention can be targeted?",
      built:
        "A two-stage pipeline: a gradient-boosted risk scorer feeding an XGBoost classifier, with explainable drivers.",
      models: "Gradient boosting (risk scoring) and XGBoost (classification).",
      result: "0.82 ROC-AUC on a held-out test set.",
      strength: "Practical pipeline design plus explainable, actionable output.",
      links: ["GitHub", "Case Study"],
    },
    visuals: [
      { label: "ROC curve — XGBoost (AUC 0.82)", src: "/proof/telco/roc-curve.png", shape: "square" },
      { label: "Confusion matrix", src: "/proof/telco/confusion-matrix.png", shape: "square" },
      { label: "Top-20 feature importances (XGBoost)", src: "/proof/telco/feature-importance.png" },
    ],
    sections: [
      {
        heading: "Objective",
        body: "Predict which customers are likely to churn and explain why, so retention efforts can be targeted at the highest-risk accounts.",
      },
      {
        heading: "Dataset / input",
        body: "The IBM Telco customer dataset — contract, billing, tenure, and service-usage attributes — with churn as the target (≈1,400 test customers in the confusion matrix).",
      },
      {
        heading: "Model approach",
        bullets: [
          "Cleaning, encoding, and feature engineering on customer attributes",
          "A two-stage pipeline: a gradient-boosted risk scorer feeding an XGBoost classifier",
          "Threshold tuning and class-imbalance handling for fair evaluation",
        ],
      },
      {
        heading: "Results / metrics",
        body: "Reached 0.82 ROC-AUC on a held-out test set. Feature-importance analysis identified the strongest churn drivers (contract type, tenure, and charges), turning the model into actionable insight.",
      },
      {
        heading: "Deployment / reproducibility",
        body: "Reproducible notebook plus a saved model artefact ready to score new customers in batch.",
      },
      {
        heading: "Limitations",
        bullets: [
          "A single public dataset that may not match a given operator's mix",
          "Static snapshot — no time-aware or streaming churn signals",
        ],
      },
      {
        heading: "Future improvements",
        bullets: [
          "Calibrated churn probabilities tied to retention-offer economics",
          "Drift monitoring once deployed against live data",
        ],
      },
      {
        heading: "Key takeaway",
        body: "A clean, explainable classifier with a real metric (0.82 ROC-AUC) and drivers a business could act on.",
      },
    ],
  },

  "nlp-retrieval-rag": {
    slug: "nlp-retrieval-rag",
    title: "NLP Retrieval & RAG",
    tagline:
      "An information-retrieval and retrieval-augmented question-answering system on Natural Questions.",
    tech: ["Python", "FAISS", "Transformers", "Flan-T5", "NLP"],
    github: "https://github.com/Muzzamil-Codes-dev/nlp-retrieval-rag-coursework",
    proof: ["GitHub available", "Retrieval demo", "Re-ranking", "Reproducible notebook"],
    glance: {
      problem:
        "How well can a system answer natural-language questions over a document collection, and what does re-ranking add?",
      built:
        "TF-IDF, dense and hybrid retrieval baselines with FAISS, cross-encoder re-ranking and Flan-T5 generation.",
      models: "TF-IDF, dense embeddings, a cross-encoder re-ranker, and Flan-T5.",
      result:
        "The dense + cross-encoder stack improved candidate quality over the TF-IDF baseline; grounding reduced unsupported answers.",
      strength: "IR fundamentals, retrieval evaluation, end-to-end RAG.",
      links: ["GitHub", "Case Study"],
    },
    visuals: [
      { label: "RAG pipeline — indexing, retrieval, re-ranking & grounded generation", src: "/proof/nlp/architecture.svg", shape: "wide" },
      { label: "Retrieved documents & citations — gold passage recovered at rank 1", src: "/proof/nlp/retrieved-passages.svg", shape: "wide" },
      { label: "Query-to-passage similarity heatmap for a sample question", src: "/proof/nlp/retrieval-heatmap.png", shape: "square" },
    ],
    sections: [
      {
        heading: "Objective",
        body: "Answer natural-language questions over a document collection, comparing retrieval strategies and measuring how much re-ranking and generation add.",
      },
      {
        heading: "Dataset / input",
        body: "The Natural Questions benchmark — real user questions paired with Wikipedia passages — used for both retrieval and answer evaluation.",
      },
      {
        heading: "Model approach",
        bullets: [
          "TF-IDF, dense, and hybrid retrieval baselines",
          "FAISS for efficient nearest-neighbour search over embeddings",
          "A cross-encoder to re-rank the top candidates",
          "Flan-T5 to generate grounded answers from retrieved context",
        ],
      },
      {
        heading: "Results / metrics",
        body: "Retrieval compared with standard IR metrics (recall@k, MRR); the dense + cross-encoder stack improved candidate quality over the TF-IDF baseline, and grounding generation in retrieved passages reduced unsupported answers. The similarity heatmap shows the top retrieved passages for a sample query.",
      },
      {
        heading: "Deployment / reproducibility",
        body: "Delivered as reproducible notebooks and scripts that run the full pipeline from indexing through evaluation.",
      },
      {
        heading: "Limitations",
        bullets: [
          "Compute-bound to a subset of the full benchmark",
          "Generation quality bounded by a small, open generator model",
        ],
      },
      {
        heading: "Future improvements",
        bullets: [
          "Larger instruction-tuned generators and query rewriting",
          "Answer-faithfulness scoring and citation checking",
        ],
      },
      {
        heading: "Key takeaway",
        body: "Demonstrates the retrieval fundamentals behind modern RAG — baselines, dense search, re-ranking and grounded generation — measured properly.",
      },
    ],
  },

  "credit-risk": {
    slug: "credit-risk",
    title: "Credit Risk Prediction",
    tagline: "Borrower default-risk classification with imbalance handling and SHAP explainability.",
    tech: ["scikit-learn", "XGBoost", "pandas", "SHAP", "Python"],
    github: "https://github.com/Muzzamil-Codes-dev/credit-risk-prediction",
    proof: ["GitHub available", "SHAP explainability", "ROC + confusion matrix", "Cross-validated"],
    glance: {
      problem: "Can we estimate a borrower's probability of default and explain what drives the risk?",
      built: "A full classification pipeline with feature engineering, model comparison and SHAP explanations.",
      models: "Logistic regression, random forest and gradient boosting, compared with cross-validation.",
      result: "Best model selected on cross-validated AUC; drivers surfaced with SHAP.",
      strength: "Honest model comparison, class-imbalance handling, explainable output.",
      links: ["GitHub", "Case Study"],
    },
    visuals: [
      { label: "Model comparison — 3-fold CV AUC", src: "/proof/credit/model-comparison.png", shape: "wide" },
      { label: "ROC curve", src: "/proof/credit/roc-curve.png", shape: "square" },
      { label: "Confusion matrix", src: "/proof/credit/confusion-matrix.png", shape: "square" },
      { label: "SHAP summary — what drives predicted default", src: "/proof/credit/shap-summary.png" },
    ],
    sections: [
      {
        heading: "Objective",
        body: "Classify borrowers by default risk and explain the drivers, so decisions are both accurate and defensible.",
      },
      {
        heading: "Dataset / input",
        body: "A public credit dataset of applicant and loan attributes, with default as the binary target.",
      },
      {
        heading: "Model approach",
        bullets: [
          "Feature engineering and encoding on applicant/loan attributes",
          "Cross-validated comparison of logistic regression, random forest and gradient boosting",
          "Class-imbalance handling and threshold selection",
        ],
      },
      {
        heading: "Results / metrics",
        body: "Models compared on 3-fold CV AUC; the chosen model is reported with its ROC curve and confusion matrix. SHAP shows which features push a prediction toward default.",
      },
      {
        heading: "Deployment / reproducibility",
        body: "Reproducible notebooks (EDA + modelling) that run end to end.",
      },
      {
        heading: "Limitations",
        bullets: [
          "Single public dataset; real lending data would shift the distribution",
          "No fairness/bias audit in this version",
        ],
      },
      {
        heading: "Future improvements",
        bullets: ["Probability calibration tied to lending policy", "A fairness and bias review"],
      },
      {
        heading: "Key takeaway",
        body: "A complete, explainable risk classifier — compared honestly and interrogated with SHAP, not just a single accuracy number.",
      },
    ],
  },

  "house-price": {
    slug: "house-price",
    title: "House Price Prediction",
    tagline: "Regression models that estimate property prices and quantify the drivers of valuation.",
    tech: ["scikit-learn", "pandas", "SHAP", "Matplotlib", "Python"],
    github: "https://github.com/Muzzamil-Codes-dev/house-price-prediction",
    proof: ["GitHub available", "SHAP explainability", "Cross-validated", "Reproducible notebook"],
    glance: {
      problem: "How accurately can property prices be predicted, and which features drive valuation?",
      built: "An EDA-to-modelling regression pipeline with cross-validated model comparison and SHAP.",
      models: "Linear, tree-based and gradient-boosting regressors compared with 5-fold CV.",
      result: "Best model chosen on cross-validated RMSE / R²; price drivers ranked with SHAP.",
      strength: "Clean evaluation and explainable, business-readable drivers.",
      links: ["GitHub", "Case Study"],
    },
    visuals: [
      { label: "Model comparison — 5-fold CV (RMSE / R²)", src: "/proof/house/model-comparison.png", shape: "wide" },
      { label: "SHAP summary — what drives predicted price", src: "/proof/house/shap-summary.png" },
      { label: "Mean |SHAP| — global feature importance", src: "/proof/house/shap-importance.png", shape: "square" },
    ],
    sections: [
      {
        heading: "Objective",
        body: "Predict property prices and surface the features that move them, with honest cross-validated evaluation.",
      },
      {
        heading: "Dataset / input",
        body: "A tabular housing dataset of property and location attributes with sale price as the target.",
      },
      {
        heading: "Model approach",
        bullets: [
          "Feature engineering on property and location attributes",
          "5-fold cross-validated comparison across regressor families",
          "SHAP to explain the chosen model",
        ],
      },
      {
        heading: "Results / metrics",
        body: "Models compared on cross-validated RMSE and R²; SHAP ranks the strongest drivers of predicted price for an interpretable result.",
      },
      {
        heading: "Deployment / reproducibility",
        body: "Reproducible notebooks (EDA + modelling).",
      },
      {
        heading: "Limitations",
        bullets: ["Single dataset; prices are market- and time-specific", "No external economic features"],
      },
      {
        heading: "Future improvements",
        bullets: ["Geospatial features", "A small prediction UI"],
      },
      {
        heading: "Key takeaway",
        body: "A well-evaluated regression project that explains its predictions rather than treating the model as a black box.",
      },
    ],
  },

  "cnn-from-scratch": {
    slug: "cnn-from-scratch",
    title: "CNN From Scratch",
    tagline: "A convolutional neural network built from first principles in pure NumPy.",
    tech: ["Python", "NumPy", "Computer Vision"],
    github: "https://github.com/Muzzamil-Codes-dev/CNN-From-Scratch",
    proof: ["GitHub available", "Training curves", "From scratch (NumPy)"],
    glance: {
      problem: "Can I implement a CNN — forward and backward — with no deep-learning framework, to truly understand the maths?",
      built: "Hand-coded conv, pooling and dense layers with manual back-propagation, trained on MNIST.",
      models: "A small CNN classifier on handwritten digits.",
      result: "Trains and classifies digits; learns meaningful first-layer edge filters.",
      strength: "First-principles understanding of how CNNs actually work.",
      links: ["GitHub", "Case Study"],
    },
    visuals: [
      { label: "Training loss curve", src: "/proof/cnn/training-loss.png" },
      { label: "Sample predictions (correct vs errors)", src: "/proof/cnn/sample-predictions.png", shape: "wide" },
      { label: "Learned first-layer 3×3 filters", src: "/proof/cnn/learned-filters.png", shape: "wide" },
    ],
    sections: [
      {
        heading: "Objective",
        body: "Build and train a CNN using only NumPy to internalise convolution, pooling and back-propagation.",
      },
      { heading: "Dataset / input", body: "The MNIST handwritten-digit dataset (28×28 greyscale images)." },
      {
        heading: "Model approach",
        bullets: [
          "Conv, max-pool and dense layers implemented from scratch",
          "Manual forward and backward passes (the gradients derived by hand)",
          "Trained with mini-batch gradient descent",
        ],
      },
      {
        heading: "Results / metrics",
        body: "The loss curve shows stable training; sample predictions show correct classifications and the characteristic errors (e.g. 9↔7). The learned first-layer filters resemble edge/stroke detectors — evidence the network learned real features.",
      },
      { heading: "Deployment / reproducibility", body: "A single reproducible notebook." },
      {
        heading: "Limitations",
        bullets: ["Small model and dataset for clarity over accuracy", "No GPU acceleration — NumPy only"],
      },
      {
        heading: "Future improvements",
        bullets: ["Add batch-norm and more layers", "Vectorise the conv for speed"],
      },
      {
        heading: "Key takeaway",
        body: "Shows depth of understanding — I can derive and implement the building blocks frameworks hide, not just call them.",
      },
    ],
  },

  "streammind-ai": {
    slug: "streammind-ai",
    title: "StreamMind AI",
    tagline:
      "A production-style GenAI search and recommendation platform for a streaming catalogue.",
    tech: ["Python", "PyTorch", "RAG", "FastAPI", "Docker", "MLflow"],
    proof: ["Case study available", "Docker included", "CI/tests included", "MLflow tracking"],
    glance: {
      problem:
        "How do you let users search and chat with a streaming catalogue and get grounded, explainable recommendations?",
      built:
        "Hybrid retrieval, a grounded RAG chatbot, ranking models and a feedback loop behind a FastAPI + Streamlit app.",
      models:
        "BM25 + semantic retrieval, classical rankers, a PyTorch neural re-ranker, and a LinUCB contextual bandit.",
      result:
        "Re-ranking and the bandit loop measurably reshuffled results toward preferred items; tracked in MLflow.",
      strength: "End-to-end system design, retrieval evaluation, containerised deployment.",
      links: ["Case Study", "Repo available on request"],
    },
    visuals: [
      { label: "Chat UI screenshot" },
      { label: "Retrieval debug trace" },
      { label: "Evaluation dashboard" },
      { label: "Architecture diagram" },
    ],
    sections: [
      {
        heading: "Objective",
        body: "Let users search and chat with a movie/TV/sport catalogue, returning grounded, explainable recommendations rather than opaque suggestions.",
      },
      {
        heading: "Dataset / input",
        bullets: [
          "A structured streaming catalogue with rich metadata",
          "Text embeddings per title for semantic matching",
          "Simulated thumbs-up / thumbs-down feedback events",
        ],
      },
      {
        heading: "Model approach",
        bullets: [
          "Hybrid retrieval combining BM25 keyword search with semantic similarity",
          "A grounded RAG chatbot that cites the catalogue entries it used",
          "Classical rankers plus a PyTorch neural re-ranker",
          "A LinUCB contextual bandit that adapts to feedback online",
        ],
      },
      {
        heading: "Results / metrics",
        body: "Retrieval and ranking quality tracked with an evaluation harness; the neural re-ranker and bandit loop reshuffled results toward preferred items. Experiments logged with MLflow.",
      },
      {
        heading: "Deployment / reproducibility",
        body: "A FastAPI REST backend with a multi-tab Streamlit front end plus a retrieval debug trace. Containerised with Docker and wired to GitHub Actions CI; runs fully offline.",
      },
      {
        heading: "Limitations",
        bullets: [
          "Built on a synthetic catalogue rather than a licensed production dataset",
          "Feedback signals are simulated, not real user behaviour",
          "Single-node, in-memory retrieval rather than a hosted vector store",
        ],
      },
      {
        heading: "Future improvements",
        bullets: [
          "Swap the in-memory index for a managed vector database",
          "A/B testing around the ranker and bandit policies",
          "Personalisation from longer-term histories",
        ],
      },
      {
        heading: "Key takeaway",
        body: "Shows I can assemble a full retrieval-to-ranking system — not just a model — with evaluation, tracking and deployment baked in.",
      },
    ],
  },

  stockscope: {
    slug: "stockscope",
    title: "StockScope",
    tagline:
      "A full-stack stock-research platform with analytics-backed insights and explainable, plain-English summaries.",
    tech: ["Next.js", "TypeScript", "Supabase", "LLM", "Recharts"],
    proof: ["Case study available", "Full-stack app", "LLM summaries", "Server-side caching"],
    glance: {
      problem:
        "How can a non-expert understand a stock — earnings, valuation, risk and scenarios — at a glance and in plain English?",
      built:
        "A full-stack web app with a transparent risk score, volatility-based forecasts and LLM-generated summaries.",
      models: "Rule-based risk scoring, volatility-based scenario bands, LLM explanations.",
      result: "An interpretable dashboard where every number is explained and forecasts show both sides.",
      strength: "Full-stack delivery, API integration, responsible/explainable design.",
      links: ["Case Study", "Repo available on request"],
    },
    visuals: [
      { label: "Stock dashboard screenshot" },
      { label: "Earnings / valuation / risk breakdown" },
      { label: "LLM-generated summary example" },
      { label: "Bull / base / bear forecast bands" },
    ],
    sections: [
      {
        heading: "Objective",
        body: "Help non-expert investors understand a stock at a glance — earnings, valuation, risk, and scenarios — in plain English, without black-box hype.",
      },
      {
        heading: "Dataset / input",
        body: "Live market data from a financial-data API (prices, fundamentals, earnings), cached server-side to stay within free-tier limits.",
      },
      {
        heading: "Model approach",
        bullets: [
          "A transparent, rule-based risk-and-stability score that shows its working",
          "Bull / base / bear forecast bands derived from each stock's own historical volatility",
          "LLM-generated plain-English explanations grounded in the live data",
        ],
      },
      {
        heading: "Results / metrics",
        body: "A responsive dashboard where every number is explained and every forecast shows both upside and downside — deliberately interpretable rather than a single opaque prediction.",
      },
      {
        heading: "Deployment / reproducibility",
        body: "Next.js App Router with a Supabase (Postgres + row-level security) backend, layered caching, and a Vercel-ready build. API keys stay server-side.",
      },
      {
        heading: "Limitations",
        bullets: [
          "Educational tool, not financial advice",
          "Scenario forecasts are volatility-based estimates, not guarantees",
        ],
      },
      {
        heading: "Future improvements",
        bullets: [
          "Portfolio-level views and watchlist alerts",
          "Richer fundamentals and peer comparison",
        ],
      },
      {
        heading: "Key takeaway",
        body: "Shows I can ship a complete, explainable data product — from API and caching to UI — not just a model in a notebook.",
      },
    ],
  },
};

export const caseStudySlugs = Object.keys(caseStudies);

/*
 * VISUAL-PROOF status:
 *  - FinSight AI: DONE — real charts + live Streamlit dashboard screenshot
 *    (/proof/finsight/streamlit-dashboard.png, captured from the running app)
 *    + hand-built pipeline architecture diagram (/proof/finsight/architecture.svg).
 *  - NLP Retrieval & RAG: DONE — real retrieval heatmap + retrieved-documents /
 *    citations panel (/proof/nlp/retrieved-passages.svg, built from real top-k
 *    output) + RAG pipeline architecture diagram (/proof/nlp/architecture.svg).
 *  - StreamMind AI: still placeholders — chat UI, retrieval debug trace, eval
 *    dashboard, architecture (needs the app running / Docker).
 *  - StockScope: still placeholders — dashboard, valuation/risk, summary, forecast
 *    bands (needs Supabase + market-data keys).
 *  - Computational Physics (C++): no case study page until a visual exists.
 *
 * Architecture/citation diagrams are self-contained SVGs themed to the site
 * palette (bg #F6EEE2 to match the card frame). The dashboard PNG was captured
 * by driving headless Chrome over the DevTools Protocol (Node built-in
 * WebSocket — no Playwright/Selenium dependency).
 */
