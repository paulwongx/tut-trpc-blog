import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "changeme";

// Can also use public private keys to sign
export const signJwt = (data: object) => {
    return jwt.sign(data, SECRET);
}

export const verifyJwt = <T>(token: string) => {
    return jwt.verify(token, SECRET) as T;
}