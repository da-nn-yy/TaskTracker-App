import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../firebase.js";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
const Header = () => {

  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  }
  return (
    <div className="bg-white drop-shadow-md rounded-full py-6 px-6 flex items-center justify-between mt-4 mx-4">
      <div className="flex items-center space-x-3">
        <h1 className="text-3xl font-extrabold text-black tracking-wide drop-shadow-lg font-[Agbalumo]">Task Tracker</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Link to={"/"}>Home</Link>
        {!user ?
        <Link to="/login" className="rounded-full bg-[#aff901] text-black active:opacity-40 transition-opacity duration-110 px-4 py-2 font-semibold">Login</Link>:
        <Link to="/addtask" className="rounded-full bg-[#aff901] text-black hover:text-black hover:bg-[#aff901] font-semibold">Add Task</Link>}
      </div>
      <div className="flex items-center space-x-4">
        {user && (
          <>
            <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full" />
            <span className="text-black font-semibold">{user.displayName}</span>
            <button onClick={signUserOut} className="rounded-full bg-black text-[#aff901] active:opacity-40 transition-opacity duration-110 px-4 py-2">Sign Out</button>
          </>
        )}</div>
    </div>
  );
};

export default Header;
