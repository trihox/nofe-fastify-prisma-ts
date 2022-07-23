import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { app } from './src/app';
import fastify from 'fastify';
import "@fastify/jwt";
import fastifyJwt from '@fastify/jwt';


const server = fastify().withTypeProvider<JsonSchemaToTsProvider>()

// Temp
interface IQuerystring {
    username: string;
    password: string;
}

interface IHeaders {
    'h-Custom': string;
}

server.get<{
    Querystring: IQuerystring,
    Headers: IHeaders
}>('/auth', {
    preValidation: (request, reply, done) => {
        const { username, password } = request.query
        done(username !== 'admin' ? new Error('Must be admin') : undefined) // only validate `admin` account
    }
}, async (request, reply) => {
    const customerHeader = request.headers['h-Custom']
    // do something with request data
    return `logged in!`
})




server.post('/route/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'number' }
            },
            required: ['id']
        },
        querystring: {
            type: 'object',
            additionalProperties: false,
            properties: {
                data: { type: 'string' },
            },
            required: ['data']
        },
        body: {
            type: 'object',
            additionalProperties: false,
            properties: {
                foo: { type: 'number' },
                bar: { type: 'string' },
            },
            required: ['foo', 'bar']
        }
    } as const // don't forget to use const !

}, (request, reply) => {

    // type Query = { foo: number, bar: string }

    const { id } = request.params // type safe!

    return reply.code(200).send({
        data: {
            ...request.body, ...request.query, id: id
        }
    })
})


server.register(app, { prefix: '/api' });

// Temp end

server.register(fastifyJwt, {
    secret: 'heyallthisisrudhra'
})

server.get('/ping', async (request, reply) => {
    return 'pong\n';
})



server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
