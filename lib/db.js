import {PrismaClient} from "@prisma/client";

export const db = createPrismaClient();

/** @returns {PrismaClient} */
function createPrismaClient() {
    // 全局只保有一个实例
    if (!globalThis.prismaClient) {
        globalThis.prismaClient = new PrismaClient({
            log: [{emit: 'stdout', level: 'query'}]
        });
    }
    return globalThis.prismaClient;
}

/**
 * Logs an operation's input values and results into the database.
 * @param {string} operationType - The type of operation (e.g., 'Add', 'Calculate', 'Redis Send').
 * @param {Object} inputData - The input values for the operation.
 * @param {Object} resultData - The results from the operation.
 */
export async function logOperation(operationType, inputData, resultData) {
    await db.operationLog.create({
        data: {
            operationType,
            inputData: JSON.stringify(inputData),
            resultData: JSON.stringify(resultData),
            timestamp: new Date(),
        },
    });
}