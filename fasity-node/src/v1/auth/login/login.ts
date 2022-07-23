import { FastifyInstance, FastifyRequest } from "fastify";
import { prisma } from "../../../db/prisma";
import { loginSchema, login_schema } from "./loginSchems";

export function login(server: FastifyInstance, opts: any, done: () => void) {
    server.post('/', {
        schema: login_schema
    }, async (request: FastifyRequest<{
        Body: loginSchema
    }>, reply) => {

        const { email, password } = request.body;
        const user_data = await prisma.user.findMany({
            where: {
                email: email,
                password: password
            }
        });
        console.log("user_data", user_data);

        const refreshToken = await reply.jwtSign({
            id: user_data[0].id
        }, { expiresIn: '1d' })

        return { status: { ...user_data[0], refreshToken: refreshToken } }
    })
    done();
}