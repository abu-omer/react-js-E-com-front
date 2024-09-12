import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../../redux/UserSlice";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  //   useEffect(() => {
  //     setErrMsg("");
  //   }, [username, password]);

  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let userCredintial = { username, password };
    dispatch(loginUser(userCredintial)).then((result) => {
      if (result.payload) {
        setUsername("");
        setPassword("");
        navigate(from, { replace: true });
      }
    });
  };
  return (
    <div className="login">
      <section className="login-container">
        <p
          ref={errRef}
          // className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {error}
        </p>
        <h2>Sign In</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button className="login-button">
            {loading ? "loading..." : "login"}
          </button>
        </form>
        <p>
          Need an Account?
          <br />
          <span className="line">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Login;
