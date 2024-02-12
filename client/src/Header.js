import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(process.env.React_App_Host_Api + "/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch(process.env.React_App_Host_Api + "/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo("");
  }

  const username = userInfo.username;

  return (
    <header>
      <Link to="/" className="logo">
        The Insightful Blog{" "}
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create" className="bold-link">
              ➕ Create{" "}
            </Link>
            <a onClick={logout} className="bold-link">
              Logout ({username})
            </a>
          </>
        )}

        {!username && (
          <>
            <Link to="/login" className="auth-link">
              Login
            </Link>
            <Link to="/register" className="auth-link">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
