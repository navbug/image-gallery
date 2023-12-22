import React, { useState } from "react";
import { auth } from "../firebase/config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../context/auth";
import Alert from "../components/Alert"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignInWithGoogle = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleAuthProvider)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((error) => {
        console.log(`Error: ${error.code} ${error.message}`);
        setError(error.message);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      console.log(user);
      const res = await createUserWithEmailAndPassword(auth, email, password);

      console.log(res);
      navigate("/");
    } catch (error) {

      if(error.code === "auth/email-already-in-use") {
        const res = await signInWithEmailAndPassword(auth, email, password);

        console.log(res);
        navigate("/");
      } else {
        console.log(`Error: ${error.code} ${error.message}`);
        setError(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert message={error} />}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Image 📷 Gallery</h1>
            <p className="py-6">
              Login / Signup to share images with people around the world.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login / Sign Up</button>
              </div>
              <div className="divider">OR</div>
              <div className="form-control">
                <div
                  className="btn btn-primary"
                  onClick={handleSignInWithGoogle}
                >
                  <FaGoogle /> Sign in with Google
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;
