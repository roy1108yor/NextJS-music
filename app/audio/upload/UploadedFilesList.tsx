import React from 'react';

interface UploadedFile {
    name: string;
    type: string;
}

interface UploadedFilesListProps {
    files: UploadedFile[];
}

const UploadedFilesList: React.FC<UploadedFilesListProps> = ({ files }) => {
    return (
        <div>
            <h3>Uploaded Files</h3>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        {file.name} ({file.type})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UploadedFilesList;