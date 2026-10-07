import { Router } from 'express';

const router = Router();

/** @ai-context Health check: GET /api/health → { status: "ok", timestamp } */
router.get('/', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
