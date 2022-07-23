export const login_schema = {
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            email: { type: 'string' },
            password: { type: 'string' },
        },
        required: ['email', 'password']
    }
}

export interface loginSchema {
    email: string,
    password: string
}
