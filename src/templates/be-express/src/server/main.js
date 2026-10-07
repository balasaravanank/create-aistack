import express from 'express';
import cors from 'cors';
import { applyMiddleware } from './middleware/index.js';
import healthRoutes from './routes/health.js';

const app = express();
const PORT = process.env.PORT || 3001;

applyMiddleware(app);

// Routes
app.use('/api/health', healthRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
