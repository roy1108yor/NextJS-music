import { NextResponse } from 'next/server';
import redisClient from '../../../../lib/redis';

/**
 * Maneja las peticiones GET para recuperar el historial de operaciones.
 * @returns {Promise<NextResponse>} - Respuesta que contiene el historial en formato JSON.
 */
export async function GET() {
    try {
        const history = await redisClient.getOperationHistory();
        return NextResponse.json(history);
    } catch (error) {
        console.error('Error al recuperar el historial de operaciones:', error);
        return NextResponse.json({ error: 'No se pudo recuperar el historial' }, { status: 500 });
    }
}