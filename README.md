# VedaAI — AI Assessment Creator

## Tech Stack
- Frontend: Next.js + TypeScript + Zustand
- Backend: Node.js + Express + TypeScript
- Database: MongoDB
- Cache: Redis
- Queue: BullMQ
- AI: Claude (Anthropic)
- Realtime: Socket.io

## Setup

### 1. Clone the repo
git clone <your-repo-url>
cd vedaai

### 2. Start MongoDB + Redis
docker-compose up -d

### 3. Backend setup
cd backend
npm install
cp .env.example .env
# Add your ANTHROPIC_API_KEY in .env
npm run dev

### 4. Frontend setup
cd frontend
npm install
npm run dev

## Architecture
- Teacher fills form → Frontend sends to Backend API
- Backend creates Assignment in MongoDB
- Job added to BullMQ queue
- Worker picks job → calls Claude AI
- AI generates structured JSON question paper
- Paper saved to MongoDB
- WebSocket notifies frontend
- Frontend displays formatted question paper