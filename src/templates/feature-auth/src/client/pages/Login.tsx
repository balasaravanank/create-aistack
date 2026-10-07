import Button from '../components/Button';
import Input from '../components/Input';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Wire up useAuth().login
    console.log('Login:', { email, password });
  };

  return (
    <main className="home">
      <section className="hero">
        <h1>Sign In</h1>
        <p>Welcome back. Log in to your account.</p>
      </section>

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </form>
    </main>
  );
}
