import { FastifyInstance, FastifyRequest } from "fastify";
import { prisma } from "../../../db/prisma";
import { randomNumber } from "../../helper/randomNumber";
import { registerSchema, register_schema } from "./registerSchema";

export function register(server: FastifyInstance, opts: any, done: () => void) {
  server.post('/', {
    schema: register_schema
  }, async (request: FastifyRequest<{
    Body: registerSchema
  }>, reply) => {
    try {
      const { email, password, domain_name } = request.body;
      let domain: string = domain_name.toLowerCase().replace(/\s/g, '');
      let username: string = email.split('@')[0];

      let check_domain = await findDomain(domain);

      if (check_domain.length > 0) {
        domain = domain + randomNumber(0, 99);
      }

      let check_user = await findUser(username);

      if (check_user.length > 0) {
        username = username + randomNumber(0, 9999);
      }

      const user_data = {
        username: username,
        email: email,
        password: password,
        type: 'CLIENT'
      }

      const createUser = await prisma.user.create({ data: user_data });

      const domain_data = {
        name: domain_name,
        domain: domain,
        creator: createUser.id,
        updater: createUser.id
      }

      const createDomain = await prisma.domain.create({ data: domain_data });

      const updateUser = await prisma.user.update({
        where: {
          id: createUser.id
        },
        data: {
          domain: createDomain.id,
          creator: createUser.id,
          updater: createUser.id
        }
      })

      // return updateUser;
      const return_message = 'User Created Successfully. Verify your Account';
      reply.status(201).send({
        statusCode: 201,
        message: return_message,
        error: ''
      })
    } catch (error) {
      reply.status(404).send({
        error: error
      })
    }
  })
  done();
}

async function findDomain(domain_name: string) {
  return prisma.domain.findMany({
    where: {
      domain: domain_name.toLowerCase().replace(/\s/g, '')
    }
  });
}

async function findUser(username: string) {
  return prisma.user.findMany({
    where: {
      username: username
    }
  });
}


