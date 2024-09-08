import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/frontend_assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const url = "http://localhost:4000";

  const promocodes = {
    SAVE10: 10, // 10% discount
    SAVE20: 20, // 10% discount
    SAVE30: 30, // 10% discount
  };

  // Load cart items and discount from localStorage
  useEffect(() => {
    const savedDiscount = localStorage.getItem("discount");
    const savedPromoCode = localStorage.getItem("promoCode");

    if (savedDiscount) {
      setDiscount(Number(savedDiscount));
    }
    if (savedPromoCode) {
      setPromoCode(savedPromoCode);
    }
  }, []);

  // // Save discount and promoCode to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("discount", discount.toString());
    localStorage.setItem("promoCode", promoCode);
  }, [discount, promoCode]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const deleteFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      delete updatedCart[itemId];
      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // function to apply the promocode
  const applyPromoCode = (code) => {
    const discountPercentage = promocodes[code];
    console.log("discountPercentage", discountPercentage);

    if (discountPercentage) {
      setPromoCode(code);
      setDiscount(discountPercentage);
      localStorage.setItem("discount", discount);
      return true; // Promo code is valid
    } else {
      setPromoCode("");
      setDiscount(0);
      return false; // Promo code is invalid
    }
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      // console.log(response.data);

      setFoodList(response.data.data);
    } catch (error) {
      console.log("Error fetching food list:", error);
    }
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      `${url}/api/cart/get`,
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      try {
        await fetchFoodList();
        if (localStorage.getItem("token")) {
          setToken(localStorage.getItem("token"));
          await loadCartData(localStorage.getItem("token"));
        }
      } catch (error) {
        console.log("Error loading data:", error);
      }
    }
    loadData();
  }, []);

  const contextValues = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    applyPromoCode,
    discount,
    setDiscount,
    promoCode,
    setPromoCode,
    promocodes,
  };
  return (
    <StoreContext.Provider value={contextValues}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
