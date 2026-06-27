// import express from "express";
// import { RecipesModel } from "../models/Recipes.js";
// import { UserModel } from "../models/Users.js"; 
// import cloudinary from "cloudinary";
// import multer from "multer";
// import fs from "fs";
// import { Ollama } from "ollama";
// import { PDFParse } from "pdf-parse";
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const router = express.Router();


// const ollama = new Ollama({
//   host: "https://ollama.com",
//   headers: {
//     Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`
//   }
// });


// router.get("/generaterecipe", async (req, res) => {
//   try {
//     const group = req.query.group || "all";
//     const ingredient = req.query.ingredient || "";

//     const loc = "tamil";

//     const targetAudience =
//       group === "kids"
//         ? "Kids"
//         : group === "adult"
//         ? "Adults"
//         : group === "elderly"
//         ? "Elderly"
//         : group === "diabetic"
//         ? "Diabetic"
//         : "All age groups";


//     // Read PDF
//     const pdfBuffer = fs.readFileSync("src/reci.pdf");

//     console.log("PDF Loaded");

//     const parser = new PDFParse({
//       data: pdfBuffer,
//     });

//     const pdf = await parser.getText();

//     const text = pdf.text.substring(0, 3000);


//     console.log("========== PDF TEXT ==========");
//     console.log(text.substring(0, 500));
//     console.log("========== END PDF ==========");


//     const ingredientPrompt = ingredient
//       ? `Use "${ingredient}" as the primary ingredient whenever possible.`
//       : "";


//     const prompt = `
// You are an expert chef and nutritionist.

// Read the recipe document carefully.

// Create a one-week meal plan suitable for:

// ${targetAudience}

// ${ingredientPrompt}

// Requirements:

// - Give Breakfast, Lunch and Dinner for each day
// - Healthy balanced meals
// - Mention approximate calories
// - Follow daily calorie and nutrition requirements
// - Use recipes from the document whenever possible
// - Return ONLY valid JSON
// - Language must be ${loc}

// Format:

// [
//  {
//    "day":"",
//    "breakfast":{
//       "title":"",
//       "ingredients":[],
//       "instructions":"",
//       "calories":"",
//       "nutritionalinfo":[]
//    },
//    "lunch":{
//       "title":"",
//       "ingredients":[],
//       "instructions":"",
//       "calories":"",
//       "nutritionalinfo":[]
//    },
//    "dinner":{
//       "title":"",
//       "ingredients":[],
//       "instructions":"",
//       "calories":"",
//       "nutritionalinfo":[]
//    }
//  }
// ]

// Document:

// ${text}
// `;


//     console.log("Prompt Sent");


//     const result = await ollama.chat({
//       model: "gemma3:12b",
//       messages: [
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//     });


//     let output = result.message.content;


//     // remove markdown json wrapper if model returns it
//     output = output
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();


//     let jsonResponse;

//     try {
//       jsonResponse = JSON.parse(output);
//     } catch (e) {
//       console.log("Invalid JSON from Ollama");
//       jsonResponse = output;
//     }


//     console.log("========== OLLAMA RESPONSE ==========");
//     console.log(output);


//     return res.json(jsonResponse);


//   } catch (error) {

//     console.error(error);

//     return res.status(500).json({
//       error: "Recipe generation failed",
//       message: error.message
//     });

//   }
// });


// router.post("/", upload.single("image"), async (req, res) => {
//   const { name, ingredients, instructions, cookingTime, userOwner } = req.body;
//   const { buffer, originalname, mimetype } = req.file;

//   try {
   
//     if (!req.file) {
//       return res.status(400).json({ error: "No image file provided." });
//     }

   
//     cloudinary.v2.uploader
//       .upload_stream(
//         {
//           resource_type: "image",
//           public_id: originalname, 
//           folder: "recipes_images", 
//         },
//         async (error, result) => {
//           if (error) {
//             console.error("Cloudinary error:", error);
//             return res.status(500).json({ error: error.message });
//           }

//           const imageUrl = result.secure_url; 

          
//           let parsedIngredients = [];
//           try {
//             parsedIngredients = JSON.parse(ingredients);
//           } catch (err) {
//             return res
//               .status(400)
//               .json({ error: "Invalid ingredients format." });
//           }

          
//           const recipe = new RecipesModel({
//             name,
//             ingredients: parsedIngredients, 
//             instructions,
//             imageUrl,
//             cookingTime,
//             userOwner,
//           });

//           const savedRecipe = await recipe.save();

//           res.status(201).json({
//             createdRecipe: {
//               name: savedRecipe.name,
//               imageUrl: savedRecipe.imageUrl,
//               ingredients: savedRecipe.ingredients,
//               instructions: savedRecipe.instructions,
//               _id: savedRecipe._id,
//             },
//           });
//         }
//       )
//       .end(buffer);
//   } catch (err) {
//     console.error("Error in recipe creation:", err);
//     res.status(500).json({ error: err.message });
//   }
// });
// router.get("/api/recipes", async (req, res) => {
//   try {
//     const group = req.query.group || "all";
//     const ingredient = req.query.ingredient || "";
// const loc="tamil"
//     const targetAudience =
//       group === "kids"
//         ? "Kids"
//         : group === "adult"
//         ? "Adults"
//         : group === "elderly"
//         ? "Elderly"
//         : group === "diabetic"
//         ? "Diabetic"
//         : "All age groups";

//     // Read PDF

//     const pdfBuffer = fs.readFileSync("./reciipes.pdf");

//     console.log("PDF Loaded");

//     const parser = new PDFParse({
//       data: pdfBuffer,
//     });

//     const pdf = await parser.getText();

//     const text = pdf.text.substring(0, 3000);

//     console.log("========== PDF TEXT ==========");
//     console.log(text.substring(0, 500));
//     console.log("========== END PDF ==========");

//     // Dynamic Prompt

//     const ingredientPrompt = ingredient
//       ? `Use "${ingredient}" as the primary ingredient whenever possible.`
//       : "";

//     const prompt = `
// You are an expert chef and nutritionist.

// Read the recipe document carefully.

// Create a one-week meal plan suitable for:

// ${targetAudience}

// ${ingredientPrompt}

// Requirements:

// - Breakfast
// - Lunch
// - Dinner
// - Healthy and balanced meals
// - Approximate calories
// - Use recipes from the document whenever possible
// give meal plan for - Breakfast- Lunch- Dinner for each day
// Return ONLY valid JSON.
//  give recipes fullfilling daily calories requirements and nutritional requirements
// [
//   {
//     "title":"",
//     "category":"",
//     "ingredients":[],
//     "instructions":"",
//     "calories":""
//     "nutritionalinfo":[]
//   }
// ]
// // give  text content in  ${loc} language format

// Document:

// ${text}
// `;

//     console.log("Prompt Sent");

//     // Ollama Call

//     // const result = await ollama.chat({
//     //   model: "gemma2:2b",

//     //   messages: [
//     //     {
//     //       role: "user",
//     //       content: prompt,
//     //     },
//     //   ],
//     // });




// const result = await ollama.chat({
//   model: "gemma3:12b",
//   messages: [
//     {
//       role: "user",
//       content: prompt,
//     },
//   ],
// });



//     console.log("========== OLLAMA RESPONSE ==========");
//     console.log(result.message.content);

 
//     // HTML


    
//   } catch (error) {
//     console.error(error);

//     res.status(500).send(`
//       <h1>Server Error</h1>
//       <pre>${error.message}</pre>
//     `);
//   }
// });
// router.get("/", async (req, res) => {
//   try {
//     const recipes = await RecipesModel.find();
//     res.json(recipes);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Failed to fetch recipes." });
//   }
// });


// router.get("/savedRecipes/:userID", async (req, res) => {
//   const { userID } = req.params;
//   try {
//     const user = await UserModel.findById(userID);
//     if (!user) {
//       return res.status(404).json({ error: "User not found." });
//     }
//     console.log(user.savedRecipes);
//     res.json({ savedRecipes: user.savedRecipes });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Failed to fetch saved recipes." });
//   }
// });

// router.get("/:recipeID", async (req, res) => {
//   const { recipeID } = req.params;

//   try {
    
//     const recipe = await RecipesModel.findById(recipeID);

    
//     if (!recipe) {
//       return res.status(404).json({ error: "Recipe not found." });
//     }

    
//     res.json(recipe);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Failed to fetch recipe." });
//   }
// });

// router.put("/", async (req, res) => {
//   const { recipeID, userID } = req.body;

//   try {
    
//     const user = await UserModel.findById(userID);
//     if (!user) {
//       return res.status(404).json({ error: "User not found." });
//     }

    
//     const isAlreadySaved = user.savedRecipes.includes(recipeID);

//     if (isAlreadySaved) {
      
//       user.savedRecipes = user.savedRecipes.filter((id) => id !== recipeID);
//     } else {
      
//       user.savedRecipes.push(recipeID);
//     }

//     await user.save();

    
//     res.json({ savedRecipes: user.savedRecipes });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Failed to save/unsave recipe." });
//   }
// });


// router.post("/", upload.single("image"), async (req, res) => {
//   const { name, ingredients, instructions, cookingTime, userOwner } = req.body;
//   const { buffer, originalname, mimetype } = req.file;

//   try {
   
//     if (!req.file) {
//       return res.status(400).json({ error: "No image file provided." });
//     }

   
//     cloudinary.v2.uploader
//       .upload_stream(
//         {
//           resource_type: "image",
//           public_id: originalname, 
//           folder: "recipes_images", 
//         },
//         async (error, result) => {
//           if (error) {
//             console.error("Cloudinary error:", error);
//             return res.status(500).json({ error: error.message });
//           }

//           const imageUrl = result.secure_url; 

          
//           let parsedIngredients = [];
//           try {
//             parsedIngredients = JSON.parse(ingredients);
//           } catch (err) {
//             return res
//               .status(400)
//               .json({ error: "Invalid ingredients format." });
//           }

          
//           const recipe = new RecipesModel({
//             name,
//             ingredients: parsedIngredients, 
//             instructions,
//             imageUrl,
//             cookingTime,
//             userOwner,
//           });

//           const savedRecipe = await recipe.save();

//           res.status(201).json({
//             createdRecipe: {
//               name: savedRecipe.name,
//               imageUrl: savedRecipe.imageUrl,
//               ingredients: savedRecipe.ingredients,
//               instructions: savedRecipe.instructions,
//               _id: savedRecipe._id,
//             },
//           });
//         }
//       )
//       .end(buffer);
//   } catch (err) {
//     console.error("Error in recipe creation:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// export { router as recipesRouter };









import React, { useState } from "react";
import axios from "axios";

const Recipeplanner = () => {
  const [ingredient, setIngredient] = useState("");
  const [group, setGroup] = useState("all");
  const [cuisine, setCuisine] = useState("balanced");

  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  const handlerecipegenerate = async () => {
    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      const response = await axios.get(
        "https://recipe-wnrc.onrender.com/recipes/generaterecipe",
        {
          params: {
            ingredient,
            group,
            cuisine,
          },
        }
      );

      console.log("API Response:", response.data);

      let data = response.data;

      // Convert JSON string into object
      if (typeof data === "string") {
        try {
          data = data
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

          data = JSON.parse(data);
        } catch (err) {
          console.log("JSON Parse Error", err);
        }
      }

      if (Array.isArray(data)) {
        setRecipes(data);
      } else if (Array.isArray(data.recipes)) {
        setRecipes(data.recipes);
      } else if (Array.isArray(data.data)) {
        setRecipes(data.data);
      } else if (data.recipe) {
        setRecipes([data.recipe]);
      } else {
        console.log("Unknown response:", data);
        setError("No recipes found.");
      }
    } catch (err) {
      console.log(err);

      if (err.response) {
        console.log(err.response.data);
        setError(err.response.data.message || "Server Error");
      } else {
        setError("Unable to connect to server.");
      }
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>🍽 Weekly Recipe Planner</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Ingredient"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
          }}
        />

        <select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        >
          <option value="all">All</option>
          <option value="kids">Kids</option>
          <option value="adult">Adults</option>
          <option value="elderly">Elderly</option>
          <option value="diabetic">Diabetic</option>
          <option value="budgetfriendly">Budget Friendly</option>
        </select>

        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        >
          <option value="balanced">Balanced</option>
          <option value="northindian">North Indian</option>
          <option value="southindian">South Indian</option>
          <option value="italian">Italian</option>
          <option value="chinese">Chinese</option>
          <option value="mexican">Mexican</option>
        </select>

        <button
          onClick={handlerecipegenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Recipes"}
        </button>
      </div>

      {error && (
        <div style={{ color: "red", marginBottom: "20px" }}>
          {error}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "20px",
        }}
      >
        {recipes.map((recipe, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,.15)",
            }}
          >
            <h2>
              {recipe.title ||
                recipe.recipeTitle ||
                recipe.name ||
                "Recipe"}
            </h2>

            <p>
              <b>Category:</b>{" "}
              {recipe.category ||
                recipe.mealType ||
                "General"}
            </p>

            <p>
              <b>Calories:</b>{" "}
              {recipe.calories ||
                recipe.energy ||
                "N/A"}
            </p>

            <h3>Ingredients</h3>

            {Array.isArray(recipe.ingredients) ? (
              <ul>
                {recipe.ingredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <pre style={{ whiteSpace: "pre-wrap" }}>
                {recipe.ingredients ||
                  recipe.recipeIngredients ||
                  "No ingredients"}
              </pre>
            )}

            <h3>Instructions</h3>

            <pre style={{ whiteSpace: "pre-wrap" }}>
              {recipe.instructions ||
                recipe.recipeInstructions ||
                "No instructions"}
            </pre>

            <h3>Nutrition</h3>

            {Array.isArray(recipe.nutritionalinfo) ? (
              <ul>
                {recipe.nutritionalinfo.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <pre style={{ whiteSpace: "pre-wrap" }}>
                {recipe.nutritionalinfo ||
                  recipe.nutrition ||
                  "No nutrition information"}
              </pre>
            )}

            {recipe.estimatedCost && (
              <p>
                <b>Estimated Cost:</b> {recipe.estimatedCost}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipeplanner;






