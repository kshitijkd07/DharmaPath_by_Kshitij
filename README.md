<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />

# 🕉️ Dharma Path - Spiritual Guide

An AI-powered, comprehensive Vedic spiritual companion app built with modern web technologies and clean architecture principles. Discover your destiny with AI Palmistry, track your spiritual growth, and explore the ancient wisdom of Dharma.

</div>

---

## ✨ Features

- **✋ AI Palm Reading**: Upload an image of your dominant palm and receive a highly detailed, personalized reading based on Vedic astrology and palmistry principles, powered by **Google Gemini AI**.
- **📿 Jaap Tracker**: Digitally track your daily mantra recitations.
- **🙏 Puja Services**: Browse and learn about various Vedic rituals and Pujas.
- **✨ Dynamic Live Backgrounds**: Immersive visual experiences with animated mandalas and particle effects.
- **🔒 Code-First Database**: Fully typed and programmatic database generation using SQLite.

## 🏗️ Architecture & Tech Stack

This project strictly adheres to **Clean Architecture** and **MVC (Model-View-Controller)** paradigms, ensuring long-term maintainability and modularity.

### Frontend (The View)
- **React 19 & Vite**: Fast, modern frontend framework.
- **TailwindCSS**: For stunning, responsive, and dynamic UI components.
- **Framer Motion**: Delivering smooth micro-animations and page transitions.
- **Custom Hooks**: Business logic and API calls are cleanly abstracted into reusable React Hooks (e.g., `usePalmReading`).

### Backend (Model & Controller)
- **Node.js & Express**: Robust server framework.
- **MVC Pattern**: Clear separation of concerns via `/models`, `/controllers`, and `/services`.
- **Better SQLite 3**: Blazing-fast relational database connection.
- **Google GenAI SDK**: Deep integration with Gemini 3.5 Flash for multimodal image analysis.

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18+ recommended)
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Open `.env.example` or create a new `.env` file in the root directory and add your API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Initialize the Database:**
   We use a code-first approach. Run the following command to automatically create the SQLite database and all required tables:
   ```bash
   npm run db:setup
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   *The server will start on `http://localhost:3000`.*

5. **Build for Production (Optional):**
   ```bash
   npm run build
   ```

---

<div align="center">
  <p><i>"The mind acts like an enemy for those who do not control it." — Bhagavad Gita</i></p>
</div>
