import {expressjwt} from 'express-jwt';
import jwt from 'jsonwebtoken';
import {createUser, getUser} from './db/users.js';
import * as bcrypt from 'bcrypt'

const secret = Buffer.from('+Z3zPGXY7v/0MoMm1p8QuHDGGVrhELGd', 'base64');

export const authMiddleware = expressjwt({
    algorithms: ['HS256'],
    credentialsRequired: false,
    secret,
});

export function decodeToken(token) {
    return jwt.verify(token, secret);
}


export async function handleLogin(req, res) {
    const {username, password} = req.body;
    const user = await getUser(username);
    if (!user || !await bcrypt.compare(password, user.password)) {
        res.sendStatus(401);
    } else {
        const claims = {sub: username};
        const token = jwt.sign(claims, secret);
        res.json({token});
    }
}

export async function handleRegister(req, res) {
    const {username, password, passwordConfirm} = req.body;
    if (await getUser(username) || password !== passwordConfirm) {
        res.sendStatus(401);
    } else {
        const hashedPassword = await bcrypt.hash(password, 5)
        const user = await createUser(username, hashedPassword)
        const claims = {sub: username};
        const token = jwt.sign(claims, secret);
        res.json({token});
    }
}