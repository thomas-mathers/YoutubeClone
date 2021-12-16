import { Upload } from "@mui/icons-material";
import { Button, IconButton, Stack, Box } from "@mui/material";
import { ReactNode } from "react";

interface UploadFileProps {
    title: ReactNode;
}

const UploadFile = (props: UploadFileProps) => {
    const { title } = props;
    return (
        <Stack padding={2} spacing={3} alignItems="center">
            <IconButton size="large">
                <Upload sx={{ width: 100, height: 100 }} />
            </IconButton>
            <Box>
                {title}
            </Box>
            <Button variant="contained">Select Files</Button>
        </Stack>
    )
}

export default UploadFile;