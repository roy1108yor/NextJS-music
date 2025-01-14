import {jwtVerify, SignJWT} from "jose";

const JWT_SECRET = new TextEncoder().encode('some-random-string')

export async function genJWT(user) {
    ///
    return await new SignJWT(user)
        .setProtectedHeader({alg: 'HS256'})// alg 加密算法
        .sign(JWT_SECRET)
}

export async function verifyJWT(token) {
    try {
        const {payload} = await jwtVerify(token, JWT_SECRET)
        return payload
    } catch (err) {
        // 如果客户端篡改了cookie, 这里就会报错, 因为jwt解析错误
        console.warn('Invalid JWT', err)
    }
}



