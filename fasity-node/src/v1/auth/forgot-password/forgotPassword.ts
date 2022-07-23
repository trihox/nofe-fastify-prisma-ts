import { FastifyInstance } from "fastify";

export function forgotPassword(server: FastifyInstance, opts: any, done: () => void) {
    server.get('/', () => {
        return { status: 'Forgot Password' }
    })
    done();
}