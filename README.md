# Crypto Advisor Dashboard

A smart and personalized cryptocurrency dashboard that brings together market data, news, AI insights, and user feedback — all in one clean experience.

## 🌐 Live Demo

**Deployed App:** https://crypto-adv.netlify.app
**GitHub Repo:** https://github.com/IdanBahar/-crypto-advisor

---

## ✨ Features

- **Live Crypto Prices** — Real-time data for major coins
- **Market News Feed** — Updates from trusted crypto sources
- **AI Insights** — Auto-generated summaries, trends, and recommendations
- **Fun Facts** — TIL highlights from Reddit
- **User Authentication** — JWT login & register
- **Voting System** — Like/Dislike feedback saved in the database

---

## 🛠 Tech Stack

**Frontend:** React (Vite), Sass, React Icons, Fetch API  
**Backend:** Node.js, Express, MongoDB Native Driver, JWT, bcrypt  
**External APIs:** CoinGecko/CoinMarketCap, Reddit JSON, News API, OpenAI/Anthropic

---

## 🏗 Architecture Overview

### User Schema (Simplified)

```js
{
  name,
  email,
  password, // hashed
  preferences: { interestedCoins: [], investorType: "" },
  votes: { funFacts: 0, coinPrices: 0, marketNews: 0, aiInsight: 0 }
}
```

### Main Endpoints

- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/user/profile`
- PUT `/api/user/preferences`
- PUT `/api/vote`
- GET `/api/crypto/prices`
- GET `/api/crypto/news`
- GET `/api/ai-insight`

---

## 🚀 Setup

### Backend

```bash
cd server
npm install
```

Create `.env`:

```
PORT=3000
MONGODB_URI=your_connection_string
JWT_SECRET=your_jwt_secret
```

Run:

```bash
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Default URLs:  
Frontend → http://localhost:5173  
Backend → http://localhost:3000

---

## 🔐 Database

- **DB Name:** crypto_advisor
- **Collection:** users

Example admin query:

```js
db.users.find({}, { name: 1, votes: 1 })
```

---

## 🔑 API Keys & Fallbacks

If APIs hit rate limits, the app falls back to:

- Cached crypto prices
- Cached news
- Pre-generated AI insights
- Reddit CORS proxy

---

## 👍 Voting System

Each section includes 👍/👎 buttons.  
Votes:

1. Change UI instantly
2. Sync with backend
3. Update MongoDB:

```js
{ $set: { "votes.funFacts": 1 } }
```

4. Persist on next login

---

## 🤖 AI Usage

AI was used to:

- Summarize content
- Generate insights
- Help design API structure
- Debug complex issues
- Improve documentation

---

## 🌍 Deployment

- Frontend: Vercel / Netlify
- Backend: Render / Railway
- Database: MongoDB Atlas

---

## 👨‍💻 Author

**Idan Bahar**
