# 🌐 NeuroLearn — Inclusive AI Learning for Neurodiverse Students  

**NeuroLearn** is a hackathon-built AI-powered EdTech prototype designed to make learning **inclusive, adaptive, and accessible** for neurodiverse students (ADHD, Dyslexia, Autism, and more).  

Our platform demonstrates how AI tutors, multilingual support, and personalized dashboards can create a **neurodiverse-first learning experience**, moving beyond the limitations of traditional e-learning.  

---

## 🚀 Features (MVP Demo)

- **🤖 AI Tutor (Demo Mode)**  
  Ask questions and get explanations in multiple styles: *simple, summarized, or translated*.  
  > *(Currently running in Demo Mode for reliability — backend is already structured to plug into OpenAI/HuggingFace APIs.)*

- **🌍 Language Support**  
  Built to break language barriers through translation-ready architecture.  

- **📊 Personalized Dashboard**  
  Tracks **focus stamina**, **study sessions**, and **saved summaries**, giving students actionable insights into their progress.  

- **🎯 Neurodiverse Accessibility**  
  Adaptive modes tailored to ADHD, Dyslexia, and Autism, with structured lessons and simplified reading support.  

- **📈 Growth Tracking**  
  Visual charts and saved notes motivate continuous learning while making progress measurable.  

---

## 🛠️ Tech Stack  

- **Frontend:** HTML, CSS, Vanilla JS  
- **Backend (Demo-ready):** Node.js + Express  
- **Database (Planned):** MongoDB Atlas (profiles, sessions, analytics)  
- **AI Integration (Planned):** OpenAI / HuggingFace models for adaptive tutoring  
- **Translation Engine (Planned):** Google Translate API / DeepL  

---

## ⚙️ Demo Architecture  

```plaintext
Frontend (HTML/CSS/JS)  →  Backend (Node.js + Express)
                                 │
                                 ├── AI Tutor API (Demo Mode / Plug-in OpenAI)
                                 ├── Translation API (Demo Mode / Future Integration)
                                 └── MongoDB Atlas (User Profiles & Summaries)
```

---

## 🖥️ How to Run Locally  

```bash
# Clone repo
git clone https://github.com/your-username/neurolearn.git
cd neurolearn

# Install dependencies
npm install

# Add environment variables
cp .env.example .env
# add OPENAI_KEY, MONGO_URI etc. (optional for Demo Mode)

# Start backend
npm run dev

# Open frontend
Open index.html in your browser
```

> 🔒 By default, the app runs in **Demo Mode** with mocked AI responses for reliability.  
> To enable real APIs, add your keys in `.env` and set `MOCK_TUTOR=false`.  

---

## 🌍 Future Roadmap  

- [ ] Enable live API integration with OpenAI/HuggingFace  
- [ ] Add real-time translation via DeepL / Google Translate  
- [ ] Expand dashboard with gamified progress and parent/teacher insights  
- [ ] Deploy cross-platform (mobile + web)  
- [ ] Institutional & classroom collaboration features  

---

## 👩‍💻 Team  

**NeuroLearn was developed by:**  
- **Shweta Saravade** — AI & Backend Development  
- **Sakshi Ghodake** — Frontend, Content, and Design  
- **Ranjita Makam** — UI/UX & Documentation  

Built during **Vortexa 2.0 Hackathon**.  

---
