import { FastifyRequest } from "fastify"

export const register_schema = {
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            domain_name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
        },
        required: ['domain_name', 'email', 'password']
    }
}


export interface registerSchema {
    email: string,
    password: string,
    domain_name: string
}
