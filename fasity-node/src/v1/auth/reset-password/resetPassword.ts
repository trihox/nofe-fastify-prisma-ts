import { FastifyInstance } from "fastify";

export function resetPassword(server: FastifyInstance, opts: any, done: () => void) {
    server.get('/', () => {
        return { status: 'Reset Password' }
    })
    done();
}