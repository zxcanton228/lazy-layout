"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const auth_service_1 = require("@/services/auth/auth.service");
const refresh_token_service_1 = require("@/services/auth/refresh-token.service");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
exports.authRouter = router;
const authService = new auth_service_1.AuthService();
const refreshTokenService = new refresh_token_service_1.RefreshTokenService();
router.post('/auth/login', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 6 }), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const dto = req.body;
    const { refreshToken, ...response } = await authService.login(dto);
    refreshTokenService.addRefreshTokenToResponse(res, refreshToken);
    res.status(200).json(response);
});
router.post('/auth/register', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 6 }), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const dto = req.body;
    const { refreshToken, ...response } = await authService.register(dto);
    refreshTokenService.addRefreshTokenToResponse(res, refreshToken);
    res.status(200).json(response);
});
router.post('/auth/access-token', async (req, res) => {
    const refreshTokenFromCookies = req.cookies[refreshTokenService.REFRESH_TOKEN_NAME];
    if (!refreshTokenFromCookies) {
        refreshTokenService.removeRefreshTokenFromResponse(res);
        return res.status(401).json({ message: 'Refresh token not passed' });
    }
    const { refreshToken, ...response } = await authService.getNewTokens(refreshTokenFromCookies);
    refreshTokenService.addRefreshTokenToResponse(res, refreshToken);
    res.status(200).json(response);
});
router.post('/auth/logout', async (req, res) => {
    refreshTokenService.removeRefreshTokenFromResponse(res);
    res.status(200).json(true);
});
