import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import courseRoutes from "./routes/courses.js";
import userRoutes from "./routes/users.js";
import forgotPasswordRoutes from "./routes/passwordReset.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Every route inside of courseRoutes will start with /course
app.use("/courses", courseRoutes);
app.use("/users", userRoutes);
app.use("/forgotPassword", forgotPasswordRoutes);

const CONNECTION_URL =
  "mongodb+srv://QRCodeAMS:QRCodeAMSQRcodeAMS@cluster0.bula3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
