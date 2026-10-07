import cors from 'cors';
import express from 'express';

/**
 * @ai-context Applies CORS, JSON body parser, request logging, and error handler.
 */
export function applyMiddleware(app) {
  app.use(cors());
  app.use(express.json());

  // Request logging
  app.use((req, _res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });

  // Error handler (register after routes in production)
  app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
  });
}
