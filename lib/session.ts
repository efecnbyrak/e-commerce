import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "./env";
import { db } from "./db";

const ACCESS_TOKEN_NAME = "access_token";
const REFRESH_TOKEN_NAME = "refresh_token";

const getAccessKey = () => new TextEncoder().encode(env.JWT_ACCESS_SECRET);
const getRefreshKey = () => new TextEncoder().encode(env.JWT_REFRESH_SECRET);

export async function signAccessToken(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("15m")
        .sign(getAccessKey());
}

export async function signRefreshToken(payload: any, rememberMe: boolean = false) {
    const duration = rememberMe ? "30d" : "7d";
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(duration)
        .sign(getRefreshKey());
}

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

export async function createSession(userId: number, role: string, rememberMe: boolean = false) {
    const accessToken = await signAccessToken({ userId, role });
    const refreshToken = await signRefreshToken({ userId, role }, rememberMe);

    // Store refresh token in DB for rotation/revocation
    await db.user.update({
        where: { id: userId },
        data: { refreshToken }
    });

    const cookieStore = await cookies();
    
    cookieStore.set(ACCESS_TOKEN_NAME, accessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        maxAge: 15 * 60, // 15 mins
        sameSite: "lax",
        path: "/",
    });

    cookieStore.set(REFRESH_TOKEN_NAME, refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        maxAge: rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60,
        sameSite: "lax",
        path: "/",
    });
}

export async function getSession() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;

    if (!accessToken) {
        return await handleRefresh();
    }

    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
        return await handleRefresh();
    }

    return {
        userId: payload.userId as number,
        role: payload.role as string,
    };
}

async function handleRefresh() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(REFRESH_TOKEN_NAME)?.value;

    if (!refreshToken) return null;

    const payload = await verifyRefreshToken(refreshToken);
    if (!payload) return null;

    // Verify refresh token matches what's in DB
    const user = await db.user.findUnique({
        where: { id: payload.userId as number },
        select: { refreshToken: true, role: true }
    });

    if (!user || user.refreshToken !== refreshToken) {
        await deleteSession();
        return null;
    }

    // Rotate Access Token
    const newAccessToken = await signAccessToken({ userId: payload.userId, role: user.role });
    cookieStore.set(ACCESS_TOKEN_NAME, newAccessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        maxAge: 15 * 60,
        sameSite: "lax",
        path: "/",
    });

    return {
        userId: payload.userId as number,
        role: user.role as string,
    };
}

export async function deleteSession() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(REFRESH_TOKEN_NAME)?.value;

    if (refreshToken) {
        const payload = await verifyRefreshToken(refreshToken);
        if (payload?.userId) {
            await db.user.update({
                where: { id: payload.userId as number },
                data: { refreshToken: null }
            });
        }
    }

    cookieStore.delete(ACCESS_TOKEN_NAME);
    cookieStore.delete(REFRESH_TOKEN_NAME);
}

export async function verifySession() {
    const session = await getSession();
    if (!session) {
        redirect("/login");
    }
    return { isAuth: true, ...session };
}
