import foodModel from "../models/foodModel.js";
import fs from 'fs';
import path from 'path';


// Add Food Item
const addFood = async(req, res) => {
    const image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        image : image_filename
    });

    try {
        await food.save();
        res.json({
            success: true,
            message: "Food Added Successfully"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

// All Food Items
const listFood = async(req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({
            success: true,
            data: foods 
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

// Remove Food Item
const removeFood = async(req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {});

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: "Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

// Update Food Item
const updateFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.json({
                success: false,
                message: "Food item not found"
            });
        }

        // Update the fields with new data
        food.name = req.body.name || food.name;
        food.description = req.body.description || food.description;
        food.price = req.body.price || food.price;
        food.category = req.body.category || food.category;

        // If a new image is uploaded, update it
        if (req.file) {
            const oldImagePath = path.join('uploads', food.image);

            // Remove the old image
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error(`Error deleting old image: ${err.message}`);
                    // Handle the error if necessary
                }
            });

            // Set the new image filename
            food.image = `${req.file.filename}`;
        }

        // Save the updated food item
        await food.save();

        res.json({
            success: true,
            message: "Food updated successfully"
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: "Error updating food item"
        });
    }
}

export {addFood, listFood, removeFood, updateFood}