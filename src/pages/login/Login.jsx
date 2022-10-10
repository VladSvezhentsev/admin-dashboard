import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
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

   return (
      <div className="login">
         <form onSubmit={handleLogin}>
            <input
               type="email"
               placeholder="admin@fire.com"
               onChange={(e) => setEmail(e.target.value)}
            />
            <input
               type="password"
               placeholder="123456"
               onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            {error && <span>Wrong email or password!</span>}
         </form>
      </div>
   );
}

export default Login;
