import { useState, useEffect } from "react";
import logIn, { logOut, getSession } from "../supabase/adminLogin";
import { useNavigate } from "react-router-dom";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigate = useNavigate();

  const checkSession = async () => {
    const loggedIn = await getSession();
    setIsLoggedIn(loggedIn);
  };

  useEffect(() => {
    checkSession();
  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogout = async () => {
    await logOut();
    checkSession();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    logIn(email, password);
    setEmail("");
    setPassword("");
    checkSession();
    navigate("/");
  };

  const inputStyle = "border border-b border-gray-300";

  return (
    <>
      {!isLoggedIn && (
        <form
          className="w-screen h-screen flex flex-col items-center justify-center gap-4"
          onSubmit={submitHandler}
        >
          <label>Email</label>
          <input
            type="email"
            name="email" // Add name attribute
            value={email}
            placeholder="Enter your email"
            onChange={inputHandler}
            className={inputStyle}
          />
          <label>Password</label>
          <input
            type="password"
            name="password" // Add name attribute
            value={password}
            onChange={inputHandler}
            className={inputStyle}
          />
          <button
            onClick={submitHandler}
            className="bg-slate-300 border border-black px-4 py-2 rounded-lg"
          >
            Log In
          </button>
        </form>
      )}

      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="bg-slate-300 border border-black px-4 py-2 rounded-lg"
        >
          LogOut
        </button>
      )}
    </>
  );
};

export default LogInForm;
