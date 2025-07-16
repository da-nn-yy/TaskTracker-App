import React from "react";
import { useAuthState } from "/react-firebase-hooks/auth";
import {auth} from "../firebase.js";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
const Header = () => {

  const [user] = useAuthState();

  const signUserOut = async () => {
    await auth.signOut();
  }
  return (
    <header className="bg-white drop-shadow-md rounded-full py-6 px-6 flex items-center justify-between mt-4 mx-4">
      <div className="flex items-center space-x-3">
        <h1 className="text-3xl font-extrabold text-black tracking-wide drop-shadow-lg font-[Agbalumo]">Task Tracker</h1>
      </div>
      <div className="flex items-center space-x-4">
        {!user ?
        <Link to="/login" className="rounded-full bg-[#aff901] text-black hover:text-black hover:bg-[#aff901]   font-semibold">Login</Link>:
        <Link to="/addtask" className="rounded-full bg-[#aff901] text-black hover:text-black hover:bg-[#aff901] font-semibold">Add Task</Link>
      </div>
    </header>
  );
};

export default Header;
