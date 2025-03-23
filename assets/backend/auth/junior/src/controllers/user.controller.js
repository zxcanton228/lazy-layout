"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const auth_middleware_1 = require("@/middlewares/auth.middleware");
const user_service_1 = require("@/services/user/user.service");
const client_1 = require("@prisma/client");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.userRouter = router;
const userService = new user_service_1.UserService();
router.get('/profile', auth_middleware_1.authenticate, async (req, res) => {
    const userId = req.user.id;
    const user = await userService.getById(userId);
    res.json(user);
});
router.get('/premium', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)([client_1.Role.PREMIUM]), (req, res) => {
    res.json({ text: 'Premium content' });
});
router.get('/manager', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)([client_1.Role.ADMIN, client_1.Role.MANAGER]), (req, res) => {
    res.json({ text: 'Manager content' });
});
router.get('/list', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)([client_1.Role.ADMIN]), async (req, res) => {
    const users = await userService.getUsers();
    res.json(users);
});
