import { useState, useEffect, useContext } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [activeMenu, setActiveMenu] = useState("home");
  const location = useLocation();
  const {getTotalCartAmount, token, setToken, setDiscount, setPromoCode} = useContext(StoreContext);
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setActiveMenu(menu.name);
  };

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const menuItems = [
    { name: "home", link: "/" },
    { name: "menu", link: "#explore-menu" },
    { name: "mobile-app", link: "#app-download" },
    { name: "contact us", link: "#footer" },
  ];

  const logout = async() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("discount");
    localStorage.removeItem("promoCode");
    setToken("");
    setDiscount(0);
    setPromoCode("");
    navigate("/");
  }

  return (
    <div className="sticky top-0 z-50 py-5 px-0 flex items-center justify-between bg-white">
      <Link to="/">
        <img src={assets.logo} alt="Tomato." className="w-36 md:w-28" />
      </Link>
      <ul className="sm:hidden flex md:gap-4 gap-5 text-gray-600 text-lg">
        {menuItems.map((menu) => (
          <Link
            to={menu.link}
            key={menu.name}
            className={`cursor-pointer ${
              activeMenu === menu.name
                ? "pb-0.5 border-b-2 border-gray-600"
                : ""
            }`}
            onClick={() => handleMenuClick(menu)}
          >
            {menu.name}
          </Link>
        ))}
      </ul>
      <div className="flex items-center md:gap-4 gap-10">
        <img src={assets.search_icon} alt="search_icon" className="md:w-5" />
        <div className="relative">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket" className="md:w-5" />
              <div className={`${getTotalCartAmount() === 0 ? "" : "absolute min-w-2.5 min-h-2.5 bg-orange-600 rounded-full -top-2 -right-2"}`}></div>
            
          </Link>
        </div>

        {!token ? (<button
          onClick={() => setShowLogin(true)}
          className="bg-transparent text-gray-600 border border-orange-500 rounded-full text-base md:py-1 md:px-4 py-2 px-6 cursor-pointer hover:bg-orange-50 transition duration-300 ease-in-out"
        >
          sign in
        </button>) : (
          <div className="relative group cursor-pointer">
            <img src={assets.profile_icon} alt="profile_icon" className="w-5" />
            <ul className="absolute hidden right-0 z-[1] group-hover:flex flex-col gap-2.5 bg-orange-50 py-3 px-6 rounded-md border border-orange-500 outline-2 outline-white">
              <li onClick={() => navigate("/myorders")} className="flex items-center gap-2.5 cursor-pointer pr-6 hover:text-orange-500">
                <img src={assets.bag_icon} alt="bag_icon" className="w-5" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout} className="flex items-center gap-2.5 cursor-pointer pr-6 hover:text-orange-500">
                <img src={assets.logout_icon} alt="logout_icon" className="w-5" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Navbar;
