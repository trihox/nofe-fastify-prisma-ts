import { FastifyInstance } from 'fastify'
import { v1Routes } from './v1/v1Routes'

export function app(server: FastifyInstance, opts: any, done: () => void) {

    server.register(v1Routes, { prefix: '/v1' });
    server.get('/', () => {
        return { status: 'for me to app' }
    })

    done(); 
}