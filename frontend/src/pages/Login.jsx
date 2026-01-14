import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import AnimatedBackground from '../components/AnimatedBackground';
import { FaEnvelope, FaLock, FaRocket } from 'react-icons/fa';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AnimatedBackground />
            <div className="auth-page">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-logo">✦</div>
                        <div className="auth-brand">CosmoDeck</div>
                        <h1 className="auth-title">Welcome back</h1>
                        <p className="auth-subtitle">Sign in to your space for tasks</p>
                    </div>

                    {error && (
                        <div style={{
                            padding: '14px 16px',
                            background: 'var(--danger-soft)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--danger)',
                            fontSize: '14px',
                            marginBottom: '24px',
                            textAlign: 'center',
                            border: '1px solid rgba(248, 113, 113, 0.2)'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <div style={{ position: 'relative' }}>
                                <FaEnvelope style={{
                                    position: 'absolute',
                                    left: '16px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-faint)',
                                    fontSize: '14px'
                                }} />
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    placeholder="astronaut@station.io"
                                    onChange={onChange}
                                    required
                                    style={{ paddingLeft: '46px' }}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div style={{ position: 'relative' }}>
                                <FaLock style={{
                                    position: 'absolute',
                                    left: '16px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-faint)',
                                    fontSize: '14px'
                                }} />
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={formData.password}
                                    placeholder="••••••••"
                                    onChange={onChange}
                                    required
                                    style={{ paddingLeft: '46px' }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full btn-lg"
                            disabled={isLoading}
                            style={{ marginTop: '8px' }}
                        >
                            {isLoading ? (
                                <div className="spinner" style={{ width: '18px', height: '18px' }}></div>
                            ) : (
                                <>
                                    <FaRocket style={{ fontSize: '14px' }} />
                                    Launch Session
                                </>
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        New to CosmoDeck? <Link to="/register">Create account</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
