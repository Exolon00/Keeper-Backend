import { useRef, useState } from "react";

export function UserSignupSignin() {
  const [msg, setMsg] = useState("");

  const usernameRef = useRef();
  const passwordRef = useRef();

  async function signupClicked() {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    const res = await fetch("https://keeper-backend-eefl.onrender.com/user/signup", options);
    const data = await res.json();
    console.log(data);
    setMsg((pmsg) => data.msg);
  }

  async function signinClicked() {
    const password = passwordRef.current.value;
    const username = usernameRef.current.value;
    const options = {
      method: "POST",
      headers: {
        username: username,
        password: password,
        "content-type": "application/json",
      },
    };

    const res = await fetch("https://keeper-backend-eefl.onrender.com/user/signin", options);
    const data = await res.json();
    setMsg((pmsg) => data.msg);
    if (data.token) {
      localStorage.setItem("jwt", data.token);
      window.location.reload();
    }
  }

  return (
    <div className="first-page">
      <div className="container">
        <input placeholder="Email" ref={usernameRef}></input>
        <br />
        <input placeholder="Password(min:5)" ref={passwordRef}></input>
        <br />
        <div className="button-container">
          <button onClick={signupClicked}>Signup</button>
          <button onClick={signinClicked}>Signin</button>
        </div>
        <p>{msg}</p>
      </div>
    </div>
  );
}
