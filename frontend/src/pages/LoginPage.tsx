import { useState, useEffect } from "react";
import { login } from "../api/auth/api";
import { useNavigate } from "react-router-dom";

const TOKEN_KEY = "authToken";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    setIsAuthenticated(!!token);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await login({ email, password });
      if (!response.ok) {
        if (response.status === 401) {
          setError("Invalid email or password");
        } else {
          setError(`Status: ${response.status}`);
        }
        setLoading(false);
        return;
      }
      const data = await response.json();
      localStorage.setItem(TOKEN_KEY, data.token);
      setEmail("");
      setPassword("");
      setIsAuthenticated(true);
      navigate("/"); // редирект после успешного входа
    } catch {
      setError("Error. Server error, etc.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return (
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div
          className="card p-4 shadow"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h2 className="mb-4 text-center">Вы авторизовались</h2>
          <button className="btn btn-danger w-100" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div
          className="card p-4 shadow"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h2 className="mb-4 text-center">Авторизация</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Пароль
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Выполняется вход..." : "Войти"}
            </button>   
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;