import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Store user in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find((user) => user.username === username);

    if (existingUser) {
      setError('User already exists');
    } else {
      users.push({ username, password });
      localStorage.setItem('users', JSON.stringify(users));
      setError(null);
      alert('Registration successful!');
      router.push('/auth/login'); // Redirect to login page
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl mb-4">Register</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            className="border p-2 w-full mb-4"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border p-2 w-full mb-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="border p-2 w-full mb-4"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 w-full" type="submit">
            Register
          </button>
        </form>

        <p className="mt-4">
          Already have an account?{' '}
          <Link href="/auth/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
