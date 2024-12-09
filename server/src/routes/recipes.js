import express from "express";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js"; 
import cloudinary from "cloudinary";
import multer from "multer";


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const recipes = await RecipesModel.find();
    res.json(recipes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch recipes." });
  }
});


router.get("/savedRecipes/:userID", async (req, res) => {
  const { userID } = req.params;
  try {
    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    console.log(user.savedRecipes);
    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch saved recipes." });
  }
});

router.get("/:recipeID", async (req, res) => {
  const { recipeID } = req.params;

  try {
    
    const recipe = await RecipesModel.findById(recipeID);

    
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found." });
    }

    
    res.json(recipe);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch recipe." });
  }
});

router.put("/", async (req, res) => {
  const { recipeID, userID } = req.body;

  try {
    
    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    
    const isAlreadySaved = user.savedRecipes.includes(recipeID);

    if (isAlreadySaved) {
      
      user.savedRecipes = user.savedRecipes.filter((id) => id !== recipeID);
    } else {
      
      user.savedRecipes.push(recipeID);
    }

    await user.save();

    
    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save/unsave recipe." });
  }
});


router.post("/", upload.single("image"), async (req, res) => {
  const { name, ingredients, instructions, cookingTime, userOwner } = req.body;
  const { buffer, originalname, mimetype } = req.file;

  try {
   
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided." });
    }

   
    cloudinary.v2.uploader
      .upload_stream(
        {
          resource_type: "image",
          public_id: originalname, 
          folder: "recipes_images", 
        },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary error:", error);
            return res.status(500).json({ error: error.message });
          }

          const imageUrl = result.secure_url; 

          
          let parsedIngredients = [];
          try {
            parsedIngredients = JSON.parse(ingredients);
          } catch (err) {
            return res
              .status(400)
              .json({ error: "Invalid ingredients format." });
          }

          
          const recipe = new RecipesModel({
            name,
            ingredients: parsedIngredients, 
            instructions,
            imageUrl,
            cookingTime,
            userOwner,
          });

          const savedRecipe = await recipe.save();

          res.status(201).json({
            createdRecipe: {
              name: savedRecipe.name,
              imageUrl: savedRecipe.imageUrl,
              ingredients: savedRecipe.ingredients,
              instructions: savedRecipe.instructions,
              _id: savedRecipe._id,
            },
          });
        }
      )
      .end(buffer);
  } catch (err) {
    console.error("Error in recipe creation:", err);
    res.status(500).json({ error: err.message });
  }
});

export { router as recipesRouter };
