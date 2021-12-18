import { Dialog, DialogContent, useMediaQuery, useTheme, Stack, Button, TextField } from "@mui/material"
import { useCallback } from "react";
import BootstrapDialogTitle from "./bootstrap-dialog-title";
import OutlinedBox from "./outlined-box";
import UploadFile from "./upload-file";

interface UploadVideoProps {
    open: boolean;
    onClose: () => void;
}

const UploadVideoDialog = (props: UploadVideoProps) => {
    const { open, onClose } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleSelectFile = useCallback((file: File | null) => {
        console.log(file);
    }, []);

    return (
        <Dialog open={open} fullScreen={fullScreen} onClose={onClose} maxWidth="lg" fullWidth>
            <BootstrapDialogTitle onClose={onClose}>Upload video</BootstrapDialogTitle>
            <DialogContent dividers>
                <Stack spacing={2}>
                    <TextField label="Title" variant="outlined" />
                    <TextField label="Description" rows={8} multiline variant="outlined" />
                    <OutlinedBox label="Upload Video">
                        <UploadFile extensions={['.mp4']} onSelectFile={handleSelectFile}/>
                    </OutlinedBox>
                    <OutlinedBox label="Upload Thumbnail">
                        <UploadFile extensions={['.mp4']} onSelectFile={handleSelectFile}/>
                    </OutlinedBox>
                    <Button variant="contained">Upload</Button>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default UploadVideoDialog;