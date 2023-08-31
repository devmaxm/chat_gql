import {useState} from 'react';
import {register} from '../lib/auth';
import {NavLink, useNavigate} from "react-router-dom";

function LoginForm({onLogin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(false);
        const user = await register(username, password, passwordConfirm);
        if (user) {
            onLogin(user);
            navigate('/')
        } else {
            setError(true);
        }
    };

    return (
        <section className="section">
            <div className="container">
                <h1 className="title">
                    Login
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label">
                            Username
                        </label>
                        <div className="control">
                            <input className="input" type="text" required
                                   value={username} onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">
                            Password
                        </label>
                        <div className="control">
                            <input className="input" type="password" required
                                   value={password} onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">
                            Password confirm
                        </label>
                        <div className="control">
                            <input className="input" type="password" required
                                   value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)}
                            />
                        </div>
                    </div>
                    {error && (
                        <div className="message is-danger">
                            <p className="message-body">
                                Register failed
                            </p>
                        </div>
                    )}
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-link">
                                Register
                            </button>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <NavLink to='/'>Login</NavLink>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default LoginForm;
