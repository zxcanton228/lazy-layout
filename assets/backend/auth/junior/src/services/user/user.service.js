"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const argon2_1 = require("argon2");
class UserService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async getUsers() {
        return this.prisma.user.findMany({
            select: {
                name: true,
                email: true,
                id: true,
                password: false
            }
        });
    }
    async getById(id) {
        return this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }
    async getByEmail(email) {
        return this.prisma.user.findUnique({
            where: {
                email
            }
        });
    }
    async create(dto) {
        return this.prisma.user.create({
            data: {
                ...dto,
                password: await (0, argon2_1.hash)(dto.password)
            }
        });
    }
    async update(id, data) {
        return this.prisma.user.update({
            where: {
                id
            },
            data
        });
    }
}
exports.UserService = UserService;
