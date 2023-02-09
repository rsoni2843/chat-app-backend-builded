"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const router = express_1.default.Router();
router.post("/register", user_controller_1.default.userRegister);
router.post("/login", user_controller_1.default.userLogin);
router.get("/getAllUsers/:id", user_controller_1.default.getAllUsers);
router.get("/getCurrentUser/:id", user_controller_1.default.getCurrentUser);
router.post("/setAvatar/:id", user_controller_1.default.setAvatar);
router.get("/", (req, res) => res.send("User route working"));
exports.default = router;
