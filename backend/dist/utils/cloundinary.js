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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadOnCloudinary = exports.deletefile = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const env_1 = __importDefault(require("../constant/env"));
cloudinary_1.v2.config({
    cloud_name: env_1.default.get("CLOUDINARY_CLOUD_NAME"),
    api_key: env_1.default.get("CLOUDINARY_API_KEY"),
    api_secret: env_1.default.get("CLOUDINARY_API_SECRET"),
});
const deletefile = (public_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield cloudinary_1.v2.uploader.destroy(public_id);
});
exports.deletefile = deletefile;
const uploadOnCloudinary = (localFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!localFilePath)
            return null;
        //upload the file on cloudinary
        const response = yield cloudinary_1.v2.uploader.upload(localFilePath, {
            resource_type: "auto",
            // max_bytes: 2 * 1024 * 1024,
        });
        console.log("response", response);
        fs_1.default.unlinkSync(localFilePath);
        return response;
    }
    catch (error) {
        fs_1.default.unlinkSync(localFilePath);
        return null;
    }
});
exports.uploadOnCloudinary = uploadOnCloudinary;
