export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <header className="header">
        <div className="header-brand">
          <span className="logo">⚡</span>
          <span className="brand-name">AI-Stack</span>
        </div>
        <nav className="header-nav">
          <a href="/">Home</a>
          <a href="https://github.com/create-aistack" target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </header>
      <div className="content">{children}</div>
    </div>
  );
}
