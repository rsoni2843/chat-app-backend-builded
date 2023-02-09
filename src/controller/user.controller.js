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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../model/user.model"));
class UserController {
}
_a = UserController;
UserController.userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = yield user_model_1.default.findOne({ username });
        if (usernameCheck) {
            return res.status(409).send({
                message: "User already registered. Kindly use the same username to login.",
                status: false,
            });
        }
        const emailCheck = yield user_model_1.default.findOne({ email });
        if (emailCheck) {
            return res.status(409).send({
                message: "Email already registered. Kindly use the same email to login.",
                status: false,
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield new user_model_1.default({
            username: username,
            email: email,
            password: hashedPassword,
        });
        yield newUser.save();
        return res.status(201).send({
            message: "User registered successfully",
            status: true,
            user: { username: username, email: email },
        });
    }
    catch (err) {
        return res
            .status(400)
            .send({ message: "Some error occured", status: false });
    }
});
UserController.userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield user_model_1.default.findOne({ username });
        if (!user) {
            return res.status(409).send({
                message: "Incorrect username or password",
                status: false,
            });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(409).send({
                message: "Incorrect username or password",
                status: false,
            });
        }
        return res.status(201).send({
            message: "User login successfully",
            status: true,
            user: user,
        });
    }
    catch (err) {
        return res
            .status(400)
            .send({ message: "Some error occured", status: false });
    }
});
UserController.getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Getting all users here except the logged user
        const users = yield user_model_1.default.find({
            _id: { $ne: req.params.id },
        }).select(["email", "username", "avatarImage", "_id"]);
        return res.send({ users: users });
    }
    catch (err) {
        res.status(400).send({ message: "Some error occured" });
    }
});
UserController.getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ _id: req.params.id }, { _id: 1, username: 1, email: 1, avatarImage: 1 });
        // console.log(user);
        return res.send({ user: user });
    }
    catch (err) {
        res.status(400).send({ message: "Some error occured" });
    }
});
UserController.setAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = yield user_model_1.default.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage,
        }, { new: true });
        return res.status(201).send({ isSet: userData === null || userData === void 0 ? void 0 : userData.isAvatarImageSet });
    }
    catch (err) {
        return res.send({ message: "Cant set" });
    }
});
exports.default = UserController;
