import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

function Login() {
   const [error, setError] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const navigate = useNavigate();

   const { dispatch } = useContext(AuthContext);

   const handleLogin = (e) => {
      e.preventDefault();

      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            const user = userCredential.user;
            dispatch({ type: "LOGIN", payload: user });
            navigate("/");
         })
         .catch((error) => {
            setError(true);
         });
   };

   const handleLoginWithGoogle = () => {
      signInWithPopup(auth, provider)
         .then((result) => {
            const user = result.user;
            dispatch({ type: "LOGIN", payload: user });
            navigate("/");
         })
         .catch((error) => {
            console.log(error);
         });
   };

   return (
      <div className="login">
         <form onSubmit={handleLogin}>
            <input
               type="email"
               placeholder="Email"
               onChange={(e) => setEmail(e.target.value)}
            />
            <input
               type="password"
               placeholder="Password"
               onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            {error && <span>Wrong email or password!</span>}
         </form>
         <div onClick={handleLoginWithGoogle}>
            <div className="google-btn">
               <div className="google-icon-wrapper">
                  <img
                     className="google-icon"
                     src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  />
               </div>
               <p className="btn-text">
                  <b>Sign in with google</b>
               </p>
            </div>
         </div>
      </div>
   );
}

export default Login;
