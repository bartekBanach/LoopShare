import { useState } from 'react';
import useSignup from '../../hooks/useSingup';
import styles from './Singup.module.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const { signup, loading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, username, password);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2 className={styles.header}>Register</h2>

      <div className={styles.content}>
        <label htmlFor="mail" className={styles.field}>
          Email:
          <input id="mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="username" className={styles.field}>
          Username:
          <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
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
  );
}

export default Signup;
