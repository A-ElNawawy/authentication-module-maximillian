import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";

import classes from "./ProfileForm.module.css";

const baseURL = "https://identitytoolkit.googleapis.com/v1/accounts:";
const key = "?key=AIzaSyCK85PNPrhoY-xClQPvegbjAwert_pO5v4";

const ProfileForm = () => {
  const enteredPasswordRef = useRef();

  const authCtx = useContext(AuthContext);

  const url = baseURL + "update" + key;

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPassword = enteredPasswordRef.current.value;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      alert("Password Changed Successfully");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={enteredPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
