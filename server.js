//implementacja oprogramowania pośredniczącego
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const SocketIOServer = require("./socketIOServer");

//montowanie funkcji oprogramowania pośredniczącego
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//wiadomość testowa
app.get("/", (req, res) => {
  res.json({ msg: "Witaj" });
});

//SOCKET.IO
const http = require("http").createServer(app);
const sio = require("socket.io")(http);

sio.on("connection", (socket) => {
  SocketIOServer(socket);
  // console.log(socket.id + "Connected");
});

//Implementacja routerów
app.use("/api", require("./routes/authorizationRouter"));

app.use("/api", require("./routes/usersRouter"));
app.use("/api", require("./routes/postsRouter"));

app.use("/api", require("./routes/conversationsRouter"));
app.use("/api", require("./routes/commentsRouter"));
app.use("/api", require("./routes/notificationsRouter"));

//obsługa połączenia z bazą danych MongoDB Atlas
const ATLAS_URI = process.env.MONGODB_URL;
mongoose.connect(
  ATLAS_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Połączono z bazą danych Mongodb Atlas");
  }
);

//server
const port = process.env.PORT || 5000;
//app.listen(port, () => {
http.listen(port, () => {
  console.log("Serwer pracuje na porcie: ", port);
});
