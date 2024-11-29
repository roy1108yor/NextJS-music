import {db} from './db'

// 根据 名称 或 歌手 搜索歌曲 (默认like)
export async function getMusic(titleOrSinger) {
    // return await db.music.findMany({
    //     where: {OR: [{title: titleOrSinger}, {singer: titleOrSinger}]}
    // })
    return await db.music.findMany({
        where: {
            OR: [
                {title: {contains: titleOrSinger}},
                {singer: {contains: titleOrSinger}}
            ]
        }
    })
}

export async function getMusics() {
    const musics = await db.music.findMany();
    const baseUrl = 'https://82db5aaf7a7038e604799a3e41f5e444-app.staging.clackypaas.com/public/audio/'; 
    return musics.map(music => ({
        ...music,
        audioUrl: baseUrl + music.src // 组合为完整 URL
    }));
}
export async function saveMusic(title, singer, src, coverImgUrl) {
    return await db.music.create({data: {title, singer, src, coverImgUrl}})
}


// 根据id获取歌曲
export async function getMusicById(id) {
    return await db.music.findUnique({
        where: {id}
    })
}

// 根据id批量
export async function getManyMusicById(ids) {
    let ms = await db.music.findMany({})
    return ms.filter((m) => ids.includes(m.id));
}