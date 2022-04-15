import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import courseRoutes from "./routes/courses.js";
import userRoutes from "./routes/users.js";
import forgotPasswordRoutes from "./routes/passwordReset.js";
import alertsRoutes from "./routes/alerts.js";
import gradeSheetsRoutes from "./routes/gradesheets.js";
import pollsRoutes from "./routes/polls.js";
import http from "http";
import {Server, Socket} from "socket.io";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Every route inside of courseRoutes will start with /courses
app.use("/courses", courseRoutes);
app.use("/users", userRoutes);
app.use("/forgotPassword", forgotPasswordRoutes);
app.use("/alerts", alertsRoutes);
app.use("/gradeSheets", gradeSheetsRoutes);
app.use("/polls", pollsRoutes);

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(socket.id+" connected");
  socket.on("JoinEnrollment", courseId => {
    socket.join(courseId);
  });
  socket.on("LeaveEnrollment", courseId => {
    socket.leave(courseId);
  });
  socket.on("JoinAttendance", ({courseId, sessionNumber}) => {
    socket.join(courseId+"/"+sessionNumber);
  });
  socket.on("LeaveAttendance", ({courseId, sessionNumber}) => {
    socket.leave(courseId+"/"+sessionNumber);
  });
});

const CONNECTION_URL =
  "mongodb+srv://QRCodeAMS:QRCodeAMSQRcodeAMS@cluster0.bula3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));


export default io;