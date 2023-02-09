"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const chat_model_1 = __importDefault(require("../model/chat.model"));
class ChatController {
}
_a = ChatController;
ChatController.addMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to, message } = req.body;
        const data = yield chat_model_1.default.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });
        //   console.log(data);
        if (data) {
            return res.status(201).send({ message: "Message added successfully" });
        }
        else {
            return res
                .status(402)
                .send({ message: "Failed to add message to the database" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(401).send({ message: "Some error occured" });
    }
});
ChatController.getMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to } = req.body;
        const messages = yield chat_model_1.default.find({
            users: { $all: [from, to] },
        }).sort({ updatedAt: 1 });
        const projectedMessages = messages.map((el) => {
            return {
                fromSelf: (el === null || el === void 0 ? void 0 : el.sender.toString()) === from,
                message: el === null || el === void 0 ? void 0 : el.message.text,
            };
        });
        return res.status(201).send(projectedMessages);
    }
    catch (err) {
        res.status(401).send({ message: "Some error occured" });
    }
});
exports.default = ChatController;
