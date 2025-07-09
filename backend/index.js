// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const path = require("path");
// const { sequelize } = require("./models"); // Sequelize models

// // Custom code execution modules
// const { generateFile } = require("./generateFile");
// const { executeCpp } = require("./executeCpp");
// const { executeJava } = require("./executeJava");
// const { executePython } = require("./executePython");
// const { executeJavaScript } = require("./executeJavaScript");
// const { cleanUp } = require("./cleanup");
// const authRoutes = require('./routes/authRoutes');


// // Express app setup
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/api/auth', authRoutes);
// app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploaded Excel files if needed

// // Timeout middleware
// app.use((req, res, next) => {
//   res.setTimeout(10000, () => {
//     console.error("Request timed out:", req.body);
//     res.status(504).json({ success: false, error: "Request timed out" });
//   });
//   next();
// });

// // Error handling
// process.on("unhandledRejection", (reason, promise) => {
//   console.error("Unhandled Rejection:", { reason, promise });
// });
// process.on("uncaughtException", (err) => {
//   console.error("Uncaught Exception:", {
//     message: err.message || "No message",
//     stack: err.stack || "No stack",
//   });
// });

// // Base Route
// app.get("/", (req, res) => {
//   console.log("Received GET request to /");
//   return res.json({ hello: "world" });
// });

// // Code execution route
// app.post("/run", async (req, res) => {
//   console.log("Received POST request to /run", req.body);
//   const startTime = Date.now();
//   const { language = "cpp", code, input } = req.body;

//   if (!code) {
//     return res.status(400).json({ success: false, error: "Empty code has been submitted" });
//   }

//   let filepath;
//   try {
//     filepath = await generateFile(language, code);
//     let output;
//     if (language === "cpp") {
//       output = await executeCpp(filepath, input);
//     } else if (language === "python") {
//       output = await executePython(filepath, input);
//     } else if (language === "java") {
//       output = await executeJava(filepath, input);
//     } else if (language === "javascript") {
//       output = await executeJavaScript(filepath, input);
//     } else {
//       return res.status(400).json({ success: false, error: "Invalid Language" });
//     }

//     res.json({ filepath, output });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.error || err.message || "Execution failed",
//       stderr: err.stderr || "",
//       fullError: err.fullError || { message: err.message, stack: err.stack },
//     });
//   } finally {
//     if (filepath) {
//       setTimeout(async () => {
//         try {
//           await cleanUp(filepath);
//         } catch (cleanupErr) {
//           console.error("Cleanup failed:", cleanupErr);
//         }
//       }, 100);
//     }
//   }
// });

// // Test creation route
// const testRoutes = require("./routes/testRoutes");
// app.use("/api/test", testRoutes);

// // Start server after DB sync
// sequelize.sync({ alter: true }).then(() => {
//   console.log("Database synced");
//   app.listen(5000, () => console.log("Server running on port 5000"));
// });



const express = require("express");
const cors = require("cors");
const path = require("path");
const { sequelize } = require("./models");

// Routes
const authRoutes = require('./routes/authRoutes');
const testRoutes = require("./routes/testRoutes");
const challenge = require("./routes/challengeRoutes")
const passcode = require("./routes/passcodeRoutes");

// Custom modules
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");
const { executeJava } = require("./executeJava");
const { executePython } = require("./executePython");
const { executeJavaScript } = require("./executeJavaScript");
const { cleanUp } = require("./cleanup");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/challenges",challenge);
app.use("/api/passcode",passcode);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Timeout middleware
app.use((req, res, next) => {
  res.setTimeout(10000, () => {
    console.error("Request timed out:", req.body);
    res.status(504).json({ success: false, error: "Request timed out" });
  });
  next();
});

// Error handling
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", { reason, promise });
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", {
    message: err.message || "No message",
    stack: err.stack || "No stack",
  });
});

// Routes
app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code, input } = req.body;
  if (!code) return res.status(400).json({ success: false, error: "Empty code" });

  let filepath;
  try {
    filepath = await generateFile(language, code);
    const executors = {
      cpp: executeCpp,
      python: executePython,
      java: executeJava,
      javascript: executeJavaScript
    };
    
    if (!executors[language]) {
      return res.status(400).json({ success: false, error: "Invalid Language" });
    }
    
    const output = await executors[language](filepath, input);
    res.json({ filepath, output });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.error || err.message || "Execution failed",
      stderr: err.stderr || "",
    });
  } finally {
    if (filepath) {
      setTimeout(() => cleanUp(filepath).catch(console.error), 100);
    }
  }
});

// Start server
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection verified');
    
    await sequelize.sync({ alter: true });
    console.log('✅ Models synchronized');
    
    app.listen(5000, () => {
      console.log('🚀 Server running on port 5000');
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
}

startServer();