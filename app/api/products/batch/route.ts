import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const idsString = searchParams.get("ids");

    if (!idsString) {
        return NextResponse.json([]);
    }

    const ids = idsString.split(",").map(id => parseInt(id)).filter(id => !isNaN(id));

    if (ids.length === 0) {
        return NextResponse.json([]);
    }

    try {
        const products = await (db as any).product.findMany({
            where: {
                id: { in: ids },
                isActive: true
            },
            include: { category: true }
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error("Batch fetch error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
