import Button from '../components/Button';

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <h1>Welcome to your AI-Stack</h1>
        <p>This project was scaffolded with <strong>create-aistack</strong> — optimized for AI coding agents.</p>
        <div className="hero-actions">
          <Button variant="primary" onClick={() => alert('Start building!')}>
            Get Started
          </Button>
          <Button variant="secondary" onClick={() => window.open('https://github.com/create-aistack')}>
            Documentation
          </Button>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>🧠 AI-Optimized</h3>
          <p>PROJECT.md and _contracts files let AI understand your codebase in under 500 tokens.</p>
        </div>
        <div className="feature-card">
          <h3>⚡ Full-Stack</h3>
          <p>Frontend and backend wired together with shared type contracts.</p>
        </div>
        <div className="feature-card">
          <h3>🚀 Ready to Ship</h3>
          <p>Dev server, linting, testing, and build pipeline preconfigured.</p>
        </div>
      </section>
    </main>
  );
}
