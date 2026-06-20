import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { clearTokens, getAccessToken } from "../utils/auth.js";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";

function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const isLoggedIn = !!getAccessToken();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartCount = useMemo(() => {
    return cartItems.reduce((t, i) => t + i.quantity, 0);
  }, [cartItems]);

  const handleLogout = () => {
    clearTokens();
    navigate("/login");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/products?search=${query}`);
      setMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-yellow-500/20
      ${scrolled ? "bg-black/40 backdrop-blur-xl shadow-xl" : "bg-gradient-to-r from-zinc-950 via-slate-900 to-black"}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent"
        >
          SnehaCart
        </Link>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-8">
          <Link className="text-slate-300 hover:text-yellow-400 transition-all" to="/">
            Home
          </Link>
          <Link className="text-slate-300 hover:text-yellow-400 transition-all" to="/products">
            Products
          </Link>
        </div>

        {/* SEARCH */}
        <div className="hidden md:flex items-center gap-2 bg-white/5 border border-yellow-500/20 rounded-full px-4 py-2 w-80">
          <FaSearch className="text-yellow-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search products..."
            className="bg-transparent outline-none text-white w-full placeholder-slate-500"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">

          {/* CART */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 text-slate-300 hover:text-yellow-400 transition-all"
          >
            <FaShoppingCart size={20} />
            <span className="hidden sm:block">Cart</span>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-lg shadow-yellow-500/30">
                {cartCount}
              </span>
            )}
          </Link>

          {/* AUTH */}
          {!isLoggedIn ? (
            <>
              <Link className="hidden sm:block text-slate-300 hover:text-yellow-400 transition-all" to="/login">
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-full font-semibold hover:scale-105 transition-all"
              >
                Sign Up
              </Link>
            </>
            
          ) : (
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full hover:scale-105 transition-all"
            >
              Logout
            </button>
          )}

          {/* MOBILE */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-yellow-400 text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-yellow-500/20 px-6 py-4 space-y-4">
          <Link to="/" className="block text-white">Home</Link>
          <Link to="/products" className="block text-white">Products</Link>
          <Link to="/cart" className="block text-white">Cart</Link>

          {!isLoggedIn ? (
            <Link to="/login" className="block text-white">Login</Link>
          ) : (
            <button onClick={handleLogout} className="text-red-400">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;