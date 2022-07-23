import { FastifyInstance } from "fastify";

export function verifyAccount(server: FastifyInstance, opts: any, done: () => void) {
    server.get('/', () => {
        return { status: 'Verify Account' }
    })
    done();
}