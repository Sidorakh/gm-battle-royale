"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GUILD_ID = exports.DISCORD_TOKEN = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DISCORD_TOKEN = process.env.DISCORD_TOKEN || '';
exports.GUILD_ID = process.env.GUILD_ID || '';
