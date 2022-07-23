import { FastifyInstance } from "fastify";
import { forgotPassword } from "./forgot-password/forgotPassword";
import { login } from "./login/login";
import { register } from "./register/register";
import { resetPassword } from "./reset-password/resetPassword";
import { verifyAccount } from "./verify-account/verifyAccount";

export function authRoutes(server: FastifyInstance, opts: any, done: ()=> void){

    server.register(login, {prefix: '/login'});
    server.register(register, {prefix: '/register'});
    server.register(verifyAccount, {prefix: '/verify-account'});
    server.register(forgotPassword, {prefix: '/forgot-password'});
    server.register(resetPassword, {prefix: '/reset-password'});

    
    done();
}