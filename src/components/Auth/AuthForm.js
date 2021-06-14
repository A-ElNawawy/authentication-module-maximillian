import { useState, useRef, useContext } from "react";

import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const baseURL = "https://identitytoolkit.googleapis.com/v1/accounts:";
const key = "?key=AIzaSyCK85PNPrhoY-xClQPvegbjAwert_pO5v4";

const AuthForm = () => {
  const ctx = useContext(AuthContext);
  console.log(ctx.token);
  const [isLogin, setIsLogin] = useState(true);
  const [IsLoading, setIsLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    setIsLoading(true);

    let url;

    if (isLogin) {
      url = baseURL + "signInWithPassword" + key;
    } else {
      url = baseURL + "signUp" + key;
    }
    console.log(url);

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);

        if (res.ok) {
        } else {
          return res.json().then((data) => {
            let errorMessage = data?.error?.message || "Authentication Failed";
            throw new Error(errorMessage);
          });
        }
        return res;
      })
      .then((res) => {
        res.json().then((data) => {
          //console.log(data.idToken);
          ctx.logIn(data.idToken);
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button disabled={IsLoading}>
            {isLogin ? "Login" : "Create Account"}
          </button>
          {IsLoading && <p className={classes.loading}>Loading...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
