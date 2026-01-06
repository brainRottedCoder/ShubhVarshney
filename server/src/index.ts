import express from 'express';
import cors from 'cors';
import { githubRouter } from './routes/github.js';
import { leetcodeRouter } from './routes/leetcode.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:4173', "http://localhost:8080"],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/github', githubRouter);
app.use('/api/leetcode', leetcodeRouter);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
