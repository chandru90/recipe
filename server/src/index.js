import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cloudinary from "cloudinary";
import * as cheerio from "cheerio";

import { recipesRouter } from "./routes/recipes.js";
import { userRouter } from "./routes/user.js";

dotenv.config();

const app = express();
const PORT = 3006;

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ======================================================
// CLOUDINARY
// ======================================================

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ======================================================
// MONGODB
// ======================================================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// ======================================================
// EXISTING ROUTES
// ======================================================

app.use("/recipes", recipesRouter);
app.use("/auth", userRouter);

// ======================================================
// LINKEDIN POSTS
// ======================================================

const posts = [
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7478068117089415168",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7424754580799913986",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7482287604068167680?collapsed=1",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7481409929808056320",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7487373614569324544?collapsed=1",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7487732725940908032",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7485646387699953666",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7485858500804243457",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7490374662976090115",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7489361207561318400",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7491758823490363393",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7489561751517093888",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7480342587665612801",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7477299859021160449",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7477004142268436480",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7493740985739509760",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7496240140244385793",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7496148473323573248",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7490513499224190976",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7493354806976348160",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7490054571130523649",
    height: 400,
    category: "food",
  },


 {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7497506422503403520",
    height: 400,
    category: "food",
  },

{
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7497828541124927488",
    height: 400,
    category: "food",
  },


  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7490284289532772352",
    height: 400,
    category: "food",
  },
   {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7498367778463260672",
    height: 400,
    category: "food",
  },
  {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7495698425682972672",
    height: 400,
    category: "food",
  },

 {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7479528579987419136",
    height: 400,
    category: "food",
  },
   {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7496875944138211328",
    height: 400,
    category: "food",
  },
   {
    url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7496879248352161792",
    height: 400,
    category: "food",
  },

{
    url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7498434489749274624",
    height: 400,
    category: "food",
  },




];

// ======================================================
// FETCH ONE LINKEDIN POST
// ======================================================

async function fetchLinkedInPost(post) {
  try {
    console.log(`Fetching: ${post.url}`);

    const response = await fetch(post.url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",

        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",

        "Accept-Language": "en-US,en;q=0.9",

        "Cache-Control": "no-cache",

        Pragma: "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(
        `LinkedIn returned HTTP ${response.status}`
      );
    }

    const html = await response.text();

    console.log(`HTML received: ${html.length} characters`);

    const $ = cheerio.load(html);

    // ==================================================
    // DESCRIPTION
    // ==================================================

    let description = null;

    // 1. Exact LinkedIn selector
    description = $(
      'p[data-test-id="main-feed-activity-embed-card__commentary"]'
    )
      .first()
      .text()
      .trim();

    // 2. Any element with data-test-id
    if (!description) {
      description = $(
        '[data-test-id="main-feed-activity-embed-card__commentary"]'
      )
        .first()
        .text()
        .trim();
    }

    // 3. Feed description
    if (!description) {
      description = $(".feed-shared-update-v2__description")
        .first()
        .text()
        .trim();
    }

    // 4. Commentary class
    if (!description) {
      description = $('[class*="commentary"]')
        .first()
        .text()
        .trim();
    }

    // 5. Article description
    if (!description) {
      description = $('meta[property="og:description"]')
        .attr("content")
        ?.trim();
    }

    // 6. Twitter description
    if (!description) {
      description = $('meta[name="twitter:description"]')
        .attr("content")
        ?.trim();
    }

    // 7. First paragraph
    if (!description) {
      description = $("p")
        .first()
        .text()
        .trim();
    }

    // ==================================================
    // IMAGE
    // ==================================================

    let imageUrl = null;

    // 1. Open Graph
    imageUrl = $('meta[property="og:image"]')
      .attr("content")
      ?.trim();

    // 2. Twitter image
    if (!imageUrl) {
      imageUrl = $('meta[name="twitter:image"]')
        .attr("content")
        ?.trim();
    }

    // 3. LinkedIn image
    if (!imageUrl) {
      imageUrl = $(
        'img[data-test-id="feed-entity-image"]'
      )
        .first()
        .attr("src");
    }

    // 4. Normal image
    if (!imageUrl) {
      imageUrl = $("img")
        .first()
        .attr("src");
    }

    // 5. Lazy-loaded image
    if (!imageUrl) {
      imageUrl = $("img")
        .first()
        .attr("data-src");
    }

    // ==================================================
    // TITLE
    // ==================================================

    let title = null;

    title = $("title")
      .first()
      .text()
      .trim();

    if (!title) {
      title = $('meta[property="og:title"]')
        .attr("content")
        ?.trim();
    }

    // ==================================================
    // DEBUG
    // ==================================================

    console.log("--------------------------------");
    console.log("URL:", post.url);
    console.log("Category:", post.category);
    console.log(
      "Title:",
      title || "NOT FOUND"
    );
    console.log(
      "Description:",
      description || "NOT FOUND"
    );
    console.log(
      "Image:",
      imageUrl || "NOT FOUND"
    );
    console.log(
      "Number of <p>:",
      $("p").length
    );
    console.log(
      "Number of <img>:",
      $("img").length
    );
    console.log("--------------------------------");

    // ==================================================
    // RETURN
    // ==================================================

    return {
      url: post.url,
      height: post.height,
      category: post.category,

      title: title || null,

      description: description || null,

      imageUrl: imageUrl || null,

      success: true,
    };
  } catch (error) {
    console.error(
      `Error fetching ${post.url}:`,
      error.message
    );

    return {
      url: post.url,
      height: post.height,
      category: post.category,

      title: null,

      description: null,

      imageUrl: null,

      success: false,

      error: error.message,
    };
  }
}

// ======================================================
// LINKEDIN API
// ======================================================

app.get("/linkedin", async (req, res) => {
  try {
    console.log(
      `Fetching ${posts.length} LinkedIn posts...`
    );

    const results = await Promise.all(
      posts.map((post) =>
        fetchLinkedInPost(post)
      )
    );

    console.log(
      `Successfully processed ${results.length} posts`
    );

    return res.json({
      success: true,
      count: results.length,
      posts: results,
    });
  } catch (error) {
    console.error(
      "LinkedIn API Error:",
      error
    );

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// SINGLE LINKEDIN POST
// ======================================================

app.get("/linkedin/:index", async (req, res) => {
  try {
    const index = Number(req.params.index);

    if (
      Number.isNaN(index) ||
      index < 0 ||
      index >= posts.length
    ) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    const result = await fetchLinkedInPost(
      posts[index]
    );

    return res.json({
      success: true,
      post: result,
    });
  } catch (error) {
    console.error(
      "Single LinkedIn post error:",
      error
    );

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
    endpoints: {
      recipes: "/recipes",
      auth: "/auth",
      linkedin: "/linkedin",
    },
  });
});

// ======================================================
// 404 HANDLER
// ======================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// ======================================================
// START SERVER
// ======================================================

app.listen(PORT, () => {
  console.log(
    `Server started on http://localhost:${PORT}`
  );

  console.log(
    `Recipes API: http://localhost:${PORT}/recipes`
  );

  console.log(
    `Auth API: http://localhost:${PORT}/auth`
  );

  console.log(
    `LinkedIn API: http://localhost:${PORT}/linkedin`
  );
});