import { NextRequest, NextResponse } from 'next/server';
import redisClient from '../../../lib/redis';
import { logOperation } from '../../../lib/db';

export async function POST(req: NextRequest) {
    const { key, value } = await req.json();

    if (!key || !value) {
        return NextResponse.json({ message: 'Key and value must be provided.' }, { status: 400 });
    }

    const result = await redisClient.set(key, value);
    
    // Log the Redis operation
    await logOperation('Redis Send', { key, value }, { result });

    return NextResponse.json({ message: 'Success' });
}