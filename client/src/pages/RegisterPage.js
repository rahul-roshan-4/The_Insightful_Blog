import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch(process.env.React_App_Host_Api + "/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("registration successful!\nYou will be redirected to login page.");
      setRedirect(true);
    } else {
      alert("registration failed");
    }
  }
  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <form className="SignIn" onSubmit={register}>
      <h1>Create Username and Password</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
      </div>
      <button type="submit">Sign up</button>
    </form>
  );
}
