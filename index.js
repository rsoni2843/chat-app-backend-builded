"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
require("dotenv/config");
const socket_io_1 = require("socket.io");
const user_routes_1 = __importDefault(require("./src/routes/user.routes"));
const chat_routes_1 = __importDefault(require("./src/routes/chat.routes"));
const connect_1 = __importDefault(require("./src/config/connect"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL || "";
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const io = new socket_io_1.Server(server, {
  cors: {
    origin: "https://famous-kataifi-db2ab2.netlify.app/",
    credentials: true,
  },
});
io.on("connection", (socket) => {
  // console.log("User connected: " + socket.id);
  socket.on("add-user", (userId) => {
    // console.log("USERERERRER", userId);
    socket.join(userId);
  });
  socket.on("send-msg", (data) => {
    // console.log("Message", data.msg);
    socket
      .to(data === null || data === void 0 ? void 0 : data.to)
      .emit("msg-receive", data.msg);
  });
});
app.get("/", (req, res) => res.send("Home route working."));
app.use("/user", user_routes_1.default);
app.use("/chat", chat_routes_1.default);
(0, connect_1.default)(MONGO_URL);
server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
