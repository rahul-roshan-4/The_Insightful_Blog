import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();
    const response = await fetch(process.env.React_App_Host_Api + "/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("wrong credentials");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form className="SignIn" onSubmit={login}>
      <h1>Login</h1>
      <div className="input-group">
        <input
          id="login-username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          id="login-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
      </div>
      <button type="submit">Sign in</button>
    </form>
  );
}
