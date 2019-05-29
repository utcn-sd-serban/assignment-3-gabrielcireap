import React from "react";

const Login = ({ username, password, email, onChange, onLogin, onRegister }) => (
    <div className="container is-fluid">

        <div className="column is-one-quarter">
            <label className="label">Username</label>
            <div className="control has-icons-left has-icons-right">
                <input data-cy="username" className="input is-success" type="text" placeholder="Text input" value={username} onChange={e => onChange("username", e.target.value)} />
                <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                    </span>
                <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                    </span>
            </div>
        </div>

        <div className="column is-one-quarter">
            <label className="label">Password</label>
            <p className="control has-icons-left">
                <input data-cy="password" className="input is-success" type="password" placeholder="Password" value={password} onChange={e => onChange("password", e.target.value)}/>
                <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                </span>
            </p>
        </div>

        <div className="column is-one-quarter">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
                <input data-cy="email" className="input is-success" type="text" placeholder="Text input" value={email} onChange={e => onChange("email", e.target.value)} />
                <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                </span>
                <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                </span>
            </div>
        </div>
        <br />

        <button data-cy="loginButton" className="button" onClick={onLogin}> Login </button>
        <button data-cy="registerButton" className="button" onClick={onRegister}> Register </button>
    </div>
);

export default Login;