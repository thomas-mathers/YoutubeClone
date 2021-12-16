import { Dialog, DialogContent, useMediaQuery, useTheme, Stack, Typography } from "@mui/material"
import BootstrapDialogTitle from "./bootstrap-dialog-title";
import UploadFile from "./upload-file";

interface UploadVideoProps {
    open: boolean;
    onClose: () => void;
}

const UploadVideoDialog = (props: UploadVideoProps) => {
    const { open, onClose } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog open={open} fullScreen={fullScreen} onClose={onClose} maxWidth="lg" fullWidth PaperProps={{ sx: { height: '100%' } }}>
            <BootstrapDialogTitle onClose={onClose}>Upload videos</BootstrapDialogTitle>
            <DialogContent dividers>
                <Stack justifyContent="center" height="100%">
                    <UploadFile
                        title={
                            <>
                                <Typography variant="h6" align="center">Drag and drop files to upload</Typography>
                                <Typography variant="subtitle1" align="center">Your videos will be private until you publish them</Typography>
                            </>
                        } />
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default UploadVideoDialog;