"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const socket_io_1 = require("socket.io");
const user_routes_1 = __importDefault(require("./src/routes/user.routes"));
const chat_routes_1 = __importDefault(require("./src/routes/chat.routes"));
const connect_1 = __importDefault(require("./src/config/connect"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL || "";
// const server = http.createServer(app);
const corsOptions = {
    transports: ["polling"],
    origin: "https://chat-app-rsoni2843.web.app",
    path: "/socket.io/",
    withCredentials: true,
    credentials: true,
};
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// app.get("/", (req, res) => res.send("Home route working."));
app.use("/user", user_routes_1.default);
app.use("/chat", chat_routes_1.default);
// const io = new Server(server, {
//   path: "/socket.io",
//   transports: ["websocket", "polling"],
//   cors: corsOptions,
// });
// io.on("connection", (socket) => {
//   // console.log("User connected: " + socket.id);
//   socket.on("add-user", (userId) => {
//     // console.log("USERERERRER", userId);
//     socket.join(userId);
//   });
//   socket.on("send-msg", (data) => {
//     // console.log("Message", data.msg);
//     socket
//       .to(data === null || data === void 0 ? void 0 : data.to)
//       .emit("msg-receive", data.msg);
//   });
// });
(0, connect_1.default)(MONGO_URL);
const server = app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
// const io = socket(server)
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        credentials: true,
        methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"]
    },
});
// global.onlineUsers = new Map();
io.on("connection", (socket) => {
    // console.log("User connected: " + socket.id);
    socket.on("add-user", (userId) => {
        // console.log("USERERERRER", userId);
        // onlineUsers.set(userId);
        socket.join(userId);
    });
    socket.on("send-msg", (data) => {
        // console.log("Message", data.msg);
        // const sendUserSocket = onlineUsers?.get(data?.to);
        socket.to(data.to).emit("msg-receive", data.msg);
    });
});
