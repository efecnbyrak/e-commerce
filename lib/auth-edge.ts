import { jwtVerify } from "jose";
import { env } from "./env";

const getAccessKey = () => new TextEncoder().encode(env.JWT_ACCESS_SECRET);
const getRefreshKey = () => new TextEncoder().encode(env.JWT_REFRESH_SECRET);

export async function verifyAccessToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, getAccessKey(), {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (err) {
        return null;
    }
}

export async function verifyRefreshToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, getRefreshKey(), {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (err) {
        return null;
    }
}
