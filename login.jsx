import { useState } from 'react';
import GoogleAuth from './GoogleAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Panggil API login
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email/Nomor HP"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>

      <div className="divider">ATAU</div>
      
      <GoogleAuth />
    </div>
  );
}
