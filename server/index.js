const express = require("express")
const dotenv = require("dotenv")
const userRoutes = require("./routes/user.route")
const authRoutes = require("./routes/auth.route")
const postRoutes = require("./routes/post.route")
const database = require("./config/database.js")
const cookieParser = require("cookie-parser")
const cors = require("cors")
dotenv.config()
const port = process.env.PORT || 3000;
const app = express();

// connect to the database
database.connect();

// middlewares
app.use(express.json());
app.use(cookieParser())
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)


app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/post", postRoutes)


app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});
app.listen(port, () => {
    console.log(`App is running on port : ${port}` )
})
