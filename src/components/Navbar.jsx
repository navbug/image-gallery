import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase/config";
import { useAuth } from "../context/auth";

const Navbar = () => {
  const {user} = useAuth();
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(user);

  return (
    <div className="navbar bg-base-100 justify-between">
      {/* bold case text classname? */}
      <a className="font-bold text-xl">Image 📷 Gallery</a>
      <div className="text-md">
        <span className="font-bold cursor-pointer">User: </span> <span className="italic underline"> {user.email}</span>
        <button
          className="btn btn-ghost normal-case p-2 text-lg ml-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
