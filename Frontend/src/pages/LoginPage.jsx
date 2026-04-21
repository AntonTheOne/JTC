import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PagesCss/LoginPage.css";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleLogin() {
        setError("");

        const response = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            navigate("/admin");
        } else {
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