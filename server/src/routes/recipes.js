import express from "express";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js"; 
import cloudinary from "cloudinary";
import multer from "multer";
import fs from "fs";
import { Ollama } from "ollama";
import { PDFParse } from "pdf-parse";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();




const ollama = new Ollama({
  host: "https://ollama.com",
  headers: {
    Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`
  }
});


router.get("/generaterecipe", async (req, res) => {
  try {
    const group = req.query.group || "all";
    const ingredient = req.query.ingredient || "";

    const loc = "tamil";

    const targetAudience =
      group === "kids"
        ? "Kids"
        : group === "adult"
        ? "Adults"
        : group === "elderly"
        ? "Elderly"
        : group === "diabetic"
        ? "Diabetic"
        : "All age groups";


    // Read PDF
    const pdfBuffer = fs.readFileSync("src/reci.pdf");

    console.log("PDF Loaded");

    const parser = new PDFParse({
      data: pdfBuffer,
    });

    const pdf = await parser.getText();

    const text = pdf.text.substring(0, 3000);


    console.log("========== PDF TEXT ==========");
    console.log(text.substring(0, 500));
    console.log("========== END PDF ==========");


    const ingredientPrompt = ingredient
      ? `Use "${ingredient}" as the primary ingredient whenever possible.`
      : "";


    const prompt = `
You are an expert chef and nutritionist.

Read the recipe document carefully.

Create a one-week meal plan suitable for:

${targetAudience}

${ingredientPrompt}

Requirements:
 give recipes based on ${loc} cusine

 give instructions in above format
**Instructions:**

**1. Sauté the onions and garlic:**
   - Heat the olive oil in a large saucepan over medium heat.
   - Add the chopped onion and cook until softened, about 5 minutes.
   - Stir in the minced garlic and cook for another minute until fragrant.

**2. Build the base of your soup:**
   - Pour in the diced tomatoes and vegetable broth. Bring to a boil, then reduce heat and simmer for 10 minutes.

**3. Add the spinach:**
   - Stir in the chopped spinach leaves. Cook until wilted, about 2 minutes.

**4. Season and add cream:**
    - Season with oregano, red pepper flakes (optional), salt, and black pepper to taste.
    - Slowly whisk in the heavy cream or half-and-half until well combined.

**5. Blend for smoothness (Optional):**
   - If desired, use an immersion blender to blend the soup for a smoother texture. Or you can transfer the soup
in batches to a regular blender and blend until smooth.

**6. Serve:**
   - Ladle the soup into bowls.
   - Garnish with your favorite toppings like toasted croutons, Parmesan cheese, or lemon wedges, if desired.


- Give Breakfast, Lunch and Dinner for each day
- Healthy balanced meals
- Mention approximate calories
- Follow daily calorie and nutrition requirements
- Use recipes from the document whenever possible
if recipes not available in document create recipes
give instructions in brief step by step 
- Return ONLY valid JSON
- Language must be ${loc}




Format:

[
 {
   "day":"",
   "breakfast":{
      "title":"",
      "ingredients":[],
      "instructions":"",
      "calories":"",
      "nutritionalinfo":[]
   },
   "lunch":{
      "title":"",
      "ingredients":[],
      "instructions":"",
      "calories":"",
      "nutritionalinfo":[]
   },
   "dinner":{
      "title":"",
      "ingredients":[],
      "instructions":"",
      "calories":"",
      "nutritionalinfo":[]
   }
 }
]

Document:

${text}
`;


    console.log("Prompt Sent");


    const result = await ollama.chat({
      model: "gemma3:12b",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });


    let output = result.message.content;


    // remove markdown json wrapper if model returns it
    output = output
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();


    let jsonResponse;

    try {
      jsonResponse = JSON.parse(output);
    } catch (e) {
      console.log("Invalid JSON from Ollama");
      jsonResponse = output;
    }


    console.log("========== OLLAMA RESPONSE ==========");
    console.log(output);


    return res.json(jsonResponse);


  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Recipe generation failed",
      message: error.message
    });

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
router.get("/api/recipes", async (req, res) => {
  try {
    const group = req.query.group || "all";
    const ingredient = req.query.ingredient || "";
const loc="tamil"
    const targetAudience =
      group === "kids"
        ? "Kids"
        : group === "adult"
        ? "Adults"
        : group === "elderly"
        ? "Elderly"
        : group === "diabetic"
        ? "Diabetic"
        : "All age groups";

    // Read PDF

    const pdfBuffer = fs.readFileSync("./reciipes.pdf,brief_note.pdf");

const briefNoteBuffer = fs.readFileSync("./brief_note.pdf");
    console.log("PDF Loaded");

    const parser = new PDFParse({
      data: pdfBuffer
    });
    const parser1 = new PDFParse({
      data: briefNoteBuffer
    });

    const pdf = await parser.getText();
const pdf1 =await parser1.getText();
    const text = pdf.text.substring(0, 3000);
   const text1 =pdf1.text.substring(0, 3000);
    console.log("========== PDF TEXT ==========");
    console.log(text.substring(0, 500));
    console.log("========== END PDF ==========");

    // Dynamic Prompt

    const ingredientPrompt = ingredient
      ? `Use "${ingredient}" as the primary ingredient whenever possible.`
      : "";
const prompt = `
You are an expert chef, clinical nutritionist, and meal planner.

Your task is to analyze the recipe document and generate a nutritionally balanced 7-day meal plan.

Target Audience:
${targetAudience}

Additional Requirements:
${ingredientPrompt}

Instructions:

1. Read the entire recipe document before creating the meal plan .
2. Prefer recipes from the document. Only create a new recipe if no suitable recipe exists.
3. Create a meal plan for exactly 7 days fullfilling nutritional values for the target audience and list them.
4. Each day must contain:
   - Breakfast
   - Lunch
   - Dinner 
5. Do NOT repeat any recipe during the week.
6. Choose recipes that together satisfy the daily nutritional needs of the target audience.
7. Keep the daily calorie total within the recommended range for the target audience.
8. Distribute calories approximately as:
   - Breakfast: 20–30%
   - Lunch: 35–40%
   - Dinner: 30–35%
9. Include approximate calories for every meal.
10. Include nutritional information for every meal:
    - Protein (g)
    - Carbohydrates (g)
    - Fat (g)
    - Fiber (g)
    
11. Use realistic ingredient quantities.
12. Preserve recipe names from the document whenever possible.
13. Do not invent recipes if an appropriate recipe already exists in the document.
14. Return ONLY valid JSON.
15. Do not include markdown, explanations, notes, comments, or additional text.
16. Every text value in the JSON must be written in ${loc}.


Output JSON Schema:

[
  {
    "day": 1,
    "dailyCalories": 2000,
    "meals": {
      "breakfast": {
        "title": "",
        "category": "Breakfast",
        "ingredients": [],
        "instructions": "",
        "calories": 500,
        "nutritionalInfo": {
          "protein": "25 g",
          "carbohydrates": "60 g",
          "fat": "15 g",
          "fiber": "8 g"
        }
      },
      "lunch": {
        "title": "",
        "category": "Lunch",
        "ingredients": [],
        "instructions": "",
        "calories": 800,
        "nutritionalInfo": {
          "protein": "35 g",
          "carbohydrates": "85 g",
          "fat": "25 g",
          "fiber": "10 g"
        }
      },
      "dinner": {
        "title": "",
        "category": "Dinner",
        "ingredients": [],
        "instructions": "**Instructions:**

**1. Sauté the onions and garlic:**
   - Heat the olive oil in a large saucepan over medium heat.
   - Add the chopped onion and cook until softened, about 5 minutes.
   - Stir in the minced garlic and cook for another minute until fragrant.

**2. Build the base of your soup:**
   - Pour in the diced tomatoes and vegetable broth. Bring to a boil, then reduce heat and simmer for 10 minutes.

**3. Add the spinach:**
   - Stir in the chopped spinach leaves. Cook until wilted, about 2 minutes.

**4. Season and add cream:**
    - Season with oregano, red pepper flakes (optional), salt, and black pepper to taste.
    - Slowly whisk in the heavy cream or half-and-half until well combined.

**5. Blend for smoothness (Optional):**
   - If desired, use an immersion blender to blend the soup for a smoother texture. Or you can transfer the soup
in batches to a regular blender and blend until smooth.

**6. Serve:**
   - Ladle the soup into bowls.
   - Garnish with your favorite toppings like toasted croutons, Parmesan cheese, or lemon wedges, if desired.
",
        "calories": 700,
        "nutritionalInfo": {
          "protein": "30 g",
          "carbohydrates": "70 g",
          "fat": "22 g",
          "fiber": "9 g"
        }
      }
    }
  }
]

Validation Rules:

- Output must be valid JSON.
- No duplicate recipes.
- Exactly 7 objects (one for each day).
- Every meal must include all required fields.
- Calories should be numeric.
- Ingredients must be arrays of strings.
- Instructions must be complete cooking steps in detail as step by step with more than 5 steps.
- Nutritional values must be realistic.
- Daily calories should approximately match the target audience's needs.
- Prefer recipes from the document over generating new ones.
give instrcitons as summary not less than 400 words
Recipe Document:

${text}
`;

    console.log("Prompt Sent");

    // Ollama Call

    // const result = await ollama.chat({
    //   model: "gemma2:2b",

    //   messages: [
    //     {
    //       role: "user",
    //       content: prompt,
    //     },
    //   ],
    // });




const result = await ollama.chat({
  model: "gemma3:12b",
  messages: [
    {
      role: "user",
      content: prompt,
    },
  ],
});



    console.log("========== OLLAMA RESPONSE ==========");
    console.log(result.message.content);

 
    // HTML


    
  } catch (error) {
    console.error(error);

    res.status(500).send(`
      <h1>Server Error</h1>
      <pre>${error.message}</pre>
    `);
  }
});
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
















