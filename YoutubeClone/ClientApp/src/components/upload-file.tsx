import { ReactNode, useRef, useCallback, useMemo } from "react";
import { Button, IconButton, Stack, Box } from "@mui/material";
import { Upload } from "@mui/icons-material";
import { ChangeEvent } from "react";

interface UploadFileProps {
    title: ReactNode;
    extensions?: string[];
    onSelectFile?: (file: File | null) => void;
}

const UploadFile = (props: UploadFileProps) => {
    const { title, extensions = [], onSelectFile } = props;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const accept = useMemo(() => extensions.join(','), [extensions]);

    const handleClickSelectFilesButton = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileInputChanged = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (onSelectFile === undefined) {
            return;
        }

        const files = e.target.files;

        if (files === null) {
            return;
        }

        onSelectFile(files.length >= 0 ? files[0] : null);
    }, [onSelectFile]);

    return (
        <Stack padding={2} spacing={3} alignItems="center">
            <IconButton size="large" onClick={handleClickSelectFilesButton}>
                <Upload sx={{ width: 100, height: 100 }} />
            </IconButton>
            <Box>
                {title}
            </Box>
            <input type="file" accept={accept} ref={fileInputRef} onChange={handleFileInputChanged} hidden />
            <Button variant="contained" onClick={handleClickSelectFilesButton}>Select Files</Button>
        </Stack>
    )
}

export default UploadFile;