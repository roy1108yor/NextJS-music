const redis = require('redis');
const client = redis.createClient({
    url: process.env.REDIS_URL
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

/**
 * Guarda el historial de operaciones en Redis.
 * @param {string} operation - El nombre de la operación realizada.
 * @param {object} data - Los valores de entrada utilizados en la operación.
 * @param {object} result - El resultado de la operación.
 */
async function saveOperationHistory(operation, data, result) {
    await client.rpush('operation_history', JSON.stringify({ operation, data, result }));
}

/**
 * Recupera el historial de operaciones desde Redis.
 * @returns {Promise<Array>} - Una promesa que se resuelve con el historial de operaciones.
 */
async function getOperationHistory() {
    const history = await client.lrange('operation_history', 0, -1);
    return history.map(entry => JSON.parse(entry));
}

module.exports = {
    saveOperationHistory,
    getOperationHistory,
    client
};