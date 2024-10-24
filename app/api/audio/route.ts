import fs, {writeFile} from 'fs/promises'
import {NextRequest, NextResponse} from 'next/server';
import {getMusics, saveMusic} from "@/lib/music";

// 获取音乐列表 -> todo page分页
export async function GET(req: NextRequest) {
    let musics = await getMusics()
    return NextResponse.json({musics})
}

async function handleFileUpload(file: File, path: string) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(path, buffer);
    console.log(`open ${path} to see the uploaded file`);
}

async function validateFile(file: File): Promise<boolean> {
    const validAudioTypes = ['video/mp3', 'video/mp4'];
    const validCoverTypes = ['image/jpeg', 'image/png'];
    const validTypes = [...validAudioTypes, ...validCoverTypes]; // 合并类型
    const validSize = 20 * 1024 * 1024; // 20 MB limit
    return validTypes.includes(file.type) && file.size <= validSize;
}

// 上传音乐
export async function POST(request: NextRequest) {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    const cover: File | null = data.get('cover') as unknown as File


    if (!file || !cover) {
        console.log('Missing one or both files.');
    } else {
        console.log('File validation results:', 
            await validateFile(file), 
            await validateFile(cover)
        );
    }
    if (!file || !cover || !await validateFile(file) || !await validateFile(cover)) {
        return NextResponse.json({ error: 'Invalid file or file type.' }, { status: 400 });
    }

    const audioPath = `./public/audio/${file.name}`;
    const coverPath = `./public/cover/${cover.name}`;

    await handleFileUpload(file, audioPath);
    await handleFileUpload(cover, coverPath);

    const baseUrl = 'http://localhost:8080';
    const src = new URL(`/audio/${file.name}`, baseUrl).href;
    const coverImgUrl = new URL(`/cover/${cover.name}`, baseUrl).href;

    let music = await saveMusic(
        data.get('title'), data.get('singer'), src, coverImgUrl
    );

    return NextResponse.json({ success: true, music });
}
