import { useRef, useCallback, useMemo } from "react";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { Upload } from "@mui/icons-material";
import { ChangeEvent } from "react";
import OutlinedBox from "./outlined-box";

interface UploadFileProps {
    extensions?: string[];
    onSelectFile?: (file: File | null) => void;
}

const UploadFile = (props: UploadFileProps) => {
    const { extensions = [], onSelectFile } = props;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const accept = useMemo(() => extensions.join(','), [extensions]);

    const handleClickSelectFilesButton = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileInputChanged = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files !== null && files.length > 0) {
            onSelectFile?.(files[0]);
        } else {
            onSelectFile?.(null);
        }
    }, [onSelectFile]);

    return (
        <Stack padding={3} spacing={2} alignItems="center">
            <IconButton size="large" onClick={handleClickSelectFilesButton}>
                <Upload sx={{ width: 100, height: 100 }} />
            </IconButton>
            <Typography align="center">Drag & drop files here</Typography>
            <Typography align="center">or</Typography>
            <input type="file" accept={accept} ref={fileInputRef} onChange={handleFileInputChanged} hidden />
            <Button variant="contained" onClick={handleClickSelectFilesButton}>Select Files</Button>
        </Stack>
    )
}

export default UploadFile;