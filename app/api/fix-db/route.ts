import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    if (secret !== "tbf2026") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const log: string[] = [];

    try {
        // STEP 1: Recreate the 'username' column if it was dropped
        try {
            await prisma.$executeRawUnsafe(`
                ALTER TABLE users ADD COLUMN IF NOT EXISTS "username" TEXT
            `);
            log.push("Step 1: username column ensured.");
        } catch (e: any) {
            log.push("Step 1 error: " + e.message);
        }

        // STEP 2: For each user that has a NULL or empty username,
        // populate it from the referee or official email
        try {
            // Update from referees table
            await prisma.$executeRawUnsafe(`
                UPDATE users
                SET "username" = r."email"
                FROM referees r
                WHERE users.id = r."userId"
                AND (users."username" IS NULL OR users."username" = '')
            `);
            log.push("Step 2a: Updated usernames from referees emails.");

            // Update from general_officials table
            await prisma.$executeRawUnsafe(`
                UPDATE users
                SET "username" = g."email"
                FROM general_officials g
                WHERE users.id = g."userId"
                AND (users."username" IS NULL OR users."username" = '')
            `);
            log.push("Step 2b: Updated usernames from officials emails.");
        } catch (e: any) {
            log.push("Step 2 error: " + e.message);
        }

        // STEP 3: For users that STILL have NULL username (no referee/official),
        // set a placeholder so the UNIQUE constraint doesn't break
        try {
            await prisma.$executeRawUnsafe(`
                UPDATE users
                SET "username" = CONCAT('user_', id::text, '@bks.local')
                WHERE "username" IS NULL OR "username" = ''
            `);
            log.push("Step 3: Filled remaining NULL usernames with placeholders.");
        } catch (e: any) {
            log.push("Step 3 error: " + e.message);
        }

        // STEP 4: Make username NOT NULL and UNIQUE (if not already)
        try {
            await prisma.$executeRawUnsafe(`
                ALTER TABLE users ALTER COLUMN "username" SET NOT NULL
            `);
            log.push("Step 4a: Set username NOT NULL.");
        } catch (e: any) {
            log.push("Step 4a error (may already be set): " + e.message);
        }

        try {
            await prisma.$executeRawUnsafe(`
                CREATE UNIQUE INDEX IF NOT EXISTS "users_username_key" ON users("username")
            `);
            log.push("Step 4b: Ensured unique index on username.");
        } catch (e: any) {
            log.push("Step 4b error (may already exist): " + e.message);
        }

        // STEP 5: Create/fix the Super Admin account
        try {
            const adminUsername = "talat.mustafa.ozdemir50";
            const adminPassword = "talat!56742";
            const hashedPassword = await bcrypt.hash(adminPassword, 10);

            // Make sure SUPER_ADMIN role exists
            await prisma.$executeRawUnsafe(`
                INSERT INTO roles (name)
                VALUES ('SUPER_ADMIN')
                ON CONFLICT (name) DO NOTHING
            `);

            // Get the SUPER_ADMIN role id
            const roleResult: any[] = await prisma.$queryRawUnsafe(`
                SELECT id FROM roles WHERE name = 'SUPER_ADMIN' LIMIT 1
            `);

            if (roleResult.length > 0) {
                const roleId = roleResult[0].id;

                // Check if admin user exists
                const adminResult: any[] = await prisma.$queryRawUnsafe(`
                    SELECT id FROM users WHERE "username" = $1 LIMIT 1
                `, adminUsername);

                if (adminResult.length > 0) {
                    // Update existing admin's password and role
                    await prisma.$executeRawUnsafe(`
                        UPDATE users
                        SET password = $1,
                            "roleId" = $2,
                            "isApproved" = true,
                            "isVerified" = true,
                            "isActive" = true
                        WHERE "username" = $3
                    `, hashedPassword, roleId, adminUsername);
                    log.push("Step 5: Super Admin password and role UPDATED.");
                } else {
                    // Create new admin user
                    await prisma.$executeRawUnsafe(`
                        INSERT INTO users ("username", password, "roleId", "isApproved", "isVerified", "isActive", "createdAt", "updatedAt")
                        VALUES ($1, $2, $3, true, true, true, NOW(), NOW())
                    `, adminUsername, hashedPassword, roleId);
                    log.push("Step 5: Super Admin CREATED.");
                }
            } else {
                log.push("Step 5 error: Could not find/create SUPER_ADMIN role.");
            }
        } catch (e: any) {
            log.push("Step 5 error: " + e.message);
        }

        // STEP 6: Ensure index on username for performance
        try {
            await prisma.$executeRawUnsafe(`
                CREATE INDEX IF NOT EXISTS "users_username_idx" ON users("username")
            `);
            log.push("Step 6: Username index ensured.");
        } catch (e: any) {
            log.push("Step 6 error: " + e.message);
        }

        return NextResponse.json({
            success: true,
            message: "Database repair completed!",
            log
        });
    } catch (e: any) {
        return NextResponse.json({
            success: false,
            error: e.message,
            log
        }, { status: 500 });
    }
}
