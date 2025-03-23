"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const argon2_1 = require("argon2");
const omit_1 = __importDefault(require("lodash/omit"));
const user_service_1 = require("../user/user.service");
const jwt_service_1 = require("./jwt.service");
class AuthService {
    constructor() {
        this.userService = new user_service_1.UserService();
        this.jwt = new jwt_service_1.JwtService();
        this.TOKEN_EXPIRATION_ACCESS = '1h';
        this.TOKEN_EXPIRATION_REFRESH = '7d';
    }
    async login(dto) {
        const user = await this.validateUser(dto);
        return this.buildResponseObject(user);
    }
    async register(dto) {
        const userExists = await this.userService.getByEmail(dto.email);
        if (userExists) {
            throw new Error('User already exists');
        }
        const user = await this.userService.create(dto);
        return this.buildResponseObject(user);
    }
    async getNewTokens(refreshToken) {
        const result = this.jwt.verify(refreshToken);
        if (!result || typeof result === 'string') {
            throw new Error('Invalid refresh token');
        }
        const user = await this.userService.getById(result.id);
        return this.buildResponseObject(user);
    }
    async buildResponseObject(user) {
        const tokens = await this.issueTokens(user.id, user.rights);
        return { user: this.omitPassword(user), ...tokens };
    }
    async issueTokens(userId, rights) {
        const payload = { id: userId, rights };
        const accessToken = this.jwt.sign(payload, {
            expiresIn: this.TOKEN_EXPIRATION_ACCESS
        });
        const refreshToken = this.jwt.sign(payload, {
            expiresIn: this.TOKEN_EXPIRATION_REFRESH
        });
        return { accessToken, refreshToken };
    }
    async validateUser(dto) {
        const user = await this.userService.getByEmail(dto.email);
        if (!user) {
            throw new Error('Email or password invalid');
        }
        const isValid = await (0, argon2_1.verify)(user.password, dto.password);
        if (!isValid) {
            throw new Error('Email or password invalid');
        }
        return user;
    }
    omitPassword(user) {
        return (0, omit_1.default)(user, ['password']);
    }
}
exports.AuthService = AuthService;
