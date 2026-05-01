import { useState } from "react";
import { auth } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
        alert("Login Successful");
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
        alert("Signup Successful");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>{isLogin ? "Login" : "Signup"}</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>

      <br />

     <button onClick={() => setIsLogin(!isLogin)}>
       Switch to {isLogin ? "Signup" : "Login"}
    </button>
    </div>
  );
}

export default Auth;