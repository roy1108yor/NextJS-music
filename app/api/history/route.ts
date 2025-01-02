import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET(req: NextRequest) {
    try {
        const operations = await db.operationLog.findMany({
            orderBy: {
                timestamp: 'desc',
            },
        });

        return NextResponse.json(operations);
    } catch (error) {
        return NextResponse.json({ message: 'Error retrieving operation history', error: error.message }, { status: 500 });
    }
}