import {db} from './db'
import redisClient from './redis'

export async function getLists() {
    return await db.musicList.findMany({})
}

// 根据userid获取list
export async function getListsByUid(userId) {
    return await db.musicList.findMany({where: {userId}})
}

// 创建歌单
export async function addList(title, user) {
    const result = await db.musicList.create({
        data: {title, userId: user.id}
    });
    await redisClient.rpush('operation_history', JSON.stringify({operation: 'Crear Lista', data: {title, userId: user.id}, result}));
    return result;
}

// 添加歌曲到歌单
export async function addMusicToList(musicId, listId) {
    const result = await db.listToMusic.create({
        data: {musicId, listId}
    });
    await redisClient.rpush('operation_history', JSON.stringify({operation: 'Agregar Música a Lista', data: {musicId, listId}, result}));
    return result;
}

// 获取歌单下歌曲
export async function getPlaylistMusics(lid) {
    return await db.listToMusic.findMany({
        where: {listId: lid}
    });
}

// 获取歌单信息 byid
export async function getPlaylistById(lid) {
    return await db.musicList.findUnique({
        where: {id: lid}
    });
}