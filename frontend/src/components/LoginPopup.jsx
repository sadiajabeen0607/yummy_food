import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import InputField from "./InputField";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { IoEye , IoEyeOff  } from "react-icons/io5";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };
  // console.log("data", data);

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;

    if (currState === "Login") {
      newUrl += "/api/auth/login";
    } else {
      newUrl += "/api/auth/register";
    }

    const response = await axios.post(newUrl, data);
    console.log(response.data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      setShowLogin(false);
      toast.success("Successfully");
    } else {
      toast.error("Fail");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    // Disable scrolling when popup is open
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when popup is closed
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center z-10 bg-gray-800 bg-opacity-50">
      <form
        onSubmit={onLogin}
        className="w-[max(23vw,_330px)] place-self-center text-gray-600 bg-white flex flex-col gap-6 py-6 px-7 rounded-lg text-sm animate-fadeIn"
      >
        <div className="flex justify-between items-center text-black">
          <h2 className="text-xl font-medium">{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="cross_icon"
            className="w-4 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-5">
          {currState === "Sign Up" ? (
            <InputField
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Your name"
              className="mb-0"
            />
          ) : null}
          <InputField
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder="Your Email"
            className="mb-0"
          />
          <div className="relative">
            <InputField

              type={isPasswordVisible ? "text": "password"}
              name="password"
              value={data.password}
              onChange={onChangeHandler}
              placeholder="Password"
              className="mb-0"
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <IoEye size={20} />
              ) : (
                <IoEyeOff size={20} />
              )}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="border-none p-2.5 rounded-md text-white bg-orange-600 hover:bg-orange-500 transition duration-300 text-[15px]"
        >
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="flex items-start gap-2 -mt-[15px]">
          <input type="checkbox" required className="mt-[5px]" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              className="text-orange-500 font-medium cursor-pointer hover:underline"
              onClick={() => setCurrState("Sign Up")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              className="text-orange-500 font-medium cursor-pointer hover:underline"
              onClick={() => setCurrState("Login")}
            >
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
