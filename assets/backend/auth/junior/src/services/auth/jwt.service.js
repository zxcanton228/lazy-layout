"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
class JwtService {
    constructor() {
        this.TOKEN_EXPIRATION_ACCESS = '1h';
        this.TOKEN_EXPIRATION_REFRESH = '7d';
    }
    sign(payload, options) {
        return jwt.sign(payload, JWT_SECRET, options);
    }
    verify(token, options) {
        try {
            return jwt.verify(token, JWT_SECRET, options);
        }
        catch (e) {
            return null;
        }
    }
    signAccessToken(payload) {
        return this.sign(payload, { expiresIn: this.TOKEN_EXPIRATION_ACCESS });
    }
    signRefreshToken(payload) {
        return this.sign(payload, { expiresIn: this.TOKEN_EXPIRATION_REFRESH });
    }
}
exports.JwtService = JwtService;
