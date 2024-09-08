import authModel from '../models/authModel.js'

// Add Items to user cart
const addToCart = async(req, res) => {
    try {
        let userData = await authModel.findById(req.body.userId);
        // console.log(userData);
        
        let cartData = await userData.cartData;
        // console.log(cartData);
        

        if(!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await authModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({
            success: true,
            message: "Added To Cart"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })  
    }
};

// Remove Items from user cart
const removeFromCart = async(req, res) => {
    try {
        let userData = await authModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if(cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await authModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({
            success: true,
            message: "Removed From Cart"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        }); 
    }
};

// Fetch user cart data
const fetchCart = async(req, res) => {
    try {
        let userData = await authModel.findById(req.body.userId);
        // console.log("userData", userData);
        
        let cartData = await userData.cartData;
        // console.log("cartData", cartData);
        
        res.json({
            success: true,
            cartData
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
};

export {addToCart, removeFromCart, fetchCart}