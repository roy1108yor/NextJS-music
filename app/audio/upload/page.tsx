'use client';

import {useState} from "react";

export default function UploadAudioPage() {
    const [file, setFile] = useState<File>()
    // 封面
    const [cover, setCover] = useState<File>()
    // 歌手
    const [singer, setSinger] = useState('')
    // 歌曲名
    const [title, setTitle] = useState('')
    // 上传是否成功
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const clearForm = () => {
        setTitle('')
        setSinger('')
        setCover(undefined)
        setFile(undefined)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setSuccess(false)

        if (!file || !cover || !singer || !title) {
            setError('All fields are required')
            setIsLoading(false)
            return
        }

        const data = new FormData()
        data.set('file', file)
        data.set('cover', cover)
        data.set('title', title)
        data.set('singer', singer)

        try {
            const res = await fetch('/api/audio', {
                method: 'POST',
                body: data
            })
            if (!res.ok) throw new Error(await res.text())
            setSuccess(true)
            clearForm()
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }
                return (
                    <form className={'flex flex-col gap-4 mt-6 items-center'} onSubmit={handleSubmit} style={{ backgroundColor: '#f0f0f0' }}>
                        {error && <div className={'text-red-600 text-xl mb-2'}>{error}</div>}
                        {success && <div className={'text-green-600 text-xl mb-2'}>Success!!!</div>}

                        <div className={'flex flex-col gap-2 w-1/2'}>
<label htmlFor="title" className={'text-lg'}>歌名</label>
                            <input className={'p-2 border rounded-lg'} type="text" onChange={(e) => setTitle(e.target.value)} name={'title'} value={title}/>
                        </div>

                        <div className={'flex flex-col gap-2 w-1/2'}>
                            <label htmlFor="singer" className={'text-lg'}>歌手</label>
                            <input className={'p-2 border rounded-lg'} type="text" onChange={(e) => setSinger(e.target.value)} name={'singer'} value={singer}/>
                        </div>

                        <div className={'flex flex-col gap-2 w-1/2'}>
<label htmlFor="file" className={'text-lg'}>歌曲</label>
                            <input type="file" name={'file'} onChange={(e) => setFile(e.target.files?.[0])} className={'p-2'}/>
                        </div>

                        <div className={'flex flex-col gap-2 w-1/2'}>
                            <label htmlFor="cover" className={'text-lg'}>封面</label>
                            <input type="file" name={'cover'} onChange={(e) => setCover(e.target.files?.[0])} className={'p-2'}/>
                        </div>

                        {isLoading && <div className={'animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900'}></div>}
                        <input className={'bg-green-500 text-white p-3 rounded-lg mt-4 cursor-pointer'} type="submit" value="Upload"/>
                    </form>
                )
}    