import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase.js";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const navLinks = [
    { to: "/", label: "Dashboard" },
    { to: "/tasks", label: "Tasks" },
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const avatar = user?.photoURL || "https://ui-avatars.com/api/?name=" + (user?.displayName || "U") + "&background=aff901&color=000";

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <header className="container bg-[#eaf4f4] drop-shadow-md rounded-full py-4 px-4 sm:py-5 sm:px-8 flex flex-col sm:flex-row items-center sm:justify-between mt-4 sm:mt-6 relative z-50">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <span className="text-2xl sm:text-3xl font-extrabold text-black tracking-wide" style={{ fontFamily: 'agbalumo' }}>
          Task <span className="text-[#aff901]">Tracker</span>
        </span>
        {!menuOpen && (
          <button className="sm:hidden ml-2 p-2 z-50" onClick={() => setMenuOpen(true)}>
            <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        )}
      </div>
      {/* Desktop Nav */}
      <nav className="hidden sm:flex items-center space-x-6 mt-0 w-auto">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-black font-semibold hover:text-[#aff901] transition-colors ${location.pathname === link.to ? 'text-[#aff901]' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        {user ? (
          <div className="flex items-center gap-3 ml-4">
            <img src={avatar} alt="profile" className="w-9 h-9 rounded-full border-2 border-[#aff901] object-cover" />
            <span className="text-black font-semibold max-w-[120px] truncate">{user.displayName || user.email}</span>
            <button
              onClick={handleLogout}
              className="rounded-full bg-black text-[#aff901] px-4 py-2 font-semibold ml-2 hover:bg-[#aff901] hover:text-black border border-[#aff901] transition-colors"
            >
              Log Out
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="rounded-full bg-[#aff901] text-black px-5 py-2 font-semibold hover:opacity-90 transition-opacity ml-4"
          >
            Login
          </Link>
        )}
      </nav>
      {/* Mobile Drawer Nav & Overlay */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 backdrop-blur-md z-40" onClick={() => setMenuOpen(false)} />
          <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
            <div className="flex justify-end p-4">
              <button onClick={() => setMenuOpen(false)} className="text-black p-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#aff901] active:bg-gray-100 transition w-14 h-14 flex items-center justify-center">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <nav className="flex flex-col items-center justify-start bg-[#eaf4f4] flex-1 py-10 rounded-xl gap-8 w-full shadow-xl">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-black text-2xl font-semibold hover:text-[#aff901] transition-colors ${location.pathname === link.to ? 'text-[#aff901]' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <div className="flex flex-col items-center gap-2 mt-8">
                  <img src={avatar} alt="profile" className="w-16 h-16 rounded-full border-2 border-[#aff901] object-cover" />
                  <span className="text-black font-semibold max-w-[120px] truncate">{user.displayName || user.email}</span>
                  <button
                    onClick={() => { setMenuOpen(false); handleLogout(); }}
                    className="rounded-full bg-black text-[#aff901] px-6 py-2 font-semibold mt-2 hover:bg-[#aff901] hover:text-black border border-[#aff901] transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="rounded-full bg-[#aff901] text-black px-8 py-3 font-semibold text-xl hover:opacity-90 transition-opacity mt-8"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
