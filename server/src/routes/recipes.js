// import express from "express";
// import { RecipesModel } from "../models/Recipes.js";
// import { UserModel } from "../models/Users.js"; 
// import cloudinary from "cloudinary";
// import multer from "multer";
// import fs from "fs";
// import { Ollama } from "ollama";
// import { PDFParse } from "pdf-parse";
// import XLSX from "xlsx";
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const router = express.Router();



// const ollama = new Ollama({
//   host: "https://ollama.com",
//   headers: {
//     Authorization: `Bearer ab64cdb5b1ec45b3ba68954705df1126.CB3784pfXE5Y2cPDuFi6DAI6`
//   }
// });


// router.get("/generaterecipe", async (req, res) => {
//   try {
//     const group = req.query.group || "all";
//     const ingredient = req.query.ingredient || "";
// const foodgroup  =req.query.ingredient||"";

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


        

// let data1 = [];
// const loc ="tamil"
// // Read Excel file
// const buffer = fs.readFileSync("src/fooddata.xlsx");
// const workbook = XLSX.read(buffer, { type: "buffer" });

// console.log("Workbook Sheets:", workbook.SheetNames);

// // Select sheet(s) based on foodgroup and targetAudience
// if (foodgroup === "vegan" && targetAudience === "elderly") {
//   // Combine Sheet 2 and Sheet 3
//   const sheet1 = XLSX.utils.sheet_to_json(
//     workbook.Sheets[workbook.SheetNames[1]]
//   );

//   const sheet2 = XLSX.utils.sheet_to_json(
//     workbook.Sheets[workbook.SheetNames[2]]
//   );

//   data1 = [...sheet1, ...sheet2];

// } else if (foodgroup === "vegan" && targetAudience === "kids") {
//   // Combine Sheet 3 and Sheet 6
//   const sheet1 = XLSX.utils.sheet_to_json(
//     workbook.Sheets[workbook.SheetNames[2]]
//   );

//   const sheet2 = XLSX.utils.sheet_to_json(
//     workbook.Sheets[workbook.SheetNames[5]]
//   );

//   data1 = [...sheet1, ...sheet2];

// } else if (foodgroup === "vegan" && targetAudience === "diabetic") {
//   // Read Sheet 2
//   const sheet = workbook.Sheets[workbook.SheetNames[1]];
//   data1 = XLSX.utils.sheet_to_json(sheet);

// } else {
//   // Default: Read Sheet 1
//   const sheet = workbook.Sheets[workbook.SheetNames[0]];
//   data1 = XLSX.utils.sheet_to_json(sheet);
// }
// const nutridata = workbook.Sheets[workbook.SheetNames[1]];
//   const nutridata1 = XLSX.utils.sheet_to_json(nutridata);
// console.log("Excel Loaded");
// console.log("Total Rows:", data1.length);
// console.log("Excel Loaded");
// console.log("Total Rows:", nutridata1.length);
// // Convert Excel data into text (similar to PDF text)
// const text = JSON.stringify(data1, null, 2).substring(0, 9000);
// const text1 =JSON.stringify(nutridata1, null, 2).substring(0, 9000);
// console.log("========== EXCEL TEXT ==========");
// console.log(text.substring(0, 500));
// console.log("========== END EXCEL TEXT ==========");


//     const ingredientPrompt = ingredient
//       ? `Use "${ingredient}" as the primary ingredient whenever possible.`
//       : "";

//   const prompt = `
// You are an expert chef and nutritionist.

// Read the recipe document carefully.


// Create a one-week meal plan suitable for:

// ${targetAudience}

// ${ingredientPrompt}

// Requirements:

// Analyse entire recipes in ${text} and suggest recipes only present in ${text}
// suggest
//   give recipes based on ${loc} cusine

//  give instructions in above format
// **Instructions:**

// **1. Sauté the onions and garlic:**
//    - Heat the olive oil in a large saucepan over medium heat.
//    - Add the chopped onion and cook until softened, about 5 minutes.
//    - Stir in the minced garlic and cook for another minute until fragrant.

// **2. Build the base of your soup:**
//    - Pour in the diced tomatoes and vegetable broth. Bring to a boil, then reduce heat and simmer for 10 minutes.

// **3. Add the spinach:**
//    - Stir in the chopped spinach leaves. Cook until wilted, about 2 minutes.

// **4. Season and add cream:**
//     - Season with oregano, red pepper flakes (optional), salt, and black pepper to taste.
//     - Slowly whisk in the heavy cream or half-and-half until well combined.

// **5. Blend for smoothness (Optional):**
//    - If desired, use an immersion blender to blend the soup for a smoother texture. Or you can transfer the soup
// in batches to a regular blender and blend until smooth.

// **6. Serve:**
//    - Ladle the soup into bowls.
//    - Garnish with your favorite toppings like toasted croutons, Parmesan cheese, or lemon wedges, if desired.


// - Give Breakfast, Lunch and Dinner for each day
// plan recipes fulling the calorie requirement for each day and nutritional requirement for the week for ${targetAudience}
// - Healthy balanced meals
// - Mention approximate calories
// - Follow daily calorie and nutrition requirements
// calculate the calories based on the ingridients
//  give dv exact value
// -suggest recipes presentin the document

// give instructions in brief step by step 
// list snacks also
// give nutritional infomation in the above format
// Use standard nutritional values based on common food composition databases.
// give recipe origin   

// Analyse entire recipes in ${text} and suggest recipes only present in ${text}
// suggest 




// Format:

// [
//  {
//    "day":"",
//    "breakfast":{
//       "title":"",
//       "ingredients":[],
//       "instructions":"",
//       "calories":"",
//       "addons":{
// ingridient:"",
// calories:"",
// nutrientvalue:""
// }
//       "nutritionalinfo": {
//           "calories": 0 ,
//           "dv%":0,
//           "proteins": 0 ,
//          "dv%":0,
//          "carbohydrates": 0 ,
//          "dv%":0,
//          "fats": 0 ,
//          "dv%":0,,
//          "fiber": 0 ,
//          "dv%":0,
           
//       },
//     nutritionfacts:"recipe cusine type and intresting facts about recipe"
// "vitamins_and_minerals": {
//     "vitamin_a": 0,
//     "vitamin_b1": 0,
//     "vitamin_b2": 0,
//     "vitamin_b3": 0,
//     "vitamin_b5": 0,
//     "vitamin_b6": 0,
//     "vitamin_b7": 0,
//     "vitamin_b9": 0,
//     "vitamin_b12": 0,
//     "vitamin_c": 0,
//     "vitamin_d": 0,
//     "vitamin_e": 0,
//     "vitamin_k": 0,
//     "calcium": 0,
//     "iron": 0,
//     "magnesium": 0,
//     "phosphorus": 0,
//     "potassium": 0,
//     "sodium": 0,
//     "zinc": 0,
//     "copper": 0,
//     "manganese": 0,
//     "selenium": 0,
//     "iodine": 0
//   }
//   total calories :0 
//   total dv%:0
//   total protien dv :""
//   total carbohydrate dv:"" 
//   tota fat dv% :""
//   total fiber dv %:""
//   }
//    },
//    "lunch":{
//      "title":"",
//       "ingredients":[],
//       "instructions":"",
//       "calories":"",
//       "addons":{
// ingridient:"",
// calories:"",
// nutrientvalue:""
// }
//       "nutritionalinfo": {
//           "calories": 0 ,
//           "dv%":0,
//           "proteins": 0 ,
//          "dv%":0,
//          "carbohydrates": 0 ,
//          "dv%":0,
//          "fats": 0 ,
//          "dv%":0,,
//          "fiber": 0 ,
//          "dv%":0,
           
//       },
//     nutritionfacts:"recipe cusine type and intresting facts about recipe"
// "vitamins_and_minerals": {
//     "vitamin_a": 0,
//     "vitamin_b1": 0,
//     "vitamin_b2": 0,
//     "vitamin_b3": 0,
//     "vitamin_b5": 0,
//     "vitamin_b6": 0,
//     "vitamin_b7": 0,
//     "vitamin_b9": 0,
//     "vitamin_b12": 0,
//     "vitamin_c": 0,
//     "vitamin_d": 0,
//     "vitamin_e": 0,
//     "vitamin_k": 0,
//     "calcium": 0,
//     "iron": 0,
//     "magnesium": 0,
//     "phosphorus": 0,
//     "potassium": 0,
//     "sodium": 0,
//     "zinc": 0,
//     "copper": 0,
//     "manganese": 0,
//     "selenium": 0,
//     "iodine": 0
//   }
//   total calories :0 (average)
//   total dv%:0
//   total protien dv :""
//   total carbohydrate dv:"" 
//   tota fat dv% :""
//   total fiber dv %:""
// }},
//    "dinner":{
//      "title":"",
//       "ingredients":[],
//       "instructions":"",
//       "calories":"",
//       "addons":{
// ingridient:"",
// calories:"",
// nutrientvalue:""
// }
//       "nutritionalinfo": {
//           "calories": 0 ,
//           "dv%":0,
//           "proteins": 0 ,
//          "dv%":0,
//          "carbohydrates": 0 ,
//          "dv%":0,
//          "fats": 0 ,
//          "dv%":0,,
//          "fiber": 0 ,
//          "dv%":0,
           
//       },
//     nutritionfacts:"recipe cusine type and intresting facts about recipe"
// "vitamins_and_minerals": {
//     "vitamin_a": 0,
//     "vitamin_b1": 0,
//     "vitamin_b2": 0,
//     "vitamin_b3": 0,
//     "vitamin_b5": 0,
//     "vitamin_b6": 0,
//     "vitamin_b7": 0,
//     "vitamin_b9": 0,
//     "vitamin_b12": 0,
//     "vitamin_c": 0,
//     "vitamin_d": 0,
//     "vitamin_e": 0,
//     "vitamin_k": 0,
//     "calcium": 0,
//     "iron": 0,
//     "magnesium": 0,
//     "phosphorus": 0,
//     "potassium": 0,
//     "sodium": 0,
//     "zinc": 0,
//     "copper": 0,
//     "manganese": 0,
//     "selenium": 0,
//     "iodine": 0
//   }
//   total calories :0 (average)
//   total dv%:0
//   total protien dv :""
//   total carbohydrate dv:"" 
//   tota fat dv% :""
//   total fiber dv %:""
// }
//    } 
 
   
   
//    total_day_summary:
//   { 
  
//    total cal dv:""
 
//   total protien dv :""
//   total carbohydrate dv:"" 
//   tota fat dv% :""
//   total fiber dv %:""
//   }
  
//   }

// ]

// Give nutrition info in the below format
// Requirements:
// Your task:
// 1. Analyze all ingredients from all recipes in the document.
// 2. Provide accurate nutritional information for each individual ingredient.
// 3. Do not skip any ingredient.
// 4. Do not combine multiple ingredients into one entry.
// 5. Use standard nutritional values based on common food composition databases.
// 6. If an exact value is unavailable, provide a reasonable estimated value.
// 7. Include calories, macronutrients, fiber, vitamins, and minerals for each ingredient.
// 8. Maintain the original ingredient names from the recipe document.
// give nutri values exactly to the weight  given in the documents 
// Ingredient Quantity Conversion Rules:
// suggest recipes fullfilling dri for the day
// suggest addons to increase caloeis and nutrient values 
// give json in suggested format
// suggest total cal, carb, protien and fiber for entire day in d

// Before calculating nutritional values, convert recipe measurements into approximate standard weights.

// Use these approximate conversions:

// - 1 cup = 240 ml (use ingredient-specific gram conversion when possible)
// - 1 tablespoon (tbsp) = 15 ml
// - 1 teaspoon (tsp) = 5 ml
// - 1 pinch = 0.36 grams (approximately)
// - 1 handful = 30 grams (approximately)
// - 1 slice = use standard food-specific weight
// - 1 piece = use standard medium-size food weight
// - 1 bowl = 250 ml approximately

// Common ingredient approximations:

// Liquids:
// - 1 cup milk = 240 g
// - 1 cup water = 240 g
// - 1 cup oil = 218 g
// - 1 tablespoon oil = 14 g
// - 1 teaspoon oil = 4.5 g

// Grains and flours:
// - 1 cup rice (raw) = 185 g
// - 1 cup cooked rice = 195 g
// - 1 cup wheat flour = 120 g
// - 1 tablespoon flour = 8 g
// - 1 teaspoon flour = 3 g

// Spices:
// - 1 teaspoon salt = 6 g
// - 1 teaspoon sugar = 4 g
// - 1 teaspoon turmeric powder = 3 g
// - 1 teaspoon chilli powder = 2.5 g
// - 1 pinch spice powder = 0.3–0.5 g

// Vegetables:
// - 1 cup chopped vegetables = 120–150 g depending on vegetable
// - 1 medium onion = 110 g
// - 1 medium tomato = 120 g
// - 1 medium potato = 150 g

// Nuts and seeds:
// - 1 cup nuts = 140–150 g
// - 1 tablespoon nuts = 10 g
// - 1 teaspoon seeds = 3–5 g

// If the recipe quantity is unclear:
// 1. Make a reasonable approximation.
// 2. Mention the converted weight in "quantity_used".
// 3. Calculate nutrition based on the converted weight.
// 4. Never leave quantity fields empty.






// compare against the cal  and give total_day_summary
// Calories: 2,000 kcal
// Protein: 75 g
// Carbohydrates: 275 g1
// Fiber: 30 g
// Fat: 67 g




// suggest multiple  addons to increase calorie or nutrient value 
// for recipes in the document  give total caloreis by calculating cals for ingridients
// similarly give for groceries
// suggest recipes  exactly in the given format
// suggest recipes only present in doc
// suggest recipes for a week
// Return ONLY valid JSON.


// Format:

// [
// recipe_name :""
//    {

//   "calories": 0 ,
//   dv% :0,
//   "proteins": 0,
//    dv% :0,
//   "carbohydrates": 0 
//   dv% :0,
//   "fats": 0 ,
//   dv% :0,
//   "fiber": 0 ,
//   dv%:0,
//   "vitamins_and_minerals": {
//     "vitamin_a": 0,
//     "vitamin_b1": 0,
//     "vitamin_b2": 0,
//     "vitamin_b3": 0,
//     "vitamin_b5": 0,
//     "vitamin_b6": 0,
//     "vitamin_b7": 0,
//     "vitamin_b9": 0,
//     "vitamin_b12": 0,
//     "vitamin_c": 0,
//     "vitamin_d": 0,
//     "vitamin_e": 0,
//     "vitamin_k": 0,
//     "calcium": 0,
//     "iron": 0,
//     "magnesium": 0,
//     "phosphorus": 0,
//     "potassium": 0,
//     "sodium": 0,
//     "zinc": 0,
//     "copper": 0,
//     "manganese": 0,
//     "selenium": 0,
//     "iodine": 0
//   }
//   total calories :0 (average)
// }
// ]
// also suggest how much of the recipe fullfills dri
// give total day summary  in the above format
//    "total_day_summary": {
//       "total_cal_dv": "1900 kcal",
//       "total_protein_dv": "59g (78% of DRI)",
//       "total_carbohydrate_dv": "268g (97% of DRI)",
//       "total_fat_dv": "69g (103% of DRI)",
//       "total_fiber_dv": "38g (126% of DRI)"}
// Document:

// ${text}
// ${text1}
// give nutrition calculation for each ingridients based on  ${text}
// ${text1} if nutrient value is not available display as na
// obtain the nutri values from ${text1}  and calculate total calories 
// compare the ingrideints in ${text} and  ${text1} 

// suggest recipes based on ${text} 

// `;








//     console.log("Prompt Sent");


//     const result = await ollama.chat({
//       model: "gemma4:31b-cloud",
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



// export { router as recipesRouter };








import express, { json } from "express";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js"; 
import cloudinary from "cloudinary";
import multer from "multer";
import fs from "fs";
import { Ollama } from "ollama";
import { PDFParse } from "pdf-parse";
import XLSX from "xlsx";


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

let promptcount =0
const rand = arr => arr[Math.floor(Math.random() * arr.length)];
// const jsonfiles = [
//   'src/reecipes/sam.json',
//   'src/reecipes/samp.json',
//   'src/reecipes/sampl.json',
//   'src/reecipes/sample.json',
//   'src/reecipes/sampler.json'
// ];



const jsonfiles = [
  'src/reecipes/recipesamp.json',
  'src/reecipes/recipesample.json',
  'src/reecipes/recipsample.json',
  'src/reecipes/reip.json',
];
  // const file = rand(jsonfiles);
const file = jsonfiles[Math.floor(Math.random() * jsonfiles.length)];
console.log("file name",file)
const loadjson = async () => {

  console.log("file",file)
  // const response = await fetch(file);
  // return response.json();
};

loadjson().then(data => {
  // console.log(data);
});
let respons = []
const ollama = new Ollama({
  host: "https://ollama.com",
  headers: {
    Authorization: `Bearer ab64cdb5b1ec45b3ba68954705df1126.CB3784pfXE5Y2cPDuFi6DAI6`
  }
});
const elderlyprompt ={
  "task": "Create a daily meal plan for adults aged 60 years or older.",
  "target_population": {
    "age": ">=60 years",
    "groups": ["men", "women"]
  },
  "nutrient_requirements": {
    "men_>=60": {
      "energy_kcal": {
        "EAR": 1700,
        "RDA": null
      },
      "dietary_fibre_g": {
        "EAR": null,
        "RDA": 32
      },
      "protein_g": {
        "EAR": 42.9,
        "RDA": 54.0
      },
      "vitamin_A_ug": {
        "EAR": 460,
        "RDA": 1000
      },
      "thiamine_B1_mg": {
        "EAR": 1.2,
        "RDA": 1.4
      },
      "riboflavin_B2_mg": {
        "EAR": 1.6,
        "RDA": 2.0
      },
      "niacin_mg": {
        "EAR": null,
        "RDA": 12
      },
      "vitamin_C_mg": {
        "EAR": 65,
        "RDA": 80
      },
      "vitamin_B6_mg": {
        "EAR": 1.6,
        "RDA": 1.9
      },
      "folate_ug": {
        "EAR": 250,
        "RDA": 300
      },
      "vitamin_B12_ug": {
        "EAR": 2.0,
        "RDA": 2.2
      },
      "vitamin_D_IU": {
        "EAR": 400,
        "RDA": 800
      },
      "calcium_mg": {
        "EAR": 800,
        "RDA": 1200
      },
      "magnesium_mg": {
        "EAR": 370,
        "RDA": 440
      },
      "iron_mg": {
        "EAR": 11,
        "RDA": 19
      },
      "zinc_mg": {
        "EAR": 14,
        "RDA": 17
      },
      "iodine_ug": {
        "EAR": 95,
        "RDA": 150
      }
    },
    "women_>=60": {
      "energy_kcal": {
        "EAR": 1500,
        "RDA": null
      },
      "dietary_fibre_g": {
        "EAR": null,
        "RDA": 25
      },
      "protein_g": {
        "EAR": 36.3,
        "RDA": 45.7
      },
      "vitamin_A_ug": {
        "EAR": 390,
        "RDA": 840
      },
      "thiamine_B1_mg": {
        "EAR": 1.1,
        "RDA": 1.4
      },
      "riboflavin_B2_mg": {
        "EAR": 1.6,
        "RDA": 1.9
      },
      "niacin_mg": {
        "EAR": null,
        "RDA": 9
      },
      "vitamin_C_mg": {
        "EAR": 55,
        "RDA": 65
      },
      "vitamin_B6_mg": {
        "EAR": 1.6,
        "RDA": 1.9
      },
      "folate_ug": {
        "EAR": 180,
        "RDA": 200
      },
      "vitamin_B12_ug": {
        "EAR": 2.0,
        "RDA": 2.2
      },
      "vitamin_D_IU": {
        "EAR": 400,
        "RDA": 800
      },
      "calcium_mg": {
        "EAR": 800,
        "RDA": 1200
      },
      "magnesium_mg": {
        "EAR": 310,
        "RDA": 370
      },
      "iron_mg": {
        "EAR": 11,
        "RDA": 19
      },
      "zinc_mg": {
        "EAR": 11,
        "RDA": 13.2
      },
      "iodine_ug": {
        "EAR": 95,
        "RDA": 150
      }
    }
  },
  "instructions": [
    "Create separate daily meal plans for men and women where requirements differ.",
    "Include breakfast, mid-morning snack, lunch, evening snack, and dinner.",
    "Provide foods and approximate portion sizes for each meal.",
    "Mention the key nutrients supplied by each meal.",
    "Aim to meet or approach the relevant RDA values.",
    "Ensure the diet is balanced, varied, practical, and culturally appropriate.",
    "Prioritize adequate protein, dietary fibre, vitamins, and minerals.",
    "Avoid unnecessarily exceeding nutrient requirements."
  ],
  "output_format": {
    "meal_plan": true,
    "portion_sizes": true,
    "nutrient_contribution": true,
    "daily_nutrient_summary": true,
    "comparison_with_RDA": true
  }
}


const adultprompt = {
  "task": "Create a daily meal plan for adults aged 19 to 59 years.",
  "target_population": {
    "age": "19-59 years",
    "groups": ["men", "women"]
  },
  "nutrient_requirements": {
    "men_19_59": {
      "energy_kcal": {
        "EAR": 2110,
        "RDA": null
      },
      "dietary_fibre_g": {
        "EAR": null,
        "RDA": 30
      },
      "protein_g": {
        "EAR": 45.7,
        "RDA": 54.0
      },
      "vitamin_A_ug": {
        "EAR": 630,
        "RDA": 1000
      },
      "thiamine_B1_mg": {
        "EAR": 1.0,
        "RDA": 1.2
      },
      "riboflavin_B2_mg": {
        "EAR": 1.1,
        "RDA": 1.3
      },
      "niacin_mg": {
        "EAR": null,
        "RDA": 16
      },
      "vitamin_C_mg": {
        "EAR": 65,
        "RDA": 80
      },
      "vitamin_B6_mg": {
        "EAR": 1.1,
        "RDA": 1.3
      },
      "folate_ug": {
        "EAR": 320,
        "RDA": 400
      },
      "vitamin_B12_ug": {
        "EAR": 2.0,
        "RDA": 2.4
      },
      "vitamin_D_IU": {
        "EAR": 400,
        "RDA": 600
      },
      "calcium_mg": {
        "EAR": 800,
        "RDA": 1000
      },
      "magnesium_mg": {
        "EAR": 285,
        "RDA": 340
      },
      "iron_mg": {
        "EAR": 5.0,
        "RDA": 17
      },
      "zinc_mg": {
        "EAR": 10.5,
        "RDA": 11
      },
      "iodine_ug": {
        "EAR": 95,
        "RDA": 150
      }
    },

    "women_19_59": {
      "energy_kcal": {
        "EAR": 1660,
        "RDA": null
      },
      "dietary_fibre_g": {
        "EAR": null,
        "RDA": 25
      },
      "protein_g": {
        "EAR": 36.3,
        "RDA": 45.7
      },
      "vitamin_A_ug": {
        "EAR": 510,
        "RDA": 840
      },
      "thiamine_B1_mg": {
        "EAR": 0.9,
        "RDA": 1.1
      },
      "riboflavin_B2_mg": {
        "EAR": 1.0,
        "RDA": 1.1
      },
      "niacin_mg": {
        "EAR": null,
        "RDA": 14
      },
      "vitamin_C_mg": {
        "EAR": 55,
        "RDA": 65
      },
      "vitamin_B6_mg": {
        "EAR": 1.1,
        "RDA": 1.3
      },
      "folate_ug": {
        "EAR": 320,
        "RDA": 400
      },
      "vitamin_B12_ug": {
        "EAR": 2.0,
        "RDA": 2.4
      },
      "vitamin_D_IU": {
        "EAR": 400,
        "RDA": 600
      },
      "calcium_mg": {
        "EAR": 800,
        "RDA": 1000
      },
      "magnesium_mg": {
        "EAR": 220,
        "RDA": 310
      },
      "iron_mg": {
        "EAR": 8.1,
        "RDA": 21
      },
      "zinc_mg": {
        "EAR": 7.0,
        "RDA": 8
      },
      "iodine_ug": {
        "EAR": 95,
        "RDA": 150
      }
    }
  },

  "instructions": [
    "Create separate daily meal plans for men and women where requirements differ.",
    "Include breakfast, mid-morning snack, lunch, evening snack, and dinner.",
    "Provide foods and approximate portion sizes for each meal.",
    "Mention the key nutrients supplied by each meal.",
    "Aim to meet or approach the relevant RDA values without unnecessarily exceeding requirements.",
    "Ensure the diet is balanced, varied, practical, affordable, and culturally appropriate.",
    "Include adequate sources of high-quality protein throughout the day.",
    "Include whole grains, pulses, vegetables, fruits, nuts, seeds, and dairy or suitable alternatives.",
    "Prioritize adequate dietary fibre, vitamins, and minerals.",
    "Include vegetarian options and, where appropriate, non-vegetarian alternatives.",
    "Limit excessive added sugar, salt, saturated fat, and highly processed foods.",
    "Ensure adequate hydration and mention an approximate daily water intake.",
    "Consider nutrient-dense foods rather than simply increasing food quantity to meet nutrient requirements.",
    "For women of reproductive age, highlight iron- and folate-rich foods.",
    "For adults with low physical activity, avoid unnecessarily increasing energy intake.",
    "Use common household measures such as cups, tablespoons, teaspoons, grams, pieces, and millilitres.",
    "Clearly state that energy requirements vary with body size, physical activity, occupation, and health status."
  ],

  "output_format": {
    "meal_plan": true,
    "portion_sizes": true,
    "nutrient_contribution": true,
    "daily_nutrient_summary": true,
    "comparison_with_RDA": true,
    "hydration": true,
    "vegetarian_alternatives": true,
    "non_vegetarian_alternatives": true,
    "notes_on_energy_adjustment": true
  }
};

const allAgePrompt = {
  "task": "Create a daily meal plan for adults aged 19 to 59 years.",
  "target_population": {
    "age": "19-59 years",
    "groups": ["men", "women"]
  },
  "nutrient_requirements": {
    "men_19_59": {
      "energy_kcal": {
        "EAR": 2110,
        "RDA": null
      },
      "dietary_fibre_g": {
        "EAR": null,
        "RDA": 30
      },
      "protein_g": {
        "EAR": 45.7,
        "RDA": 54.0
      },
      "vitamin_A_ug": {
        "EAR": 630,
        "RDA": 1000
      },
      "thiamine_B1_mg": {
        "EAR": 1.0,
        "RDA": 1.2
      },
      "riboflavin_B2_mg": {
        "EAR": 1.1,
        "RDA": 1.3
      },
      "niacin_mg": {
        "EAR": null,
        "RDA": 16
      },
      "vitamin_C_mg": {
        "EAR": 65,
        "RDA": 80
      },
      "vitamin_B6_mg": {
        "EAR": 1.1,
        "RDA": 1.3
      },
      "folate_ug": {
        "EAR": 320,
        "RDA": 400
      },
      "vitamin_B12_ug": {
        "EAR": 2.0,
        "RDA": 2.4
      },
      "vitamin_D_IU": {
        "EAR": 400,
        "RDA": 600
      },
      "calcium_mg": {
        "EAR": 800,
        "RDA": 1000
      },
      "magnesium_mg": {
        "EAR": 285,
        "RDA": 340
      },
      "iron_mg": {
        "EAR": 5.0,
        "RDA": 17
      },
      "zinc_mg": {
        "EAR": 10.5,
        "RDA": 11
      },
      "iodine_ug": {
        "EAR": 95,
        "RDA": 150
      }
    },

    "women_19_59": {
      "energy_kcal": {
        "EAR": 1660,
        "RDA": null
      },
      "dietary_fibre_g": {
        "EAR": null,
        "RDA": 25
      },
      "protein_g": {
        "EAR": 36.3,
        "RDA": 45.7
      },
      "vitamin_A_ug": {
        "EAR": 510,
        "RDA": 840
      },
      "thiamine_B1_mg": {
        "EAR": 0.9,
        "RDA": 1.1
      },
      "riboflavin_B2_mg": {
        "EAR": 1.0,
        "RDA": 1.1
      },
      "niacin_mg": {
        "EAR": null,
        "RDA": 14
      },
      "vitamin_C_mg": {
        "EAR": 55,
        "RDA": 65
      },
      "vitamin_B6_mg": {
        "EAR": 1.1,
        "RDA": 1.3
      },
      "folate_ug": {
        "EAR": 320,
        "RDA": 400
      },
      "vitamin_B12_ug": {
        "EAR": 2.0,
        "RDA": 2.4
      },
      "vitamin_D_IU": {
        "EAR": 400,
        "RDA": 600
      },
      "calcium_mg": {
        "EAR": 800,
        "RDA": 1000
      },
      "magnesium_mg": {
        "EAR": 220,
        "RDA": 310
      },
      "iron_mg": {
        "EAR": 8.1,
        "RDA": 21
      },
      "zinc_mg": {
        "EAR": 7.0,
        "RDA": 8
      },
      "iodine_ug": {
        "EAR": 95,
        "RDA": 150
      }
    }
  },

  "instructions": [
    "Create separate daily meal plans for men and women where requirements differ.",
    "Include breakfast, mid-morning snack, lunch, evening snack, and dinner.",
    "Provide foods and approximate portion sizes for each meal.",
    "Mention the key nutrients supplied by each meal.",
    "Aim to meet or approach the relevant RDA values without unnecessarily exceeding requirements.",
    "Ensure the diet is balanced, varied, practical, affordable, and culturally appropriate.",
    "Include adequate sources of high-quality protein throughout the day.",
    "Include whole grains, pulses, vegetables, fruits, nuts, seeds, and dairy or suitable alternatives.",
    "Prioritize adequate dietary fibre, vitamins, and minerals.",
    "Include vegetarian options and, where appropriate, non-vegetarian alternatives.",
    "Limit excessive added sugar, salt, saturated fat, and highly processed foods.",
    "Ensure adequate hydration and mention an approximate daily water intake.",
    "Consider nutrient-dense foods rather than simply increasing food quantity to meet nutrient requirements.",
    "For women of reproductive age, highlight iron- and folate-rich foods.",
    "For adults with low physical activity, avoid unnecessarily increasing energy intake.",
    "Use common household measures such as cups, tablespoons, teaspoons, grams, pieces, and millilitres.",
    "Clearly state that energy requirements vary with body size, physical activity, occupation, and health status."
  ],

  "output_format": {
    "meal_plan": true,
    "portion_sizes": true,
    "nutrient_contribution": true,
    "daily_nutrient_summary": true,
    "comparison_with_RDA": true,
    "hydration": true,
    "vegetarian_alternatives": true,
    "non_vegetarian_alternatives": true,
    "notes_on_energy_adjustment": true
  }
};
const kidsprompt ={

"task": "Create an age- and sex-specific daily meal plan for children and adolescents using the provided nutrition guidelines.",
"age_classification": {
"toddler": {
"age_range": "1-3 years"
},
"preschool_child": {
"age_range": "3-5 years"
},
"school_age_child": {
"age_range": "6-12 years"
},
"adolescent": {
"age_range": "13-18 years"
}
},
"nutrition_guidelines": {
"age_2_4": {
"girls": {
"calories_kcal": "1000-1400",
"protein_oz": "2-4",
"fruits_cups": "1-1.5",
"vegetables_cups": "1-1.5",
"grains_oz": "3-5",
"dairy_cups": "2-2.5"
},
"boys": {
"calories_kcal": "1000-1600",
"protein_oz": "2-5",
"fruits_cups": "1-1.5",
"vegetables_cups": "1-2",
"grains_oz": "3-5",
"dairy_cups": "2-2.5"
}
},
"age_5_8": {
"girls": {
"calories_kcal": "1200-1800",
"protein_oz": "3-5",
"fruits_cups": "1-1.5",
"vegetables_cups": "1.5-2.5",
"grains_oz": "4-6",
"dairy_cups": "2.5"
},
"boys": {
"calories_kcal": "1200-2000",
"protein_oz": "3-5.5",
"fruits_cups": "1-2",
"vegetables_cups": "1.5-2.5",
"grains_oz": "4-6",
"dairy_cups": "2.5"
}
},
"age_9_13": {
"girls": {
"calories_kcal": "1400-2200",
"protein_oz": "4-6",
"fruits_cups": "1.5-2",
"vegetables_cups": "1.5-3",
"grains_oz": "5-7",
"dairy_cups": "3"
},
"boys": {
"calories_kcal": "1600-2600",
"protein_oz": "5-6.5",
"fruits_cups": "1.5-2",
"vegetables_cups": "2-3.5",
"grains_oz": "5-9",
"dairy_cups": "3"
}
},
"age_14_18": {
"girls": {
"calories_kcal": "1800-2400",
"protein_oz": "5-6.5",
"fruits_cups": "1.5-2",
"vegetables_cups": "2.5-3",
"grains_oz": "6-8",
"dairy_cups": "3"
},
"boys": {
"calories_kcal": "2000-3200",
"protein_oz": "5.5-7",
"fruits_cups": "2-2.5",
"vegetables_cups": "2.5-4",
"grains_oz": "6-10",
"dairy_cups": "3"
}
}
},
"instructions": [
"Identify the child's age group and sex before creating the meal plan.",
"Use the appropriate calorie range based on age, sex, growth, and activity level.",
"Create a balanced daily meal plan appropriate for the child's developmental stage.",
"Include breakfast, mid-morning snack, lunch, evening snack, and dinner.",
"Provide specific foods and practical portion sizes for every meal.",
"Ensure the daily plan approximately meets the recommended servings of fruits, vegetables, grains, protein foods, and dairy.",
"Prioritize nutrient-dense foods that support growth, development, immunity, bone health, and cognitive development.",
"Include adequate sources of protein, calcium, iron, vitamin D, zinc, vitamin A, vitamin C, and other essential nutrients.",
"Use age-appropriate food textures and portion sizes.",
"Avoid excessive added sugar, highly processed foods, and sugary beverages.",
"For younger children, avoid foods that present a choking risk and provide safer alternatives.",
"Allow reasonable variation within the calorie and food-group ranges according to activity level.",
"Do not force the child to consume the maximum recommended amount if their individual needs are lower.",
"Provide a daily nutritional summary showing estimated calories, protein, fruits, vegetables, grains, and dairy.",
"Compare the estimated daily intake with the relevant guideline range.",
"Clearly identify any nutrient or food-group target that is below or above the recommended range."
],
"meal_structure": {
"breakfast": true,
"mid_morning_snack": true,
"lunch": true,
"evening_snack": true,
"dinner": true
},
"output": {
"child_profile": {
"age": true,
"sex": true,
"activity_level": true
},
"daily_meal_plan": true,
"portion_sizes": true,
"estimated_calories": true,
"estimated_protein": true,
"food_group_totals": true,
"target_comparison": true,
"nutrient_highlights": true
}
}



// router.get("/generaterecipe", async (req, res) => {
//   try {
//     const group = req.query.group || "all";
//     const ingredient = req.query.ingredient || "";
// const foodgroup  =req.query.ingredient||"";
// const cachedata  =req.query.cachedata||"";
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


    
// const promptgroup =
//   group === "kids"
//     ? kidsprompt
//     : group === "adult"
//     ? adultprompt
//     : group === "elderly"
//     ? elderlyprompt
//     : group === "diabetic"
//     ? diabeticprompt
//     : allAgePrompt;
        


// // const loc ="tamil"
// // // Read Excel file

// // // const query ="low glycemic,Complex Carbohydrates,high-fibre carbohydrate diabetic friendly"

// // const jsonfiles = [
// //   'src/reecipes/recipesamp.json',
// //   'src/reecipes/recipesample.json',
// //   'src/reecipes/recipsample.json',
// //   'src/reecipes/reip.json',
// // ];

// // const file = jsonfiles[Math.floor(Math.random() * jsonfiles.length)];

// // console.log("file name:", file);

// // const raw = fs.readFileSync(file, "utf8");
// // const data1 = JSON.parse(raw);

// // console.log("JSON Loaded");
// // console.log("Total Rows:", data1.length);

// // const text = JSON.stringify(data1, null, 2).substring(0, 99000);
// // const text1 = text;










// const file = jsonfiles[Math.floor(Math.random() * jsonfiles.length)];

// console.log("File name:", file);

// const raw = fs.readFileSync(file, "utf8");
// const data1 = JSON.parse(raw);

// console.log("JSON Loaded");
// console.log("Total Rows:", data1.length);

// // Shuffle recipes randomly
// const shuffledRecipes = [...data1].sort(() => Math.random() - 0.5);

// // Select 10 random recipes
// const selectedRecipes = shuffledRecipes.slice(0, 100);

// console.log("Selected Recipes:", selectedRecipes.length);

// const text = JSON.stringify(selectedRecipes, null, 2).substring(0, 99000);
// console.log("recipes", text)
  
//   const text1 = text;



































// // console.log("========== JSON TEXT ==========");
// // console.log(text.substring(0, 500));
// // console.log("========== END JSON TEXT ==========");

















//     const ingredientPrompt = ingredient
//       ? `Use "${ingredient}" as the primary ingredient whenever possible.`
//       : "";

//   const prompt = `
// You are an expert chef, nutritionist, and meal planner.

// Your task is to generate a complete 7-day meal plan.


// Requirements:
// - Each time this prompt is used, generate a completely different meal plan. Do not repeat recipes, meal combinations, or ingredient pairings from previous generations.

// -Read the  ${text1}  carefully and suggest  recipes randomly present in it






// suggest recipes not present in ${cachedata}
// - Generate recipes for an entire week (7 days).
// - Include Breakfast, Lunch, Dinner, and one Healthy Snack for each day .
// - Every recipe must be unique. Never repeat the same meal, primary ingredient, or cooking style within the week.
// - Vary the primary protein and vegetables throughout the week.
// - Balance nutrition by including protein, healthy fats, complex carbohydrates, and fiber in each day's meals.
// - Recipes should be practical, easy to prepare, and use commonly available ingredients.
// - Avoid overly complex or restaurant-only recipes.
// - Each time this prompt is used, generate a completely different meal plan. Do not repeat recipes, meal combinations, or ingredient pairings from previous generations.
// - Be creative while ensuring the meals are realistic and appetizing.
// - Ensure the recipes fit the specified target audience and dietary preferences.
// - If dietary restrictions or allergies are provided, strictly follow th
// em.
// - Include estimated preparation time and cooking time for every recipe.
// - Include approximate calories and macronutrients (Protein, Carbs, Fat) for each meal.
// - give as valid json format Give exact json in above format if any field not available give n/a



//    "meal_plan": {
//     "day_1": {
//       "breakfast": {
//         "recipe_name": "",
//         "calories": ,
//         "prep_time": "",
//         "cook_time": "",
//         cooking_instructions:"",
//         ingridients:{},
//         "macros": {
//           "protein": "",
//           "carbs": "",
//           "fat": "",
//           "fiber":""
//         },
//         "addons":{
//         },

//         {
//   "vitamins": {
//     "vitamin_a": {
//       "amount": 900,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     },
//     "vitamin_c": {
//       "amount": 90,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "vitamin_d": {
//       "amount": 20,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     },
//     "vitamin_e": {
//       "amount": 15,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "vitamin_k": {
//       "amount": 120,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     },
//     "thiamin_b1": {
//       "amount": 1.2,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "riboflavin_b2": {
//       "amount": 1.3,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "niacin_b3": {
//       "amount": 16,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "vitamin_b6": {
//       "amount": 1.7,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "folate_b9": {
//       "amount": 400,
//       "unit": "mcg DFE",
//       "percent_daily_value": 100
//     },
//     "vitamin_b12": {
//       "amount": 2.4,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     }
//   },
//   "minerals": {
//     "calcium": {
//       "amount": 200,
//       "unit": "mg",
//       "percent_daily_value": 15
//     },
//     "iron": {
//       "amount": 18,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "phosphorus": {
//       "amount": 125,
//       "unit": "mg",
//       "percent_daily_value": 10
//     },
//     "iodine": {
//       "amount": 150,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     },
//     "magnesium": {
//       "amount": 420,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "zinc": {
//       "amount": 11,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "selenium": {
//       "amount": 55,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     },
//     "copper": {
//       "amount": 0.9,
//       "unit": "mg",
//       "percent_daily_value": 100
//     }
//   }
// }
//       },
//       "lunch": {
//         "recipe_name": "",
//         "calories": ,
//         "prep_time": "",
//         "cook_time": "",
//       " ingridients":{},
//         "cooking_instructions":"",
//              {
//   "vitamins": {
//     "vitamin_a": {
//       "amount": 900,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     },
//     "vitamin_c": {
//       "amount": 90,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "vitamin_d": {
//       "amount": 20,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     },
//     "vitamin_e": {
//       "amount": 15,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "vitamin_k": {
//       "amount": 120,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     },
//     "thiamin_b1": {
//       "amount": 1.2,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "riboflavin_b2": {
//       "amount": 1.3,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "niacin_b3": {
//       "amount": 16,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "vitamin_b6": {
//       "amount": 1.7,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "folate_b9": {
//       "amount": 400,
//       "unit": "mcg DFE",
//       "percent_daily_value": 100
//     },
//     "vitamin_b12": {
//       "amount": 2.4,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     }
//   },
//   "minerals": {
//     "calcium": {
//       "amount": 200,
//       "unit": "mg",
//       "percent_daily_value": 15
//     },
//     "iron": {
//       "amount": 18,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "phosphorus": {
//       "amount": 125,
//       "unit": "mg",
//       "percent_daily_value": 10
//     },
//     "iodine": {
//       "amount": 150,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     },
//     "magnesium": {
//       "amount": 420,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "zinc": {
//       "amount": 11,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "selenium": {
//       "amount": 55,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     },
//     "copper": {
//       "amount": 0.9,
//       "unit": "mg",
//       "percent_daily_value": 100
//     }
//   }
//         "macros": {
//           "protein": "",
//           "carbs": "",
//           "fat": "",
//           "fiber":""
//         }
//       },
//       "healthy_snack": {
//         "recipe_name": "",
//         "calories": ,
//         "prep_time": "",
//         "cook_time": "",
//         "ingridients":{},
//         cooking_instructions:"",
//              {
//   "vitamins": {
//     "vitamin_a": {
//       "amount": 900,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     },
//     "vitamin_c": {
//       "amount": 90,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "vitamin_d": {
//       "amount": 20,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     },
//     "vitamin_e": {
//       "amount": 15,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "vitamin_k": {
//       "amount": 120,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     },
//     "thiamin_b1": {
//       "amount": 1.2,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "riboflavin_b2": {
//       "amount": 1.3,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "niacin_b3": {
//       "amount": 16,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "vitamin_b6": {
//       "amount": 1.7,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "folate_b9": {
//       "amount": 400,
//       "unit": "mcg DFE",
//       "percent_daily_value": 100
//     },
//     "vitamin_b12": {
//       "amount": 2.4,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     }
//   },
//   "minerals": {
//     "calcium": {
//       "amount": 200,
//       "unit": "mg",
//       "percent_daily_value": 15
//     },
//     "iron": {
//       "amount": 18,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "phosphorus": {
//       "amount": 125,
//       "unit": "mg",
//       "percent_daily_value": 10
//     },
//     "iodine": {
//       "amount": 150,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     },
//     "magnesium": {
//       "amount": 420,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "zinc": {
//       "amount": 11,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "selenium": {
//       "amount": 55,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     },
//     "copper": {
//       "amount": 0.9,
//       "unit": "mg",
//       "percent_daily_value": 100
//     }
//   }
//         "macros": {
//           "protein": "",
//           "carbs": "",
//           "fat": "",
//           "fiber":""
//         }
//       },
//       "dinner": {
//         "recipe_name": "",
//         "calories": ,
//         "prep_time": "",
//         "cook_time": "",
//         "ingridients":{},
//         cooking_instructions:"",
//              {
//   "vitamins": {
//     "vitamin_a": {
//       "amount": 900,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     },
//     "vitamin_c": {
//       "amount": 90,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "vitamin_d": {
//       "amount": 20,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     },
//     "vitamin_e": {
//       "amount": 15,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "vitamin_k": {
//       "amount": 120,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     },
//     "thiamin_b1": {
//       "amount": 1.2,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "riboflavin_b2": {
//       "amount": 1.3,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "niacin_b3": {
//       "amount": 16,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "vitamin_b6": {
//       "amount": 1.7,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "folate_b9": {
//       "amount": 400,
//       "unit": "mcg DFE",
//       "percent_daily_value": 100
//     },
//     "vitamin_b12": {
//       "amount": 2.4,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     }
//   },
//   "minerals": {
//     "calcium": {
//       "amount": 200,
//       "unit": "mg",
//       "percent_daily_value": 15
//     },
//     "iron": {
//       "amount": 18,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "phosphorus": {
//       "amount": 125,
//       "unit": "mg",
//       "percent_daily_value": 10
//     },
//     "iodine": {
//       "amount": 150,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     },
//     "magnesium": {
//       "amount": 420,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "zinc": {
//       "amount": 11,
//       "unit": "mg",
//       "percent_daily_value": 100
//     },
//     "selenium": {
//       "amount": 55,
//       "unit": "mcg",
//       "percent_daily_value": 100
//     },
//     "copper": {
//       "amount": 0.9,
//       "unit": "mg",
//       "percent_daily_value": 100
//     }
//   }
//         "macros": {
//           "protein": "",
//           "carbs": "",
//           "fat": "",
//           "fiber":""
//         },
//         addons:{
//         }  
        
//         }
//         summary:{
//         total_calories:"",
//         dv :"",
//         Protiens_dv:"",
//         carbs_dv:"",
//         fats_dv:"",
//         fiber_dv:"",
//       }
//     },




//   Suggest addons to increase nutrient values and calories
//      give  Cooking instructions in above format
// // **Instructions:**

// // **1. Sauté the onions and garlic:**
// //    - Heat the olive oil in a large saucepan over medium heat.
// //    - Add the chopped onion and cook until softened, about 5 minutes.
// //    - Stir in the minced garlic and cook for another minute until fragrant.

// // **2. Build the base of your soup:**
// //    - Pour in the diced tomatoes and vegetable broth. Bring to a boil, then reduce heat and simmer for 10 minutes.

// // **3. Add the spinach:**
// //    - Stir in the chopped spinach leaves. Cook until wilted, about 2 minutes.

// // **4. Season and add cream:**
// //     - Season with oregano, red pepper flakes (optional), salt, and black pepper to taste.
// //     - Slowly whisk in the heavy cream or half-and-half until well combined.

// // **5. Blend for smoothness (Optional):**
// //    - If desired, use an immersion blender to blend the soup for a smoother texture. Or you can transfer the soup
// // in batches to a regular blender and blend until smooth.

// // **6. Serve:**
// //    - Ladle the soup into bowls.
// //    - Garnish with your favorite toppings like toasted croutons, Parmesan cheese, or lemon wedges, if desired.


// `;








//     console.log("Prompt Sent" ,prompt);


//     const result = await ollama.chat({
//       model: "gemma4:31b-cloud",
//       messages: [
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
      
   
//     })
//     ;
//    promptcount++;
// // console.log("output",result.message.content)
//     let output = result.message.content;

// // responses.push({
// //   promptCount: promptcount,
// //   output: output,
// // });
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
// // responses.push({
// //   promptCount: promptcount,
// //   output: output,
// // });


//     // console.log("========== OLLAMA RESPONSE ==========");
//     // console.log(output);
// // console.log("sample response",jsonResponse)

//     return res.json(jsonResponse);


//   } catch (error) {

//     console.error(error);

//     return res.status(500).json({
//       error: "Recipe generation failed",
//       message: error.message
//     });

//   }
// });

router.get("/generaterecipe", async (req, res) => {
  try {
    const group = req.query.group || "all";
    const ingredient = req.query.ingredient || "";
    const cachedata = req.query.cachedata || "";

    // ---------------------------------------------------------
    // 1. TARGET AUDIENCE
    // ---------------------------------------------------------

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

    const promptgroup =
      group === "kids"
        ? kidsprompt
        : group === "adult"
        ? adultprompt
        : group === "elderly"
        ? elderlyprompt
        : group === "diabetic"
        ? diabeticprompt
        : allAgePrompt;

    // ---------------------------------------------------------
    // 2. INGREDIENT PROMPT
    // ---------------------------------------------------------

    const ingredientPrompt = ingredient
      ? `Use "${ingredient}" as the primary ingredient whenever possible.`
      : "No specific ingredient is required.";

    // ---------------------------------------------------------
    // 3. SELECT RANDOM JSON FILE
    // ---------------------------------------------------------

    const file =
      jsonfiles[Math.floor(Math.random() * jsonfiles.length)];

    console.log("File name:", file);

    const raw = fs.readFileSync(file, "utf8");
    const data1 = JSON.parse(raw);

    console.log("JSON Loaded");
    console.log("Total Rows:", data1.length);

    // ---------------------------------------------------------
    // 4. FISHER-YATES SHUFFLE
    // ---------------------------------------------------------

    function shuffle(array) {
      const result = [...array];

      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j], result[i]];
      }

      return result;
    }

    // ---------------------------------------------------------
    // 5. GET RECIPES FROM CACHE
    // ---------------------------------------------------------

    let cachedRecipeNames = [];

    if (cachedata) {
      try {
        // If cachedata is JSON
        const parsedCache = JSON.parse(cachedata);

        if (Array.isArray(parsedCache)) {
          cachedRecipeNames = parsedCache
            .map((item) => {
              if (typeof item === "string") {
                return item.trim().toLowerCase();
              }

              return (
                item.recipe_name ||
                item.RecipeName ||
                ""
              )
                .trim()
                .toLowerCase();
            })
            .filter(Boolean);
        } else if (parsedCache.meal_plan) {
          // If cachedata contains the complete meal plan
          Object.values(parsedCache.meal_plan).forEach((day) => {
            if (!day || typeof day !== "object") return;

            ["breakfast", "lunch", "healthy_snack", "dinner"].forEach(
              (mealType) => {
                const meal = day[mealType];

                if (meal?.recipe_name) {
                  cachedRecipeNames.push(
                    meal.recipe_name.trim().toLowerCase()
                  );
                }
              }
            );
          });
        }
      } catch (error) {
        // If cachedata is not valid JSON, treat it as comma-separated names
        cachedRecipeNames = cachedata
          .split(",")
          .map((name) => name.trim().toLowerCase())
          .filter(Boolean);
      }
    }

    console.log(
      "Cached recipes:",
      cachedRecipeNames.length
    );

    // ---------------------------------------------------------
    // 6. REMOVE CACHED RECIPES
    // ---------------------------------------------------------

    const availableRecipes = data1.filter((recipe) => {
      const recipeName = String(
        recipe.RecipeName || recipe.recipe_name || ""
      )
        .trim()
        .toLowerCase();

      return (
        recipeName &&
        !cachedRecipeNames.includes(recipeName)
      );
    });

    console.log(
      "Available after cache exclusion:",
      availableRecipes.length
    );

    // ---------------------------------------------------------
    // 7. RANDOMLY SELECT ONLY 50 CANDIDATES
    // ---------------------------------------------------------

    const shuffledRecipes = shuffle(availableRecipes);

    const selectedRecipes = shuffledRecipes.slice(0, 50);

    console.log(
      "Random candidate recipes:",
      selectedRecipes.length
    );

    // ---------------------------------------------------------
    // 8. SEND ONLY NAME + COURSE TO OLLAMA
    // ---------------------------------------------------------

    const recipeList = selectedRecipes.map((recipe) => ({
      recipe_name:
        recipe.RecipeName ||
        recipe.recipe_name ||
        "n/a",

      course:
        recipe.Course ||
        recipe.course ||
        "n/a"
    }));

    const recipeListText = JSON.stringify(
      recipeList
    );

    console.log(
      "Recipe list characters:",
      recipeListText.length
    );

    // ---------------------------------------------------------
    // 9. PROMPT
    // ---------------------------------------------------------

    const prompt = `
You are an expert chef, nutritionist and meal planner.

TARGET AUDIENCE:
${targetAudience}

DIETARY / AUDIENCE REQUIREMENTS:
${promptgroup}

INGREDIENT REQUIREMENT:
${ingredientPrompt}

AVAILABLE RECIPES:

${recipeListText}

IMPORTANT RECIPE RULES:

1. Select recipes ONLY from AVAILABLE RECIPES.
2. NEVER invent a recipe name.
3. NEVER modify a recipe name.
4. NEVER use a recipe that is not in AVAILABLE RECIPES.
5. Do not use any cached recipe.
6. Generate exactly 7 days.
7. Each day must contain:
   - breakfast
   - lunch
   - healthy_snack
   - dinner
8. Every recipe_name must be unique across the entire week.
9. Do not repeat the same primary ingredient excessively.
10. Vary protein sources.
11. Vary vegetables.
12. Vary cooking methods.
13. Prefer practical and commonly available ingredients.
14. Follow the TARGET AUDIENCE requirements strictly.
15. Follow the INGREDIENT REQUIREMENT when possible.
16. Balance protein, carbohydrates, healthy fats and fiber.
17. Avoid using dessert recipes as regular breakfast, lunch or dinner.
18. Snack recipes should preferably come from Snack or Appetizer courses.
19. Breakfast recipes should preferably come from Breakfast courses.
20. Lunch should preferably use Lunch or Main Course.
21. Dinner should preferably use Dinner or Main Course.
Give nutrition per serving
From the selected recipes suggest recipes more suitable for kids

For every meal generate:

recipe_name
calories
prep_time
cook_time
cooking_instructions
ingridients
macros
addons
vitamins
minerals

MACROS:

protein
carbs
fat
fiber

ADDONS:

Suggest 1-3 optional addons that can increase nutritional value and/or calories.

VITAMINS:

Provide approximate values for:

vitamin_a
vitamin_c
vitamin_d
vitamin_e
vitamin_k
thiamin_b1
riboflavin_b2
niacin_b3
vitamin_b6
folate_b9
vitamin_b12

MINERALS:

Provide approximate values for:

calcium
iron
phosphorus
iodine
magnesium
zinc
selenium
copper

Each vitamin/mineral must contain:

amount
unit
percent_daily_value

If information is unavailable, use "n/a".
Give cooking instructions in detail
// **COOKING INSTRUCTIONS:**

// **1. Prepare the ingredients:**
//    - Gather and measure all ingredients.
//    - Wash, peel, chop, slice, or prepare the ingredients as required.
//    - Prepare any sauces, spices, marinades, or other components before cooking.

// **2. Cook:**
//    - Heat the pan, pot, oven, or other cooking equipment to the required temperature.
//    - Add the ingredients in the correct order.
//    - Cook for the specified time, stirring or turning when necessary.
//    - Continue cooking until the ingredients reach the appropriate texture, color, and doneness.

// **3. Finish:**
//    - Check the seasoning and adjust salt, spices, or other ingredients as needed.
//    - Allow the dish to rest briefly if required.
//    - Garnish or add any final ingredients.

// **4. Serve:**
//    - Transfer the finished dish to a serving plate or bowl.
//    - Serve immediately at the recommended temperature.
//    - Add optional garnishes or accompaniments if desired.

IMPORTANT OUTPUT RULES:

Return ONLY valid JSON.

Do not use markdown.

Do not use \`\`\`json.

Do not add explanations.

Do not add text before or after the JSON.
In nutriknow  suggest how the ingridients nutrients and minerals promote health and lifestyle as a nutritionist 
Use exactly this structure:

{
  "meal_plan": {
    "day_1": {
      "breakfast": {},
      "lunch": {},
      "healthy_snack": {},
      "dinner": {}
      "day_summary": {
      "calories dv " :"" ,
      "protiens" :"",
      "carbs" :"",
      "fiber" :"",
      "fats" :""

      }
      
    },
    "day_2": {
      "breakfast": {},
      "lunch": {},
      "healthy_snack": {},
      "dinner": {}
    },
    "day_3": {
      "breakfast": {},
      "lunch": {},
      "healthy_snack": {},
      "dinner": {}
    },
    "day_4": {
      "breakfast": {},
      "lunch": {},
      "healthy_snack": {},
      "dinner": {}
    },
    "day_5": {
      "breakfast": {},
      "lunch": {},
      "healthy_snack": {},
      "dinner": {}
    },
    "day_6": {
      "breakfast": {},
      "lunch": {},
      "healthy_snack": {},
      "dinner": {}
    },
    "day_7": {
      "breakfast": {},
      "lunch": {},
      "healthy_snack": {},
      "dinner": {}
    },
    "summary": {
      "total_calories": "",
      "dv": "",
      "proteins_dv": "",
      "carbs_dv": "",
      "fats_dv": "",
      "fiber_dv": ""
    }
  }
}

For each meal use:

{
  "recipe_name": "",
  "calories": 0,
  "prep_time": "",
  "cook_time": "",
  "cooking_instructions": "",
  "ingridients": {},
  "macros": {
    "protein": "",
    "carbs": "",
    "fat": "",
    "fiber": ""
  },
  "addons": {},
  "vitamins": {
    "vitamin_a": {
      "amount": "",
      "unit": "",
      "percent_daily_value": ""
    },
    "vitamin_c": {
      "amount": "",
      "unit": "",
      "percent_daily_value": ""
    },
    "vitamin_d": {
      "amount": "",
      "unit": "",
      "percent_daily_value": ""
    },
    "vitamin_e": {
      "amount": "",
      "unit": "",
      "percent_daily_value": ""
    },
    "vitamin_k": {
      "amount": "",
      "unit": "",
      "percent_daily_value": ""
    },
    "thiamin_b1": {
      "amount": "",
      "unit": "",
      "percent_daily_value": ""
    },
    "riboflavin_b2": {
      "amount": "",
      "unit": "",
      "percent_daily_value": ""
    },
    "niacin_b3": {
      "amount": "",
      "unit": "",
      "percent_daily_value": ""
    },
    "vitamin_b6": {
      "amount": "",
      "unit": "",
      "percent_daily_value": ""
    },
    "folate_b9": {
      "amount": "",
      "unit": "",
      "percent_daily_value": ""
    },
    "vitamin_b12": {
      "amount": "",
      "unit": "",
      "percent_daily_value": ""
    }
  },
  "minerals": {
    "calcium": {
      "amount": "",
      "unit": "",
      "percent_daily_value": ""
    },
    "iron": {
      "amount": "",
      "unit": "",
      "percent_daily_value": ""
    },
    "phosphorus": {
      "amount": "",
      "unit": "",
      "percent_daily_value": ""
    },
    "iodine": {
      "amount": "",
      "unit": "",
      "percent_daily_value": ""
    },
    "magnesium": {
      "amount": "",
      "unit": "",
      "percent_daily_value": ""
    },
    "zinc": {
      "amount": "",
      "unit": "",
      "percent_daily_value": ""
    },
    "selenium": {
      "amount": "",
      "unit": "",
      "percent_daily_value": ""
    },
    "copper": {
      "amount": "",
      "unit": "",
      "percent_daily_value": ""
    }
  },

  "Nutriknow":{"In nutriknow  suggest how the ingridients nutrients and minerals promote health and lifestyle as a nutritionist "}
}
`;

    console.log("Prompt Sent");

    // ---------------------------------------------------------
    // 10. OLLAMA REQUEST
    // ---------------------------------------------------------

    const result = await ollama.chat({
      model: "gemma4:31b-cloud",

      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    promptcount++;

    let output = result?.message?.content || "";

    console.log(
      "Ollama output characters:",
      output.length
    );

    // ---------------------------------------------------------
    // 11. CLEAN MARKDOWN
    // ---------------------------------------------------------

    output = output
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // ---------------------------------------------------------
    // 12. PARSE JSON
    // ---------------------------------------------------------

    let jsonResponse;

    try {
      jsonResponse = JSON.parse(output);
    } catch (error) {
      console.error(
        "Invalid JSON from Ollama:",
        error.message
      );

      return res.status(502).json({
        error: "Ollama returned invalid JSON",
        raw_output: output.substring(0, 5000)
      });
    }

    // ---------------------------------------------------------
    // 13. VALIDATE MEAL PLAN
    // ---------------------------------------------------------

    if (
      !jsonResponse ||
      !jsonResponse.meal_plan
    ) {
      return res.status(502).json({
        error: "Invalid meal plan structure from Ollama",
        response: jsonResponse
      });
    }

    // ---------------------------------------------------------
    // 14. RETURN RESPONSE
    // ---------------------------------------------------------

    return res.json(jsonResponse);

  } catch (error) {
    console.error(
      "Recipe generation error:",
      error
    );

    // Ollama concurrency / timeout
    if (
      error?.status_code === 429 ||
      error?.status === 429
    ) {
      return res.status(429).json({
        error: "Recipe generation is busy",
        message:
          "Another recipe generation request is currently being processed. Please try again shortly."
      });
    }

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



export { router as recipesRouter };









