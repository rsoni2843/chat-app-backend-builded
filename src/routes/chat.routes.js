"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_controller_1 = __importDefault(require("../controller/chat.controller"));
const router = express_1.default.Router();
router.post("/addMessage", chat_controller_1.default.addMessage);
router.post("/getMessage", chat_controller_1.default.getMessage);
router.get("/", (req, res) => res.send("Chat route working"));
exports.default = router;
