import { useState } from 'react';
import useLogin from '../../hooks/useLogin';
import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <h2>Log in</h2>
        </div>

        <div className={styles.content}>
          <label htmlFor="email" className={styles.field}>
            Email:
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label htmlFor="password" className={styles.field}>
            Password:
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button disabled={loading} type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
