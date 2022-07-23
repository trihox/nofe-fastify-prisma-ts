import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth/authRoutes";

export function v1Routes(server: FastifyInstance, opts: any, done: () => void) {
    server.register(authRoutes, { prefix: '/auth' });

    done();
}