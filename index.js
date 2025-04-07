const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const imageRouter = require("./routes/image");
const ContactRouter = require("./routes/contact");
const DbConnection = require("./config/db");
const ResumeRouter = require("./routes/resume");
const GetTouchRouter = require("./routes/gettouch");
const ExperienceRouter = require("./routes/experiance");
const ClientRouter = require("./routes/clients");
const TestimonialRouter = require("./routes/testimonial");
const TechnologyRouter = require("./routes/technology");
const CommentRouter = require("./routes/comment");
const BlogRouter = require("./routes/blogs");
const TermpolicyRouter = require("./routes/TemPolicy");

dotenv.config();

const PORT = process.env.PORT || 6000;

DbConnection();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const allowedOrigins = [
  "https://editsh.com",
  "http://localhost:3000",
  "http://localhost:3001",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow Postman or direct curl calls
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("hello world");
});

// Register routes
app.use("/api", imageRouter);
app.use("/api/contact", ContactRouter);
app.use("/api/resume", ResumeRouter);
app.use("/api/gettouch", GetTouchRouter);
app.use("/api/experince", ExperienceRouter);
app.use("/api/clients", ClientRouter);
app.use("/api/testimonial", TestimonialRouter);
app.use("/api/technology", TechnologyRouter);
app.use("/api/blogs", BlogRouter);
app.use("/api/comment", CommentRouter);
app.use("/api/termpolicy", TermpolicyRouter);

// Start the server
const server = app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log("Server is running on port", PORT);
  }
});

// Handle server start errors
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error("Error starting server:", err);
  }
});
