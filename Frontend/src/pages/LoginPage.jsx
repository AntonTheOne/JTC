import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "./PagesCss/LoginPage.css";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleLogin() {
        setError("");

        try {
            const data = await login(username, password);
            localStorage.setItem("token", data.token);
            navigate("/admin");
        } catch {
            setError("Fel användarnamn eller lösenord");
        }
    }

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h1>JTC Admin</h1>
                <p>Logga in för att fortsätta</p>
                <input
                    type="text"
                    placeholder="Användarnamn"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Lösenord"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="login-btn" onClick={handleLogin}>Logga in</button>
                {error && <p className="login-error">{error}</p>}
            </div>
        </div>
    );
}

export default LoginPage;