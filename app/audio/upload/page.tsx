'use client';

import {useState} from "react";
+import UploadedFilesList from './UploadedFilesList';

export default function UploadAudioPage() {
    const [file, setFile] = useState<File>()
    // 封面
    const [cover, setCover] = useState<File>()
    // 歌手
    const [singer, setSinger] = useState("")
    // 歌曲名
    const [title, setTitle] = useState("")
    // 上传是否成功
    const [success, setSuccess] = useState(false)
    // 已上传文件列表
    const [uploadedFiles, setUploadedFiles] = useState<{ name: string, type: string }[]>([])

    const clearForm = () => {
        setTitle("")
        setSinger("")
        setCover(undefined)
        setFile(undefined)
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log(1)
        // 阻止表单提交行为
        e.preventDefault()
        console.log(title, singer, !file, !cover, !singer, !title)
        if (!file) return
        if (!cover) return
        if (!singer) return
        if (!title) return
        setSuccess(false)

        try {
            console.log(2)
            const data = new FormData()
            // Add uploaded file details to the uploadedFiles state
            setUploadedFiles(prevFiles => [...prevFiles, { name: file.name, type: file.type }]);
            const res = await fetch('/api/audio', {
                method: 'POST',
                body: data
            })
            // handle the error
            if (!res.ok) throw new Error(await res.text())
            setSuccess(true)
        } catch (e: any) {
            // Handle errors here
            console.error(e)
            setSuccess(false)
        }
            // data.append('file', file)
            data.set('file', file)
            data.set('cover', cover)
            data.set('title', title)
            data.set('singer', singer)

            const res = await fetch('/api/audio', {
                method: 'POST',
                body: data
            })
            // handle the error
            if (!res.ok) throw new Error(await res.text())
            setSuccess(true)
        } catch (e: any) {
            // Handle errors here
            console.error(e)
            setSuccess(false)
        }

        clearForm()
    }

    return (
        <>
        <form className={'flex flex-col gap-2 mt-4 items-center'} onSubmit={onSubmit}>
            {success && <div className={'text-green-600 text-2xl'}>
                Success!!!
            </div>}
            <div className={'flex flex-row gap-2'}>
                <label htmlFor="title">歌名</label>
                <input className={'px-1 song-name-field'} type="text"
                       onChange={(e) => setTitle(e.target.value)}
                       name={'title'} value={title}/>
            </div>
            <div className={'flex flex-row gap-2'}>
                <label htmlFor="singer">Artist</label>
                <input className={'px-1 singer-field'} type="text"
                       onChange={(e) => setSinger(e.target.value)}
                       name={'singer'} value={singer}/>
            </div>
            <div className={'flex flex-row gap-2'}>
                <label htmlFor="file">歌曲</label>
                <input type="file" name={'file'}
                       onChange={(e) => setFile(e.target.files?.[0])}/>
            </div>
            <div className={'flex flex-row gap-2'}>
                <label htmlFor="cover">封面</label>
                <input type="file" name={'cover'}
                       onChange={(e) => {
                           // console.log(e.target.files)
                           setCover(e.target.files?.[0])
                       }}/>
            </div>
            <input className={'bg-green-300 p-3 rounded-lg'} type="submit" value="Upload"/>
        </form>
        <UploadedFilesList files={uploadedFiles} />
        </>
    )
}