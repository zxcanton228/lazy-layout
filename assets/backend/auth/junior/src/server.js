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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./controllers/auth.controller");
const user_controller_1 = require("./controllers/user.controller");
dotenv.config();
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
async function main() {
    // Middleware для обработки JSON и cookies
    app.use(body_parser_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({
        origin: ['http://localhost:3000'],
        credentials: true,
        exposedHeaders: 'set-cookie'
    }));
    app.use('/api', auth_controller_1.authRouter);
    app.use('/api/users', user_controller_1.userRouter);
    app.all('*', (req, res) => {
        res.status(404).json({ error: `Route ${req.originalUrl} not found` });
    });
    const PORT = process.env.PORT || 4200;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
main()
    .then(async () => {
    await exports.prisma.$connect();
})
    .catch(async (e) => {
    console.error(e);
    await exports.prisma.$disconnect();
    process.exit(1);
});
